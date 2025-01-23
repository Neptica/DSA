function HashMap() {
  let capacity = 16;
  let load = 0;
  let buckets = new Array(capacity);

  function hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode % capacity;
  }

  function ListNode(keyIn, value) {
    let val = value;
    let key = keyIn;
    let next;
    return { val, key, next };
  }

  function set(key, value) {
    let hashCode = hash(key);
    if (buckets[hashCode]) {
      let curr = buckets[hashCode];
      while (curr.next && curr.key != key) {
        curr = curr.next;
      }
      if (curr.key == key) {
        curr.val = value;
      } else {
        curr.next = ListNode(key, value);
        load += 1;
      }
    } else {
      buckets[hashCode] = ListNode(key, value);
      load += 1;
    }
    console.log("Load Levels", load / capacity);
    if (load / capacity > 0.75) {
      console.log("\n Growth");
      capacity *= 2;
      load = 0;
      const nodes = buckets.entries();
      buckets = new Array(capacity);
      // console.log(nodes[0]);
      for (let [i, curr] of nodes) {
        while (curr) {
          // console.log(curr.key, curr.val);
          set(curr.key, curr.val);
          curr = curr.next;
        }
      }
    }
  }

  function get(key) {
    let hashCode = hash(key);
    let curr = buckets[hashCode];
    while (curr) {
      if (curr.key == key) {
        return curr.val;
      }
      curr = curr.next;
    }
    return null;
  }

  function has(key) {
    let hashCode = hash(key);
    let curr = buckets[hashCode];
    while (curr) {
      if (curr.key == key) {
        return true;
      }
      curr = curr.next;
    }
    return false;
  }

  function remove(key) {
    let hashCode = hash(key);
    if (!buckets[hashCode]) {
      return false;
    }

    let curr = buckets[hashCode];
    let head = ListNode("dummy", "val");
    let prev = head;
    prev.next = curr;
    while (curr && curr.key != key) {
      prev = curr;
      curr = curr.next;
    }
    if (curr.key == key) {
      prev.next = prev.next.next;
      buckets[hashCode] = head.next;
      return true;
    }
    return false;
  }

  function length() {
    return load;
  }

  function clear() {
    load = 0;
    buckets = new Array(capacity);
  }

  function keys() {
    let keyList = [];
    for (let bucket of buckets) {
      let curr = bucket;
      while (curr) {
        keyList.push(curr.key);
        curr = curr.next;
      }
    }
    return keyList;
  }

  function values() {
    let valueList = [];
    for (let bucket of buckets) {
      let curr = bucket;
      while (curr) {
        valueList.push(curr.val);
      }
    }
    return valueList;
  }

  function entries() {
    let entryList = [];
    for (let bucket of buckets) {
      let curr = bucket;
      while (curr) {
        entryList.push([curr.key, curr.val]);
        curr = curr.next;
      }
    }
    return entryList;
  }

  return { hash, set, get, has, remove, length, clear, keys, values, entries };
}

const test = HashMap();
test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

test.set("lion", "brown");
console.log(test.length());

test.set("moon", "silver");
console.log(test.length());

console.log(test.remove("moon"));
console.log(test.entries());
