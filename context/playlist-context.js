import { createContext, useEffect, useState } from 'react';

export const PlaylistContext = createContext();

const PlaylistProvider = ({children}) => {
    const [tracks, setTracks] = useState([]);
    const [filteredTracks, setFilteredTracks] = useState([]);
    const [selectedTags, setSelectedTags] = useState(tracks);
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState({});

    const selectTag = (tag) => () => {
        setSelectedTags(prevState => ([...(new Set([...prevState, tag]))]));
    };

    const clearTags = () => {
        setSelectedTags([]);
    };

    useEffect(() => {
        (async() => {
            const filteredTracks = selectedTags.length
                ? tracks.filter(track => selectedTags.every(st => track.tags.includes(st)))
                : tracks;
            const lowercaseSearch = search.toLowerCase();
            const searchedAndFilteredTracks = lowercaseSearch
                ? filteredTracks.filter(track => {
                    if(track.title.toLowerCase().includes(lowercaseSearch)) return true;
                    if(track.creator.name?.toLowerCase().includes(lowercaseSearch)) return true;
                })
                : filteredTracks;
            setFilteredTracks(searchedAndFilteredTracks);
        })();
    }, [tracks, selectedTags, search]);

    useEffect(() => {
        const tags = filteredTracks.reduce((obj, track) => {
                const tags = track.tags.map(t => t.toLowerCase());
                for(const tag of tags) {
                    if(tag in obj) obj[tag]++;
                    else obj[tag] = 1;
                }
                console.log(obj);
                return obj;
            }, {},
        );
        setTags(tags);
    }, [filteredTracks]);

    return (
        <PlaylistContext.Provider
            value={{
                tracks,
                filteredTracks,
                setFilteredTracks,
                selectedTags,
                setSelectedTags,
                search,
                setSearch,
                tags,
                setTags,
                selectTag,
                clearTags,
                setTracks,
                totalTracks: tracks.length,
                totalFilteredTracks: filteredTracks.length,
            }}
        >
            {children}
        </PlaylistContext.Provider>
    );
};

export default PlaylistProvider;

