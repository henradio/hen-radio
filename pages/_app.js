import '../styles/globals.css';
import Providers from '../components/layout/providers';
import styles from '../components/layout/styles.module.css';
import RadioPlayer from '../components/radio-player/radio-player';
import Layout from '../components/layout/layout';

const MyApp = ({Component, pageProps}) =>
    <Providers>
        <Layout>
            <div className={styles.radioPlayerBar} suppressHydrationWarning={true}>
                <RadioPlayer/>
            </div>
            <Component {...pageProps} />
        </Layout>
    </Providers>;

export default MyApp;
