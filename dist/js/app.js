/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return TOKEN_CACHE_NAME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return TOKEN_EXPIRE_NAME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return API_PERFIX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return LOGIN_PATH; });
var TOKEN_CACHE_NAME = 'jwt_token';
var TOKEN_EXPIRE_NAME = 'jwt_expire_in';
var API_PERFIX = '/api/admin';
var LOGIN_PATH = '/login';

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constant__ = __webpack_require__(1);

function Token() {}
Token.prototype.access_token = null;
Token.prototype.expires_in = 0;
Token.prototype.type = null;
var localStorage = window.localStorage;

var UserApi = {
    getUser: function getUser() {
        return axios.get('/user').then(function (response) {
            return response.data;
        });
    },
    login: function login(credentials) {
        var _this = this;

        return axios.post('/login', credentials).then(function (response) {
            return _this.afterLogin(response.data);
        });
    },
    logout: function logout() {
        return axios.post('/logout').then(function (response) {
            return response.data;
        });
    },
    afterLogin: function afterLogin(token) {
        localStorage.setItem(__WEBPACK_IMPORTED_MODULE_0__constant__["c" /* TOKEN_CACHE_NAME */], token.access_token);
        if (token.expires_in > 0) {
            localStorage.setItem(__WEBPACK_IMPORTED_MODULE_0__constant__["d" /* TOKEN_EXPIRE_NAME */], new Date().getTime() + token.expires_in * 1000 - 5000);
        }
        return token;
    },
    refresh: function refresh() {
        var _this2 = this;

        return axios.post('/refresh').then(function (response) {
            return _this2.afterLogin(response.data);
        });
    },
    readyToRefresh: function readyToRefresh(ttl, cb) {
        var _this3 = this;

        setTimeout(function () {
            typeof cb === 'function' || (cb = function cb(token) {
                return token;
            });
            _this3.refresh().then(cb);
        }, ttl);
    }
};
/* harmony default export */ __webpack_exports__["a"] = (UserApi);

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return routes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return router; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constant__ = __webpack_require__(1);

var routes = [{
    path: '/dashboard',
    component: __webpack_require__(12),
    meta: {
        title: 'Dashboard'
    }
}, {
    path: __WEBPACK_IMPORTED_MODULE_0__constant__["b" /* LOGIN_PATH */],
    component: __webpack_require__(17),
    meta: {
        title: 'Login'
    }
}];

var router = new VueRouter({
    routes: routes
});



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_user__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_toast__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_navigation__ = __webpack_require__(10);




var debug = "development" !== 'production';

