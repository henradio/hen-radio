const setLocalStorage = (key, data) => {
    if(typeof window !== 'undefined') window.localStorage.setItem(key, JSON.stringify(data));
    return data;
}

export default setLocalStorage;
