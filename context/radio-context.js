import {createContext, useState} from 'react';
import {audio, audioContext, fetchSrc} from '../constants';
import useTrack from '../hooks/use-track';

export const RadioContext = createContext();

const RadioProvider = ({children}) => {
    const {trackState, setTrackState} = useTrack();

    const [playerState, setPlayerState] = useState({
        currentTrackKey: 0,
        currentTrack: null,
        isPlaying: null,
        isLoading: false,
        isMuted: false,
        volume: 1,
        stateUpdatedBy: null
    });
    const [audioError, setAudioError] = useState(null);

    const playAudio = async() => {
        try {
            setPlayerState(prevState => ({...prevState, isLoading: true}));
            await audioContext.resume();
            await audio.play();
        } catch(e) {
            setAudioError(
                'Failed to play track, could be an IPFS issue or unsupported media.');
            setTimeout(() => {
                setAudioError(null);
            }, 4000);
        } finally {
            setPlayerState(prevState => ({...prevState, isLoading: false}));
        }
    };

    const handlePlay = async() => {
        if(!audio) return;
        setPlayerState(prevState => ({
            ...prevState,
            isLoading: true
        }));
        await playAudio();
        setPlayerState(
            prevState => ({...prevState, isPlaying: true, isLoading: false}));
    };

    const handleSelectTrack = (tracks) => i => async() => {
        setPlayerState(prevState => ({...prevState, isLoading: true}));
        audio.src = tracks[i].src;
        audio.mimeType = tracks[i].mimeType;
        await playAudio();
        setTrackState({
            currentTrackKey: i,
            currentTrack: tracks[i]
        });
        setPlayerState(prevState => ({
            ...prevState,
            isPlaying: true,
            isLoading: false
        }));
    };

    const handleInitialiseTrack = (tracks) => i => async() => {
        setPlayerState(prevState => ({...prevState, isLoading: true}));
        audio.src = tracks[i].src;
        audio.mimeType = tracks[i].mimeType;
        setTrackState({
            currentTrackKey: i,
            currentTrack: tracks[i]
        });
        setPlayerState(prevState => ({
            ...prevState,
            isLoading: false
        }));
    };

    const handlePause = () => {
        if(!audio) return;
        audio.pause();
        setPlayerState(prevState => ({...prevState, isPlaying: false}));
    };

    const handleMute = () => {
        if(!audio) return;
        audio.volume = 0;
        setPlayerState(prevState => ({...prevState, isMuted: true}));
    };

    const handleUnmute = () => {
        if(!audio) return;
        audio.volume = playerState.volume;
        setPlayerState(prevState => ({...prevState, isMuted: false}));
    };

    const handleVolumeChange = (event) => {
        if(!audio) return;
        const volume = event.target.value;
        audio.volume = volume;
        setPlayerState(prevState => ({...prevState, volume}));
    };

    const handleVolumeUp = () => {
        if(!audio) return;
        const volume = playerState.volume + 0.05;
        audio.volume = volume;
        setPlayerState(prevState => ({...prevState, volume}));
    };

    const handleVolumeDown = () => {
        if(!audio) return;
        const volume = playerState.volume - 0.05;
        audio.volume = volume;
        setPlayerState(prevState => ({...prevState, volume}));
    };

    const handleNext = (tracks) => async() => {
        setPlayerState(prevState => ({...prevState, isLoading: true}));
        const {currentTrackKey} = trackState;
        if(!tracks.length) return;
        const nextTrackKey = (currentTrackKey + 1) % tracks.length;
        audio.src = tracks[nextTrackKey].src;
        audio.mimeType = tracks[nextTrackKey].mimeType;
        if(playerState.isPlaying) {
            audioContext.resume();
            audio.play();
        }
        setTrackState({
            currentTrackKey: nextTrackKey,
            currentTrack: tracks[nextTrackKey]
        });
        setPlayerState(prevState => ({
            ...prevState,
            isLoading: false
        }));
    };

    const handlePrev = (tracks) => async() => {
        setPlayerState(prevState => ({...prevState, isLoading: true}));
        const {currentTrackKey} = trackState;
        if(!tracks.length) return;
        let prevTrackKey = currentTrackKey - 1;
        if(prevTrackKey < 0) prevTrackKey = tracks.length - 1;
        audio.src = tracks[prevTrackKey].src;
        audio.mimeType = tracks[prevTrackKey].mimeType;
        if(playerState.isPlaying) {
            audioContext.resume();
            audio.play();
        }
        setTrackState({
            currentTrackKey: prevTrackKey,
            currentTrack: tracks[prevTrackKey]
        });
        setPlayerState(prevState => ({
            ...prevState,
            currentTrackKey: prevTrackKey,
            currentTrack: tracks[prevTrackKey],
            isLoading: false
        }));
    };

    const isTrackPlaying = id => playerState.isPlaying &&
        trackState.currentTrack?.id === id;

    return (
        <RadioContext.Provider
            value={{
                audioError,
                playerState,
                setPlayerState,
                isTrackPlaying,
                controls: {
                    play: handlePlay,
                    pause: handlePause,
                    mute: handleMute,
                    unmute: handleUnmute,
                    volume: handleVolumeChange,
                    volumeUp: handleVolumeUp,
                    volumeDown: handleVolumeDown,
                    next: handleNext,
                    previous: handlePrev,
                    selectTrack: handleSelectTrack,
                    initialiseTrack: handleInitialiseTrack
                }
            }}
        >
            {children}
        </RadioContext.Provider>
    );
};

export default RadioProvider;

