import Dialog from './Dialog'
import  {FixedSizeList, VariableSizeList}  from './react-window'
import './fixed-size-list.css';

const rowSizes = new Array(1000).fill(true).map(() => 25 + Math.round(Math.random() * 50))
const getItemSize = index => rowSizes[index]
const Row = ({index, style}) => {
    return <div className={index % 2 ? 'ListItemOdd' : 'ListItemEven'} style={style}>Row{index}</div>
}
function App() {
    // 定高
    // return <FixedSizeList
    //     className="list"
    //     height={200}
    //     width={200}
    //     itemSize={50}
    //     itemCount={1000}
    //     >
    //     {Row}
    // </FixedSizeList>

    // 非定高
    // return <VariableSizeList
    //     className='List'
    //     height={200}
    //     width={200}
    //     itemSize={getItemSize}
    //     itemCount={1000}
    //     >
    //     {Row}
    // </VariableSizeList>
}

export default App