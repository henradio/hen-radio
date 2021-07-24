import styles from './styles.module.css';

const View = ({children}) =>
    <div className={styles.radioView}>
        {children}
    </div>
;

export default View;
