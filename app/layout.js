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
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: "Portfolio of Atul - AI/ML Engineer and Full-Stack Developer",
  description:
    "Portfolio of Atul, a B.Tech Computer Science student focused on AI/ML, data science, full-stack web development, civic-tech, and agricultural intelligence.",
  openGraph: {
    title: "Portfolio of Atul - AI/ML Engineer & Full-Stack Developer",
    description:
      "Explore Atul's projects, skills, and experience in AI/ML, data science, and full-stack web development.",
    url: "https://github.com/atul87",
    siteName: "Atul Portfolio",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/profile.png",
        width: 280,
        height: 280,
        alt: "Atul - AI/ML Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio of Atul - AI/ML Engineer & Full-Stack Developer",
    description:
      "Explore Atul's projects, skills, and experience in AI/ML, data science, and full-stack web development.",
    images: ["/profile.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
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
