import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './ConnectDevices.module.css';

// Import images from assets
import aromaImg from '../assets/aroma.png';
import airImg from '../assets/air.png';
import humidImg from '../assets/humid.png';
import speakerImg from '../assets/speaker.png';
import lamp1Img from '../assets/lamp1.png';
import lamp2Img from '../assets/lamp2.png';

const defaultHouseImage = "https://images.unsplash.com/photo-1600596542815-27b88e54e60f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";

const devicesData = [
    { id: 1, name: 'Aroma Diffuser', image: aromaImg, type: 'Diffuser' },
    { id: 2, name: 'Air Conditioner', image: airImg, type: 'AC' },
    { id: 3, name: 'Humidifier', image: humidImg, type: 'Humidifier' },
    { id: 4, name: 'Speaker', image: speakerImg, type: 'Speaker' },
    { id: 5, name: 'Smart Lamp', image: lamp1Img, type: 'Lamp' },
    { id: 6, name: 'Smart Lamp', image: lamp2Img, type: 'Lamp' },
];

const ConnectDevices = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const houseName = location.state?.houseName || "My Home";

  const [connectedDevices, setConnectedDevices] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);

  // Filter devices based on search term
  const filteredDevices = devicesData.filter(device => 
    device.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Check if returning from LinkDevice
  React.useEffect(() => {
    if (location.state?.deviceLinked) {
        setConnectedDevices(prev => ({
            ...prev,
            [location.state.deviceLinked]: true
        }));
    }
  }, [location.state]);

  const toggleConnect = (id) => {
    // If not connected, go to Link Device page
    if (!connectedDevices[id]) {
        navigate('/link-device', { state: { houseName, deviceId: id } });
    } else {
        // If connected, disconnect (toggle off)
        setConnectedDevices(prev => ({
            ...prev,
            [id]: false
        }));
    }
  };

  const handleContinue = () => {
    // Lưu các thiết bị đã chọn
    const selectedDevices = devicesData.filter(d => connectedDevices[d.id]);
    console.log("Selected devices:", selectedDevices);
    navigate('/confirm-choices', { state: { houseName, selectedDevices } });
  };

  // Click outside to close dropdown
  React.useEffect(() => {
    const handleClickOutside = (event) => {
        if (!event.target.closest(`.${styles.searchBox}`)) {
            setShowSearchResults(false);
        }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className={styles.container}>
      {/* Header tối màu */}
      <div className={styles.header}>
        <button className={styles.backButton} onClick={() => navigate(-1)}>
           ←
        </button>
        <div className={styles.headerTitle}>
            <h2>Create a new space</h2>
            <p>Connect your devices</p>
        </div>
        <div className={styles.stepIndicator}>
            Step <strong>4</strong> | 7
        </div>
      </div>

      {/* Thông tin Space Card */}
      <div className={styles.spaceCardWrapper}>
          <div className={styles.spaceCard}>
              <div className={styles.spaceInfoLeft}>
                  <img src={defaultHouseImage} alt="House" className={styles.spaceThumb} />
                  <div className={styles.spaceText}>
                      <h3>{houseName} <span className={styles.editIcon}>✎</span></h3>
                      <p>11-5 Raddington Rd, London, UK</p>
                  </div>
              </div>
              <div className={styles.spaceStats}>
                  <div className={styles.statItem}><span className={styles.dot} style={{color:'#10b981'}}>●</span> 4 Rooms</div>
                  <div className={styles.statItem}><span className={styles.dot} style={{color:'#3b82f6'}}>●</span> {Object.keys(connectedDevices).filter(k => connectedDevices[k]).length} Devices</div>
                  <div className={styles.statItem}><span className={styles.dot} style={{color:'#6366f1'}}>●</span> 0 Members</div>
              </div>
          </div>
      </div>

      {/* Danh sách thiết bị */}
      <div className={styles.content}>
          <div className={styles.listHeader}>
              <div className={styles.listTitle}>
                  <h3>Link smart devices</h3>
                  <p>Current devices nearby</p>
              </div>
              <div className={styles.searchBox}>
                  <input 
                    type="text" 
                    placeholder="Search" 
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setShowSearchResults(e.target.value.length > 0);
                    }}
                    onFocus={() => setShowSearchResults(searchTerm.length > 0)}
                  />
                  <span className={styles.searchIcon}>🔍</span>

                  {/* Search Results Dropdown */}
                  {showSearchResults && (
                    <div className={styles.searchResultsDropdown}>
                        <div className={styles.resultsHeader}>All results</div>
                        <div className={styles.resultsList}>
                            {filteredDevices.length > 0 ? (
                                filteredDevices.map(device => (
                                    <div key={device.id} className={styles.resultItem}>
                                        <img src={device.image} alt={device.name} className={styles.resultImage} />
                                        <div className={styles.resultInfo}>
                                            <span className={styles.resultName}>{device.name}</span>
                                            <span className={connectedDevices[device.id] ? styles.resultStatusConnected : styles.resultStatusNotConnected}>
                                                {connectedDevices[device.id] ? '● connected' : '◎ not connected'}
                                            </span>
                                        </div>
                                        <button 
                                            className={styles.resultActionBtn}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleConnect(device.id);
                                            }}
                                        >
                                            {connectedDevices[device.id] ? '−' : '+'}
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <div className={styles.noResults}>No devices found</div>
                            )}
                        </div>
                    </div>
                  )}
              </div>
          </div>

          <div className={styles.deviceGrid}>
              {devicesData.map(device => (
                  <div 
                    key={device.id} 
                    className={`${styles.deviceCard} ${connectedDevices[device.id] ? styles.activeCard : ''}`}
                  >
                      <div className={styles.deviceImageWrapper}>
                          <img src={device.image} alt={device.name} />
                      </div>
                      <div className={styles.deviceInfo}>
                          <h4>{device.name}</h4>
                          <p className={connectedDevices[device.id] ? styles.statusConnected : styles.statusNotConnected}>
                              {connectedDevices[device.id] ? '● connected' : '◎ not connected'}
                          </p>
                      </div>
                      <button 
                        className={`${styles.addButton} ${connectedDevices[device.id] ? styles.added : ''}`}
                        onClick={() => toggleConnect(device.id)}
                      >
                          {connectedDevices[device.id] ? '🗑' : '+'}
                      </button>
                  </div>
              ))}
          </div>
      </div>
      
      {/* Footer bar */}
      <div className={styles.footer}>
          <div className={styles.footerText}>
            Add all your devices and go to the next step.
          </div>
          <div className={styles.footerButtons}>
              <button className={styles.skipButton} onClick={() => navigate('/dashboard')}>Skip</button>
              <button className={styles.continueButton} onClick={handleContinue}>Continue</button>
          </div>
      </div>
    </div>
  );
};

export default ConnectDevices;
