import styles from './styles.module.css';
import { createRef, useState } from 'react';
import Image from 'next/image';
import { getIpfsUrl } from '../../utilities/general';
import useUserPlaylists from '../../hooks/use-user-playlists';
import TrackLinks from '../track-lists/track-links';

const Playlists = ({handlePlaylistChange, playlists}) => {
    const {createUserPlaylist} = useUserPlaylists();
    const [filteredPlaylists, setFilteredPlaylists] = useState([]);
    const createPlaylistRef = createRef();

    const handleCreatePlaylist = () => {
        if(!createPlaylistRef.current) return;
        if(!createPlaylistRef.current.value) alert('Enter a playlist name');
        createUserPlaylist(createPlaylistRef.current.value);
        createPlaylistRef.current.value = '';
    };

    const handleSearch = (event) => {
        const search = event.target.value.toLowerCase();
        const nextFilteredPlaylists = playlists.filter(p => {
            if(search.length < 2) return false;
            if(p.name.toLowerCase().includes(search)) return true;
            if(p.curator.toLowerCase().includes(search)) return true;
            for(const track of p.tracks) {
                if(track.title.toLowerCase().includes(search)) return true;
                if(track.id.toString().toLowerCase().includes(search)) return true;
                if(track.creator.walletAddress.toLowerCase().includes(search)) return true;
            }
            return false;
        });
        setFilteredPlaylists(nextFilteredPlaylists);
    };

    return (
        <div className={styles.playlistContainer}>
            <h2 className={styles.playlistTitle}>Playlists</h2>
            <div className={styles.playlistInputBar}>
                <div className={styles.createPlaylist_form}>
                    <input
                        className={styles.createPlaylist_input}
                        id='create-playlist'
                        ref={createPlaylistRef}
                        title='Create Playlist'
                        placeholder='Playlist Title'
                    />
                    <button
                        className={styles.createPlaylist_button}
                        onClick={handleCreatePlaylist}
                    >Create Playlist
                    </button>
                </div>
                <div className={styles.searchInput_container}>
                    <input
                        className={styles.searchInput}
                        placeholder={'Search PlaylistsPage'}
                        onKeyUp={handleSearch}
                    />
                </div>
            </div>
            {!filteredPlaylists.length
                ? (
                    <div className={styles.playlistGrid}>
                        {playlists.map(p => (
                            <button
                                key={p.name}
                                onClick={handlePlaylistChange(p)}
                                className={styles.playlistButton}
                            >
                                <Image
                                    src={p.img || '/images/playlist-default.png'}
                                    alt=""
                                    width={160}
                                    height={160}
                                    className={styles.playlistImage}
                                />
                                <p className={styles.playlistText}>{p.name}</p>
                            </button>
                        ))}
                    </div>
                ) : (
                    <div className={styles.filteredPlaylists}>
                        {filteredPlaylists.map(p => (
                            <div key={p.name} className={styles.filteredPlaylists_row}>
                                <button
                                    key={p.name}
                                    onClick={handlePlaylistChange(p)}
                                    className={styles.playlistButton}
                                >
                                    <Image
                                        src={p.img || '/images/playlist-default.png'}
                                        alt=""
                                        width={160}
                                        height={160}
                                        className={styles.playlistImage}
                                    />
                                </button>
                                <div className={styles.filteredPlaylists_info}>
                                    <h3 className={styles.filteredPlaylists_title}>{p.name}</h3>
                                    <p className={styles.filteredPlaylists_subTitle}>{p.curator}</p>
                                    {p.tracks.map(t => (
                                        <div key={t.id} className={styles.trackRow}>
                                            <TrackLinks
                                                track={t}
                                                walletAddress={t.creator.walletAddress}
                                                name={t.creator.name}
                                            />
                                            <div className={styles.trackRow_avatar}>
                                                <Image
                                                    width={26}
                                                    height={26}
                                                    alt={'Artist\'s avatar'}
                                                    src={getIpfsUrl(
                                                        t.creator.metadata?.indenticon) ||
                                                    '/images/playlist-default.png'}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
        </div>
    );
};

export default Playlists;
