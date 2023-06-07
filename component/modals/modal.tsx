import { ReactNode, useState } from "react";

import styles from "../../styles/page/home.module.scss";
import Modal from "./effect";
import Form1 from "../footers/form1";

export default function Home({}: { children?: ReactNode }) {
  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      <button onClick={() => setShowModal(true)} className={styles.btn}>
        Develop
      </button>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <Form1 />
      </Modal>
    </div>
  );
}
