
import "./globals.css";

export const metadata = {
  title: "RapidDispatch | Support Dashboard",
  description: "Real-time freight support ticket dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
