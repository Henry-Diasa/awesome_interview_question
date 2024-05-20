// pMap 限制并发

function pMap(list, mapper, concurrency = Infinity) {
    list = Array.from(list);
    return new Promise((resolve, reject) => {
        let currIndex = 0;
        let result = [];
        let resolveCount = 0;
        let len = list.length;

        function next() {
            const index = currIndex;
            currIndex++;
            Promise.resolve(list[index]).then(o=>mapper(o, index))
            .then(o => {
                result[index] = o;
                resolveCount++;

                if(resolveCount === len) {
                    resolve(result);
                }

                if(currIndex < len) {
                    next();
                }
            })
        }

        for(let i = 0; i < concurrency && i < len; i++) {
            next();
        }
    })
}

// lodash.get

function get(source, path, defaultValue) {
    // a[3].b -> a.3.b -> [a, 3, b]
    const paths = path
    .replace(/\[(\w+)\]/g, '.$1')
    .replace(/\["(\w+)"\]/g, '.$1')
    .replace(/\['(\w+)'\]/g, '.$1')
    .split('.');
    
    let result = source;

    for(let p in paths) {
        result = result?.[p]
    }
    return result === undefined ? defaultValue : result;
}

// 深拷贝

/**
 * 深拷贝关注点:
 * 1. JavaScript内置对象的复制: Set、Map、Date、Regex等
 * 2. 循环引用问题
 * @param {*} object
 * @returns
 */
function deepClone(source, memory) {
    const isPrimitive = (value) => {
      return /Number|Boolean|String|Null|Undefined|Symbol|Function/.test(
        Object.prototype.toString.call(value),
      );
    };
    let result = null;
   
    memory || (memory = new WeakMap());
    // 原始数据类型及函数
    if (isPrimitive(source)) {
      console.log("current copy is primitive", source);
      result = source;
    }
    // 数组
    else if (Array.isArray(source)) {
      result = source.map((value) => deepClone(value, memory));
    }
    // 内置对象Date、Regex
    else if (Object.prototype.toString.call(source) === "[object Date]") {
      result = new Date(source);
    } else if (Object.prototype.toString.call(source) === "[object Regex]") {
      result = new RegExp(source);
    }
    // 内置对象Set、Map
    else if (Object.prototype.toString.call(source) === "[object Set]") {
      result = new Set();
      for (const value of source) {
        result.add(deepClone(value, memory));
      }
    } else if (Object.prototype.toString.call(source) === "[object Map]") {
      result = new Map();
      for (const [key, value] of source.entries()) {
        result.set(key, deepClone(value, memory));
      }
    }
    // 引用类型
    else {
      if (memory.has(source)) {
        result = memory.get(source);
      } else {
        result = Object.create(null);
        memory.set(source, result);
        Object.keys(source).forEach((key) => {
          const value = source[key];
          result[key] = deepClone(value, memory);
        });
      }
    }
    return result;
  }

//   实现async/await
/**
 * async的执行原理
 * 其实就是自动执行generator函数
 * 暂时不考虑genertor的编译步骤（更复杂）
 */
 
const getData = () =>
  new Promise((resolve) => setTimeout(() => resolve("data"), 1000));
 
// 这样的一个async函数 应该再1秒后打印data
async function test() {
  const data = await getData();
  console.log("data: ", data);
  const data2 = await getData();
  console.log("data2: ", data2);
  return "success";
}
 
// async函数会被编译成generator函数 (babel会编译成更本质的形态，这里我们直接用generator)
function* testG() {
  // await被编译成了yield
  const data = yield getData();
  console.log("data: ", data);
  const data2 = yield getData();
  console.log("data2: ", data2);
  return "success";
}
 
