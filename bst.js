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
    if (value == root.data) {
      if (root.left == null && root.right == null) {
        return null;
      } else if (root.left && root.right) {
        // Both children
        console.log("Not implemented");
        return null;
      } else if (root.left && !root.right) {
        const child = new Node(root.left.data);
        return child;
      } else {
        const child = new Node(root.right.data);
        return child;
      }
    }
    if (value < root.data) {
      root.left = this.delete(root.left, value);
    } else {
      root.right = this.delete(root.right, value);
    }
    return root;
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

let arr = [1, 2, 3, 4, 5, 6, 7];
const tree = new Tree(arr);
tree.insert(tree.root, 8);
prettyPrint(tree.root);
tree.delete(tree.root, 7);
prettyPrint(tree.root);
