import {useEffect} from "react";
import Link from 'next/link';
import styles from './styles.module.css';
import Logo from '../logo/logo';
import Footer from '../footer/footer';
import useTezos from '../../hooks/use-tezos';
import View from './view';
import {getTrimmedWallet} from '../../utilities/general';
import {useRouter} from "next/router";


const Layout = ({params, children}) => {
    const {auth, sync, unsync} = useTezos();
    const {query} = useRouter();
    const station = query.station;
    const stationQuery = station && `station=${station}`;

    useEffect(() => {
        station && document.body.classList.add(station);
    }, []);

    return (
        <View params={params}>
            <div className={styles.headerBar}>
                <Link href={{pathname: '/', query: stationQuery}}>
                    <a>
                        <Logo/>
                    </a>
                </Link>
                <div className={styles.navBar}>
                    <span className={styles.navBar_link}>
                        <Link href={{pathname:`/`, query: stationQuery}}>Feed</Link>
                    </span>
                    {auth && <span className={styles.navBar_link}>
                        <Link href={{pathname:`/tz/${auth.address}`, query: stationQuery}}>Profile</Link>
                    </span>}
                    <span className={styles.navBar_link}>
                        <Link href={{pathname:'/playlists', query: stationQuery}}>Playlists</Link>
                    </span>
                    <span className={styles.navBar_link}>
                        <Link href={{pathname:'/tz', query: stationQuery}}>By Wallet</Link>
                    </span>
                    <span className={styles.navBar_link}>
                        <Link href={{pathname:'/faq', query: stationQuery}}>FAQ</Link>
                    </span>
                    {auth && <span className={styles.navBar_link}>
                        <Link href={{pathname:'/mint', query: stationQuery}}>Mint</Link>
                    </span>}
                    <span className={styles.navBar_link}>
                        {auth
                            ? <button
                                className={styles.navBar_buttonLink}
                                onClick={unsync}
                            >Unsync ({getTrimmedWallet(
                                auth.address)})</button>
                            : <button
                                className={styles.navBar_buttonLink}
                                onClick={sync}
                            >Sync</button>}
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
