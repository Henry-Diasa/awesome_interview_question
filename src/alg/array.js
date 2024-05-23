/**
 * 移除元素
 * https://leetcode.cn/problems/remove-element/description/
 * skill: 双指针
 */
function removeElement(nums, val) {
    let slow = 0;
    for(let fast = 0; fast < nums.length; fast++) {
        if(nums[fast]!==val) {
            nums[slow++] = nums[fast]
        }
    }
    return slow;
}

/**
 * 删除有序数组中的重复项
 * https://leetcode.cn/problems/remove-duplicates-from-sorted-array/description/
 * skill: 双指针
 */

function removeDuplicates(nums) {
    if(!nums || nums.length == 0) {
        return 0
    }
    let left = 0, right = 1;
    while(right < nums.length) {
        if(nums[left]!==nums[right]) {
            nums[left + 1] = nums[right];
            left++;
        }
        right++
    }
    return left + 1
}
/**
 * 移动零
 * https://leetcode.cn/problems/move-zeroes/description/
 * skill: 双指针
 */
 function moveZeroes(nums) {
    const swap = (i, j) => {
        let temp = nums[i]
        nums[i] = nums[j]
        nums[j] = temp
    }
    let i = 0, j = 0;
    while(j < nums.length) {
        if(nums[j]!==0) {
            swap(i, j);
            i++
        }
        j++
    }
 }
/**
 * 比较含退格的字符串
 * https://leetcode.cn/problems/backspace-string-compare/description/
 * skill: 栈
 */
var backspaceCompare = function (s, t) {
    let stack = []
    for (let i = 0; i < s.length; i++) {
        const curr = s[i]
        if(curr == '#') {
            if(stack.length > 0) {
                stack.pop()
            }
        }else{
            stack.push(curr)
        }
    }
    const ret1 = stack.join('')
    stack = []
    for (let i = 0; i < t.length; i++) {
        const curr = t[i]
        if(curr == '#') {
            if(stack.length > 0) {
                stack.pop()
            }
        }else{
            stack.push(curr)
        }
    }
    return ret1 === stack.join('')
};
/**
 * 有序数组的平方
 * htpps://leetcode.cn/problems/squares-of-a-sorted-array/description/
 * skill: 双指针
 */
function sortedSquares(nums) {
    let start = 0, end = nums.length - 1, k = nums.length - 1;
    const result = new Array(nums.length).fill(0);
    while (start <= end) {
        if (nums[start] * nums[start] > nums[end] * nums[end]) {
            result[k--] = nums[start] * nums[start];
            start++
        } else {
            result[k--] = nums[end] * nums[end];
            end--;
        }
    }
    return result;
} 

/**
 * 二分查找
 * https://leetcode.cn/problems/binary-search/description/
 * skill: 二分查找（注意循环不变量 左闭右闭 或者 左闭右开）
 */

function search(nums, target) {
    let left = 0, right = nums.length - 1;
    while(left <= right) {
        const mid = Math.floor((left + right) / 2);
        if(nums[mid] === target) {
            return mid
        }
        if(nums[mid] < target) {
            left = mid + 1;
        }else{
            right = mid - 1;
        }
    }
    return -1;
}

/**
 * 搜索插入位置
 * ://leetcode.cn/problems/search-insert-position/description/
 * skill: 二分查找
 */
function searchInsert(nums, target) {
    let left = 0, right = nums.length - 1;
    while(left <= right) {
        const mid = Math.floor((left + right) / 2);
        if(nums[mid] === target) {
            return mid
        }
        if(nums[mid] < target) {
            left = mid + 1;
        }else{
            right = mid - 1;
        }
    }
    return right + 1;
}

/**
 * 在排序数组中查找元素的第一个和最后一个位置
 * https://leetcode.cn/problems/find-first-and-last-position-of-element-in-sorted-array/description/
 * skill: 二分查找 注意左右边界的处理
 */

function searchRange(nums, target) {
    const res = [-1, -1]
    if(!nums || nums.length == 0) {
        return res
    }

    res[0] = findFirst(nums, target)
    res[1] = findLast(nums, target)

    return res
}

function findFirst(nums, target) {
    let L = 0, R = nums.length - 1, res = -1,mid = 0;
    while(L <= R) {
        mid = Math.floor((L + R) / 2);
        if(nums[mid] < target) {
            L = mid + 1;
        }else if(nums[mid] > target) {
            R = mid - 1;
        }else{
            res = mid;
            R = mid - 1;
        }
    }
    return res;
}
function findLast(nums, target) {
    let L = 0, R = nums.length - 1, res = -1,mid = 0;
    while(L <= R) {
        mid = Math.floor((L + R) / 2);
        if(nums[mid] < target) {
            L = mid + 1;
        }else if(nums[mid] > target) {
            R = mid - 1;
        }else{
            res = mid;
            L = mid + 1;
        }
    }
    return res;
}

/**
 * x 的平方根 
 * https://leetcode.cn/problems/sqrtx/description/
 * skill: 二分查找
 */

