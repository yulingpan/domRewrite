window.dom = {
  // 创建结点
  create(string) {
    const container = document.createElement("template");
    container.innerHTML = string.trim();
    return container.content.firstChild;
  },

  // 增加后结点
  after(node, newNode) {
    node.parentNode.insertBefore(newNode, node.nextSibling);
  },

  // 增加前结点
  before(newNode, node) {
    node.parentNode.insertBefore(newNode, node);
  },

  //新增子节点
  append(parent, child) {
    parent.appendChild(child);
  },

  //新增父节点
  wrap(child, parent) {
    dom.before(child, parent);
    dom.append(parent, child);
  },

  //删除节点
  remove(node) {
    node.parentNode.removeChild(node);
    return node;
  },

  //删除节点后代子节点
  empty(node) {
    const array = [];
    let x = node.firstChild;
    while (x) {
      array.push(dom.remove(node.firstChild));
      x = node.firstChild;
    }
    return array;
  },

  //读写元素属性值 (重载)
  attr(node, name, value) {
    if (arguments.length === 3) {
      node.setAttribute(name, value);
    } else if (arguments.length === 2) {
      return node.getAttribute(name);
    }
  },

  // 读写文本内容 (适配)
  text(node, string) {
    if (arguments.length === 2) {
      if ("innerText" in node) {
        //存在innerText属性
        node.innerText = string;
      } else {
        node.textContent = string;
      }
    } else if (arguments.length === 1) {
      if ("innerText" in node) {
        return node.innerText;
      } else {
        return node.textContent;
      }
    }
  },

  //读写HTML内容
  html(node, string) {
    if (arguments.length === 2) {
      node.innerHTML = string;
    } else if (arguments.length === 1) {
      return node.innerHTML;
    }
  },

  //修改style样式
  style(node, name, value) {
    if (arguments.length === 3) {
      // dom.style(node, "color", "red");
      node.style[name] = value;
    } else if (arguments.length === 2) {
      if (typeof name === "string") {
        //dom.style(node, string); 读属性
        return node.style[name];
      } else if (name instanceof Object) {
        //dom.style(node,{property(string):value}); 写属性 [Object的实例化对象]
        const object = name;
        for (let key in object) {
          node.style[key] = object[key];
        }
      }
    }
  },

  //修改class
  class: {
    add(node, className) {
      node.classList.add(className);
    },
    remove(node, className) {
      node.classList.remove(className);
    },
    has(node, className) {
      return node.classList.contains(className);
    },
  },

  // evevt事件处理
  on(node, eventName, fn) {
    node.addEventListener(eventName, fn);
  },
  off(node, eventName, fn) {
    node.removeEventListener(eventName, fn);
  },

  // 查找选择器
  find(selector, scope) {
    return (scope || document).querySelectorAll(selector);
  },

  // 查父节点
  parent(node) {
    return node.parentNode;
  },

  // 查子节点
  children(node) {
    return node.children;
  },

  // 查兄弟姐妹
  siblings(node) {
    return Array.from(node.parentNode.children).filter((n) => n !== node);
  },

  // 查下一个节点
  next(node) {
    let x = node.nextSibling;
    while (x && x.nodeType === 3) {
      x = x.nextSibling;
    }
    return x;
  },

  // 查上一个节点
  previous(node) {
    let x = node.previousSibling;
    while (x && x.nodeType === 3) {
      x = x.previousSibling;
    }
    return x;
  },

  // 遍历节点
  each(nodeList, fn) {
    for (let i = 0; i < nodeList.length; i++) {
      fn.call(null, nodeList[i]);
    }
  },

  // 获取元素的索引号
  index(node) {
    const list = dom.children(node.parentNode);
    let i;
    for (i = 0; i < list.length; i++) {
      if (list[i] === node) {
        break;
      }
    }
    return i;
  },
};
