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
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constant__ = __webpack_require__(2);

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
/* 2 */
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
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return routes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return router; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constant__ = __webpack_require__(2);

var routes = [{
    path: '/dashboard',
    component: __webpack_require__(14),
    meta: {
        title: 'Dashboard'
    }
}, {
    path: '/users',
    component: __webpack_require__(19),
    meta: {
        title: 'Accounts'
    }
}, {
    path: __WEBPACK_IMPORTED_MODULE_0__constant__["b" /* LOGIN_PATH */],
    component: __webpack_require__(26),
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_user__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_toast__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_navigation__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_theme__ = __webpack_require__(13);





var debug = "development" !== 'production';

/* harmony default export */ __webpack_exports__["a"] = (new Vuex.Store({
    modules: {
        user: __WEBPACK_IMPORTED_MODULE_0__modules_user__["a" /* default */],
        navigation: __WEBPACK_IMPORTED_MODULE_2__modules_navigation__["a" /* default */],
        theme: __WEBPACK_IMPORTED_MODULE_3__modules_theme__["a" /* default */],
        toast: __WEBPACK_IMPORTED_MODULE_1__modules_toast__["a" /* default */]
    },
    strict: debug
}));

/***/ }),
/* 5 */
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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(16)
/* template */
var __vue_template__ = __webpack_require__(17)
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
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var mapGetters = Vuex.mapGetters;

/* harmony default export */ __webpack_exports__["a"] = ({
    computed: _extends({}, mapGetters({
        theme: 'theme'
    }))
});

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(9);
module.exports = __webpack_require__(41);


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__store__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__router__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__interceptor__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_Toast_vue__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_Toast_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__components_Toast_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_layouts_TopBar_vue__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_layouts_TopBar_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__components_layouts_TopBar_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_layouts_Navigation_vue__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_layouts_Navigation_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__components_layouts_Navigation_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_layouts_Footer_vue__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_layouts_Footer_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__components_layouts_Footer_vue__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };









__webpack_require__(40);
__WEBPACK_IMPORTED_MODULE_1__router__["a" /* router */].beforeEach(__WEBPACK_IMPORTED_MODULE_2__interceptor__["a" /* default */]);
var mapGetters = Vuex.mapGetters;
new Vue({
    store: __WEBPACK_IMPORTED_MODULE_0__store__["a" /* default */],
    router: __WEBPACK_IMPORTED_MODULE_1__router__["a" /* router */],
    computed: _extends({
        isLogin: function isLogin() {
            return this.$route.path === '/login';
        }
    }, mapGetters({
        theme: 'theme'
    })),
    components: { Toast: __WEBPACK_IMPORTED_MODULE_3__components_Toast_vue___default.a, TopBar: __WEBPACK_IMPORTED_MODULE_4__components_layouts_TopBar_vue___default.a, Navigation: __WEBPACK_IMPORTED_MODULE_5__components_layouts_Navigation_vue___default.a, Mfooter: __WEBPACK_IMPORTED_MODULE_6__components_layouts_Footer_vue___default.a },
    el: '#app'
});

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__apis_UserApi__ = __webpack_require__(1);

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
/* 11 */
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
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__apis_HomeApi__ = __webpack_require__(5);


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
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__apis_UserApi__ = __webpack_require__(1);

var state = {
    theme: {
        color: 'white',
        dark: false
    }
};

var getters = {
    theme: function theme(state) {
        return state.theme;
    }
};

var actions = {};

var mutations = {
    changeTheme: function changeTheme(state, _ref) {
        var _ref$color = _ref.color,
            color = _ref$color === undefined ? dark ? 'dark' : 'white' : _ref$color,
            _ref$dark = _ref.dark,
            dark = _ref$dark === undefined ? false : _ref$dark;

        state.theme.color = color;
        state.theme.dark = dark;
    }
};

/* harmony default export */ __webpack_exports__["a"] = ({
    state: state,
    getters: getters,
    actions: actions,
    mutations: mutations
});

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(15)
/* template */
var __vue_template__ = __webpack_require__(18)
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
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_layouts_TopBar_vue__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_layouts_TopBar_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_layouts_TopBar_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__apis_HomeApi__ = __webpack_require__(5);
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




