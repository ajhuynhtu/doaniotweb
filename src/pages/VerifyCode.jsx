import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './VerifyCode.module.css';

// Assets
import home2Img from '../assets/home2.png';

export default function VerifyCode() {
  const [code, setCode] = useState(['', '', '', '']);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const handleChange = (index, value) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 4);
    if (!/^\d+$/.test(pastedData)) return;

    const newCode = [...code];
    pastedData.split('').forEach((char, index) => {
      if (index < 4) newCode[index] = char;
    });
    setCode(newCode);
    
    // Focus last filled input or last input
    const focusIndex = Math.min(pastedData.length, 3);
    inputRefs.current[focusIndex].focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fullCode = code.join('');
    if (fullCode.length !== 4) return;

    // Simulate verification
    console.log('Verifying code:', fullCode);
    navigate('/onboarding-profile'); // Navigate to Onboarding Profile (Hello Andre)
  };

  return (
    <div className={styles.container}>
      {/* Left Side - Illustration */}
      <div className={styles.leftSide}>
        <div className={styles.illustrationContainer}>
          <img src={home2Img} alt="Smart Home Security" className={styles.houseImage} />
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
                <span className={styles.dot}></span>
                <span className={`${styles.dot} ${styles.activeDot}`}></span>
                <span className={styles.dot}></span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Verify Code Form */}
      <div className={styles.rightSide}>
        <div className={styles.formContainer}>
          <h2 className={styles.formTitle}>Verify Code</h2>
          <p className={styles.formSubtitle}>
            We just sent a 4-digit verification code to<br/>
            <strong>robert.fox@gmail.com</strong>. Enter the code in the box below<br/>
            to continue.
          </p>
          
          <form onSubmit={handleSubmit}>
            <div className={styles.codeInputs}>
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={el => inputRefs.current[index] = el}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className={`${styles.codeInput} ${digit ? styles.filled : ''}`}
                />
              ))}
            </div>

            <div className={styles.resendText}>
              Didn't receive a code? <a href="#" className={styles.resendLink}>Resend Code</a>
            </div>

            <button type="submit" className={styles.submitButton}>
              Next
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
