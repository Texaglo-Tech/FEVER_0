import styles from "../styles/page/connection1.module.scss";
//import Header from "../component/header";
import Footer from "../component/footer";
import React, { useState } from "react";
import { PublicKey, Transaction } from "@solana/web3.js";
import { useRouter } from "next/router";
import WalletContext from '../context/WalletContext';
import Header from "../component/headers/header_biz";



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
    display?: DisplayEncoding
  ) => Promise<any>;
  connect: (opts?: Partial<ConnectOpts>) => Promise<{ publicKey: PublicKey }>;
  disconnect: () => Promise<void>;
  on: (event: PhantomEvent, handler: (args: any) => void) => void;
  request: (method: PhantomRequestMethod, params: any) => Promise<unknown>;
}

const page1 = () => {
  const router = useRouter();
  const setWallet = React.useContext(WalletContext);

  const [provider, setProvider] = useState<PhantomProvider | undefined>(
    undefined
  );
  const [walletKey, setWalletKey] = useState<PhantomProvider | undefined>(
    undefined
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
        router.push("/split");
      } catch (err) {}
    }
  };
  const connectWallet1 = async () => {
    // @ts-ignore
    const { solana } = window;

    if (solana) {
      try {
        const response = await solana.connect();
        setWalletKey(response.publicKey.toString());
        setWallet.setAddress(response.publicKey.toString());
        router.push("/connection1");
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
   
    <div className={styles.main} id="tools"> 
      <div className={styles.border}>
        <div className={styles.body}>
          
          
         
          <div className={styles.bodyTop2}>
            <div className={styles.tool_card}>
              <div className={styles.tool_image}>
                <div className={styles.tool_title}>NFT Art Generation</div>
                <div className={styles.how}>How to use</div>
              </div>
              <div className={styles.message}>Create NFT art with this tool. You can add art and then set rarity of each art asset. This tool lets you create collections for both Solana and Ethereum
          <br/><div className={styles.tool_button} onClick={() => connectWallet1()}>
            <button className={styles.tool_btn}>Connect to use</button>
          </div></div>
          
          </div><div className={styles.tool_card}>
              <div className={styles.tool_image1}>
                <div className={styles.tool_title}>Payment Splitter</div>
                <div className={styles.how}>How to use</div>
              </div>
              <div className={styles.message}>Create a Payment Splitter with this tool. You can set percentages for payments as well as hard caps, this tool allow you to dynamically select and set your payment gateway. very usefull for team projects and fee structures
          <br/><div className={styles.tool_button} onClick={() => connectWallet()}>
            <button className={styles.tool_btn}>Connect to use</button>
          </div></div>
          
          </div>
          </div>
          
        
      </div>
    </div>
    </div>
  );
};

export default page1;