function asyncToGenerator(generatorFunc) {
  return function () {
    const gen = generatorFunc.apply(this, arguments);
 
    return new Promise((resolve, reject) => {
      function step(key, arg) {
        let generatorResult;
        try {
          generatorResult = gen[key](arg);
        } catch (error) {
          return reject(error);
        }
 
        const { value, done } = generatorResult;
 
        if (done) {
          return resolve(value);
        } else {
          return Promise.resolve(value).then(
            function onResolve(val) {
              step("next", val);
            },
            function onReject(err) {
              step("throw", err);
            },
          );
        }
      }
      step("next");
    });
  };
}
 
const testGAsync = asyncToGenerator(testG);
testGAsync().then((result) => {
  console.log(result);
});

// lru cache

class LRUCache {
    constructor(limit) {
        this.limit = limit;
        this.cache = new Map();
    }

    get(key) {
        if(!this.cache.has(key)) return undefined;
        const value = this.cache.get(key);
        this.cache.delete(key);
        this.cache.set(key, value);
        return value;
    }
    set(key, value) {
        if(this.cache.has(key)) this.cache.delete(key);
        else if (this.cache.size >= this.limit) {
            this.cache.delete(this.cache.keys().next().value)
        }
        this.cache.set(key, value);
    }
}

// 找出出现次数最多的HTML标签

// 实现一个 maxBy 方便找出出现次数最多的 HTML 标签
const maxBy = (list, keyBy) =>
  list.reduce((x, y) => (keyBy(x) > keyBy(y) ? x : y));
 
function getFrequentTag() {
  const tags = [...document.querySelectorAll("*")]
    .map((x) => x.tagName)
    .reduce((o, tag) => {
      o[tag] = o[tag] ? o[tag] + 1 : 1;
      return o;
    }, {});
  return maxBy(Object.entries(tags), (tag) => tag[1]);
}

// 字符串压缩
function encode(str) {
    const l = [];
    let i = -1;
    let lastChar;
    for (const char of str) {
      if (char !== lastChar) {
        lastChar = char;
        i++;
        l[i] = [char, 1];
      } else {
        l[i][1]++;
      }
    }
    return l.flat().join("");
}

//=> a4b3c2
encode("aaaabbbcc");

// 无限累加的函数
/**
 * sum(1, 2, 3).valueOf(); //6
sum(2, 3)(2).valueOf(); //7
sum(1)(2)(3)(4).valueOf(); //10
sum(2)(4, 1)(2).valueOf(); //9
sum(1)(2)(3)(4)(5)(6).valueOf(); // 21
 */

function sum(...args) {
    const f = (...rest) => sum(...args, ...rest);
    f.valueOf = () => args.reduce((x, y) => x + y, 0);
    return f;
}

// queryString
// a=3&b=4
// stringify({ a: 3, b: 4 });
function stringify(data) {
    const pairs = Object.entries(data);
    const qs = pairs
      .map(([k, v]) => {
        let noValue = false;
        if (v === null || v === undefined || typeof v === "object") {
          noValue = true;
        }
        return `${encodeURIComponent(k)}=${noValue ? "" : encodeURIComponent(v)}`;
      })
      .join("&");
    return qs;
}

// 随机字符串
const ramdom = (n) => {
    return Math.random().toString(36).slice(2, 2 + n);
}

// 数值是整数
Numberr.isInteger(num)
if(!Number.isInteger) {
    Number.isInteger = function(num) {
        return typeof num === 'number' && num % 1 === 0;
    }
}

// compose

function compose(middlewares) {
    return (ctx) => {
        const dispatch = (i) => {
            const middleware = middlewares[i]
            if(i === middlewares.length) return;
            return middleware(ctx, () => dispatch(i + 1));
        }
        return dispatch(0)
    }
}

// 统计字符串中出现次数最多的字符及次数
function getFrequentChar(str) {
    const dict = {};
    for (const char of str) {
      dict[char] = (dict[char] || 0) + 1;
    }
    const maxBy = (list, keyBy) =>
      list.reduce((x, y) => (keyBy(x) > keyBy(y) ? x : y));
    return maxBy(Object.entries(dict), (x) => x[1]);
}

