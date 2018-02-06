!function(t){var e={};function n(a){if(e[a])return e[a].exports;var r=e[a]={i:a,l:!1,exports:{}};return t[a].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=t,n.c=e,n.d=function(t,e,a){n.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:a})},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=9)}([function(t,e){t.exports=function(t,e,n,a,r,i){var o,s=t=t||{},c=typeof t.default;"object"!==c&&"function"!==c||(o=t,s=t.default);var l,u="function"==typeof s?s.options:s;if(e&&(u.render=e.render,u.staticRenderFns=e.staticRenderFns,u._compiled=!0),n&&(u.functional=!0),r&&(u._scopeId=r),i?(l=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),a&&a.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(i)},u._ssrRegister=l):a&&(l=a),l){var d=u.functional,f=d?u.render:u.beforeCreate;d?(u._injectStyles=l,u.render=function(t,e){return l.call(e),f(t,e)}):u.beforeCreate=f?[].concat(f,l):[l]}return{esModule:o,exports:s,options:u}}},function(t,e,n){"use strict";n.d(e,"c",function(){return a}),n.d(e,"d",function(){return r}),n.d(e,"a",function(){return i}),n.d(e,"b",function(){return o});var a="jwt_token",r="jwt_expire_in",i="/api/admin",o="/login"},function(t,e,n){"use strict";e.c=function(t,e){var n=function(t){var e=t.split("?",2);if(e.length<2)return{path:e[0],queryString:"",query:{}};var n={};return e[1].split("&").forEach(function(t){var e=t.split("=");if(e.length>1){var a=e[0],r=e[1];if(a.indexOf("[]")>0){var i=a.replace("[]","");n[i]?n[i].push(r):n[i]=[r]}else n[a]=r}}),{path:e[0],queryString:e[1],query:n}}(t),a=n.query;for(var r in e){var i=e[r];_.isString(i)?i.length>0&&(a[r]=i):a[r]=i}var o=(s=a,c=[],_.forEach(s,function(t,e){_.isArray(t)?t.forEach(function(t){c.push(e+"[]="+t)}):c.push(e+"="+t)}),c.join("&"));var s,c;if(o.length<1)return n.path;return n.path+"?"+o},e.b=function t(e,n){n=n||"node";var r=_.clone(e);r.forEach(function(e){if(e.hasOwnProperty(n)){var r=e[n];delete e[n],a.push(e),a.concat(t(r,n))}else a.push(e)});return a},e.a=i;var a=[],r=localStorage||sessionStorage;function i(){}i.prototype.put=function(t,e){var n=e;_.isObject(e)&&(n=JSON.stringify(e)),r.setItem(t,n)},i.prototype.get=function(t,e){var n=r.getItem(t);try{n=JSON.parse(n)}catch(t){}return n||e},i.prototype.remove=function(t){r.removeItem(t)}},function(t,e,n){"use strict";var a=n(1),r=n(2);function i(){}i.prototype.access_token=null,i.prototype.expires_in=0,i.prototype.type=null;var o=new r.a,s={getUser:function(){return axios.get("/user").then(function(t){return t.data})},login:function(t){var e=this;return axios.post("/login",t,{guest:!0}).then(function(t){return e.afterLogin(t.data)})},logout:function(){return axios.post("/logout").then(function(t){return o.remove(a.d),o.remove(a.c),t.data})},afterLogin:function(t){return o.put(a.c,t.access_token),t.expires_in>0&&o.put(a.d,(new Date).getTime()+1e3*t.expires_in-5e3),t},refresh:function(){var t=this,e=o.get(a.c);return axios.post("/refresh",{},{guest:!0,headers:{Authorization:"Bearer "+e},toast:!1}).then(function(e){return t.afterLogin(e.data)})},readyToRefresh:function(t,e){var n=this;setTimeout(function(){"function"==typeof e||(e=function(t){return t}),n.refresh().then(e)},t)}};e.a=s},function(t,e,n){"use strict";n.d(e,"b",function(){return r}),n.d(e,"a",function(){return i});var a=n(1),r=[{path:"/dashboard",component:n(11),meta:{title:"Dashboard"}},{path:"/users",component:n(16),meta:{title:"Accounts"}},{path:a.b,component:n(22),meta:{title:"Login",guest:!0}},{path:"*",redirect:"/dashboard"}],i=new VueRouter({routes:r})},function(t,e,n){"use strict";var a=n(3),r={state:{user:{},tokenStatus:2},getters:{user:function(t){return t.user},tokenStatus:function(t){return t.tokenStatus}},actions:{loadUser:function(t){var e=t.commit;a.a.getUser().then(function(t){e("setUser",{user:t})})}},mutations:{setUser:function(t,e){var n=e.user;t.user=n},setTokenStatus:function(t,e){t.tokenStatus=e}}},i={state:{toast:{active:!1}},getters:{toast:function(t){return t.toast}},actions:{toast:function(t){var e=t.commit,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},a=n.active,r=void 0===a||a,i=n.y,o=void 0===i?"top":i,s=n.x,c=void 0===s?null:s,l=n.mode,u=void 0===l?"":l,d=n.timeout,f=void 0===d?3e3:d,v=n.color;return e("changeToast",{active:r,color:void 0===v?"normal":v,y:o,x:c,mode:u,timeout:f,text:n.text})}},mutations:{changeToast:function(t,e){t.toast=e}}},o=n(6),s={state:{navigation:{mini:!1,items:[]}},getters:{navigation:function(t){return t.navigation}},actions:{loadNavigation:function(t){var e=t.commit;return o.a.getNavigation().then(function(t){return e("changeNavigation",{items:t})})}},mutations:{changeNavigation:function(t,e){var n=e.items,a=void 0===n?[]:n;t.navigation.items=a},miniNavigation:function(t,e){var n=e.mini,a=void 0===n||n;t.navigation.mini=a}}},c=new(n(2).a),l="v_theme",u={state:{theme:{color:"white",dark:!1}},getters:{theme:function(t){var e=c.get(l);return e&&(t.theme=e),t.theme}},actions:{},mutations:{changeTheme:function(t,e){var n=e.color,a=void 0===n?i?"dark":"white":n,r=e.dark,i=void 0!==r&&r;t.theme.color=a,t.theme.dark=i,c.put(l,t.theme)}}};e.a=new Vuex.Store({modules:{user:r,navigation:s,theme:u,toast:i},strict:!1})},function(t,e,n){"use strict";var a={getNavigation:function(){return axios.get("/navigation").then(function(t){return t.data})},stats:function(){return axios.get("/home/stats").then(function(t){return t.data})}};e.a=a},function(t,e,n){var a=n(0)(n(13),n(14),!1,null,null,null);t.exports=a.exports},function(t,e,n){"use strict";var a=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(t[a]=n[a])}return t},r=Vuex.mapGetters;e.a={computed:a({},r({theme:"theme"}))}},function(t,e,n){n(10),t.exports=n(35)},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n(5),r=n(4),i=n(2),o=n(1),s=new i.a;Object(i.b)(r.b,"children");var c=n(25),l=n.n(c),u=n(7),d=n.n(u),f=n(28),v=n.n(f),p=n(31),h=n.n(p),m=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(t[a]=n[a])}return t};n(34),r.a.beforeEach(function(t,e,n){var a;(a=t.meta.title)&&(document.title=a),function(t,e){if(!s.get(o.c)&&!0!==t.meta.guest)return e(o.b);e()}(t,n)});var g=Vuex.mapGetters;new Vue({store:a.a,router:r.a,computed:m({isLogin:function(){return"/login"===this.$route.path}},g({theme:"theme"})),components:{Toast:l.a,TopBar:d.a,Navigation:v.a,Mfooter:h.a},el:"#app"})},function(t,e,n){var a=n(0)(n(12),n(15),!1,null,null,null);t.exports=a.exports},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n(7),r=n.n(a),i=n(6);e.default={data:function(){return{data:{}}},components:{TopBar:r.a},methods:{},mounted:function(){var t=this;i.a.stats().then(function(e){return t.data=e}),this.$nextTick(function(){var e=t.$refs.chart;echarts.init(e).setOption({title:{text:"ECharts 入门示例"},tooltip:{},legend:{data:["销量"]},xAxis:{data:["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]},yAxis:{},series:[{name:"销量",type:"bar",data:[5,20,36,10,10,20]}]})})},created:function(){},filters:{moneny:function(t){return accounting.formatMoney(t/100,"¥")}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n(3),r=n(1),i=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(t[a]=n[a])}return t},o=Vuex.mapGetters;e.default={data:function(){return{}},computed:i({mini:{get:function(){return this.nav.mini},set:function(t){this.$store.commit("miniNavigation",{mini:t})}}},o({user:"user",nav:"navigation",theme:"theme"})),components:{},methods:{logout:function(){var t=this;a.a.logout().then(function(e){t.$router.push(r.b)})}},mounted:function(){this.$store.dispatch("loadUser")},created:function(){},watch:{mini:function(t){this.$store.commit("miniNavigation",{mini:t})}}}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-toolbar",{attrs:{app:"",color:t.theme.color,dark:t.theme.dark,fixed:""}},[n("v-toolbar-side-icon",{on:{click:function(e){t.mini=!t.mini}}}),t._v(" "),n("v-toolbar-title",[t._v(t._s(t.user.name))]),t._v(" "),n("v-spacer"),t._v(" "),n("v-avatar",{staticClass:"grey lighten-4",attrs:{size:"42px"}},[n("img",{attrs:{src:t.user.avatar,alt:"avatar"}})]),t._v(" "),n("v-btn",{attrs:{ripple:"",flat:""},on:{click:t.logout}},[t._v("登出")])],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-container",{attrs:{"grid-list-md":""}},[n("v-layout",{attrs:{row:""}},[n("v-flex",{staticStyle:{"margin-top":"50px"},attrs:{xs4:"",md3:"","offset-md1":""}},[n("v-card",{staticClass:"light-blue lighten-3",attrs:{ripple:""}},[n("v-card-media",{staticClass:"light-blue lighten-4",attrs:{height:"50px"}},[n("v-container",{attrs:{"fill-height":"",fluid:""}},[n("v-layout",{attrs:{"fill-height":""}},[n("v-flex",{attrs:{xs12:"","align-end":"",flexbox:""}},[n("span",{staticClass:"headline"},[t._v("用户数")])])],1)],1)],1),t._v(" "),n("v-card-title",{attrs:{"primary-title":""}},[n("div",[n("h2",[t._v(t._s(t.data.users))])])])],1)],1),t._v(" "),n("v-flex",{staticStyle:{"margin-top":"50px","margin-left":"5px"},attrs:{xs4:"",md3:""}},[n("v-card",{attrs:{ripple:"",color:"orange"}},[n("v-card-media",{staticClass:"lime lighten-2",attrs:{color:"primary",height:"50px"}},[n("v-container",{attrs:{"fill-height":"",fluid:""}},[n("v-layout",{attrs:{"fill-height":""}},[n("v-flex",{attrs:{xs12:"","align-end":"",flexbox:""}},[n("span",{staticClass:"headline"},[t._v("营业额")])])],1)],1)],1),t._v(" "),n("v-card-title",{attrs:{"primary-title":""}},[n("div",[n("h2",[t._v(t._s(t._f("moneny")(t.data.sales)))])])])],1)],1),t._v(" "),n("v-flex",{staticStyle:{"margin-top":"50px","margin-left":"5px"},attrs:{xs4:"",md3:""}},[n("v-card",{attrs:{ripple:"",color:"grey"}},[n("v-card-media",{staticClass:"cyan",attrs:{color:"primary",height:"50px"}},[n("v-container",{attrs:{"fill-height":"",fluid:""}},[n("v-layout",{attrs:{"fill-height":""}},[n("v-flex",{attrs:{xs12:"","align-end":"",flexbox:""}},[n("span",{staticClass:"headline white--text"},[t._v("文章数")])])],1)],1)],1),t._v(" "),n("v-card-title",{attrs:{"primary-title":""}},[n("div",[n("h2",[t._v(t._s(t.data.articles))])])])],1)],1)],1),t._v(" "),n("v-layout",{attrs:{row:""}},[n("v-flex",{attrs:{xs12:"",md9:"","offset-md1":""}},[n("v-card",[n("v-card-media",{attrs:{height:"400px"}},[n("v-container",[n("div",{ref:"chart",staticStyle:{width:"100%",height:"400px"},attrs:{id:"chart"}})])],1)],1)],1)],1)],1)},staticRenderFns:[]}},function(t,e,n){var a=n(0)(n(17),n(21),!1,null,null,null);t.exports=a.exports},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n(18),r=n.n(a),i=n(8);e.default={data:function(){var t=this;return{headers:[{text:"ID",value:"id"},{text:"Avatar",value:"avatar",display:function(t){return'<div class="avatar" style="height: 32px;width: 32px"><img src="'+t+'"/></div>'},click:function(e){t.img=e,t.dialog=!0}},{text:"Nickname",value:"nickname"},{text:"Vip expire",value:"vip_expire"},{text:"Created at",value:"created_at"}],img:null,dialog:!1,actions:[{icon:"edit",color:"green",click:function(t){return console.log(t)}},{icon:"delete",color:"error",click:function(e){return console.log(t.selected)},granted:function(t){return t.id%2==1}}],selected:[]}},mixins:[i.a],components:{DataTable:r.a},methods:{},mounted:function(){},created:function(){}}},function(t,e,n){var a=n(0)(n(19),n(20),!1,null,null,null);t.exports=a.exports},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a={getData:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return axios.get(t,{params:e})}},r=n(8),i=n(2);e.default={props:{apiUrl:{type:String,default:function(){return""}},actions:{type:Array,default:function(){return[]}},headers:{type:Array,default:function(){return[]}},placeholder:{type:String,default:function(){return"没有更多数据"}},actionsTitle:{type:String,default:function(){return"操作"}},actionsAlign:{type:String,default:function(){return"center"}},mustSort:{type:Boolean,default:!0},displayAction:{type:Function,default:function(t){return"条/页, 从"+t.from+"到"+t.to+"条，共"+t.total+"条"}},selectable:{type:Boolean,default:!1},value:{type:Array,default:function(){return[]}}},model:{prop:"value",event:"change"},mixins:[r.a],data:function(){return{fields:[],loading:!1,refreshing:!1,paginator:{total:0,per_page:10,current_page:0,last_page:0,next_page_url:null,prev_page_url:null,from:0,to:0,data:[]},pagination:{},fixedActions:[],pageSizes:[10,15,20,25],pageSize:10,showActions:!1}},computed:{hasActions:function(){var t=!1;return this.actions.forEach(function(e){t=!0}),t},selected:{get:function(){return this.value},set:function(t){this.$emit("change",t)}}},components:{},methods:{load:function(t){var e=this,n=t.per_page,r=void 0===n?this.pageSize:n,o=t.page,s=void 0===o?1:o,c=t.sort,l=t.filters,u=void 0===l?{}:l;this.loading="green",this.selected=[];var d={per_page:r,page:s,sort:void 0!==c?c:this.resolveSort(this.pagination)};return u=this.buildFilters(u),a.getData(this.apiUrl,Object.assign(d,u)).then(function(t){var n=t.data;e.loading=!1,e.refreshing=!1,n.url=Object(i.c)(t.config.url,t.config.params),e.paginator=n,e.paginator.from=n.from?n.from:0,e.paginator.to=n.to?n.to:0,e.paginator=n,e.pagination.page=n.current_page,e.pagination.rowsPerPage=n.per_page,e.pagination.totalItems=n.total,e.emit("loaded",n)}).catch(function(t){e.loading=!1,e.refreshing=!1})},formatHeaders:function(){this.fields=this.headers.map(function(t){return t.align=t.align||"left",t}),this.hasActions&&this.fields.push({text:this.actionsTitle,align:this.actionsAlign,sortable:!1,action:!0})},fixActions:function(){var t=this,e=_.clone(this.actions);this.fixedActions=e.map(function(e){var n=e.icon,a=void 0===n?"":n,r=e.text,i=void 0===r?"":r,o=e.color,s=void 0===o?"primary":o,c=e.dark,l=void 0!==c&&c,u=e.flat,d=void 0!==u&&u,f=e.granted,v=void 0===f||f;if(!0!==v){var p=t.getParentMethod(v);p&&(v=p)}else v=function(t){return!0};return e.icon=a,e.text=i,e.color=s,e.dark=l,e.flat=d,e.granted=v,e})},renderField:function(t,e){var n=t[e.value],a=e.display;return a?this.callParentMethod(a,n,t):n},page:function(t){this.load({page:t})},showAction:function(t,e){var n=!0;return t.granted&&(n=this.callParentMethod(t.granted,e)),n&&(this.showActions=!0),n},getParentMethod:function(t){if("function"==typeof t)return t;var e=this.$parent[t];return!(!e||"function"!=typeof e)&&e},callParentMethod:function(t){var e=this.getParentMethod(t);if(e){for(var n=arguments.length,a=Array(n>1?n-1:0),r=1;r<n;r++)a[r-1]=arguments[r];return e.call.apply(e,[this.$parent].concat(function(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}(a)))}return e},clickField:function(t,e,n){var a=t[e.value],r=e.click;r?this.callParentMethod(r,a,t):this.selectRow(n)},refresh:function(){return this.refreshing=!0,this.pagination.sortBy=null,this.load({per_page:this.pageSize,page:1,sort:null})},resolveSort:function(t){if(t.sortBy){var e=t.sortBy;return e+=t.descending?"|desc":"|asc"}},selectRow:function(t){this.selected=[],this.selectable&&(this.selected=[t.item])},buildFilters:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"filters",n=_.clone(t),a={};for(var r in n){if(n.hasOwnProperty(r)&&[null,"",void 0].indexOf(n[r])<0)a[e+"["+r+"]"]=n[r]}return a}},mounted:function(){this.formatHeaders(),this.fixActions(),this.apiUrl&&this.load({})},created:function(){},watch:{pagination:function(t){t.sortBy&&this.load({})}}}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-layout",{attrs:{row:"",wrap:""}},[n("v-flex",{attrs:{xs12:""}},[n("v-data-table",{attrs:{"select-all":t.selectable,"must-sort":t.mustSort,"total-items":t.paginator.total,dark:t.theme.dark,"disable-initial-sort":"",headers:t.fields,items:t.paginator.data,"hide-actions":"",loading:t.loading,pagination:t.pagination},on:{"update:pagination":function(e){t.pagination=e}},scopedSlots:t._u([{key:"items",fn:function(e){return[n("tr",{attrs:{active:e.selected}},[t.selectable?n("td",[n("v-checkbox",{attrs:{primary:"","hide-details":""},model:{value:e.selected,callback:function(n){t.$set(e,"selected",n)},expression:"props.selected"}})],1):t._e(),t._v(" "),t._l(t.fields,function(a){return a.action?t._e():n("td",{class:a.align?"text-xs-"+a.align:"text-xs-left",domProps:{innerHTML:t._s(t.renderField(e.item,a))},on:{click:function(n){t.clickField(e.item,a,e)}}})}),t._v(" "),t.hasActions?n("td",{class:"text-xs-"+t.actionsAlign},t._l(t.fixedActions,function(a,r){return t.showAction(a,e.item)?n("v-btn",{key:r,class:a.class,attrs:{flat:a.flat,dark:a.dark,small:"",color:a.color,fab:!a.text},on:{click:function(n){t.callParentMethod(a.click,e.item)}}},[n("v-icon",[t._v(t._s(a.icon))]),t._v("\n                            "+t._s(a.text)+"\n                        ")],1):t._e()})):t._e()],2)]}}]),model:{value:t.selected,callback:function(e){t.selected=e},expression:"selected"}},[n("template",{slot:"no-data"},[n("div",{domProps:{innerHTML:t._s(t.placeholder)}})])],2)],1),t._v(" "),n("v-layout",{attrs:{xs12:"",row:""}},[n("v-flex",{staticClass:"text-xs-left",attrs:{xs8:""}},[n("v-pagination",{staticClass:"text-xs-center pt-2",attrs:{"total-visible":7,circle:"",length:t.paginator.last_page},on:{input:t.page},model:{value:t.pagination.page,callback:function(e){t.$set(t.pagination,"page",e)},expression:"pagination.page"}}),t._v(" "),n("v-btn",{staticClass:"pagination__item circle",class:t.refreshing?"animate rotation":"",staticStyle:{top:"-10px"},attrs:{dark:t.theme.dark,fab:""},on:{click:t.refresh}},[n("v-icon",[t._v("refresh")])],1)],1),t._v(" "),n("v-layout",{staticClass:"text-xl-right",attrs:{xs3:"",row:""}},[n("v-select",{staticClass:"pull-right",attrs:{items:t.pageSizes,"single-line":"",bottom:"",label:"Select"},on:{input:function(e){t.load({})}},model:{value:t.pageSize,callback:function(e){t.pageSize=e},expression:"pageSize"}}),t._v(" "),n("v-subheader",{staticClass:"pull-right",staticStyle:{height:"74px"}},[t._v(t._s(t.displayAction(t.paginator)))])],1)],1)],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-container",[n("v-card",{attrs:{dark:t.theme.dark}},[n("v-toolbar",{attrs:{light:"",flat:""}},[n("v-toolbar-title",[t._v("Users")])],1),t._v(" "),n("v-card-title",[n("data-table",{attrs:{selectable:!0,actions:t.actions,headers:t.headers,"api-url":"/users"},model:{value:t.selected,callback:function(e){t.selected=e},expression:"selected"}})],1)],1),t._v(" "),n("v-dialog",{attrs:{transition:"slide-y-transition","max-width":"480",lazy:""},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[n("v-card-media",[n("img",{staticClass:"lazyload",attrs:{src:"/images/placeholder@256.png","data-src":t.img,alt:""}})])],1)],1)},staticRenderFns:[]}},function(t,e,n){var a=n(0)(n(23),n(24),!1,null,null,null);t.exports=a.exports},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n(3),r=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(t[a]=n[a])}return t},i=Vuex.mapGetters;e.default={data:function(){return{showPass:!1,requesting:!1,post:{}}},computed:r({},i({theme:"theme"})),components:{},methods:{login:function(){var t=this;this.requesting=!0,a.a.login(this.post).then(function(e){t.requesting=!1,t.$router.push("/dashboard")}).catch(function(e){return t.requesting=!1})}},mounted:function(){},created:function(){}}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-layout",[n("v-flex",{staticStyle:{"margin-top":"50px"},attrs:{xs12:"",md4:"","offset-md4":""}},[n("v-card",[n("v-toolbar",{attrs:{color:t.theme.color,dark:t.theme.dark,flat:""}},[n("v-toolbar-title",[t._v("Login")])],1),t._v(" "),t.requesting?n("v-progress-linear",{staticStyle:{margin:"0"},attrs:{indeterminate:!0,height:"3",color:"green"}}):t._e(),t._v(" "),n("v-card-text",[n("v-form",{model:{value:t.valid,callback:function(e){t.valid=e},expression:"valid"}},[n("v-text-field",{attrs:{label:"E-mail",required:""},model:{value:t.post.email,callback:function(e){t.$set(t.post,"email",e)},expression:"post.email"}}),t._v(" "),n("v-text-field",{attrs:{label:"密码","append-icon":t.showPass?"visibility":"visibility_off","append-icon-cb":function(){return t.showPass=!t.showPass},type:t.showPass?"text":"password",counter:""},model:{value:t.post.password,callback:function(e){t.$set(t.post,"password",e)},expression:"post.password"}})],1)],1),t._v(" "),n("v-card-actions",[n("v-btn",{attrs:{color:"primary"},on:{click:t.login}},[t._v("登陆")])],1)],1)],1)],1)},staticRenderFns:[]}},function(t,e,n){var a=n(0)(n(26),n(27),!1,null,null,null);t.exports=a.exports},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(t[a]=n[a])}return t},r=Vuex.mapGetters;e.default={data:function(){return{snackbar:!1}},computed:a({},r({toast:"toast"})),components:{},methods:{},mounted:function(){this.snackbar=this.toast.active},created:function(){},watch:{toast:function(t){this.snackbar=t.active}}}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-snackbar",{attrs:{timeout:t.toast.timeout,top:"top"===t.toast.y,bottom:"bottom"===t.toast.y,right:"right"===t.toast.x,left:"left"===t.toast.x,"multi-line":"multi-line"===t.toast.mode,vertical:"vertical"===t.toast.mode,color:t.toast.color},model:{value:t.snackbar,callback:function(e){t.snackbar=e},expression:"snackbar"}},[t._v("\n    "+t._s(t.toast.text)+"\n    "),n("v-btn",{attrs:{flat:"",color:"pink"},nativeOn:{click:function(e){t.snackbar=!1}}},[t._v("关闭")])],1)},staticRenderFns:[]}},function(t,e,n){var a=n(0)(n(29),n(30),!1,null,null,null);t.exports=a.exports},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(t[a]=n[a])}return t},r=Vuex.mapGetters;e.default={data:function(){return{active:!1}},computed:a({items:function(){return this.nav.items},open:{get:function(){return!this.nav.mini},set:function(t){this.$store.commit("miniNavigation",{mini:!t})}}},r({nav:"navigation",theme:"theme"})),components:{},methods:{navigate:function(t){this.active=t.name},hasNode:function(t){var e=this.getNode(t),n=!1;return e.forEach(function(t){!1!==t.granted&&(n=!0)}),e.length>0&&n},getNode:function(t){return t.nodes?t.nodes:[]}},mounted:function(){this.$store.dispatch("loadNavigation")},created:function(){}}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-navigation-drawer",{attrs:{dark:t.theme.dark,fixed:"",app:""},model:{value:t.open,callback:function(e){t.open=e},expression:"open"}},[n("v-toolbar",{attrs:{flat:""}},[n("v-list",[n("v-list-tile",[n("v-list-tile-title",{staticClass:"title"},[n("strong",[t._v("Admin")]),t.nav.mini?t._e():n("span",[t._v("test")])])],1)],1)],1),t._v(" "),n("v-divider"),t._v(" "),n("v-list",[t._l(t.items,function(e){return[t.hasNode(e)&&!1!==e.granted?n("v-list-group",{attrs:{"prepend-icon":e.icon,"no-action":"",group:e.name}},[n("v-list-tile",{attrs:{slot:"activator",ripple:""},slot:"activator"},[n("v-list-tile-content",[n("v-list-tile-title",[t._v(t._s(e.display_name))])],1)],1),t._v(" "),t._l(e.nodes,function(a){return!1!==a.granted?n("v-list-tile",{key:a.name,attrs:{to:a.path,ripple:""},on:{click:function(e){t.navigate(a)}},model:{value:t.active===e.name,callback:function(n){t.$set(t.active===e,"name",n)},expression:"active === item.name"}},[n("v-list-tile-content",[n("v-list-tile-title",[t._v(t._s(a.display_name))])],1),t._v(" "),n("v-list-tile-action",[n("v-icon",[t._v(t._s(a.icon))])],1)],1):t._e()})],2):t._e(),t._v(" "),!1===e.granted||t.hasNode(e)?t._e():n("v-list-tile",{key:e.name,attrs:{to:e.path,ripple:""},on:{click:function(n){t.navigate(e)}},model:{value:t.active===e.name,callback:function(n){t.$set(t.active===e,"name",n)},expression:"active === item.name"}},[n("v-list-tile-action",[n("v-icon",[t._v(t._s(e.icon))])],1),t._v(" "),n("v-list-tile-content",[n("v-list-tile-title",[t._v(t._s(e.display_name))])],1)],1)]})],2)],1)},staticRenderFns:[]}},function(t,e,n){var a=n(0)(n(32),n(33),!1,null,null,null);t.exports=a.exports},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(t[a]=n[a])}return t},r=Vuex.mapMutations,i=Vuex.mapGetters;e.default={data:function(){return{}},computed:a({color:function(){return"white"!==this.theme.color?"white":"black"}},i({theme:"theme"})),components:{},methods:a({},r({changeTheme:"changeTheme"})),mounted:function(){},created:function(){}}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-footer",{attrs:{fixed:"",color:t.theme.color,dark:t.theme.dark}},[n("div",{style:{color:t.color}},[t._v("admin.test ©"+t._s((new Date).getFullYear()))]),t._v(" "),n("v-spacer"),t._v(" "),n("v-btn",{attrs:{color:"dark",dark:"",small:"",bottom:"",right:"",fab:""},on:{click:function(e){t.changeTheme({color:"grey darken-2",dark:!0})}}}),t._v(" "),n("v-btn",{attrs:{color:"white",dark:"",small:"",bottom:"",right:"",fab:""},on:{click:function(e){t.changeTheme({color:"white"})}}}),t._v(" "),n("v-btn",{attrs:{color:"primary",dark:"",small:"",bottom:"",right:"",fab:""},on:{click:function(e){t.changeTheme({color:"primary"})}}})],1)},staticRenderFns:[]}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n(5),r=n(1),i=n(2),o=n(4),s=n(3),c=0,l=1,u=2,d=new i.a;function f(t,e,n){var a=d.get(r.c);t.headers.common.Authorization="Bearer "+a,e(t)}axios.interceptors.request.use(function(t){if(t.url=r.a+t.url,!0!==t.guest){var e=d.get(r.c),n=d.get(r.d);return e&&n&&n<=(new Date).getTime()&&(a.a.getters.tokenStatus===l||a.a.commit("setTokenStatus",c)),function(t){if(a.a.getters.tokenStatus===c)return a.a.commit("setTokenStatus",l),s.a.refresh().then(function(e){return t.headers.common.Authorization="Bearer "+e.access_token,a.a.commit("setTokenStatus",u),Promise.resolve(t)}).catch(function(t){});if(a.a.getters.tokenStatus===l){var e=null;return new Promise(function(n,r){e=setInterval(function(){a.a.getters.tokenStatus===u&&(f(t,n,r),clearInterval(e))},500)})}return new Promise(function(e,n){f(t,e,n)})}(t)}return t},function(t){return Promise.reject(t)}),axios.interceptors.response.use(function(t){return t},function(t){return 401===t.response.status?o.a.push(r.b):!1!==t.config.toast&&a.a.dispatch("toast",{color:"error",text:t.response.data.message}),Promise.reject(t)})},function(t,e){}]);