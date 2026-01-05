import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LinkDevice.module.css';
import lampImg from '../assets/lamp1.png'; // Using lamp1 as shown in design

const LinkDevice = () => {
  const navigate = useNavigate();
  const [deviceName, setDeviceName] = useState('Smart Lamp');
  const [selectedRoom, setSelectedRoom] = useState('Living room');

  const rooms = ['Living room', 'Kitchen', 'Bedroom', 'Bathroom'];

  const handleContinue = () => {
    // Navigate back to connect devices with connected status
    // Assuming we are connecting the Smart Lamp (id: 5 or 6)
    // For demo purposes, let's say we connected the first Smart Lamp (id: 5)
    navigate('/connect-devices', { 
        state: { 
            deviceLinked: 5, // ID of Smart Lamp
            houseName: location.state?.houseName || "My Home"
        } 
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={() => navigate(-1)}>←</button>
        <div className={styles.headerContent}>
          <h2>Link new device</h2>
          <p>Connect with your space</p>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.imageWrapper}>
          <div className={styles.circleBg}>
            <img src={lampImg} alt="Smart Lamp" className={styles.deviceImage} />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>What is your device name?</label>
          <input 
            type="text" 
            className={styles.input} 
            value={deviceName} 
            onChange={(e) => setDeviceName(e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Where is your device located?</label>
          <div className={styles.roomList}>
            {rooms.map((room) => (
              <button 
                key={room} 
                className={`${styles.roomBtn} ${selectedRoom === room ? styles.activeRoom : ''}`}
                onClick={() => setSelectedRoom(room)}
              >
                {room}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.footer}>
        <span className={styles.footerText}>Customize and link your new device</span>
        <div className={styles.footerButtons}>
          <button className={styles.skipBtn} onClick={() => navigate('/dashboard')}>Skip</button>
          <button className={styles.continueBtn} onClick={handleContinue}>Continue</button>
        </div>
      </div>
    </div>
  );
};

export default LinkDevice;
