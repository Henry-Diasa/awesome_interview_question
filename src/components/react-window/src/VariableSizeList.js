import createListComponent from './createListComponent';
const DEFAULT_ESTIMATED_SIZE = 50; // 默认预估的item高度
const getEstimatedTotalSize = ({ itemCount }, { estimatedItemSize, lastMeasuredIndex, itemMetadataMap }) => {
    let totalSizeOfMeasuredItems = 0;//计算过的条目总大小
    if (lastMeasuredIndex >= 0) {
        const itemMetadata = itemMetadataMap[lastMeasuredIndex];
        totalSizeOfMeasuredItems = itemMetadata.offset + itemMetadata.size;//测试过的总大小
    }
    const numUnmeasuredItems = itemCount - lastMeasuredIndex - 1;//未测量的条目
    const totalSizeOfUnmeasuredItems = numUnmeasuredItems * estimatedItemSize;//未测量条目的总高度
    return totalSizeOfMeasuredItems + totalSizeOfUnmeasuredItems;
} // 获取预估的总高度
function findNearestItem(props, instanceProps, offset) {
    // 找到第一个的offset > scrollTop的item  也就是start index
    const {lastMeasuredIndex} = instanceProps
    for (let index = 0; index <= lastMeasuredIndex; index++) {
        const currentOffset = getItemMetadata(props, index, instanceProps).offset;
        if (currentOffset >= offset) {
            return index;
        }
    }
    return 0;
}
function getItemMetadata(props, index, instanceProps) {
    const { itemSize } = props;
    const { itemMetadataMap, lastMeasuredIndex } = instanceProps;
    if (index > lastMeasuredIndex) {
        let offset = 0;//先计算上一个测试过的条目的下一个offset
        if (lastMeasuredIndex >= 0) {
            const itemMetadata = itemMetadataMap[lastMeasuredIndex];
            offset = itemMetadata.offset + itemMetadata.size;
        }
        //计算从上一个条目到本次索引的offset和size
        for (let i = lastMeasuredIndex + 1; i <= index; i++) {
            let size = itemSize(i);
            itemMetadataMap[i] = { offset, size };
            offset += size;
        }
        instanceProps.lastMeasuredIndex = index;
    }
    return itemMetadataMap[index];
}
const VariableSizeList = createListComponent({
    getEstimatedTotalSize,
    getStartIndexForOffset: (props, offset, instanceProps) => findNearestItem(props, instanceProps, offset),
    getStopIndexForStartIndex: (props, startIndex, scrollOffset, instanceProps) => {
        const { itemCount, height } = props;
        const itemMetadata = getItemMetadata(props, startIndex, instanceProps);
        const maxOffset = scrollOffset + height;
        let offset = itemMetadata.offset + itemMetadata.size;
        let stopIndex = startIndex;
        // 可优化为 二分查找
        while (stopIndex < itemCount - 1 && offset < maxOffset) {
            stopIndex++;
            offset += getItemMetadata(props, stopIndex, instanceProps).size;
        }
        return stopIndex;
    },
    getItemSize: (props, index, instanceProps) => getItemMetadata(props, index, instanceProps).size,
    getItemOffset: (props, index, instanceProps) => getItemMetadata(props, index, instanceProps).offset,
    initInstanceProps(props) {
        const { estimatedItemSize } = props;
        const instanceProps = {
            estimatedItemSize: estimatedItemSize || DEFAULT_ESTIMATED_SIZE,
            itemMetadataMap: {},//存放每个条目的高度和偏移量
            lastMeasuredIndex: -1//最后一个测量高度的索引
        }
        return instanceProps;
    }
})

export default VariableSizeList