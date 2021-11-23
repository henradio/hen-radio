import UserPlaylistProvider from '../../context/user-playlists-context';
import RadioProvider from '../../context/radio-context';
import TezosProvider from '../../context/tezos/tezos-context';
import PlaylistProvider from '../../context/playlist-context';
import Layout from './layout';
import styles from './styles.module.css';
import RadioPlayer from '../radio-player/radio-player';
import TrackProvider from '../../context/track-context';
import MintProvider from '../../context/tezos/mint-context';
import CompressProvider from '../../context/audio-compression-context';
import ToastProvider from '../../context/toast-context';
import BlocklistProvider from '../../context/blocklist-context';

const Providers = ({ children }) =>
    <CompressProvider>
        <ToastProvider>
            <TezosProvider>
                <MintProvider>
                    <TrackProvider>
                        <RadioProvider>
                            <UserPlaylistProvider>
                                <PlaylistProvider>
                                    <BlocklistProvider>
                                        <Layout>
                                            <div className={styles.radioPlayerBar}>
                                                <RadioPlayer />
                                            </div>
                                            {children}
                                        </Layout>
                                    </BlocklistProvider>
                                </PlaylistProvider>
                            </UserPlaylistProvider>
                        </RadioProvider>
                    </TrackProvider>
                </MintProvider>
            </TezosProvider>
        </ToastProvider>
    </CompressProvider>
    ;

export default Providers;
