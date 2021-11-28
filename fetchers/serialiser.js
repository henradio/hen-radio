const serialise = useSWRNext => (key, fetcher, config) => {
    const serialisedKey = Array.isArray(key) ? JSON.stringify(key) : key

    return useSWRNext(serialisedKey, (k) => fetcher(...JSON.parse(k)), config)
};

export default serialise;
