//怎么实现轮询请求

// 1.传统方法
import { useEffect, useState } from "react";
// const [data, setData] = useState(0);

// useEffect(() => {
//   const poll = () => {
//     //请求数据
//     fetch("http://localhost:3000")
//       .then((res) => res.json())
//       .then((data) => {
//         setData(data);
//       });
//   };
//   poll();
//   const timer = setInterval(poll, 1000);
//   return () => {
//     clearInterval(timer);
//   };
// }, []);

//2.使用// 创建 AbortController 终止请求F
// const controller = new AbortController();

// // 拿到 signal，并可将其传入需要可中止的 API
// const signal = controller.signal;

// // 主动触发中止
// controller.abort();

// let abortController: any = null; // 用于取消请求

// const poll = async () => {
//   try {
//     abortController.abort();
//     abortController = new AbortController();

//     fetch("http://localhost:3000", { signal: abortController.signal }).then(
//       (res) => {
//         console.log(res);
//       }
//     );
//   } catch (err) {
//     console.log(err);
//   } finally {
//     setTimeout(poll, 1000);
//   }
// };

// useEffect(() => {
//   poll();
//   return () => {
//     abortController.abort();
//   };
// });

//使用Hook封装逻辑
//涉及多个接口请求
export function usePolling(fetchFn, delay = 1000) {
  let [loading, setLoading] = useState(false);
  let timer = null;
  let [abortController, setAbortController] = useState(null);
  let isVisitable = false;
  let [data, setData] = useState(null);
  const poll = async () => {
    try {
      if (!loading) return;
      loading = true;
      setLoading(true);
      abortController?.abort();
      abortController = new AbortController();
      let result = await fetchFn(abortController.signal);
      setData(result);
    } catch (err) {
      if (err.name !== "AbortError") {
        console.error(err);
      }
    } finally {
      setLoading(false);
      timer = setInterval(poll, delay);
    }
  };

  //页面显示
  const start = () => {
    document.removeEventListener("visibilitychange", visibility);
    document.addEventListener("visibilitychange", visibility);
    poll();
  };

  const stop = () => {
    document.removeEventListener("visibilitychange", visibility);
    clearInterval(timer);
  };

  const visibility = () => {
    isVisitable = !document.hidden;
    if (isVisitable) {
      timer = setInterval(poll, delay);
    }
  };

  return { data, loading, start, stop };
}
