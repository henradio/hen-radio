import Link from 'next/link';
import styles from './styles.module.css';
import Logo from '../logo/logo';
import Footer from '../footer/footer';
import useWallet from '../../hooks/use-wallet';
import RadioPlayer from '../radio-player/radio-player';
import View from './view';

const Layout = ({params, children}) => {
    const {walletId} = useWallet();
    return (
        <View params={params}>
            <div className={styles.headerBar}>
                <Logo/>
                <div className={styles.navBar}>
                    <Link className={styles.navBar_link} href={'/'}>All Tracks</Link>
                    <Link className={styles.navBar_link} href={'/playlists'}>Playlists</Link>
                    <Link
                        className={styles.navBar_link}
                        href={walletId ? `/tz/${walletId}` : '/tz'}
                    >
                        By Wallet
                    </Link>
                </div>
            </div>
            <div className={styles.radioPlayerBar}>
                <RadioPlayer/>
            </div>
            <div>
                {children}
            </div>
            <Footer/>
        </View>
    );
};

export default Layout;
