import styles from "../../styles/page/home.module.scss"
//import { Radio } from "@nextui-org/react";
//import { Textarea } from '@nextui-org/react';
import { useState } from 'react';
import { useRouter } from "next/router";
import Image from 'next/image';
import LEFT from '../../asset/carousel.jpeg';
import MIDDLE from '../../asset/thought.jpeg';
import RIGHT from '../asset/store.jpeg';



//import {useRadioGroup, useRadio} from 'react-aria'


const form1 = () => {
  const [project, setProject] = useState();
  const router = useRouter();
  // this function will be called when a radio button is checked
  const handleChange = (e) => {
    setProject(e.target.value);
  }
    
return (
    <div id="about" className={styles.content_container}> 
    <div className={styles.row}>
    <div className={styles.left2}> <span className={styles.spanleft}>About</span><br/><span className={styles.span_middle}>How we started</span><br/><br/><p className={styles.span_content}>From a college dream and a push in the right direction, Texaglo was started with a name that means to shine bright from any direction and to be a guiding light to those who need it.<br/><br/> We opened our digital doors on May 31st 2021 and made a splash in a space that was still in its infancy, NFT’s. Since then, we’ve set our sights on Blockchain development and bleeding edge innovation in the tech industry.</p></div>
    <div className={styles.middle2}><span className={styles.span_middle1}>Whats Our Vision</span><br/><br/><p className={styles.span_content1}>Texaglo technologies seeks to bridge the gap between creatives, SME’s, Corporations and Web3 using frameworks like Amazon web services.</p>
    <div className={styles.floater}></div>
    <div className={styles.floater2}></div>

    </div>
    <div className={styles.floater}></div>
    <div className={styles.floater2}></div>
    <div className={styles.right2}><span className={styles.span_middle2}>What Are Our Services</span><br/><p className={styles.span_content2}>We take your vision our your tech And give you our best in: Web and Mobile App Development, Web Design Blockchain App Development, NFT Assembly and Smart Contract creation.</p></div>     
    </div>
    </div>
);
};
export default form1;
/*<input type="text" id="start_date" name="start_date"  placeholder="start_date" className={styles.start_date}/>
        <input type="text" id="due_date" name="due_date"  placeholder="due_date" className={styles.due_date}/> */
