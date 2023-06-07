import React from 'react';
import styles from '../../styles/page/modal.module.scss';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";

import 'slick-carousel/slick/slick-theme.css';
import {SliderData} from './SliderData';

function slider() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 500,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              infinite: false,
              dots: true
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      };
    return(
<div className={styles.app}>
  <div className={styles.slider_title}><span className={styles.slider_title_header}>Projects</span><br/><span className={styles.slider_title_content}>Blockchain</span></div>
    <Slider {...settings}>
    {SliderData.map((item) => (
    <div className={styles.card}>
    <div className={styles.card_top}>
<img className={styles.images} src={item.linking} alt={item.title}/>
<h1>{item.title} | {item.blockchain}</h1>

    </div>
    <div className={styles.card_bottom}>
        <p className={styles.category}>{item.category}</p>
        <a href={item.website}><button className={styles.button}>Visit</button></a>
    </div>
</div>
))}
    </Slider>
    
</div>
    );
}

export default slider;