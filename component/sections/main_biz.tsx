import styles from "../styles/page/connection3.module.scss";
import React, { useState } from "react";
import { PublicKey, Transaction } from "@solana/web3.js";
import { useRouter } from "next/router";
import WalletContext from "../../context/WalletContext";
import Header_BIZ from "../../component/headers/header_biz";

type DisplayEncoding = "utf8" | "hex";
type PhantomEvent = "disconnect" | "connect" | "accountChanged";
type PhantomRequestMethod =
  | "connect"
  | "disconnect"
  | "signTransaction"
  | "signAllTransactions"
  | "signMessage";

interface ConnectOpts {
  onlyIfTrusted: boolean;
}

interface PhantomProvider {
  publicKey: PublicKey | null;
  isConnected: boolean | null;
  signTransaction: (transaction: Transaction) => Promise<Transaction>;
  signAllTransactions: (transactions: Transaction[]) => Promise<Transaction[]>;
  signMessage: (
    message: Uint8Array | string,
    display?: DisplayEncoding,
  ) => Promise<any>;
  connect: (opts?: Partial<ConnectOpts>) => Promise<{ publicKey: PublicKey }>;
  disconnect: () => Promise<void>;
  on: (event: PhantomEvent, handler: (args: any) => void) => void;
  request: (method: PhantomRequestMethod, params: any) => Promise<unknown>;
}

const app_selecctor = () => {
  const router = useRouter();
  const setWallet = React.useContext(WalletContext);

  const [provider, setProvider] = useState<PhantomProvider | undefined>(
    undefined,
  );
  const [walletKey, setWalletKey] = useState<PhantomProvider | undefined>(
    undefined,
  );

  /**
   * @description gets Phantom provider, if it exists
   */
  const getProvider = (): PhantomProvider | undefined => {
    if ("solana" in window) {
      // @ts-ignore
      const provider = window.solana as any;
      if (provider.isPhantom) return provider as PhantomProvider;
    }
  };

  /**
   * @description prompts user to connect wallet if it exists
   */
  const connectWallet = async () => {
    // @ts-ignore
    const { solana } = window;

    if (solana) {
      try {
        const response = await solana.connect();
        setWalletKey(response.publicKey.toString());
        setWallet.setAddress(response.publicKey.toString());
        router.push("/connection2");
      } catch (err) {}
    }
  };

  /**
   * @description disconnect Phantom wallet
   */
  const disconnectWallet = async () => {
    // @ts-ignore
    const { solana } = window;

    if (walletKey && solana) {
      await (solana as PhantomProvider).disconnect();
      setWalletKey(undefined);
    }
  };
  return (
    <div className={styles.main}>
      <nav>
        {" "}
        <Header_BIZ />
      </nav>
      <div className={styles.border}>
        <div className={styles.body}>
          <div className={styles.container}>
            <div className={styles.bodyTop1}>
              <span className={styles.span1}>
                MODERN <span className={styles.span2}>TECH & OUR BEST!</span>
                <br />
                <span className={styles.span3}>
                  We’ll take your tech and raise you our best
                </span>
              </span>{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default app_selecctor;
