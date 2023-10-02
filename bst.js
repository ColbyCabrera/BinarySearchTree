class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    array.sort();
    console.log(array);
    this.root = this.buildTree(array);
  }

  buildTree(array) {

    if (array.length == 1) {
        return new Node(array[0]);
    }
    const mid = array.length / 2;
    const root = new Node(array[mid]);
    root.left = this.buildTree(array.slice(0, mid));
    root.right = this.buildTree(array.slice(mid));
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

const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 11, 12, 67, 6345, 324]);
prettyPrint(tree.root)