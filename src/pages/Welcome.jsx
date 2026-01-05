import React from 'react';
import styles from './Welcome.module.css';
import houseImg from '../assets/nha.png';

const Welcome = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.textContent}>
            <h1 className={styles.title}>
              Easy living with your <br />
              smart home 💡
            </h1>
            <p className={styles.subtitle}>
              Get you smart devices in one place and manage all of these with a few taps.
            </p>
        </div>
        <div className={styles.imageContent}>
            <div className={styles.imageBackground}></div>
            <img src={houseImg} alt="Smart Home" className={styles.houseImage} />
        </div>
      </div>
    </div>
  );
};

export default Welcome;
