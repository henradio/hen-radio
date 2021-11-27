import Link from 'next/link'
import styles from './styles.module.css';
import paginate from '../../utilities/pagination';

const Pagination = ({currentPage = 1, total, limit}) => {
    return (
        <div className={styles.pagination}>
            {paginate(currentPage, total, limit).map(page =>
                <Link key={page} href={`/page/${page}`}>
                    <a
                        className={[
                            styles.page,
                            page === currentPage ? styles.currentPage : ''
                        ].join(' ')}
                    >{page}</a>
                </Link>
            )}
        </div>
    )
}

export default Pagination;
