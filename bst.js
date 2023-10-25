class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(arr) {
    arr.sort((a, b) => a - b);
    console.log(arr);
    this.root = this.buildTree(arr);
  }

  buildTree(arr) {
    if (arr.length == 2) {
      let node = new Node(arr[1]);
      node.left = new Node(arr[0]);
      return node;
    } else if (arr.length == 1) {
      return new Node(arr[0]);
    }

    const mid = Math.floor(arr.length / 2);
    const root = new Node(arr[mid]);
    root.left = this.buildTree(arr.slice(0, mid));
    root.right = this.buildTree(arr.slice(mid + 1));

    return root;
  }

  insert(root, value) {
    if (root == null) {
      root = new Node(value);
      return root;
    }

    if (value < root.data) {
      root.left = this.insert(root.left, value);
    } else {
      root.right = this.insert(root.right, value);
    }
    return root;
  }

  delete(root, value) {
    if (root == null) {
      return null;
    }
    if (value == root.data) {
      if (root.left == null && root.right == null) {
        return null;
      } else if (root.left && root.right) {
        let successorParent = root;
        let successor = root.right;

        while (successor.left != null) {
          successorParent = successor;
          successor = successor.left;
        }

        if (successorParent != root) {
          successorParent.left = successor.right;
        } else {
          successorParent.right = successor.right;
        }

        root.data = successor.data;
        successor = null;
        return root;
      } else if (root.left && !root.right) {
        return root.left;
      } else {
        return root.right;
      }
    } else if (value < root.data) {
      root.left = this.delete(root.left, value);
    } else {
      root.right = this.delete(root.right, value);
    }
    return root;
  }

  find(root, value) {
    if (root == null || value == root.data) {
      return root;
    } else if (value < root.data) {
      return this.find(root.left, value);
    } else return this.find(root.right, value);
  }

  levelOrder(func, root) {
    let queue = [];
    queue.push(root);

    while (queue[0] != undefined) {
      let current = queue.shift();
      if (current.right) queue.push(current.right);
      if (current.left) queue.push(current.left);
      func(current);
    }
  }

  inorder(func, root) {
    if (root.left) {
      this.inorder(func, root.left);
    }

    func(root);

    if (root.right) {
      this.inorder(func, root.right);
    }
  }

  preorder(func, root) {
    func(root);
    if (root.left) {
      this.preorder(func, root.left);
    }

    if (root.right) {
      this.preorder(func, root.right);
    }
  }

  postorder(func, root) {
    if (root.left) {
      this.postorder(func, root.left);
    }

    if (root.right) {
      this.postorder(func, root.right);
    }

    func(root);
  }

  height(root) {
    if (root == null) return 0;
    let leftHeight = this.height(root.left);
    let rightHeight = this.height(root.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(root, node, depth = 0) {
    if (root == null || node == null) {
      return;
    } else if (root == node) {
      return depth;
    } else if (node.data < root.data) {
      return this.depth(root.left, node, (depth += 1));
    } else return this.depth(root.right, node, (depth += 1));
  }

  isBalanced(root = this.root) {
    if (root === null) return true;

    const diff = Math.abs(this.height(root.left) - this.height(root.right));

    if (
      diff <= 1 &&
      this.isBalanced(root.left) &&
      this.isBalanced(root.right)
    ) {
      return true;
    } else {
      return false;
    }
  }

  rebalance() {
    let arr = [];
    this.levelOrder((x) => arr.push(x.data), this.root);
    arr.sort((a, b) => a - b);
    this.root = this.buildTree(arr);
  }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

let arr = [
  2, 3, 8, 10, 13, 23, 36, 37, 45, 46, 48, 50, 56, 71, 73, 76, 89, 96, 99, 100,
];
const tree = new Tree(arr);

let levelOrder = "";
let preOrder = "";
let postOrder = "";
let inOrder = "";

prettyPrint(tree.root);

console.log("Balanced: " + tree.isBalanced());

tree.levelOrder((node) => {
  levelOrder += node.data + " ";
}, tree.root);

tree.preorder((node) => {
  preOrder += node.data + " ";
}, tree.root);

tree.postorder((node) => {
  postOrder += node.data + " ";
}, tree.root);

tree.inorder((node) => {
  inOrder += node.data + " ";
}, tree.root);

console.log("Level order: " + levelOrder);
console.log("Pre order: " + preOrder);
console.log("Post order: " + postOrder);
console.log("In order: " + inOrder);

tree.insert(tree.root, 500);
tree.insert(tree.root, 300);
tree.insert(tree.root, 200);
tree.insert(tree.root, 570);

console.log("Tree after insertions: ");
prettyPrint(tree.root);
console.log("Balanced: " + tree.isBalanced(tree.root));
