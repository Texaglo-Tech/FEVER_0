import styles from "../../styles/page/connection3.module.scss";
import React, { useState } from "react";
import { PublicKey, Transaction } from "@solana/web3.js";
import { useRouter } from "next/router";
import Header from "../headers/header_biz";
//import WalletContext from '../context/WalletContext';
//import Header_BIZ from "./header_biz";





const app_selecctor = () => {
    const router = useRouter();
    
  
   
  
  
    /**
     * @description prompts user to connect wallet if it exists
     */
    
  
  return (
    <div className={styles.main}> 
    <Header/>
    <nav>          
</nav>         
      <div className={styles.border}>
        <div className={styles.body}>
          <div className={styles.bodyTop1}><span className={styles.span1}>MODERN <span className={styles.span2}>TECH & OUR BEST!</span><br/><span className={styles.span3}>We’ll take your tech and raise you our best</span></span> </div>
         
        </div>
      </div>
    </div>
  );
};

export default app_selecctor;