/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        return {
            data: {}
        };
    },

    components: { TopBar: __WEBPACK_IMPORTED_MODULE_0__components_layouts_TopBar_vue___default.a },
    methods: {},
    mounted: function mounted() {
        var _this = this;

        __WEBPACK_IMPORTED_MODULE_1__apis_HomeApi__["a" /* default */].stats().then(function (data) {
            return _this.data = data;
        });
    },
    created: function created() {},

    filters: {
        moneny: function moneny(v) {
            return accounting.formatMoney(v, "¥");
        }
    }
});

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__apis_UserApi__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constant__ = __webpack_require__(2);
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

var mapGetters = Vuex.mapGetters;




/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        return {
            mini: false
        };
    },

    computed: _extends({}, mapGetters({
        user: 'user',
        theme: 'theme'
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
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-toolbar",
    { attrs: { app: "", color: _vm.theme.color, dark: _vm.theme.dark } },
    [
      _c("v-toolbar-side-icon", {
        on: {
          click: function($event) {
            _vm.mini = !_vm.mini
          }
        }
      }),
      _vm._v(" "),
      _c("v-toolbar-title", [_vm._v(_vm._s(_vm.user.name))]),
      _vm._v(" "),
      _c("v-spacer"),
      _vm._v(" "),
      _c("v-avatar", { staticClass: "grey lighten-4" }, [
        _c("img", { attrs: { src: _vm.user.avatar, alt: "avatar" } })
      ]),
      _vm._v(" "),
      _c(
        "v-btn",
        { attrs: { ripple: "", flat: "" }, on: { click: _vm.logout } },
        [_vm._v("登出")]
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
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-layout",
    { attrs: { row: "" } },
    [
      _c(
        "v-flex",
        {
          staticStyle: { "margin-top": "50px" },
          attrs: { xs4: "", md3: "", "offset-md1": "" }
        },
        [
          _c(
            "v-card",
            { attrs: { ripple: "", color: "blue lighten-2" } },
            [
              _c("v-card-title", { attrs: { "primary-title": "" } }, [
                _c("div", [
                  _c("h3", { staticClass: "headline mb-0" }, [
                    _vm._v("用户数")
                  ]),
                  _vm._v(" "),
                  _c("div", [_vm._v(_vm._s(_vm.data.users))])
                ])
              ])
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-flex",
        {
          staticStyle: { "margin-top": "50px", "margin-left": "5px" },
          attrs: { xs4: "", md3: "" }
        },
        [
          _c(
            "v-card",
            { attrs: { ripple: "", color: "orange" } },
            [
              _c("v-card-title", { attrs: { "primary-title": "" } }, [
                _c("div", [
                  _c("h3", { staticClass: "headline mb-0" }, [
                    _vm._v("营业额")
                  ]),
                  _vm._v(" "),
                  _c("div", [_vm._v(_vm._s(_vm._f("moneny")(_vm.data.sales)))])
                ])
              ])
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-flex",
        {
          staticStyle: { "margin-top": "50px", "margin-left": "5px" },
          attrs: { xs4: "", md3: "" }
        },
        [
          _c(
            "v-card",
            { attrs: { ripple: "", color: "grey" } },
            [
              _c("v-card-title", { attrs: { "primary-title": "" } }, [
                _c("div", [
                  _c("h3", { staticClass: "headline mb-0" }, [
                    _vm._v("文章数")
                  ]),
                  _vm._v(" "),
                  _c("div", [_vm._v(_vm._s(_vm.data.articles))])
                ])
              ])
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
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(20)
/* template */
var __vue_template__ = __webpack_require__(25)
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
Component.options.__file = "src/pages/account/Index.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6bd98308", Component.options)
  } else {
    hotAPI.reload("data-v-6bd98308", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_datatable_Datatable_vue__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_datatable_Datatable_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_datatable_Datatable_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_theme__ = __webpack_require__(7);
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
        var _this = this;

        return {
            headers: [{
                text: 'ID',
                value: 'id'
            }, {
                text: 'Avatar',
                value: 'avatar',
                display: function display(v) {
                    return '<div class="avatar" style="height: 32px;width: 32px"><img src="' + v + '"/></div>';
                },
                click: function click(v) {
                    _this.img = v;
                    _this.dialog = true;
                }
            }, {
                text: 'Nickname',
                value: 'nickname'
            }, {
                text: 'Created at',
                value: 'created_at'
            }],
            img: null,
            dialog: false,
            actions: [{
                icon: 'edit',
                color: 'green',
                click: function click(item) {
                    return console.log(item);
                }
            }, {
                icon: 'delete',
                color: 'error',
                click: function click(item) {
                    return console.log(item);
                }
            }]
        };
    },

    mixins: [__WEBPACK_IMPORTED_MODULE_1__mixins_theme__["a" /* default */]],
    components: { DataTable: __WEBPACK_IMPORTED_MODULE_0__components_datatable_Datatable_vue___default.a },
    methods: {},
    mounted: function mounted() {},
    created: function created() {}
});

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(22)
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
Component.options.__file = "src/components/datatable/Datatable.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3291edf9", Component.options)
  } else {
    hotAPI.reload("data-v-3291edf9", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__api__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_theme__ = __webpack_require__(7);
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
    props: {
        apiUrl: {
            type: String,
            default: function _default() {
                return '';
            }
        },
        actions: {
            type: Array,
            default: function _default() {
                return [];
            }
        },
        headers: {
            type: Array,
            default: function _default() {
                return [];
            }
        },
        placeholder: {
            type: String,
            default: function _default() {
                return '没有更多数据';
            }
        },
        actionsTitle: {
            type: String,
            default: function _default() {
                return '操作';
            }
        },
        actionsAlign: {
            type: String,
            default: function _default() {
                return 'center';
            }
        },
        mustSort: {
            type: Boolean,
            default: true
        },
        displayAction: {
            type: Function,
            default: function _default(paginator) {
                return '\u6761/\u9875, \u4ECE' + paginator.from + '\u5230' + paginator.to + '\u6761\uFF0C\u5171' + paginator.total + '\u6761';
            }
        }
    },
    mixins: [__WEBPACK_IMPORTED_MODULE_1__mixins_theme__["a" /* default */]],
    data: function data() {
        return {
            fields: [],
            loading: false,
            refreshing: false,
            paginator: {
                total: 0,
                per_page: 10,
                current_page: 0,
                last_page: 0,
                next_page_url: null,
                prev_page_url: null,
                from: 0,
                to: 0,
                data: []
            },
            pagination: {},
            fixedActions: [],
            pageSizes: [10, 15, 20, 25],
            pageSize: 10
        };
    },

    computed: {
        hasActions: function hasActions() {
            var has = false;

            this.actions.forEach(function (action) {
                if (action['granted'] !== false) {
                    has = true;
                }
            });

            return has;
        }
    },
    components: {},
    methods: {
        load: function load(_ref) {
            var _this = this;

            var _ref$per_page = _ref.per_page,
                per_page = _ref$per_page === undefined ? this.pageSize : _ref$per_page,
                _ref$page = _ref.page,
                page = _ref$page === undefined ? 1 : _ref$page,
                sort = _ref.sort;

            this.loading = 'green';
            return __WEBPACK_IMPORTED_MODULE_0__api__["a" /* default */].getData(this.apiUrl, {
                per_page: per_page,
                page: page,
                sort: sort !== undefined ? sort : this.resolveSort(this.pagination)
            }).then(function (paginator) {
                _this.loading = false;
                _this.refreshing = false;

                _this.paginator = paginator;
                _this.pagination.page = paginator.current_page;
                _this.pagination.rowsPerPage = paginator.per_page;
                _this.pagination.totalItems = paginator.total;
                _this.emit('loaded', paginator);
            }).catch(function (error) {
                _this.loading = false;
                _this.refreshing = false;
            });
        },
        formatHeaders: function formatHeaders() {
            this.fields = this.headers.map(function (header) {
                header.align = header.align || 'left';
                return header;
            });
            this.hasActions && this.fields.push({
                text: this.actionsTitle,
                align: this.actionsAlign,
                sortable: false,
                action: true
            });
        },
        fixActions: function fixActions() {
            var actions = _.clone(this.actions);

            this.fixedActions = actions.map(function (action) {
                var _action$icon = action.icon,
                    icon = _action$icon === undefined ? '' : _action$icon,
                    _action$text = action.text,
                    text = _action$text === undefined ? '' : _action$text,
                    _action$color = action.color,
                    color = _action$color === undefined ? 'primary' : _action$color,
                    _action$dark = action.dark,
                    dark = _action$dark === undefined ? false : _action$dark,
                    _action$flat = action.flat,
                    flat = _action$flat === undefined ? false : _action$flat;

                action.icon = icon;
                action.text = text;
                action.color = color;
                action.dark = dark;
                action.flat = flat;
                return action;
            });
        },
        renderField: function renderField(item, field) {
            var value = item[field.value];
            var display = field.display;
            if (!display) {
                return value;
            }

            return this.callParentMethod(display, value, item);
        },
        page: function page(_page) {
            this.load({
                page: _page
            });
        },
        getParentMethod: function getParentMethod(method) {
            if (typeof method === 'function') {
                return method;
            }
            var m = this.$parent[method];
            if (m && typeof m === 'function') {
                return m;
            }
            return false;
        },
        callParentMethod: function callParentMethod(method) {
            var m = this.getParentMethod(method);
            if (m) {
                for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                    args[_key - 1] = arguments[_key];
                }

                return m.call.apply(m, [this.$parent].concat(_toConsumableArray(args)));
            }
            return m;
        },
        clickField: function clickField(item, field) {
            var value = item[field.value];
            var click = field.click;
            if (click) {
                this.callParentMethod(click, value, item);
            }
        },
        refresh: function refresh() {
            this.refreshing = true;
            this.pagination.sortBy = null;
            return this.load({
                per_page: this.pageSize,
                page: 1,
                sort: null
            });
        },
        resolveSort: function resolveSort(pagination) {
            if (pagination.sortBy) {
                var key = pagination.sortBy;
                key += pagination.descending ? '|desc' : '|asc';
                return key;
            }
            return undefined;
        }
    },
    mounted: function mounted() {
        this.formatHeaders();
        this.fixActions();
        this.apiUrl && this.load({});
    },
    created: function created() {},

    watch: {
        pagination: function pagination(now) {
            if (now.sortBy) {
                this.load({});
            }
        }
    }
});

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var Api = {
  getData: function getData(url) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return axios.get(url, {
      params: params
    }).then(function (response) {
      return response.data;
    });
  }
};

/* harmony default export */ __webpack_exports__["a"] = (Api);

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-layout",
    { attrs: { row: "", wrap: "" } },
    [
      _c(
        "v-flex",
        { attrs: { xs12: "" } },
        [
          _c(
            "v-data-table",
            {
              attrs: {
                "must-sort": _vm.mustSort,
                "total-items": _vm.paginator.total,
                dark: _vm.theme.dark,
                "disable-initial-sort": "",
                headers: _vm.fields,
                items: _vm.paginator.data,
                "hide-actions": "",
                loading: _vm.loading,
                pagination: _vm.pagination
              },
              on: {
                "update:pagination": function($event) {
                  _vm.pagination = $event
                }
              },
              scopedSlots: _vm._u([
                {
                  key: "items",
                  fn: function(props) {
                    return [
                      _vm._l(_vm.fields, function(field) {
                        return !field.action
                          ? _c("td", {
                              class: field.align
                                ? "text-xs-" + field.align
                                : "text-xs-left",
                              domProps: {
                                innerHTML: _vm._s(
                                  _vm.renderField(props.item, field)
                                )
                              },
                              on: {
                                click: function($event) {
                                  _vm.clickField(props.item, field)
                                }
                              }
                            })
                          : _vm._e()
                      }),
                      _vm._v(" "),
                      _vm.hasActions
                        ? _c(
                            "td",
                            { class: "text-xs-" + _vm.actionsAlign },
                            _vm._l(_vm.fixedActions, function(action) {
                              return _c(
                                "v-btn",
                                {
                                  key: _vm.$index,
                                  class: action.class,
                                  attrs: {
                                    flat: action.flat,
                                    dark: action.dark,
                                    small: "",
                                    color: action.color,
                                    fab: !action.text
                                  },
                                  on: {
                                    click: function($event) {
                                      _vm.callParentMethod(
                                        action.click,
                                        props.item
                                      )
                                    }
                                  }
                                },
                                [
                                  _c("v-icon", [_vm._v(_vm._s(action.icon))]),
                                  _vm._v(
                                    "\n                        " +
                                      _vm._s(action.text) +
                                      "\n                    "
                                  )
                                ],
                                1
                              )
                            })
                          )
                        : _vm._e()
                    ]
                  }
                }
              ])
            },
            [
              _c("template", { slot: "no-data" }, [
                _c("div", { domProps: { innerHTML: _vm._s(_vm.placeholder) } })
              ])
            ],
            2
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-layout",
        { attrs: { xs12: "", row: "" } },
        [
          _c(
            "v-flex",
            { staticClass: "text-xs-left", attrs: { xs8: "" } },
            [
              _c("v-pagination", {
                staticClass: "text-xs-center pt-2",
                attrs: {
                  "total-visible": 7,
                  circle: "",
                  length: _vm.paginator.last_page
                },
                on: { input: _vm.page },
                model: {
                  value: _vm.pagination.page,
                  callback: function($$v) {
                    _vm.$set(_vm.pagination, "page", $$v)
                  },
                  expression: "pagination.page"
                }
              }),
              _vm._v(" "),
              _c(
                "v-btn",
                {
                  staticClass: "pagination__item circle",
                  class: _vm.refreshing ? "animate rotation" : "",
                  staticStyle: { top: "-10px" },
                  attrs: { dark: _vm.theme.dark, fab: "" },
                  on: { click: _vm.refresh }
                },
                [_c("v-icon", [_vm._v("refresh")])],
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "v-layout",
            { attrs: { xs4: "", row: "" } },
            [
              _c(
                "v-flex",
                { attrs: { xs3: "" } },
                [
                  _c("v-select", {
                    attrs: {
                      items: _vm.pageSizes,
                      "single-line": "",
                      bottom: "",
                      label: "Select"
                    },
                    on: {
                      input: function($event) {
                        _vm.load({})
                      }
                    },
                    model: {
                      value: _vm.pageSize,
                      callback: function($$v) {
                        _vm.pageSize = $$v
                      },
                      expression: "pageSize"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-flex",
                { attrs: { xs9: "" } },
                [
                  _c("v-subheader", { staticStyle: { height: "74px" } }, [
                    _vm._v(_vm._s(_vm.displayAction(_vm.paginator)))
                  ])
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
    require("vue-hot-reload-api")      .rerender("data-v-3291edf9", module.exports)
  }
}

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-container",
    [
      _c(
        "v-card",
        { attrs: { dark: _vm.theme.dark } },
        [
          _c(
            "v-toolbar",
            { attrs: { light: "", flat: "" } },
            [_c("v-toolbar-title", [_vm._v("Users")])],
            1
          ),
          _vm._v(" "),
          _c(
            "v-card-title",
            [
              _c("data-table", {
                attrs: {
                  actions: _vm.actions,
                  headers: _vm.headers,
                  "api-url": "/users"
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
        "v-dialog",
        {
          attrs: {
            transition: "slide-y-transition",
            "max-width": "480",
            lazy: ""
          },
          model: {
            value: _vm.dialog,
            callback: function($$v) {
              _vm.dialog = $$v
            },
            expression: "dialog"
          }
        },
        [
          _c("v-card-media", [
            _c("img", {
              staticClass: "lazyload",
              attrs: {
                src: "/images/placeholder@256.png",
                "data-src": _vm.img,
                alt: ""
              }
            })
          ])
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
    require("vue-hot-reload-api")      .rerender("data-v-6bd98308", module.exports)
  }
}

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(27)
/* template */
var __vue_template__ = __webpack_require__(28)
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
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__apis_UserApi__ = __webpack_require__(1);
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


var mapGetters = Vuex.mapGetters;
/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        return {
            showPass: false,
            requesting: false,
            post: {}
        };
    },

    computed: _extends({}, mapGetters({
        theme: 'theme'
    })),
    components: {},
    methods: {
        login: function login() {
            var _this = this;

            this.requesting = true;
            __WEBPACK_IMPORTED_MODULE_0__apis_UserApi__["a" /* default */].login(this.post).then(function (re) {
                _this.requesting = false;
                _this.$router.push('/dashboard');
            }).catch(function (error) {
                return _this.requesting = false;
            });
        }
    },
    mounted: function mounted() {},
    created: function created() {}
});

/***/ }),
/* 28 */
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
                {
                  attrs: {
                    color: _vm.theme.color,
                    dark: _vm.theme.dark,
                    flat: ""
                  }
                },
                [_c("v-toolbar-title", [_vm._v("Login")])],
                1
              ),
              _vm._v(" "),
              _vm.requesting
                ? _c("v-progress-linear", {
                    staticStyle: { margin: "0" },
                    attrs: { indeterminate: true, height: "3", color: "green" }
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
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_utils__ = __webpack_require__(30);
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
/* 30 */
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
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(32)
/* template */
var __vue_template__ = __webpack_require__(33)
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
/* 32 */
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
/* 33 */
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
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(35)
/* template */
var __vue_template__ = __webpack_require__(36)
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
/* 35 */
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
        nav: 'navigation',
        theme: 'theme'
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
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-navigation-drawer",
    {
      attrs: { dark: _vm.theme.dark, fixed: "", app: "" },
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
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(38)
/* template */
var __vue_template__ = __webpack_require__(39)
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
Component.options.__file = "src/components/layouts/Footer.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-198874de", Component.options)
  } else {
    hotAPI.reload("data-v-198874de", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 38 */
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

var mapMutations = Vuex.mapMutations;
var mapGetters = Vuex.mapGetters;
/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        return {};
    },

    computed: _extends({
        color: function color() {
            return this.theme.color !== 'white' ? 'white' : 'black';
        }
    }, mapGetters({
        theme: 'theme'
    })),
    components: {},
    methods: _extends({}, mapMutations({
        changeTheme: 'changeTheme'
    })),
    mounted: function mounted() {},
    created: function created() {}
});

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-footer",
    { attrs: { fixed: "", color: _vm.theme.color, dark: _vm.theme.dark } },
    [
      _c("div", { style: { color: _vm.color } }, [
        _vm._v("fanscome.zdhdtech.cn ©" + _vm._s(new Date().getFullYear()))
      ]),
      _vm._v(" "),
      _c("v-spacer"),
      _vm._v(" "),
      _c("v-btn", {
        attrs: {
          color: "dark",
          dark: "",
          small: "",
          bottom: "",
          right: "",
          fab: ""
        },
        on: {
          click: function($event) {
            _vm.changeTheme({ color: "grey darken-2", dark: true })
          }
        }
      }),
      _vm._v(" "),
      _c("v-btn", {
        attrs: {
          color: "white",
          dark: "",
          small: "",
          bottom: "",
          right: "",
          fab: ""
        },
        on: {
          click: function($event) {
            _vm.changeTheme({ color: "white" })
          }
        }
      }),
      _vm._v(" "),
      _c("v-btn", {
        attrs: {
          color: "primary",
          dark: "",
          small: "",
          bottom: "",
          right: "",
          fab: ""
        },
        on: {
          click: function($event) {
            _vm.changeTheme({ color: "primary" })
          }
        }
      })
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
    require("vue-hot-reload-api")      .rerender("data-v-198874de", module.exports)
  }
}

/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__store__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constant__ = __webpack_require__(2);
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
/* 41 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);