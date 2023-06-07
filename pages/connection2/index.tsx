import React from "react";
import { useRouter } from "next/router";
import styles from "../../styles/page/connection2.module.scss";
import WalletContext from '../../context/WalletContext';
import axios from "axios";
import { API } from '../../config';

const connection2 = () => {
  const router = useRouter();
  const setWallet = React.useContext(WalletContext);
//   React.useEffect(() => {
//     if(!setWallet.address) router.push("/");
// }, []);
  return (
    <div className={styles.main}>
      <div className={styles.border}>
        <div className={styles.body}>
          <div className={styles.bodyTop1}>Applications</div>
          <div className={styles.bodyTop2}>
            <div>
            <button
              onClick={async() => {
                router.push("/connection1");
                await axios.post(`${API}/api/attachment/reset`, {address:setWallet.address});
              }}
            >
              Art Generator
            </button>
            </div>
            <div>
            <span  onClick={async() => {
                router.push("/connection1");
                await axios.post(`${API}/api/attachment/reset`, {address:setWallet.address});
              }}
            >
              &nbsp;Open&nbsp;
            </span>
            </div>
          </div>
          <div className={styles.bodyTop2}>
            <div>
            <button
              onClick={async() => {
                router.push("/split");
                await axios.post(`${API}/api/attachment/reset`, {address:setWallet.address});
              }}
            >
              Split your payments
            </button>
            </div><div>
            <span  onClick={async() => {
                router.push("/split");
                await axios.post(`${API}/api/attachment/reset`, {address:setWallet.address});
              }}
            >
              &nbsp;Open&nbsp;
            </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connection2;
