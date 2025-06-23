//单向链表
function Linklist() {
  function Node(data) {
    this.data = data;
    this.next = null;
  }
  this.length = 0;
  this.head = null;

  //链表的操作
  Linklist.prototype.append = function (data) {
    //先判断有没有节点，没有节点创建节点并让头指针执行第一个节点
    if (this.length == 0) {
      var node = new Node(data);
      this.head = node;
    } else {
      //有节点创建节点
      var node = new Node(data);
      var current = this.head;
        
      while (current.next) {
        current = current.next;
      }

      current.next = node;
    }
    this.length += 1;
  };
}
