class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    contructor(array) {
        array.sort();
        console.log(array);
        this.root = buildTree(array);
    }

    buildTree(array) {

    }
}