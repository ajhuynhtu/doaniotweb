import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate, Link } from 'react-router-dom';
import styles from './Login.module.css';

// Assets
import smHomeImg from '../assets/smhome.png';
import appleIcon from '../assets/apple.png';
import facebookIcon from '../assets/f.png';
// Use standard Google SVG or asset if available, defaulting to SVG repo for reliability
const googleIcon = "https://www.svgrepo.com/show/475656/google-color.svg";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={styles.container}>
      {/* Left Side - Illustration */}
      <div className={styles.leftSide}>
        <div className={styles.illustrationContainer}>
          <img src={smHomeImg} alt="Smart Home" className={styles.houseImage} />
          <div className={styles.welcomeText}>
            <h2 className={styles.welcomeTitle}>
              Easy living with your<br/>smart home 💡
            </h2>
            <p className={styles.welcomeSubtitle}>
              Get you smart devices in one place and manage all of these with a few taps.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className={styles.rightSide}>
        <div className={styles.formContainer}>
          <h2 className={styles.formTitle}>Login</h2>
          <p className={styles.formSubtitle}>Welcome back! Please enter your details.</p>
          
          {error && <div style={{color: '#ef4444', marginBottom: '16px', fontSize: '0.9rem', textAlign: 'center'}}>{error}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <input
                type="email"
                placeholder="joe.doe@gmail.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className={styles.inputField}
              />
            </div>
            
            <div className={styles.inputGroup}>
              <div className={styles.passwordWrapper}>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  className={styles.inputField}
                />
                {/* Add toggle visibility icon if needed */}
              </div>
            </div>

            <div className={styles.optionsRow}>
              <label className={styles.rememberMe}>
                <input 
                  type="checkbox" 
                  checked={remember} 
                  onChange={e => setRemember(e.target.checked)} 
                />
                Remember information
              </label>
              <a href="#" className={styles.forgotPassword}>Forget password?</a>
            </div>

            <button type="submit" className={styles.loginButton}>Login</button>

            <div className={styles.divider}>or</div>

            <div className={styles.socialButtons}>
              <button type="button" className={styles.socialBtn}>
                <img src={googleIcon} alt="Google" className={styles.socialIcon} />
                <span className={styles.socialText}>Login with Google</span>
              </button>
              <button type="button" className={styles.socialBtn}>
                <img src={facebookIcon} alt="Facebook" className={styles.socialIcon} />
                <span className={styles.socialText}>Login with Facebook</span>
              </button>
              <button type="button" className={styles.socialBtn}>
                <img src={appleIcon} alt="Apple" className={styles.socialIcon} />
                <span className={styles.socialText}>Login with Apple</span>
              </button>
            </div>

            <div className={styles.footer}>
              First time here? <a href="/register" className={styles.footerLink}>Sign up for free</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
