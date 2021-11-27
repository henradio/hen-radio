import Link from 'next/link';
import styles from './styles.module.css';
import Logo from '../logo/logo';
import Footer from '../footer/footer';
import useTezos from '../../hooks/use-tezos';
import View from './view';
import {getTrimmedWallet} from '../../utilities/general';

const Layout = ({params, children}) => {
   const {auth, sync, unsync } = useTezos();
    return (
        <View params={params}>
            <div className={styles.headerBar}>
                <Logo/>
                <div className={styles.navBar}>
                    <span className={styles.navBar_link}>
                        <Link href={'/'}>Feed</Link>
                    </span>
                    <span className={styles.navBar_link}>
                        <Link href={'/playlists'}>Playlists</Link>
                    </span>
                    <span className={styles.navBar_link}>
                        <Link href={'/tz'}>By Wallet</Link>
                    </span>
                    <span className={styles.navBar_link}>
                        <Link href={'/faq'}>FAQ</Link>
                    </span>
                    {auth && <span className={styles.navBar_link}>
                        <Link href={'/mint'}>Mint</Link>
                    </span>}
                    <span className={styles.navBar_link}>
                        <Link href="/">
                            {auth
                                ? <a onClick={unsync}>Unsync ({getTrimmedWallet(auth.address)})</a>
                                : <a onClick={sync}>Sync</a>}
                        </Link>
                        <br/>
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
