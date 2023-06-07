import styles from "../../styles/page/component2.module.scss";
import Image from "next/image";
import dmh from "../asset/dmh.png";
import Texaglo from "../../asset/Texaglo_White.png";
import { useRouter } from "next/router";
//import { StyledSnippetCopyButton } from "@nextui-org/react";
//import APP from "../pages/app";

const header_biz = () => {
  const router = useRouter();
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <a /*href="https://discord.com/invite/xZgfeQ9UBz"*/>
          <Image src={Texaglo} />
        </a>
      </div>
      <div className={styles.headeroption}>
        <span>
          <a className={styles.register} onClick={() => router.push("/")}>
            Home
          </a>
        </span>
        <span>
          <a className={styles.register} onClick={() => router.push("/#about")}>
            About
          </a>
        </span>
        <span>
          <a
            className={styles.register}
            onClick={() => router.push("/#contact")}
          >
            Contact
          </a>
        </span>
        <span>
          <a className={styles.register} onClick={() => router.push("/#tools")}>
            Tools
          </a>
        </span>
        <span>
          <a className={styles.register} href="https://mint.texaglo.com">
            mint
          </a>
        </span>
      </div>
    </div>
  );
};

export default header_biz;
