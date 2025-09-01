// src/app/layout.jsx
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
export const metadata = {
  title: "My Next.js App",
  description: "Generated with Next.js",
};
import Chatbot from "@/components/Chatbot/Chatbot";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Header at the top */}
        <Header />
        
        {/* Main content of each page */}
        <main>{children}
          <Chatbot />
        </main>
        
        <Footer />
      </body>
    </html>
  );
}
