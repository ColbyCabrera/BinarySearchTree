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

let arr = [50, 70, 60, 80, 85, 75, 65, 30, 20, 40, 32, 34, 36];
const tree = new Tree(arr);
tree.insert(tree.root, 12);
prettyPrint(tree.root);
tree.delete(tree.root, 1);
prettyPrint(tree.root);
console.log(tree.find(tree.root, 12));
