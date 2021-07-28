import React, { useState } from 'react';
import styles from './styles.module.css';
import usePlaylist from '../../hooks/use-playlist';

function FilterButtons() {
    const {
        tags,
        selectedTags,
        clearTags,
        selectTag,
        search,
        setSearch,
        totalTracks,
        totalFilteredTracks,
    } = usePlaylist();
    const [isOpen, setIsOpen] = useState(false);
    const handleToggleTags = () => {
        setIsOpen(prevState => !prevState);
    };

    const handleSearch = event => {
        setSearch(event.target.value)
    };

    return (
        <div className={styles.tagsContainer}>
            <div className={styles.filterActionBar}>
                <button className={styles.tagToggleButton} onClick={handleToggleTags}>{!isOpen
                    ? 'Show Tags'
                    : 'Hide Tags'}</button>
                <input
                    className={styles.searchField}
                    value={search}
                    onChange={handleSearch}
                    title='Create Playlist'
                    placeholder='Search by artist and track name'
                />
            </div>
            {isOpen ? <>
                    <div className={styles.tagsHolder}>
                        <p className={styles.smallText}>Selected Tags: {selectedTags.length
                            ? selectedTags.join(
                                ', ')
                            : 'all'}</p>
                        <button onClick={clearTags}>
                            all ({totalTracks})
                        </button>
                        {
                            Object
                                .entries(tags)
                                .filter(
                                    ([tag, count]) => (Object.keys(tags).length < 15 || count >= 3) &&
                                        tag.length < 20 && tag.length > 0)
                                .sort(([_a, countA], [_b, countB]) => countB - countA)
                                .map(
                                    ([tag, count]) => (
                                        <button key={tag} onClick={selectTag(tag)}>
                                            {tag} ({count})
                                        </button>
                                    ))
                        }
                    </div>
                    <p className={styles.smallText}>Count: {totalFilteredTracks}</p>
                </>
                : null}
        </div>
    );
}

export default FilterButtons;
