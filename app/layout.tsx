import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "未来心灵学院 | Future Mind Institute",
  description: "一个面向后AGI时代的全球意识觉醒生态系统",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.Node;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
