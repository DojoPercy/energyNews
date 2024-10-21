import { Inter } from "next/font/google";
import { Poppins, Montserrat } from "next/font/google";
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

const monsterrat = Montserrat({

  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-montserrat",
});
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Latest News and Insights on Energy Governance in the Middle East & Africa | Shaping the Future of Energy",
  description: "Stay ahead with the Energy Governance Middle East & Africa Magazine – your go-to platform for the latest, cutting-edge news, expert opinions, and in-depth analysis of the energy sector. We drive critical discussions and shape industry trends, offering original content that fuels innovation and thought leadership across the region. Dive into a world of energy governance that influences decisions and powers the future!",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={inter.className + " " + mont.variable + " " + proxima.variable + " " + poppins.variable + " " + monsterrat.variable} >
       
        {children}
        
      </body>
      
    </html>
  );
}
