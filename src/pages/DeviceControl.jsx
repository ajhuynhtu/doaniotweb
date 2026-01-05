import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './DeviceControl.module.css';

// Assets
import speakerImg from '../assets/speaker.png';
import albumArt from '../assets/vang.png';
import houseImg from '../assets/house.png';

const DeviceControl = () => {
    const navigate = useNavigate();
    const [isOn, setIsOn] = useState(true);
    const [volume, setVolume] = useState(70);
    const [scenes, setScenes] = useState([
        { id: 1, name: 'Morning coffee', time: 'Everyday | 08:15 AM - 09:00 AM', isActive: false },
        { id: 2, name: 'Movie Night', time: 'Mon, Fri | 08:00 PM - 10:00 PM', isActive: true },
        { id: 3, name: '32th Birthday Kristin', time: 'July 30th | 07:00 PM - 10:00 PM', isActive: false },
    ]);

    const toggleScene = (id) => {
        setScenes(scenes.map(scene => 
            scene.id === id ? { ...scene, isActive: !scene.isActive } : scene
        ));
    };

    return (
        <div className={styles.container}>
             {/* Header Section (Similar to other pages but lighter) */}
             <div className={styles.headerSection}>
                <div className={styles.topBar}>
                    <button className={styles.backButton} onClick={() => navigate(-1)}>
                        ←
                    </button>
                    <div className={styles.headerTitle}>
                        <span className={styles.subTitle}>Living room</span>
                        <h1>Speaker</h1>
                    </div>
                    <div className={styles.homeSelector}>
                        <img src={houseImg} alt="Home" className={styles.homeIcon} />
                        <span>My Home</span>
                        <span className={styles.chevron}>▼</span>
                    </div>
                </div>
            </div>

            <div className={styles.mainContent}>
                {/* Left Column: Device Control */}
                <div className={styles.leftColumn}>
                    <div className={styles.deviceVisual}>
                        <div className={styles.circleBg}>
                             <div className={styles.ripple1}></div>
                             <div className={styles.ripple2}></div>
                             <div className={styles.ripple3}></div>
                        </div>
                        <img src={speakerImg} alt="Speaker" className={styles.mainDeviceImage} />
                    </div>

                    <div className={styles.controlsGroup}>
                        <div className={styles.controlRow}>
                            <span className={styles.label}>Status</span>
                            <div 
                                className={`${styles.toggleSwitch} ${isOn ? styles.active : ''}`}
                                onClick={() => setIsOn(!isOn)}
                            >
                                <div className={styles.toggleKnob}></div>
                                <span className={styles.toggleLabel}>{isOn ? 'ON' : 'OFF'}</span>
                            </div>
                        </div>

                        <div className={styles.controlRow}>
                            <span className={styles.label}>Battery</span>
                            <div className={styles.batteryStatus}>
                                <span>90%</span>
                                <span className={styles.batteryIcon}>🔋</span>
                            </div>
                        </div>

                        <div className={styles.controlRow}>
                            <span className={styles.label}>Volume</span>
                            <div className={styles.volumeSliderContainer}>
                                <div className={styles.volumeIcon}>🔊</div>
                                <input 
                                    type="range" 
                                    min="0" 
                                    max="100" 
                                    value={volume} 
                                    onChange={(e) => setVolume(e.target.value)}
                                    className={styles.volumeSlider}
                                />
                                <span className={styles.volumeValue}>{volume}%</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Widgets */}
                <div className={styles.rightColumn}>
                    {/* Spotify Widget */}
                    <div className={styles.spotifyCard}>
                        <div className={styles.cardHeader}>
                            <h3>Spotify</h3>
                            <span className={styles.roomLabel}>Living room</span>
                            <span className={styles.moreIcon}>⌄</span>
                        </div>
                        
                        <div className={styles.albumArtWrapper}>
                            <img src={albumArt} alt="Album Art" className={styles.albumArt} />
                        </div>

                        <div className={styles.playerControls}>
                            <div className={styles.trackInfo}>
                                <h4>As it was</h4>
                                <p>Harry Styles</p>
                            </div>
                            
                            <div className={styles.progressContainer}>
                                <div className={styles.progressBar}>
                                    <div className={styles.progressFill} style={{width: '40%'}}></div>
                                    <div className={styles.progressKnob} style={{left: '40%'}}></div>
                                </div>
                                <span className={styles.timeText}>2:45 min</span>
                            </div>

                            <div className={styles.buttonsRow}>
                                <button className={styles.controlBtn}>⏮</button>
                                <button className={`${styles.controlBtn} ${styles.playBtn}`}>⏸</button>
                                <button className={styles.controlBtn}>⏭</button>
                            </div>
                        </div>
                    </div>

                    {/* Scenes Widget */}
                    <div className={styles.scenesCard}>
                        <div className={styles.cardHeader}>
                            <div className={styles.titleGroup}>
                                <h3>Scenes</h3>
                                <span className={styles.badge}>3</span>
                            </div>
                        </div>

                        <div className={styles.scenesList}>
                            {scenes.map(scene => (
                                <div key={scene.id} className={styles.sceneItem}>
                                    <div className={styles.sceneInfo}>
                                        <h4>{scene.name}</h4>
                                        <p>{scene.time}</p>
                                    </div>
                                    <div 
                                        className={`${styles.smallToggle} ${scene.isActive ? styles.active : ''}`}
                                        onClick={() => toggleScene(scene.id)}
                                    >
                                        <div className={styles.smallKnob}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeviceControl;
