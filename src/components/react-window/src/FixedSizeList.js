import createListComponent from './createListComponent'
const FixedSizeList = createListComponent({
    getItemSize: ({itemSize}) => itemSize, // 每个条目的高度
    getEstimatedTotalSize: ({ itemSize, itemCount }) => itemSize * itemCount, //获取预计的总高度
    getItemOffset: ({ itemSize }, index) => itemSize * index, //获取每个条目的偏移量
    getStartIndexForOffset: ({ itemSize }, offset) => Math.floor(offset / itemSize),//获取起始索引 卷去的高度 / item的高度
    getStopIndexForStartIndex: ({ height, itemSize }, startIndex) => {//获取结束索引
        const numVisibleItems = Math.ceil(height / itemSize);
        return startIndex + numVisibleItems - 1;
    }
})

export default FixedSizeList