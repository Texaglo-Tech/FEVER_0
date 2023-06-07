import "../styles/globals.css";
import type { AppProps } from "next/app";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { ProviderProps } from "../types";
import Header from "../component/header";
import Footer from "../component/footer";
import WalletProvider from "../context/WalletProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Providers = (props: ProviderProps) => {
  return <WalletProvider>{props.children}</WalletProvider>;
};

function MyApp({ Component, pageProps }: AppProps) {
  const AnyComponent = Component as any;
  return (
    <Providers {...pageProps}>
      <div>
        <ToastContainer />
        <AnyComponent {...pageProps} />
      </div>
    </Providers>
  );
}

export default MyApp;
