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
    const root = new Node(array[array.length / 2]);
    root.left = new Node(this.buildTree())
    return root;
  }
}

const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
console.log(tree.root);
