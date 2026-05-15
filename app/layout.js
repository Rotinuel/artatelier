import "./globals.css";

export const metadata = {
  title: "Artemis Atelier ltd",
  description: "Safest way to manage",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
