import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './ConfirmChoices.module.css';

// Import assets
import houseImg from '../assets/house.png';

// Mock data (in a real app, this would come from state/context/API)
const mockRooms = [
    { id: 1, name: 'Living Room', size: '20 m²', icon: '🛋️' },
    { id: 2, name: 'Kitchen', size: '12 m²', icon: '🍳' },
    { id: 3, name: 'Bedroom', size: '16 m²', icon: '🛏️' },
    { id: 4, name: 'Bedroom', size: '6 m²', icon: '🛏️' },
];

const mockMembers = [
    { id: 1, name: 'Albert Flores', email: 'albert.flores@gmail.com', avatar: 'https://i.pravatar.cc/150?u=albert' },
    { id: 2, name: 'Annette Black', email: 'annette.black@gmail.com', avatar: 'https://i.pravatar.cc/150?u=annette' },
];

const ConfirmChoices = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    // Get state passed from previous steps
    const houseName = location.state?.houseName || "My Home";
    const selectedDevices = location.state?.selectedDevices || [];

    // If no devices passed (direct access), use mock devices for display
    const devicesToDisplay = selectedDevices.length > 0 ? selectedDevices : [
        { id: 1, name: 'Smart Lamp', type: 'Lamp', location: 'Living Room', image: 'https://images.unsplash.com/photo-1507473888900-52e1ad1459ce?auto=format&fit=crop&w=100&q=80' },
        { id: 2, name: 'Speaker', type: 'Speaker', location: 'Living Room', image: 'https://images.unsplash.com/photo-1543512214-318c7553f230?auto=format&fit=crop&w=100&q=80' },
        { id: 3, name: 'Humidifier', type: 'Humidifier', location: 'Living Room', image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=100&q=80' },
    ];

    return (
        <div className={styles.container}>
            {/* Header */}
            <div className={styles.header}>
                <button className={styles.backButton} onClick={() => navigate(-1)}>
                    ←
                </button>
                <div className={styles.headerTitle}>
                    <h2>Create a new space</h2>
                    <p>Confirm your choices</p>
                </div>
                <div className={styles.stepIndicator}>
                    Step <strong>7</strong> | 7
                </div>
            </div>

            {/* Space Summary Card */}
            <div className={styles.spaceCardWrapper}>
                <div className={styles.spaceCard}>
                    <div className={styles.spaceInfoLeft}>
                        <img src={houseImg} alt="House" className={styles.spaceThumb} />
                        <div className={styles.spaceText}>
                            <h3>{houseName} <span className={styles.editIcon}>✎</span></h3>
                            <p className={styles.spaceAddress}>11-5 Raddington Rd, London, UK</p>
                        </div>
                    </div>
                    <div className={styles.spaceStats}>
                        <div className={`${styles.statTag} ${styles.statRooms}`}>
                            <span className={styles.dot}>●</span> {mockRooms.length} Rooms
                        </div>
                        <div className={`${styles.statTag} ${styles.statDevices}`}>
                            <span className={styles.dot}>●</span> {devicesToDisplay.length} Devices
                        </div>
                        <div className={`${styles.statTag} ${styles.statMembers}`}>
                            <span className={styles.dot}>●</span> {mockMembers.length} Members
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.contentGrid}>
                {/* Rooms Section */}
                <div className={styles.section}>
                    <div className={styles.sectionTitle}>
                        Your Rooms <span className={styles.countBadge}>{mockRooms.length}</span>
                    </div>
                    <div className={styles.listContainer}>
                        {mockRooms.map(room => (
                            <div key={room.id} className={styles.listItem}>
                                <div className={styles.itemLeft}>
                                    <div className={styles.itemIconWrapper}>
                                        {room.icon}
                                    </div>
                                    <div className={styles.itemInfo}>
                                        <h4>{room.name}</h4>
                                        <p className={styles.itemSubtext}>{room.size}</p>
                                    </div>
                                </div>
                                <div className={styles.itemAction}>•••</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Devices Section */}
                <div className={styles.section}>
                    <div className={styles.sectionTitle}>
                        Your Devices <span className={styles.countBadge}>{devicesToDisplay.length}</span>
                    </div>
                    <div className={styles.listContainer}>
                        {devicesToDisplay.map(device => (
                            <div key={device.id} className={styles.listItem}>
                                <div className={styles.itemLeft}>
                                    <img src={device.image} alt={device.name} className={styles.itemImage} />
                                    <div className={styles.itemInfo}>
                                        <h4>{device.name}</h4>
                                        <p className={styles.itemSubtext}>{device.location || 'Living Room'}</p>
                                    </div>
                                </div>
                                <div className={styles.itemAction}>🗑️</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Members Section */}
                <div className={styles.membersSection}>
                    <div className={styles.sectionTitle}>
                        Your Members <span className={styles.countBadge}>{mockMembers.length}</span>
                    </div>
                    <div className={styles.membersList}>
                        {mockMembers.map(member => (
                            <div key={member.id} className={styles.listItem}>
                                <div className={styles.itemLeft}>
                                    <img src={member.avatar} alt={member.name} className={styles.itemImage} />
                                    <div className={styles.itemInfo}>
                                        <h4>{member.name}</h4>
                                        <p className={styles.itemSubtext}>{member.email}</p>
                                    </div>
                                </div>
                                <div className={styles.itemAction}>🗑️</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className={styles.footer}>
                <span className={styles.footerText}>Check all the information and start with your new space.</span>
                <button className={styles.doneButton} onClick={() => navigate('/dashboard')}>
                    Done
                </button>
            </div>
        </div>
    );
};

export default ConfirmChoices;
