import {createContext, useEffect, useState} from 'react';
import getUserMetadataByWalletId from '../api/get-user-metadata-by-wallet-id';
import {gql} from 'graphql-request';

const query = gql`
    query AudioObjktData {
        hic_et_nunc_token(where: {
            mime: {_in: ["audio/ogg", "audio/wav", "audio/mpeg"]},
            token_holders: {
                quantity: {_gt: "0"},
                holder_id: {_neq: "tz1burnburnburnburnburnburnburjAYjjX"}
            }
        }, order_by: {id: desc}) {
            id
            display_uri
            level
            description
            title
            token_holders {
                holder_id
                quantity
            }
            thumbnail_uri
            mime
            creator_id
            artifact_uri
        }
    }
`;

export const PlaylistContext = createContext({
    tracks: [],
    setTracks: () => {},
    createMetadata: {}
});

const PlaylistProvider = ({children}) => {
    const [tracks, setTracks] = useState([]);
    const [creatorMetadata, setCreatorMetadata] = useState({});

    useEffect(() => {
        if(!tracks) return;
        (async() => {
            const uniqueCreatorWalletIds = new Set(tracks.map(t => t.creator));
            const nextCreatorMetadata = (await Promise.allSettled(
                [...uniqueCreatorWalletIds]
                    .map(id => getUserMetadataByWalletId(id))
            ))
                .filter(res => res.status === 'fulfilled')
                .reduce((obj, res) => {
                    try {
                        const walletId = res.value.data.logo.split('.')[0];
                        obj[walletId] = res.value.data;
                    } catch(e) {
                        // Do Nothing
                    }
                    return obj;
                }, {});
            setCreatorMetadata(nextCreatorMetadata);
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tracks]);

    return (
        <PlaylistContext.Provider
            value={{
                tracks,
                setTracks,
                creatorMetadata
            }}
        >
            {children}
        </PlaylistContext.Provider>
    );
};

export default PlaylistProvider;

