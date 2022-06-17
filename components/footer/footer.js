import styles from './styles.module.css';

const Footer = () =>
    <div className={styles.footerBar}>
        <div className={styles.footerTitle}>Contact us</div>
        <p className={styles.footerText}>
            Discord: <a href='https://discord.gg/gj7U6r96aF'>henradio</a><br/>
            Twitter: <a href='https://twitter.com/hen_radio'>@hen_radio</a><br/>
            Github: <a href='https://github.com/henradio/hen-radio'>hen-radio</a>
        </p>
    </div>
;

export default Footer;

