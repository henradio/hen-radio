import React from 'react';
import styles from './styles.module.css';
import usePlaylist from '../../hooks/use-playlist';

function FilterButtons() {
    const {
        setSearch,
    } = usePlaylist();

    let timeout;

    const handleSearch = event => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            setSearch(event.target.value);
        },300);
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