/* harmony default export */ __webpack_exports__["a"] = (new Vuex.Store({
    modules: {
        user: __WEBPACK_IMPORTED_MODULE_0__modules_user__["a" /* default */],
        navigation: __WEBPACK_IMPORTED_MODULE_2__modules_navigation__["a" /* default */],
        toast: __WEBPACK_IMPORTED_MODULE_1__modules_toast__["a" /* default */]
    },
    strict: debug
}));

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(14)
/* template */
var __vue_template__ = __webpack_require__(15)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/components/layouts/TopBar.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5b562cf4", Component.options)
  } else {
    hotAPI.reload("data-v-5b562cf4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(7);
module.exports = __webpack_require__(29);


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__store__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__router__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__interceptor__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_Toast_vue__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_Toast_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__components_Toast_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_layouts_TopBar_vue__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_layouts_TopBar_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__components_layouts_TopBar_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_layouts_Navigation_vue__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_layouts_Navigation_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__components_layouts_Navigation_vue__);







__webpack_require__(28);
__WEBPACK_IMPORTED_MODULE_1__router__["a" /* router */].beforeEach(__WEBPACK_IMPORTED_MODULE_2__interceptor__["a" /* default */]);

new Vue({
    store: __WEBPACK_IMPORTED_MODULE_0__store__["a" /* default */],
    router: __WEBPACK_IMPORTED_MODULE_1__router__["a" /* router */],
    computed: {
        isLogin: function isLogin() {
            return this.$route.path === '/login';
        }
    },
    components: { Toast: __WEBPACK_IMPORTED_MODULE_3__components_Toast_vue___default.a, TopBar: __WEBPACK_IMPORTED_MODULE_4__components_layouts_TopBar_vue___default.a, Navigation: __WEBPACK_IMPORTED_MODULE_5__components_layouts_Navigation_vue___default.a },
    el: '#app'
});

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__apis_UserApi__ = __webpack_require__(2);

var state = {
    user: {}
};

var getters = {
    user: function user(state) {
        return state.user;
    }
};

var actions = {
    loadUser: function loadUser(_ref) {
        var commit = _ref.commit;

        __WEBPACK_IMPORTED_MODULE_0__apis_UserApi__["a" /* default */].getUser().then(function (user) {
            commit('setUser', { user: user });
        });
    }
};

var mutations = {
    setUser: function setUser(state, _ref2) {
        var user = _ref2.user;

        state.user = user;
    }
};

/* harmony default export */ __webpack_exports__["a"] = ({
    state: state,
    getters: getters,
    actions: actions,
    mutations: mutations
});

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var state = {
    toast: {
        active: false
    }
};

var getters = {
    toast: function toast(state) {
        return state.toast;
    }
};

var actions = {
    toast: function toast(_ref) {
        var commit = _ref.commit;
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var _options$active = options.active,
            active = _options$active === undefined ? true : _options$active,
            _options$y = options.y,
            y = _options$y === undefined ? 'top' : _options$y,
            _options$x = options.x,
            x = _options$x === undefined ? null : _options$x,
            _options$mode = options.mode,
            mode = _options$mode === undefined ? '' : _options$mode,
            _options$timeout = options.timeout,
            timeout = _options$timeout === undefined ? 3000 : _options$timeout,
            _options$color = options.color,
            color = _options$color === undefined ? 'normal' : _options$color,
            text = options.text;

        return commit('changeToast', {
            active: active,
            color: color,
            y: y,
            x: x,
            mode: mode,
            timeout: timeout,
            text: text
        });
    }
};

var mutations = {
    changeToast: function changeToast(state, options) {
        state.toast = options;
    }
};

/* harmony default export */ __webpack_exports__["a"] = ({
    state: state,
    getters: getters,
    actions: actions,
    mutations: mutations
});

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__apis_HomeApi__ = __webpack_require__(11);


var state = {
    navigation: {
        mini: false,
        items: []
    }
};

var getters = {
    navigation: function navigation(state) {
        return state.navigation;
    }
};

var actions = {
    loadNavigation: function loadNavigation(_ref) {
        var commit = _ref.commit;

        return __WEBPACK_IMPORTED_MODULE_0__apis_HomeApi__["a" /* default */].getNavigation().then(function (items) {
            return commit('changeNavigation', {
                items: items
            });
        });
    }
};

var mutations = {
    changeNavigation: function changeNavigation(state, _ref2) {
        var _ref2$items = _ref2.items,
            items = _ref2$items === undefined ? [] : _ref2$items;

        state.navigation.items = items;
    },
    miniNavigation: function miniNavigation(state, _ref3) {
        var _ref3$mini = _ref3.mini,
            mini = _ref3$mini === undefined ? true : _ref3$mini;

        state.navigation.mini = mini;
    }
};

/* harmony default export */ __webpack_exports__["a"] = ({
    state: state,
    getters: getters,
    actions: actions,
    mutations: mutations
});

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var HomeApi = {
    getNavigation: function getNavigation() {
        return axios.get('/navigation').then(function (response) {
            return response.data;
        });
    },
    stats: function stats() {
        return axios.get('/home/stats').then(function (response) {
            return response.data;
        });
    }
};

/* harmony default export */ __webpack_exports__["a"] = (HomeApi);

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(13)
/* template */
var __vue_template__ = __webpack_require__(16)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/pages/Dashboard.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1d81e2c0", Component.options)
  } else {
    hotAPI.reload("data-v-1d81e2c0", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_layouts_TopBar_vue__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_layouts_TopBar_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_layouts_TopBar_vue__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        return {};
    },

    components: { TopBar: __WEBPACK_IMPORTED_MODULE_0__components_layouts_TopBar_vue___default.a },
    methods: {},
    mounted: function mounted() {},
    created: function created() {}
});

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__apis_UserApi__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constant__ = __webpack_require__(1);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var mapGetters = Vuex.mapGetters;




