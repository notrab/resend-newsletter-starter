# Resend Newsletter Starter

Create your own Newsletter Form with Astro, Resend and React Email!

![Resend Newsletter Starter](.github/cover.png)

## ✨ Features

- **Server-side Actions** - Built with Astro's type-safe actions and Zod validation
- **Email Confirmation** - Optional double opt-in using Resend and React Email
- **Responsive Design** - Mobile-first responsive newsletter form
- **Social Integration** - Optional social media links with icons
- **Type-safe Configuration** - Environment variables with Astro's env schema
- **Error Handling** - Comprehensive client and server-side validation

## 🚀 Quick Deploy

Deploy to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/notrab/resend-newsletter-starter)

## 📋 Manual Setup

1. **Clone and install:**

   ```bash
   git clone https://github.com/notrab/resend-newsletter-starter.git
   cd resend-newsletter-starter
   npm install
   ```

2. **Configure environment:**

   ```bash
   cp .env.example .env
   ```

3. **Set up Resend:**
   - Create account at [resend.com](https://resend.com)
   - Get your API key from the dashboard
   - Create an audience and copy the ID
   - Update your `.env` file with these values

4. **Start developing:**
   ```bash
   npm run dev
   ```

## 📚 Built With

- [Astro](https://astro.build) - Web framework
- [Resend](https://resend.com) - Email delivery
- [React Email](https://react.email) - Email templates
- [Zod](https://zod.dev) - Schema validation

## 📄 License

MIT License - feel free to use for your projects!
