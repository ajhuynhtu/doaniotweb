import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import styles from './ACControl.module.css';
import airImg from '../assets/air.png';
import dialImg from '../assets/24.png';

const ACControl = () => {
  const navigate = useNavigate();
  const [isOn, setIsOn] = useState(true);
  const [intensity, setIntensity] = useState(70);
  const [activeMode, setActiveMode] = useState('Cold');
  const [scenes, setScenes] = useState([
    { id: 1, name: 'Movie Night', time: 'Mon, Fri | 08:00 PM - 10:00 PM', active: true },
    { id: 2, name: '32th Birthday Kristin', time: 'July 30th | 07:00 PM - 10:00 PM', active: false },
  ]);

  const toggleScene = (id) => {
    setScenes(scenes.map(scene => 
      scene.id === id ? { ...scene, active: !scene.active } : scene
    ));
  };

  const modes = [
    { name: 'Cold', icon: '❄️' },
    { name: 'Wind', icon: '🍃' },
    { name: 'Sleep', icon: '💤' },
    { name: 'Swing', icon: '🔄' },
  ];

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.mainContent}>
        <Header title="Living room" subtitle="Air Conditioner" />
        
        <div className={styles.contentGrid}>
          {/* Left Panel */}
          <div className={styles.leftPanel}>
            <div className={styles.deviceImageContainer}>
              <div className={styles.glowEffect}></div>
              <img src={airImg} alt="Air Conditioner" className={styles.deviceImage} />
            </div>

            <div className={styles.controlRow}>
              <span className={styles.label}>Status</span>
              <label className={styles.switch}>
                <input 
                  type="checkbox" 
                  checked={isOn} 
                  onChange={() => setIsOn(!isOn)} 
                />
                <span className={styles.slider}></span>
              </label>
            </div>

            <div className={styles.controlRow}>
              <span className={styles.label}>Filter Battery</span>
              <span className={styles.value}>90% 🔋</span>
            </div>

            <div className={styles.controlRow}>
              <span className={styles.label}>Intensity</span>
              <div className={styles.intensityWrapper}>
                <span className={styles.intensityIcon}>🔊</span>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={intensity} 
                  onChange={(e) => setIntensity(e.target.value)}
                  className={styles.intensitySlider}
                />
                <span className={styles.intensityValue}>{intensity}%</span>
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className={styles.rightPanel}>
            <div className={styles.card}>
              <h3>Set Temperature</h3>
              <div className={styles.dialContainer}>
                <img src={dialImg} alt="Temperature Dial" className={styles.dialImage} />
              </div>

              <div className={styles.modeGrid}>
                {modes.map((mode) => (
                  <button
                    key={mode.name}
                    className={`${styles.modeBtn} ${activeMode === mode.name ? styles.activeMode : ''}`}
                    onClick={() => setActiveMode(mode.name)}
                  >
                    <span className={styles.modeIcon}>{mode.icon}</span>
                    <span className={styles.modeName}>{mode.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.scenesCard}>
              <div className={styles.scenesHeader}>
                <h3>Scenes</h3>
                <span className={styles.badge}>2</span>
              </div>
              <div className={styles.scenesList}>
                {scenes.map((scene) => (
                  <div key={scene.id} className={styles.sceneItem}>
                    <div className={styles.sceneInfo}>
                      <h4>{scene.name}</h4>
                      <p>{scene.time}</p>
                    </div>
                    <label className={styles.switch}>
                      <input 
                        type="checkbox" 
                        checked={scene.active} 
                        onChange={() => toggleScene(scene.id)} 
                      />
                      <span className={styles.slider}></span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ACControl;
