import React, {useEffect, useState} from 'react';
import styles from './styles.module.css';
import {useRouter} from 'next/router';
import NProgress from 'nprogress';

function SearchBar() {
    const router = useRouter();
    const [isSearching, setIsSearching] = useState(false);
    const stationQuery=router.query.station;
    let timeout;
    
    const handleSearch = event => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            setIsSearching(true);
            router.push({
                pathname: '/page/[page]',
                query: {
                    page: 1,
                    search: event.target.value,
                    ...(stationQuery && {station: stationQuery}),
                }
            });
        }, 1000);
    };

    useEffect(() => {
        const handleStop = () => {
            setIsSearching(false);
            NProgress.done()
        }

        router.events.on('routeChangeComplete', handleStop)
        router.events.on('routeChangeError', handleStop)

        return () => {
            router.events.off('routeChangeComplete', handleStop)
            router.events.off('routeChangeError', handleStop)
        }
    }, [router])

    return (
        <div className={styles.tagsContainer}>
            <div className={styles.filterActionBar}>
                <input
                    className={styles.searchField}
                    onChange={handleSearch}
                    title="Search"
                    placeholder="Search by artist, track name or tags"
                />
                {isSearching && <p className={styles.searching}>Searching…</p>}
            </div>
        </div>
    );
}

export default SearchBar;
