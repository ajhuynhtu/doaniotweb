import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CreateSpace.module.css';
import houseImg from '../assets/house.png';

// Bạn có thể thay thế ảnh này bằng ảnh thật từ assets nếu có
// Tạm thời dùng ảnh online giống mẫu hoặc ảnh placeholder
const defaultHouseImage = houseImg;

const CreateSpace = () => {
  const navigate = useNavigate();
  const [houseName, setHouseName] = useState('My Home');

  const handleSuggestionClick = (name) => {
    setHouseName(name);
  };

  const handleContinue = () => {
    // Xử lý logic lưu space ở đây (ví dụ lưu vào firebase)
    // Sau đó chuyển hướng
    console.log("Creating space:", houseName);
    navigate('/connect-devices', { state: { houseName } }); 
  };

  return (
    <div className={styles.container}>
      {/* Header tối màu */}
      <div className={styles.header}>
        <button className={styles.backButton} onClick={() => navigate(-1)}>
           ←
        </button>
        <div className={styles.headerTitle}>
            <h2>Create a new space</h2>
            <p>Add the first details</p>
        </div>
        <div className={styles.stepIndicator}>
            Step <strong>1</strong> | 7
        </div>
      </div>

      {/* Nội dung chính */}
      <div className={styles.content}>
        
        {/* Ảnh nhà */}
        <div className={styles.imageWrapper}>
            <img src={defaultHouseImage} alt="House Preview" className={styles.houseImage} />
            <button className={styles.uploadButton}>
                <span role="img" aria-label="image">🖼️</span>
            </button>
        </div>

        {/* Input tên nhà */}
        <div className={styles.formGroup}>
            <label className={styles.label}>What's your house name?</label>
            <input 
                type="text" 
                value={houseName}
                onChange={(e) => setHouseName(e.target.value)}
                className={styles.input}
            />
        </div>

        {/* Gợi ý tên */}
        <div className={styles.suggestions}>
            <p>No inspiration? Try one of these names.</p>
            <div className={styles.suggestionButtons}>
                {['Home', 'Office', 'My happy place'].map(name => (
                    <button 
                        key={name} 
                        className={styles.suggestionBtn}
                        onClick={() => handleSuggestionClick(name)}
                    >
                        {name}
                    </button>
                ))}
            </div>
        </div>

      </div>
      
      {/* Footer bar */}
      <div className={styles.footer}>
          <div className={styles.footerInputWrapper}>
            <input 
                type="text" 
                placeholder="Name your new space" 
                value={houseName} 
                readOnly 
                className={styles.footerInput}
            />
          </div>
          <button className={styles.continueButton} onClick={handleContinue}>
              Continue
          </button>
      </div>
    </div>
  );
};

export default CreateSpace;
