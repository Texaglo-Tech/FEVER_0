import styles from "../../styles/page/home1.module.scss";
import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import LEFT from "../asset/form1.jpeg";
import LEFT2 from "../asset/form5.jpeg";
import MIDDLE from "../asset/form6.jpeg";
import RIGHT from "../asset/form3.jpeg";
import Modal from "../../component/modals/modal";
import Modal2 from "../../component/modals/modal2";
import Modal3 from "../../component/modals/modal3";

//import {useRadioGroup, useRadio} from 'react-aria'

const form1 = () => {
  const [project, setProject] = useState();
  const router = useRouter();
  // this function will be called when a radio button is checked
  const handleChange = (e) => {
    setProject(e.target.value);
  };

  return (
    <div id="contact" className={styles.content_container}>
      <div className={styles.row}>
        <div className={styles.left}>
          <div className={styles.container}>
            <div className={styles.centered}>
              <span className={styles.spanleft}>DEVELOP A PROJECT</span>
              <br />
              <span>
                Texaglo seeks to bridge the gap between creatives, SME’s,
                Corporations and Web3 using blochains such as Solana and Cloud
                computing infrastructre from Amazon
              </span>
              <div id="modal-root">
                <Modal>learn more</Modal>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.middle}>
          <div className={styles.container1}>
            <div className={styles.centered}>
              <span className={styles.spanleft}>Get Trained</span>
              <br />
              <span>
                Texaglo Is here to provide training for those who would like to
                learn more about web technologies
              </span>
              <div id="modal-root">
                <Modal2>learn more</Modal2>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.container2}>
            <div className={styles.centered}>
              <span className={styles.spanleft}>Work on a Project</span>
              <br />
              <span>
                Texaglo Technologies Is here to provide training for those who
                would like to learn more about web technologies
              </span>
              <div id="modal-root">
                <Modal3>learn more</Modal3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default form1;
/*<input type="text" id="start_date" name="start_date"  placeholder="start_date" className={styles.start_date}/>
        <input type="text" id="due_date" name="due_date"  placeholder="due_date" className={styles.due_date}/> */
