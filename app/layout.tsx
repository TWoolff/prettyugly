import type { Metadata } from "next"
import { AppProvider } from "./context"
import "./styles/index.css"
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Cart from "./components/cart/cart";

export const metadata: Metadata = {
  title: "PrettyUgly",
  description: "Something Something",
};

const RootLayout = ({children}: Readonly<{children: React.ReactNode;}>) => {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}

export default RootLayout
