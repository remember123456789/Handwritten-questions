//防抖
function debounce(fn, delay) {
  let timer = null;

  return (...args) => {
    if (timer) {
      clearTimeout(timer);
    } else {
      timer = setTimeout(() => {
        fn.apply(this, args);
      }, delay);
    }
  };
}

//节流
function throttle(fn, delay) {
  let flag = true;

  return () => {
    if (!flag) return;
    flag = false;
    setTimeout(() => {
      fn.apply(this, ...args);
      flag = true;
    }, delay);
  };
}