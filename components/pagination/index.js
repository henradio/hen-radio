import Link from 'next/link';
import styles from './styles.module.css';
import paginate from '../../utilities/pagination';
import useSWR from 'swr';
import allTracksFetcher, {allTracksApi} from '../../fetchers/all-tracks-fetcher';
import serialise from '../../fetchers/serialiser';

const Pagination = () => {
    const {data} = useSWR([allTracksApi, 1, 250], allTracksFetcher, { use: [serialise] });
    const {page, search, total, limit} = data;
    const query = search ? {search} : {};
    return (
        <div className={styles.pagination}>
            {paginate(page, total, limit).map(p =>
                p !== '…'
                    ? <Link
                        key={p}
                        href={{
                            pathname: `/page/[page]`,
                            query: {...query, page: p}
                        }}
                    >
                        <a
                            className={[
                                styles.page,
                                p === page ? styles.currentPage : ''
                            ].join(' ')}
                        >{p}</a>
                    </Link>
                    : <button
                        key={p}
                        disabled
                        className={styles.page}
                    >{p}</button>
            )}
        </div>
    );
};

export default Pagination;
