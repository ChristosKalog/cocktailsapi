import React from 'react';
import styles from '../../styles/Footer.module.css'; // Import the CSS module

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <p>&copy; {new Date().getFullYear()} Cocktail App. All Rights Reserved.</p>
        <div className={styles.socialLinks}>
          <button onClick={() => window.open('https://facebook.com')} className={styles.linkButton}>Facebook</button>
          <button onClick={() => window.open('https://twitter.com')} className={styles.linkButton}>Twitter</button>
          <button onClick={() => window.open('https://instagram.com')} className={styles.linkButton}>Instagram</button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
