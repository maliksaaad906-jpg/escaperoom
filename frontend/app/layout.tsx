import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import { ThemeProvider } from "../context/ThemeContext";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Escape Room Game",
  description: "CSE3CWA Assignment 2",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <Navbar />
          <main className="container py-4">{children}</main>
          <footer className="text-center mt-5 mb-3 text-secondary">
            © 2025 Mohammad Saad — Student No: 21483818
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
