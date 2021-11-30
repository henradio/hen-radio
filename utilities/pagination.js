function* rangeIter(a, b) {
    for (let i = a; i <= b; ++i) yield i;
}

export function getPageCount(total, limit) {
    return Math.ceil(total / limit);
}

const paginate = (currentPage = 1, total, limit = 250, maxRange = 3) => {
    const pageCount = getPageCount(total, limit);
    currentPage = Number(currentPage)
    switch (true) {
        case pageCount <= 1:
            return []
        case pageCount <= maxRange * 2:
            return [...rangeIter(1, pageCount)];
        case currentPage <= maxRange:
            return [...rangeIter(1, maxRange + 1), '…', pageCount];
        case currentPage > pageCount - maxRange:
            return [1, '…', ...rangeIter(pageCount - maxRange, pageCount)];
        default:
            return [1, '…', ...rangeIter(currentPage - ~~(maxRange / 2), currentPage + ~~(maxRange / 2)), '…', pageCount];
    }
}

export default paginate;
