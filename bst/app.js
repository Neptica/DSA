const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.val}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

function Tree() {
  let root = null;

  function getRoot() {
    return root;
  }

  function buildTree(array) {
    for (const num of array) {
      console.log(num);
      let newNode = ListNode(num);
      insert(newNode);
      prettyPrint(root);
    }
    return root;
  }

  function insert(newNode) {
    if (!root) {
      root = newNode;
      return true;
    }

    let curr = root;
    let prev = null;
    let inserted = false;
    while (curr) {
      prev = curr;
      if (newNode.val < curr.val) {
        if (!curr.left) {
          curr.left = newNode;
          newNode.parent = curr;
          inserted = true;
          break;
        }
        curr = curr.left;
      } else if (newNode.val > curr.val) {
        if (!curr.right) {
          curr.right = newNode;
          newNode.parent = curr;
          inserted = true;
          break;
        }
        curr = curr.right;
      } else {
        console.log("Duplicate Value");
        break;
      }
    }

    rebalance(prev);
    return inserted;
  }

  function deleteItem(value) {
    if (!root) {
      return false;
    }

    let curr = root;
    let prev;
    let successor;
    while (curr) {
      if (value < curr.val) {
        prev = curr;
        curr = curr.left;
      } else if (value > curr.val) {
        prev = curr;
        curr = curr.right;
      } else {
        break;
      }
    }

    if (!curr) {
      return false;
    }

    if (curr.right) {
      successor = curr.right;
    } else {
      if (prev.left == curr) {
        prev.left = curr.left;
      } else {
        prev.right = curr.left;
      }
      return true;
    }

    let par = null; // if par is null the right node becomes the successor no strings attached
    while (successor.left) {
      par = successor;
      successor = successor.left;
    }

    if (prev.right == curr) {
      prev.right = successor;
    } else {
      prev.left = successor;
    }

    if (par != null) {
      par.left = successor.right;
      par.parent = successor;
      successor.right = curr.right;
      curr.right.parent = successor;
      successor.parent = prev;
    }
    successor.left = curr.left; // what does this do??
    return false;
  }

  function isBalanced(node) {
    if (!node) {
      return 0;
    }

    let left = isBalanced(node.left);
    let right = isBalanced(node.right);
    if (Math.abs(left - right) > 1 || left == -1 || right == -1) {
      return -1;
    }
    // console.log(left, right);
    return Math.max(left, right) + 1;
  }

  function find(value) {
    let curr = root;
    while (curr) {
      if (curr.val == value) {
        return curr;
      } else if (value < curr.val) {
        curr = curr.left;
      } else {
        curr = curr.right;
      }
    }
    return null;
  }

  function levelOrder(callback = null) {
    if (!callback) {
      throw new Error("Please provide a callback function.");
    }

    let deque = [root];
    while (deque.length != 0) {
      let len = deque.length;
      let newDeque = [];
      for (let i = 0; i < len; i++) {
        let curr = deque.shift();
        if (!curr) {
          continue;
        }
        newDeque.push(curr.left);
        newDeque.push(curr.right);
        callback(curr);
      }
      deque = newDeque;
    }
  }

  function inOrder(callback = null, node) {
    if (!callback) {
      throw new Error("Please provide a callback function.");
    }
    if (!node) {
      return null;
    }

    inOrder(callback, node.left);
    callback(node.val);
    inOrder(callback, node.right);
  }

  function postOrder(callback = null, node) {
    if (!callback) {
      throw new Error("Please provide a callback function.");
    }
    if (!node) {
      return null;
    }

    postOrder(callback, node.left);
    postOrder(callback, node.right);
    callback(node.val);
  }

  function preOrder(callback = null, node) {
    if (!callback) {
      throw new Error("Please provide a callback function.");
    }

    if (!node) {
      return null;
    }

    callback(node.val);
    preOrder(callback, node.left);
    preOrder(callback, node.right);
  }

  function height(node) {
    if (!node) {
      return 0;
    }
    return 1 + Math.max(height(node.left), height(node.right));
  }

  function depth(node) {
    let deque = [root];
    let depth = 0;
    while (deque.length > 0) {
      let newDeque = [];
      for (const el of deque) {
        console.log(el);
        if (el === node) {
          return depth;
        }

        if (el.left) {
          newDeque.push(el.left);
        }
        if (el.right) {
          newDeque.push(el.right);
        }
      }
      deque = newDeque;
      depth += 1;
    }
    return -1;
  }

  function rebalance(node) {
    if (node == null) {
      return;
    }

    // preOrder (call then execute)
    let left = 1 + height(node.left);
    let right = 1 + height(node.right);

    if (Math.abs(left - right) > 1) {
      if (left - right == 2) {
        // rotate right (left is too big)
        // console.log("Rotate right", node.val);
        // TODO: -2, 1 and 2, -1 cases
        let leftBalanceFactor =
          height(node.left.left) - height(node.left.right);
        if (leftBalanceFactor == -1) {
          rotateLeft(node.left);
        }
        rotateRight(node);
      } else {
        // console.log("Rotate left", node.val);
        // rotate left (right is too big)
        let rightBalanceFactor =
          height(node.right.left) - height(node.right.right);
        if (rightBalanceFactor == 1) {
          rotateRight(node.right);
        }
        rotateLeft(node);
      }
    } else {
      node.height = Math.abs(left, right);
    }
    rebalance(node.parent); // make sure ancestors are balance now as well
  }

  function rotateRight(node) {
    let leftsRight = node.left.right;
    if (node.parent == null) {
      node.parent = node.left;
      node.left.parent = null;
      node.left.right = node;
      root = node.left;
    } else if (node.parent.left == node) {
      node.parent.left = node.left;
      node.left.parent = node.parent;
      node.parent = node.left;
    } else {
      node.parent.right = node.left;
      node.left.parent = node.parent;
      node.parent = node.left;
    }

    node.left.right = node;
    node.left = leftsRight;
    if (node.left) {
      node.left.parent = node;
    }
  }

  function rotateLeft(node) {
    let rightsLeft = node.right.left;
    if (node.parent == null) {
      node.parent = node.right;
      node.right.parent = null;
      node.right.left = node;
      root = node.right;
    } else if (node.parent.right == node) {
      node.parent.right = node.right;
      node.right.parent = node.parent;
      node.parent = node.right;
    } else {
      node.parent.left = node.right;
      node.right.parent = node.parent;
      node.parent = node.right;
    }

    node.right.left = node;
    node.right = rightsLeft;
    if (node.right) {
      node.right.parent = node;
    }
  }

  return {
    getRoot,
    buildTree,
    deleteItem,
    find,
    levelOrder,
    inOrder,
    postOrder,
    preOrder,
    height,
    depth,
    isBalanced,
    rebalance,
  };
}

function ListNode(value) {
  let val = value;
  let parent = null;
  let left = null;
  let right = null;
  let balanceFactor = 0;
  return { val, parent, left, right, balanceFactor };
}

let bst = Tree();
let root = bst.buildTree([
  1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324, 320, 330,
]);
// let root = bst.buildTree([
//   1, 6, 4, 23, 8, 7, 9, 4, 3, 5, 7, 9, 67, 6345, 324, 320, 330, 8.5, 10,
// ]);
//
// bst.deleteItem(7);
// bst.deleteItem(6345);
// console.log(bst.isBalanced(root));
//
// console.log(bst.find(7));
// console.log(bst.find(8));

console.log("\n\n\n\n\n\n\n");
// bst.levelOrder(console.log);
// bst.inOrder(console.log, root);
// bst.postOrder(console.log, root);
// bst.preOrder(console.log, root);

// console.log(bst.depth(bst.find(324)));

bst.rebalance(root);

// TODO: Implement a rebalance method for the tree
