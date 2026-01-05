import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './RoomDetail.module.css';

// Import assets
import roomBg from '../assets/gil.png';
import lampImg from '../assets/lamp1.png';
import speakerImg from '../assets/speaker.png';
import aromaImg from '../assets/aroma.png';
import humidImg from '../assets/humid.png';

const RoomDetail = () => {
    const navigate = useNavigate();
    
    // Mock devices data
    const [devices, setDevices] = useState([
        { id: 1, name: 'Smart Lamp', room: 'Living Room', image: lampImg, isOn: true, type: 'lamp' },
        { id: 2, name: 'Speaker', room: 'Living Room', image: speakerImg, isOn: false, type: 'speaker' },
        { id: 3, name: 'Aroma Diffuser', room: 'Living Room', image: aromaImg, isOn: false, type: 'aroma' },
        { id: 4, name: 'Humidifier', room: 'Living Room', image: humidImg, isOn: false, type: 'humid' },
    ]);

    const toggleDevice = (id) => {
        setDevices(devices.map(device => 
            device.id === id ? { ...device, isOn: !device.isOn } : device
        ));
    };

    return (
        <div className={styles.container} style={{ backgroundImage: `url(${roomBg})` }}>
            {/* Header / Top Bar */}
            <div className={styles.header}>
                <button className={styles.backButton} onClick={() => navigate(-1)}>
                    ←
                </button>
                <div className={styles.breadcrumb}>
                    <span className={styles.breadcrumbParent}>My Home</span>
                    <span className={styles.breadcrumbSeparator}>/</span>
                    <span className={styles.breadcrumbCurrent}>Living Room</span>
                </div>
            </div>

            {/* Hotspots (Interactive Points on the image) */}
            <div className={styles.hotspotsContainer}>
                {/* Example positions - adjusted to match the visual approximately */}
                <div className={styles.hotspot} style={{ top: '30%', left: '45%' }}>
                    <div className={`${styles.hotspotDot} ${devices[0].isOn ? styles.active : ''}`}></div>
                </div>
                <div className={styles.hotspot} style={{ top: '55%', left: '65%' }}>
                    <div className={styles.hotspotDot}></div>
                </div>
                 <div className={styles.hotspot} style={{ top: '65%', left: '80%' }}>
                    <div className={styles.hotspotDot}></div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className={styles.bottomSection}>
                {/* Device Cards Scroll */}
                <div className={styles.cardsContainer}>
                    {devices.map(device => (
                        <div 
                            key={device.id} 
                            className={`${styles.deviceCard} ${device.isOn ? styles.cardActive : ''}`}
                            onClick={() => {
                                if (device.type === 'speaker') {
                                    navigate('/device-control');
                                } else {
                                    toggleDevice(device.id);
                                }
                            }}
                        >
                            <div className={styles.cardImageWrapper}>
                                <img src={device.image} alt={device.name} className={styles.deviceImage} />
                            </div>
                            <div className={styles.cardInfo}>
                                <div className={styles.cardText}>
                                    <h3 className={device.isOn ? styles.textWhite : ''}>{device.name}</h3>
                                    <p className={device.isOn ? styles.textWhiteAlpha : ''}>{device.room}</p>
                                </div>
                                <div className={styles.toggleWrapper}>
                                    <div className={`${styles.toggleSwitch} ${device.isOn ? styles.toggleOn : ''}`}>
                                        <div className={styles.toggleKnob}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Info Bar */}
                <div className={styles.infoBar}>
                    <div className={styles.infoItem}>
                        <span className={styles.infoIcon}>🌡</span>
                        <span className={styles.infoLabel}>Current temperature in the Living Room</span>
                        <span className={styles.infoValue}>25°</span>
                    </div>
                    <div className={styles.infoItem}>
                        <span className={styles.infoIcon}>💧</span>
                        <span className={styles.infoLabel}>Current humidity in the Living Room</span>
                        <span className={styles.infoValue}>67%</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomDetail;
