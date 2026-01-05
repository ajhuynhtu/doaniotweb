import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate, Link } from 'react-router-dom';
import styles from './Register.module.css';

// Assets
import smHomeImg from '../assets/smhome.png';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // Registration successful, redirect to verify code
      navigate('/verify-code'); 
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={styles.container}>
      {/* Left side: similar to Login */}
      <div className={styles.leftSide}>
        <div className={styles.illustrationContainer}>
          <img src={smHomeImg} alt="Smart Home" className={styles.houseImage} />
          <div className={styles.welcomeText}>
            <h2 className={styles.welcomeTitle}>
              Join us<br/>make your home smart 🚀
            </h2>
            <p className={styles.welcomeSubtitle}>
              Create an account to start managing your smart devices today.
            </p>
          </div>
        </div>
      </div>

      {/* Right side: form register */}
      <div className={styles.rightSide}>
        <div className={styles.formContainer}>
          <h2 className={styles.formTitle}>Register</h2>
          <p className={styles.formSubtitle}>Create your free account.</p>
          
          {error && <div style={{color: '#ef4444', marginBottom: '16px', fontSize: '0.9rem', textAlign: 'center'}}>{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className={styles.inputField}
              />
            </div>
            
            <div className={styles.inputGroup}>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className={styles.inputField}
              />
            </div>

            <div className={styles.inputGroup}>
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
                className={styles.inputField}
              />
            </div>
            
            <button type="submit" className={styles.submitButton}>Sign Up</button>
            
            <div className={styles.footer}>
              Already have an account? <Link to="/login" className={styles.footerLink}>Login</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
