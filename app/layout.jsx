import { Inter } from "next/font/google";
import { Poppins } from "next/font/google";
import localFonts  from "next/font/local";
import "./globals.css";
import Footer from "./_components/footer";

const mont = localFonts({
  src: "../public/fonts/mont.otf",
  variable: "--font-mont",
});

const proxima = localFonts({
  src: "../public/fonts/proxima.otf",
  variable: "--font-proxima",
});

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Energy News",
  description: "Real time energy news",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={inter.className + " " + mont.variable + " " + proxima.variable + " " + poppins.variable}>
       
        {children}
        <Footer />
      </body>
      
    </html>
  );
}
