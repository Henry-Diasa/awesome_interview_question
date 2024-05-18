

const arr = [2, 2, 3, 2, 3,3,1,4,5]  

function getMax(arr) {
    const map = {};
    let max = 0
    let value = [];
    for(let i = 0;i<arr.length;i++) {
        map[arr[i]] = (map[arr[i]] || 0) + 1
    }
    Object.entries(map).forEach(([k, v]) => {
        max = Math.max(max, v)
    })
    Object.entries(map).forEach(([k, v]) => {
        if(v === max) {
            value.push(k)
        }
    })
    return [value, max] 
}
console.log(getMax(arr))

function getStr(str) {
    const map = new Map()
    let max = 0
    let l = 0
    let res;
    for(let i = 0;i<str.length;i++) {
        if(map.has(str[i]) && map.get(str[i]) >=l) {
            l = map.get(str[i]) + 1
        }
        max = Math.max(max, i - l + 1)
        map.set(str[i], i)
    }
    for(let i = 0; i<str.length;i++) {
        const s = str.slice(i, i + max)
        const not = new Set(s.split('')).length!==s.length
        if()
    }
}


function useDebounce(fn, delay,deps) {
    const {current} = useRef({fn, timer: null})

    useEffect(() => {
        current.fn = fn
    },[fn])

    return useCallback((...args) => {
        if (current.timer) {
            clearTimeout(current.timer);
          }
          current.timer = setTimeout(() => {
            current.fn.call(this, ...args);
          }, delay);
    }, dep)
}


function add(sum1, sum2) {
    const s1 = String(sum1)
    const s2 = String(sum2)
    let [s1Start, s1End = ''] = s1.split('.')
    let [s2Start, s2End = ''] = s2.split('.')
    const maxLength = Math.max(s1End.length, s2End.length)
    if(s1End.length > s2End.length) {
        for(let i = 0; i < s1End.length - s2End.length; i++) {
            s2End += '0'
        }
    }else{
        for(let i = 0; i < s2End.length - s1End.length; i++) s{
            s1End += '0'
        }
    }
    
    const s = String(Number(s1End) + Number(s2End)).slice(String(Number(s1End) + Number(s2End)).length - maxLength)
    const r = s1Start + s2Start + String(Number(s1End) + Number(s2End)).slice(0, String(Number(s1End) + Number(s2End)).length - maxLength)

    return Number(r + '.' + s)
}