function mySqrt(x) {
    if(x === 0) {
        return 0;
    }
    let L = 0, R = x, mid = 0;
    while(L <= R) {
        mid = Math.floor((L + R) / 2);
        if(mid * mid === x) {
            return mid;
        }else if(mid * mid < x) {
            L = mid + 1;
        }else{
            R = mid - 1;
        }
    }
    return R;
}

/**
 * 有效的完全平方数
 * https://leetcode.cn/problems/valid-perfect-square/description/
 * skill: 二分查找
 */
function isPerfectSquare(x) {
    let L = 0, R = x, mid = 0;
    while(L <= R) {
        mid = Math.floor((L + R) / 2);
        if(mid * mid === x) {
            return true;
        }else if(mid * mid < x) {
            L = mid + 1;
        }else{
            R = mid - 1;
        }
    }
    return false;
}

/**
 * 长度最小的子数组
 * https://leetcode.cn/problems/minimum-size-subarray-sum/description/
 * skill: 滑动窗口
 */
function minSubArrayLen(target, nums) {
    let i = 0, j = 0, len = nums.length, sum = 0, res = Infinity;
    while(j < len) {
        sum += nums[j];

        while(sum >= target) {
            res = Math.min(res, j - i + 1);
            sum -= nums[i++];
        }
        j++
    }
    return res === Infinity ? 0 : res;
}

/**
 * 水果成篮
 * ://leetcode.cn/problems/fruit-into-baskets/description/
 * skill: 滑动窗口
 */
function totalFruit(fruits) {
    const n = fruits.length;
    const cnt = new Map();

    let left = 0, ans = 0;
    for (let right = 0; right < n; ++right) {
        cnt.set(fruits[right], (cnt.get(fruits[right]) || 0) + 1);
        while (cnt.size > 2) {
            cnt.set(fruits[left], cnt.get(fruits[left]) - 1);
            if (cnt.get(fruits[left]) == 0) {
                cnt.delete(fruits[left]);
            }
            ++left;
        }
        ans = Math.max(ans, right - left + 1);
    }
    return ans;
};

/**
 * 最小覆盖子串
 * https://leetcode.cn/problems/minimum-window-substring/description/
 * skill: 滑动窗口
 */

var minWindow = function(s, t) {
    // 需要的
    let need = {};
    // 窗口中的字符
    let window = {};
    for (let a of t) {
      // 统计需要的字符
      need[a] = (need[a] || 0) + 1;
    }
    // 左右指针
    let left = 0,
      right = 0;
    let valid = 0;
    // 最小覆盖子串的起始索引及长度
    let start = 0,
      len = Number.MAX_VALUE;
    while (right < s.length) {
      // 即将移入窗口的字符
      let c = s[right];
      // 右移窗口
      right++;
      if (need[c]) {
        // 当前字符在需要的字符中，则更新当前窗口统计
        window[c] = (window[c] || 0) + 1;
        if (window[c] == need[c]) {
          // 当前窗口和需要的字符匹配时，验证数量增加1
          valid++;
        }
      }
      // 当验证数量与需要的字符个数一致时，就应该收缩窗口了
      while (valid == Object.keys(need).length) {
        // 更新最小覆盖子串
        if (right - left < len) {
          start = left;
          len = right - left;
        }
        //即将移出窗口的字符
        let d = s[left];
        // 左移窗口
        left++;
        if (need[d]) {
          if (window[d] == need[d]) {
            valid--;
          }
          window[d]--;
        }
      }
    }
    return len == Number.MAX_VALUE ? "" : s.substr(start, len);
  };
/**
 * 螺旋矩阵 II
 * https://leetcode.cn/problems/spiral-matrix-ii/description/
 * https://leetcode.cn/problems/spiral-matrix/description/
 * https://leetcode.cn/problems/shun-shi-zhen-da-yin-ju-zhen-lcof/description/

 * skill: 矩阵
 */
function generateMatrix (n) {
    let startX = startY = 0;   // 起始位置
    let loop = Math.floor(n / 2);   // 旋转圈数
    let mid = Math.floor(n / 2);    // 中间位置
    let offset = 1;    // 控制每一层填充元素个数
    let count = 1;     // 更新填充数字
    let res = new Array(n).fill(0).map(() => new Array(n).fill(0));

    while (loop--) {
        let row = startX, col = startY;
        // 上行从左到右（左闭右开）
        for (; col < n - offset; col++) {
            res[row][col] = count++;
        }
        // 右列从上到下（左闭右开）
        for (; row < n - offset; row++) {
            res[row][col] = count++;
        }
        // 下行从右到左（左闭右开）
        for (; col > startY; col--) {
            res[row][col] = count++;
        }
        // 左列做下到上（左闭右开）
        for (; row > startX; row--) {
            res[row][col] = count++;
        }

        // 更新起始位置
        startX++;
        startY++;

        // 更新offset
        offset += 1;
    }
    // 如果n为奇数的话，需要单独给矩阵最中间的位置赋值
    if (n % 2 === 1) {
        res[mid][mid] = count;
    }
    return res;
};
