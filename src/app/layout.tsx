import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ቀላል ገበያ | Kelal Gebeya - የኢትዮጵያ ከተሞች ቀጥታ ገበያ",
  description: "ቀላል ገበያ - በአዲስ አበባ፣ አዳማ፣ ሐዋሳ፣ ባሌ ሮቤ እና በሁሉም የኢትዮጵያ ከተሞች ፈጣን እና አስተማማኝ ግብይት",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "ቀላል ገበያ",
  },
  icons: {
    icon: "/icon-192x192.png",
    apple: "/icon-192x192.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#10b981",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="am">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className="font-sans antialiased bg-slate-950 text-slate-100 selection:bg-emerald-500 selection:text-slate-950">
        {children}
      </body>
    </html>
  );
}
