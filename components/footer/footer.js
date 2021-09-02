import styles from './styles.module.css';

const Footer = () =>
    <div className={styles.footerBar}>
        <p className={styles.footerText}><strong>Created as part of the 2021 Hicathon</strong>
        </p>
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
            Twitter: <a href='https://twitter.com/hen_radio'>@hen_radio</a><br/>
            Github: <a href='https://github.com/henradio/hen-radio'>hen-radio</a>
        </p>
    </div>
;

export default Footer;

