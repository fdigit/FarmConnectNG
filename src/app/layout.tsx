import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "../components/providers/auth-provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "FarmConnectNG - Multi-Vendor Agriculture Marketplace",
  description: "Connect directly with farmers and buy fresh produce",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
} 