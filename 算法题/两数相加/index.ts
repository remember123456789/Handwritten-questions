// 给你两个 非空 的链表，表示两个非负的整数。它们每位数字都是按照 逆序 的方式存储的，并且每个节点只能存储 一位 数字。

// 请你将两个数相加，并以相同形式返回一个表示和的链表。

// 你可以假设除了数字 0 之外，这两个数都不会以 0 开头。
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */
// l1 和 l2 为当前遍历的节点，carry 为进位
var addTwoNumbers = function (l1, l2, carry = 0) {
  if (l1 === null && l2 === null && carry === 0) {
    // 递归边界
    return null;
  }

  let s = carry;
  if (l1) {
    s += l1.val; // 累加进位与节点值
    l1 = l1.next;
  }
  if (l2) {
    s += l2.val;
    l2 = l2.next;
  }

  // s 除以 10 的余数为当前节点值，商为进位
//   return new ListNode(s % 10, addTwoNumbers(l1, l2, Math.floor(s / 10)));
};