(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
})(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }
  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }
  function _iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);
        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var oldArrayProto = Array.prototype;
  var newArrayProto = Object.create(oldArrayProto);
  var methods = ['push', 'pop', 'shift', 'unshift', 'reverse', 'sort', 'splice'];
  methods.forEach(function (method) {
    newArrayProto[method] = function () {
      var _oldArrayProto$method;
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      // 这里重写了数组的方法
      // 内部调用原来的方法
      var result = (_oldArrayProto$method = oldArrayProto[method]).call.apply(_oldArrayProto$method, [this].concat(args));
      console.log('arrayMethos', method);

      // 我们需要对新增的数据再次进行劫持
      var inserted;
      var ob = this.__ob__;
      switch (method) {
        case 'push':
        case 'unshift':
          inserted = args;
          break;
        case 'splice':
          inserted = args.slice(2);
      }
      console.log('数组新增的内容', inserted);
      // 如果数组新增的数据是对象类型，那么就重新进行劫持
      if (inserted) {
        ob.observeArray(inserted);
      }
      ob.dep.notify();
      return result;
    };
  });

  var id$1 = 0;
  var Dep = /*#__PURE__*/function () {
    function Dep() {
      _classCallCheck(this, Dep);
      this.id = id$1++; //属性的dep要收集watcher
      this.subs = []; //这里存放着当前属性对应的watcher有哪些
    }
    _createClass(Dep, [{
      key: "depend",
      value: function depend() {
        // 这里我们不希望放重复的watcher，而且 dep -> watcher只是一个单向的关系
        // 还需要 watcher记录dep addSub()
        // 这里的Dep.target就是当前的watcher
        // this.subs.push(watcher) 放在这里会有重复的问题
        Dep.target.addDep(this);

        // dep和watcher是多对多的关系（一个属性可以在多个组件中使用 dep -> watcher）
        // 一个组件由多个属性组成 （一个watcher对应多个dep）
      }
    }, {
      key: "addSub",
      value: function addSub(watcher) {
        this.subs.push(watcher);
      }
    }, {
      key: "notify",
      value: function notify() {
        this.subs.forEach(function (watcher) {
          return watcher.update();
        });
      }
    }]);
    return Dep;
  }();
  Dep.target = null;

  var Observer = /*#__PURE__*/function () {
    function Observer(data) {
      _classCallCheck(this, Observer);
      // 给每个对象都增加依赖收集功能
      this.dep = new Dep();

      // Object.defineProperty只能劫持已经存在的属性，新增删除的属性并不能劫持到
      // 对此，vue2里面会单独进行处理 $set $delete

      data.__ob__ = this; // 给数据加了一个标识，如果数据上有__ob__，则说明这个属性被观测过
      Object.defineProperty(data, '__ob__', {
        value: this,
        enumerable: false // 将 __ob__ 变成不可枚举（循环的时候无法获取到）
      });

      if (Array.isArray(data)) {
        data.__proto__ = newArrayProto;
        this.observeArray(data); // 如果数组中放的是对象，可以监控到对象的变化
      } else {
        this.walk(data);
      }
    }

    // 循环对象，对属性依此进行劫持
    _createClass(Observer, [{
      key: "walk",
      value: function walk(data) {
        // 重新定义属性
        Object.keys(data).forEach(function (key) {
          return defineReactive(data, key, data[key]);
        });
      }
      // 观测数组
    }, {
      key: "observeArray",
      value: function observeArray(data) {
        data.forEach(function (item) {
          return observe(item);
        });
      }
    }]);
    return Observer;
  }();
  function defineReactive(target, key, value) {
    var childOb = observe(value); // 对所有的对象都进行劫持
    var dep = new Dep(); // 每个属性都有一个dep
    Object.defineProperty(target, key, {
      get: function get() {
        if (Dep.target) {
          dep.depend(); // 让这个属性的收集器记住当前的watcher
          if (childOb) {
            childOb.dep.depend(); // 让数组和对象本身也实现依赖收集
            if (Array.isArray(value)) {
              dependArray(value);
            }
          }
        }
        return value;
      },
      set: function set(newValue) {
        if (newValue === value) return;
        observe(newValue); // 修改的值如果是对象，就重新进行劫持
        value = newValue;
        dep.notify(); //通知更新
      }
    });
  }

  // 对data这个对象进行劫持
  function observe(data) {
    // console.log(data)

    if (_typeof(data) !== 'object' || data === null) {
      return; // 只对对象进行劫持
    }

    if (data.__ob__ instanceof Observer) {
      // 说明这个对象被代理过了
      return data.__ob__;
    }

    // 如果一个对象被劫持过了，那就不需要再被劫持了
    // 要判断一个对象是否被劫持过，可以添加一个实例，用实例来判断是否被劫持欧

    return new Observer(data);
  }

  // 深层次嵌套会触发递归，递归多了性能就会差，不存在的属性监控不到，存在的属性要重写方法
  function dependArray(value) {
    for (var i = 0; i < value.length; i++) {
      var current = value[i];
      current.__ob__ && current.__ob__.dep.depend();
      if (Array.isArray(current)) {
        dependArray(current);
      }
    }
  }

  function initState(vm) {
    var opts = vm.$options;
    if (opts.data) {
      initData(vm);
    }
  }
  function proxy(vm, target, key) {
    Object.defineProperty(vm, key, {
      // vm.name
      get: function get() {
        return vm[target][key]; // vm._data.name
      },
      set: function set(newValue) {
        vm[target][key] = newValue;
      }
    });
  }
  function initData(vm) {
    var data = vm.$options.data;
    data = typeof data === 'function' ? data.call(vm) : data;
    vm._data = data;
    observe(data);

    // 将vm._data用vm来代理，使data中的数据可以直接通过vm.propertyKey访问
    for (var key in data) {
      proxy(vm, '_data', key);
    }
  }

  var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
  var dynamicArgAttribute = /^\s*((?:v-[\w-]+:|@|:|#)\[[^=]+?\][^\s"'<>\/=]*)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
  var ncname = "[a-zA-Z_][\\-\\.0-9_a-zA-Z]*";
  var qnameCapture = "((?:".concat(ncname, "\\:)?").concat(ncname, ")");
  var startTagOpen = new RegExp("^<".concat(qnameCapture));
  var startTagClose = /^\s*(\/?)>/;
  var endTag = new RegExp("^<\\/".concat(qnameCapture, "[^>]*>"));

  // 对模板进行编译处理
  function parseHTML(html) {
    var ELEMENT_TYPE = 1;
    var TEXT_TYPE = 3;
    var stack = []; // 用于存放元素
    var currentParant; // 指向的是栈中的最后一个
    var root;

    // 最终需要转换成一颗抽象语法树
    function createASTElement(tag, attrs) {
      return {
        tag: tag,
        type: ELEMENT_TYPE,
        children: [],
        attrs: attrs,
        parent: null
      };
    }

    // 利用栈型结构来构造一颗树
    function start(tag, attrs) {
      var node = createASTElement(tag, attrs); // 创造一个ast节点
      if (!root) {
        // 看一下是否是空树
        root = node;
      }
      if (currentParant) {
        node.parent = currentParant;
        currentParant.children.push(node);
      }
      stack.push(node);
      currentParant = node; // currentParant为栈中的最后一个
    }

    function chars(text) {
      // 文本直接放到当前指向的节点中
      text = text.replace(/\s/g, ''); // 如果空格超过2，就删除2个以上的
      text && currentParant.children.push({
        type: TEXT_TYPE,
        text: text,
        parent: currentParant
      });
    }
    function end() {
      stack.pop(); // 弹出最后一个，校验标签是否合法
      currentParant = stack.at(-1);
    }
    function advance(n) {
      html = html.substring(n);
    }
    function parseStartTag() {
      var start = html.match(startTagOpen);
      if (start) {
        var match = {
          tagName: start[1],
          // 标签名
          attrs: []
        };
        advance(start[0].length);

        // 如果不是开始标签的结束，就一直匹配下去
        var attr, _end;
        while (!(_end = html.match(startTagClose)) && (attr = html.match(dynamicArgAttribute) || html.match(attribute))) {
          advance(attr[0].length);
          match.attrs.push({
            name: attr[1],
            value: attr[3] || attr[4] || attr[5] || true
          });
        }
        if (_end) {
          advance(_end[0].length);
        }
        return match;
      }
      return false; // 不是开始标签
    }

    while (html) {
      // 如果textEnd为0 说明是一个开始的标签或者结束标签
      // 如果textEnd>0 说明就是文本的结束位置
      var textEnd = html.indexOf('<');
      if (textEnd === 0) {
        var startTagMatch = parseStartTag();
        if (startTagMatch) {
          // 解析到的开始标签
          start(startTagMatch.tagName, startTagMatch.attrs);
          continue;
        }
        var endTagMatch = html.match(endTag);
        if (endTagMatch) {
          advance(endTagMatch[0].length);
          end(endTagMatch[1]);
          continue;
        }
      }
      if (textEnd > 0) {
        var text = html.substring(0, textEnd); // 文本内容
        if (text) {
          chars(text);
          advance(text.length); // 解析到的文本
        }
      }
    }

    return root;
  }

  function genProps(attrs) {
    var str = '';
    for (var i = 0; i < attrs.length; i++) {
      var attr = attrs[i];
      if (attr.name === 'style') {
        (function () {
          attr.value.split(';').forEach(function (item) {
            var _item$split = item.split(':'),
              _item$split2 = _slicedToArray(_item$split, 2);
              _item$split2[0];
              _item$split2[1];
          });
        })();
      }
      str += "".concat(attr.name, ":").concat(JSON.stringify(attr.value), ",");
    }
    return "{".concat(str.slice(0, -1), "}");
  }
  var defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;
  function gen(node) {
    if (node.type === 1) {
      return codegen(node);
    } else {
      var text = node.text;
      if (!defaultTagRE.test(text)) {
        return "_v(".concat(JSON.stringify(text), ")");
      } else {
        var tokens = [];
        var match;
        defaultTagRE.lastIndex = 0;
        var lastIndex = 0;
        while (match = defaultTagRE.exec(text)) {
          var index = match.index; // 匹配的位置 {{  name  }} hello {{  age }}
          if (index > lastIndex) {
            tokens.push(JSON.stringify(text.slice(lastIndex, index)));
          }
          tokens.push("_s(".concat(match[1].trim(), ")"));
          lastIndex = index + match[0].length;
        }
        if (lastIndex < text.length) {
          tokens.push(JSON.stringify(text.slice(lastIndex)));
        }
        return "_v(".concat(tokens.join('+'), ")");
      }
    }
  }
  function genChildren(children) {
    return children.map(function (child) {
      return gen(child);
    }).join(',');
  }
  function codegen(ast) {
    var children = genChildren(ast.children);
    var code = "_c('".concat(ast.tag, "',").concat(ast.attrs.length > 0 ? genProps(ast.attrs) : null).concat(ast.children.length ? ",".concat(children) : '', ")");
    return code;
  }
  function compileToFunction(template) {
    // 1.就是将template转换成ast语法树
    var ast = parseHTML(template);
    // 2.生成render方法（render方法执行后的返回就是虚拟dom）

    // 模板引擎的实现原理 就是 with + new Function

    var code = codegen(ast);
    code = "with(this){return ".concat(code, "}");
    var render = new Function(code);
    return render;
  }

  var id = 0;

  // 一个watcher代表一个视图(组件)
  // 每个属性都有一个dep（属性就是被观察者），watcher就是观察者(属性变化了会通知观察者来更新)
  // 观察者模式
  var Watcher = /*#__PURE__*/function () {
    function Watcher(vm, fn, option) {
      _classCallCheck(this, Watcher);
      this.id = id++;
      this.renderWatcher = option; // 是一个渲染watcher
      this.getter = fn;
      this.deps = []; // 后续我们实现计算属性，和一些清理工作(组件卸载)需要用到
      this.depsId = new Set();
      this.get();
    }
    // 一个组件对应多个属性，重复的不用记录
    _createClass(Watcher, [{
      key: "addDep",
      value: function addDep(dep) {
        var id = dep.id;
        if (!this.depsId.has(id)) {
          this.deps.push(dep);
          this.depsId.add(id);
          dep.addSub(this); // watcher已经记住了dep，而且去重了，此时让dep也记住watcher
        }
      }
    }, {
      key: "get",
      value: function get() {
        Dep.target = this;
        this.getter(); // 会去vm上取值
        Dep.target = null;
      }
    }, {
      key: "update",
      value: function update() {
        queunWatcher(this);
        // this.get()
      }
    }, {
      key: "run",
      value: function run() {
        this.get();
      }
    }]);
    return Watcher;
  }();
  var qunen = [];
  var has = {};
  var pending = false;
  function flushSchedulerQueue() {
    var flushQueue = qunen.slice(0);
    qunen = [];
    has = {};
    pending = false;
    flushQueue.forEach(function (q) {
      return q.run();
    });
  }
  function queunWatcher(watcher) {
    var id = watcher.id;
    if (!has[id]) {
      qunen.push(watcher);
      has[id] = true;
      // 不管update执行多少次，最终只执行一轮刷新操作
      if (!pending) {
        nextTick(flushSchedulerQueue);
        pending = false;
      }
    }
  }
  var callbacks = [];
  var waiting = false;
  function flushCallbacks() {
    var cbs = callbacks.slice(0);
    waiting = false;
    callbacks = [];
    cbs.forEach(function (cb) {
      return cb();
    });
  }

  /**
   * nextTick没有直接使用某个api，而是采用优雅降级的方式
   * 内部先采用promise(ie不兼容)
   * MutationObserver(h5的api)
   * setImmediate(IE专享)
   * setTimeout
   */
  var timerFunc;
  if (Promise) {
    timerFunc = function timerFunc() {
      Promise.resolve().then(flushCallbacks);
    };
  } else if (MutationObserver) {
    var observer = new MutationObserver();
    var textNode = document.createTextNode(1);
    observer.observe(textNode, {
      characterData: true
    });
    timerFunc = function timerFunc() {
      textNode.textContent = 2;
    };
  } else if (setImmediate) {
    timerFunc = function timerFunc() {
      setImmediate(flushCallbacks);
    };
  } else {
    timerFunc = function timerFunc() {
      setTimeout(flushCallbacks);
    };
  }
  function nextTick(cb) {
    callbacks.push(cb); // 放到队列中执行是同步
    if (!waiting) {
      timerFunc(); // 刷新的时候是异步
      waiting = true;
    }
  }

  function createElementVNode(vm, tag) {
    var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    data = data == null ? {} : data;
    var key = data.key;
    if (key) {
      delete data.key;
    }
    for (var _len = arguments.length, children = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
      children[_key - 3] = arguments[_key];
    }
    return vnode(vm, tag, key, data, children);
  }
  function createTextVNode(vm, text) {
    return vnode(vm, undefined, undefined, undefined, undefined, text);
  }

  // ast做的是语法层面的转换，它描述的是语法本身
  // 虚拟DOM，描述的是dom元素，可以增加自定义属性
  function vnode(vm, tag, key, props, children, text) {
    return {
      vm: vm,
      tag: tag,
      key: key,
      props: props,
      children: children,
      text: text
    };
  }

  function createElm(vnode) {
    var tag = vnode.tag,
      data = vnode.data,
      children = vnode.children,
      text = vnode.text;
    if (typeof tag === 'string') {
      // 这里将真实节点和虚拟节点对应起来，后续如果修改属性了，会进行diff对比
      vnode.el = document.createElement(tag);
      patchProps(vnode.el, data);
      children.forEach(function (child) {
        vnode.el.appendChild(createElm(child));
      });
    } else {
      vnode.el = document.createTextNode(text);
    }
    return vnode.el;
  }
  function patchProps(el, props) {
    for (var key in props) {
      if (key === 'style') {
        // style{color: "red"}
        for (var styleName in props.style) {
          el.style[styleName] = props.style[styleName];
        }
      } else {
        el.setAttribute(key, props[key]);
      }
    }
  }
  function patch(oldVNode, vnode) {
    // 初步渲染流程
    var isRealElement = oldVNode.nodeType;
    if (isRealElement) {
      var elm = oldVNode; // 获取真实元素
      var parentElm = elm.parentNode; // 拿到父元素
      var newElm = createElm(vnode);
      parentElm.insertBefore(newElm, elm.nextSibling);
      parentElm.removeChild(elm);
      return newElm;
    }
  }
  function initLifeCycle(Vue) {
    // 将虚拟dom(vnode)转换成真实dom
    Vue.prototype._update = function (vnode) {
      var vm = this;
      var el = this.$el;
      console.log('_update', vnode, el);
      // patch既有初始化的功能，又有更新的功能
      vm.$el = patch(el, vnode);
    };
    Vue.prototype._c = function () {
      return createElementVNode.apply(void 0, [this].concat(Array.prototype.slice.call(arguments)));
    };
    Vue.prototype._v = function () {
      return createTextVNode.apply(void 0, [this].concat(Array.prototype.slice.call(arguments)));
    };
    Vue.prototype._s = function (value) {
      if (_typeof(value) !== 'object') return value;
      return JSON.stringify(value);
    };
    Vue.prototype._render = function () {
      // 当渲染的时候会去实例中取值，我们就可以将属性和视图绑定在一起
      return this.$options.render.call(this); // 通过ast语法转义
    };
  }

  function mountComponent(vm, el) {
    vm.$el = el;
    // 1.调用render方法产生虚拟节点 虚拟DOM
    var updateComponent = function updateComponent() {
      vm._update(vm._render()); // vm.$option.render() 虚拟节点
    };

    var watcher = new Watcher(vm, updateComponent, true); // true用来标识是一个渲染watcher
    console.log(watcher);

    // 2.根据虚拟DOM产生真实DOM

    // 3.插入到el元素中
  }

  function initMixin(Vue) {
    Vue.prototype._init = function (options) {
      var vm = this;
      // vm.$options 就是获取用户的配置
      vm.$options = options; // 将用户的选项挂载到实例上

      initState(vm);
      if (options.el) {
        vm.$mount(options.el);
      }
    };
    Vue.prototype.$mount = function (el) {
      var vm = this;
      el = document.querySelector(el);
      var opts = vm.$options;
      if (!opts.render) {
        // 先进行查找有没有render函数
        var template; // 没有render看一下是否写了template，
        // 没有写模板，但是写了el
        if (!opts.template && el) {
          template = el.outerHTML;
        } else {
          if (el) {
            // 如果有el，就采用模板的内容
            template = opts.template;
          }
        }
        if (template) {
          // 这里需要对模板进行编译
          var render = compileToFunction(template);
          opts.render = render; // jsx最终会被编译成h('xxx')
        }
      }

      mountComponent(vm, el); // 组件的挂载

      // script标签引用的vue.global.js这个编译过程是在浏览器运行的
      // runtime是不包括模板编译的，整个编译是打包的时候通过loader来转移.vue文件的
      // 用runtime的时候不能使用template
    };
  }

  function Vue(options) {
    this._init(options);
  }
  Vue.prototype.$nextTick = nextTick;
  initMixin(Vue);
  initLifeCycle(Vue);

  return Vue;

}));
//# sourceMappingURL=vue.js.map