/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        return {
            mini: false
        };
    },

    computed: _extends({}, mapGetters({
        user: 'user'
    })),
    components: {},
    methods: {
        mimiNav: function mimiNav() {},
        logout: function logout() {
            var _this = this;

            __WEBPACK_IMPORTED_MODULE_0__apis_UserApi__["a" /* default */].logout().then(function (res) {
                _this.$router.push(__WEBPACK_IMPORTED_MODULE_1__constant__["b" /* LOGIN_PATH */]);
            });
        }
    },
    mounted: function mounted() {
        this.$store.dispatch('loadUser');
    },
    created: function created() {},

    watch: {
        mini: function mini(now) {
            this.$store.commit('miniNavigation', { mini: now });
        }
    }
});

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-toolbar",
    { attrs: { app: "", dark: "", color: "primary" } },
    [
      _c("v-toolbar-side-icon", {
        on: {
          click: function($event) {
            _vm.mini = !_vm.mini
          }
        }
      }),
      _vm._v(" "),
      _c("v-toolbar-title", { staticClass: "white--text" }, [
        _vm._v(_vm._s(_vm.user.name))
      ]),
      _vm._v(" "),
      _c("v-spacer"),
      _vm._v(" "),
      _c("v-avatar", { staticClass: "grey lighten-4" }, [
        _c("img", { attrs: { src: _vm.user.avatar, alt: "avatar" } })
      ]),
      _vm._v(" "),
      _c(
        "v-menu",
        { attrs: { bottom: "", left: "" } },
        [
          _c(
            "v-btn",
            {
              attrs: { slot: "activator", icon: "", dark: "" },
              slot: "activator"
            },
            [_c("v-icon", [_vm._v("more_vert")])],
            1
          ),
          _vm._v(" "),
          _c(
            "v-list",
            [
              _c(
                "v-list-tile",
                { attrs: { ripple: "" }, on: { click: _vm.logout } },
                [_c("v-list-tile-title", [_vm._v("登出")])],
                1
              )
            ],
            1
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-5b562cf4", module.exports)
  }
}

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-layout",
    [
      _c(
        "v-flex",
        {
          staticStyle: { "margin-top": "50px" },
          attrs: { xs12: "", md4: "", "offset-md4": "" }
        },
        [
          _c(
            "v-card",
            [
              _c(
                "v-toolbar",
                { attrs: { dark: "", color: "primary", flat: "" } },
                [
                  _c("v-toolbar-title", { staticClass: "white--text" }, [
                    _vm._v("Hello")
                  ])
                ],
                1
              ),
              _vm._v(" "),
              _vm.requesting
                ? _c("v-progress-linear", {
                    staticStyle: { margin: "0" },
                    attrs: { indeterminate: true, color: "green" }
                  })
                : _vm._e(),
              _vm._v(" "),
              _c("v-card-text")
            ],
            1
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-1d81e2c0", module.exports)
  }
}

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(18)
/* template */
var __vue_template__ = __webpack_require__(19)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/pages/login/Index.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-c81ec490", Component.options)
  } else {
    hotAPI.reload("data-v-c81ec490", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__apis_UserApi__ = __webpack_require__(2);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        return {
            showPass: false,
            requesting: false,
            post: {}
        };
    },

    components: {},
    methods: {
        login: function login() {
            var _this = this;

            this.requesting = true;
            __WEBPACK_IMPORTED_MODULE_0__apis_UserApi__["a" /* default */].login(this.post).then(function (re) {
                _this.requesting = false;
                _this.$router.push('/dashboard');
            });
        }
    },
    mounted: function mounted() {},
    created: function created() {}
});

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-layout",
    [
      _c(
        "v-flex",
        {
          staticStyle: { "margin-top": "50px" },
          attrs: { xs12: "", md4: "", "offset-md4": "" }
        },
        [
          _c(
            "v-card",
            [
              _c(
                "v-toolbar",
                { attrs: { dark: "", color: "primary", flat: "" } },
                [
                  _c("v-toolbar-title", { staticClass: "white--text" }, [
                    _vm._v("Login")
                  ])
                ],
                1
              ),
              _vm._v(" "),
              _vm.requesting
                ? _c("v-progress-linear", {
                    staticStyle: { margin: "0" },
                    attrs: { indeterminate: true, color: "green" }
                  })
                : _vm._e(),
              _vm._v(" "),
              _c(
                "v-card-text",
                [
                  _c(
                    "v-form",
                    {
                      model: {
                        value: _vm.valid,
                        callback: function($$v) {
                          _vm.valid = $$v
                        },
                        expression: "valid"
                      }
                    },
                    [
                      _c("v-text-field", {
                        attrs: { label: "E-mail", required: "" },
                        model: {
                          value: _vm.post.email,
                          callback: function($$v) {
                            _vm.$set(_vm.post, "email", $$v)
                          },
                          expression: "post.email"
                        }
                      }),
                      _vm._v(" "),
                      _c("v-text-field", {
                        attrs: {
                          label: "密码",
                          "append-icon": _vm.showPass
                            ? "visibility"
                            : "visibility_off",
                          "append-icon-cb": function() {
                            return (_vm.showPass = !_vm.showPass)
                          },
                          type: _vm.showPass ? "text" : "password",
                          counter: ""
                        },
                        model: {
                          value: _vm.post.password,
                          callback: function($$v) {
                            _vm.$set(_vm.post, "password", $$v)
                          },
                          expression: "post.password"
                        }
                      })
                    ],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-card-actions",
                [
                  _c(
                    "v-btn",
                    { attrs: { color: "primary" }, on: { click: _vm.login } },
                    [_vm._v("登陆")]
                  )
                ],
                1
              )
            ],
            1
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-c81ec490", module.exports)
  }
}

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_utils__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__router__ = __webpack_require__(3);



var flattened = Object(__WEBPACK_IMPORTED_MODULE_0__app_utils__["a" /* flattenNode */])(__WEBPACK_IMPORTED_MODULE_1__router__["b" /* routes */], 'children');

/* harmony default export */ __webpack_exports__["a"] = (function (to, from, next) {
    setTitle(to);
    next();
});

function setTitle(route) {
    var title = route.meta.title;
    if (title) {
        document.title = title;
    }
}

function findRoute(route) {
    return _.head(flattened.filter(function (f) {
        return f.path === route.path;
    }));
}

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export throttle */
/* unused harmony export setQuery */
/* unused harmony export parseUrl */
/* unused harmony export httpQueryString */
/* unused harmony export randomString */
/* unused harmony export htmlencode */
/* harmony export (immutable) */ __webpack_exports__["a"] = flattenNode;
var timer = null;
var flattened = [];

function throttle(callback, threshold) {
    clearTimeout(timer);
    timer = setTimeout(function () {
        typeof callback === 'function' && callback();
    }, threshold);
}

/**
 *
 * @param {String} url
 * @param {Object} query
 * @returns {string}
 */
function setQuery(url, query) {
    var obj = parseUrl(url);
    var q = obj.query;

    for (var i in query) {
        var item = query[i];
        if (_.isString(item)) {
            item.length > 0 && (q[i] = item);
        } else {
            q[i] = item;
        }
    }

    var queryString = httpQueryString(q);

    if (queryString.length < 1) {
        return obj.path;
    }

    return obj.path + '?' + queryString;
}

/**
 *
 * @param {String} url
 * @returns {Object}
 */
function parseUrl(url) {
    var part = url.split('?', 2);
    if (part.length < 2) {
        return {
            path: part[0],
            queryString: '',
            query: {}
        };
    }
    var qs = part[1].split('&');
    var query = {};
    qs.forEach(function (item) {
        var p = item.split('=');
        if (p.length > 1) {
            var key = p[0];
            var value = p[1];
            if (key.indexOf('[]') > 0) {
                var fixedKey = key.replace('[]', '');
                if (query[fixedKey]) {
                    query[fixedKey].push(value);
                } else {
                    query[fixedKey] = [value];
                }
            } else {
                query[key] = value;
            }
        }
    });

    return {
        path: part[0],
        queryString: part[1],
        query: query
    };
}

/**
 *
 * @param {Object} query
 * @returns {string}
 */
function httpQueryString(query) {
    var qsArray = [];
    _.forEach(query, function (v, k) {
        if (_.isArray(v)) {
            v.forEach(function (value) {
                qsArray.push(k + '[]=' + value);
            });
        } else {
            qsArray.push(k + '=' + v);
        }
    });

    return qsArray.join('&');
}

function randomString(length, pool) {
    length = length || 16;
    pool = pool || 'qwertyuiopasdfghjklzxcvbnm1234567890QWERTYUIOPASDFGHJKLZXCVBNM';
    return new Chance().string({ length: length, pool: pool });
}

/**
 *
 * @param {string} s
 * @returns {string}
 */
function htmlencode(s) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(s));
    return div.innerHTML;
}
function flattenNode(input, nodeKey) {
    nodeKey = nodeKey || 'node';

    var $clone = _.clone(input);

    $clone.forEach(function (item) {
        if (item.hasOwnProperty(nodeKey)) {
            var nodes = item[nodeKey];
            delete item[nodeKey];
            flattened.push(item);
            flattened.concat(flattenNode(nodes, nodeKey));
        } else {
            flattened.push(item);
        }
    });

    return flattened;
}

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(23)
/* template */
var __vue_template__ = __webpack_require__(24)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/components/Toast.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0321d2b2", Component.options)
  } else {
    hotAPI.reload("data-v-0321d2b2", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var mapGetters = Vuex.mapGetters;
/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        return {
            snackbar: false
        };
    },

    computed: _extends({}, mapGetters({
        toast: 'toast'
    })),
    components: {},
    methods: {},
    mounted: function mounted() {
        this.snackbar = this.toast.active;
    },
    created: function created() {},

    watch: {
        toast: function toast(now) {
            this.snackbar = now.active;
        }
    }
});

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-snackbar",
    {
      attrs: {
        timeout: _vm.toast.timeout,
        top: _vm.toast.y === "top",
        bottom: _vm.toast.y === "bottom",
        right: _vm.toast.x === "right",
        left: _vm.toast.x === "left",
        "multi-line": _vm.toast.mode === "multi-line",
        vertical: _vm.toast.mode === "vertical",
        color: _vm.toast.color
      },
      model: {
        value: _vm.snackbar,
        callback: function($$v) {
          _vm.snackbar = $$v
        },
        expression: "snackbar"
      }
    },
    [
      _vm._v("\n    " + _vm._s(_vm.toast.text) + "\n    "),
      _c(
        "v-btn",
        {
          attrs: { flat: "", color: "pink" },
          nativeOn: {
            click: function($event) {
              _vm.snackbar = false
            }
          }
        },
        [_vm._v("关闭")]
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-0321d2b2", module.exports)
  }
}

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(26)
/* template */
var __vue_template__ = __webpack_require__(27)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/components/layouts/Navigation.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4fd9968a", Component.options)
  } else {
    hotAPI.reload("data-v-4fd9968a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var mapGetters = Vuex.mapGetters;
/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        return {
            active: false
        };
    },

    computed: _extends({
        items: function items() {
            return this.nav.items;
        },

        open: {
            get: function get() {
                return !this.nav.mini;
            },
            set: function set(open) {
                this.$store.commit('miniNavigation', { mini: !open });
            }
        }
    }, mapGetters({
        nav: 'navigation'
    })),
    components: {},
    methods: {
        navigate: function navigate(item) {
            this.active = item.name;
        },
        hasNode: function hasNode(item) {
            return this.getNode(item).length > 0;
        },
        getNode: function getNode(item) {
            return item.nodes ? item.nodes : [];
        }
    },
    mounted: function mounted() {
        this.$store.dispatch('loadNavigation');
    },
    created: function created() {}
});

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-navigation-drawer",
    {
      attrs: { fixed: "", app: "", light: "" },
      model: {
        value: _vm.open,
        callback: function($$v) {
          _vm.open = $$v
        },
        expression: "open"
      }
    },
    [
      _c(
        "v-toolbar",
        { attrs: { flat: "" } },
        [
          _c(
            "v-list",
            [
              _c(
                "v-list-tile",
                [
                  _c("v-list-tile-title", { staticClass: "title" }, [
                    _c("strong", [_vm._v("Fans")]),
                    !_vm.nav.mini ? _c("span", [_vm._v("admin")]) : _vm._e()
                  ])
                ],
                1
              )
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c("v-divider"),
      _vm._v(" "),
      _c(
        "v-list",
        [
          _vm._l(_vm.items, function(item) {
            return [
              _vm.hasNode(item)
                ? _c(
                    "v-list-group",
                    { attrs: { group: item.name } },
                    [
                      _c(
                        "v-list-tile",
                        { attrs: { slot: "item", ripple: "" }, slot: "item" },
                        [
                          _c(
                            "v-list-tile-action",
                            [_c("v-icon", [_vm._v(_vm._s(item.icon))])],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "v-list-tile-content",
                            [
                              _c("v-list-tile-title", [
                                _vm._v(_vm._s(item.display_name))
                              ])
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "v-list-tile-action",
                            [_c("v-icon", [_vm._v("keyboard_arrow_down")])],
                            1
                          )
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _vm._l(item.nodes, function(node) {
                        return _c(
                          "v-list-tile",
                          {
                            key: node.name,
                            attrs: { to: node.path, ripple: "" },
                            on: {
                              click: function($event) {
                                _vm.navigate(node)
                              }
                            },
                            model: {
                              value: _vm.active === item.name,
                              callback: function($$v) {
                                _vm.$set(_vm.active === item, "name", $$v)
                              },
                              expression: "active === item.name"
                            }
                          },
                          [
                            _c(
                              "v-list-tile-content",
                              [
                                _c("v-list-tile-title", [
                                  _vm._v(_vm._s(node.display_name))
                                ])
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _c(
                              "v-list-tile-action",
                              [_c("v-icon", [_vm._v(_vm._s(node.icon))])],
                              1
                            )
                          ],
                          1
                        )
                      })
                    ],
                    2
                  )
                : _c(
                    "v-list-tile",
                    {
                      key: item.name,
                      attrs: { to: item.path, ripple: "" },
                      on: {
                        click: function($event) {
                          _vm.navigate(item)
                        }
                      },
                      model: {
                        value: _vm.active === item.name,
                        callback: function($$v) {
                          _vm.$set(_vm.active === item, "name", $$v)
                        },
                        expression: "active === item.name"
                      }
                    },
                    [
                      _c(
                        "v-list-tile-action",
                        [_c("v-icon", [_vm._v(_vm._s(item.icon))])],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "v-list-tile-content",
                        [
                          _c("v-list-tile-title", [
                            _vm._v(_vm._s(item.display_name))
                          ])
                        ],
                        1
                      )
                    ],
                    1
                  )
            ]
          })
        ],
        2
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-4fd9968a", module.exports)
  }
}

/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__store__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constant__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__router__ = __webpack_require__(3);




axios.interceptors.request.use(function (config) {
    config.url = __WEBPACK_IMPORTED_MODULE_1__constant__["a" /* API_PERFIX */] + config.url;
    var jwt = localStorage.getItem(__WEBPACK_IMPORTED_MODULE_1__constant__["c" /* TOKEN_CACHE_NAME */]);
    if (jwt) {
        config.headers.common['Authorization'] = 'Bearer ' + jwt;
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {

    if (error.response.status === 401) {
        __WEBPACK_IMPORTED_MODULE_2__router__["a" /* router */].push(__WEBPACK_IMPORTED_MODULE_1__constant__["b" /* LOGIN_PATH */]);
    } else {
        __WEBPACK_IMPORTED_MODULE_0__store__["a" /* default */].dispatch('toast', {
            color: 'error',
            text: error.response.data.message
        });
    }

    return Promise.reject(error);
});

/***/ }),
/* 29 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);