import styles from './styles.module.css';

const View = ({children}) =>
    <div className={styles.radioView} suppressHydrationWarning={true}>
        {typeof window !== 'undefined' ? children : null}
    </div>
;

export default View;
