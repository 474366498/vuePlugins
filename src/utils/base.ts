
// 防抖函数 https://www.jianshu.com/p/3a90d7742e48
// 增加需求，给防抖函数增加获取返回值功能【特殊版本五】，有哪两种拿返回值的思路？ 通过 promise 
/**
 * 
 * @param fn function 
 * @param delay 时间间隔
 * @param immediate 是否立即执行
 * @param callBack promise 式回调方法
 * @returns 
 */
export function debounce(fn: Function, delay: Number = 1000, immediate: Boolean = false, callBack: Function) {
  let timer: any = null
  let isInvoke = false
  const _debounce = function (...args) { // 参数传入 
    if (callBack) {
      return new Promise((res, rej) => {
        // console.log(args)
        if (timer) clearTimeout(timer)
        // 判断是否需要立即执行
        if (immediate && !isInvoke) {
          const result = fn.apply(this, args)
          if (callBack) callBack(result)
          res(result)
          isInvoke = true
        } else {
          timer = setTimeout(() => {
            const result = fn.apply(this, args) // this 绑定
            console.log(23, this, args)
            if (callBack) callBack(result)
            res(result)
            isInvoke = false
            timer = null
          }, delay)
        }
      })
    } else {
      // console.log(args)
      if (timer) clearTimeout(timer)

      // 判断是否需要立即执行
      if (immediate && !isInvoke) {
        fn.apply(this, args)
        isInvoke = true
      } else {
        timer = setTimeout(() => {
          fn.apply(this, args) // this 绑定
          isInvoke = false
          timer = null
        }, delay)
      }
    }
  }

  // _debounce 取消功能
  _debounce.cancel = function () {
    console.log(25, timer)
    if (timer) clearTimeout(timer)
    timer = null
    isInvoke = false
  }
  return _debounce
}

/**
 * 
 * @param fn function 
 * @param interval 时间间隔
 * @param immediate 是否第一次就执行
 * @param cancel 函数末次执行 (点击四次 只会执行两次=> 第一次、最后一次)
 * @returns 
 */
export function throttle(fn: Function, interval: Number = 2000, immediate: Boolean = true, cancel: Boolean = true) {
  let lastTime = 0
  let timer: any = null
  const throttleFn = function (...args) {
    console.log(62, args)
    if (!immediate && lastTime === 0) {
      lastTime = new Date().getTime()
    }
    let currentTime = new Date().getTime()
    let remainTime = interval - (currentTime - lastTime)
    if (timer) clearTimeout(timer)
    if (remainTime <= 0) {
      fn.apply(this, args)
      lastTime = currentTime
    } else if (cancel) {
      timer = setTimeout(() => {
        console.log(89, this)
        fn.apply(this, args)
        lastTime = new Date().getTime()
      }, remainTime);
    }
  }
  return throttleFn
}







