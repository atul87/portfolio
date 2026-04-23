# Atul Portfolio

This is Atul's personal portfolio website built with Next.js. It highlights his AI/ML, data science, full-stack development, education, certifications, achievements, projects, and contact links.

## Profile

- Name: Atul
- Role: AI/ML Engineer | Full-Stack Developer | Data Science Enthusiast
- Location: Kanpur, Uttar Pradesh, India
- Education: B.Tech CSE, Allenhouse Institute of Technology, Kanpur (2023-2027)
- Email: <atulverma15704@gmail.com>
- Alternate email: <23bcs011atul@allenhouse.in>
- Phone: +91-8756890816
- GitHub: <https://github.com/atul87>
- LinkedIn: <https://linkedin.com/in/atul-verma4321>
- LeetCode: <https://leetcode.com/u/Atul9876/>
- Code360: <https://www.naukri.com/code360/profile/AtulCodeWizard>

## Featured Projects

- Flavour Fleet - Premium Food Delivery Platform: <https://github.com/atul87/Flavour-Fleet-Premium-Food-Delivery-Platform>
- My City Help - Kanpur Civic Portal: <https://github.com/atul87/My-City-Help>
- Crop Recommendation System: <https://github.com/atul87/Crop-Recommendation-System>
- SoulCare - Mental Health Fitness: <https://github.com/atul87/mental_health-fitness>
- Coffee Shop Website: <https://github.com/atul87/Coffee-Shop>
- Developer Profile README: <https://github.com/atul87/atul87>

## Tech Stack

- Framework: Next.js
- UI: React, Tailwind CSS, SCSS
- Content: Local data files under `utils/data`
- Contact form backend: Next.js route handlers with Nodemailer and Telegram integration

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

## Production Build

```bash
npm run build
npm start
```

## Environment Variables

Create `.env.local` using `.env.example` as a reference.

```env
NEXT_PUBLIC_GTM=
NEXT_PUBLIC_APP_URL=http://localhost:3000
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
RECAPTCHA_SECRET_KEY=
GMAIL_PASSKEY=
EMAIL_ADDRESS=atulverma15704@gmail.com
```

The contact form requires valid Telegram and Gmail app-password credentials before it can send live messages.
