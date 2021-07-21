export const tzktApi = 'https://api.tzkt.io/v1/accounts';
export const ipfsUrls = [
    'https://cloudflare-ipfs.com/ipfs',
    'https://infura-ipfs.io/ipfs',
    'https://dweb.link/ipfs',
    'https://gateway.pinata.cloud/ipfs',
    'https://ipfs.io/ipfs',
];

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

