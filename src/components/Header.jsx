import React from "react";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.userInfo}>
        <img src="https://i.pravatar.cc/40" alt="User" className={styles.avatar} />
        <span>Welcome, User</span>
      </div>
    </header>
  );
};

export default Header;
