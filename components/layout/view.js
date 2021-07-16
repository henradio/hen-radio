import styles from './styles.module.css';
import Providers from './providers';

const View = ({children}) => {
    return (
        <Providers>
            <div className={styles.radioView}>
                {typeof window !== 'undefined' ? children : null}
            </div>
        </Providers>
    );
};

export default View;