function getFrequentChar2(str) {
    const dict = {};
    let maxChar = ["", 0];
    for (const char of str) {
      dict[char] = (dict[char] || 0) + 1;
      if (dict[char] > maxChar[1]) {
        maxChar = [char, dict[char]];
      }
    }
    return maxChar;
}
// chunk函数
function chunk(list, size) {
    const l = [];
    for (let i = 0; i < list.length; i++) {
      const index = Math.floor(i / size);
      l[index] ??= [];
      l[index].push(list[i]);
    }
    return l;
}

/*
  请实现一个 sum 函数，接收一个数组 arr 进行累加，并且只能使用add异步方法
  
  add 函数已实现，模拟异步请求后端返回一个相加后的值
*/
function add(a, b) {
    return Promise.resolve(a + b);
}
   
function sum(arr, concurrency) {
    if(arr.length === 1) return arr[0];
    return pMap(
        chunk(arr, 2),
        ([x, y]) => {
            return y === undefined ? x : add(x, y)
        },
        concurrency
    ).then(list => sum(list, concurrency))
}

// 实现一个 composeLeft/flow(从左向右) 函数，进行函数合成

const flow = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)))

// 从数组中随机取N个元素

const shuffle = (list) => list.sort((x, y) => Math.random() - 0.5);
const sampleSize = (list, n) => shuffle(list).slice(0, n);

// 实现一个函数 groupBy
/**
 * groupBy(
  [
    { id: 1, name: "山月", sex: "male" },
    { id: 2, name: "张三", sex: "female" },
    { id: 3, name: "李四", sex: "female" },
  ],
  (x) => x.sex,
);
 */

function groupBy(collection, by) {
    return collection.reduce((acc, x) => {
      if (acc[by(x)]) {
        acc[by(x)].push(x);
      } else {
        acc[by(x)] = [x];
      }
      return acc;
    }, {});
}
// 实现一个函数 camelCase，对变量转化为驼峰命名
//驼峰转短横线
function toKebabCase(str) {
    let res = str.replace(/([A-Z])/g, (all, i) => {
      return "-" + i.toLowerCase();
    });
    if (res.slice(0, 1) === "-") {
      res = res.slice(1); //去除开头的-
    }
    return res;
}
//短横线转驼峰
function toCamelCase(str) {
return str.replace(/-([a-zA-Z])/g, function (all, i) {
    return i.toUpperCase();
});
}

console.log(toCamelCase("get-element-by-id"));
console.log(toKebabCase("GetElementById"));

// find 函数
/**
 * const data = [
  {userId: 8, title: 'title1'},
  {userId: 11, title: 'other'},
  {userId: 15, title: null},
  {userId: 19, title: 'title2'}
];
 
// 查找data中，符合where中条件的数据，并根据orderBy中的条件进行排序
const result = find(data).where({
  "title": /\d$/   // 这里意思是过滤出数组中，满足title字段中符合 /\d$/的项
}).orderBy('userId', 'desc');  // 这里的意思是对数组中的项按照userId进行倒序排列
 
//=> 返回 [{ userId: 19, title: 'title2'}, { userId: 8, title: 'title1' }];
console.log(result.value);
 */

class Find {
constructor(data) {
    this.data = [...data];
}

where(query) {
    this.data = this.data.filter((item) => {
    return Object.entries(query).every(([key, value]) => {
        if (value instanceof RegExp) {
        return value.test(item[key]);
        } else {
        return item[key] === value;
        }
    });
    });

    return this;
}

orderBy(key, type) {
    this.data = this.data.sort((a, b) =>
    type !== "desc" ? a[key] - b[key] : b[key] - a[key],
    );

    return this;
}

get value() {
    return this.data;
}
}

function find(data) {
return new Find(data);
}
