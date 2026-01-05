import React from "react";
import { Link, useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import styles from "./Sidebar.module.css";
import { FiHome, FiGrid, FiSmartphone, FiUsers, FiBarChart2, FiSettings, FiLogOut } from "react-icons/fi";
import logoImg from "../assets/logo.png";

const Sidebar = () => {
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <aside className={styles.sidebar}>
      {/* Logo */}
      <div className={styles.logo}>
        <img src={logoImg} alt="Logo" style={{width: 150, height: 'auto', objectFit: 'contain'}} />
      </div>

      {/* User Profile Info */}
      <div className={styles.userProfile}>
        <div className={styles.avatar}>
           {/* Placeholder avatar */}
           <img src="https://i.pravatar.cc/150?img=32" alt="Avatar" />
        </div>
        <div className={styles.userInfo}>
          <span className={styles.welcomeText}>Welcome home,</span>
          <span className={styles.userName}>Kristin</span>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className={styles.nav}>
        <ul>
          <li className={isActive("/") ? styles.active : ""}>
            <Link to="/">
              <span className={styles.icon}><FiHome /></span> Spaces
            </Link>
          </li>
          <li className={isActive("/rooms") ? styles.active : ""}>
            <Link to="/rooms">
              <span className={styles.icon}><FiGrid /></span> Rooms
            </Link>
          </li>
          <li className={isActive("/devices") ? styles.active : ""}>
            <Link to="/devices">
              <span className={styles.icon}><FiSmartphone /></span> Devices
            </Link>
          </li>
          <li className={isActive("/members") ? styles.active : ""}>
            <Link to="/members">
              <span className={styles.icon}><FiUsers /></span> Members
            </Link>
          </li>
          <li className={isActive("/analytics") ? styles.active : ""}>
            <Link to="/analytics">
              <span className={styles.icon}><FiBarChart2 /></span> Statistics
            </Link>
          </li>
        </ul>

        <div className={styles.bottomMenu}>
             <ul>
                 <li className={isActive("/settings") ? styles.active : ""}>
                    <Link to="/settings">
                        <span className={styles.icon}><FiSettings /></span> Profile & Settings
                    </Link>
                </li>
             </ul>
        </div>
      </nav>
      
      {/* Logout */}
      <div className={styles.logout}>
        <button onClick={handleLogout} className={styles.logoutBtn}>
          <span className={styles.icon}><FiLogOut /></span> Log out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
