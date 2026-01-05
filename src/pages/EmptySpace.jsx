import { useNavigate } from 'react-router-dom';
import styles from './EmptySpace.module.css';
import anh1Img from '../assets/anh1.png';

export default function EmptySpace() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2 className={styles.title}>
          Looks like you have no spaces set up.
        </h2>
        <p className={styles.subtitle}>
          Add your house and start your smart life!
        </p>

        <div className={styles.imageContainer}>
          <img src={anh1Img} alt="Empty Space" className={styles.image} />
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
}