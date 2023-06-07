import styles from "../styles/page/home1.module.scss";
import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import LEFT from "../asset/carousel.jpeg";
import MIDDLE from "../asset/carousel2.jpeg";
import RIGHT from "../asset/carousel4.jpeg";

//import {useRadioGroup, useRadio} from 'react-aria'

const form1 = () => {
  const [project, setProject] = useState();
  const router = useRouter();
  // this function will be called when a radio button is checked
  const handleChange = (e) => {
    setProject(e.target.value);
  };

  return (
    <div className={styles.content_container}>
      <div className={styles.row}>
        <div className={styles.left2}>
          {" "}
          <Image
            src={LEFT}
            alt="Picture of the author"
            // width={500} automatically provided
            // height={500} automatically provided
            // blurDataURL="data:..." automatically provided
            // placeholder="blur" // Optional blur-up while loading
          />
          <span>The Assembly</span>
          <br />
          <span>
            Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of “de Finibus
            Bonorum et Malorum” (The Extremes of Good and Evil) by Cicero,
            written in 45 BC. This book is a treatise on the theory of ethics,
            very popular during the Renaissance.
          </span>
          <button
            className={styles.project_button}
            onClick={() => router.push("https://www.theassembly.gg")}
          >
            learn more
          </button>
        </div>
        <div className={styles.left2}>
          <Image
            src={RIGHT}
            alt="Picture of the author"
            // width={500} automatically provided
            // height={500} automatically provided
            // blurDataURL="data:..." automatically provided
            // placeholder="blur" // Optional blur-up while loading
          />
          <span>That little girl was me</span>
          <br />
          <span>
            Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of “de Finibus
            Bonorum et Malorum” (The Extremes of Good and Evil) by Cicero,
            written in 45 BC. This book is a treatise on the theory of ethics,
            very popular during the Renaissance.
          </span>
          <button
            className={styles.project_button}
            onClick={() => router.push("https://thatlittlegirlwasmenft.com")}
          >
            learn more
          </button>
        </div>
        <div className={styles.left2}>
          <Image
            src={MIDDLE}
            alt="Picture of the author"
            // width={500} automatically provided
            // height={500} automatically provided
            // blurDataURL="data:..." automatically provided
            // placeholder="blur" // Optional blur-up while loading
          />
          <span>The Black Jesus Project</span>
          <br />
          <span>
            Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of “de Finibus
            Bonorum et Malorum” (The Extremes of Good and Evil) by Cicero,
            written in 45 BC. This book is a treatise on the theory of ethics,
            very popular during the Renaissance.
          </span>
          <button
            className={styles.project_button}
            onClick={() => router.push("https://blackjesusproject.io/")}
          >
            learn more
          </button>
        </div>
      </div>
    </div>
  );
};
export default form1;
/*<input type="text" id="start_date" name="start_date"  placeholder="start_date" className={styles.start_date}/>
        <input type="text" id="due_date" name="due_date"  placeholder="due_date" className={styles.due_date}/> */
