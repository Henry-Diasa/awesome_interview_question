// 数组乱序输出

function Fn(arr) {
    for(let i = 0; i < arr.length; i++) {
        const randomIndex = Math.round(Math.random() * (arr.length - 1 - i)) + i;
        [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]]
    }
}

// 扁平化

function flatten(arr) {
    let result = [];

    for(let i = 0; i < arr.length; i++) {
        if(Array.isArray(arr[i])) {
            result = result.concat(flatten(arr[i]));
        }else{
            result.push(arr[i]);
        }
    }
    return result;
}

function flatten(arr) {
    return arr.reduce((prev, next)=> {
        return prev.concat(Array.isArray(next) ? flatten(next) : next)
    },[])
}

function flatten(arr) {
    while(arr.some(item => Array.isArray(item))) {
        arr = [].concat(...arr);
    }
    return arr;
}

function flatten(arr) {
    return arr.flat(Infinity)
}

// 数组去重

Array.from(new Set(arr))

function uniqueArr(arr) {
    let map = {};
    let res = [];

    for(let i = 0; i < arr.length; i++) {
        if(!map.hasOwnProperty(arr[i])) {
            map[arr[i]] = 1;
            res.push(arr[i])
        }
    }
    return res;
}

// 数组的一些方法 push filter map 

Array.prototype.push = function() {
    for(let i = 0; i < arguments.length; i++) {
        this[this.length] = arguments[i];
    }
    return this.length;
}

Array.prototype.filter = function(fn) {
    const res = [];

    for(let i = 0; i < this.length; i++) {
        fn(this[i]) && res.push(this[i])
    }
    return res;
}

Array.prototype.map = function(fn) {
    const res = [];
    for(let i = 0; i < this.length; i++) {
        res.push(fn(this[i]))
    }
    return res;
}

Array.prototype.myReduce = function(fn, initialValue) {
    for(let i=0; i<this.length; i++) {
        if (typeof initialValue === 'undefined') {
            initialValue = fn(this[i], this[i+1], i+1, this);
            ++i;
        } else {
            initialValue = fn(initialValue, this[i], i, this);
        }
    }
    return initialValue;
}

// 千分位

function numberThousands(number, thousandsSeperator = ",") {
    const s = String(number);
    let r = "";
    for (let i = s.length - 1; i >= 0; i--) {
      const seperator = (s.length - i - 1) % 3 ? "" : thousandsSeperator;
      r = `${s[i]}${seperator}${r}`;
    }
    return r.slice(0, -1);
}

// js对象转化为树形结构

function jsonToTree(data) {
    let result = [];
    let map = {};
    data.forEach(item => {
        map[item.id] = item;
    })

    data.forEach(item => {
        let parent = map[item.id];
        if(parent) {
            (parent.children || (parent.children = [])).push(item)
        }else{
            result.push(item)
        }
    })

    return result;
}

// 解析URL
function parseParam(url) {
    const paramsStr = url.split('?')[1];
    const paramsArr = paramsStr.split('&');
    let paramsObj = {};
    paramsArr.forEach(param => {
        if(/=/.test(param)) {
            let [key, val] = param.split('=');
            val = decodeURIComponent(val);
            val = /^\d+$/.test(val) ? parseFloat(val) : val;

            if(paramsObj.hasOwnProperty(key)) {
                paramsObj[key] = [].concat(paramsObj[key], val);
            }else{
                paramsObj[key] = val
            }
        }else{
            paramsObj[key] = true
        }
    })

    return paramsObj;
}

