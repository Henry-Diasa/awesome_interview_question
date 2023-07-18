import React from 'react'
// 高阶组件
export default function createListComponent({
    getEstimatedTotalSize,
    getItemSize,
    getItemOffset,
    getStartIndexForOffset,
    getStopIndexForStartIndex,
    initInstanceProps
}) {
    return class extends React.Component {
        itemStyleCache = new Map()
        state = { scrollOffset: 0 } // 卷去的高度
        instanceProps = initInstanceProps&&initInstanceProps(this.props)
        _getItemStyle = (index) => {
            let style;
            // 缓存样式
            if(this.itemStyleCache.has(index)) {
                style = this.itemStyleCache.get(index)
            } else {
                style = {
                    position:'absolute',
                    width:'100%',
                    height:getItemSize(this.props, index, this.instanceProps),
                    top:getItemOffset(this.props,index, this.instanceProps)
                }
                this.itemStyleCache.set(index, style)
            }
            return style
        }
        _getRangeToRender = () => {
            const overscanCount = 2; // 上下滚动的缓冲个数
            const { itemCount } = this.props;
            const { scrollOffset } = this.state;
            const startIndex = getStartIndexForOffset(this.props, scrollOffset,  this.instanceProps);
            const stopIndex = getStopIndexForStartIndex(this.props, startIndex, scrollOffset, this.instanceProps);
            return [Math.max(0, startIndex - overscanCount), Math.max(0, Math.min(itemCount - 1, stopIndex + overscanCount)),startIndex, stopIndex];
        }
        onScroll = e => {
            const { scrollTop } = e.currentTarget
            this.setState({
                scrollOffset: scrollTop
            })
        }
        render() {
            const {width, height, itemCount, children: ComponentType} = this.props
            const containerStyle = {position:'relative',width,height,overflow:'auto', willChange: 'transform'};
            const contentStyle = {height:getEstimatedTotalSize(this.props, this.instanceProps),width:'100%'};
            const items = [];
            if(itemCount > 0) {
                const [startIndex, stopIndex] = this._getRangeToRender();
                for(let index = startIndex; index<stopIndex; index++) {
                    items.push(<ComponentType key={index} index={index} style={this._getItemStyle(index)}></ComponentType>)
                }

            }
            return <div style={containerStyle} onScroll={this.onScroll}>
                <div style={contentStyle}>
                   {items}
                </div>
            </div>
        }
    }
}