import Link from 'next/link';
import styles from './styles.module.css';
import Logo from '../logo/logo';
import Footer from '../footer/footer';
import useWallet from '../../hooks/use-wallet';
import View from './view';

const Layout = ({params, children}) => {
    const {walletId} = useWallet();
    return (
        <View params={params}>
            <div className={styles.headerBar}>
                <Logo/>
                <div className={styles.navBar}>
                    <span className={styles.navBar_link}>
                        <Link href={'/'}>All Tracks</Link>
                    </span>
                    <span className={styles.navBar_link}>
                        <Link href={'/playlists'}>Playlists</Link>
                    </span>
                    <span className={styles.navBar_link}>
                        <Link href={walletId ? `/tz/${walletId}` : '/tz'}>By Wallet</Link>
                    </span>
                    <span className={styles.navBar_link}>
                        <Link href={'/faq'}>FAQ</Link>
                    </span>
                </div>
            </div>
            <div>
                {children}
            </div>
            <Footer/>
        </View>
    );
};

export default Layout;
