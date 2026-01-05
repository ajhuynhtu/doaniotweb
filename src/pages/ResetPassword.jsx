import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ResetPassword.module.css';

// Assets
import smHomeImg from '../assets/smhome.png';

// Icons
const EyeIcon = ({ visible, onClick }) => (
  <button type="button" className={styles.togglePassword} onClick={onClick}>
    {visible ? (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
        <circle cx="12" cy="12" r="3"></circle>
      </svg>
    ) : (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
        <line x1="1" y1="1" x2="23" y2="23"></line>
      </svg>
    )}
  </button>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Validation States
  const [validations, setValidations] = useState({
    length: false,
    numberOrSymbol: false,
    case: false
  });

  useEffect(() => {
    setValidations({
      length: password.length >= 8,
      numberOrSymbol: /[0-9!@#$%^&*(),.?":{}|<>]/.test(password),
      case: /[a-z]/.test(password) && /[A-Z]/.test(password)
    });
  }, [password]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validations.length || !validations.numberOrSymbol || !validations.case) return;
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/'); // Redirect to login or home after reset
    }, 2000);
  };

  // Calculate progress bar width based on validations passed
  const passedCount = Object.values(validations).filter(Boolean).length;
  const progressWidth = `${(passedCount / 3) * 100}%`;
  
  // Progress bar color
  let progressColor = '#e2e8f0'; // Gray
  if (passedCount === 1) progressColor = '#ef4444'; // Red
  if (passedCount === 2) progressColor = '#f59e0b'; // Yellow/Orange
  if (passedCount === 3) progressColor = '#22c55e'; // Green

  return (
    <div className={styles.container}>
      {/* Left Side - Illustration (Reused from Login) */}
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
            {/* Pagination dots simulation */}
            <div className={styles.dots}>
                <span className={styles.dot}></span>
                <span className={`${styles.dot} ${styles.activeDot}`}></span>
                <span className={styles.dot}></span>
                <span className={styles.dot}></span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Reset Password Form */}
      <div className={styles.rightSide}>
        <div className={styles.formContainer}>
          <h2 className={styles.formTitle}>Reset password</h2>
          
          <form onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <div className={styles.passwordWrapper}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password" // In image it shows dots, usually placeholder is empty or 'Password'
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className={styles.inputField}
                />
                <EyeIcon visible={showPassword} onClick={() => setShowPassword(!showPassword)} />
              </div>
            </div>

            {/* Strength Meter */}
            <div className={styles.strengthMeter}>
                <div 
                    className={styles.strengthBar} 
                    style={{ width: progressWidth, backgroundColor: progressColor }}
                ></div>
            </div>

            {/* Requirements List */}
            <div className={styles.requirements}>
                <div className={`${styles.reqItem} ${validations.length ? styles.met : ''}`}>
                    {validations.length ? <CheckIcon /> : <span className={styles.bullet}>•</span>}
                    <span>Least 8 characters</span>
                </div>
                <div className={`${styles.reqItem} ${validations.numberOrSymbol ? styles.met : ''}`}>
                    {validations.numberOrSymbol ? <CheckIcon /> : <span className={styles.bullet}>•</span>}
                    <span>Least one number (0-9) or symbol</span>
                </div>
                <div className={`${styles.reqItem} ${validations.case ? styles.met : ''}`}>
                    {validations.case ? <CheckIcon /> : <span className={styles.bullet}>•</span>}
                    <span>Lowercase (a-z) and uppercase (A-Z)</span>
                </div>
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.passwordWrapper}>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  className={styles.inputField}
                />
                <EyeIcon visible={showConfirmPassword} onClick={() => setShowConfirmPassword(!showConfirmPassword)} />
              </div>
            </div>

            <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Reset password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
