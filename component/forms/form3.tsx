import styles from "../../styles/page/modal.module.scss";
//import { Radio } from "@nextui-org/react";
//import { Textarea } from '@nextui-org/react';
import { useState } from "react";
import emailjs from "@emailjs/browser";
import React, { useRef } from "react";
import { toast } from "react-toastify";

//import {useRadioGroup, useRadio} from 'react-aria'

const form3 = () => {
  const form = useRef<any>();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
    .sendForm(
      "your email service id",
      "your email template id",
      form.current,
      "your form id",
    )
      .then(
        (result) => {
          console.log(result.text);
          form.current && form.current.reset();
          toast.success("Collaboration request submitted");
        },
        (error) => {
          console.log(error.text);
        },
      );
  };
  const [project, setProject] = useState();

  // this function will be called when a radio button is checked
  const handleChange = (e) => {
    setProject(e.target.value);
  };

  return (
    <div className={styles.form1_border}>
      <h1 className={styles.form1_header}>Collaborate with others</h1>
      <div className={styles.content_container}>
        <form ref={form} onSubmit={sendEmail}>
          <div className={styles.form1_title}></div>
          <input
            type="text"
            id="first"
            name="dev-first"
            placeholder="First Name"
            className={styles.first_name_field}
          />
          <input
            type="text"
            id="last"
            name="dev-last"
            placeholder="Last Name"
            className={styles.last_name_field}
          />
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email here"
            className={styles.email_field}
          />
          <input
            type="text"
            id="email"
            name="dev-wallet"
            placeholder="Solana Wallet"
            className={styles.email_field}
          />
          <div className={styles.contentcontainer}>
            <div className={styles.row}>
              <fieldset className={styles.project_radio_border}>
                <legend className={styles.project_type}>
                  What is your Main Skill
                </legend>
                <br />
                <br />

                <input
                  type="radio"
                  name="skill"
                  id="software"
                  value="software"
                  onChange={handleChange}
                  checked={project === "software"}
                  className={styles.radio1}
                />
                <label htmlFor="software" className={styles.selection1}>
                  Blockchain
                </label>
                <br />

                <input
                  type="radio"
                  name="skill"
                  id="blockchain"
                  value="blockchain"
                  onChange={handleChange}
                  checked={project === "blockchain"}
                  className={styles.radio1}
                />
                <label htmlFor="blockchain" className={styles.selection2}>
                  Communications
                </label>
                <br />

                <input
                  type="radio"
                  name="skill"
                  id="consultation"
                  value="consultation"
                  onChange={handleChange}
                  checked={project === "consultation"}
                  className={styles.radio1}
                />
                <label htmlFor="consultation" className={styles.selection3}>
                  Art
                </label>
                <br />

                <input
                  type="radio"
                  name="skill"
                  id="web-design"
                  value="web-design"
                  onChange={handleChange}
                  checked={project === "web-design"}
                  className={styles.radio1}
                />
                <label htmlFor="web-design" className={styles.selection4}>
                  Software
                </label>
                <br />
                <input
                  type="radio"
                  name="skill"
                  id="web-design"
                  value="web-design"
                  onChange={handleChange}
                  checked={project === "web-design"}
                  className={styles.radio1}
                />
                <label htmlFor="web-design" className={styles.selection4}>
                  Engineering
                </label>
                <br />
              </fieldset>

              <textarea
                name="dev-message"
                placeholder="Please enter what you belleve collaboration means to you"
                className={styles.project_description}
              ></textarea>
              <br />
              <label className={styles.label}>Start_date</label>
              <label className={styles.label2}>End_date</label>
              <br />
              <input
                type="date"
                id="date"
                name="dev-start"
                placeholder="1/25/2022"
                className={styles.date_field}
              />
              <input
                type="date"
                id="date"
                name="dev-end"
                placeholder="1/25/2022"
                className={styles.date_field2}
              />
              <button
                type="submit"
                id="submit"
                name="submit"
                className={styles.submit}
              >
                submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default form3;
/*<input type="text" id="start_date" name="start_date"  placeholder="start_date" className={styles.start_date}/>
        <input type="text" id="due_date" name="due_date"  placeholder="due_date" className={styles.due_date}/> */
