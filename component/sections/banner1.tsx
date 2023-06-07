import styles from "../../styles/page/home.module.scss"
import { useState } from 'react'
import { useRouter } from "next/router";




//import {useRadioGroup, useRadio} from 'react-aria'


const form1 = () => {
  const [project, setProject] = useState();
  const router = useRouter();
  // this function will be called when a radio button is checked
  const handleChange = (e) => {
    setProject(e.target.value);
  }
    
return (
  <div className={styles.slider_title}><span className={styles.slider_title_header}>Featured</span><br/><span className={styles.slider_title_content}>Projects</span>

    <div className={styles.form1_border}> 

    <div className={styles.banner_content}><span className={styles.banner_title}>Blockchain Project Tools</span><br/><p>Do you have the pieces to an NFT or blockchain project? Did you know you could assemble them on your own? No coding or web development experience needed. Just click the button below and follow through to have your very own set of money making NFT’s and payment systems.</p><br/><p>If not, keep going to discover more about Texaglo.</p></div>     
    <button className={styles.banner_button} onClick={() => router.push("/#tools")}>Create</button>
    </div>
    </div>
);
};
export default form1;
/*<input type="text" id="start_date" name="start_date"  placeholder="start_date" className={styles.start_date}/>
        <input type="text" id="due_date" name="due_date"  placeholder="due_date" className={styles.due_date}/> */
