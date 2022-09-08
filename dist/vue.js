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

      console.log('arrayMethos', method); // 我们需要对新增的数据再次进行劫持

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

      console.log('数组新增的内容', inserted); // 如果数组新增的数据是对象类型，那么就重新进行劫持

      if (inserted) {
        ob.observeArray(inserted);
      }

      return result;
    };
  });

  var Observer = /*#__PURE__*/function () {
    function Observer(data) {
      _classCallCheck(this, Observer);

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
    } // 循环对象，对属性依此进行劫持


    _createClass(Observer, [{
      key: "walk",
      value: function walk(data) {
        // 重新定义属性
        Object.keys(data).forEach(function (key) {
          return defineReactive(data, key, data[key]);
        });
      } // 观测数组

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
    observe(value); // 对所有的对象都进行劫持

    Object.defineProperty(target, key, {
      get: function get() {
        console.log('key', key);
        return value;
      },
      set: function set(newValue) {
        if (newValue === value) return;
        observe(newValue); // 修改的值如果是对象，就重新进行劫持

        value = newValue;
      }
    });
  } // 对data这个对象进行劫持

  function observe(data) {
    // console.log(data)
    if (_typeof(data) !== 'object' || data === null) {
      return; // 只对对象进行劫持
    }

    if (data.__ob__ instanceof Observer) {
      // 说明这个对象被代理过了
      return data.__ob__;
    } // 如果一个对象被劫持过了，那就不需要再被劫持了
    // 要判断一个对象是否被劫持过，可以添加一个实例，用实例来判断是否被劫持欧


    return new Observer(data);
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
    observe(data); // 将vm._data用vm来代理，使data中的数据可以直接通过vm.propertyKey访问

    for (var key in data) {
      proxy(vm, '_data', key);
    }
  }

  var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
  var ncname = "[a-zA-Z_][\\-\\.0-9_a-zA-Z]*";
  var qnameCapture = "((?:".concat(ncname, "\\:)?").concat(ncname, ")");
  var startTagOpen = new RegExp("^<".concat(qnameCapture));
  var startTagClose = /^\s*(\/?)>/;

  function parseHTML(html) {
    function advance(n) {
      html = html.substring(n);
    }

    function parseStartTag() {
      var start = html.match(startTagOpen);

      if (start) {
        ({
          tagName: start[1],
          // 标签名
          attrs: []
        });
        advance(start[0].length); // console.log(match)
      } // 如果不是开始标签的结束，就一直匹配下去


      var attr;

      while (!html.match(startTagClose) && (attr = html.match(attribute))) {
        advance(attr[0].length);
      }

      console.log(html);
      return false; // 不是开始标签
      // console.log(start);
    }

    while (html) {
      var textEnd = html.indexOf('<');

      if (textEnd === 0) {
        parseStartTag();
        break;
      }
    }
  }

  function compileToFunction(template) {
    // 1.就是将template转换成ast语法树
    // 2.生成render方法（render方法执行后的返回就是虚拟dom）
    // console.log(template)
    parseHTML(template);
  }

  function initMixin(Vue) {
    Vue.prototype._init = function (options) {
      var vm = this; // vm.$options 就是获取用户的配置

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

        console.log(template);
      }

      opts.render; // script标签引用的vue.global.js这个编译过程是在浏览器运行的
      // runtime是不包括模板编译的，整个编译是打包的时候通过loader来转移.vue文件的
      // 用runtime的时候不能使用template
    };
  }

  function Vue(options) {
    this._init(options);
  }

  initMixin(Vue);

  return Vue;

}));
//# sourceMappingURL=vue.js.map
