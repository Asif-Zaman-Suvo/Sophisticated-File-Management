import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sophisticated File Management",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </head>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
