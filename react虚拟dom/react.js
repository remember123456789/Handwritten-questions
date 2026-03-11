//react.createElement ->虚拟dom
const React = {
  createElement(type, props, ...children) {
    return {
      type,
      props: {
        ...props,
        children: children.map((child) => {
          if (typeof child === "object") {
            return React.createElement(
              child.type,
              child.props,
              ...child.props.children
            );
          } else {
            return React.createTextElement(child);
          }
          // return React.createTextElement(child)
        }),
      },
    };
  },

  //创建文本节点
  createTextElement(text) {
    return {
      type: "TEXT_ELEMENT",
      props: {
        nodeValue: text,
        children: [],
      },
    };
  },
};

const vdom = React.createElement(
  "div",
  { id: "app" },
  React.createElement("h1", null, "hello world")
);
console.log(vdom);
//虚拟dom 转 fiber 节点
// 每个节点都有一个 fiber 节点
// 每个 fiber 节点都有一个虚拟 dom 节点
//fiber 目标  把大块工作拆成小片，利用浏览器空闲时间执行，紧急任务来了能暂停。

function createDom(fiber) {
  const dom =
    fiber.type === "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(fiber.type);
  //挂载属性
  updateDom(dom, {}, fiber.props); // 挂载新属性
  return dom;
}

//1.时间切片
/** 下一个工作单元*/
let nextUnitOfWork = null;
/** 当前正在工作的fiber树*/
let wipRoot = null;
/** 旧的fiber树*/
let currentRoot = null;
/** 存储需要删除的fiber节点 deletions[D] {A,B,C,D} {A,B,C}*/
let deletions = [];
//渲染 虚拟dom 到 真实dom
/**
 * 渲染 虚拟dom 到 真实dom
 * @param {*} element 虚拟dom
 * @param {*} container 真实dom容器
 */
function render(element, container) {
  //初始化fiber
  wipRoot = {
    dom: container,
    props: {
      children: [element],
    },
    alternate: currentRoot, // 旧的fiber树
  };
  deletions = []; //存储需要删除的fiber节点
  nextUnitOfWork = wipRoot; //下一个工作单元
}

function workLoop(deadline) {
  let shouldYild = false;
  while (!shouldYild && nextUnitOfWork) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork); //执行当前工作单元
    shouldYild = deadline.timeRemaining() < 1; // 浏览器是否还有空闲时间
  }
  //所有工作单元执行完成 返回null  并且还有待提交
  if (!nextUnitOfWork && wipRoot) {
    commitRoot();
  }

  //kon  浏览器空闲时执行下一个工作单元
  requestIdleCallback(workLoop);
}

function updateDom(dom, prevProps, nextProps) {
  Object.keys(prevProps)
    .filter((name) => name !== "children")
    .forEach((name) => {
      dom[name] = "";
    });

  Object.keys(nextProps)
    .filter((name) => name !== "children")
    .forEach((name) => {
      dom[name] = nextProps[name];
    });
}

// 执行当前工作单元
// 形成fiber树
function performUnitOfWork(fiber) {
  // 1. 渲染当前节点
  // 2. 返回下一个工作单元
  // 创建虚拟dom  然后形成链表结构
  if (fiber.dom) {
    fiber.dom = createDom(fiber);
  }
  //子节点
  const elements = fiber.props.children;
  //遍历子节点
  reconcileChildren(fiber, elements);

  //返回下一个工作单元
  if (fiber.child) {
    return fiber.child;
  }

  // 遍历兄弟节点
  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) {
      // 有兄弟节点  返回兄弟节点
      return nextFiber.sibling;
    }
    // 没有兄弟节点  返回父节点
    nextFiber = nextFiber.parent;
  }
  // 没有父节点  返回null
  return null;
}
function createFiber(element, parent) {
  return {
    type: element.type,
    props: element.props,
    parent,
    dom: null,
    effectTag: "PLACEMENT",
  };
}

function reconcileChildren(fiber, elements) {
  //diff 算法
  //形成fiber树
  let index = 0;
  let preveSibling = null;
  let oldFiber = fiber.alternate && fiber.alternate.child;
  while (index < elements.length) {
    const element = elements[index];
    //diff
    //1.复用 相同情况
    let newFiber = null;
    const sameType = oldFiber && oldFiber.type === element.type;
    if (sameType) {
      //fiber对象
      newFiber = {
        type: element.type,
        props: element.props,
        parent: fiber,
        dom: oldFiber.dom,
        effectTag: "UPDATE",
      };
    }
    //2. 新增 不同情况
    if (element && !sameType) {
      newFiber = createFiber(element, fiber);
      newFiber.effectTag = "PLACEMENT"; //新增
    }
    //3 删除 不同情况
    if (oldFiber && !sameType) {
      oldFiber.effectTag = "DELETION"; //删除
      deletions.push(oldFiber);
    }

    if (index === 0) {
      fiber.child = newFiber;
    } else if (element) {
      //有兄弟节点相邻节点
      preveSibling.sibling = newFiber;
    }
    preveSibling = newFiber;
  }
  //diff 算法
}

function commitRoot() {
  //删除节点
  deletions.forEach(commitWork);
  commitWork(wipRoot.child);
  currentRoot = wipRoot;
  wipRoot = null;
  //commitWork(wipRoot);
}

function commitWork(fiber) {
  if (!fiber) return;

  const domParent = fiber.parent.dom;
  if (fiber.effectTag === "PLACEMENT") {
    domParent.appendChild(fiber.dom);
  } else if (fiber.effectTag === "UPDATE") {
    updateDom(fiber.dom, fiber.alternate.props, fiber.props);
    fiber.effectTag = "UPDATE";
  } else if (fiber.effectTag === "DELETION") {
    domParent.removeChild(fiber.dom);
  }
  //递归子节点  深度优先遍历
  commitWork(fiber.child);
  commitWork(fiber.sibling);
}

render(vdom, document.getElementById("root"));
