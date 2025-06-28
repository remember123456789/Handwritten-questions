var addTwoNumbers = function (l1, l2, carry = 0) {
    let head1 = l1
    let head2 = l2

    while (head1 != null) {
        if (head2 != null) {
            head1.val += head2.val
            head2 = head2.next
        }
        //判断l2>l1的情况
        if (head1.next === null && head2 !== null) {
            head1.next = head2
            break
        }
        head1 = head1.next
    }
    function merge(head) {
        while (head != null) {
            //if (head.next == null) return
            if (head.val >= 10) {
                head.val = head.val % 10
                 if (head.next==null) {
                    head.next=new ListNode(0)
                }
                head.next.val += 1
            }
            head = head.next
        }
    }
    merge(l1)
    return l1
};
