class BinarySearchTree {
  constructor(key = null, value = null, parent = null) {
    this.key = key,
    this.value = value,
    this.parent = parent,
    this.left = null,
    this.right = null;
  }

  insert(key, value) {
    if (this.key === null) {
      this.key = key;
      this.value = value;
    }

    else if (key < this.key) {
      if (this.left === null) {
        this.left = new BinarySearchTree(key, value, this);
      } else {
        this.left.insert(key, value);
      }
    }

    else {
      if (this.right === null) {
        this.right = new BinarySearchTree(key, value, this);
      } else {
        this.right.insert(key, value);
      }
    }
  }

  find(key) {
    if (this.key == key) {
      return this.value;
    }

    else if (key < this.key && this.left) {
      return this.left.find(key);
    }

    else if (key > this.key && this.right) {
      return this.right.find(key);
    }

    else {
      throw new Error('Key error');
    }
  }

  remove(key) {
    if (this.key == key) {
      if (this.left && this.right) {
        const successor = this.right._findMin();
        this.key = successor.key;
        this.value = successor.value;
        successor.remove(successor.key);
      }

      else if (this.left) {
        this._replaceWith(this.left);
      }

      else if (this.right) {
        this._replaceWith(this.right);
      }

      else {
        this._replaceWith(null);
      }
    }

    else if (key < this.key && this.left) {
      this.left.remove(key);
    }
    else if (key > this.key && this.right) {
      this.right.remove(key);
    }
    else {
      throw new Error('Key error');
    }
  }

  _replaceWith(node) {
    if (this.parent) {
      if (this == this.parent.left) {
        this.parent.left = node;
      }
      else if (this == this.parent.right) {
        this.parent.right = node;
      }

      if (node) {
        node.parent = this.parent;
      }
    }
    else {
      if (node) {
        this.key = node.key,
        this.value = node.value,
        this.left = node.left,
        this.right = node.right;
      }
      else {
        this.key = null,
        this.value = null,
        this.left = null,
        this.right = null;
      }
    }
  }

  _findMin() {
    if (!this.left) {
      return this;
    }
    return this.left._findMin();
  }
}

const BST = new BinarySearchTree();

BST.insert(3);
BST.insert(1);
BST.insert(4);
BST.insert(6);
BST.insert(9);
BST.insert(2);
BST.insert(5);
BST.insert(7);

// console.log(BST)

// BST.insert('E')
// BST.insert('A')
// BST.insert('S')
// BST.insert('Y')
// BST.insert('Q')
// BST.insert('U')
// BST.insert('E')
// BST.insert('S')
// BST.insert('T')
// BST.insert('I')
// BST.insert('O')
// BST.insert('N')

// console.log(require('util').inspect(BST, {depth: null}))


// This function returns the sum of all the keys in a BST. Runtime is O(log(n))


function bstHeight(tree, count) {
  let height = count;

  if (tree.key == null) {
    return 0;
  }

  if (!tree.left && !tree.right) {
    height = count + 1;
  }

  if (tree.left && tree.right) {
    height = count + 1;
    return Math.max(bstHeight(tree.right, height), bstHeight(tree.left, height));
  }

  else if (tree.left) {
    height = count + 1;
    return bstHeight(tree.left, height);
  }

  else if (tree.right) {
    height = count + 1;
    return bstHeight(tree.right, height);
  }

  return height;
}

const LF = new BinarySearchTree();

// console.log(bstHeight(BST, 0))


function isBST(tree) {
  let res = true;

  if (!tree.left && !tree.right) {
    res = true;
  }

  if (tree.left && tree.right) {
    if (!(tree.left.key < tree.key)) {
      res = false;
      return res;
    } else {
      isBST(tree.left);
    }

    if (!(tree.right.key > tree.key)) {
      res = false;
      return res;
    } else {
      isBST(tree.right);
    }
  }

  if (tree.left) {
    if (!(tree.left.key < tree.key)) {
      res = false;
      return res;
    } else {
      isBST(tree.left);
    }
  }

  if (tree.right) {
    if (!(tree.right.key > tree.key)) {
      res = false;
      return res;
    } else {
      isBST(tree.right);
    }
  }

  return res;
}

// console.log(isBST(BST))


function thirdLargest(tree) {

  if (!tree.right) {
    if (tree.parent) {
      console.log(tree.parent.key);
    } else {
      console.log(tree.key);
    }
  }

  if (tree.right) {
    thirdLargest(tree.right);
  }

}

// console.log(thirdLargest(BST))

const balanced = new BinarySearchTree();
const data1 = [10, 5, 15, 2, 7, 12, 17, 1, 3, 6, 8, 11, 13, 16, 18, 19];
data1.forEach(num => {
  balanced.insert(num);
});


function balancedBST(tree) {
  if (tree.left === null || tree.right === null) {
    return true;
  }

  let left = bstHeight(tree.left, 0);
  let right = bstHeight(tree.right, 0);

  if (Math.abs(left - right) <= 1) {
    return balancedBST(tree.left) && balancedBST(tree.right);
  } else {
    return false;
  }
}

// console.log(balancedBST(balanced))
// console.log(balancedBST(BST))


function checkBSTFromArray(arr1, arr2) {
  if (arr1.length !== arr2.length || arr1[0] !== arr2[0]) return false;
  if (arr1.length === 0 || arr2.length === 0) return true;

  const higher1 = [];
  const higher2 = [];
  const lower1 = [];
  const lower2 = [];

  for (let i = 1; i < arr1.length; i++) {
    if (arr1[i] > arr1[0]) {
      higher1.push(arr1[i]);
    } else {
      lower1.push(arr1[i]);
    }
  }

  for (let i = 1; i < arr2.length; i++) {
    if (arr2[i] > arr2[0]) {
      higher2.push(arr2[i]);
    } else {
      lower2.push(arr2[i]);
    }
  }

  return (
    checkBSTFromArray(higher1, higher2) && checkBSTFromArray(lower1, lower2)
  );
}

const arr1 = [3, 5, 4, 6, 1, 0, 2];
const arr2 = [3, 1, 5, 2, 4, 6, 0];
console.log(checkBSTFromArray(arr1, arr2));
