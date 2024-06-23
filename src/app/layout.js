import Footer from "@/components/common/Footer";
import WrapCom from "@/components/wrapper/WrapCom";
import { dbConnect } from "@/service/mongo";
import { Rubik } from "next/font/google";
import "./globals.css";

const rubik = Rubik({ subsets: ["latin"] });

export const metadata = {
  title: "Our Subtitle",
  description: "Bangla movie subtitle",
};

await dbConnect();

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={rubik.className}>
        <WrapCom>
            {children}
          <Footer />
        </WrapCom>
      </body>
    </html>
  );
}
