import styles from "../styles/page/component.module.scss";
import Image from "next/image";
import Texaglo_White from "../asset/Texaglo_White.png";
import DiscordIcon from "../asset/discord.svg";
import DiscordCloseIcon from "../asset/discord_close.svg";
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import WidgetBot from '@widgetbot/react-embed'
import React, { useState } from "react";

const footer = () => {
  const [discord, setDiscord] = useState(true);
  const changeDiscord = async (index:any) => {
    setDiscord(!discord);
  }
  return (
    <div className={styles.footer}>
      <div className={styles.footerLeft}>
        <span><a  className={styles.services} href="https://heyzine.com/flip-book/8340d5d7a4.html/">SERVICES</a></span>
        <span><a  className={styles.services} href="https://heyzine.com/flip-book/70c03a5ae7.html">LIGHT PAPER</a></span>
      </div>
      <div className={styles.footerCenter}>
          <Image src={Texaglo_White} width={270} height={40} />
        <span>TEXAGLO TECHNOLOGIES LTD.CO. @ 2021</span>
      </div>
      <div className={styles.footerRight}>
        <a  href="https://twitter.com/texaglo_techno" className={styles.twitter}>
          <TwitterIcon className={styles.icon}></TwitterIcon>
        </a>
        <a  href="https://www.instagram.com/xxdr.potatoheadxx/" className={styles.twitter}>
          <InstagramIcon className={styles.icon} ></InstagramIcon>
        </a>

      </div>
      {/* <WidgetBot
          server="299881420891881473"
          channel="355719584830980096"
        /> */}
      <button className={discord?styles.discord:styles.discordClose} onClick={changeDiscord}>
        {discord?
        <Image src={DiscordIcon} width={60} height={60}>
        </Image>:
        <Image src={DiscordCloseIcon} width={30} height={30}>
        </Image>
        }
      </button>
      {!discord?
        <iframe
            src="https://e.widgetbot.io/channels/879817009917993030/953397237021564978"
            width="350"
            height="500"
            style={{position:"fixed", right:"20px", bottom:"20px"}}
            sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
        />:
        <>
        </>
      }
    </div>
  );
};

export default footer;
