
// Scene
/**
 * useHistoryTravel
 * 管理状态历史变化记录，方便在历史记录中前进与后退。
 * https://github.com/GpingFeng/hooks/blob/guangping%2Fread-code/packages/hooks/src/useHistoryTravel/index.ts
 */


/**
 * useNetwork
 * 管理网络连接状态的 Hook。可以学习如何监听网络状态
 * https://github.com/GpingFeng/hooks/blob/guangping%2Fread-code/packages/hooks/src/useNetwork/index.ts
 */

/**
 * useCountdown
 * 一个用于管理倒计时的 Hook。
 */

function calcLeft(t) {
    if (!t) {
        return 0;
    }
    // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
    // 计算剩余时间，目标时间 - 当前时间 > 0
    const left = dayjs(t).valueOf() - new Date().getTime();
    // 小于 0 的时候，返回 0，代表结束
    if (left < 0) {
    return 0;
    }
    return left;

}
// 格式化后的倒计时
const parseMs = (milliseconds) => {
    return {
      days: Math.floor(milliseconds / 86400000),
      hours: Math.floor(milliseconds / 3600000) % 24,
      minutes: Math.floor(milliseconds / 60000) % 60,
      seconds: Math.floor(milliseconds / 1000) % 60,
      milliseconds: Math.floor(milliseconds) % 1000,
    };
  };
const useCountdown = function(options) {
    const {
        targetDate,
        interval = 1000,
        onEnd
    } = options;

    const [timeLeft, setTimeLeft] = useState(() => calcLeft(targetDate));
    const onEndRef = useLatest(onEnd)

    useEffect(() => {
        if(!targetDate) {
            setTimeLeft(0);
            return;
        }
        setTimeLeft(calcLeft(targetDate))

        const timer = setInterval(() => {
           const targetLeft = calcLeft(targetDate);
           setTimeLeft(targetLeft);
           
           if(targetLeft === 0) {
               clearInterval(timer);
               onEndRef.current && onEndRef.current();
           }
        }, interval)
        return () => clearInterval(timer);
    }, [targetDate, interval])

    const formatTime = useMemo(() => {
        return parseMs(timeLeft)
    }, [timeLeft])

    return [timeLeft, formatTime]
}

// LifeCycle

/**
 * useMount
 */

function useMount(fn) {
    useEffect(() => {
        fn?.();
    }, []);
}

/**
 * useUnmount
 * 
 */

function useUnmount(fn) {
    // 避免闭包陷阱
    const fnRef = useLatest(fn)
    useEffect(
        () => () => {
            fnRef.current?.()
        },
        []
    )
}

// state

/**
 * useDebounceFn
 * 用来处理防抖函数的 Hook。
 */
function useDebounceFn(fn, options) {
    const fnRef = useLatest(fn);
    const wait = options.wait ?? 1000;

    const debounced = useMemo(() => {
        return debounce( // lodash的debounce
            (...args) => {
                return fnRef.current(...args);
            },
            wait,
            options
        )
    }, [])
    useUnmount(() => {
        debounced.cancel();
    })
    return {
        run: debounced,
        cancel: debounced.cancel,
        flush: debounced.flush,
    };
}

/**
 * useDebounce
 * 用来处理防抖值的 Hook。
 */
function useDebounce(value, options) {
    const [debounced, setDebounced] = useState(value);
    // 使用了处理防抖函数
    const { run } = useDebounceFn(() => {
        setDebounced(value);
    }, options);

    useEffect(() => {
        run();
    }, [value]);

  return debounced;
}

/**
 * usePrevious
 */
const defaultShouldUpdate = (a, b) => !Object.is(a, b);
function usePrevious(state, shouldUpdate = defaultShouldUpdate) {
    const prevRef = useRef();
    const curRef = useRef();

    if(shouldUpdate(curRef.current, state)) {
        prevRef.current = curRef.current;
        curRef.current = state
    }
    return prevRef.current
}

// Effect

/**
 * useUpdateEffect
 */
function useUpdateEffect() {
    return createUpdateEffect(useEffect);
}

function createUpdateEffect(hook) {
    return (effect, deps) => {
        const isMounted = useRef(false);
        hook(() => {
            return () => {
                isMounted.current = false;
            }
        }, [])
        hook(() => {
            // 首次执行完时候，设置为 true，从而下次依赖更新的时候可以执行逻辑
            if (!isMounted.current) {
              isMounted.current = true;
            } else {
              return effect();
            }
        }, deps);
    }
}

/**
 * useInterval / useTimeout
 * 
 */
function useInterval(
    fn,
    delay,
    options,
  ) {
    const immediate = options?.immediate;
    const fnRef = useLatest(fn);
  
    useEffect(() => {
      // 忽略部分代码...
      // 立即执行
      if (immediate) {
        fnRef.current();
      }
      const timer = setInterval(() => {
        fnRef.current();
      }, delay);
      // 清除定时器
      return () => {
        clearInterval(timer);
      };
      // 动态修改 delay 以实现定时器间隔变化与暂停。
    }, [delay]);
  }

/**
 * useUpdate
 * 
 */
function useUpdate() {
    const [, setState] = useState({});
    return useCallback(() => setState({}), []);
}

// Advanced

/**
 * useCreation
 */

function useCreation(factory, deps) {
    const { current } = useRef({
        deps,
        obj: undefined,
        initialized: false,
    });
    // 刚初始化或者依赖不相等的时候（通过 Object.is 进行判断）
    if (current.initialized === false || !depsAreSame(current.deps, deps)) {
        // 更新依赖
        current.deps = deps;
        // 执行工厂函数
        current.obj = factory();
        // 初始化标识位置为 true
        current.initialized = true;
    }
    return current.obj;
}

/**
 * useLatest
 */
function useLatest(value) {
    const ref = useRef(value);
    ref.current = value;
  
    return ref;
}

/**
 * useMemoizedFn
 */

function useMemoizedFn(fn) {
    // 通过 useRef 保持其引用地址不变，并且值能够保持值最新
    const fnRef = useRef(fn);
    fnRef.current = useMemo(() => fn, [fn]);
    // 通过 useRef 保持其引用地址不变，并且值能够保持值最新
    const memoizedFn = useRef();
    if (!memoizedFn.current) {
      // 返回的持久化函数，调用该函数的时候，调用原始的函数
      memoizedFn.current = function(this, ...args) {
        return fnRef.current.apply(this, args);
      };
    }
  
    return memoizedFn.current;
  }