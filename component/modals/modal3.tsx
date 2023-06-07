import { ReactNode, useState } from "react";

import styles from "../../styles/page/home.module.scss";
import Modal from "./effect";
import Form from "../forms/form3";

export default function Home({}: { children?: ReactNode }) {
  const [showModal, setShowModal] = useState(false);
  return (
    <div >
      <button onClick={() => setShowModal(true)} className={styles.btn}>
        Collaborate
      </button>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <Form />
      </Modal>
    </div>
  );
}
