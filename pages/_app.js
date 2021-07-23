import '../styles/globals.css';
import Providers from '../components/layout/providers';

const MyApp = ({Component, pageProps}) => {
    return (
        <>
            <Providers>
                <Component {...pageProps} />
            </Providers>
        </>

    );
};

export default MyApp;
