import React from 'react';
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Link,
  Button,
  Hr,
  Heading,
} from '@react-email/components';

interface ConfirmationEmailProps {
  firstName: string;
  confirmationUrl: string;
}

export const ConfirmationEmail = ({
  firstName,
  confirmationUrl,
}: ConfirmationEmailProps) => {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Section style={section}>
            <Heading style={h1}>Confirm Your Subscription</Heading>

            <Text style={text}>
              Hi {firstName},
            </Text>

            <Text style={text}>
              Thank you for subscribing to our newsletter! To complete your subscription,
              please click the button below to confirm your email address.
            </Text>

            <Section style={buttonContainer}>
              <Button style={button} href={confirmationUrl}>
                Confirm Subscription
              </Button>
            </Section>

            <Text style={text}>
              If the button above doesn't work, you can also copy and paste the following
              link into your browser:
            </Text>

            <Text style={linkText}>
              <Link href={confirmationUrl} style={link}>
                {confirmationUrl}
              </Link>
            </Text>

            <Hr style={hr} />

            <Text style={footer}>
              If you didn't sign up for this newsletter, you can safely ignore this email.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  border: '1px solid #f0f0f0',
  borderRadius: '8px',
  margin: '40px auto',
  padding: '20px',
  width: '465px',
};

const section = {
  padding: '24px',
};

const h1 = {
  color: '#1f2937',
  fontSize: '24px',
  fontWeight: '600',
  lineHeight: '1.25',
  margin: '0 0 20px',
  textAlign: 'center' as const,
};

const text = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '1.5',
  margin: '0 0 16px',
};

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '32px 0',
};

const button = {
  backgroundColor: '#3b82f6',
  borderRadius: '6px',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: '600',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 24px',
};

const linkText = {
  color: '#6b7280',
  fontSize: '14px',
  lineHeight: '1.5',
  margin: '0 0 16px',
  wordBreak: 'break-all' as const,
};

const link = {
  color: '#3b82f6',
  textDecoration: 'underline',
};

const hr = {
  border: 'none',
  borderTop: '1px solid #e5e7eb',
  margin: '32px 0',
};

const footer = {
  color: '#6b7280',
  fontSize: '14px',
  lineHeight: '1.5',
  margin: '0',
  textAlign: 'center' as const,
};

export default ConfirmationEmail;
