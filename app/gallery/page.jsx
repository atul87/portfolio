import React from "react";
import GalleryClient from "./gallery-client";

export const metadata = {
  title: "Visual Log & Gallery | Atul Verma",
  description: "Hackathons, research work, and club events — grouped by occasion. Explore event glimpses, presentations, and credentials.",
  alternates: {
    canonical: "/gallery",
  },
  openGraph: {
    title: "Visual Log & Gallery | Atul Verma",
    description: "Hackathons, research work, and club events — grouped by occasion.",
    url: "/gallery",
    siteName: "Portfolio of Atul",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Visual Log & Gallery - Atul Verma",
      },
    ],
    type: "website",
  },
};

export default function GalleryPage() {
  return (
    <main className="min-h-screen">
      <GalleryClient />
    </main>
  );
}
