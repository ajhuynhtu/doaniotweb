import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Welcome.module.css";
import houseImg from "../assets/house.png"; 

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Looks like you have no spaces set up.</h1>
        <p className={styles.subtitle}>Add your house and start your smart life!</p>
        
        <div className={styles.imageContainer}>
             <img src={houseImg} alt="Smart House" className={styles.image} />
        </div>

        <button 
          className={styles.button}
          onClick={() => navigate('/create-space')}
        >
          Set up your space
        </button>
      </div>
    </div>
  );
};

export default Welcome;
