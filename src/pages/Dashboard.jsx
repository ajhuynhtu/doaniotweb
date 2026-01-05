import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Dashboard.module.css';

// Import device images
import aromaImg from '../assets/aroma.png';
import airImg from '../assets/air.png';
import humidImg from '../assets/humid.png';
import speakerImg from '../assets/speaker.png';
import lamp1Img from '../assets/lamp1.png';
import lamp2Img from '../assets/lamp2.png';
import houseImg from '../assets/house.png';

// Mock Data
const mockDevices = [
    { id: 1, name: 'Smart Lamp', room: 'Living Room', image: lamp1Img, isOn: true },
    { id: 2, name: 'Aroma Diffuser', room: 'Living Room', image: aromaImg, isOn: true },
    { id: 3, name: 'Speaker', room: 'Living Room', image: speakerImg, isOn: true },
    { id: 4, name: 'Speaker', room: 'Bedroom', image: speakerImg, isOn: true },
    { id: 5, name: 'Air Conditioner', room: 'Living Room', image: airImg, isOn: true },
    { id: 6, name: 'Smart Lamp', room: 'Living Room', image: lamp2Img, isOn: true },
];

const mockMembers = [
    { id: 1, avatar: 'https://i.pravatar.cc/150?u=1' },
    { id: 2, avatar: 'https://i.pravatar.cc/150?u=2' },
    { id: 3, avatar: 'https://i.pravatar.cc/150?u=3' },
    { id: 4, avatar: 'https://i.pravatar.cc/150?u=4' },
    { id: 5, avatar: 'https://i.pravatar.cc/150?u=5' },
];

const Dashboard = () => {
    const navigate = useNavigate();
    const [devices, setDevices] = useState(mockDevices);

    const toggleDevice = (id) => {
        setDevices(devices.map(device => 
            device.id === id ? { ...device, isOn: !device.isOn } : device
        ));
    };

    return (
        <div className={styles.container}>
            {/* Dark Header Section */}
            <div className={styles.headerSection}>
                <div className={styles.topBar}>
                    <h1 className={styles.pageTitle}>Spaces</h1>
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
                {/* Devices Grid */}
                <div className={styles.sectionHeader}>
                    <h2>Your Devices</h2>
                    <span className={styles.badge}>{devices.length}</span>
                </div>

                <div className={styles.devicesGrid}>
                    {devices.map(device => (
                        <div key={device.id} className={styles.deviceCard}>
                            <div className={styles.deviceImageWrapper}>
                                <img src={device.image} alt={device.name} className={styles.deviceImage} />
                            </div>
                            <div className={styles.deviceInfo}>
                                <h3>{device.name}</h3>
                                <p>{device.room}</p>
                            </div>
                            <div className={styles.toggleWrapper}>
                                <label className={styles.switch}>
                                    <input 
                                        type="checkbox" 
                                        checked={device.isOn} 
                                        onChange={() => toggleDevice(device.id)} 
                                    />
                                    <span className={styles.slider}></span>
                                </label>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom Section */}
                <div className={styles.bottomGrid}>
                    {/* Members */}
                    <div className={styles.membersCard}>
                        <h3>Members</h3>
                        <div className={styles.membersList}>
                            {mockMembers.map(member => (
                                <img key={member.id} src={member.avatar} alt="Member" className={styles.memberAvatar} />
                            ))}
                            <button className={styles.addMemberBtn}>+</button>
                        </div>
                    </div>

                    {/* Space Map */}
                    <div className={styles.mapCard} onClick={() => navigate('/map-view')} style={{cursor: 'pointer'}}>
                        <div className={styles.mapText}>
                            <h3>Your space map</h3>
                            <p>See your rooms and all the devices that are related to them.</p>
                        </div>
                        <div className={styles.mapVisual}>
                            {/* Simple CSS shape to represent map */}
                            <div className={styles.mapShape}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
