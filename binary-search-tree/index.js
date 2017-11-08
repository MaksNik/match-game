function Node(key, value) {
    this.key = key;
    this.value = value;

    this.left = null;
    this.right = null;
}

function BinarySearchTree() {
    this._root = new Node();
}


BinarySearchTree.prototype.root = function () {
    if (!this._root) {
        return null;
    }
    else {
        return this._root.value;
    }
    
}

BinarySearchTree.prototype.insert = function (key, value) {

    let root = this._root;
    let node = new Node(key, value);
    let current = root;

    if (!root.key) {
        root.key = node.key;
        root.value = node.value;
        return this;
    }

    while (current) {
        if (current.key > node.key) {
            if (!current.left) {
                current.left = node;
                return this;
            }
            else {
                current = current.left;
            }
        }
        else {
            if (!current.right) {
                current.right = node;
                return this;
            }
            else {
                current = current.right;
            }
        }
    }
}

BinarySearchTree.prototype.delete = function (key) {
    let current = this._root;
    let temp;

    while (current) {
        if (current.key === key) {
            if (current.left && current.right) {
                temp = current.right;
                while (temp.left) {
                    temp = temp.left;
                }
                current.key = temp.key;
                current.value = temp.value;
                temp = null;
                return this;
            }
            else if (!current.left && !current.right){
                current = null;
                return this;
            }
            else if (current.left) {
                current.key = current.left.key;
                current.value = current.left.value;
                current.left = null;
                return this;
            }
            else if (current.right) {
                current.key = current.right.key;
                current.value = current.right.value;
                current.right = null;
                return this;
            }
        }
        if (key < current.key) {
            current = current.left;
        }
        else {
            current = current.right;
        }
    }


}

BinarySearchTree.prototype.search = function (key) {

    let root = this._root;
    let current = root;

    if (!root) {
        return null;
    }

    while (current) {
        if (current.key === key) {
            return current.value;
        }
        if (key < current.key) {
            current = current.left;
        }
        else {
            current = current.right;
        }
    }

}

BinarySearchTree.prototype.contains = function (value) {
    let root = this._root;

    if (!root.key) {
        return false;
    }

    function findValue(root, value) {
        if (root.value === value || root.left.value === value || root.right.value === value) {
            return true;
        }

        let isContains = false;

            if (root.left) {
                isContains=findValue(root.left, value);
            }
            if (root.right) {
                isContains = findValue(root.right, value);
            }

            return isContains;
        }
    
    return findValue(root,value);
}
        



BinarySearchTree.prototype.traverse = function (bool) {
    let root = this._root;
    let arr = [];
    //function print(root) {
    //    if (){ }
    //}

}

BinarySearchTree.prototype.verify = function () {

}


module.exports = {
  BinarySearchTree,

  //WARNING!!!
  //PROVIDE BST STRUCTURE FOR TESTS {STRING}
  root: '_root',
  left: 'left',
  right: 'right',
  //NAME FOR REPORTS
  student: 'STUDENT NAME'
};
