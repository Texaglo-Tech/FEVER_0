import styles from "../styles/page/component.module.scss";
import Image from "next/image";
import dmh from "../asset/dmh.png";
import Texaglo from "../asset/Texaglo.png";
import { useRouter } from "next/router";

const header = () => {
  const router = useRouter();
  return (
    <div className={styles.header}>
      <div>
        <a href="https://discord.com/invite/xZgfeQ9UBz">
          <Image src={dmh} width={85} height={62} />
        </a>
      </div>
      <div className={styles.headeroption}>
        <span><a className={styles.register} onClick={() => router.push("/")}>Home</a></span>
        <span><a className={styles.register} onClick={() => router.push("/#about")}>About</a></span>
        <span><a className={styles.register} onClick={() => router.push("/#contact")}>Contact</a></span>
        <span><a className={styles.register} onClick={() => router.push("app")}>Tools</a></span>
        <span><a className={styles.register} href="https://mint.texaglo.com">mint</a></span>
        <a className={styles.texaglo} href="https://www.texaglo.com/"><Image src={Texaglo} width={100} height={20} /></a>
      </div>
    </div>
  );
};

export default header;
