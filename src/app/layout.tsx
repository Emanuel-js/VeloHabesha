import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AuthProvider } from '@/context/AuthContext';
import AuthModal from '@/components/AuthModal';

export const metadata = {
  title: 'VeloHabesha - Premier Cycling Community',
  description: 'Join the premier cycling community in Ethiopia. Discover routes, events, and gear.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Header />
          <main>
            {children}
          </main>
          <Footer />
          <AuthModal />
        </AuthProvider>
      </body>
    </html>
  );
}
