import styles from './styles.module.css';

const Footer = () =>
    <div className={styles.footerBar}>
        <h2 className={styles.footerTitle}>Hic et Nunc: NFT Music Player</h2>
        <p className={styles.footerText}>
            Listen to music NFTs on Hen Radio. An audio player for Hic et Nunc Objkts.
        </p>
        <p className={styles.footerText}><strong>Created as part of Hicathon Hackday 2021</strong></p>
        <p className={styles.footerText}>Working Group:<br/>
            <a href='https://twitter.com/lauzaki'>@lauzaki</a>
                                         ,{' '}
            <a href='https://twitter.com/andreasrau_eu'>@andreasrau_eu</a>
                                         ,{' '}
            <a href='https://twitter.com/uvdsc'>@uvdsc</a>
                                         ,{' '}
            <a href='https://twitter.com/__orderandchaos'>@__orderandchaos</a>
                                         ,{' '}
            <a href='https://twitter.com/webidente'>@webidente</a>
                                         ,{' '}
            <a href='https://twitter.com/BabyCommando_'>@BabyCommando_</a>
                                         ,{' '}
            <a href='https://twitter.com/jclayton'>@jclayton</a>
        </p>
        <p className={styles.footerText}>
            View on <a href='https://github.com/OrderAndCh4oS/hen-radio-next'>GitHub</a>
        </p>
    </div>
;

export default Footer;

