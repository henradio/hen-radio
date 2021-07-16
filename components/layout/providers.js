import UserPlaylistProvider from '../../context/user-playlists-context';
import RadioProvider from '../../context/radio-context';
import AudioProvider from '../../context/audio-context';
import WalletProvider from '../../context/wallet-context';
import PlaylistProvider from '../../context/playlist-context';

const Providers = ({children}) =>
    <WalletProvider>
        <AudioProvider>
            <RadioProvider>
                <UserPlaylistProvider>
                    <PlaylistProvider>
                        {children}
                    </PlaylistProvider>
                </UserPlaylistProvider>
            </RadioProvider>
        </AudioProvider>
    </WalletProvider>
;

export default Providers;
