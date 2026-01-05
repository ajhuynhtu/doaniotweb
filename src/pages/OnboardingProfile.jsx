import { useNavigate } from 'react-router-dom';
import styles from './OnboardingProfile.module.css';
import avatarImg from '../assets/gil.png';

export default function OnboardingProfile() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.avatarContainer}>
          <img src={avatarImg} alt="User Avatar" className={styles.avatar} />
        </div>
        
        <h1 className={styles.title}>Hello, Andre!</h1>
        <p className={styles.subtitle}>
          Let's start by setting up your account
        </p>

        <button 
          className={styles.button}
          onClick={() => navigate('/empty-space')}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}