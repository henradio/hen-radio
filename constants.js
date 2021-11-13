export const tzktApi = 'https://api.tzkt.io/v1/accounts';
export const ipfsUrls = ['https://ipfs.io/ipfs'];

export const AWS_API_BASE_URL = process.env.NEXT_PUBLIC_AWS_API_BASE_URL
export const AWS_WEBSOCKET_URL = process.env.NEXT_PUBLIC_AWS_WEBSOCKET_URL
export const IPFS_DEFAULT_THUMBNAIL_URI = 'ipfs://QmNrhZHUaEqxhyLfqoq1mtHSipkWHeT31LNHb1QEbDHgnc'

let audio = null;
let audioContext = null;
let audioSource = null;
let gain = null;
let analyser = null;
let bufferLength = null;
let dataFloatArray = null;
let dataByteArray = null;

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
}

export {
    audio,
    audioContext,
    audioSource,
    gain,
    analyser,
    bufferLength,
    dataFloatArray,
    dataByteArray
}

