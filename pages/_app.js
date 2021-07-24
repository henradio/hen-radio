import '../styles/globals.css';
import Providers from '../components/layout/providers';

const MyApp = ({Component, pageProps}) =>
        <Providers>
            <Component {...pageProps} />
        </Providers>
;

export default MyApp;
