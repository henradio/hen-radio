import Link from 'next/link';
import styles from './styles.module.css';
import paginate from '../../utilities/pagination';
import useSWR from 'swr';
import allTracksFetcher, {
    allTracksApi,
    limit
} from '../../fetchers/all-tracks-fetcher';
import serialise from '../../fetchers/serialiser';

const Pagination = ({page, search}) => {
    const {data} = useSWR([allTracksApi, page, search], allTracksFetcher, { use: [serialise] });
    const {total} = data;
    const query = search ? {search} : {};
    const pages = paginate(page, total, limit);

    return (
        <div className={styles.pagination}>
            {pages.map((p, i) =>
                p !== '…'
                    ? <Link
                        key={i}
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
                        key={i}
                        disabled
                        className={styles.page}
                    >{p}</button>
            )}
        </div>
    );
};

export default Pagination;
