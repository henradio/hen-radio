import React from 'react';
import styles from './styles.module.css';
import {useRouter} from 'next/router';

function FilterButtons() {
    let timeout;
    const router = useRouter();
    const handleSearch = event => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            router.push({
                pathname: '/page/[page]',
                query: {
                    page: 1,
                    search: event.target.value
                }
            });
        }, 500);
    };

    return (
        <div className={styles.tagsContainer}>
            <div className={styles.filterActionBar}>
                <input
                    className={styles.searchField}
                    onChange={handleSearch}
                    title="Search"
                    placeholder="Search by artist, track name or tags"
                />
            </div>
        </div>
    );
}

export default FilterButtons;
