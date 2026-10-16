import { GoogleTagManager } from "@next/third-parties/google";
import { Inter } from "next/font/google";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/footer";
import ScrollToTop from "./components/helper/scroll-to-top";
import Navbar from "./components/navbar";
import "./css/card.scss";
import "./css/globals.scss";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://portfolio-five-black-83.vercel.app"),
  alternates: {
    canonical: "/",
  },
  title: "Portfolio of Atul - AI/ML Engineer and Full-Stack Developer",
  description:
    "Portfolio of Atul, a B.Tech Computer Science student focused on AI/ML, data science, full-stack web development, civic-tech, and agricultural intelligence.",
  openGraph: {
    title: "Portfolio of Atul - AI/ML Engineer & Full-Stack Developer",
    description:
      "Explore Atul's projects, skills, and experience in AI/ML, data science, and full-stack web development.",
    url: "https://portfolio-five-black-83.vercel.app",
    siteName: "Atul Portfolio",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Portfolio of Atul - AI/ML Engineer & Full-Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio of Atul - AI/ML Engineer & Full-Stack Developer",
    description:
      "Explore Atul's projects, skills, and experience in AI/ML, data science, and full-stack web development.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Atul",
  jobTitle: "AI/ML Engineer & Full-Stack Developer",
  url: "https://portfolio-five-black-83.vercel.app/",
  sameAs: [
    "https://github.com/atul87",
    "https://www.linkedin.com/in/atulatul87",
    "https://www.geeksforgeeks.org/profile/atul8756",
    "https://leetcode.com/u/Atul9876/",
    "https://www.naukri.com/code360/profile/AtulCodeWizard",
  ],
  knowsAbout: [
    "Artificial Intelligence",
    "Machine Learning",
    "Full-Stack Web Development",
    "Python",
    "Flask",
    "React",
    "Next.js",
    "TensorFlow",
    "Scikit-learn",
    "MongoDB",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        <main className="min-h-screen relative mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] text-white">
          <Navbar />
          {children}
          <ScrollToTop />
        </main>
        <Footer />
      </body>
      {process.env.NEXT_PUBLIC_GTM ? <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM} /> : null}
    </html>
  );
}
