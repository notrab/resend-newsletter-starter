import { defineAction, ActionError } from "astro:actions";
import { z } from "astro:schema";
import { Resend } from "resend";
import {
  RESEND_API_KEY,
  RESEND_AUDIENCE_ID,
  REQUIRE_CONFIRMATION,
  EMAIL_FROM,
  EMAIL_REPLY_TO,
} from "astro:env/server";
import { ConfirmationEmail } from "../emails/ConfirmationEmail";
import { render } from "@react-email/render";

const resend = new Resend(RESEND_API_KEY);

export const server = {
  subscribe: defineAction({
    accept: "form",
    input: z.object({
      email: z.string().email("Please enter a valid email address"),
      firstName: z.string().min(1, "First name is required"),
      lastName: z.string().optional(),
    }),
    handler: async (input, context) => {
      const { site } = context;

      try {
        // Create contact in Resend as unsubscribed initially
        const contact = await resend.contacts.create({
          email: input.email,
          firstName: input.firstName,
          lastName: input.lastName || "",
          unsubscribed: REQUIRE_CONFIRMATION,
          audienceId: RESEND_AUDIENCE_ID,
        });

        if (contact.error) {
          throw new ActionError({
            code: "BAD_REQUEST",
            message: contact.error.message || "Failed to create contact",
          });
        }

        // If confirmation is required, send confirmation email
        if (REQUIRE_CONFIRMATION) {
          const confirmationUrl = `${site}/confirm?contactId=${contact.data?.id}`;

          const emailResult = await resend.emails.send({
            from: EMAIL_FROM,
            to: input.email,
            replyTo: EMAIL_REPLY_TO || EMAIL_FROM,
            subject: "Please confirm your newsletter subscription",
            html: await render(
              ConfirmationEmail({
                firstName: input.firstName,
                confirmationUrl,
              }),
            ),
          });

          if (emailResult.error) {
            // Try to clean up the contact if email fails
            await resend.contacts.remove({
              id: contact.data?.id || "",
              audienceId: RESEND_AUDIENCE_ID,
            });

            throw new ActionError({
              code: "INTERNAL_SERVER_ERROR",
              message: "Failed to send confirmation email",
            });
          }

          return {
            success: true,
            message: "Please check your email to confirm your subscription.",
            requiresConfirmation: true,
          };
        }

        return {
          success: true,
          message: "Successfully subscribed to the newsletter!",
          requiresConfirmation: false,
        };
      } catch (error) {
        if (error instanceof ActionError) {
          throw error;
        }

        // Handle duplicate email error
        if (
          error instanceof Error &&
          error.message.includes("already exists")
        ) {
          throw new ActionError({
            code: "CONFLICT",
            message: "This email is already subscribed to our newsletter.",
          });
        }

        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error occurred. Please try again.",
        });
      }
    },
  }),

  confirmSubscription: defineAction({
    input: z.object({
      contactId: z.string().min(1, "Contact ID is required"),
    }),
    handler: async (input) => {
      try {
        // Update contact to subscribed
        const result = await resend.contacts.update({
          id: input.contactId,
          audienceId: RESEND_AUDIENCE_ID,
          unsubscribed: false,
        });

        if (result.error) {
          throw new ActionError({
            code: "BAD_REQUEST",
            message: "Invalid confirmation link or contact not found.",
          });
        }

        return {
          success: true,
          message:
            "Your subscription has been confirmed! Welcome to our newsletter.",
        };
      } catch (error) {
        if (error instanceof ActionError) {
          throw error;
        }

        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to confirm subscription. Please try again.",
        });
      }
    },
  }),
};
