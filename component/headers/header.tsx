import styles from "../styles/page/component.module.scss";
import Image from "next/image";
import dmh from "../asset/dmh.png";
import Texaglo from "../asset/Texaglo.png";

const header = () => {
  return (
    <div className={styles.header}>
      <div>
        <a href="https://discord.com/invite/xZgfeQ9UBz">
          <Image src={dmh} width={85} height={62} />
        </a>
      </div>
      <div className={styles.headeroption}>
        <span><a className={styles.register} href="https://www.dmh.texaglo.com/register.html">Register</a></span>
        <span><a className={styles.register} href="https://www.dmh.texaglo.com/play.html">Play</a></span>
        <a className={styles.texaglo} href="https://www.texaglo.com/"><Image src={Texaglo} width={100} height={20} /></a>
      </div>
    </div>
  );
};

export default header;
