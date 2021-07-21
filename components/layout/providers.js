import UserPlaylistProvider from '../../context/user-playlists-context';
import RadioProvider from '../../context/radio-context';
import WalletProvider from '../../context/wallet-context';
import PlaylistProvider from '../../context/playlist-context';

const Providers = ({children}) =>
    <WalletProvider>
        <RadioProvider>
            <UserPlaylistProvider>
                <PlaylistProvider>
                    {children}
                </PlaylistProvider>
            </UserPlaylistProvider>
        </RadioProvider>
    </WalletProvider>
;

export default Providers;
