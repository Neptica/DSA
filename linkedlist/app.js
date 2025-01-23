function LinkedList() {
  let head;
  let tail;
  let listSize = 0;

  const append = (newNode) => {
    if (!head) {
      head = ListNode(newNode);
      listSize += 1;
      return;
    }
    let curr = head;
    while (curr.next) {
      curr = curr.next;
    }
    curr.next = ListNode(newNode);
    tail = curr.next;
    listSize += 1;
  };

  const prepend = (newNode) => {
    newNode = ListNode(newNode);
    newNode.next = head;
    head = newNode;
    listSize += 1;
  };

  const size = () => {
    return listSize;
  };

  const at = (index) => {
    if (!head) {
      return false;
    }

    let curr = head.next;
    let count = 1;
    while (curr.next) {
      curr = curr.next;
      count += 1;
      if (count == index) {
        return curr.val;
      }
    }
    return null;
  };

  const pop = () => {
    let curr = head.next;
    let prev = head;
    while (curr.next) {
      prev = curr;
      curr = curr.next;
    }
    prev.next = null;
  };

  const contains = (value) => {
    let curr = head;
    while (curr) {
      if (curr.val == value) {
        return true;
      }
      curr = curr.next;
    }
    return false;
  };

  const find = (value) => {
    let curr = head;
    let index = 0;
    while (curr) {
      if (curr.val == value) {
        return index;
      }
      curr = curr.next;
      index += 1;
    }
    return null;
  };

  const toString = () => {
    let curr = head;
    let printString = "";
    while (curr) {
      printString += `( ${curr.val} ) -> `;
      curr = curr.next;
    }
    printString += " null";
    return printString;
  };

  const insertAt = (newNode, index) => {
    if (!head) {
      return false;
    }

    let curr = head.next;
    let prev = head;
    let count = 1;
    while (curr) {
      if (count == index) {
        let node = ListNode(newNode);
        let temp = prev.next;
        prev.next = node;
        node.next = temp;
        return true;
      }
      prev = curr;
      curr = curr.next;
      count += 1;
    }
    return false;
  };

  const removeAt = (index) => {
    if (!head) {
      return false;
    }

    let curr = head.next;
    let prev = head;
    let count = 1;
    while (curr) {
      if (count == index) {
        prev.next = prev.next.next;
        return true;
      }
      prev = curr;
      curr = curr.next;
      count += 1;
    }
    return false;
  };

  return {
    head,
    tail,
    size,
    append,
    prepend,
    at,
    pop,
    contains,
    find,
    toString,
    insertAt,
    removeAt,
  };
}

function ListNode(value) {
  let val = value;
  let next;

  return { val, next };
}

const list = new LinkedList();

list.append("dog");
list.append("cat");
list.append("parrot");
list.append("hamster");
list.append("snake");
list.append("turtle");
console.log(list.toString());

list.prepend("dragon");
console.log(list.toString());
console.log("size: ", list.size());
console.log("list head: ", list.head);
console.log("list tail: ", list.tail);
console.log("Element at pos 3: ", list.at(3));
console.log("at 10: ", list.at(10));
console.log("at -1: ", list.at(-1));

console.log(list.toString());
list.pop();
console.log(list.toString());

console.log("contains hamster: ", list.contains("hamster"));
console.log("contains turtle: ", list.contains("turtle"));

console.log("find hamster: ", list.find("hamster"));
console.log("find turtle: ", list.find("turtle"));

console.log(list.toString());
list.insertAt("LIZARD", 2);
console.log(list.toString());

console.log(list.toString());
list.removeAt(3);
console.log(list.toString());
