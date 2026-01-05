import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './MapView.module.css';

// Import device images (reusing from Dashboard)
import aromaImg from '../assets/aroma.png';
import airImg from '../assets/air.png';
import humidImg from '../assets/humid.png';
import speakerImg from '../assets/speaker.png';
import lamp1Img from '../assets/lamp1.png';
import lamp2Img from '../assets/lamp2.png';
import houseImg from '../assets/house.png';

// Mock Data
const devicesData = [
    { id: 1, name: 'Smart Lamp', room: 'Living Room', image: lamp1Img, isOn: true },
    { id: 2, name: 'Aroma Diffuser', room: 'Living Room', image: aromaImg, isOn: true },
    { id: 3, name: 'Air Conditioner', room: 'Living Room', image: airImg, isOn: true },
    { id: 4, name: 'Speaker', room: 'Living Room', image: speakerImg, isOn: true },
    { id: 5, name: 'Smart Lamp', room: 'Bedroom', image: lamp2Img, isOn: false },
    { id: 6, name: 'Speaker', room: 'Bedroom', image: speakerImg, isOn: true },
];

const MapView = () => {
    const navigate = useNavigate();
    const [viewMode, setViewMode] = useState('map'); // 'map' or 'list'

    return (
        <div className={styles.container}>
            {/* Header Section (Similar to Dashboard but with Back button) */}
            <div className={styles.headerSection}>
                <div className={styles.topBar}>
                    <button className={styles.backButton} onClick={() => navigate(-1)}>
                        ←
                    </button>
                    <div className={styles.headerTitle}>
                        <h1>Map view</h1>
                    </div>
                    <div className={styles.homeSelector}>
                        <img src={houseImg} alt="Home" className={styles.homeIcon} />
                        <span>My Home</span>
                        <span className={styles.chevron}>▼</span>
                    </div>
                </div>

                <div className={styles.widgetsRow}>
                    {/* Weather Widget */}
                    <div className={`${styles.widget} ${styles.weatherWidget}`}>
                        <div className={styles.weatherIcon}>⛅</div>
                        <div className={styles.weatherInfo}>
                            <div className={styles.weatherMain}>
                                <span className={styles.weatherText}>Partly Cloudy</span>
                                <span className={styles.temperature}>23°</span>
                            </div>
                            <div className={styles.humidity}>
                                <span className={styles.dropIcon}>💧</span>
                                <span>Humidity</span>
                                <strong>67%</strong>
                            </div>
                        </div>
                    </div>

                    {/* Quick Action: Lights */}
                    <div className={`${styles.widget} ${styles.actionWidget}`}>
                        <div className={styles.actionIconBg} style={{background: '#fff7ed'}}>
                            <span style={{fontSize: '1.5rem'}}>💡</span>
                        </div>
                        <div className={styles.actionText}>
                            <span className={styles.actionLabel}>All lights on</span>
                            <span className={styles.actionTarget}>Home</span>
                        </div>
                    </div>

                    {/* Quick Action: Music */}
                    <div className={`${styles.widget} ${styles.actionWidget}`}>
                         <div className={styles.actionIconBg} style={{background: '#f3e8ff'}}>
                            <span style={{fontSize: '1.5rem'}}>🎵</span>
                        </div>
                        <div className={styles.actionText}>
                            <span className={styles.actionLabel}>Play music</span>
                            <span className={styles.actionTarget}>Living room</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className={styles.mainContent}>
                {/* Your Rooms Header with Toggle */}
                <div className={styles.sectionHeader}>
                    <div className={styles.titleGroup}>
                        <h2>Your Rooms</h2>
                        <span className={styles.badge}>4</span>
                    </div>
                    <div className={styles.viewToggle}>
                        <button 
                            className={`${styles.toggleBtn} ${viewMode === 'map' ? styles.active : ''}`}
                            onClick={() => setViewMode('map')}
                        >
                            Map view
                        </button>
                        <button 
                            className={`${styles.toggleBtn} ${viewMode === 'list' ? styles.active : ''}`}
                            onClick={() => setViewMode('list')}
                        >
                            List view
                        </button>
                    </div>
                </div>

                {/* Map Grid */}
                {viewMode === 'map' && (
                    <div className={styles.mapGrid}>
                        {/* Bedroom - Left Column */}
                        <div className={styles.roomCard} style={{gridArea: 'bedroom'}}>
                            <div className={styles.roomContent}>
                                <span className={styles.roomIcon}>🛏️</span>
                                <h3>Bedroom</h3>
                                <span className={styles.deviceCount}>● 3 devices</span>
                            </div>
                        </div>

                        {/* Living Room - Center */}
                        <div className={styles.roomCard} style={{gridArea: 'living'}} onClick={() => navigate('/room-detail')}>
                            <div className={styles.roomContent}>
                                <span className={styles.roomIcon}>🛋️</span>
                                <h3>Living room</h3>
                                <span className={styles.deviceCount}>● 4 devices</span>
                            </div>
                        </div>

                        {/* Bathroom - Top Right */}
                        <div className={styles.roomCard} style={{gridArea: 'bathroom'}}>
                            <div className={styles.roomContent}>
                                <span className={styles.roomIcon}>🛁</span>
                                <h3>Bathroom</h3>
                                <span className={styles.deviceCount}>● 2 devices</span>
                            </div>
                        </div>

                        {/* Kitchen - Bottom Right */}
                        <div className={styles.roomCard} style={{gridArea: 'kitchen'}}>
                            <div className={styles.roomContent}>
                                <span className={styles.roomIcon}>🍳</span>
                                <h3>Kitchen</h3>
                                <span className={styles.deviceCount}>● 1 devices</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Devices List (Horizontal Scroll) */}
                <div className={styles.devicesSection}>
                    <div className={styles.sectionHeader}>
                        <div className={styles.titleGroup}>
                            <h2>Devices</h2>
                            <span className={styles.badge}>{devicesData.length}</span>
                        </div>
                    </div>
                    
                    <div className={styles.devicesScroll}>
                        {devicesData.map(device => (
                            <div key={device.id} className={styles.deviceCard}>
                                <div className={styles.deviceImageWrapper}>
                                    <img src={device.image} alt={device.name} className={styles.deviceImage} />
                                </div>
                                <div className={styles.deviceInfo}>
                                    <h3>{device.name}</h3>
                                    <p>{device.room}</p>
                                </div>
                            </div>
                        ))}
                         {/* Fake extra cards to show scrolling if needed */}
                         <div className={styles.deviceCard}>
                                <div className={styles.deviceImageWrapper}>
                                    <img src={lamp1Img} alt="More" className={styles.deviceImage} />
                                </div>
                                <div className={styles.deviceInfo}>
                                    <h3>Smart Lamp</h3>
                                    <p>Kitchen</p>
                                </div>
                         </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MapView;
