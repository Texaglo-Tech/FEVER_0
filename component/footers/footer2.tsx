import styles from "../../styles/page/component.module.scss";
import Image from "next/image";
import Texaglo_White from "../asset/Texaglo_White.png";
import DiscordIcon from "../../asset/discord.svg";
import DiscordCloseIcon from "../../asset/discord_close.svg";
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
    <div className={styles.footer2}>
      
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
