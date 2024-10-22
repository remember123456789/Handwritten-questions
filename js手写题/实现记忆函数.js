// 在 JavaScript 中，记忆函数（Memoization）是一种优化技术，旨在通过存储函数的调用结果，避免重复计算以提高性能。它非常适用于纯函数（同样的输入总是产生同样的输出），特别是在需要大量重复计算的场景中。为了彻底理解 JavaScript 中的记忆函数，本文将从其原理、实现方式、应用场景及优化方法等多个方面详细讨论。

// 一、记忆函数的基本原理
// 记忆化是一种缓存策略，主要用于函数式编程。它的核心思想是：当某个函数第一次被调用时，将其计算结果缓存下来，后续再调用该函数时，如果输入相同，就直接从缓存中返回结果，而不是再次进行计算。

// 这种技术可以大幅度减少函数的计算开销，尤其是在递归算法中，如斐波那契数列、阶乘、动态规划等问题。

// 工作流程：

// 当函数第一次被调用时，计算结果并缓存起来。
// 当函数后续调用时，检查缓存中是否已经有结果。
// 如果有，直接返回缓存的结果。
// 如果没有，重新计算并将结果存储到缓存中。

function memoize(fn) {
  const cache = {}; // 创建一个缓存对象
  return function (...args) {
    const key = JSON.stringify(args); // 将参数序列化为字符串，作为缓存的键
    if (cache[key]) {
      console.log("从缓存中读取:", key);
      return cache[key];
    }
    const result = fn(...args); // 调用原函数
    cache[key] = result; // 缓存结果
    return result;
  };
}

// 例如：计算斐波那契数列
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

const memoizedFibonacci = memoize(fibonacci);
console.log(memoizedFibonacci(40)); // 大大加快计算速度