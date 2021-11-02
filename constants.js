export const tzktApi = 'https://api.tzkt.io/v1/accounts';
export const ipfsUrls = [
//    'https://cloudflare-ipfs.com/ipfs',
//    'https://infura-ipfs.io/ipfs',
    'https://ipfs.io/ipfs',
];

export const AWS_API_BASE_URL = 'https://3uy9191qbg.execute-api.eu-west-1.amazonaws.com/dev'
export const AWS_WEBSOCKET_URL = 'wss://7god5nqste.execute-api.eu-west-1.amazonaws.com/dev'


let audio = null;
let audioContext = null;
let audioSource = null;
let gain = null;
let analyser = null;
let bufferLength = null;
let dataFloatArray = null;
let dataByteArray = null;
let fetchSrc = () => {};

if(typeof window !== 'undefined') {
    audio = new Audio();
    audio.crossOrigin='anonymous';
    audioContext = window.AudioContext
        ? new window.AudioContext()
        : new window.webkitAudioContext();
    audioSource = audioContext.createMediaElementSource(audio);
    gain = audioContext.createGain();
    analyser = audioContext.createAnalyser();
    analyser.connect(audioContext.destination);
    analyser.fftSize = 64;
    audioSource.connect(analyser);
    audioSource.connect(gain);
    bufferLength = analyser.frequencyBinCount;
    dataFloatArray = new Float32Array(bufferLength);
    dataByteArray = new Uint8Array(bufferLength);
    fetchSrc = async(url, mimeType) => {
        const audioResponse = await fetch(url, {
            method: 'get',
            headers: {'Accept': mimeType},
        });
        const blob = await audioResponse.blob();
        audio.mimeType = mimeType;
        audio.preload = 'metadata';
        audio.src = URL.createObjectURL(blob);
    };
}

export {
    audio,
    audioContext,
    audioSource,
    gain,
    analyser,
    bufferLength,
    dataFloatArray,
    dataByteArray,
    fetchSrc
}

