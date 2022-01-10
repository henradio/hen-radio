import UserPlaylistProvider from '../../context/user-playlists-context';
import RadioProvider from '../../context/radio-context';
import TezosProvider from '../../context/tezos/tezos-context';
import PlaylistProvider from '../../context/playlist-context';
import Layout from './layout';
import styles from './styles.module.css';
import RadioPlayer from '../radio-player/radio-player';
import TrackProvider from '../../context/track-context';
import MintProvider from '../../context/tezos/mint-context';
import UploadProvider from '../../context/file-upload-context';
import ToastProvider from '../../context/toast-context';
import ToolsProvider from '../../context/tools-context';

const Providers = ({children}) =>
    <UploadProvider>
        <ToastProvider>
            <TezosProvider>
                <ToolsProvider>
                    <MintProvider>
                        <TrackProvider>
                            <RadioProvider>
                                <UserPlaylistProvider>
                                    <PlaylistProvider>
                                        <Layout>
                                            <div className={styles.radioPlayerBar}>
                                                <RadioPlayer/>
                                            </div>
                                            {children}
                                        </Layout>
                                    </PlaylistProvider>
                                </UserPlaylistProvider>
                            </RadioProvider>
                        </TrackProvider>
                    </MintProvider>
                </ToolsProvider>
            </TezosProvider>
        </ToastProvider>
    </UploadProvider>
;

export default Providers;
