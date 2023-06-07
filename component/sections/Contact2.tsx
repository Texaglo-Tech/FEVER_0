import styles from "../../styles/page/home1.module.scss"
//import { Radio } from "@nextui-org/react";
//import { Textarea } from '@nextui-org/react';
import { useState } from 'react';
import { useRouter } from "next/router";
import Image from 'next/image';
import LEFT from '../asset/form1.jpeg';
import LEFT2 from '../asset/form5.jpeg';
import MIDDLE from '../asset/form6.jpeg';
import RIGHT from '../asset/form3.jpeg';
import Modal from "../modals/modal";
import Modal2 from "../modals/modal2";
import Modal3 from "../modals/modal3";






//import {useRadioGroup, useRadio} from 'react-aria'


const form1 = () => {
  const [project, setProject] = useState();
  const router = useRouter();
  // this function will be called when a radio button is checked
  const handleChange = (e) => {
    setProject(e.target.value);
  }
    
return (
    <div id="contact" className={styles.content_container}> 
     <div className={styles.slider_title}><span className={styles.slider_title_header}>Contact</span><br/><span className={styles.slider_title_content}>Select a reason to contact us</span></div>
    <div className={styles.row}>
    <div className={styles.left}>
    <div className={styles.container}>
     
      <div className={styles.centered}><span className={styles.spanleft}>DEVELOP A PROJECT</span><br/><span className={styles.form_content_1}>Texaglo seeks to bridge the gap between creatives, SME’s, Corporations and Web3 using blochains such as Solana and Cloud computing infrastructre from Amazon</span><div className={styles.formbtn} id="modal-root"><Modal></Modal></div>
</div></div></div>
    <div className={styles.middle}><div className={styles.container1}>
    <div className={styles.centered}><span className={styles.spanleft}>Get Trained</span><br/><span className={styles.form_content_2}>Texaglo Is here to provide training for those who would like to learn more about web technologies</span><div className={styles.formbtn}  id="modal-root"><Modal2>learn more</Modal2></div>
</div></div></div>
    <div className={styles.right}><div className={styles.container2}>
    <div className={styles.centered}><span className={styles.spanleft}>Work on a Project</span><br/><span className={styles.form_content_3}>Texaglo Technologies Is Collaborating with Creatives and Developers to make a space that is safe and equitable to work in. Come collaborate on a project and grow your network</span><div className={styles.formbtn} id="modal-root"><Modal3></Modal3></div>
</div></div></div>    
    </div></div>
    
);
};
export default form1;
/*<input type="text" id="start_date" name="start_date"  placeholder="start_date" className={styles.start_date}/>
        <input type="text" id="due_date" name="due_date"  placeholder="due_date" className={styles.due_date}/> */
