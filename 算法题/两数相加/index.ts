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
  let head1 = l1;
  let head2 = l2;

  while (head1 != null) {
    if (head2 != null) {
      head1.val += head2.val;
      head2 = head2.next;
    }
    //判断l2>l1的情况
    if (head1.next === null && head2 !== null) {
      head1.next = head2;
      break;
    }
    head1 = head1.next;
  }
  // >=10的情况 后面进位
  function merge(head) {
    while (head != null) {
      //if (head.next == null) return
      if (head.val >= 10) {
        head.val = head.val % 10;
        if (head.next == null) {
          head.next = new ListNode(0);
        }
        head.next.val += 1;
      }
      head = head.next;
    }
  }
  merge(l1);
  return l1;
};
