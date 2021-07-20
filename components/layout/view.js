import styles from './styles.module.css';
import Providers from './providers';

const View = ({children}) => {
    return (
        <Providers>
            <div className={styles.radioView} suppressHydrationWarning={true}>
                {typeof window !== 'undefined' ? children : <p>no</p>}
            </div>
        </Providers>
    );
};

export default View;
