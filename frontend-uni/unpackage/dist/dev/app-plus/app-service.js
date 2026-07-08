(this["webpackJsonp"] = this["webpackJsonp"] || []).push([["app-service"],[
/* 0 */
/*!*************************************************************!*\
  !*** E:/翻译漫画/book-main (14)/book-main/frontend-uni/main.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 1);\nvar _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 2));\n__webpack_require__(/*! uni-pages */ 6);\nvar _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 79));\nvar _App = _interopRequireDefault(__webpack_require__(/*! ./App */ 80));\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }\n_vue.default.config.productionTip = false;\n_App.default.mpType = 'app';\nvar app = new _vue.default(_objectSpread({}, _App.default));\napp.$mount();//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVuaS1hcHA6Ly8vbWFpbi5qcyJdLCJuYW1lcyI6WyJWdWUiLCJjb25maWciLCJwcm9kdWN0aW9uVGlwIiwiQXBwIiwibXBUeXBlIiwiYXBwIiwiJG1vdW50Il0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7QUFBbUI7QUFDbkI7QUFBdUI7QUFBQTtBQUV2QkEsWUFBRyxDQUFDQyxNQUFNLENBQUNDLGFBQWEsR0FBRyxLQUFLO0FBQ2hDQyxZQUFHLENBQUNDLE1BQU0sR0FBRyxLQUFLO0FBRWxCLElBQU1DLEdBQUcsR0FBRyxJQUFJTCxZQUFHLG1CQUNkRyxZQUFHLEVBQ047QUFDRkUsR0FBRyxDQUFDQyxNQUFNLEVBQUUiLCJmaWxlIjoiMC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAndW5pLXBhZ2VzJztpbXBvcnQgVnVlIGZyb20gJ3Z1ZSdcbmltcG9ydCBBcHAgZnJvbSAnLi9BcHAnXG5cblZ1ZS5jb25maWcucHJvZHVjdGlvblRpcCA9IGZhbHNlXG5BcHAubXBUeXBlID0gJ2FwcCdcblxuY29uc3QgYXBwID0gbmV3IFZ1ZSh7XG4gIC4uLkFwcFxufSlcbmFwcC4kbW91bnQoKSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///0\n");

/***/ }),
/* 1 */
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/interopRequireDefault.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
module.exports = _interopRequireDefault, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 2 */
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/defineProperty.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toPropertyKey = __webpack_require__(/*! ./toPropertyKey.js */ 3);
function _defineProperty(obj, key, value) {
  key = toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
module.exports = _defineProperty, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 3 */
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toPropertyKey.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! ./typeof.js */ 4)["default"];
var toPrimitive = __webpack_require__(/*! ./toPrimitive.js */ 5);
function toPropertyKey(t) {
  var i = toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}
module.exports = toPropertyKey, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 4 */
/*!*******************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/typeof.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _typeof(o) {
  "@babel/helpers - typeof";

  return (module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports), _typeof(o);
}
module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 5 */
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toPrimitive.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! ./typeof.js */ 4)["default"];
function toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
module.exports = toPrimitive, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 6 */
/*!****************************************************************!*\
  !*** E:/翻译漫画/book-main (14)/book-main/frontend-uni/pages.json ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

if (typeof Promise !== 'undefined' && !Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(function (value) {
      return promise.resolve(callback()).then(function () {
        return value;
      });
    }, function (reason) {
      return promise.resolve(callback()).then(function () {
        throw reason;
      });
    });
  };
}
if (typeof uni !== 'undefined' && uni && uni.requireGlobal) {
  var global = uni.requireGlobal();
  ArrayBuffer = global.ArrayBuffer;
  Int8Array = global.Int8Array;
  Uint8Array = global.Uint8Array;
  Uint8ClampedArray = global.Uint8ClampedArray;
  Int16Array = global.Int16Array;
  Uint16Array = global.Uint16Array;
  Int32Array = global.Int32Array;
  Uint32Array = global.Uint32Array;
  Float32Array = global.Float32Array;
  Float64Array = global.Float64Array;
  BigInt64Array = global.BigInt64Array;
  BigUint64Array = global.BigUint64Array;
}
if (uni.restoreGlobal) {
  uni.restoreGlobal(weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
__definePage('pages/index/index', function () {
  return Vue.extend(__webpack_require__(/*! pages/index/index.vue?mpType=page */ 7).default);
});
__definePage('pages/search/search', function () {
  return Vue.extend(__webpack_require__(/*! pages/search/search.vue?mpType=page */ 19).default);
});
__definePage('pages/graph/graph', function () {
  return Vue.extend(__webpack_require__(/*! pages/graph/graph.vue?mpType=page */ 24).default);
});
__definePage('pages/graph-full/graph-full', function () {
  return Vue.extend(__webpack_require__(/*! pages/graph-full/graph-full.vue?mpType=page */ 29).default);
});
__definePage('pages/shelf/shelf', function () {
  return Vue.extend(__webpack_require__(/*! pages/shelf/shelf.vue?mpType=page */ 34).default);
});
__definePage('pages/profile/profile', function () {
  return Vue.extend(__webpack_require__(/*! pages/profile/profile.vue?mpType=page */ 39).default);
});
__definePage('pages/detail/detail', function () {
  return Vue.extend(__webpack_require__(/*! pages/detail/detail.vue?mpType=page */ 44).default);
});
__definePage('pages/login/login', function () {
  return Vue.extend(__webpack_require__(/*! pages/login/login.vue?mpType=page */ 49).default);
});
__definePage('pages/reader/reader', function () {
  return Vue.extend(__webpack_require__(/*! pages/reader/reader.vue?mpType=page */ 54).default);
});
__definePage('pages/admin/admin', function () {
  return Vue.extend(__webpack_require__(/*! pages/admin/admin.vue?mpType=page */ 59).default);
});
__definePage('pages/chat/chat', function () {
  return Vue.extend(__webpack_require__(/*! pages/chat/chat.vue?mpType=page */ 64).default);
});
__definePage('pages/original/original', function () {
  return Vue.extend(__webpack_require__(/*! pages/original/original.vue?mpType=page */ 69).default);
});
__definePage('pages/platform/platform', function () {
  return Vue.extend(__webpack_require__(/*! pages/platform/platform.vue?mpType=page */ 74).default);
});

/***/ }),
/* 7 */
/*!***************************************************************************************!*\
  !*** E:/翻译漫画/book-main (14)/book-main/frontend-uni/pages/index/index.vue?mpType=page ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _index_vue_vue_type_template_id_2be84a3c_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.vue?vue&type=template&id=2be84a3c&scoped=true&mpType=page */ 8);\n/* harmony import */ var _index_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.vue?vue&type=script&lang=js&mpType=page */ 10);\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _index_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__) if([\"default\"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _index_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n/* harmony import */ var _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 18);\n\nvar renderjs\n\n\n\n\n/* normalize component */\n\nvar component = Object(_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\n  _index_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _index_vue_vue_type_template_id_2be84a3c_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _index_vue_vue_type_template_id_2be84a3c_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  \"2be84a3c\",\n  null,\n  false,\n  _index_vue_vue_type_template_id_2be84a3c_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__[\"components\"],\n  renderjs\n)\n\ncomponent.options.__file = \"pages/index/index.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbbnVsbF0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBeUk7QUFDekk7QUFDb0U7QUFDTDs7O0FBRy9EO0FBQ2dNO0FBQ2hNLGdCQUFnQix1TUFBVTtBQUMxQixFQUFFLHNGQUFNO0FBQ1IsRUFBRSx1R0FBTTtBQUNSLEVBQUUsZ0hBQWU7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUUsMkdBQVU7QUFDWjtBQUNBOztBQUVBO0FBQ2UsZ0YiLCJmaWxlIjoiNy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zLCByZWN5Y2xhYmxlUmVuZGVyLCBjb21wb25lbnRzIH0gZnJvbSBcIi4vaW5kZXgudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTJiZTg0YTNjJnNjb3BlZD10cnVlJm1wVHlwZT1wYWdlXCJcbnZhciByZW5kZXJqc1xuaW1wb3J0IHNjcmlwdCBmcm9tIFwiLi9pbmRleC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmbXBUeXBlPXBhZ2VcIlxuZXhwb3J0ICogZnJvbSBcIi4vaW5kZXgudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJm1wVHlwZT1wYWdlXCJcblxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIS4uLy4uLy4uLy4uLy4uL0hCdWlsZGVyWC41LjA3LjIwMjYwNDEwMDYvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBcIjJiZTg0YTNjXCIsXG4gIG51bGwsXG4gIGZhbHNlLFxuICBjb21wb25lbnRzLFxuICByZW5kZXJqc1xuKVxuXG5jb21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInBhZ2VzL2luZGV4L2luZGV4LnZ1ZVwiXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///7\n");

/***/ }),
/* 8 */
/*!*********************************************************************************************************************************!*\
  !*** E:/翻译漫画/book-main (14)/book-main/frontend-uni/pages/index/index.vue?vue&type=template&id=2be84a3c&scoped=true&mpType=page ***!
  \*********************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_0_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_2be84a3c_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--11-0!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/filter-modules-template.js!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./index.vue?vue&type=template&id=2be84a3c&scoped=true&mpType=page */ 9);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_0_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_2be84a3c_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_0_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_2be84a3c_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_0_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_2be84a3c_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_0_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_2be84a3c_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),
/* 9 */
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--11-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/filter-modules-template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!E:/翻译漫画/book-main (14)/book-main/frontend-uni/pages/index/index.vue?vue&type=template&id=2be84a3c&scoped=true&mpType=page ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "view",
    { staticClass: _vm._$s(0, "sc", "container home-page"), attrs: { _i: 0 } },
    [
      _c(
        "view",
        { staticClass: _vm._$s(1, "sc", "hero-card"), attrs: { _i: 1 } },
        [
          _c("text", {
            staticClass: _vm._$s(2, "sc", "eyebrow"),
            attrs: { _i: 2 },
          }),
          _c("text", {
            staticClass: _vm._$s(3, "sc", "big"),
            attrs: { _i: 3 },
          }),
          _c("text", {
            staticClass: _vm._$s(4, "sc", "muted hero-desc"),
            attrs: { _i: 4 },
          }),
          _c(
            "view",
            { staticClass: _vm._$s(5, "sc", "hero-actions"), attrs: { _i: 5 } },
            [
              _c("button", {
                staticClass: _vm._$s(6, "sc", "btn"),
                attrs: { _i: 6 },
                on: { click: _vm.load },
              }),
              _c("button", {
                staticClass: _vm._$s(7, "sc", "btn secondary"),
                attrs: { _i: 7 },
                on: { click: _vm.goOriginal },
              }),
              _c("button", {
                staticClass: _vm._$s(8, "sc", "btn secondary"),
                attrs: { _i: 8 },
                on: { click: _vm.goPlatform },
              }),
            ]
          ),
        ]
      ),
      _vm._$s(9, "i", _vm.error)
        ? _c(
            "view",
            { staticClass: _vm._$s(9, "sc", "card status"), attrs: { _i: 9 } },
            [
              _c("text", {
                staticClass: _vm._$s(10, "sc", "sub-title"),
                attrs: { _i: 10 },
              }),
              _c(
                "text",
                { staticClass: _vm._$s(11, "sc", "muted"), attrs: { _i: 11 } },
                [_vm._v(_vm._$s(11, "t0-0", _vm._s(_vm.error)))]
              ),
              _c(
                "text",
                { staticClass: _vm._$s(12, "sc", "muted"), attrs: { _i: 12 } },
                [_vm._v(_vm._$s(12, "t0-0", _vm._s(_vm.origin)))]
              ),
            ]
          )
        : _vm._e(),
      _c(
        "view",
        { staticClass: _vm._$s(13, "sc", "quick-grid"), attrs: { _i: 13 } },
        [
          _c(
            "view",
            {
              staticClass: _vm._$s(14, "sc", "quick-item"),
              attrs: { _i: 14 },
              on: { click: _vm.goSearch },
            },
            [_c("text"), _c("text")]
          ),
          _c(
            "view",
            {
              staticClass: _vm._$s(17, "sc", "quick-item"),
              attrs: { _i: 17 },
              on: { click: _vm.goGraph },
            },
            [_c("text"), _c("text")]
          ),
          _c(
            "view",
            {
              staticClass: _vm._$s(20, "sc", "quick-item"),
              attrs: { _i: 20 },
              on: { click: _vm.goShelf },
            },
            [_c("text"), _c("text")]
          ),
          _c(
            "view",
            {
              staticClass: _vm._$s(23, "sc", "quick-item"),
              attrs: { _i: 23 },
              on: { click: _vm.goChat },
            },
            [_c("text"), _c("text")]
          ),
        ]
      ),
      _vm._$s(26, "i", _vm.stats)
        ? _c(
            "view",
            { staticClass: _vm._$s(26, "sc", "card"), attrs: { _i: 26 } },
            [
              _c(
                "view",
                {
                  staticClass: _vm._$s(27, "sc", "between"),
                  attrs: { _i: 27 },
                },
                [
                  _c("text", {
                    staticClass: _vm._$s(28, "sc", "title"),
                    attrs: { _i: 28 },
                  }),
                  _c("text", {
                    staticClass: _vm._$s(29, "sc", "badge"),
                    attrs: { _i: 29 },
                  }),
                ]
              ),
              _c(
                "view",
                {
                  staticClass: _vm._$s(30, "sc", "stat-grid"),
                  attrs: { _i: 30 },
                },
                [
                  _c(
                    "view",
                    {
                      staticClass: _vm._$s(31, "sc", "stat-item"),
                      attrs: { _i: 31 },
                    },
                    [
                      _c(
                        "text",
                        {
                          staticClass: _vm._$s(32, "sc", "stat-num"),
                          attrs: { _i: 32 },
                        },
                        [
                          _vm._v(
                            _vm._$s(32, "t0-0", _vm._s(_vm.stats.books || 0))
                          ),
                        ]
                      ),
                      _c("text", {
                        staticClass: _vm._$s(33, "sc", "muted"),
                        attrs: { _i: 33 },
                      }),
                    ]
                  ),
                  _c(
                    "view",
                    {
                      staticClass: _vm._$s(34, "sc", "stat-item"),
                      attrs: { _i: 34 },
                    },
                    [
                      _c(
                        "text",
                        {
                          staticClass: _vm._$s(35, "sc", "stat-num"),
                          attrs: { _i: 35 },
                        },
                        [
                          _vm._v(
                            _vm._$s(35, "t0-0", _vm._s(_vm.stats.authors || 0))
                          ),
                        ]
                      ),
                      _c("text", {
                        staticClass: _vm._$s(36, "sc", "muted"),
                        attrs: { _i: 36 },
                      }),
                    ]
                  ),
                  _c(
                    "view",
                    {
                      staticClass: _vm._$s(37, "sc", "stat-item"),
                      attrs: { _i: 37 },
                    },
                    [
                      _c(
                        "text",
                        {
                          staticClass: _vm._$s(38, "sc", "stat-num"),
                          attrs: { _i: 38 },
                        },
                        [
                          _vm._v(
                            _vm._$s(38, "t0-0", _vm._s(_vm.stats.tags || 0))
                          ),
                        ]
                      ),
                      _c("text", {
                        staticClass: _vm._$s(39, "sc", "muted"),
                        attrs: { _i: 39 },
                      }),
                    ]
                  ),
                  _c(
                    "view",
                    {
                      staticClass: _vm._$s(40, "sc", "stat-item"),
                      attrs: { _i: 40 },
                    },
                    [
                      _c(
                        "text",
                        {
                          staticClass: _vm._$s(41, "sc", "stat-num"),
                          attrs: { _i: 41 },
                        },
                        [
                          _vm._v(
                            _vm._$s(
                              41,
                              "t0-0",
                              _vm._s(_vm.stats.relations || 0)
                            )
                          ),
                        ]
                      ),
                      _c("text", {
                        staticClass: _vm._$s(42, "sc", "muted"),
                        attrs: { _i: 42 },
                      }),
                    ]
                  ),
                ]
              ),
            ]
          )
        : _vm._e(),
      _c(
        "view",
        { staticClass: _vm._$s(43, "sc", "section-head"), attrs: { _i: 43 } },
        [
          _c("text", {
            staticClass: _vm._$s(44, "sc", "section-title"),
            attrs: { _i: 44 },
          }),
          _c("text", {
            staticClass: _vm._$s(45, "sc", "more"),
            attrs: { _i: 45 },
            on: { click: _vm.goSearch },
          }),
        ]
      ),
      _vm._$s(46, "i", _vm.loading)
        ? _c(
            "view",
            { staticClass: _vm._$s(46, "sc", "card"), attrs: { _i: 46 } },
            [
              _c("text", {
                staticClass: _vm._$s(47, "sc", "muted"),
                attrs: { _i: 47 },
              }),
            ]
          )
        : _vm._e(),
      _vm._l(
        _vm._$s(48, "f", { forItems: _vm.recommend }),
        function (item, $10, $20, $30) {
          return _c("BookCard", {
            key: _vm._$s(48, "f", { forIndex: $20, key: "r" + item.id }),
            attrs: { book: item, _i: "48-" + $30 },
            on: { click: _vm.goDetail },
          })
        }
      ),
      _c(
        "view",
        { staticClass: _vm._$s(49, "sc", "section-head"), attrs: { _i: 49 } },
        [
          _c("text", {
            staticClass: _vm._$s(50, "sc", "section-title"),
            attrs: { _i: 50 },
          }),
        ]
      ),
      _c(
        "scroll-view",
        { staticClass: _vm._$s(51, "sc", "h-scroll"), attrs: { _i: 51 } },
        _vm._l(
          _vm._$s(52, "f", { forItems: _vm.hot }),
          function (item, $11, $21, $31) {
            return _c(
              "view",
              {
                key: _vm._$s(52, "f", { forIndex: $21, key: "h" + item.id }),
                staticClass: _vm._$s("52-" + $31, "sc", "mini"),
                attrs: { _i: "52-" + $31 },
                on: {
                  click: function ($event) {
                    return _vm.goDetail(item)
                  },
                },
              },
              [
                _c("image", {
                  staticClass: _vm._$s("53-" + $31, "sc", "mini-cover"),
                  attrs: {
                    src: _vm._$s("53-" + $31, "a-src", item.cover_url),
                    _i: "53-" + $31,
                  },
                }),
                _c(
                  "text",
                  {
                    staticClass: _vm._$s("54-" + $31, "sc", "mini-title"),
                    attrs: { _i: "54-" + $31 },
                  },
                  [_vm._v(_vm._$s("54-" + $31, "t0-0", _vm._s(item.title)))]
                ),
                _c(
                  "text",
                  {
                    staticClass: _vm._$s("55-" + $31, "sc", "mini-meta"),
                    attrs: { _i: "55-" + $31 },
                  },
                  [
                    _vm._v(
                      _vm._$s("55-" + $31, "t0-0", _vm._s(item.avg_rating || 0))
                    ),
                  ]
                ),
              ]
            )
          }
        ),
        0
      ),
      _c(
        "view",
        { staticClass: _vm._$s(56, "sc", "section-head"), attrs: { _i: 56 } },
        [
          _c("text", {
            staticClass: _vm._$s(57, "sc", "section-title"),
            attrs: { _i: 57 },
          }),
        ]
      ),
      _vm._l(
        _vm._$s(58, "f", { forItems: _vm.newest }),
        function (item, $12, $22, $32) {
          return _c("BookCard", {
            key: _vm._$s(58, "f", { forIndex: $22, key: "n" + item.id }),
            attrs: { book: item, _i: "58-" + $32 },
            on: { click: _vm.goDetail },
          })
        }
      ),
      _c(
        "view",
        {
          staticClass: _vm._$s(59, "sc", "card ai-entry"),
          attrs: { _i: 59 },
          on: { click: _vm.goOriginal },
        },
        [
          _c("view", [
            _c("text", {
              staticClass: _vm._$s(61, "sc", "title"),
              attrs: { _i: 61 },
            }),
            _c("text", {
              staticClass: _vm._$s(62, "sc", "muted"),
              attrs: { _i: 62 },
            }),
          ]),
          _c("text", {
            staticClass: _vm._$s(63, "sc", "arrow"),
            attrs: { _i: 63 },
          }),
        ]
      ),
    ],
    2
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),
/* 10 */
/*!***************************************************************************************************************!*\
  !*** E:/翻译漫画/book-main (14)/book-main/frontend-uni/pages/index/index.vue?vue&type=script&lang=js&mpType=page ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_1_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--7-1!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/using-components.js!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./index.vue?vue&type=script&lang=js&mpType=page */ 11);\n/* harmony import */ var _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_1_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_1_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_1_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__) if([\"default\"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_1_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n /* harmony default export */ __webpack_exports__[\"default\"] = (_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_1_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0___default.a); //# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbbnVsbF0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQWdxQixDQUFnQiw4cUJBQUcsRUFBQyIsImZpbGUiOiIxMC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vSEJ1aWxkZXJYLjUuMDcuMjAyNjA0MTAwNi9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzIS4uLy4uLy4uLy4uLy4uL0hCdWlsZGVyWC41LjA3LjIwMjYwNDEwMDYvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy93ZWJwYWNrLXByZXByb2Nlc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTctMSEuLi8uLi8uLi8uLi8uLi9IQnVpbGRlclguNS4wNy4yMDI2MDQxMDA2L0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvd2VicGFjay11bmktYXBwLWxvYWRlci91c2luZy1jb21wb25lbnRzLmpzIS4uLy4uLy4uLy4uLy4uL0hCdWlsZGVyWC41LjA3LjIwMjYwNDEwMDYvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vaW5kZXgudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJm1wVHlwZT1wYWdlXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vSEJ1aWxkZXJYLjUuMDcuMjAyNjA0MTAwNi9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzIS4uLy4uLy4uLy4uLy4uL0hCdWlsZGVyWC41LjA3LjIwMjYwNDEwMDYvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy93ZWJwYWNrLXByZXByb2Nlc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTctMSEuLi8uLi8uLi8uLi8uLi9IQnVpbGRlclguNS4wNy4yMDI2MDQxMDA2L0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvd2VicGFjay11bmktYXBwLWxvYWRlci91c2luZy1jb21wb25lbnRzLmpzIS4uLy4uLy4uLy4uLy4uL0hCdWlsZGVyWC41LjA3LjIwMjYwNDEwMDYvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vaW5kZXgudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJm1wVHlwZT1wYWdlXCIiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///10\n");

/***/ }),
/* 11 */
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--7-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/using-components.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!E:/翻译漫画/book-main (14)/book-main/frontend-uni/pages/index/index.vue?vue&type=script&lang=js&mpType=page ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 1);\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\nvar _BookCard = _interopRequireDefault(__webpack_require__(/*! ../../components/BookCard.vue */ 12));\nvar _request = __webpack_require__(/*! ../../api/request.js */ 17);\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\nvar _default = {\n  components: {\n    BookCard: _BookCard.default\n  },\n  data: function data() {\n    return {\n      origin: _request.ORIGIN,\n      loading: false,\n      error: '',\n      stats: null,\n      recommend: [],\n      hot: [],\n      newest: []\n    };\n  },\n  onLoad: function onLoad() {\n    this.load();\n  },\n  onPullDownRefresh: function onPullDownRefresh() {\n    var that = this;\n    this.load(function () {\n      uni.stopPullDownRefresh();\n    });\n  },\n  methods: {\n    load: function load(done) {\n      var that = this;\n      that.loading = true;\n      that.error = '';\n      Promise.all([(0, _request.request)('/recommend/home?limit=10'), (0, _request.request)('/recommend/hot?limit=8'), (0, _request.request)('/recommend/new?limit=6'), (0, _request.request)('/graph/stats')]).then(function (res) {\n        that.recommend = (0, _request.normalizeBooks)(res[0] && res[0].items || []);\n        that.hot = (0, _request.normalizeBooks)(res[1] && res[1].items || []);\n        that.newest = (0, _request.normalizeBooks)(res[2] && res[2].items || []);\n        that.stats = res[3] || null;\n      }).catch(function (e) {\n        that.error = e.message || '首页数据加载失败，请确认后端已启动。';\n      }).then(function () {\n        that.loading = false;\n        if (done) done();\n      });\n    },\n    goDetail: function goDetail(book) {\n      uni.navigateTo({\n        url: '/pages/detail/detail?id=' + (book.id || book.book_id)\n      });\n    },\n    goSearch: function goSearch() {\n      uni.switchTab({\n        url: '/pages/search/search'\n      });\n    },\n    goGraph: function goGraph() {\n      uni.switchTab({\n        url: '/pages/graph/graph'\n      });\n    },\n    goShelf: function goShelf() {\n      uni.switchTab({\n        url: '/pages/shelf/shelf'\n      });\n    },\n    goChat: function goChat() {\n      uni.navigateTo({\n        url: '/pages/chat/chat'\n      });\n    },\n    goPlatform: function goPlatform() {\n      uni.navigateTo({\n        url: '/pages/platform/platform'\n      });\n    },\n    goOriginal: function goOriginal() {\n      uni.navigateTo({\n        url: '/pages/original/original'\n      });\n    }\n  }\n};\nexports.default = _default;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVuaS1hcHA6Ly8vcGFnZXMvaW5kZXgvaW5kZXgudnVlIl0sIm5hbWVzIjpbImNvbXBvbmVudHMiLCJCb29rQ2FyZCIsImRhdGEiLCJvcmlnaW4iLCJsb2FkaW5nIiwiZXJyb3IiLCJzdGF0cyIsInJlY29tbWVuZCIsImhvdCIsIm5ld2VzdCIsIm9uTG9hZCIsIm9uUHVsbERvd25SZWZyZXNoIiwidW5pIiwibWV0aG9kcyIsImxvYWQiLCJ0aGF0IiwiUHJvbWlzZSIsImdvRGV0YWlsIiwidXJsIiwiZ29TZWFyY2giLCJnb0dyYXBoIiwiZ29TaGVsZiIsImdvQ2hhdCIsImdvUGxhdGZvcm0iLCJnb09yaWdpbmFsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBa0VBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztlQUNBO0VBQ0FBO0lBQUFDO0VBQUE7RUFDQUM7SUFBQTtNQUFBQztNQUFBQztNQUFBQztNQUFBQztNQUFBQztNQUFBQztNQUFBQztJQUFBO0VBQUE7RUFDQUM7SUFBQTtFQUFBO0VBQ0FDO0lBQUE7SUFBQTtNQUFBQztJQUFBO0VBQUE7RUFDQUM7SUFDQUM7TUFDQTtNQUNBQztNQUNBQTtNQUNBQyxhQUNBLG1EQUNBLGlEQUNBLGlEQUNBLHNDQUNBO1FBQ0FEO1FBQ0FBO1FBQ0FBO1FBQ0FBO01BQ0E7UUFDQUE7TUFDQTtRQUFBQTtRQUFBO01BQUE7SUFDQTtJQUNBRTtNQUFBTDtRQUFBTTtNQUFBO0lBQUE7SUFDQUM7TUFBQVA7UUFBQU07TUFBQTtJQUFBO0lBQ0FFO01BQUFSO1FBQUFNO01BQUE7SUFBQTtJQUNBRztNQUFBVDtRQUFBTTtNQUFBO0lBQUE7SUFDQUk7TUFBQVY7UUFBQU07TUFBQTtJQUFBO0lBQ0FLO01BQUFYO1FBQUFNO01BQUE7SUFBQTtJQUNBTTtNQUFBWjtRQUFBTTtNQUFBO0lBQUE7RUFDQTtBQUNBO0FBQUEiLCJmaWxlIjoiMTEuanMiLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XG4gIDx2aWV3IGNsYXNzPVwiY29udGFpbmVyIGhvbWUtcGFnZVwiPlxuICAgIDx2aWV3IGNsYXNzPVwiaGVyby1jYXJkXCI+XG4gICAgICA8dGV4dCBjbGFzcz1cImV5ZWJyb3dcIj5Lbm93bGVkZ2UgR3JhcGggwrcgUmVhZGluZyBFY29zeXN0ZW08L3RleHQ+XG4gICAgICA8dGV4dCBjbGFzcz1cImJpZ1wiPuefpeS6uuefpeS5pjwvdGV4dD5cbiAgICAgIDx0ZXh0IGNsYXNzPVwibXV0ZWQgaGVyby1kZXNjXCI+5o6o6I2Q44CB5pCc57Si44CB5Zu+6LCx44CB5Lmm5p6244CB6K+E6K6644CB6K+V6K+744CBQUkg6I2Q5Lmm5LiOIEFJIOWwj+ivtOW3peWdiumDveW3suaOpeWFpeenu+WKqOerr+OAgjwvdGV4dD5cbiAgICAgIDx2aWV3IGNsYXNzPVwiaGVyby1hY3Rpb25zXCI+XG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJidG5cIiBAY2xpY2s9XCJsb2FkXCI+5Yi35paw5o6o6I2QPC9idXR0b24+XG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gc2Vjb25kYXJ5XCIgQGNsaWNrPVwiZ29PcmlnaW5hbFwiPuWwj+ivtOW3peWdijwvYnV0dG9uPlxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIHNlY29uZGFyeVwiIEBjbGljaz1cImdvUGxhdGZvcm1cIj7ov57mjqXor4rmlq08L2J1dHRvbj5cbiAgICAgIDwvdmlldz5cbiAgICA8L3ZpZXc+XG5cbiAgICA8dmlldyB2LWlmPVwiZXJyb3JcIiBjbGFzcz1cImNhcmQgc3RhdHVzXCI+XG4gICAgICA8dGV4dCBjbGFzcz1cInN1Yi10aXRsZVwiPui/nuaOpeaPkOekujwvdGV4dD5cbiAgICAgIDx0ZXh0IGNsYXNzPVwibXV0ZWRcIj57eyBlcnJvciB9fTwvdGV4dD5cbiAgICAgIDx0ZXh0IGNsYXNzPVwibXV0ZWRcIj7lvZPliY3lkI7nq6/lnLDlnYDvvJp7eyBvcmlnaW4gfX08L3RleHQ+XG4gICAgPC92aWV3PlxuXG4gICAgPHZpZXcgY2xhc3M9XCJxdWljay1ncmlkXCI+XG4gICAgICA8dmlldyBjbGFzcz1cInF1aWNrLWl0ZW1cIiBAY2xpY2s9XCJnb1NlYXJjaFwiPjx0ZXh0PvCflI08L3RleHQ+PHRleHQ+5pCc57Si5Y+R546wPC90ZXh0Pjwvdmlldz5cbiAgICAgIDx2aWV3IGNsYXNzPVwicXVpY2staXRlbVwiIEBjbGljaz1cImdvR3JhcGhcIj48dGV4dD7wn5W477iPPC90ZXh0Pjx0ZXh0PuefpeivhuWbvuiwsTwvdGV4dD48L3ZpZXc+XG4gICAgICA8dmlldyBjbGFzcz1cInF1aWNrLWl0ZW1cIiBAY2xpY2s9XCJnb1NoZWxmXCI+PHRleHQ+8J+TmjwvdGV4dD48dGV4dD7miJHnmoTkuabmnrY8L3RleHQ+PC92aWV3PlxuICAgICAgPHZpZXcgY2xhc3M9XCJxdWljay1pdGVtXCIgQGNsaWNrPVwiZ29DaGF0XCI+PHRleHQ+8J+kljwvdGV4dD48dGV4dD5BSSDojZDkuaY8L3RleHQ+PC92aWV3PlxuICAgIDwvdmlldz5cblxuICAgIDx2aWV3IGNsYXNzPVwiY2FyZFwiIHYtaWY9XCJzdGF0c1wiPlxuICAgICAgPHZpZXcgY2xhc3M9XCJiZXR3ZWVuXCI+PHRleHQgY2xhc3M9XCJ0aXRsZVwiPuezu+e7n+amguiniDwvdGV4dD48dGV4dCBjbGFzcz1cImJhZGdlXCI+5a6e5pe2PC90ZXh0Pjwvdmlldz5cbiAgICAgIDx2aWV3IGNsYXNzPVwic3RhdC1ncmlkXCI+XG4gICAgICAgIDx2aWV3IGNsYXNzPVwic3RhdC1pdGVtXCI+PHRleHQgY2xhc3M9XCJzdGF0LW51bVwiPnt7IHN0YXRzLmJvb2tzIHx8IDAgfX08L3RleHQ+PHRleHQgY2xhc3M9XCJtdXRlZFwiPuWbvuS5pjwvdGV4dD48L3ZpZXc+XG4gICAgICAgIDx2aWV3IGNsYXNzPVwic3RhdC1pdGVtXCI+PHRleHQgY2xhc3M9XCJzdGF0LW51bVwiPnt7IHN0YXRzLmF1dGhvcnMgfHwgMCB9fTwvdGV4dD48dGV4dCBjbGFzcz1cIm11dGVkXCI+5L2c6ICFPC90ZXh0Pjwvdmlldz5cbiAgICAgICAgPHZpZXcgY2xhc3M9XCJzdGF0LWl0ZW1cIj48dGV4dCBjbGFzcz1cInN0YXQtbnVtXCI+e3sgc3RhdHMudGFncyB8fCAwIH19PC90ZXh0Pjx0ZXh0IGNsYXNzPVwibXV0ZWRcIj7moIfnrb48L3RleHQ+PC92aWV3PlxuICAgICAgICA8dmlldyBjbGFzcz1cInN0YXQtaXRlbVwiPjx0ZXh0IGNsYXNzPVwic3RhdC1udW1cIj57eyBzdGF0cy5yZWxhdGlvbnMgfHwgMCB9fTwvdGV4dD48dGV4dCBjbGFzcz1cIm11dGVkXCI+5YWz57O7PC90ZXh0Pjwvdmlldz5cbiAgICAgIDwvdmlldz5cbiAgICA8L3ZpZXc+XG5cbiAgICA8dmlldyBjbGFzcz1cInNlY3Rpb24taGVhZFwiPlxuICAgICAgPHRleHQgY2xhc3M9XCJzZWN0aW9uLXRpdGxlXCI+5Li65L2g5o6o6I2QPC90ZXh0PlxuICAgICAgPHRleHQgY2xhc3M9XCJtb3JlXCIgQGNsaWNrPVwiZ29TZWFyY2hcIj7mm7TlpJo8L3RleHQ+XG4gICAgPC92aWV3PlxuICAgIDx2aWV3IHYtaWY9XCJsb2FkaW5nXCIgY2xhc3M9XCJjYXJkXCI+PHRleHQgY2xhc3M9XCJtdXRlZFwiPuato+WcqOWKoOi9veaOqOiNkC4uLjwvdGV4dD48L3ZpZXc+XG4gICAgPEJvb2tDYXJkIHYtZm9yPVwiaXRlbSBpbiByZWNvbW1lbmRcIiA6a2V5PVwiJ3InK2l0ZW0uaWRcIiA6Ym9vaz1cIml0ZW1cIiBAY2xpY2s9XCJnb0RldGFpbFwiPjwvQm9va0NhcmQ+XG5cbiAgICA8dmlldyBjbGFzcz1cInNlY3Rpb24taGVhZFwiPjx0ZXh0IGNsYXNzPVwic2VjdGlvbi10aXRsZVwiPueDremXqOWbvuS5pjwvdGV4dD48L3ZpZXc+XG4gICAgPHNjcm9sbC12aWV3IHNjcm9sbC14IGNsYXNzPVwiaC1zY3JvbGxcIiBzaG93LXNjcm9sbGJhcj1cImZhbHNlXCI+XG4gICAgICA8dmlldyBjbGFzcz1cIm1pbmlcIiB2LWZvcj1cIml0ZW0gaW4gaG90XCIgOmtleT1cIidoJytpdGVtLmlkXCIgQGNsaWNrPVwiZ29EZXRhaWwoaXRlbSlcIj5cbiAgICAgICAgPGltYWdlIGNsYXNzPVwibWluaS1jb3ZlclwiIDpzcmM9XCJpdGVtLmNvdmVyX3VybFwiIG1vZGU9XCJhc3BlY3RGaWxsXCI+PC9pbWFnZT5cbiAgICAgICAgPHRleHQgY2xhc3M9XCJtaW5pLXRpdGxlXCI+e3sgaXRlbS50aXRsZSB9fTwvdGV4dD5cbiAgICAgICAgPHRleHQgY2xhc3M9XCJtaW5pLW1ldGFcIj7irZAge3sgaXRlbS5hdmdfcmF0aW5nIHx8IDAgfX08L3RleHQ+XG4gICAgICA8L3ZpZXc+XG4gICAgPC9zY3JvbGwtdmlldz5cblxuICAgIDx2aWV3IGNsYXNzPVwic2VjdGlvbi1oZWFkXCI+PHRleHQgY2xhc3M9XCJzZWN0aW9uLXRpdGxlXCI+5paw5Lmm5LiK5p62PC90ZXh0Pjwvdmlldz5cbiAgICA8Qm9va0NhcmQgdi1mb3I9XCJpdGVtIGluIG5ld2VzdFwiIDprZXk9XCInbicraXRlbS5pZFwiIDpib29rPVwiaXRlbVwiIEBjbGljaz1cImdvRGV0YWlsXCI+PC9Cb29rQ2FyZD5cblxuICAgIDx2aWV3IGNsYXNzPVwiY2FyZCBhaS1lbnRyeVwiIEBjbGljaz1cImdvT3JpZ2luYWxcIj5cbiAgICAgIDx2aWV3PlxuICAgICAgICA8dGV4dCBjbGFzcz1cInRpdGxlXCI+QUnlsI/or7Tlt6XlnYo8L3RleHQ+XG4gICAgICAgIDx0ZXh0IGNsYXNzPVwibXV0ZWRcIj7nlJ/miJDlsI/or7TjgIHnvJbovpHmraPmlofjgIHkv53lrZjliLDkuabmnrbjgII8L3RleHQ+XG4gICAgICA8L3ZpZXc+XG4gICAgICA8dGV4dCBjbGFzcz1cImFycm93XCI+6L+b5YWlID48L3RleHQ+XG4gICAgPC92aWV3PlxuICA8L3ZpZXc+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuaW1wb3J0IEJvb2tDYXJkIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvQm9va0NhcmQudnVlJ1xuaW1wb3J0IHsgcmVxdWVzdCwgbm9ybWFsaXplQm9va3MsIE9SSUdJTiB9IGZyb20gJy4uLy4uL2FwaS9yZXF1ZXN0LmpzJ1xuZXhwb3J0IGRlZmF1bHQge1xuICBjb21wb25lbnRzOiB7IEJvb2tDYXJkOiBCb29rQ2FyZCB9LFxuICBkYXRhOiBmdW5jdGlvbiAoKSB7IHJldHVybiB7IG9yaWdpbjogT1JJR0lOLCBsb2FkaW5nOiBmYWxzZSwgZXJyb3I6ICcnLCBzdGF0czogbnVsbCwgcmVjb21tZW5kOiBbXSwgaG90OiBbXSwgbmV3ZXN0OiBbXSB9IH0sXG4gIG9uTG9hZDogZnVuY3Rpb24gKCkgeyB0aGlzLmxvYWQoKSB9LFxuICBvblB1bGxEb3duUmVmcmVzaDogZnVuY3Rpb24gKCkgeyBjb25zdCB0aGF0ID0gdGhpczsgdGhpcy5sb2FkKGZ1bmN0aW9uICgpIHsgdW5pLnN0b3BQdWxsRG93blJlZnJlc2goKSB9KSB9LFxuICBtZXRob2RzOiB7XG4gICAgbG9hZDogZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgIGNvbnN0IHRoYXQgPSB0aGlzXG4gICAgICB0aGF0LmxvYWRpbmcgPSB0cnVlXG4gICAgICB0aGF0LmVycm9yID0gJydcbiAgICAgIFByb21pc2UuYWxsKFtcbiAgICAgICAgcmVxdWVzdCgnL3JlY29tbWVuZC9ob21lP2xpbWl0PTEwJyksXG4gICAgICAgIHJlcXVlc3QoJy9yZWNvbW1lbmQvaG90P2xpbWl0PTgnKSxcbiAgICAgICAgcmVxdWVzdCgnL3JlY29tbWVuZC9uZXc/bGltaXQ9NicpLFxuICAgICAgICByZXF1ZXN0KCcvZ3JhcGgvc3RhdHMnKVxuICAgICAgXSkudGhlbihmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgIHRoYXQucmVjb21tZW5kID0gbm9ybWFsaXplQm9va3MoKHJlc1swXSAmJiByZXNbMF0uaXRlbXMpIHx8IFtdKVxuICAgICAgICB0aGF0LmhvdCA9IG5vcm1hbGl6ZUJvb2tzKChyZXNbMV0gJiYgcmVzWzFdLml0ZW1zKSB8fCBbXSlcbiAgICAgICAgdGhhdC5uZXdlc3QgPSBub3JtYWxpemVCb29rcygocmVzWzJdICYmIHJlc1syXS5pdGVtcykgfHwgW10pXG4gICAgICAgIHRoYXQuc3RhdHMgPSByZXNbM10gfHwgbnVsbFxuICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgdGhhdC5lcnJvciA9IGUubWVzc2FnZSB8fCAn6aaW6aG15pWw5o2u5Yqg6L295aSx6LSl77yM6K+356Gu6K6k5ZCO56uv5bey5ZCv5Yqo44CCJ1xuICAgICAgfSkudGhlbihmdW5jdGlvbiAoKSB7IHRoYXQubG9hZGluZyA9IGZhbHNlOyBpZiAoZG9uZSkgZG9uZSgpIH0pXG4gICAgfSxcbiAgICBnb0RldGFpbDogZnVuY3Rpb24gKGJvb2spIHsgdW5pLm5hdmlnYXRlVG8oeyB1cmw6ICcvcGFnZXMvZGV0YWlsL2RldGFpbD9pZD0nICsgKGJvb2suaWQgfHwgYm9vay5ib29rX2lkKSB9KSB9LFxuICAgIGdvU2VhcmNoOiBmdW5jdGlvbiAoKSB7IHVuaS5zd2l0Y2hUYWIoeyB1cmw6ICcvcGFnZXMvc2VhcmNoL3NlYXJjaCcgfSkgfSxcbiAgICBnb0dyYXBoOiBmdW5jdGlvbiAoKSB7IHVuaS5zd2l0Y2hUYWIoeyB1cmw6ICcvcGFnZXMvZ3JhcGgvZ3JhcGgnIH0pIH0sXG4gICAgZ29TaGVsZjogZnVuY3Rpb24gKCkgeyB1bmkuc3dpdGNoVGFiKHsgdXJsOiAnL3BhZ2VzL3NoZWxmL3NoZWxmJyB9KSB9LFxuICAgIGdvQ2hhdDogZnVuY3Rpb24gKCkgeyB1bmkubmF2aWdhdGVUbyh7IHVybDogJy9wYWdlcy9jaGF0L2NoYXQnIH0pIH0sXG4gICAgZ29QbGF0Zm9ybTogZnVuY3Rpb24gKCkgeyB1bmkubmF2aWdhdGVUbyh7IHVybDogJy9wYWdlcy9wbGF0Zm9ybS9wbGF0Zm9ybScgfSkgfSxcbiAgICBnb09yaWdpbmFsOiBmdW5jdGlvbiAoKSB7IHVuaS5uYXZpZ2F0ZVRvKHsgdXJsOiAnL3BhZ2VzL29yaWdpbmFsL29yaWdpbmFsJyB9KSB9XG4gIH1cbn1cbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuLmhvbWUtcGFnZXtwYWRkaW5nLWJvdHRvbTpjYWxjKDMycnB4ICsgZW52KHNhZmUtYXJlYS1pbnNldC1ib3R0b20pKX0uaGVyby1jYXJke3BhZGRpbmc6MzRycHg7bWFyZ2luLWJvdHRvbToyMnJweDtib3JkZXItcmFkaXVzOjM2cnB4O2JhY2tncm91bmQ6bGluZWFyLWdyYWRpZW50KDEzNWRlZywjZmZmLCNlZWY2ZmYgNDglLCNmM2U4ZmYpO2JveC1zaGFkb3c6MCAyMHJweCA1NHJweCByZ2JhKDE1LDIzLDQyLC4wOSl9LmV5ZWJyb3d7ZGlzcGxheTpibG9jaztjb2xvcjojN2MzYWVkO2ZvbnQtc2l6ZToyMnJweDtmb250LXdlaWdodDo5MDA7bWFyZ2luLWJvdHRvbToxMHJweH0uYmlne2Rpc3BsYXk6YmxvY2s7Zm9udC1zaXplOjU4cnB4O2ZvbnQtd2VpZ2h0OjkwMDtjb2xvcjojMTExODI3O21hcmdpbi1ib3R0b206MTJycHg7bGV0dGVyLXNwYWNpbmc6LTJycHh9Lmhlcm8tZGVzY3ttYXgtd2lkdGg6NjIwcnB4fS5oZXJvLWFjdGlvbnN7ZGlzcGxheTpmbGV4O2dhcDoxNHJweDttYXJnaW4tdG9wOjI2cnB4fS5oZXJvLWFjdGlvbnMgLmJ0bntmbGV4OjE7Zm9udC1zaXplOjI0cnB4O3BhZGRpbmc6MCA4cnB4fS5xdWljay1ncmlke2Rpc3BsYXk6Z3JpZDtncmlkLXRlbXBsYXRlLWNvbHVtbnM6cmVwZWF0KDQsbWlubWF4KDAsMWZyKSk7Z2FwOjE0cnB4O21hcmdpbi1ib3R0b206MjJycHh9LnF1aWNrLWl0ZW17bWluLXdpZHRoOjA7Ym94LXNpemluZzpib3JkZXItYm94O2Rpc3BsYXk6ZmxleDtmbGV4LWRpcmVjdGlvbjpjb2x1bW47YWxpZ24taXRlbXM6Y2VudGVyO2p1c3RpZnktY29udGVudDpjZW50ZXI7Z2FwOjhycHg7cGFkZGluZzoyMHJweCA0cnB4O2JvcmRlci1yYWRpdXM6MjRycHg7YmFja2dyb3VuZDojZmZmO2JveC1zaGFkb3c6MCAxMnJweCAzMnJweCByZ2JhKDE1LDIzLDQyLC4wNyl9LnF1aWNrLWl0ZW0gdGV4dDpmaXJzdC1jaGlsZHtmb250LXNpemU6MzRycHh9LnF1aWNrLWl0ZW0gdGV4dDpsYXN0LWNoaWxke2ZvbnQtc2l6ZToyMXJweDtmb250LXdlaWdodDo5MDA7Y29sb3I6IzM0NDA1NDt3aGl0ZS1zcGFjZTpub3dyYXB9LmJhZGdle3BhZGRpbmc6OHJweCAxNHJweDtib3JkZXItcmFkaXVzOjk5OXJweDtiYWNrZ3JvdW5kOiNlZGU5ZmU7Y29sb3I6IzZkMjhkOTtmb250LXNpemU6MjJycHg7Zm9udC13ZWlnaHQ6OTAwfS5zZWN0aW9uLWhlYWR7ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcjtqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYmV0d2VlbjttYXJnaW46MjhycHggNHJweCAxNnJweH0uc2VjdGlvbi10aXRsZXtmb250LXNpemU6MzRycHg7Zm9udC13ZWlnaHQ6OTAwO2NvbG9yOiMxMTE4Mjd9Lm1vcmV7Y29sb3I6IzdjM2FlZDtmb250LXdlaWdodDo5MDB9Lmgtc2Nyb2xse3doaXRlLXNwYWNlOm5vd3JhcDttYXJnaW4tYm90dG9tOjEwcnB4fS5taW5pe2Rpc3BsYXk6aW5saW5lLWZsZXg7dmVydGljYWwtYWxpZ246dG9wO3dpZHRoOjE4MHJweDttYXJnaW4tcmlnaHQ6MTZycHg7cGFkZGluZzoxNHJweDtib3JkZXItcmFkaXVzOjI0cnB4O2JhY2tncm91bmQ6I2ZmZjtib3gtc2hhZG93OjAgMTJycHggMzJycHggcmdiYSgxNSwyMyw0MiwuMDcpO2ZsZXgtZGlyZWN0aW9uOmNvbHVtbn0ubWluaS1jb3Zlcnt3aWR0aDoxNTBycHg7aGVpZ2h0OjIxMHJweDtib3JkZXItcmFkaXVzOjE4cnB4O2JhY2tncm91bmQ6I2U1ZTdlYn0ubWluaS10aXRsZXtkaXNwbGF5OmJsb2NrO2ZvbnQtc2l6ZToyNHJweDtmb250LXdlaWdodDo5MDA7Y29sb3I6IzExMTgyNzttYXJnaW4tdG9wOjEwcnB4O2xpbmUtaGVpZ2h0OjEuMjU7d2hpdGUtc3BhY2U6bm9ybWFsO2hlaWdodDo2MHJweDtvdmVyZmxvdzpoaWRkZW59Lm1pbmktbWV0YXtkaXNwbGF5OmJsb2NrO2NvbG9yOiM2NjcwODU7Zm9udC1zaXplOjIycnB4O21hcmdpbi10b3A6NHJweH0uYWktZW50cnl7ZGlzcGxheTpmbGV4O2p1c3RpZnktY29udGVudDpzcGFjZS1iZXR3ZWVuO2FsaWduLWl0ZW1zOmNlbnRlcjtiYWNrZ3JvdW5kOmxpbmVhci1ncmFkaWVudCgxMzVkZWcsI2VkZTlmZSwjZTBmMmZlKX0uYXJyb3d7Y29sb3I6IzdjM2FlZDtmb250LXNpemU6MjZycHg7Zm9udC13ZWlnaHQ6OTAwfUBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6MzgwcHgpey5xdWljay1ncmlke2dhcDoxMHJweH0ucXVpY2staXRlbXtwYWRkaW5nOjE4cnB4IDJycHg7Ym9yZGVyLXJhZGl1czoyMHJweH0ucXVpY2staXRlbSB0ZXh0OmZpcnN0LWNoaWxke2ZvbnQtc2l6ZTozMXJweH0ucXVpY2staXRlbSB0ZXh0Omxhc3QtY2hpbGR7Zm9udC1zaXplOjE5cnB4fS5oZXJvLWFjdGlvbnN7ZGlzcGxheTpibG9ja30uaGVyby1hY3Rpb25zIC5idG57bWFyZ2luLWJvdHRvbToxMnJweH19XG48L3N0eWxlPlxuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///11\n");

/***/ }),
/* 12 */
/*!*****************************************************************************!*\
  !*** E:/翻译漫画/book-main (14)/book-main/frontend-uni/components/BookCard.vue ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _BookCard_vue_vue_type_template_id_12d66174_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BookCard.vue?vue&type=template&id=12d66174&scoped=true& */ 13);\n/* harmony import */ var _BookCard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BookCard.vue?vue&type=script&lang=js& */ 15);\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _BookCard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if([\"default\"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _BookCard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n/* harmony import */ var _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 18);\n\nvar renderjs\n\n\n\n\n/* normalize component */\n\nvar component = Object(_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\n  _BookCard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _BookCard_vue_vue_type_template_id_12d66174_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _BookCard_vue_vue_type_template_id_12d66174_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  \"12d66174\",\n  null,\n  false,\n  _BookCard_vue_vue_type_template_id_12d66174_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"components\"],\n  renderjs\n)\n\ncomponent.options.__file = \"components/BookCard.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbbnVsbF0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBaUk7QUFDakk7QUFDNEQ7QUFDTDs7O0FBR3ZEO0FBQzZMO0FBQzdMLGdCQUFnQix1TUFBVTtBQUMxQixFQUFFLDhFQUFNO0FBQ1IsRUFBRSwrRkFBTTtBQUNSLEVBQUUsd0dBQWU7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUUsbUdBQVU7QUFDWjtBQUNBOztBQUVBO0FBQ2UsZ0YiLCJmaWxlIjoiMTIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucywgcmVjeWNsYWJsZVJlbmRlciwgY29tcG9uZW50cyB9IGZyb20gXCIuL0Jvb2tDYXJkLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD0xMmQ2NjE3NCZzY29wZWQ9dHJ1ZSZcIlxudmFyIHJlbmRlcmpzXG5pbXBvcnQgc2NyaXB0IGZyb20gXCIuL0Jvb2tDYXJkLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuZXhwb3J0ICogZnJvbSBcIi4vQm9va0NhcmQudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5cblxuLyogbm9ybWFsaXplIGNvbXBvbmVudCAqL1xuaW1wb3J0IG5vcm1hbGl6ZXIgZnJvbSBcIiEuLi8uLi8uLi8uLi9IQnVpbGRlclguNS4wNy4yMDI2MDQxMDA2L0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvdnVlLWxvYWRlci9saWIvcnVudGltZS9jb21wb25lbnROb3JtYWxpemVyLmpzXCJcbnZhciBjb21wb25lbnQgPSBub3JtYWxpemVyKFxuICBzY3JpcHQsXG4gIHJlbmRlcixcbiAgc3RhdGljUmVuZGVyRm5zLFxuICBmYWxzZSxcbiAgbnVsbCxcbiAgXCIxMmQ2NjE3NFwiLFxuICBudWxsLFxuICBmYWxzZSxcbiAgY29tcG9uZW50cyxcbiAgcmVuZGVyanNcbilcblxuY29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJjb21wb25lbnRzL0Jvb2tDYXJkLnZ1ZVwiXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///12\n");

/***/ }),
/* 13 */
/*!************************************************************************************************************************!*\
  !*** E:/翻译漫画/book-main (14)/book-main/frontend-uni/components/BookCard.vue?vue&type=template&id=12d66174&scoped=true& ***!
  \************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_0_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_BookCard_vue_vue_type_template_id_12d66174_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--11-0!../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/filter-modules-template.js!../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./BookCard.vue?vue&type=template&id=12d66174&scoped=true& */ 14);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_0_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_BookCard_vue_vue_type_template_id_12d66174_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_0_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_BookCard_vue_vue_type_template_id_12d66174_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_0_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_BookCard_vue_vue_type_template_id_12d66174_scoped_true___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_0_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_BookCard_vue_vue_type_template_id_12d66174_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),
/* 14 */
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--11-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/filter-modules-template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!E:/翻译漫画/book-main (14)/book-main/frontend-uni/components/BookCard.vue?vue&type=template&id=12d66174&scoped=true& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "view",
    {
      staticClass: _vm._$s(0, "sc", "book-card"),
      attrs: { _i: 0 },
      on: { click: _vm.tap },
    },
    [
      _c("image", {
        staticClass: _vm._$s(1, "sc", "cover"),
        attrs: { src: _vm._$s(1, "a-src", _vm.cover), _i: 1 },
      }),
      _c("view", { staticClass: _vm._$s(2, "sc", "info"), attrs: { _i: 2 } }, [
        _c(
          "view",
          {
            staticClass: _vm._$s(3, "sc", "between top-line"),
            attrs: { _i: 3 },
          },
          [
            _c(
              "text",
              { staticClass: _vm._$s(4, "sc", "name"), attrs: { _i: 4 } },
              [
                _vm._v(
                  _vm._$s(4, "t0-0", _vm._s(_vm.book.title || "未命名图书"))
                ),
              ]
            ),
            _vm._$s(5, "i", _vm.book.is_new)
              ? _c("text", {
                  staticClass: _vm._$s(5, "sc", "new"),
                  attrs: { _i: 5 },
                })
              : _vm._e(),
          ]
        ),
        _c(
          "text",
          { staticClass: _vm._$s(6, "sc", "meta"), attrs: { _i: 6 } },
          [
            _vm._v(
              _vm._$s(6, "t0-0", _vm._s(_vm.author)) +
                _vm._$s(6, "t0-1", _vm._s(_vm.book.category || "图书")) +
                _vm._$s(6, "t0-2", _vm._s(_vm.book.avg_rating || 0))
            ),
          ]
        ),
        _vm._$s(7, "i", _vm.tags.length)
          ? _c(
              "view",
              { staticClass: _vm._$s(7, "sc", "tags"), attrs: { _i: 7 } },
              _vm._l(
                _vm._$s(8, "f", { forItems: _vm.tags }),
                function (t, $10, $20, $30) {
                  return _c(
                    "text",
                    {
                      key: _vm._$s(8, "f", { forIndex: $20, key: t }),
                      staticClass: _vm._$s("8-" + $30, "sc", "tag"),
                      attrs: { _i: "8-" + $30 },
                    },
                    [_vm._v(_vm._$s("8-" + $30, "t0-0", _vm._s(t)))]
                  )
                }
              ),
              0
            )
          : _vm._e(),
        _c(
          "text",
          { staticClass: _vm._$s(9, "sc", "desc"), attrs: { _i: 9 } },
          [
            _vm._v(
              _vm._$s(
                9,
                "t0-0",
                _vm._s(_vm.book.reason || _vm.book.description || "暂无简介")
              )
            ),
          ]
        ),
      ]),
    ]
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),
/* 15 */
/*!******************************************************************************************************!*\
  !*** E:/翻译漫画/book-main (14)/book-main/frontend-uni/components/BookCard.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_1_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_BookCard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--7-1!../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/using-components.js!../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./BookCard.vue?vue&type=script&lang=js& */ 16);\n/* harmony import */ var _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_1_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_BookCard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_1_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_BookCard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_1_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_BookCard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if([\"default\"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_1_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_BookCard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n /* harmony default export */ __webpack_exports__[\"default\"] = (_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_1_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_BookCard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); //# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbbnVsbF0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQTRvQixDQUFnQixzcUJBQUcsRUFBQyIsImZpbGUiOiIxNS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vLi4vSEJ1aWxkZXJYLjUuMDcuMjAyNjA0MTAwNi9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzIS4uLy4uLy4uLy4uL0hCdWlsZGVyWC41LjA3LjIwMjYwNDEwMDYvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy93ZWJwYWNrLXByZXByb2Nlc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTctMSEuLi8uLi8uLi8uLi9IQnVpbGRlclguNS4wNy4yMDI2MDQxMDA2L0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvd2VicGFjay11bmktYXBwLWxvYWRlci91c2luZy1jb21wb25lbnRzLmpzIS4uLy4uLy4uLy4uL0hCdWlsZGVyWC41LjA3LjIwMjYwNDEwMDYvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vQm9va0NhcmQudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uL0hCdWlsZGVyWC41LjA3LjIwMjYwNDEwMDYvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcyEuLi8uLi8uLi8uLi9IQnVpbGRlclguNS4wNy4yMDI2MDQxMDA2L0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvd2VicGFjay1wcmVwcm9jZXNzLWxvYWRlci9pbmRleC5qcz8/cmVmLS03LTEhLi4vLi4vLi4vLi4vSEJ1aWxkZXJYLjUuMDcuMjAyNjA0MTAwNi9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vdnVlLWNsaS1wbHVnaW4tdW5pL3BhY2thZ2VzL3dlYnBhY2stdW5pLWFwcC1sb2FkZXIvdXNpbmctY29tcG9uZW50cy5qcyEuLi8uLi8uLi8uLi9IQnVpbGRlclguNS4wNy4yMDI2MDQxMDA2L0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0Jvb2tDYXJkLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///15\n");

/***/ }),
/* 16 */
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--7-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/using-components.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!E:/翻译漫画/book-main (14)/book-main/frontend-uni/components/BookCard.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\nvar _request = __webpack_require__(/*! ../api/request.js */ 17);\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\nvar _default2 = {\n  name: 'BookCard',\n  props: {\n    book: {\n      type: Object,\n      default: function _default() {\n        return {};\n      }\n    }\n  },\n  computed: {\n    cover: function cover() {\n      return (0, _request.toAbsoluteUrl)(this.book.cover_thumb_url || this.book.cover_url || this.book.cover || '');\n    },\n    author: function author() {\n      if (this.book.author) return this.book.author;\n      if (Array.isArray(this.book.authors)) return this.book.authors.join('、') || '未知作者';\n      return '未知作者';\n    },\n    tags: function tags() {\n      return Array.isArray(this.book.tags) ? this.book.tags.slice(0, 3) : [];\n    }\n  },\n  methods: {\n    tap: function tap() {\n      this.$emit('click', this.book);\n    }\n  }\n};\nexports.default = _default2;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVuaS1hcHA6Ly8vY29tcG9uZW50cy9Cb29rQ2FyZC52dWUiXSwibmFtZXMiOlsibmFtZSIsInByb3BzIiwiYm9vayIsInR5cGUiLCJkZWZhdWx0IiwiY29tcHV0ZWQiLCJjb3ZlciIsImF1dGhvciIsInRhZ3MiLCJtZXRob2RzIiwidGFwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFrQkE7Ozs7Ozs7Ozs7Ozs7Ozs7OztnQkFDQTtFQUNBQTtFQUNBQztJQUFBQztNQUFBQztNQUFBQztRQUFBO01BQUE7SUFBQTtFQUFBO0VBQ0FDO0lBQ0FDO01BQUE7SUFBQTtJQUNBQztNQUNBO01BQ0E7TUFDQTtJQUNBO0lBQ0FDO01BQUE7SUFBQTtFQUNBO0VBQ0FDO0lBQUFDO01BQUE7SUFBQTtFQUFBO0FBQ0E7QUFBQSIsImZpbGUiOiIxNi5qcyIsInNvdXJjZXNDb250ZW50IjpbIjx0ZW1wbGF0ZT5cbiAgPHZpZXcgY2xhc3M9XCJib29rLWNhcmRcIiBAY2xpY2s9XCJ0YXBcIj5cbiAgICA8aW1hZ2UgY2xhc3M9XCJjb3ZlclwiIDpzcmM9XCJjb3ZlclwiIG1vZGU9XCJhc3BlY3RGaWxsXCI+PC9pbWFnZT5cbiAgICA8dmlldyBjbGFzcz1cImluZm9cIj5cbiAgICAgIDx2aWV3IGNsYXNzPVwiYmV0d2VlbiB0b3AtbGluZVwiPlxuICAgICAgICA8dGV4dCBjbGFzcz1cIm5hbWVcIj57eyBib29rLnRpdGxlIHx8ICfmnKrlkb3lkI3lm77kuaYnIH19PC90ZXh0PlxuICAgICAgICA8dGV4dCB2LWlmPVwiYm9vay5pc19uZXdcIiBjbGFzcz1cIm5ld1wiPuaWsDwvdGV4dD5cbiAgICAgIDwvdmlldz5cbiAgICAgIDx0ZXh0IGNsYXNzPVwibWV0YVwiPnt7IGF1dGhvciB9fSDCtyB7eyBib29rLmNhdGVnb3J5IHx8ICflm77kuaYnIH19IMK3IOKtkCB7eyBib29rLmF2Z19yYXRpbmcgfHwgMCB9fTwvdGV4dD5cbiAgICAgIDx2aWV3IGNsYXNzPVwidGFnc1wiIHYtaWY9XCJ0YWdzLmxlbmd0aFwiPlxuICAgICAgICA8dGV4dCB2LWZvcj1cInQgaW4gdGFnc1wiIDprZXk9XCJ0XCIgY2xhc3M9XCJ0YWdcIj57eyB0IH19PC90ZXh0PlxuICAgICAgPC92aWV3PlxuICAgICAgPHRleHQgY2xhc3M9XCJkZXNjXCI+e3sgYm9vay5yZWFzb24gfHwgYm9vay5kZXNjcmlwdGlvbiB8fCAn5pqC5peg566A5LuLJyB9fTwvdGV4dD5cbiAgICA8L3ZpZXc+XG4gIDwvdmlldz5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5pbXBvcnQgeyB0b0Fic29sdXRlVXJsIH0gZnJvbSAnLi4vYXBpL3JlcXVlc3QuanMnXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdCb29rQ2FyZCcsXG4gIHByb3BzOiB7IGJvb2s6IHsgdHlwZTogT2JqZWN0LCBkZWZhdWx0OiBmdW5jdGlvbiAoKSB7IHJldHVybiB7fSB9IH0gfSxcbiAgY29tcHV0ZWQ6IHtcbiAgICBjb3ZlcjogZnVuY3Rpb24gKCkgeyByZXR1cm4gdG9BYnNvbHV0ZVVybCh0aGlzLmJvb2suY292ZXJfdGh1bWJfdXJsIHx8IHRoaXMuYm9vay5jb3Zlcl91cmwgfHwgdGhpcy5ib29rLmNvdmVyIHx8ICcnKSB9LFxuICAgIGF1dGhvcjogZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHRoaXMuYm9vay5hdXRob3IpIHJldHVybiB0aGlzLmJvb2suYXV0aG9yXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheSh0aGlzLmJvb2suYXV0aG9ycykpIHJldHVybiB0aGlzLmJvb2suYXV0aG9ycy5qb2luKCfjgIEnKSB8fCAn5pyq55+l5L2c6ICFJ1xuICAgICAgcmV0dXJuICfmnKrnn6XkvZzogIUnXG4gICAgfSxcbiAgICB0YWdzOiBmdW5jdGlvbiAoKSB7IHJldHVybiBBcnJheS5pc0FycmF5KHRoaXMuYm9vay50YWdzKSA/IHRoaXMuYm9vay50YWdzLnNsaWNlKDAsIDMpIDogW10gfVxuICB9LFxuICBtZXRob2RzOiB7IHRhcDogZnVuY3Rpb24gKCkgeyB0aGlzLiRlbWl0KCdjbGljaycsIHRoaXMuYm9vaykgfSB9XG59XG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cbi5ib29rLWNhcmR7ZGlzcGxheTpmbGV4O2dhcDoyMHJweDtwYWRkaW5nOjIycnB4O21hcmdpbi1ib3R0b206MjBycHg7Ym9yZGVyLXJhZGl1czozMHJweDtiYWNrZ3JvdW5kOnJnYmEoMjU1LDI1NSwyNTUsLjk2KTtib3gtc2hhZG93OjAgMTZycHggNDBycHggcmdiYSgxNSwyMyw0MiwuMDgpO2JvcmRlcjoxcnB4IHNvbGlkIHJnYmEoMjI2LDIzMiwyNDAsLjgpfS5jb3Zlcnt3aWR0aDoxMzJycHg7aGVpZ2h0OjE4NHJweDtib3JkZXItcmFkaXVzOjIwcnB4O2JhY2tncm91bmQ6bGluZWFyLWdyYWRpZW50KDEzNWRlZywjMWUyOTNiLCM3YzNhZWQpO2ZsZXgtc2hyaW5rOjB9LmluZm97ZmxleDoxO21pbi13aWR0aDowfS50b3AtbGluZXthbGlnbi1pdGVtczpmbGV4LXN0YXJ0fS5uYW1le2Rpc3BsYXk6YmxvY2s7ZmxleDoxO2ZvbnQtc2l6ZTozMXJweDtmb250LXdlaWdodDo5MDA7Y29sb3I6IzExMTgyNzttYXJnaW4tYm90dG9tOjEwcnB4O2xpbmUtaGVpZ2h0OjEuMzU7bWF4LWhlaWdodDo4NHJweDtvdmVyZmxvdzpoaWRkZW59Lm5ld3tiYWNrZ3JvdW5kOiNmOTczMTY7Y29sb3I6I2ZmZjtib3JkZXItcmFkaXVzOjk5OXJweDtwYWRkaW5nOjRycHggMTBycHg7Zm9udC1zaXplOjIwcnB4O2ZvbnQtd2VpZ2h0OjkwMH0ubWV0YXtkaXNwbGF5OmJsb2NrO2NvbG9yOiM2NjcwODU7Zm9udC1zaXplOjIzcnB4O21hcmdpbi1ib3R0b206MTBycHg7bGluZS1oZWlnaHQ6MS4zNX0udGFnc3tkaXNwbGF5OmZsZXg7Z2FwOjhycHg7ZmxleC13cmFwOndyYXB9LnRhZ3tmb250LXNpemU6MjBycHg7cGFkZGluZzo2cnB4IDEycnB4O2JvcmRlci1yYWRpdXM6OTk5cnB4O2JhY2tncm91bmQ6I2YyZjRmNztjb2xvcjojNDc1NDY3fS5kZXNje2Rpc3BsYXk6YmxvY2s7bWFyZ2luLXRvcDoxMHJweDtjb2xvcjojNDc1NDY3O2ZvbnQtc2l6ZToyM3JweDtsaW5lLWhlaWdodDoxLjU7bWF4LWhlaWdodDo3MHJweDtvdmVyZmxvdzpoaWRkZW59XG48L3N0eWxlPlxuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///16\n");

/***/ }),
/* 17 */
/*!********************************************************************!*\
  !*** E:/翻译漫画/book-main (14)/book-main/frontend-uni/api/request.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 1);\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.USE_PROD = exports.SERVER_ORIGIN = exports.PROD_ORIGIN = exports.ORIGIN = exports.LOCAL_ORIGIN = exports.LAN_ORIGIN = exports.API_BASE = void 0;\nexports.formatDate = formatDate;\nexports.getPlatformLabel = getPlatformLabel;\nexports.getPlatformName = getPlatformName;\nexports.getToken = getToken;\nexports.getUser = getUser;\nexports.healthCheck = healthCheck;\nexports.isAdmin = isAdmin;\nexports.logout = logout;\nexports.normalizeBook = normalizeBook;\nexports.normalizeBooks = normalizeBooks;\nexports.request = request;\nexports.requireLogin = requireLogin;\nexports.saveLogin = saveLogin;\nexports.showError = showError;\nexports.systemInfo = systemInfo;\nexports.toAbsoluteUrl = toAbsoluteUrl;\nexports.uploadFile = uploadFile;\nvar _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 4));\nvar LOCAL_ORIGIN = 'http://127.0.0.1:8000';\n\n// Android 真机、iPhone 真机、微信开发者工具连接电脑后端时，用电脑 ipconfig 里“有默认网关”的 IPv4。\n// 你之前可用的 WLAN 地址是 10.242.11.113；如果换了网络，只改这里即可。\nexports.LOCAL_ORIGIN = LOCAL_ORIGIN;\nvar LAN_ORIGIN = 'http://192.168.139.11:8000';\n\n// 后续部署到服务器后，把 USE_PROD 改为 true，并把 PROD_ORIGIN 改成 HTTPS 域名。\n// 微信小程序正式预览/发布、iOS 正式打包都建议使用 HTTPS。\nexports.LAN_ORIGIN = LAN_ORIGIN;\nvar PROD_ORIGIN = 'https://你的线上域名';\nexports.PROD_ORIGIN = PROD_ORIGIN;\nvar USE_PROD = false;\nexports.USE_PROD = USE_PROD;\nfunction systemInfo() {\n  try {\n    return uni.getSystemInfoSync() || {};\n  } catch (e) {\n    return {};\n  }\n}\nfunction getPlatformName() {\n  var name = 'h5';\n  var sys = systemInfo();\n  name = sys.platform === 'ios' ? 'ios' : 'android';\n  return name;\n}\nfunction getPlatformLabel() {\n  var map = {\n    h5: '浏览器 H5',\n    android: 'Android App',\n    ios: 'iOS App',\n    'mp-weixin': '微信小程序'\n  };\n  return map[getPlatformName()] || getPlatformName();\n}\nfunction resolveOrigin() {\n  if (USE_PROD) return PROD_ORIGIN.replace(/\\/$/, '');\n  return getPlatformName() === 'h5' ? LOCAL_ORIGIN : LAN_ORIGIN;\n}\nvar ORIGIN = resolveOrigin();\nexports.ORIGIN = ORIGIN;\nvar SERVER_ORIGIN = ORIGIN;\nexports.SERVER_ORIGIN = SERVER_ORIGIN;\nvar API_BASE = ORIGIN + '/api/v1';\nexports.API_BASE = API_BASE;\nfunction getToken() {\n  return uni.getStorageSync('token') || '';\n}\nfunction getUser() {\n  var raw = uni.getStorageSync('user');\n  if (!raw) return null;\n  if ((0, _typeof2.default)(raw) === 'object') return raw;\n  try {\n    return JSON.parse(raw);\n  } catch (e) {\n    return null;\n  }\n}\nfunction saveLogin(data) {\n  if (data && data.access_token) uni.setStorageSync('token', data.access_token);\n  if (data && data.user) uni.setStorageSync('user', data.user);\n}\nfunction logout() {\n  uni.removeStorageSync('token');\n  uni.removeStorageSync('user');\n}\nfunction toAbsoluteUrl(url) {\n  if (!url) return '';\n  if (url.indexOf('data:') === 0) return url;\n  if (url.indexOf('http://') === 0 || url.indexOf('https://') === 0) return url;\n  if (url.charAt(0) === '/') return ORIGIN + url;\n  return ORIGIN + '/' + url;\n}\nfunction normalizeBook(book) {\n  book = book || {};\n  var authors = Array.isArray(book.authors) ? book.authors : [];\n  return Object.assign({}, book, {\n    id: book.id || book.book_id,\n    book_id: book.book_id || book.id,\n    author: book.author || authors.join('、') || '未知作者',\n    cover_url: toAbsoluteUrl(book.cover_thumb_url || book.cover_url || book.cover || book.image_url || ''),\n    tags: Array.isArray(book.tags) ? book.tags : [],\n    avg_rating: book.avg_rating || 0,\n    category: book.category || '图书'\n  });\n}\nfunction normalizeBooks(list) {\n  if (!Array.isArray(list)) return [];\n  return list.map(function (x) {\n    return normalizeBook(x.book || x);\n  });\n}\nfunction makeRequestUrl(path) {\n  if (!path) return API_BASE;\n  if (path.indexOf('http://') === 0 || path.indexOf('https://') === 0) return path;\n  if (path.indexOf('/api/v1') === 0) return ORIGIN + path;\n  if (path.charAt(0) !== '/') path = '/' + path;\n  return API_BASE + path;\n}\nfunction request(path, options) {\n  options = options || {};\n  var method = options.method || 'GET';\n  var data = options.data || options.body || undefined;\n  var token = getToken();\n  var header = Object.assign({}, options.header || {});\n  header['Content-Type'] = header['Content-Type'] || 'application/json';\n  header['X-Client-Platform'] = getPlatformName();\n  if (token) header.Authorization = 'Bearer ' + token;\n  return new Promise(function (resolve, reject) {\n    uni.request({\n      url: makeRequestUrl(path),\n      method: method,\n      data: data,\n      header: header,\n      timeout: options.timeout || 18000,\n      success: function success(res) {\n        if (res.statusCode >= 200 && res.statusCode < 300) {\n          resolve(res.data || {});\n        } else {\n          var msg = res.data && (res.data.detail || res.data.message) || '请求失败：' + res.statusCode;\n          reject(new Error(msg));\n        }\n      },\n      fail: function fail(err) {\n        reject(new Error(err && err.errMsg || '网络请求失败，请检查后端地址和防火墙'));\n      }\n    });\n  });\n}\nfunction healthCheck() {\n  return new Promise(function (resolve, reject) {\n    uni.request({\n      url: ORIGIN + '/health',\n      method: 'GET',\n      timeout: 8000,\n      success: function success(res) {\n        if (res.statusCode >= 200 && res.statusCode < 300) resolve(res.data || {\n          ok: true\n        });else reject(new Error('健康检查失败：' + res.statusCode));\n      },\n      fail: function fail(err) {\n        reject(new Error(err && err.errMsg || '无法连接后端'));\n      }\n    });\n  });\n}\nfunction uploadFile(path, filePath, formData) {\n  var token = getToken();\n  var header = {\n    'X-Client-Platform': getPlatformName()\n  };\n  if (token) header.Authorization = 'Bearer ' + token;\n  return new Promise(function (resolve, reject) {\n    uni.uploadFile({\n      url: makeRequestUrl(path),\n      filePath: filePath,\n      name: 'file',\n      formData: formData || {},\n      header: header,\n      success: function success(res) {\n        if (res.statusCode >= 200 && res.statusCode < 300) {\n          try {\n            resolve(JSON.parse(res.data || '{}'));\n          } catch (e) {\n            resolve(res.data || {});\n          }\n        } else {\n          reject(new Error('上传失败：' + res.statusCode));\n        }\n      },\n      fail: function fail(err) {\n        reject(new Error(err && err.errMsg || '上传失败'));\n      }\n    });\n  });\n}\nfunction requireLogin() {\n  if (!getToken()) {\n    uni.showModal({\n      title: '需要登录',\n      content: '请先登录后使用该功能。',\n      confirmText: '去登录',\n      success: function success(res) {\n        if (res.confirm) uni.navigateTo({\n          url: '/pages/login/login'\n        });\n      }\n    });\n    return false;\n  }\n  return true;\n}\nfunction isAdmin() {\n  var user = getUser();\n  return !!(user && user.is_admin);\n}\nfunction formatDate(value) {\n  if (!value) return '';\n  return String(value).replace('T', ' ').replace('Z', '').slice(0, 16);\n}\nfunction showError(e, fallback) {\n  uni.showToast({\n    title: e && e.message || fallback || '操作失败',\n    icon: 'none'\n  });\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVuaS1hcHA6Ly8vYXBpL3JlcXVlc3QuanMiXSwibmFtZXMiOlsiTE9DQUxfT1JJR0lOIiwiTEFOX09SSUdJTiIsIlBST0RfT1JJR0lOIiwiVVNFX1BST0QiLCJzeXN0ZW1JbmZvIiwidW5pIiwiZ2V0U3lzdGVtSW5mb1N5bmMiLCJlIiwiZ2V0UGxhdGZvcm1OYW1lIiwibmFtZSIsInN5cyIsInBsYXRmb3JtIiwiZ2V0UGxhdGZvcm1MYWJlbCIsIm1hcCIsImg1IiwiYW5kcm9pZCIsImlvcyIsInJlc29sdmVPcmlnaW4iLCJyZXBsYWNlIiwiT1JJR0lOIiwiU0VSVkVSX09SSUdJTiIsIkFQSV9CQVNFIiwiZ2V0VG9rZW4iLCJnZXRTdG9yYWdlU3luYyIsImdldFVzZXIiLCJyYXciLCJKU09OIiwicGFyc2UiLCJzYXZlTG9naW4iLCJkYXRhIiwiYWNjZXNzX3Rva2VuIiwic2V0U3RvcmFnZVN5bmMiLCJ1c2VyIiwibG9nb3V0IiwicmVtb3ZlU3RvcmFnZVN5bmMiLCJ0b0Fic29sdXRlVXJsIiwidXJsIiwiaW5kZXhPZiIsImNoYXJBdCIsIm5vcm1hbGl6ZUJvb2siLCJib29rIiwiYXV0aG9ycyIsIkFycmF5IiwiaXNBcnJheSIsIk9iamVjdCIsImFzc2lnbiIsImlkIiwiYm9va19pZCIsImF1dGhvciIsImpvaW4iLCJjb3Zlcl91cmwiLCJjb3Zlcl90aHVtYl91cmwiLCJjb3ZlciIsImltYWdlX3VybCIsInRhZ3MiLCJhdmdfcmF0aW5nIiwiY2F0ZWdvcnkiLCJub3JtYWxpemVCb29rcyIsImxpc3QiLCJ4IiwibWFrZVJlcXVlc3RVcmwiLCJwYXRoIiwicmVxdWVzdCIsIm9wdGlvbnMiLCJtZXRob2QiLCJib2R5IiwidW5kZWZpbmVkIiwidG9rZW4iLCJoZWFkZXIiLCJBdXRob3JpemF0aW9uIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJ0aW1lb3V0Iiwic3VjY2VzcyIsInJlcyIsInN0YXR1c0NvZGUiLCJtc2ciLCJkZXRhaWwiLCJtZXNzYWdlIiwiRXJyb3IiLCJmYWlsIiwiZXJyIiwiZXJyTXNnIiwiaGVhbHRoQ2hlY2siLCJvayIsInVwbG9hZEZpbGUiLCJmaWxlUGF0aCIsImZvcm1EYXRhIiwicmVxdWlyZUxvZ2luIiwic2hvd01vZGFsIiwidGl0bGUiLCJjb250ZW50IiwiY29uZmlybVRleHQiLCJjb25maXJtIiwibmF2aWdhdGVUbyIsImlzQWRtaW4iLCJpc19hZG1pbiIsImZvcm1hdERhdGUiLCJ2YWx1ZSIsIlN0cmluZyIsInNsaWNlIiwic2hvd0Vycm9yIiwiZmFsbGJhY2siLCJzaG93VG9hc3QiLCJpY29uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBTUEsWUFBWSxHQUFHLHVCQUF1Qjs7QUFFNUM7QUFDQTtBQUFBO0FBQ0EsSUFBTUMsVUFBVSxHQUFHLDRCQUE0Qjs7QUFFL0M7QUFDQTtBQUFBO0FBQ0EsSUFBTUMsV0FBVyxHQUFHLGdCQUFnQjtBQUFBO0FBQ3BDLElBQU1DLFFBQVEsR0FBRyxLQUFLO0FBQUE7QUFFdEIsU0FBU0MsVUFBVSxHQUFHO0VBQ3BCLElBQUk7SUFBRSxPQUFPQyxHQUFHLENBQUNDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxDQUFDO0VBQUMsQ0FBQyxDQUFDLE9BQU9DLENBQUMsRUFBRTtJQUFFLE9BQU8sQ0FBQyxDQUFDO0VBQUM7QUFDckU7QUFFQSxTQUFTQyxlQUFlLEdBQUc7RUFDekIsSUFBSUMsSUFBSSxHQUFHLElBQUk7RUFFZixJQUFNQyxHQUFHLEdBQUdOLFVBQVUsRUFBRTtFQUN4QkssSUFBSSxHQUFJQyxHQUFHLENBQUNDLFFBQVEsS0FBSyxLQUFLLEdBQUksS0FBSyxHQUFHLFNBQVM7RUFRbkQsT0FBT0YsSUFBSTtBQUNiO0FBRUEsU0FBU0csZ0JBQWdCLEdBQUc7RUFDMUIsSUFBTUMsR0FBRyxHQUFHO0lBQ1ZDLEVBQUUsRUFBRSxRQUFRO0lBQ1pDLE9BQU8sRUFBRSxhQUFhO0lBQ3RCQyxHQUFHLEVBQUUsU0FBUztJQUNkLFdBQVcsRUFBRTtFQUNmLENBQUM7RUFDRCxPQUFPSCxHQUFHLENBQUNMLGVBQWUsRUFBRSxDQUFDLElBQUlBLGVBQWUsRUFBRTtBQUNwRDtBQUVBLFNBQVNTLGFBQWEsR0FBRztFQUN2QixJQUFJZCxRQUFRLEVBQUUsT0FBT0QsV0FBVyxDQUFDZ0IsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUM7RUFDbkQsT0FBT1YsZUFBZSxFQUFFLEtBQUssSUFBSSxHQUFHUixZQUFZLEdBQUdDLFVBQVU7QUFDL0Q7QUFFQSxJQUFNa0IsTUFBTSxHQUFHRixhQUFhLEVBQUU7QUFBQTtBQUM5QixJQUFNRyxhQUFhLEdBQUdELE1BQU07QUFBQTtBQUM1QixJQUFNRSxRQUFRLEdBQUdGLE1BQU0sR0FBRyxTQUFTO0FBQUE7QUFFbkMsU0FBU0csUUFBUSxHQUFHO0VBQ2xCLE9BQU9qQixHQUFHLENBQUNrQixjQUFjLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRTtBQUMxQztBQUVBLFNBQVNDLE9BQU8sR0FBRztFQUNqQixJQUFNQyxHQUFHLEdBQUdwQixHQUFHLENBQUNrQixjQUFjLENBQUMsTUFBTSxDQUFDO0VBQ3RDLElBQUksQ0FBQ0UsR0FBRyxFQUFFLE9BQU8sSUFBSTtFQUNyQixJQUFJLHNCQUFPQSxHQUFHLE1BQUssUUFBUSxFQUFFLE9BQU9BLEdBQUc7RUFDdkMsSUFBSTtJQUFFLE9BQU9DLElBQUksQ0FBQ0MsS0FBSyxDQUFDRixHQUFHLENBQUM7RUFBQyxDQUFDLENBQUMsT0FBT2xCLENBQUMsRUFBRTtJQUFFLE9BQU8sSUFBSTtFQUFDO0FBQ3pEO0FBRUEsU0FBU3FCLFNBQVMsQ0FBQ0MsSUFBSSxFQUFFO0VBQ3ZCLElBQUlBLElBQUksSUFBSUEsSUFBSSxDQUFDQyxZQUFZLEVBQUV6QixHQUFHLENBQUMwQixjQUFjLENBQUMsT0FBTyxFQUFFRixJQUFJLENBQUNDLFlBQVksQ0FBQztFQUM3RSxJQUFJRCxJQUFJLElBQUlBLElBQUksQ0FBQ0csSUFBSSxFQUFFM0IsR0FBRyxDQUFDMEIsY0FBYyxDQUFDLE1BQU0sRUFBRUYsSUFBSSxDQUFDRyxJQUFJLENBQUM7QUFDOUQ7QUFFQSxTQUFTQyxNQUFNLEdBQUc7RUFDaEI1QixHQUFHLENBQUM2QixpQkFBaUIsQ0FBQyxPQUFPLENBQUM7RUFDOUI3QixHQUFHLENBQUM2QixpQkFBaUIsQ0FBQyxNQUFNLENBQUM7QUFDL0I7QUFFQSxTQUFTQyxhQUFhLENBQUNDLEdBQUcsRUFBRTtFQUMxQixJQUFJLENBQUNBLEdBQUcsRUFBRSxPQUFPLEVBQUU7RUFDbkIsSUFBSUEsR0FBRyxDQUFDQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLE9BQU9ELEdBQUc7RUFDMUMsSUFBSUEsR0FBRyxDQUFDQyxPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJRCxHQUFHLENBQUNDLE9BQU8sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEVBQUUsT0FBT0QsR0FBRztFQUM3RSxJQUFJQSxHQUFHLENBQUNFLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUUsT0FBT25CLE1BQU0sR0FBR2lCLEdBQUc7RUFDOUMsT0FBT2pCLE1BQU0sR0FBRyxHQUFHLEdBQUdpQixHQUFHO0FBQzNCO0FBRUEsU0FBU0csYUFBYSxDQUFDQyxJQUFJLEVBQUU7RUFDM0JBLElBQUksR0FBR0EsSUFBSSxJQUFJLENBQUMsQ0FBQztFQUNqQixJQUFNQyxPQUFPLEdBQUdDLEtBQUssQ0FBQ0MsT0FBTyxDQUFDSCxJQUFJLENBQUNDLE9BQU8sQ0FBQyxHQUFHRCxJQUFJLENBQUNDLE9BQU8sR0FBRyxFQUFFO0VBQy9ELE9BQU9HLE1BQU0sQ0FBQ0MsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFTCxJQUFJLEVBQUU7SUFDN0JNLEVBQUUsRUFBRU4sSUFBSSxDQUFDTSxFQUFFLElBQUlOLElBQUksQ0FBQ08sT0FBTztJQUMzQkEsT0FBTyxFQUFFUCxJQUFJLENBQUNPLE9BQU8sSUFBSVAsSUFBSSxDQUFDTSxFQUFFO0lBQ2hDRSxNQUFNLEVBQUVSLElBQUksQ0FBQ1EsTUFBTSxJQUFJUCxPQUFPLENBQUNRLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxNQUFNO0lBQ2xEQyxTQUFTLEVBQUVmLGFBQWEsQ0FBQ0ssSUFBSSxDQUFDVyxlQUFlLElBQUlYLElBQUksQ0FBQ1UsU0FBUyxJQUFJVixJQUFJLENBQUNZLEtBQUssSUFBSVosSUFBSSxDQUFDYSxTQUFTLElBQUksRUFBRSxDQUFDO0lBQ3RHQyxJQUFJLEVBQUVaLEtBQUssQ0FBQ0MsT0FBTyxDQUFDSCxJQUFJLENBQUNjLElBQUksQ0FBQyxHQUFHZCxJQUFJLENBQUNjLElBQUksR0FBRyxFQUFFO0lBQy9DQyxVQUFVLEVBQUVmLElBQUksQ0FBQ2UsVUFBVSxJQUFJLENBQUM7SUFDaENDLFFBQVEsRUFBRWhCLElBQUksQ0FBQ2dCLFFBQVEsSUFBSTtFQUM3QixDQUFDLENBQUM7QUFDSjtBQUVBLFNBQVNDLGNBQWMsQ0FBQ0MsSUFBSSxFQUFFO0VBQzVCLElBQUksQ0FBQ2hCLEtBQUssQ0FBQ0MsT0FBTyxDQUFDZSxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUU7RUFDbkMsT0FBT0EsSUFBSSxDQUFDN0MsR0FBRyxDQUFDLFVBQVU4QyxDQUFDLEVBQUU7SUFBRSxPQUFPcEIsYUFBYSxDQUFDb0IsQ0FBQyxDQUFDbkIsSUFBSSxJQUFJbUIsQ0FBQyxDQUFDO0VBQUMsQ0FBQyxDQUFDO0FBQ3JFO0FBRUEsU0FBU0MsY0FBYyxDQUFDQyxJQUFJLEVBQUU7RUFDNUIsSUFBSSxDQUFDQSxJQUFJLEVBQUUsT0FBT3hDLFFBQVE7RUFDMUIsSUFBSXdDLElBQUksQ0FBQ3hCLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUl3QixJQUFJLENBQUN4QixPQUFPLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxFQUFFLE9BQU93QixJQUFJO0VBQ2hGLElBQUlBLElBQUksQ0FBQ3hCLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUUsT0FBT2xCLE1BQU0sR0FBRzBDLElBQUk7RUFDdkQsSUFBSUEsSUFBSSxDQUFDdkIsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFBRXVCLElBQUksR0FBRyxHQUFHLEdBQUdBLElBQUk7RUFDN0MsT0FBT3hDLFFBQVEsR0FBR3dDLElBQUk7QUFDeEI7QUFFQSxTQUFTQyxPQUFPLENBQUNELElBQUksRUFBRUUsT0FBTyxFQUFFO0VBQzlCQSxPQUFPLEdBQUdBLE9BQU8sSUFBSSxDQUFDLENBQUM7RUFDdkIsSUFBTUMsTUFBTSxHQUFHRCxPQUFPLENBQUNDLE1BQU0sSUFBSSxLQUFLO0VBQ3RDLElBQU1uQyxJQUFJLEdBQUdrQyxPQUFPLENBQUNsQyxJQUFJLElBQUlrQyxPQUFPLENBQUNFLElBQUksSUFBSUMsU0FBUztFQUN0RCxJQUFNQyxLQUFLLEdBQUc3QyxRQUFRLEVBQUU7RUFDeEIsSUFBTThDLE1BQU0sR0FBR3hCLE1BQU0sQ0FBQ0MsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFa0IsT0FBTyxDQUFDSyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUM7RUFDdERBLE1BQU0sQ0FBQyxjQUFjLENBQUMsR0FBR0EsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLGtCQUFrQjtFQUNyRUEsTUFBTSxDQUFDLG1CQUFtQixDQUFDLEdBQUc1RCxlQUFlLEVBQUU7RUFDL0MsSUFBSTJELEtBQUssRUFBRUMsTUFBTSxDQUFDQyxhQUFhLEdBQUcsU0FBUyxHQUFHRixLQUFLO0VBRW5ELE9BQU8sSUFBSUcsT0FBTyxDQUFDLFVBQVVDLE9BQU8sRUFBRUMsTUFBTSxFQUFFO0lBQzVDbkUsR0FBRyxDQUFDeUQsT0FBTyxDQUFDO01BQ1YxQixHQUFHLEVBQUV3QixjQUFjLENBQUNDLElBQUksQ0FBQztNQUN6QkcsTUFBTSxFQUFFQSxNQUFNO01BQ2RuQyxJQUFJLEVBQUVBLElBQUk7TUFDVnVDLE1BQU0sRUFBRUEsTUFBTTtNQUNkSyxPQUFPLEVBQUVWLE9BQU8sQ0FBQ1UsT0FBTyxJQUFJLEtBQUs7TUFDakNDLE9BQU8sRUFBRSxpQkFBVUMsR0FBRyxFQUFFO1FBQ3RCLElBQUlBLEdBQUcsQ0FBQ0MsVUFBVSxJQUFJLEdBQUcsSUFBSUQsR0FBRyxDQUFDQyxVQUFVLEdBQUcsR0FBRyxFQUFFO1VBQ2pETCxPQUFPLENBQUNJLEdBQUcsQ0FBQzlDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztRQUN6QixDQUFDLE1BQU07VUFDTCxJQUFNZ0QsR0FBRyxHQUFJRixHQUFHLENBQUM5QyxJQUFJLEtBQUs4QyxHQUFHLENBQUM5QyxJQUFJLENBQUNpRCxNQUFNLElBQUlILEdBQUcsQ0FBQzlDLElBQUksQ0FBQ2tELE9BQU8sQ0FBQyxJQUFNLE9BQU8sR0FBR0osR0FBRyxDQUFDQyxVQUFXO1VBQzdGSixNQUFNLENBQUMsSUFBSVEsS0FBSyxDQUFDSCxHQUFHLENBQUMsQ0FBQztRQUN4QjtNQUNGLENBQUM7TUFDREksSUFBSSxFQUFFLGNBQVVDLEdBQUcsRUFBRTtRQUNuQlYsTUFBTSxDQUFDLElBQUlRLEtBQUssQ0FBRUUsR0FBRyxJQUFJQSxHQUFHLENBQUNDLE1BQU0sSUFBSyxvQkFBb0IsQ0FBQyxDQUFDO01BQ2hFO0lBQ0YsQ0FBQyxDQUFDO0VBQ0osQ0FBQyxDQUFDO0FBQ0o7QUFFQSxTQUFTQyxXQUFXLEdBQUc7RUFDckIsT0FBTyxJQUFJZCxPQUFPLENBQUMsVUFBVUMsT0FBTyxFQUFFQyxNQUFNLEVBQUU7SUFDNUNuRSxHQUFHLENBQUN5RCxPQUFPLENBQUM7TUFDVjFCLEdBQUcsRUFBRWpCLE1BQU0sR0FBRyxTQUFTO01BQ3ZCNkMsTUFBTSxFQUFFLEtBQUs7TUFDYlMsT0FBTyxFQUFFLElBQUk7TUFDYkMsT0FBTyxFQUFFLGlCQUFVQyxHQUFHLEVBQUU7UUFDdEIsSUFBSUEsR0FBRyxDQUFDQyxVQUFVLElBQUksR0FBRyxJQUFJRCxHQUFHLENBQUNDLFVBQVUsR0FBRyxHQUFHLEVBQUVMLE9BQU8sQ0FBQ0ksR0FBRyxDQUFDOUMsSUFBSSxJQUFJO1VBQUV3RCxFQUFFLEVBQUU7UUFBSyxDQUFDLENBQUMsTUFDL0ViLE1BQU0sQ0FBQyxJQUFJUSxLQUFLLENBQUMsU0FBUyxHQUFHTCxHQUFHLENBQUNDLFVBQVUsQ0FBQyxDQUFDO01BQ3BELENBQUM7TUFDREssSUFBSSxFQUFFLGNBQVVDLEdBQUcsRUFBRTtRQUNuQlYsTUFBTSxDQUFDLElBQUlRLEtBQUssQ0FBRUUsR0FBRyxJQUFJQSxHQUFHLENBQUNDLE1BQU0sSUFBSyxRQUFRLENBQUMsQ0FBQztNQUNwRDtJQUNGLENBQUMsQ0FBQztFQUNKLENBQUMsQ0FBQztBQUNKO0FBRUEsU0FBU0csVUFBVSxDQUFDekIsSUFBSSxFQUFFMEIsUUFBUSxFQUFFQyxRQUFRLEVBQUU7RUFDNUMsSUFBTXJCLEtBQUssR0FBRzdDLFFBQVEsRUFBRTtFQUN4QixJQUFNOEMsTUFBTSxHQUFHO0lBQUUsbUJBQW1CLEVBQUU1RCxlQUFlO0VBQUcsQ0FBQztFQUN6RCxJQUFJMkQsS0FBSyxFQUFFQyxNQUFNLENBQUNDLGFBQWEsR0FBRyxTQUFTLEdBQUdGLEtBQUs7RUFDbkQsT0FBTyxJQUFJRyxPQUFPLENBQUMsVUFBVUMsT0FBTyxFQUFFQyxNQUFNLEVBQUU7SUFDNUNuRSxHQUFHLENBQUNpRixVQUFVLENBQUM7TUFDYmxELEdBQUcsRUFBRXdCLGNBQWMsQ0FBQ0MsSUFBSSxDQUFDO01BQ3pCMEIsUUFBUSxFQUFFQSxRQUFRO01BQ2xCOUUsSUFBSSxFQUFFLE1BQU07TUFDWitFLFFBQVEsRUFBRUEsUUFBUSxJQUFJLENBQUMsQ0FBQztNQUN4QnBCLE1BQU0sRUFBRUEsTUFBTTtNQUNkTSxPQUFPLEVBQUUsaUJBQVVDLEdBQUcsRUFBRTtRQUN0QixJQUFJQSxHQUFHLENBQUNDLFVBQVUsSUFBSSxHQUFHLElBQUlELEdBQUcsQ0FBQ0MsVUFBVSxHQUFHLEdBQUcsRUFBRTtVQUNqRCxJQUFJO1lBQUVMLE9BQU8sQ0FBQzdDLElBQUksQ0FBQ0MsS0FBSyxDQUFDZ0QsR0FBRyxDQUFDOUMsSUFBSSxJQUFJLElBQUksQ0FBQyxDQUFDO1VBQUMsQ0FBQyxDQUFDLE9BQU90QixDQUFDLEVBQUU7WUFBRWdFLE9BQU8sQ0FBQ0ksR0FBRyxDQUFDOUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1VBQUM7UUFDcEYsQ0FBQyxNQUFNO1VBQ0wyQyxNQUFNLENBQUMsSUFBSVEsS0FBSyxDQUFDLE9BQU8sR0FBR0wsR0FBRyxDQUFDQyxVQUFVLENBQUMsQ0FBQztRQUM3QztNQUNGLENBQUM7TUFDREssSUFBSSxFQUFFLGNBQVVDLEdBQUcsRUFBRTtRQUNuQlYsTUFBTSxDQUFDLElBQUlRLEtBQUssQ0FBRUUsR0FBRyxJQUFJQSxHQUFHLENBQUNDLE1BQU0sSUFBSyxNQUFNLENBQUMsQ0FBQztNQUNsRDtJQUNGLENBQUMsQ0FBQztFQUNKLENBQUMsQ0FBQztBQUNKO0FBRUEsU0FBU00sWUFBWSxHQUFHO0VBQ3RCLElBQUksQ0FBQ25FLFFBQVEsRUFBRSxFQUFFO0lBQ2ZqQixHQUFHLENBQUNxRixTQUFTLENBQUM7TUFDWkMsS0FBSyxFQUFFLE1BQU07TUFDYkMsT0FBTyxFQUFFLGFBQWE7TUFDdEJDLFdBQVcsRUFBRSxLQUFLO01BQ2xCbkIsT0FBTyxFQUFFLGlCQUFVQyxHQUFHLEVBQUU7UUFDdEIsSUFBSUEsR0FBRyxDQUFDbUIsT0FBTyxFQUFFekYsR0FBRyxDQUFDMEYsVUFBVSxDQUFDO1VBQUUzRCxHQUFHLEVBQUU7UUFBcUIsQ0FBQyxDQUFDO01BQ2hFO0lBQ0YsQ0FBQyxDQUFDO0lBQ0YsT0FBTyxLQUFLO0VBQ2Q7RUFDQSxPQUFPLElBQUk7QUFDYjtBQUVBLFNBQVM0RCxPQUFPLEdBQUc7RUFDakIsSUFBTWhFLElBQUksR0FBR1IsT0FBTyxFQUFFO0VBQ3RCLE9BQU8sQ0FBQyxFQUFFUSxJQUFJLElBQUlBLElBQUksQ0FBQ2lFLFFBQVEsQ0FBQztBQUNsQztBQUVBLFNBQVNDLFVBQVUsQ0FBQ0MsS0FBSyxFQUFFO0VBQ3pCLElBQUksQ0FBQ0EsS0FBSyxFQUFFLE9BQU8sRUFBRTtFQUNyQixPQUFPQyxNQUFNLENBQUNELEtBQUssQ0FBQyxDQUFDakYsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQ0EsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQ21GLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDO0FBQ3RFO0FBRUEsU0FBU0MsU0FBUyxDQUFDL0YsQ0FBQyxFQUFFZ0csUUFBUSxFQUFFO0VBQzlCbEcsR0FBRyxDQUFDbUcsU0FBUyxDQUFDO0lBQUViLEtBQUssRUFBR3BGLENBQUMsSUFBSUEsQ0FBQyxDQUFDd0UsT0FBTyxJQUFLd0IsUUFBUSxJQUFJLE1BQU07SUFBRUUsSUFBSSxFQUFFO0VBQU8sQ0FBQyxDQUFDO0FBQ2hGIiwiZmlsZSI6IjE3LmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgTE9DQUxfT1JJR0lOID0gJ2h0dHA6Ly8xMjcuMC4wLjE6ODAwMCdcblxuLy8gQW5kcm9pZCDnnJ/mnLrjgIFpUGhvbmUg55yf5py644CB5b6u5L+h5byA5Y+R6ICF5bel5YW36L+e5o6l55S16ISR5ZCO56uv5pe277yM55So55S16ISRIGlwY29uZmlnIOmHjOKAnOaciem7mOiupOe9keWFs+KAneeahCBJUHY044CCXG4vLyDkvaDkuYvliY3lj6/nlKjnmoQgV0xBTiDlnLDlnYDmmK8gMTAuMjQyLjExLjExM++8m+WmguaenOaNouS6hue9kee7nO+8jOWPquaUuei/memHjOWNs+WPr+OAglxuY29uc3QgTEFOX09SSUdJTiA9ICdodHRwOi8vMTkyLjE2OC4xMzkuMTE6ODAwMCdcblxuLy8g5ZCO57ut6YOo572y5Yiw5pyN5Yqh5Zmo5ZCO77yM5oqKIFVTRV9QUk9EIOaUueS4uiB0cnVl77yM5bm25oqKIFBST0RfT1JJR0lOIOaUueaIkCBIVFRQUyDln5/lkI3jgIJcbi8vIOW+ruS/oeWwj+eoi+W6j+ato+W8j+mihOiniC/lj5HluIPjgIFpT1Mg5q2j5byP5omT5YyF6YO95bu66K6u5L2/55SoIEhUVFBT44CCXG5jb25zdCBQUk9EX09SSUdJTiA9ICdodHRwczovL+S9oOeahOe6v+S4iuWfn+WQjSdcbmNvbnN0IFVTRV9QUk9EID0gZmFsc2VcblxuZnVuY3Rpb24gc3lzdGVtSW5mbygpIHtcbiAgdHJ5IHsgcmV0dXJuIHVuaS5nZXRTeXN0ZW1JbmZvU3luYygpIHx8IHt9IH0gY2F0Y2ggKGUpIHsgcmV0dXJuIHt9IH1cbn1cblxuZnVuY3Rpb24gZ2V0UGxhdGZvcm1OYW1lKCkge1xuICBsZXQgbmFtZSA9ICdoNSdcblxuICBjb25zdCBzeXMgPSBzeXN0ZW1JbmZvKClcbiAgbmFtZSA9IChzeXMucGxhdGZvcm0gPT09ICdpb3MnKSA/ICdpb3MnIDogJ2FuZHJvaWQnXG5cblxuXG5cblxuXG5cbiAgcmV0dXJuIG5hbWVcbn1cblxuZnVuY3Rpb24gZ2V0UGxhdGZvcm1MYWJlbCgpIHtcbiAgY29uc3QgbWFwID0ge1xuICAgIGg1OiAn5rWP6KeI5ZmoIEg1JyxcbiAgICBhbmRyb2lkOiAnQW5kcm9pZCBBcHAnLFxuICAgIGlvczogJ2lPUyBBcHAnLFxuICAgICdtcC13ZWl4aW4nOiAn5b6u5L+h5bCP56iL5bqPJ1xuICB9XG4gIHJldHVybiBtYXBbZ2V0UGxhdGZvcm1OYW1lKCldIHx8IGdldFBsYXRmb3JtTmFtZSgpXG59XG5cbmZ1bmN0aW9uIHJlc29sdmVPcmlnaW4oKSB7XG4gIGlmIChVU0VfUFJPRCkgcmV0dXJuIFBST0RfT1JJR0lOLnJlcGxhY2UoL1xcLyQvLCAnJylcbiAgcmV0dXJuIGdldFBsYXRmb3JtTmFtZSgpID09PSAnaDUnID8gTE9DQUxfT1JJR0lOIDogTEFOX09SSUdJTlxufVxuXG5jb25zdCBPUklHSU4gPSByZXNvbHZlT3JpZ2luKClcbmNvbnN0IFNFUlZFUl9PUklHSU4gPSBPUklHSU5cbmNvbnN0IEFQSV9CQVNFID0gT1JJR0lOICsgJy9hcGkvdjEnXG5cbmZ1bmN0aW9uIGdldFRva2VuKCkge1xuICByZXR1cm4gdW5pLmdldFN0b3JhZ2VTeW5jKCd0b2tlbicpIHx8ICcnXG59XG5cbmZ1bmN0aW9uIGdldFVzZXIoKSB7XG4gIGNvbnN0IHJhdyA9IHVuaS5nZXRTdG9yYWdlU3luYygndXNlcicpXG4gIGlmICghcmF3KSByZXR1cm4gbnVsbFxuICBpZiAodHlwZW9mIHJhdyA9PT0gJ29iamVjdCcpIHJldHVybiByYXdcbiAgdHJ5IHsgcmV0dXJuIEpTT04ucGFyc2UocmF3KSB9IGNhdGNoIChlKSB7IHJldHVybiBudWxsIH1cbn1cblxuZnVuY3Rpb24gc2F2ZUxvZ2luKGRhdGEpIHtcbiAgaWYgKGRhdGEgJiYgZGF0YS5hY2Nlc3NfdG9rZW4pIHVuaS5zZXRTdG9yYWdlU3luYygndG9rZW4nLCBkYXRhLmFjY2Vzc190b2tlbilcbiAgaWYgKGRhdGEgJiYgZGF0YS51c2VyKSB1bmkuc2V0U3RvcmFnZVN5bmMoJ3VzZXInLCBkYXRhLnVzZXIpXG59XG5cbmZ1bmN0aW9uIGxvZ291dCgpIHtcbiAgdW5pLnJlbW92ZVN0b3JhZ2VTeW5jKCd0b2tlbicpXG4gIHVuaS5yZW1vdmVTdG9yYWdlU3luYygndXNlcicpXG59XG5cbmZ1bmN0aW9uIHRvQWJzb2x1dGVVcmwodXJsKSB7XG4gIGlmICghdXJsKSByZXR1cm4gJydcbiAgaWYgKHVybC5pbmRleE9mKCdkYXRhOicpID09PSAwKSByZXR1cm4gdXJsXG4gIGlmICh1cmwuaW5kZXhPZignaHR0cDovLycpID09PSAwIHx8IHVybC5pbmRleE9mKCdodHRwczovLycpID09PSAwKSByZXR1cm4gdXJsXG4gIGlmICh1cmwuY2hhckF0KDApID09PSAnLycpIHJldHVybiBPUklHSU4gKyB1cmxcbiAgcmV0dXJuIE9SSUdJTiArICcvJyArIHVybFxufVxuXG5mdW5jdGlvbiBub3JtYWxpemVCb29rKGJvb2spIHtcbiAgYm9vayA9IGJvb2sgfHwge31cbiAgY29uc3QgYXV0aG9ycyA9IEFycmF5LmlzQXJyYXkoYm9vay5hdXRob3JzKSA/IGJvb2suYXV0aG9ycyA6IFtdXG4gIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBib29rLCB7XG4gICAgaWQ6IGJvb2suaWQgfHwgYm9vay5ib29rX2lkLFxuICAgIGJvb2tfaWQ6IGJvb2suYm9va19pZCB8fCBib29rLmlkLFxuICAgIGF1dGhvcjogYm9vay5hdXRob3IgfHwgYXV0aG9ycy5qb2luKCfjgIEnKSB8fCAn5pyq55+l5L2c6ICFJyxcbiAgICBjb3Zlcl91cmw6IHRvQWJzb2x1dGVVcmwoYm9vay5jb3Zlcl90aHVtYl91cmwgfHwgYm9vay5jb3Zlcl91cmwgfHwgYm9vay5jb3ZlciB8fCBib29rLmltYWdlX3VybCB8fCAnJyksXG4gICAgdGFnczogQXJyYXkuaXNBcnJheShib29rLnRhZ3MpID8gYm9vay50YWdzIDogW10sXG4gICAgYXZnX3JhdGluZzogYm9vay5hdmdfcmF0aW5nIHx8IDAsXG4gICAgY2F0ZWdvcnk6IGJvb2suY2F0ZWdvcnkgfHwgJ+WbvuS5pidcbiAgfSlcbn1cblxuZnVuY3Rpb24gbm9ybWFsaXplQm9va3MobGlzdCkge1xuICBpZiAoIUFycmF5LmlzQXJyYXkobGlzdCkpIHJldHVybiBbXVxuICByZXR1cm4gbGlzdC5tYXAoZnVuY3Rpb24gKHgpIHsgcmV0dXJuIG5vcm1hbGl6ZUJvb2soeC5ib29rIHx8IHgpIH0pXG59XG5cbmZ1bmN0aW9uIG1ha2VSZXF1ZXN0VXJsKHBhdGgpIHtcbiAgaWYgKCFwYXRoKSByZXR1cm4gQVBJX0JBU0VcbiAgaWYgKHBhdGguaW5kZXhPZignaHR0cDovLycpID09PSAwIHx8IHBhdGguaW5kZXhPZignaHR0cHM6Ly8nKSA9PT0gMCkgcmV0dXJuIHBhdGhcbiAgaWYgKHBhdGguaW5kZXhPZignL2FwaS92MScpID09PSAwKSByZXR1cm4gT1JJR0lOICsgcGF0aFxuICBpZiAocGF0aC5jaGFyQXQoMCkgIT09ICcvJykgcGF0aCA9ICcvJyArIHBhdGhcbiAgcmV0dXJuIEFQSV9CQVNFICsgcGF0aFxufVxuXG5mdW5jdGlvbiByZXF1ZXN0KHBhdGgsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge31cbiAgY29uc3QgbWV0aG9kID0gb3B0aW9ucy5tZXRob2QgfHwgJ0dFVCdcbiAgY29uc3QgZGF0YSA9IG9wdGlvbnMuZGF0YSB8fCBvcHRpb25zLmJvZHkgfHwgdW5kZWZpbmVkXG4gIGNvbnN0IHRva2VuID0gZ2V0VG9rZW4oKVxuICBjb25zdCBoZWFkZXIgPSBPYmplY3QuYXNzaWduKHt9LCBvcHRpb25zLmhlYWRlciB8fCB7fSlcbiAgaGVhZGVyWydDb250ZW50LVR5cGUnXSA9IGhlYWRlclsnQ29udGVudC1UeXBlJ10gfHwgJ2FwcGxpY2F0aW9uL2pzb24nXG4gIGhlYWRlclsnWC1DbGllbnQtUGxhdGZvcm0nXSA9IGdldFBsYXRmb3JtTmFtZSgpXG4gIGlmICh0b2tlbikgaGVhZGVyLkF1dGhvcml6YXRpb24gPSAnQmVhcmVyICcgKyB0b2tlblxuXG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgdW5pLnJlcXVlc3Qoe1xuICAgICAgdXJsOiBtYWtlUmVxdWVzdFVybChwYXRoKSxcbiAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgZGF0YTogZGF0YSxcbiAgICAgIGhlYWRlcjogaGVhZGVyLFxuICAgICAgdGltZW91dDogb3B0aW9ucy50aW1lb3V0IHx8IDE4MDAwLFxuICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xuICAgICAgICBpZiAocmVzLnN0YXR1c0NvZGUgPj0gMjAwICYmIHJlcy5zdGF0dXNDb2RlIDwgMzAwKSB7XG4gICAgICAgICAgcmVzb2x2ZShyZXMuZGF0YSB8fCB7fSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCBtc2cgPSAocmVzLmRhdGEgJiYgKHJlcy5kYXRhLmRldGFpbCB8fCByZXMuZGF0YS5tZXNzYWdlKSkgfHwgKCfor7fmsYLlpLHotKXvvJonICsgcmVzLnN0YXR1c0NvZGUpXG4gICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihtc2cpKVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZmFpbDogZnVuY3Rpb24gKGVycikge1xuICAgICAgICByZWplY3QobmV3IEVycm9yKChlcnIgJiYgZXJyLmVyck1zZykgfHwgJ+e9kee7nOivt+axguWksei0pe+8jOivt+ajgOafpeWQjuerr+WcsOWdgOWSjOmYsueBq+WimScpKVxuICAgICAgfVxuICAgIH0pXG4gIH0pXG59XG5cbmZ1bmN0aW9uIGhlYWx0aENoZWNrKCkge1xuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgIHVuaS5yZXF1ZXN0KHtcbiAgICAgIHVybDogT1JJR0lOICsgJy9oZWFsdGgnLFxuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIHRpbWVvdXQ6IDgwMDAsXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgIGlmIChyZXMuc3RhdHVzQ29kZSA+PSAyMDAgJiYgcmVzLnN0YXR1c0NvZGUgPCAzMDApIHJlc29sdmUocmVzLmRhdGEgfHwgeyBvazogdHJ1ZSB9KVxuICAgICAgICBlbHNlIHJlamVjdChuZXcgRXJyb3IoJ+WBpeW6t+ajgOafpeWksei0pe+8micgKyByZXMuc3RhdHVzQ29kZSkpXG4gICAgICB9LFxuICAgICAgZmFpbDogZnVuY3Rpb24gKGVycikge1xuICAgICAgICByZWplY3QobmV3IEVycm9yKChlcnIgJiYgZXJyLmVyck1zZykgfHwgJ+aXoOazlei/nuaOpeWQjuerrycpKVxuICAgICAgfVxuICAgIH0pXG4gIH0pXG59XG5cbmZ1bmN0aW9uIHVwbG9hZEZpbGUocGF0aCwgZmlsZVBhdGgsIGZvcm1EYXRhKSB7XG4gIGNvbnN0IHRva2VuID0gZ2V0VG9rZW4oKVxuICBjb25zdCBoZWFkZXIgPSB7ICdYLUNsaWVudC1QbGF0Zm9ybSc6IGdldFBsYXRmb3JtTmFtZSgpIH1cbiAgaWYgKHRva2VuKSBoZWFkZXIuQXV0aG9yaXphdGlvbiA9ICdCZWFyZXIgJyArIHRva2VuXG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgdW5pLnVwbG9hZEZpbGUoe1xuICAgICAgdXJsOiBtYWtlUmVxdWVzdFVybChwYXRoKSxcbiAgICAgIGZpbGVQYXRoOiBmaWxlUGF0aCxcbiAgICAgIG5hbWU6ICdmaWxlJyxcbiAgICAgIGZvcm1EYXRhOiBmb3JtRGF0YSB8fCB7fSxcbiAgICAgIGhlYWRlcjogaGVhZGVyLFxuICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xuICAgICAgICBpZiAocmVzLnN0YXR1c0NvZGUgPj0gMjAwICYmIHJlcy5zdGF0dXNDb2RlIDwgMzAwKSB7XG4gICAgICAgICAgdHJ5IHsgcmVzb2x2ZShKU09OLnBhcnNlKHJlcy5kYXRhIHx8ICd7fScpKSB9IGNhdGNoIChlKSB7IHJlc29sdmUocmVzLmRhdGEgfHwge30pIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZWplY3QobmV3IEVycm9yKCfkuIrkvKDlpLHotKXvvJonICsgcmVzLnN0YXR1c0NvZGUpKVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZmFpbDogZnVuY3Rpb24gKGVycikge1xuICAgICAgICByZWplY3QobmV3IEVycm9yKChlcnIgJiYgZXJyLmVyck1zZykgfHwgJ+S4iuS8oOWksei0pScpKVxuICAgICAgfVxuICAgIH0pXG4gIH0pXG59XG5cbmZ1bmN0aW9uIHJlcXVpcmVMb2dpbigpIHtcbiAgaWYgKCFnZXRUb2tlbigpKSB7XG4gICAgdW5pLnNob3dNb2RhbCh7XG4gICAgICB0aXRsZTogJ+mcgOimgeeZu+W9lScsXG4gICAgICBjb250ZW50OiAn6K+35YWI55m75b2V5ZCO5L2/55So6K+l5Yqf6IO944CCJyxcbiAgICAgIGNvbmZpcm1UZXh0OiAn5Y6755m75b2VJyxcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgaWYgKHJlcy5jb25maXJtKSB1bmkubmF2aWdhdGVUbyh7IHVybDogJy9wYWdlcy9sb2dpbi9sb2dpbicgfSlcbiAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiBmYWxzZVxuICB9XG4gIHJldHVybiB0cnVlXG59XG5cbmZ1bmN0aW9uIGlzQWRtaW4oKSB7XG4gIGNvbnN0IHVzZXIgPSBnZXRVc2VyKClcbiAgcmV0dXJuICEhKHVzZXIgJiYgdXNlci5pc19hZG1pbilcbn1cblxuZnVuY3Rpb24gZm9ybWF0RGF0ZSh2YWx1ZSkge1xuICBpZiAoIXZhbHVlKSByZXR1cm4gJydcbiAgcmV0dXJuIFN0cmluZyh2YWx1ZSkucmVwbGFjZSgnVCcsICcgJykucmVwbGFjZSgnWicsICcnKS5zbGljZSgwLCAxNilcbn1cblxuZnVuY3Rpb24gc2hvd0Vycm9yKGUsIGZhbGxiYWNrKSB7XG4gIHVuaS5zaG93VG9hc3QoeyB0aXRsZTogKGUgJiYgZS5tZXNzYWdlKSB8fCBmYWxsYmFjayB8fCAn5pON5L2c5aSx6LSlJywgaWNvbjogJ25vbmUnIH0pXG59XG5cbmV4cG9ydCB7XG4gIExPQ0FMX09SSUdJTixcbiAgTEFOX09SSUdJTixcbiAgUFJPRF9PUklHSU4sXG4gIFVTRV9QUk9ELFxuICBPUklHSU4sXG4gIFNFUlZFUl9PUklHSU4sXG4gIEFQSV9CQVNFLFxuICBnZXRQbGF0Zm9ybU5hbWUsXG4gIGdldFBsYXRmb3JtTGFiZWwsXG4gIHN5c3RlbUluZm8sXG4gIHJlcXVlc3QsXG4gIGhlYWx0aENoZWNrLFxuICB1cGxvYWRGaWxlLFxuICB0b0Fic29sdXRlVXJsLFxuICBub3JtYWxpemVCb29rLFxuICBub3JtYWxpemVCb29rcyxcbiAgZ2V0VG9rZW4sXG4gIGdldFVzZXIsXG4gIHNhdmVMb2dpbixcbiAgbG9nb3V0LFxuICByZXF1aXJlTG9naW4sXG4gIGlzQWRtaW4sXG4gIGZvcm1hdERhdGUsXG4gIHNob3dFcnJvclxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///17\n");

/***/ }),
/* 18 */
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    if(typeof renderjs.beforeCreate === 'function'){
			renderjs.beforeCreate = [renderjs.beforeCreate]
		}
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
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
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 19 */
/*!*****************************************************************************************!*\
  !*** E:/翻译漫画/book-main (14)/book-main/frontend-uni/pages/search/search.vue?mpType=page ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _search_vue_vue_type_template_id_6337d5d4_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./search.vue?vue&type=template&id=6337d5d4&scoped=true&mpType=page */ 20);\n/* harmony import */ var _search_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./search.vue?vue&type=script&lang=js&mpType=page */ 22);\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _search_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__) if([\"default\"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _search_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n/* harmony import */ var _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 18);\n\nvar renderjs\n\n\n\n\n/* normalize component */\n\nvar component = Object(_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\n  _search_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _search_vue_vue_type_template_id_6337d5d4_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _search_vue_vue_type_template_id_6337d5d4_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  \"6337d5d4\",\n  null,\n  false,\n  _search_vue_vue_type_template_id_6337d5d4_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__[\"components\"],\n  renderjs\n)\n\ncomponent.options.__file = \"pages/search/search.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbbnVsbF0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBMEk7QUFDMUk7QUFDcUU7QUFDTDs7O0FBR2hFO0FBQ2dNO0FBQ2hNLGdCQUFnQix1TUFBVTtBQUMxQixFQUFFLHVGQUFNO0FBQ1IsRUFBRSx3R0FBTTtBQUNSLEVBQUUsaUhBQWU7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUUsNEdBQVU7QUFDWjtBQUNBOztBQUVBO0FBQ2UsZ0YiLCJmaWxlIjoiMTkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucywgcmVjeWNsYWJsZVJlbmRlciwgY29tcG9uZW50cyB9IGZyb20gXCIuL3NlYXJjaC52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9NjMzN2Q1ZDQmc2NvcGVkPXRydWUmbXBUeXBlPXBhZ2VcIlxudmFyIHJlbmRlcmpzXG5pbXBvcnQgc2NyaXB0IGZyb20gXCIuL3NlYXJjaC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmbXBUeXBlPXBhZ2VcIlxuZXhwb3J0ICogZnJvbSBcIi4vc2VhcmNoLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZtcFR5cGU9cGFnZVwiXG5cblxuLyogbm9ybWFsaXplIGNvbXBvbmVudCAqL1xuaW1wb3J0IG5vcm1hbGl6ZXIgZnJvbSBcIiEuLi8uLi8uLi8uLi8uLi9IQnVpbGRlclguNS4wNy4yMDI2MDQxMDA2L0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvdnVlLWxvYWRlci9saWIvcnVudGltZS9jb21wb25lbnROb3JtYWxpemVyLmpzXCJcbnZhciBjb21wb25lbnQgPSBub3JtYWxpemVyKFxuICBzY3JpcHQsXG4gIHJlbmRlcixcbiAgc3RhdGljUmVuZGVyRm5zLFxuICBmYWxzZSxcbiAgbnVsbCxcbiAgXCI2MzM3ZDVkNFwiLFxuICBudWxsLFxuICBmYWxzZSxcbiAgY29tcG9uZW50cyxcbiAgcmVuZGVyanNcbilcblxuY29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJwYWdlcy9zZWFyY2gvc2VhcmNoLnZ1ZVwiXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///19\n");

/***/ }),
/* 20 */
/*!***********************************************************************************************************************************!*\
  !*** E:/翻译漫画/book-main (14)/book-main/frontend-uni/pages/search/search.vue?vue&type=template&id=6337d5d4&scoped=true&mpType=page ***!
  \***********************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_0_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_search_vue_vue_type_template_id_6337d5d4_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--11-0!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/filter-modules-template.js!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./search.vue?vue&type=template&id=6337d5d4&scoped=true&mpType=page */ 21);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_0_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_search_vue_vue_type_template_id_6337d5d4_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_0_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_search_vue_vue_type_template_id_6337d5d4_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_0_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_search_vue_vue_type_template_id_6337d5d4_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_0_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_search_vue_vue_type_template_id_6337d5d4_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),
/* 21 */
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--11-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/filter-modules-template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!E:/翻译漫画/book-main (14)/book-main/frontend-uni/pages/search/search.vue?vue&type=template&id=6337d5d4&scoped=true&mpType=page ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "view",
    { staticClass: _vm._$s(0, "sc", "container"), attrs: { _i: 0 } },
    [
      _c("view", { staticClass: _vm._$s(1, "sc", "card"), attrs: { _i: 1 } }, [
        _c("text", {
          staticClass: _vm._$s(2, "sc", "title"),
          attrs: { _i: 2 },
        }),
        _c(
          "view",
          { staticClass: _vm._$s(3, "sc", "search-row"), attrs: { _i: 3 } },
          [
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.keyword,
                  expression: "keyword",
                },
              ],
              staticClass: _vm._$s(4, "sc", "input search-input"),
              attrs: { _i: 4 },
              domProps: { value: _vm._$s(4, "v-model", _vm.keyword) },
              on: {
                confirm: _vm.load,
                input: function ($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.keyword = $event.target.value
                },
              },
            }),
            _c("button", {
              staticClass: _vm._$s(5, "sc", "btn search-btn"),
              attrs: { _i: 5 },
              on: { click: _vm.load },
            }),
          ]
        ),
        _c(
          "view",
          { staticClass: _vm._$s(6, "sc", "sort-row"), attrs: { _i: 6 } },
          [
            _c("text", {
              class: _vm._$s(
                7,
                "c",
                _vm.sort === "hot" ? "chip active" : "chip"
              ),
              attrs: { _i: 7 },
              on: {
                click: function ($event) {
                  return _vm.setSort("hot")
                },
              },
            }),
            _c("text", {
              class: _vm._$s(
                8,
                "c",
                _vm.sort === "new" ? "chip active" : "chip"
              ),
              attrs: { _i: 8 },
              on: {
                click: function ($event) {
                  return _vm.setSort("new")
                },
              },
            }),
            _c("text", {
              class: _vm._$s(
                9,
                "c",
                _vm.sort === "rating" ? "chip active" : "chip"
              ),
              attrs: { _i: 9 },
              on: {
                click: function ($event) {
                  return _vm.setSort("rating")
                },
              },
            }),
          ]
        ),
      ]),
      _vm._$s(10, "i", _vm.hotSearches.length)
        ? _c(
            "view",
            { staticClass: _vm._$s(10, "sc", "card"), attrs: { _i: 10 } },
            [
              _c("text", {
                staticClass: _vm._$s(11, "sc", "sub-title"),
                attrs: { _i: 11 },
              }),
              _c(
                "view",
                { staticClass: _vm._$s(12, "sc", "chips"), attrs: { _i: 12 } },
                _vm._l(
                  _vm._$s(13, "f", { forItems: _vm.hotSearches }),
                  function (item, $10, $20, $30) {
                    return _c(
                      "text",
                      {
                        key: _vm._$s(13, "f", {
                          forIndex: $20,
                          key: item.keyword,
                        }),
                        staticClass: _vm._$s("13-" + $30, "sc", "chip"),
                        attrs: { _i: "13-" + $30 },
                        on: {
                          click: function ($event) {
                            return _vm.quick(item.keyword)
                          },
                        },
                      },
                      [
                        _vm._v(
                          _vm._$s("13-" + $30, "t0-0", _vm._s(item.keyword))
                        ),
                      ]
                    )
                  }
                ),
                0
              ),
            ]
          )
        : _vm._e(),
      _vm._$s(14, "i", _vm.options.categories.length || _vm.options.tags.length)
        ? _c(
            "view",
            { staticClass: _vm._$s(14, "sc", "card"), attrs: { _i: 14 } },
            [
              _c("text", {
                staticClass: _vm._$s(15, "sc", "sub-title"),
                attrs: { _i: 15 },
              }),
              _c(
                "scroll-view",
                {
                  staticClass: _vm._$s(16, "sc", "chip-scroll"),
                  attrs: { _i: 16 },
                },
                [
                  _c("text", {
                    staticClass: _vm._$s(17, "sc", "chip"),
                    attrs: { _i: 17 },
                    on: {
                      click: function ($event) {
                        return _vm.filterCategory("")
                      },
                    },
                  }),
                  _vm._l(
                    _vm._$s(18, "f", { forItems: _vm.options.categories }),
                    function (c, $11, $21, $31) {
                      return _c(
                        "text",
                        {
                          key: _vm._$s(18, "f", { forIndex: $21, key: c }),
                          class: _vm._$s(
                            "18-" + $31,
                            "c",
                            _vm.category === c ? "chip active" : "chip"
                          ),
                          attrs: { _i: "18-" + $31 },
                          on: {
                            click: function ($event) {
                              return _vm.filterCategory(c)
                            },
                          },
                        },
                        [_vm._v(_vm._$s("18-" + $31, "t0-0", _vm._s(c)))]
                      )
                    }
                  ),
                ],
                2
              ),
              _c("text", {
                staticClass: _vm._$s(19, "sc", "sub-title tag-title"),
                attrs: { _i: 19 },
              }),
              _c(
                "view",
                { staticClass: _vm._$s(20, "sc", "chips"), attrs: { _i: 20 } },
                _vm._l(
                  _vm._$s(21, "f", { forItems: _vm.options.tags.slice(0, 18) }),
                  function (t, $12, $22, $32) {
                    return _c(
                      "text",
                      {
                        key: _vm._$s(21, "f", { forIndex: $22, key: t }),
                        class: _vm._$s(
                          "21-" + $32,
                          "c",
                          _vm.tag === t ? "chip active" : "chip"
                        ),
                        attrs: { _i: "21-" + $32 },
                        on: {
                          click: function ($event) {
                            return _vm.filterTag(t)
                          },
                        },
                      },
                      [_vm._v(_vm._$s("21-" + $32, "t0-0", _vm._s(t)))]
                    )
                  }
                ),
                0
              ),
            ]
          )
        : _vm._e(),
      _vm._$s(22, "i", _vm.error)
        ? _c(
            "view",
            { staticClass: _vm._$s(22, "sc", "card"), attrs: { _i: 22 } },
            [
              _c(
                "text",
                { staticClass: _vm._$s(23, "sc", "muted"), attrs: { _i: 23 } },
                [_vm._v(_vm._$s(23, "t0-0", _vm._s(_vm.error)))]
              ),
            ]
          )
        : _vm._e(),
      _vm._$s(24, "i", _vm.loading)
        ? _c(
            "view",
            { staticClass: _vm._$s(24, "sc", "card"), attrs: { _i: 24 } },
            [
              _c("text", {
                staticClass: _vm._$s(25, "sc", "muted"),
                attrs: { _i: 25 },
              }),
            ]
          )
        : _vm._e(),
      _vm._l(
        _vm._$s(26, "f", { forItems: _vm.books }),
        function (item, $13, $23, $33) {
          return _c("BookCard", {
            key: _vm._$s(26, "f", { forIndex: $23, key: item.id }),
            attrs: { book: item, _i: "26-" + $33 },
            on: { click: _vm.goDetail },
          })
        }
      ),
      _vm._$s(27, "i", !_vm.loading && !_vm.books.length)
        ? _c(
            "view",
            { staticClass: _vm._$s(27, "sc", "card empty"), attrs: { _i: 27 } },
            [
              _c("text", {
                staticClass: _vm._$s(28, "sc", "muted"),
                attrs: { _i: 28 },
              }),
            ]
          )
        : _vm._e(),
    ],
    2
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),
/* 22 */
/*!*****************************************************************************************************************!*\
  !*** E:/翻译漫画/book-main (14)/book-main/frontend-uni/pages/search/search.vue?vue&type=script&lang=js&mpType=page ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_1_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_search_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--7-1!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/using-components.js!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./search.vue?vue&type=script&lang=js&mpType=page */ 23);\n/* harmony import */ var _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_1_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_search_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_1_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_search_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_1_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_search_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__) if([\"default\"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_1_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_search_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n /* harmony default export */ __webpack_exports__[\"default\"] = (_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_1_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_search_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0___default.a); //# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbbnVsbF0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQWlxQixDQUFnQiwrcUJBQUcsRUFBQyIsImZpbGUiOiIyMi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vSEJ1aWxkZXJYLjUuMDcuMjAyNjA0MTAwNi9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzIS4uLy4uLy4uLy4uLy4uL0hCdWlsZGVyWC41LjA3LjIwMjYwNDEwMDYvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy93ZWJwYWNrLXByZXByb2Nlc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTctMSEuLi8uLi8uLi8uLi8uLi9IQnVpbGRlclguNS4wNy4yMDI2MDQxMDA2L0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvd2VicGFjay11bmktYXBwLWxvYWRlci91c2luZy1jb21wb25lbnRzLmpzIS4uLy4uLy4uLy4uLy4uL0hCdWlsZGVyWC41LjA3LjIwMjYwNDEwMDYvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vc2VhcmNoLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZtcFR5cGU9cGFnZVwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uL0hCdWlsZGVyWC41LjA3LjIwMjYwNDEwMDYvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcyEuLi8uLi8uLi8uLi8uLi9IQnVpbGRlclguNS4wNy4yMDI2MDQxMDA2L0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvd2VicGFjay1wcmVwcm9jZXNzLWxvYWRlci9pbmRleC5qcz8/cmVmLS03LTEhLi4vLi4vLi4vLi4vLi4vSEJ1aWxkZXJYLjUuMDcuMjAyNjA0MTAwNi9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vdnVlLWNsaS1wbHVnaW4tdW5pL3BhY2thZ2VzL3dlYnBhY2stdW5pLWFwcC1sb2FkZXIvdXNpbmctY29tcG9uZW50cy5qcyEuLi8uLi8uLi8uLi8uLi9IQnVpbGRlclguNS4wNy4yMDI2MDQxMDA2L0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL3NlYXJjaC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmbXBUeXBlPXBhZ2VcIiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///22\n");

/***/ }),
/* 23 */
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--7-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/using-components.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!E:/翻译漫画/book-main (14)/book-main/frontend-uni/pages/search/search.vue?vue&type=script&lang=js&mpType=page ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 1);\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\nvar _BookCard = _interopRequireDefault(__webpack_require__(/*! ../../components/BookCard.vue */ 12));\nvar _request = __webpack_require__(/*! ../../api/request.js */ 17);\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\nvar _default = {\n  components: {\n    BookCard: _BookCard.default\n  },\n  data: function data() {\n    return {\n      keyword: '',\n      category: '',\n      tag: '',\n      sort: 'hot',\n      books: [],\n      options: {\n        categories: [],\n        tags: []\n      },\n      hotSearches: [],\n      loading: false,\n      error: ''\n    };\n  },\n  onLoad: function onLoad() {\n    this.init();\n  },\n  onPullDownRefresh: function onPullDownRefresh() {\n    var that = this;\n    this.load(function () {\n      uni.stopPullDownRefresh();\n    });\n  },\n  methods: {\n    init: function init() {\n      var that = this;\n      (0, _request.request)('/books/meta/options').then(function (res) {\n        that.options = res || {\n          categories: [],\n          tags: []\n        };\n      }).catch(function () {});\n      (0, _request.request)('/books/hot-searches?limit=10').then(function (res) {\n        that.hotSearches = res && res.items || [];\n      }).catch(function () {});\n      that.load();\n    },\n    buildPath: function buildPath() {\n      var path = '/books?limit=40&mode=hybrid&sort=' + encodeURIComponent(this.sort);\n      if (this.keyword) path += '&q=' + encodeURIComponent(this.keyword);\n      if (this.category) path += '&category=' + encodeURIComponent(this.category);\n      if (this.tag) path += '&tag=' + encodeURIComponent(this.tag);\n      return path;\n    },\n    load: function load(done) {\n      var that = this;\n      that.loading = true;\n      that.error = '';\n      (0, _request.request)(that.buildPath()).then(function (res) {\n        that.books = (0, _request.normalizeBooks)(res && (res.items || res.books || res.data) || []);\n      }).catch(function (e) {\n        that.error = e.message || '搜索失败';\n      }).then(function () {\n        that.loading = false;\n        if (done) done();\n      });\n    },\n    quick: function quick(q) {\n      this.keyword = q;\n      this.load();\n    },\n    filterCategory: function filterCategory(c) {\n      this.category = c;\n      this.load();\n    },\n    filterTag: function filterTag(t) {\n      this.tag = this.tag === t ? '' : t;\n      this.load();\n    },\n    setSort: function setSort(s) {\n      this.sort = s;\n      this.load();\n    },\n    goDetail: function goDetail(book) {\n      uni.navigateTo({\n        url: '/pages/detail/detail?id=' + (book.id || book.book_id)\n      });\n    }\n  }\n};\nexports.default = _default;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVuaS1hcHA6Ly8vcGFnZXMvc2VhcmNoL3NlYXJjaC52dWUiXSwibmFtZXMiOlsiY29tcG9uZW50cyIsIkJvb2tDYXJkIiwiZGF0YSIsImtleXdvcmQiLCJjYXRlZ29yeSIsInRhZyIsInNvcnQiLCJib29rcyIsIm9wdGlvbnMiLCJjYXRlZ29yaWVzIiwidGFncyIsImhvdFNlYXJjaGVzIiwibG9hZGluZyIsImVycm9yIiwib25Mb2FkIiwib25QdWxsRG93blJlZnJlc2giLCJ1bmkiLCJtZXRob2RzIiwiaW5pdCIsInRoYXQiLCJidWlsZFBhdGgiLCJsb2FkIiwicXVpY2siLCJmaWx0ZXJDYXRlZ29yeSIsImZpbHRlclRhZyIsInNldFNvcnQiLCJnb0RldGFpbCIsInVybCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQXFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2VBQ0E7RUFDQUE7SUFBQUM7RUFBQTtFQUNBQztJQUFBO01BQUFDO01BQUFDO01BQUFDO01BQUFDO01BQUFDO01BQUFDO1FBQUFDO1FBQUFDO01BQUE7TUFBQUM7TUFBQUM7TUFBQUM7SUFBQTtFQUFBO0VBQ0FDO0lBQUE7RUFBQTtFQUNBQztJQUFBO0lBQUE7TUFBQUM7SUFBQTtFQUFBO0VBQ0FDO0lBQ0FDO01BQ0E7TUFDQTtRQUFBQztVQUFBVjtVQUFBQztRQUFBO01BQUE7TUFDQTtRQUFBUztNQUFBO01BQ0FBO0lBQ0E7SUFDQUM7TUFDQTtNQUNBO01BQ0E7TUFDQTtNQUNBO0lBQ0E7SUFDQUM7TUFDQTtNQUNBRjtNQUFBQTtNQUNBO1FBQUFBO01BQUE7UUFBQUE7TUFBQTtRQUFBQTtRQUFBO01BQUE7SUFDQTtJQUNBRztNQUFBO01BQUE7SUFBQTtJQUNBQztNQUFBO01BQUE7SUFBQTtJQUNBQztNQUFBO01BQUE7SUFBQTtJQUNBQztNQUFBO01BQUE7SUFBQTtJQUNBQztNQUFBVjtRQUFBVztNQUFBO0lBQUE7RUFDQTtBQUNBO0FBQUEiLCJmaWxlIjoiMjMuanMiLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XG4gIDx2aWV3IGNsYXNzPVwiY29udGFpbmVyXCI+XG4gICAgPHZpZXcgY2xhc3M9XCJjYXJkXCI+XG4gICAgICA8dGV4dCBjbGFzcz1cInRpdGxlXCI+5pCc57Si5Y+R546wPC90ZXh0PlxuICAgICAgPHZpZXcgY2xhc3M9XCJzZWFyY2gtcm93XCI+XG4gICAgICAgIDxpbnB1dCBjbGFzcz1cImlucHV0IHNlYXJjaC1pbnB1dFwiIHYtbW9kZWw9XCJrZXl3b3JkXCIgcGxhY2Vob2xkZXI9XCLmkJzntKLkuablkI3jgIHkvZzogIXjgIHmoIfnrb5cIiBjb25maXJtLXR5cGU9XCJzZWFyY2hcIiBAY29uZmlybT1cImxvYWRcIiAvPlxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIHNlYXJjaC1idG5cIiBAY2xpY2s9XCJsb2FkXCI+5pCc57SiPC9idXR0b24+XG4gICAgICA8L3ZpZXc+XG4gICAgICA8dmlldyBjbGFzcz1cInNvcnQtcm93XCI+XG4gICAgICAgIDx0ZXh0IDpjbGFzcz1cInNvcnQ9PT0naG90Jz8nY2hpcCBhY3RpdmUnOidjaGlwJ1wiIEBjbGljaz1cInNldFNvcnQoJ2hvdCcpXCI+54Ot6ZeoPC90ZXh0PlxuICAgICAgICA8dGV4dCA6Y2xhc3M9XCJzb3J0PT09J25ldyc/J2NoaXAgYWN0aXZlJzonY2hpcCdcIiBAY2xpY2s9XCJzZXRTb3J0KCduZXcnKVwiPuaWsOS5pjwvdGV4dD5cbiAgICAgICAgPHRleHQgOmNsYXNzPVwic29ydD09PSdyYXRpbmcnPydjaGlwIGFjdGl2ZSc6J2NoaXAnXCIgQGNsaWNrPVwic2V0U29ydCgncmF0aW5nJylcIj7pq5jliIY8L3RleHQ+XG4gICAgICA8L3ZpZXc+XG4gICAgPC92aWV3PlxuXG4gICAgPHZpZXcgY2xhc3M9XCJjYXJkXCIgdi1pZj1cImhvdFNlYXJjaGVzLmxlbmd0aFwiPlxuICAgICAgPHRleHQgY2xhc3M9XCJzdWItdGl0bGVcIj7ng63pl6jmkJzntKI8L3RleHQ+XG4gICAgICA8dmlldyBjbGFzcz1cImNoaXBzXCI+XG4gICAgICAgIDx0ZXh0IHYtZm9yPVwiaXRlbSBpbiBob3RTZWFyY2hlc1wiIDprZXk9XCJpdGVtLmtleXdvcmRcIiBjbGFzcz1cImNoaXBcIiBAY2xpY2s9XCJxdWljayhpdGVtLmtleXdvcmQpXCI+e3sgaXRlbS5rZXl3b3JkIH19PC90ZXh0PlxuICAgICAgPC92aWV3PlxuICAgIDwvdmlldz5cblxuICAgIDx2aWV3IGNsYXNzPVwiY2FyZFwiIHYtaWY9XCJvcHRpb25zLmNhdGVnb3JpZXMubGVuZ3RoIHx8IG9wdGlvbnMudGFncy5sZW5ndGhcIj5cbiAgICAgIDx0ZXh0IGNsYXNzPVwic3ViLXRpdGxlXCI+5YiG57G7562b6YCJPC90ZXh0PlxuICAgICAgPHNjcm9sbC12aWV3IHNjcm9sbC14IGNsYXNzPVwiY2hpcC1zY3JvbGxcIj48dGV4dCBjbGFzcz1cImNoaXBcIiBAY2xpY2s9XCJmaWx0ZXJDYXRlZ29yeSgnJylcIj7lhajpg6g8L3RleHQ+PHRleHQgdi1mb3I9XCJjIGluIG9wdGlvbnMuY2F0ZWdvcmllc1wiIDprZXk9XCJjXCIgOmNsYXNzPVwiY2F0ZWdvcnk9PT1jPydjaGlwIGFjdGl2ZSc6J2NoaXAnXCIgQGNsaWNrPVwiZmlsdGVyQ2F0ZWdvcnkoYylcIj57eyBjIH19PC90ZXh0Pjwvc2Nyb2xsLXZpZXc+XG4gICAgICA8dGV4dCBjbGFzcz1cInN1Yi10aXRsZSB0YWctdGl0bGVcIj7moIfnrb48L3RleHQ+XG4gICAgICA8dmlldyBjbGFzcz1cImNoaXBzXCI+PHRleHQgdi1mb3I9XCJ0IGluIG9wdGlvbnMudGFncy5zbGljZSgwLCAxOClcIiA6a2V5PVwidFwiIDpjbGFzcz1cInRhZz09PXQ/J2NoaXAgYWN0aXZlJzonY2hpcCdcIiBAY2xpY2s9XCJmaWx0ZXJUYWcodClcIj57eyB0IH19PC90ZXh0Pjwvdmlldz5cbiAgICA8L3ZpZXc+XG5cbiAgICA8dmlldyB2LWlmPVwiZXJyb3JcIiBjbGFzcz1cImNhcmRcIj48dGV4dCBjbGFzcz1cIm11dGVkXCI+e3sgZXJyb3IgfX08L3RleHQ+PC92aWV3PlxuICAgIDx2aWV3IHYtaWY9XCJsb2FkaW5nXCIgY2xhc3M9XCJjYXJkXCI+PHRleHQgY2xhc3M9XCJtdXRlZFwiPuato+WcqOaQnOe0oi4uLjwvdGV4dD48L3ZpZXc+XG4gICAgPEJvb2tDYXJkIHYtZm9yPVwiaXRlbSBpbiBib29rc1wiIDprZXk9XCJpdGVtLmlkXCIgOmJvb2s9XCJpdGVtXCIgQGNsaWNrPVwiZ29EZXRhaWxcIj48L0Jvb2tDYXJkPlxuICAgIDx2aWV3IHYtaWY9XCIhbG9hZGluZyAmJiAhYm9va3MubGVuZ3RoXCIgY2xhc3M9XCJjYXJkIGVtcHR5XCI+PHRleHQgY2xhc3M9XCJtdXRlZFwiPuaaguaXoOe7k+aenO+8jOaNouS4quWFs+mUruivjeivleivleOAgjwvdGV4dD48L3ZpZXc+XG4gIDwvdmlldz5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5pbXBvcnQgQm9va0NhcmQgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9Cb29rQ2FyZC52dWUnXG5pbXBvcnQgeyByZXF1ZXN0LCBub3JtYWxpemVCb29rcyB9IGZyb20gJy4uLy4uL2FwaS9yZXF1ZXN0LmpzJ1xuZXhwb3J0IGRlZmF1bHQge1xuICBjb21wb25lbnRzOiB7IEJvb2tDYXJkOiBCb29rQ2FyZCB9LFxuICBkYXRhOiBmdW5jdGlvbiAoKSB7IHJldHVybiB7IGtleXdvcmQ6ICcnLCBjYXRlZ29yeTogJycsIHRhZzogJycsIHNvcnQ6ICdob3QnLCBib29rczogW10sIG9wdGlvbnM6IHsgY2F0ZWdvcmllczogW10sIHRhZ3M6IFtdIH0sIGhvdFNlYXJjaGVzOiBbXSwgbG9hZGluZzogZmFsc2UsIGVycm9yOiAnJyB9IH0sXG4gIG9uTG9hZDogZnVuY3Rpb24gKCkgeyB0aGlzLmluaXQoKSB9LFxuICBvblB1bGxEb3duUmVmcmVzaDogZnVuY3Rpb24gKCkgeyBjb25zdCB0aGF0ID0gdGhpczsgdGhpcy5sb2FkKGZ1bmN0aW9uICgpIHsgdW5pLnN0b3BQdWxsRG93blJlZnJlc2goKSB9KSB9LFxuICBtZXRob2RzOiB7XG4gICAgaW5pdDogZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3QgdGhhdCA9IHRoaXNcbiAgICAgIHJlcXVlc3QoJy9ib29rcy9tZXRhL29wdGlvbnMnKS50aGVuKGZ1bmN0aW9uIChyZXMpIHsgdGhhdC5vcHRpb25zID0gcmVzIHx8IHsgY2F0ZWdvcmllczogW10sIHRhZ3M6IFtdIH0gfSkuY2F0Y2goZnVuY3Rpb24gKCkge30pXG4gICAgICByZXF1ZXN0KCcvYm9va3MvaG90LXNlYXJjaGVzP2xpbWl0PTEwJykudGhlbihmdW5jdGlvbiAocmVzKSB7IHRoYXQuaG90U2VhcmNoZXMgPSAocmVzICYmIHJlcy5pdGVtcykgfHwgW10gfSkuY2F0Y2goZnVuY3Rpb24gKCkge30pXG4gICAgICB0aGF0LmxvYWQoKVxuICAgIH0sXG4gICAgYnVpbGRQYXRoOiBmdW5jdGlvbiAoKSB7XG4gICAgICBsZXQgcGF0aCA9ICcvYm9va3M/bGltaXQ9NDAmbW9kZT1oeWJyaWQmc29ydD0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHRoaXMuc29ydClcbiAgICAgIGlmICh0aGlzLmtleXdvcmQpIHBhdGggKz0gJyZxPScgKyBlbmNvZGVVUklDb21wb25lbnQodGhpcy5rZXl3b3JkKVxuICAgICAgaWYgKHRoaXMuY2F0ZWdvcnkpIHBhdGggKz0gJyZjYXRlZ29yeT0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHRoaXMuY2F0ZWdvcnkpXG4gICAgICBpZiAodGhpcy50YWcpIHBhdGggKz0gJyZ0YWc9JyArIGVuY29kZVVSSUNvbXBvbmVudCh0aGlzLnRhZylcbiAgICAgIHJldHVybiBwYXRoXG4gICAgfSxcbiAgICBsb2FkOiBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgY29uc3QgdGhhdCA9IHRoaXNcbiAgICAgIHRoYXQubG9hZGluZyA9IHRydWU7IHRoYXQuZXJyb3IgPSAnJ1xuICAgICAgcmVxdWVzdCh0aGF0LmJ1aWxkUGF0aCgpKS50aGVuKGZ1bmN0aW9uIChyZXMpIHsgdGhhdC5ib29rcyA9IG5vcm1hbGl6ZUJvb2tzKChyZXMgJiYgKHJlcy5pdGVtcyB8fCByZXMuYm9va3MgfHwgcmVzLmRhdGEpKSB8fCBbXSkgfSkuY2F0Y2goZnVuY3Rpb24gKGUpIHsgdGhhdC5lcnJvciA9IGUubWVzc2FnZSB8fCAn5pCc57Si5aSx6LSlJyB9KS50aGVuKGZ1bmN0aW9uICgpIHsgdGhhdC5sb2FkaW5nID0gZmFsc2U7IGlmIChkb25lKSBkb25lKCkgfSlcbiAgICB9LFxuICAgIHF1aWNrOiBmdW5jdGlvbiAocSkgeyB0aGlzLmtleXdvcmQgPSBxOyB0aGlzLmxvYWQoKSB9LFxuICAgIGZpbHRlckNhdGVnb3J5OiBmdW5jdGlvbiAoYykgeyB0aGlzLmNhdGVnb3J5ID0gYzsgdGhpcy5sb2FkKCkgfSxcbiAgICBmaWx0ZXJUYWc6IGZ1bmN0aW9uICh0KSB7IHRoaXMudGFnID0gdGhpcy50YWcgPT09IHQgPyAnJyA6IHQ7IHRoaXMubG9hZCgpIH0sXG4gICAgc2V0U29ydDogZnVuY3Rpb24gKHMpIHsgdGhpcy5zb3J0ID0gczsgdGhpcy5sb2FkKCkgfSxcbiAgICBnb0RldGFpbDogZnVuY3Rpb24gKGJvb2spIHsgdW5pLm5hdmlnYXRlVG8oeyB1cmw6ICcvcGFnZXMvZGV0YWlsL2RldGFpbD9pZD0nICsgKGJvb2suaWQgfHwgYm9vay5ib29rX2lkKSB9KSB9XG4gIH1cbn1cbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuLnNlYXJjaC1yb3d7ZGlzcGxheTpmbGV4O2dhcDoxNnJweDthbGlnbi1pdGVtczpjZW50ZXJ9LnNlYXJjaC1pbnB1dHtmbGV4OjF9LnNlYXJjaC1idG57d2lkdGg6MTUwcnB4O2ZvbnQtc2l6ZToyNnJweDtwYWRkaW5nOjB9LnNvcnQtcm93e21hcmdpbi10b3A6MThycHh9LmNoaXAtc2Nyb2xse3doaXRlLXNwYWNlOm5vd3JhcH0uY2hpcC1zY3JvbGwgLmNoaXB7ZGlzcGxheTppbmxpbmUtYmxvY2t9LnRhZy10aXRsZXttYXJnaW4tdG9wOjE4cnB4fVxuPC9zdHlsZT5cbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///23\n");

/***/ }),
/* 24 */
/*!***************************************************************************************!*\
  !*** E:/翻译漫画/book-main (14)/book-main/frontend-uni/pages/graph/graph.vue?mpType=page ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _graph_vue_vue_type_template_id_2de18398_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./graph.vue?vue&type=template&id=2de18398&scoped=true&mpType=page */ 25);\n/* harmony import */ var _graph_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./graph.vue?vue&type=script&lang=js&mpType=page */ 27);\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _graph_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__) if([\"default\"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _graph_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n/* harmony import */ var _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 18);\n\nvar renderjs\n\n\n\n\n/* normalize component */\n\nvar component = Object(_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\n  _graph_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _graph_vue_vue_type_template_id_2de18398_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _graph_vue_vue_type_template_id_2de18398_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  \"2de18398\",\n  null,\n  false,\n  _graph_vue_vue_type_template_id_2de18398_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__[\"components\"],\n  renderjs\n)\n\ncomponent.options.__file = \"pages/graph/graph.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbbnVsbF0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBeUk7QUFDekk7QUFDb0U7QUFDTDs7O0FBRy9EO0FBQ2dNO0FBQ2hNLGdCQUFnQix1TUFBVTtBQUMxQixFQUFFLHNGQUFNO0FBQ1IsRUFBRSx1R0FBTTtBQUNSLEVBQUUsZ0hBQWU7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUUsMkdBQVU7QUFDWjtBQUNBOztBQUVBO0FBQ2UsZ0YiLCJmaWxlIjoiMjQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucywgcmVjeWNsYWJsZVJlbmRlciwgY29tcG9uZW50cyB9IGZyb20gXCIuL2dyYXBoLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD0yZGUxODM5OCZzY29wZWQ9dHJ1ZSZtcFR5cGU9cGFnZVwiXG52YXIgcmVuZGVyanNcbmltcG9ydCBzY3JpcHQgZnJvbSBcIi4vZ3JhcGgudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJm1wVHlwZT1wYWdlXCJcbmV4cG9ydCAqIGZyb20gXCIuL2dyYXBoLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZtcFR5cGU9cGFnZVwiXG5cblxuLyogbm9ybWFsaXplIGNvbXBvbmVudCAqL1xuaW1wb3J0IG5vcm1hbGl6ZXIgZnJvbSBcIiEuLi8uLi8uLi8uLi8uLi9IQnVpbGRlclguNS4wNy4yMDI2MDQxMDA2L0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvdnVlLWxvYWRlci9saWIvcnVudGltZS9jb21wb25lbnROb3JtYWxpemVyLmpzXCJcbnZhciBjb21wb25lbnQgPSBub3JtYWxpemVyKFxuICBzY3JpcHQsXG4gIHJlbmRlcixcbiAgc3RhdGljUmVuZGVyRm5zLFxuICBmYWxzZSxcbiAgbnVsbCxcbiAgXCIyZGUxODM5OFwiLFxuICBudWxsLFxuICBmYWxzZSxcbiAgY29tcG9uZW50cyxcbiAgcmVuZGVyanNcbilcblxuY29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJwYWdlcy9ncmFwaC9ncmFwaC52dWVcIlxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50LmV4cG9ydHMiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///24\n");

/***/ }),
/* 25 */
/*!*********************************************************************************************************************************!*\
  !*** E:/翻译漫画/book-main (14)/book-main/frontend-uni/pages/graph/graph.vue?vue&type=template&id=2de18398&scoped=true&mpType=page ***!
  \*********************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_0_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_graph_vue_vue_type_template_id_2de18398_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--11-0!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/filter-modules-template.js!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./graph.vue?vue&type=template&id=2de18398&scoped=true&mpType=page */ 26);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_0_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_graph_vue_vue_type_template_id_2de18398_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_0_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_graph_vue_vue_type_template_id_2de18398_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_0_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_graph_vue_vue_type_template_id_2de18398_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_0_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_graph_vue_vue_type_template_id_2de18398_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),
/* 26 */
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--11-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/filter-modules-template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!E:/翻译漫画/book-main (14)/book-main/frontend-uni/pages/graph/graph.vue?vue&type=template&id=2de18398&scoped=true&mpType=page ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "view",
    { staticClass: _vm._$s(0, "sc", "container graph-page"), attrs: { _i: 0 } },
    [
      _c(
        "view",
        { staticClass: _vm._$s(1, "sc", "card hero-card"), attrs: { _i: 1 } },
        [
          _c("text", {
            staticClass: _vm._$s(2, "sc", "title"),
            attrs: { _i: 2 },
          }),
          _c("text", {
            staticClass: _vm._$s(3, "sc", "muted"),
            attrs: { _i: 3 },
          }),
          _c(
            "view",
            { staticClass: _vm._$s(4, "sc", "mode-row"), attrs: { _i: 4 } },
            [
              _c("text", {
                class: _vm._$s(
                  5,
                  "c",
                  _vm.mode === "profile" ? "chip active" : "chip"
                ),
                attrs: { _i: 5 },
                on: {
                  click: function ($event) {
                    return _vm.changeMode("profile")
                  },
                },
              }),
              _c("text", {
                class: _vm._$s(
                  6,
                  "c",
                  _vm.mode === "recent" ? "chip active" : "chip"
                ),
                attrs: { _i: 6 },
                on: {
                  click: function ($event) {
                    return _vm.changeMode("recent")
                  },
                },
              }),
              _c("text", {
                class: _vm._$s(
                  7,
                  "c",
                  _vm.mode === "high_rated" ? "chip active" : "chip"
                ),
                attrs: { _i: 7 },
                on: {
                  click: function ($event) {
                    return _vm.changeMode("high_rated")
                  },
                },
              }),
            ]
          ),
          _c("button", {
            staticClass: _vm._$s(8, "sc", "btn"),
            attrs: { _i: 8 },
            on: { click: _vm.load },
          }),
        ]
      ),
      _vm._$s(9, "i", _vm.stats)
        ? _c(
            "view",
            { staticClass: _vm._$s(9, "sc", "card"), attrs: { _i: 9 } },
            [
              _c("text", {
                staticClass: _vm._$s(10, "sc", "sub-title"),
                attrs: { _i: 10 },
              }),
              _c(
                "view",
                {
                  staticClass: _vm._$s(11, "sc", "stat-grid"),
                  attrs: { _i: 11 },
                },
                [
                  _c(
                    "view",
                    {
                      staticClass: _vm._$s(12, "sc", "stat-item"),
                      attrs: { _i: 12 },
                    },
                    [
                      _c(
                        "text",
                        {
                          staticClass: _vm._$s(13, "sc", "stat-num"),
                          attrs: { _i: 13 },
                        },
                        [
                          _vm._v(
                            _vm._$s(13, "t0-0", _vm._s(_vm.stats.books || 0))
                          ),
                        ]
                      ),
                      _c("text", {
                        staticClass: _vm._$s(14, "sc", "muted"),
                        attrs: { _i: 14 },
                      }),
                    ]
                  ),
                  _c(
                    "view",
                    {
                      staticClass: _vm._$s(15, "sc", "stat-item"),
                      attrs: { _i: 15 },
                    },
                    [
                      _c(
                        "text",
                        {
                          staticClass: _vm._$s(16, "sc", "stat-num"),
                          attrs: { _i: 16 },
                        },
                        [
                          _vm._v(
                            _vm._$s(
                              16,
                              "t0-0",
                              _vm._s(_vm.stats.semantic_nodes || 0)
                            )
                          ),
                        ]
                      ),
                      _c("text", {
                        staticClass: _vm._$s(17, "sc", "muted"),
                        attrs: { _i: 17 },
                      }),
                    ]
                  ),
                  _c(
                    "view",
                    {
                      staticClass: _vm._$s(18, "sc", "stat-item"),
                      attrs: { _i: 18 },
                    },
                    [
                      _c(
                        "text",
                        {
                          staticClass: _vm._$s(19, "sc", "stat-num"),
                          attrs: { _i: 19 },
                        },
                        [
                          _vm._v(
                            _vm._$s(
                              19,
                              "t0-0",
                              _vm._s(_vm.stats.relations || 0)
                            )
                          ),
                        ]
                      ),
                      _c("text", {
                        staticClass: _vm._$s(20, "sc", "muted"),
                        attrs: { _i: 20 },
                      }),
                    ]
                  ),
                ]
              ),
              _c(
                "text",
                { staticClass: _vm._$s(21, "sc", "muted"), attrs: { _i: 21 } },
                [_vm._v(_vm._$s(21, "t0-0", _vm._s(_vm.backendName)))]
              ),
            ]
          )
        : _vm._e(),
      _vm._$s(22, "i", _vm.error)
        ? _c(
            "view",
            { staticClass: _vm._$s(22, "sc", "card"), attrs: { _i: 22 } },
            [
              _c(
                "text",
                { staticClass: _vm._$s(23, "sc", "muted"), attrs: { _i: 23 } },
                [_vm._v(_vm._$s(23, "t0-0", _vm._s(_vm.error)))]
              ),
            ]
          )
        : _vm._e(),
      _vm._$s(24, "i", _vm.loading)
        ? _c(
            "view",
            { staticClass: _vm._$s(24, "sc", "card"), attrs: { _i: 24 } },
            [
              _c("text", {
                staticClass: _vm._$s(25, "sc", "muted"),
                attrs: { _i: 25 },
              }),
            ]
          )
        : _vm._e(),
      _vm._$s(26, "i", _vm.nodes.length)
        ? _c(
            "view",
            {
              staticClass: _vm._$s(26, "sc", "card graph-entry-card"),
              attrs: { _i: 26 },
            },
            [
              _c(
                "view",
                {
                  staticClass: _vm._$s(27, "sc", "between"),
                  attrs: { _i: 27 },
                },
                [
                  _c("view", [
                    _c("text", {
                      staticClass: _vm._$s(29, "sc", "sub-title"),
                      attrs: { _i: 29 },
                    }),
                    _c(
                      "text",
                      {
                        staticClass: _vm._$s(30, "sc", "muted"),
                        attrs: { _i: 30 },
                      },
                      [
                        _vm._v(
                          _vm._$s(30, "t0-0", _vm._s(_vm.nodes.length)) +
                            _vm._$s(30, "t0-1", _vm._s(_vm.edges.length))
                        ),
                      ]
                    ),
                  ]),
                  _c("text", {
                    staticClass: _vm._$s(31, "sc", "graph-icon"),
                    attrs: { _i: 31 },
                  }),
                ]
              ),
              _c(
                "view",
                {
                  staticClass: _vm._$s(32, "sc", "preview-bar"),
                  attrs: { _i: 32 },
                },
                _vm._l(
                  _vm._$s(33, "f", { forItems: _vm.previewNodes }),
                  function (n, $10, $20, $30) {
                    return _c(
                      "text",
                      {
                        key: _vm._$s(33, "f", { forIndex: $20, key: n.id }),
                        staticClass: _vm._$s("33-" + $30, "sc", "preview-node"),
                        attrs: { _i: "33-" + $30 },
                      },
                      [
                        _vm._v(
                          _vm._$s(
                            "33-" + $30,
                            "t0-0",
                            _vm._s(_vm.shortLabel(n.label, 4))
                          )
                        ),
                      ]
                    )
                  }
                ),
                0
              ),
              _c("button", {
                staticClass: _vm._$s(34, "sc", "btn"),
                attrs: { _i: 34 },
                on: { click: _vm.openGraphFull },
              }),
            ]
          )
        : _vm._e(),
      _vm._$s(35, "i", _vm.nodes.length)
        ? _c(
            "view",
            { staticClass: _vm._$s(35, "sc", "card"), attrs: { _i: 35 } },
            [
              _c("text", {
                staticClass: _vm._$s(36, "sc", "sub-title"),
                attrs: { _i: 36 },
              }),
              _vm._l(
                _vm._$s(37, "f", { forItems: _vm.nodes.slice(0, 18) }),
                function (n, $11, $21, $31) {
                  return _c(
                    "view",
                    {
                      key: _vm._$s(37, "f", { forIndex: $21, key: n.id }),
                      staticClass: _vm._$s("37-" + $31, "sc", "node"),
                      attrs: { _i: "37-" + $31 },
                    },
                    [
                      _c(
                        "text",
                        {
                          staticClass: _vm._$s("38-" + $31, "sc", "node-type"),
                          attrs: { _i: "38-" + $31 },
                        },
                        [
                          _vm._v(
                            _vm._$s(
                              "38-" + $31,
                              "t0-0",
                              _vm._s(_vm.typeLabel(n.type))
                            )
                          ),
                        ]
                      ),
                      _c(
                        "text",
                        {
                          staticClass: _vm._$s("39-" + $31, "sc", "node-label"),
                          attrs: { _i: "39-" + $31 },
                        },
                        [_vm._v(_vm._$s("39-" + $31, "t0-0", _vm._s(n.label)))]
                      ),
                    ]
                  )
                }
              ),
            ],
            2
          )
        : _vm._e(),
      _vm._$s(40, "i", _vm.edges.length)
        ? _c(
            "view",
            { staticClass: _vm._$s(40, "sc", "card"), attrs: { _i: 40 } },
            [
              _c("text", {
                staticClass: _vm._$s(41, "sc", "sub-title"),
                attrs: { _i: 41 },
              }),
              _vm._l(
                _vm._$s(42, "f", { forItems: _vm.edges.slice(0, 24) }),
                function (e, idx, $22, $32) {
                  return _c(
                    "view",
                    {
                      key: _vm._$s(42, "f", { forIndex: $22, key: idx }),
                      staticClass: _vm._$s("42-" + $32, "sc", "edge"),
                      attrs: { _i: "42-" + $32 },
                    },
                    [
                      _c(
                        "text",
                        {
                          staticClass: _vm._$s("43-" + $32, "sc", "muted"),
                          attrs: { _i: "43-" + $32 },
                        },
                        [
                          _vm._v(
                            _vm._$s(
                              "43-" + $32,
                              "t0-0",
                              _vm._s(_vm.nodeName(e.source))
                            ) +
                              _vm._$s(
                                "43-" + $32,
                                "t0-1",
                                _vm._s(e.label || e.relation)
                              ) +
                              _vm._$s(
                                "43-" + $32,
                                "t0-2",
                                _vm._s(_vm.nodeName(e.target))
                              )
                          ),
                        ]
                      ),
                    ]
                  )
                }
              ),
            ],
            2
          )
        : _vm._e(),
      _vm._$s(44, "i", _vm.explainCards.length)
        ? _c(
            "view",
            { staticClass: _vm._$s(44, "sc", "card"), attrs: { _i: 44 } },
            [
              _c("text", {
                staticClass: _vm._$s(45, "sc", "sub-title"),
                attrs: { _i: 45 },
              }),
              _vm._l(
                _vm._$s(46, "f", { forItems: _vm.explainCards }),
                function (p, $13, $23, $33) {
                  return _c(
                    "view",
                    {
                      key: _vm._$s(46, "f", { forIndex: $23, key: p.key }),
                      staticClass: _vm._$s("46-" + $33, "sc", "path-card"),
                      attrs: { _i: "46-" + $33 },
                      on: {
                        click: function ($event) {
                          return _vm.openPathCard(p)
                        },
                      },
                    },
                    [
                      _c(
                        "view",
                        {
                          staticClass: _vm._$s("47-" + $33, "sc", "between"),
                          attrs: { _i: "47-" + $33 },
                        },
                        [
                          _c(
                            "text",
                            {
                              staticClass: _vm._$s(
                                "48-" + $33,
                                "sc",
                                "path-title"
                              ),
                              attrs: { _i: "48-" + $33 },
                            },
                            [
                              _vm._v(
                                _vm._$s("48-" + $33, "t0-0", _vm._s(p.title))
                              ),
                            ]
                          ),
                          _c(
                            "text",
                            {
                              staticClass: _vm._$s(
                                "49-" + $33,
                                "sc",
                                "path-badge"
                              ),
                              attrs: { _i: "49-" + $33 },
                            },
                            [
                              _vm._v(
                                _vm._$s("49-" + $33, "t0-0", _vm._s(p.badge))
                              ),
                            ]
                          ),
                        ]
                      ),
                      _c(
                        "text",
                        {
                          staticClass: _vm._$s("50-" + $33, "sc", "path-text"),
                          attrs: { _i: "50-" + $33 },
                        },
                        [_vm._v(_vm._$s("50-" + $33, "t0-0", _vm._s(p.text)))]
                      ),
                    ]
                  )
                }
              ),
            ],
            2
          )
        : _vm._e(),
    ]
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),
/* 27 */
/*!***************************************************************************************************************!*\
  !*** E:/翻译漫画/book-main (14)/book-main/frontend-uni/pages/graph/graph.vue?vue&type=script&lang=js&mpType=page ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_1_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_graph_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--7-1!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/using-components.js!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./graph.vue?vue&type=script&lang=js&mpType=page */ 28);\n/* harmony import */ var _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_1_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_graph_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_1_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_graph_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_1_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_graph_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__) if([\"default\"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_1_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_graph_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n /* harmony default export */ __webpack_exports__[\"default\"] = (_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_1_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_graph_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0___default.a); //# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbbnVsbF0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQWdxQixDQUFnQiw4cUJBQUcsRUFBQyIsImZpbGUiOiIyNy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vSEJ1aWxkZXJYLjUuMDcuMjAyNjA0MTAwNi9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzIS4uLy4uLy4uLy4uLy4uL0hCdWlsZGVyWC41LjA3LjIwMjYwNDEwMDYvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy93ZWJwYWNrLXByZXByb2Nlc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTctMSEuLi8uLi8uLi8uLi8uLi9IQnVpbGRlclguNS4wNy4yMDI2MDQxMDA2L0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvd2VicGFjay11bmktYXBwLWxvYWRlci91c2luZy1jb21wb25lbnRzLmpzIS4uLy4uLy4uLy4uLy4uL0hCdWlsZGVyWC41LjA3LjIwMjYwNDEwMDYvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vZ3JhcGgudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJm1wVHlwZT1wYWdlXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vSEJ1aWxkZXJYLjUuMDcuMjAyNjA0MTAwNi9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzIS4uLy4uLy4uLy4uLy4uL0hCdWlsZGVyWC41LjA3LjIwMjYwNDEwMDYvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy93ZWJwYWNrLXByZXByb2Nlc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTctMSEuLi8uLi8uLi8uLi8uLi9IQnVpbGRlclguNS4wNy4yMDI2MDQxMDA2L0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvd2VicGFjay11bmktYXBwLWxvYWRlci91c2luZy1jb21wb25lbnRzLmpzIS4uLy4uLy4uLy4uLy4uL0hCdWlsZGVyWC41LjA3LjIwMjYwNDEwMDYvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vZ3JhcGgudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJm1wVHlwZT1wYWdlXCIiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///27\n");

/***/ }),
/* 28 */
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--7-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/using-components.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!E:/翻译漫画/book-main (14)/book-main/frontend-uni/pages/graph/graph.vue?vue&type=script&lang=js&mpType=page ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\nvar _request = __webpack_require__(/*! ../../api/request.js */ 17);\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\nvar _default = {\n  data: function data() {\n    return {\n      mode: 'profile',\n      loading: false,\n      error: '',\n      stats: null,\n      graph: {},\n      nodes: [],\n      edges: [],\n      paths: []\n    };\n  },\n  computed: {\n    backendName: function backendName() {\n      var b = this.graph && this.graph.backend || this.stats && this.stats.backend || '';\n      return b === 'sql-fallback' ? '本地图谱' : b || '图谱服务';\n    },\n    previewNodes: function previewNodes() {\n      return (this.nodes || []).slice(0, 8);\n    },\n    explainCards: function explainCards() {\n      var that = this;\n      var seen = {};\n      var out = [];\n      (this.paths || []).forEach(function (p, idx) {\n        var title = that.pathTitle(p, idx);\n        var text = that.pathText(p);\n        var badge = that.pathBadge(p);\n        var keyText = title + '|' + text;\n        if (!text || seen[keyText]) return;\n        seen[keyText] = true;\n        out.push({\n          key: 'p' + idx + '-' + keyText,\n          title: title,\n          text: text,\n          badge: badge,\n          book_id: p.book_id || p.id\n        });\n      });\n      if (!out.length) {\n        ;\n        (this.edges || []).slice(0, 8).forEach(function (e, idx) {\n          var text = that.nodeName(e.source) + ' → ' + (e.label || e.relation || '关联') + ' → ' + that.nodeName(e.target);\n          if (seen[text]) return;\n          seen[text] = true;\n          out.push({\n            key: 'e' + idx,\n            title: '图谱路径 ' + (idx + 1),\n            text: text,\n            badge: '关系'\n          });\n        });\n      }\n      return out.slice(0, 10);\n    }\n  },\n  onLoad: function onLoad() {\n    this.load();\n  },\n  onPullDownRefresh: function onPullDownRefresh() {\n    var that = this;\n    this.load(function () {\n      uni.stopPullDownRefresh();\n    });\n  },\n  methods: {\n    load: function load(done) {\n      var that = this;\n      that.loading = true;\n      that.error = '';\n      Promise.all([(0, _request.request)('/graph/stats'), (0, _request.request)('/graph/profile-graph?mode=' + that.mode + '&limit=36')]).then(function (res) {\n        that.stats = res[0] || null;\n        that.graph = res[1] || {};\n        that.nodes = that.graph.nodes || [];\n        that.edges = that.graph.edges || [];\n        that.paths = that.graph.path_cards || that.graph.items || [];\n      }).catch(function (e) {\n        that.error = e.message || '图谱加载失败';\n      }).then(function () {\n        that.loading = false;\n        if (done) done();\n      });\n    },\n    changeMode: function changeMode(m) {\n      this.mode = m;\n      this.load();\n    },\n    openGraphFull: function openGraphFull() {\n      uni.navigateTo({\n        url: '/pages/graph-full/graph-full?mode=' + encodeURIComponent(this.mode)\n      });\n    },\n    typeLabel: function typeLabel(type) {\n      var map = {\n        Profile: '画像',\n        InterestCluster: '兴趣簇',\n        SeedBook: '种子书',\n        Book: '图书',\n        Author: '作者',\n        Tag: '标签',\n        Field: '领域',\n        Audience: '适读人群',\n        Difficulty: '难度',\n        Keyword: '关键词',\n        Topic: '主题',\n        Publisher: '出版社',\n        Series: '系列'\n      };\n      return map[type] || type || '节点';\n    },\n    shortLabel: function shortLabel(label, max) {\n      label = String(label || '节点');\n      max = max || 5;\n      return label.length > max ? label.slice(0, max) + '…' : label;\n    },\n    nodeName: function nodeName(id) {\n      var found = this.nodes.find(function (n) {\n        return n.id === id;\n      });\n      return found ? found.label : id;\n    },\n    pathTitle: function pathTitle(p, idx) {\n      if (p.target) return '推荐《' + p.target + '》';\n      if (p.title) return p.title;\n      if (p.book && p.book.title) return p.book.title;\n      return '推荐路径 ' + (idx + 1);\n    },\n    pathText: function pathText(p) {\n      if (p.path_text) return p.path_text;\n      if (p.reason && p.reason !== '基于知识图谱路径推荐') return p.reason;\n      if (p.source && p.target) return '《' + p.source + '》 → ' + (p.label || this.pathBadge(p)) + ' → 《' + p.target + '》';\n      if (Array.isArray(p.paths) && p.paths.length) {\n        var first = p.paths[0];\n        if (first.path_text) return first.path_text;\n        if (first.label) return '通过「' + first.label + '」产生推荐';\n      }\n      return p.reason || '根据当前画像、语义节点和图书关系生成推荐。';\n    },\n    pathBadge: function pathBadge(p) {\n      var map = {\n        same_author: '同作者',\n        same_tag: '同标签',\n        same_series: '同系列',\n        same_publisher: '同出版社',\n        similar: '相似',\n        multi_hop: '多跳',\n        same_field: '领域',\n        same_audience: '人群',\n        same_keyword: '关键词',\n        same_difficulty: '难度',\n        topic_bridge: '主题',\n        next_read: '续读',\n        prerequisite: '前置'\n      };\n      return p.label || map[p.type] || '图谱';\n    },\n    openPathCard: function openPathCard(p) {\n      if (p.book_id) uni.navigateTo({\n        url: '/pages/detail/detail?id=' + p.book_id\n      });\n    }\n  }\n};\nexports.default = _default;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVuaS1hcHA6Ly8vcGFnZXMvZ3JhcGgvZ3JhcGgudnVlIl0sIm5hbWVzIjpbImRhdGEiLCJtb2RlIiwibG9hZGluZyIsImVycm9yIiwic3RhdHMiLCJncmFwaCIsIm5vZGVzIiwiZWRnZXMiLCJwYXRocyIsImNvbXB1dGVkIiwiYmFja2VuZE5hbWUiLCJwcmV2aWV3Tm9kZXMiLCJleHBsYWluQ2FyZHMiLCJzZWVuIiwib3V0Iiwia2V5IiwidGl0bGUiLCJ0ZXh0IiwiYmFkZ2UiLCJib29rX2lkIiwib25Mb2FkIiwib25QdWxsRG93blJlZnJlc2giLCJ1bmkiLCJtZXRob2RzIiwibG9hZCIsInRoYXQiLCJQcm9taXNlIiwiY2hhbmdlTW9kZSIsIm9wZW5HcmFwaEZ1bGwiLCJ1cmwiLCJ0eXBlTGFiZWwiLCJQcm9maWxlIiwiSW50ZXJlc3RDbHVzdGVyIiwiU2VlZEJvb2siLCJCb29rIiwiQXV0aG9yIiwiVGFnIiwiRmllbGQiLCJBdWRpZW5jZSIsIkRpZmZpY3VsdHkiLCJLZXl3b3JkIiwiVG9waWMiLCJQdWJsaXNoZXIiLCJTZXJpZXMiLCJzaG9ydExhYmVsIiwibGFiZWwiLCJtYXgiLCJub2RlTmFtZSIsInBhdGhUaXRsZSIsInBhdGhUZXh0IiwicGF0aEJhZGdlIiwic2FtZV9hdXRob3IiLCJzYW1lX3RhZyIsInNhbWVfc2VyaWVzIiwic2FtZV9wdWJsaXNoZXIiLCJzaW1pbGFyIiwibXVsdGlfaG9wIiwic2FtZV9maWVsZCIsInNhbWVfYXVkaWVuY2UiLCJzYW1lX2tleXdvcmQiLCJzYW1lX2RpZmZpY3VsdHkiLCJ0b3BpY19icmlkZ2UiLCJuZXh0X3JlYWQiLCJwcmVyZXF1aXNpdGUiLCJvcGVuUGF0aENhcmQiXSwibWFwcGluZ3MiOiI7Ozs7OztBQXFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2VBRUE7RUFDQUE7SUFDQTtNQUFBQztNQUFBQztNQUFBQztNQUFBQztNQUFBQztNQUFBQztNQUFBQztNQUFBQztJQUFBO0VBQ0E7RUFDQUM7SUFDQUM7TUFDQTtNQUNBO0lBQ0E7SUFDQUM7TUFDQTtJQUNBO0lBQ0FDO01BQ0E7TUFDQTtNQUNBO01BQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0FDO1FBQ0FDO1VBQUFDO1VBQUFDO1VBQUFDO1VBQUFDO1VBQUFDO1FBQUE7TUFDQTtNQUNBO1FBQ0E7UUFBQTtVQUNBO1VBQ0E7VUFDQU47VUFDQUM7WUFBQUM7WUFBQUM7WUFBQUM7WUFBQUM7VUFBQTtRQUNBO01BQ0E7TUFDQTtJQUNBO0VBQ0E7RUFDQUU7SUFBQTtFQUFBO0VBQ0FDO0lBQ0E7SUFDQTtNQUFBQztJQUFBO0VBQ0E7RUFDQUM7SUFDQUM7TUFDQTtNQUNBQztNQUNBQTtNQUNBQyxhQUNBLHVDQUNBLDhFQUNBO1FBQ0FEO1FBQ0FBO1FBQ0FBO1FBQ0FBO1FBQ0FBO01BQ0E7UUFDQUE7TUFDQTtRQUNBQTtRQUNBO01BQ0E7SUFDQTtJQUNBRTtNQUFBO01BQUE7SUFBQTtJQUNBQztNQUNBTjtRQUFBTztNQUFBO0lBQ0E7SUFDQUM7TUFDQTtRQUFBQztRQUFBQztRQUFBQztRQUFBQztRQUFBQztRQUFBQztRQUFBQztRQUFBQztRQUFBQztRQUFBQztRQUFBQztRQUFBQztRQUFBQztNQUFBO01BQ0E7SUFDQTtJQUNBQztNQUNBQztNQUNBQztNQUNBO0lBQ0E7SUFDQUM7TUFDQTtRQUFBO01BQUE7TUFDQTtJQUNBO0lBQ0FDO01BQ0E7TUFDQTtNQUNBO01BQ0E7SUFDQTtJQUNBQztNQUNBO01BQ0E7TUFDQTtNQUNBO1FBQ0E7UUFDQTtRQUNBO01BQ0E7TUFDQTtJQUNBO0lBQ0FDO01BQ0E7UUFBQUM7UUFBQUM7UUFBQUM7UUFBQUM7UUFBQUM7UUFBQUM7UUFBQUM7UUFBQUM7UUFBQUM7UUFBQUM7UUFBQUM7UUFBQUM7UUFBQUM7TUFBQTtNQUNBO0lBQ0E7SUFDQUM7TUFDQTtRQUFBbkM7TUFBQTtJQUNBO0VBQ0E7QUFDQTtBQUFBIiwiZmlsZSI6IjI4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiPHRlbXBsYXRlPlxuICA8dmlldyBjbGFzcz1cImNvbnRhaW5lciBncmFwaC1wYWdlXCI+XG4gICAgPHZpZXcgY2xhc3M9XCJjYXJkIGhlcm8tY2FyZFwiPlxuICAgICAgPHRleHQgY2xhc3M9XCJ0aXRsZVwiPuefpeivhuWbvuiwsTwvdGV4dD5cbiAgICAgIDx0ZXh0IGNsYXNzPVwibXV0ZWRcIj7lsZXnpLrnlLvlg4/kuK3lv4PjgIHlhbTotqPnsIfjgIHnp43lrZDkuabjgIHor63kuYnoioLngrnlkozmjqjojZDot6/lvoTjgII8L3RleHQ+XG4gICAgICA8dmlldyBjbGFzcz1cIm1vZGUtcm93XCI+XG4gICAgICAgIDx0ZXh0IDpjbGFzcz1cIm1vZGU9PT0ncHJvZmlsZSc/J2NoaXAgYWN0aXZlJzonY2hpcCdcIiBAY2xpY2s9XCJjaGFuZ2VNb2RlKCdwcm9maWxlJylcIj7nlLvlg488L3RleHQ+XG4gICAgICAgIDx0ZXh0IDpjbGFzcz1cIm1vZGU9PT0ncmVjZW50Jz8nY2hpcCBhY3RpdmUnOidjaGlwJ1wiIEBjbGljaz1cImNoYW5nZU1vZGUoJ3JlY2VudCcpXCI+5pyA6L+R6ZiF6K+7PC90ZXh0PlxuICAgICAgICA8dGV4dCA6Y2xhc3M9XCJtb2RlPT09J2hpZ2hfcmF0ZWQnPydjaGlwIGFjdGl2ZSc6J2NoaXAnXCIgQGNsaWNrPVwiY2hhbmdlTW9kZSgnaGlnaF9yYXRlZCcpXCI+6auY5YiG5Zu+5LmmPC90ZXh0PlxuICAgICAgPC92aWV3PlxuICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0blwiIEBjbGljaz1cImxvYWRcIj7liLfmlrDlm77osLE8L2J1dHRvbj5cbiAgICA8L3ZpZXc+XG5cbiAgICA8dmlldyBjbGFzcz1cImNhcmRcIiB2LWlmPVwic3RhdHNcIj5cbiAgICAgIDx0ZXh0IGNsYXNzPVwic3ViLXRpdGxlXCI+5Zu+6LCx5pGY6KaBPC90ZXh0PlxuICAgICAgPHZpZXcgY2xhc3M9XCJzdGF0LWdyaWRcIj5cbiAgICAgICAgPHZpZXcgY2xhc3M9XCJzdGF0LWl0ZW1cIj48dGV4dCBjbGFzcz1cInN0YXQtbnVtXCI+e3sgc3RhdHMuYm9va3MgfHwgMCB9fTwvdGV4dD48dGV4dCBjbGFzcz1cIm11dGVkXCI+5Zu+5LmmPC90ZXh0Pjwvdmlldz5cbiAgICAgICAgPHZpZXcgY2xhc3M9XCJzdGF0LWl0ZW1cIj48dGV4dCBjbGFzcz1cInN0YXQtbnVtXCI+e3sgc3RhdHMuc2VtYW50aWNfbm9kZXMgfHwgMCB9fTwvdGV4dD48dGV4dCBjbGFzcz1cIm11dGVkXCI+6K+t5LmJ6IqC54K5PC90ZXh0Pjwvdmlldz5cbiAgICAgICAgPHZpZXcgY2xhc3M9XCJzdGF0LWl0ZW1cIj48dGV4dCBjbGFzcz1cInN0YXQtbnVtXCI+e3sgc3RhdHMucmVsYXRpb25zIHx8IDAgfX08L3RleHQ+PHRleHQgY2xhc3M9XCJtdXRlZFwiPuWFs+ezuzwvdGV4dD48L3ZpZXc+XG4gICAgICA8L3ZpZXc+XG4gICAgICA8dGV4dCBjbGFzcz1cIm11dGVkXCI+5b2T5YmN5p2l5rqQ77yae3sgYmFja2VuZE5hbWUgfX08L3RleHQ+XG4gICAgPC92aWV3PlxuXG4gICAgPHZpZXcgdi1pZj1cImVycm9yXCIgY2xhc3M9XCJjYXJkXCI+PHRleHQgY2xhc3M9XCJtdXRlZFwiPnt7IGVycm9yIH19PC90ZXh0Pjwvdmlldz5cbiAgICA8dmlldyB2LWlmPVwibG9hZGluZ1wiIGNsYXNzPVwiY2FyZFwiPjx0ZXh0IGNsYXNzPVwibXV0ZWRcIj7mraPlnKjnlJ/miJDlm77osLEuLi48L3RleHQ+PC92aWV3PlxuXG4gICAgPHZpZXcgY2xhc3M9XCJjYXJkIGdyYXBoLWVudHJ5LWNhcmRcIiB2LWlmPVwibm9kZXMubGVuZ3RoXCI+XG4gICAgICA8dmlldyBjbGFzcz1cImJldHdlZW5cIj5cbiAgICAgICAgPHZpZXc+XG4gICAgICAgICAgPHRleHQgY2xhc3M9XCJzdWItdGl0bGVcIj7lm77osLHlhbPns7vlm748L3RleHQ+XG4gICAgICAgICAgPHRleHQgY2xhc3M9XCJtdXRlZFwiPnt7IG5vZGVzLmxlbmd0aCB9fSDkuKroioLngrkgwrcge3sgZWRnZXMubGVuZ3RoIH19IOadoeWFs+ezuzwvdGV4dD5cbiAgICAgICAgPC92aWV3PlxuICAgICAgICA8dGV4dCBjbGFzcz1cImdyYXBoLWljb25cIj7wn5W477iPPC90ZXh0PlxuICAgICAgPC92aWV3PlxuICAgICAgPHZpZXcgY2xhc3M9XCJwcmV2aWV3LWJhclwiPlxuICAgICAgICA8dGV4dCB2LWZvcj1cIm4gaW4gcHJldmlld05vZGVzXCIgOmtleT1cIm4uaWRcIiBjbGFzcz1cInByZXZpZXctbm9kZVwiPnt7IHNob3J0TGFiZWwobi5sYWJlbCwgNCkgfX08L3RleHQ+XG4gICAgICA8L3ZpZXc+XG4gICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuXCIgQGNsaWNrPVwib3BlbkdyYXBoRnVsbFwiPuaJk+W8gOWbvuiwseWFs+ezu+WbvjwvYnV0dG9uPlxuICAgIDwvdmlldz5cblxuICAgIDx2aWV3IGNsYXNzPVwiY2FyZFwiIHYtaWY9XCJub2Rlcy5sZW5ndGhcIj5cbiAgICAgIDx0ZXh0IGNsYXNzPVwic3ViLXRpdGxlXCI+6IqC54K55YWz57O7PC90ZXh0PlxuICAgICAgPHZpZXcgY2xhc3M9XCJub2RlXCIgdi1mb3I9XCJuIGluIG5vZGVzLnNsaWNlKDAsIDE4KVwiIDprZXk9XCJuLmlkXCI+XG4gICAgICAgIDx0ZXh0IGNsYXNzPVwibm9kZS10eXBlXCI+e3sgdHlwZUxhYmVsKG4udHlwZSkgfX08L3RleHQ+XG4gICAgICAgIDx0ZXh0IGNsYXNzPVwibm9kZS1sYWJlbFwiPnt7IG4ubGFiZWwgfX08L3RleHQ+XG4gICAgICA8L3ZpZXc+XG4gICAgPC92aWV3PlxuXG4gICAgPHZpZXcgY2xhc3M9XCJjYXJkXCIgdi1pZj1cImVkZ2VzLmxlbmd0aFwiPlxuICAgICAgPHRleHQgY2xhc3M9XCJzdWItdGl0bGVcIj7lhbPns7vot6/lvoQ8L3RleHQ+XG4gICAgICA8dmlldyBjbGFzcz1cImVkZ2VcIiB2LWZvcj1cIihlLGlkeCkgaW4gZWRnZXMuc2xpY2UoMCwgMjQpXCIgOmtleT1cImlkeFwiPlxuICAgICAgICA8dGV4dCBjbGFzcz1cIm11dGVkXCI+e3sgbm9kZU5hbWUoZS5zb3VyY2UpIH19IOKGkiB7eyBlLmxhYmVsIHx8IGUucmVsYXRpb24gfX0g4oaSIHt7IG5vZGVOYW1lKGUudGFyZ2V0KSB9fTwvdGV4dD5cbiAgICAgIDwvdmlldz5cbiAgICA8L3ZpZXc+XG5cbiAgICA8dmlldyBjbGFzcz1cImNhcmRcIiB2LWlmPVwiZXhwbGFpbkNhcmRzLmxlbmd0aFwiPlxuICAgICAgPHRleHQgY2xhc3M9XCJzdWItdGl0bGVcIj7mjqjojZDot6/lvoTop6Pph4o8L3RleHQ+XG4gICAgICA8dmlldyBjbGFzcz1cInBhdGgtY2FyZFwiIHYtZm9yPVwicCBpbiBleHBsYWluQ2FyZHNcIiA6a2V5PVwicC5rZXlcIiBAY2xpY2s9XCJvcGVuUGF0aENhcmQocClcIj5cbiAgICAgICAgPHZpZXcgY2xhc3M9XCJiZXR3ZWVuXCI+XG4gICAgICAgICAgPHRleHQgY2xhc3M9XCJwYXRoLXRpdGxlXCI+e3sgcC50aXRsZSB9fTwvdGV4dD5cbiAgICAgICAgICA8dGV4dCBjbGFzcz1cInBhdGgtYmFkZ2VcIj57eyBwLmJhZGdlIH19PC90ZXh0PlxuICAgICAgICA8L3ZpZXc+XG4gICAgICAgIDx0ZXh0IGNsYXNzPVwicGF0aC10ZXh0XCI+e3sgcC50ZXh0IH19PC90ZXh0PlxuICAgICAgPC92aWV3PlxuICAgIDwvdmlldz5cbiAgPC92aWV3PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmltcG9ydCB7IHJlcXVlc3QgfSBmcm9tICcuLi8uLi9hcGkvcmVxdWVzdC5qcydcblxuZXhwb3J0IGRlZmF1bHQge1xuICBkYXRhOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHsgbW9kZTogJ3Byb2ZpbGUnLCBsb2FkaW5nOiBmYWxzZSwgZXJyb3I6ICcnLCBzdGF0czogbnVsbCwgZ3JhcGg6IHt9LCBub2RlczogW10sIGVkZ2VzOiBbXSwgcGF0aHM6IFtdIH1cbiAgfSxcbiAgY29tcHV0ZWQ6IHtcbiAgICBiYWNrZW5kTmFtZTogZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3QgYiA9ICh0aGlzLmdyYXBoICYmIHRoaXMuZ3JhcGguYmFja2VuZCkgfHwgKHRoaXMuc3RhdHMgJiYgdGhpcy5zdGF0cy5iYWNrZW5kKSB8fCAnJ1xuICAgICAgcmV0dXJuIGIgPT09ICdzcWwtZmFsbGJhY2snID8gJ+acrOWcsOWbvuiwsScgOiAoYiB8fCAn5Zu+6LCx5pyN5YqhJylcbiAgICB9LFxuICAgIHByZXZpZXdOb2RlczogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuICh0aGlzLm5vZGVzIHx8IFtdKS5zbGljZSgwLCA4KVxuICAgIH0sXG4gICAgZXhwbGFpbkNhcmRzOiBmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zdCB0aGF0ID0gdGhpc1xuICAgICAgY29uc3Qgc2VlbiA9IHt9XG4gICAgICBjb25zdCBvdXQgPSBbXVxuICAgICAgOyh0aGlzLnBhdGhzIHx8IFtdKS5mb3JFYWNoKGZ1bmN0aW9uIChwLCBpZHgpIHtcbiAgICAgICAgY29uc3QgdGl0bGUgPSB0aGF0LnBhdGhUaXRsZShwLCBpZHgpXG4gICAgICAgIGNvbnN0IHRleHQgPSB0aGF0LnBhdGhUZXh0KHApXG4gICAgICAgIGNvbnN0IGJhZGdlID0gdGhhdC5wYXRoQmFkZ2UocClcbiAgICAgICAgY29uc3Qga2V5VGV4dCA9IHRpdGxlICsgJ3wnICsgdGV4dFxuICAgICAgICBpZiAoIXRleHQgfHwgc2VlbltrZXlUZXh0XSkgcmV0dXJuXG4gICAgICAgIHNlZW5ba2V5VGV4dF0gPSB0cnVlXG4gICAgICAgIG91dC5wdXNoKHsga2V5OiAncCcgKyBpZHggKyAnLScgKyBrZXlUZXh0LCB0aXRsZTogdGl0bGUsIHRleHQ6IHRleHQsIGJhZGdlOiBiYWRnZSwgYm9va19pZDogcC5ib29rX2lkIHx8IHAuaWQgfSlcbiAgICAgIH0pXG4gICAgICBpZiAoIW91dC5sZW5ndGgpIHtcbiAgICAgICAgOyh0aGlzLmVkZ2VzIHx8IFtdKS5zbGljZSgwLCA4KS5mb3JFYWNoKGZ1bmN0aW9uIChlLCBpZHgpIHtcbiAgICAgICAgICBjb25zdCB0ZXh0ID0gdGhhdC5ub2RlTmFtZShlLnNvdXJjZSkgKyAnIOKGkiAnICsgKGUubGFiZWwgfHwgZS5yZWxhdGlvbiB8fCAn5YWz6IGUJykgKyAnIOKGkiAnICsgdGhhdC5ub2RlTmFtZShlLnRhcmdldClcbiAgICAgICAgICBpZiAoc2Vlblt0ZXh0XSkgcmV0dXJuXG4gICAgICAgICAgc2Vlblt0ZXh0XSA9IHRydWVcbiAgICAgICAgICBvdXQucHVzaCh7IGtleTogJ2UnICsgaWR4LCB0aXRsZTogJ+Wbvuiwsei3r+W+hCAnICsgKGlkeCArIDEpLCB0ZXh0OiB0ZXh0LCBiYWRnZTogJ+WFs+ezuycgfSlcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICAgIHJldHVybiBvdXQuc2xpY2UoMCwgMTApXG4gICAgfVxuICB9LFxuICBvbkxvYWQ6IGZ1bmN0aW9uICgpIHsgdGhpcy5sb2FkKCkgfSxcbiAgb25QdWxsRG93blJlZnJlc2g6IGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCB0aGF0ID0gdGhpc1xuICAgIHRoaXMubG9hZChmdW5jdGlvbiAoKSB7IHVuaS5zdG9wUHVsbERvd25SZWZyZXNoKCkgfSlcbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIGxvYWQ6IGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICBjb25zdCB0aGF0ID0gdGhpc1xuICAgICAgdGhhdC5sb2FkaW5nID0gdHJ1ZVxuICAgICAgdGhhdC5lcnJvciA9ICcnXG4gICAgICBQcm9taXNlLmFsbChbXG4gICAgICAgIHJlcXVlc3QoJy9ncmFwaC9zdGF0cycpLFxuICAgICAgICByZXF1ZXN0KCcvZ3JhcGgvcHJvZmlsZS1ncmFwaD9tb2RlPScgKyB0aGF0Lm1vZGUgKyAnJmxpbWl0PTM2JylcbiAgICAgIF0pLnRoZW4oZnVuY3Rpb24gKHJlcykge1xuICAgICAgICB0aGF0LnN0YXRzID0gcmVzWzBdIHx8IG51bGxcbiAgICAgICAgdGhhdC5ncmFwaCA9IHJlc1sxXSB8fCB7fVxuICAgICAgICB0aGF0Lm5vZGVzID0gdGhhdC5ncmFwaC5ub2RlcyB8fCBbXVxuICAgICAgICB0aGF0LmVkZ2VzID0gdGhhdC5ncmFwaC5lZGdlcyB8fCBbXVxuICAgICAgICB0aGF0LnBhdGhzID0gdGhhdC5ncmFwaC5wYXRoX2NhcmRzIHx8IHRoYXQuZ3JhcGguaXRlbXMgfHwgW11cbiAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIHRoYXQuZXJyb3IgPSBlLm1lc3NhZ2UgfHwgJ+WbvuiwseWKoOi9veWksei0pSdcbiAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGF0LmxvYWRpbmcgPSBmYWxzZVxuICAgICAgICBpZiAoZG9uZSkgZG9uZSgpXG4gICAgICB9KVxuICAgIH0sXG4gICAgY2hhbmdlTW9kZTogZnVuY3Rpb24gKG0pIHsgdGhpcy5tb2RlID0gbTsgdGhpcy5sb2FkKCkgfSxcbiAgICBvcGVuR3JhcGhGdWxsOiBmdW5jdGlvbiAoKSB7XG4gICAgICB1bmkubmF2aWdhdGVUbyh7IHVybDogJy9wYWdlcy9ncmFwaC1mdWxsL2dyYXBoLWZ1bGw/bW9kZT0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHRoaXMubW9kZSkgfSlcbiAgICB9LFxuICAgIHR5cGVMYWJlbDogZnVuY3Rpb24gKHR5cGUpIHtcbiAgICAgIGNvbnN0IG1hcCA9IHsgUHJvZmlsZTogJ+eUu+WDjycsIEludGVyZXN0Q2x1c3RlcjogJ+WFtOi2o+ewhycsIFNlZWRCb29rOiAn56eN5a2Q5LmmJywgQm9vazogJ+WbvuS5picsIEF1dGhvcjogJ+S9nOiAhScsIFRhZzogJ+agh+etvicsIEZpZWxkOiAn6aKG5Z+fJywgQXVkaWVuY2U6ICfpgILor7vkurrnvqQnLCBEaWZmaWN1bHR5OiAn6Zq+5bqmJywgS2V5d29yZDogJ+WFs+mUruivjScsIFRvcGljOiAn5Li76aKYJywgUHVibGlzaGVyOiAn5Ye654mI56S+JywgU2VyaWVzOiAn57O75YiXJyB9XG4gICAgICByZXR1cm4gbWFwW3R5cGVdIHx8IHR5cGUgfHwgJ+iKgueCuSdcbiAgICB9LFxuICAgIHNob3J0TGFiZWw6IGZ1bmN0aW9uIChsYWJlbCwgbWF4KSB7XG4gICAgICBsYWJlbCA9IFN0cmluZyhsYWJlbCB8fCAn6IqC54K5JylcbiAgICAgIG1heCA9IG1heCB8fCA1XG4gICAgICByZXR1cm4gbGFiZWwubGVuZ3RoID4gbWF4ID8gbGFiZWwuc2xpY2UoMCwgbWF4KSArICfigKYnIDogbGFiZWxcbiAgICB9LFxuICAgIG5vZGVOYW1lOiBmdW5jdGlvbiAoaWQpIHtcbiAgICAgIGNvbnN0IGZvdW5kID0gdGhpcy5ub2Rlcy5maW5kKGZ1bmN0aW9uIChuKSB7IHJldHVybiBuLmlkID09PSBpZCB9KVxuICAgICAgcmV0dXJuIGZvdW5kID8gZm91bmQubGFiZWwgOiBpZFxuICAgIH0sXG4gICAgcGF0aFRpdGxlOiBmdW5jdGlvbiAocCwgaWR4KSB7XG4gICAgICBpZiAocC50YXJnZXQpIHJldHVybiAn5o6o6I2Q44CKJyArIHAudGFyZ2V0ICsgJ+OAiydcbiAgICAgIGlmIChwLnRpdGxlKSByZXR1cm4gcC50aXRsZVxuICAgICAgaWYgKHAuYm9vayAmJiBwLmJvb2sudGl0bGUpIHJldHVybiBwLmJvb2sudGl0bGVcbiAgICAgIHJldHVybiAn5o6o6I2Q6Lev5b6EICcgKyAoaWR4ICsgMSlcbiAgICB9LFxuICAgIHBhdGhUZXh0OiBmdW5jdGlvbiAocCkge1xuICAgICAgaWYgKHAucGF0aF90ZXh0KSByZXR1cm4gcC5wYXRoX3RleHRcbiAgICAgIGlmIChwLnJlYXNvbiAmJiBwLnJlYXNvbiAhPT0gJ+WfuuS6juefpeivhuWbvuiwsei3r+W+hOaOqOiNkCcpIHJldHVybiBwLnJlYXNvblxuICAgICAgaWYgKHAuc291cmNlICYmIHAudGFyZ2V0KSByZXR1cm4gJ+OAiicgKyBwLnNvdXJjZSArICfjgIsg4oaSICcgKyAocC5sYWJlbCB8fCB0aGlzLnBhdGhCYWRnZShwKSkgKyAnIOKGkiDjgIonICsgcC50YXJnZXQgKyAn44CLJ1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkocC5wYXRocykgJiYgcC5wYXRocy5sZW5ndGgpIHtcbiAgICAgICAgY29uc3QgZmlyc3QgPSBwLnBhdGhzWzBdXG4gICAgICAgIGlmIChmaXJzdC5wYXRoX3RleHQpIHJldHVybiBmaXJzdC5wYXRoX3RleHRcbiAgICAgICAgaWYgKGZpcnN0LmxhYmVsKSByZXR1cm4gJ+mAmui/h+OAjCcgKyBmaXJzdC5sYWJlbCArICfjgI3kuqfnlJ/mjqjojZAnXG4gICAgICB9XG4gICAgICByZXR1cm4gcC5yZWFzb24gfHwgJ+agueaNruW9k+WJjeeUu+WDj+OAgeivreS5ieiKgueCueWSjOWbvuS5puWFs+ezu+eUn+aIkOaOqOiNkOOAgidcbiAgICB9LFxuICAgIHBhdGhCYWRnZTogZnVuY3Rpb24gKHApIHtcbiAgICAgIGNvbnN0IG1hcCA9IHsgc2FtZV9hdXRob3I6ICflkIzkvZzogIUnLCBzYW1lX3RhZzogJ+WQjOagh+etvicsIHNhbWVfc2VyaWVzOiAn5ZCM57O75YiXJywgc2FtZV9wdWJsaXNoZXI6ICflkIzlh7rniYjnpL4nLCBzaW1pbGFyOiAn55u45Ly8JywgbXVsdGlfaG9wOiAn5aSa6LezJywgc2FtZV9maWVsZDogJ+mihuWfnycsIHNhbWVfYXVkaWVuY2U6ICfkurrnvqQnLCBzYW1lX2tleXdvcmQ6ICflhbPplK7or40nLCBzYW1lX2RpZmZpY3VsdHk6ICfpmr7luqYnLCB0b3BpY19icmlkZ2U6ICfkuLvpopgnLCBuZXh0X3JlYWQ6ICfnu63or7snLCBwcmVyZXF1aXNpdGU6ICfliY3nva4nIH1cbiAgICAgIHJldHVybiBwLmxhYmVsIHx8IG1hcFtwLnR5cGVdIHx8ICflm77osLEnXG4gICAgfSxcbiAgICBvcGVuUGF0aENhcmQ6IGZ1bmN0aW9uIChwKSB7XG4gICAgICBpZiAocC5ib29rX2lkKSB1bmkubmF2aWdhdGVUbyh7IHVybDogJy9wYWdlcy9kZXRhaWwvZGV0YWlsP2lkPScgKyBwLmJvb2tfaWQgfSlcbiAgICB9XG4gIH1cbn1cbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuLmdyYXBoLXBhZ2V7cGFkZGluZy1ib3R0b206Y2FsYygzNHJweCArIGVudihzYWZlLWFyZWEtaW5zZXQtYm90dG9tKSl9XG4uaGVyby1jYXJke2JhY2tncm91bmQ6bGluZWFyLWdyYWRpZW50KDEzNWRlZywjZmZmLCNlZmY2ZmYgNTUlLCNmM2U4ZmYpfVxuLm1vZGUtcm93e21hcmdpbjoxOHJweCAwfVxuLmdyYXBoLWVudHJ5LWNhcmR7YmFja2dyb3VuZDpsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCNmZmZmZmYsI2Y4ZjVmZil9XG4uZ3JhcGgtaWNvbntmb250LXNpemU6NTRycHh9XG4ucHJldmlldy1iYXJ7ZGlzcGxheTpmbGV4O2ZsZXgtd3JhcDp3cmFwO2dhcDoxMnJweDttYXJnaW46MjJycHggMCAxNHJweDttaW4taGVpZ2h0Ojc0cnB4O2FsaWduLWl0ZW1zOmNlbnRlcn1cbi5wcmV2aWV3LW5vZGV7ZGlzcGxheTppbmxpbmUtZmxleDthbGlnbi1pdGVtczpjZW50ZXI7anVzdGlmeS1jb250ZW50OmNlbnRlcjttaW4td2lkdGg6NzZycHg7aGVpZ2h0OjY0cnB4O2JvcmRlci1yYWRpdXM6OTk5cnB4O2JhY2tncm91bmQ6bGluZWFyLWdyYWRpZW50KDEzNWRlZywjZWRlOWZlLCNlMGYyZmUpO2NvbG9yOiM0YzFkOTU7Zm9udC1zaXplOjIycnB4O2ZvbnQtd2VpZ2h0OjkwMDtwYWRkaW5nOjAgMTZycHg7Ym94LXNoYWRvdzowIDEwcnB4IDI0cnB4IHJnYmEoMTI0LDU4LDIzNywuMDgpfVxuXG4ubm9kZXtkaXNwbGF5OmZsZXg7Z2FwOjE0cnB4O2FsaWduLWl0ZW1zOmNlbnRlcjtwYWRkaW5nOjE0cnB4IDA7Ym9yZGVyLWJvdHRvbToxcnB4IHNvbGlkICNlZWYyZjd9XG4ubm9kZS10eXBle2ZvbnQtc2l6ZToyMnJweDtmb250LXdlaWdodDo5MDA7Y29sb3I6IzdjM2FlZDtiYWNrZ3JvdW5kOiNlZGU5ZmU7Ym9yZGVyLXJhZGl1czo5OTlycHg7cGFkZGluZzo2cnB4IDEycnB4fVxuLm5vZGUtbGFiZWx7Zm9udC1zaXplOjI3cnB4O2NvbG9yOiMxMTE4Mjc7Zm9udC13ZWlnaHQ6ODAwO2ZsZXg6MX1cbi5lZGdle3BhZGRpbmc6MTJycHggMDtib3JkZXItYm90dG9tOjFycHggZGFzaGVkICNlNWU3ZWJ9XG4ucGF0aC1jYXJke3BhZGRpbmc6MjJycHg7Ym9yZGVyLXJhZGl1czoyNHJweDtiYWNrZ3JvdW5kOmxpbmVhci1ncmFkaWVudCgxMzVkZWcsI2Y4ZmFmYywjZmZmZmZmKTttYXJnaW4tYm90dG9tOjE2cnB4O2JvcmRlcjoxcnB4IHNvbGlkICNlZWYyZjc7Ym94LXNoYWRvdzowIDEwcnB4IDI4cnB4IHJnYmEoMTUsMjMsNDIsLjA0KX1cbi5wYXRoLXRpdGxle2Rpc3BsYXk6YmxvY2s7ZmxleDoxO2ZvbnQtc2l6ZToyOHJweDtjb2xvcjojMTExODI3O2ZvbnQtd2VpZ2h0OjkwMDttYXJnaW4tYm90dG9tOjhycHg7bGluZS1oZWlnaHQ6MS4zNX1cbi5wYXRoLWJhZGdle2ZvbnQtc2l6ZToyMHJweDtmb250LXdlaWdodDo5MDA7Y29sb3I6IzdjM2FlZDtiYWNrZ3JvdW5kOiNlZGU5ZmU7Ym9yZGVyLXJhZGl1czo5OTlycHg7cGFkZGluZzo2cnB4IDEycnB4O21hcmdpbi1sZWZ0OjEwcnB4fVxuLnBhdGgtdGV4dHtkaXNwbGF5OmJsb2NrO2NvbG9yOiM0NzU0Njc7Zm9udC1zaXplOjI1cnB4O2xpbmUtaGVpZ2h0OjEuN31cbjwvc3R5bGU+XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///28\n");

/***/ }),
/* 29 */
/*!*************************************************************************************************!*\
  !*** E:/翻译漫画/book-main (14)/book-main/frontend-uni/pages/graph-full/graph-full.vue?mpType=page ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _graph_full_vue_vue_type_template_id_2380ea54_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./graph-full.vue?vue&type=template&id=2380ea54&scoped=true&mpType=page */ 30);\n/* harmony import */ var _graph_full_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./graph-full.vue?vue&type=script&lang=js&mpType=page */ 32);\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _graph_full_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__) if([\"default\"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _graph_full_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n/* harmony import */ var _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 18);\n\nvar renderjs\n\n\n\n\n/* normalize component */\n\nvar component = Object(_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\n  _graph_full_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _graph_full_vue_vue_type_template_id_2380ea54_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _graph_full_vue_vue_type_template_id_2380ea54_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  \"2380ea54\",\n  null,\n  false,\n  _graph_full_vue_vue_type_template_id_2380ea54_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__[\"components\"],\n  renderjs\n)\n\ncomponent.options.__file = \"pages/graph-full/graph-full.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbbnVsbF0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBOEk7QUFDOUk7QUFDeUU7QUFDTDs7O0FBR3BFO0FBQ2dNO0FBQ2hNLGdCQUFnQix1TUFBVTtBQUMxQixFQUFFLDJGQUFNO0FBQ1IsRUFBRSw0R0FBTTtBQUNSLEVBQUUscUhBQWU7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUUsZ0hBQVU7QUFDWjtBQUNBOztBQUVBO0FBQ2UsZ0YiLCJmaWxlIjoiMjkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucywgcmVjeWNsYWJsZVJlbmRlciwgY29tcG9uZW50cyB9IGZyb20gXCIuL2dyYXBoLWZ1bGwudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTIzODBlYTU0JnNjb3BlZD10cnVlJm1wVHlwZT1wYWdlXCJcbnZhciByZW5kZXJqc1xuaW1wb3J0IHNjcmlwdCBmcm9tIFwiLi9ncmFwaC1mdWxsLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZtcFR5cGU9cGFnZVwiXG5leHBvcnQgKiBmcm9tIFwiLi9ncmFwaC1mdWxsLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZtcFR5cGU9cGFnZVwiXG5cblxuLyogbm9ybWFsaXplIGNvbXBvbmVudCAqL1xuaW1wb3J0IG5vcm1hbGl6ZXIgZnJvbSBcIiEuLi8uLi8uLi8uLi8uLi9IQnVpbGRlclguNS4wNy4yMDI2MDQxMDA2L0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvdnVlLWxvYWRlci9saWIvcnVudGltZS9jb21wb25lbnROb3JtYWxpemVyLmpzXCJcbnZhciBjb21wb25lbnQgPSBub3JtYWxpemVyKFxuICBzY3JpcHQsXG4gIHJlbmRlcixcbiAgc3RhdGljUmVuZGVyRm5zLFxuICBmYWxzZSxcbiAgbnVsbCxcbiAgXCIyMzgwZWE1NFwiLFxuICBudWxsLFxuICBmYWxzZSxcbiAgY29tcG9uZW50cyxcbiAgcmVuZGVyanNcbilcblxuY29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJwYWdlcy9ncmFwaC1mdWxsL2dyYXBoLWZ1bGwudnVlXCJcbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudC5leHBvcnRzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///29\n");

/***/ }),
/* 30 */
/*!*******************************************************************************************************************************************!*\
  !*** E:/翻译漫画/book-main (14)/book-main/frontend-uni/pages/graph-full/graph-full.vue?vue&type=template&id=2380ea54&scoped=true&mpType=page ***!
  \*******************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_0_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_graph_full_vue_vue_type_template_id_2380ea54_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--11-0!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/filter-modules-template.js!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./graph-full.vue?vue&type=template&id=2380ea54&scoped=true&mpType=page */ 31);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_0_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_graph_full_vue_vue_type_template_id_2380ea54_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_0_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_graph_full_vue_vue_type_template_id_2380ea54_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_0_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_graph_full_vue_vue_type_template_id_2380ea54_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_0_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_graph_full_vue_vue_type_template_id_2380ea54_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),
/* 31 */
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--11-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/filter-modules-template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!E:/翻译漫画/book-main (14)/book-main/frontend-uni/pages/graph-full/graph-full.vue?vue&type=template&id=2380ea54&scoped=true&mpType=page ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "view",
    { staticClass: _vm._$s(0, "sc", "container full-page"), attrs: { _i: 0 } },
    [
      _c(
        "view",
        { staticClass: _vm._$s(1, "sc", "card top-card"), attrs: { _i: 1 } },
        [
          _c(
            "view",
            { staticClass: _vm._$s(2, "sc", "between"), attrs: { _i: 2 } },
            [
              _c("view", [
                _c("text", {
                  staticClass: _vm._$s(4, "sc", "title"),
                  attrs: { _i: 4 },
                }),
                _c(
                  "text",
                  { staticClass: _vm._$s(5, "sc", "muted"), attrs: { _i: 5 } },
                  [
                    _vm._v(
                      _vm._$s(5, "t0-0", _vm._s(_vm.modeLabel)) +
                        _vm._$s(5, "t0-1", _vm._s(_vm.visualNodes.length)) +
                        _vm._$s(5, "t0-2", _vm._s(_vm.visualEdges.length))
                    ),
                  ]
                ),
              ]),
              _c("button", {
                staticClass: _vm._$s(6, "sc", "btn small secondary"),
                attrs: { _i: 6 },
                on: { click: _vm.load },
              }),
            ]
          ),
          _c(
            "view",
            { staticClass: _vm._$s(7, "sc", "mode-row"), attrs: { _i: 7 } },
            [
              _c("text", {
                class: _vm._$s(
                  8,
                  "c",
                  _vm.mode === "profile" ? "chip active" : "chip"
                ),
                attrs: { _i: 8 },
                on: {
                  click: function ($event) {
                    return _vm.changeMode("profile")
                  },
                },
              }),
              _c("text", {
                class: _vm._$s(
                  9,
                  "c",
                  _vm.mode === "recent" ? "chip active" : "chip"
                ),
                attrs: { _i: 9 },
                on: {
                  click: function ($event) {
                    return _vm.changeMode("recent")
                  },
                },
              }),
              _c("text", {
                class: _vm._$s(
                  10,
                  "c",
                  _vm.mode === "high_rated" ? "chip active" : "chip"
                ),
                attrs: { _i: 10 },
                on: {
                  click: function ($event) {
                    return _vm.changeMode("high_rated")
                  },
                },
              }),
            ]
          ),
        ]
      ),
      _vm._$s(11, "i", _vm.error)
        ? _c(
            "view",
            { staticClass: _vm._$s(11, "sc", "card"), attrs: { _i: 11 } },
            [
              _c(
                "text",
                { staticClass: _vm._$s(12, "sc", "muted"), attrs: { _i: 12 } },
                [_vm._v(_vm._$s(12, "t0-0", _vm._s(_vm.error)))]
              ),
            ]
          )
        : _vm._e(),
      _vm._$s(13, "i", _vm.loading)
        ? _c(
            "view",
            { staticClass: _vm._$s(13, "sc", "card"), attrs: { _i: 13 } },
            [
              _c("text", {
                staticClass: _vm._$s(14, "sc", "muted"),
                attrs: { _i: 14 },
              }),
            ]
          )
        : _vm._e(),
      _vm._$s(15, "i", _vm.visualNodes.length)
        ? _c(
            "view",
            { staticClass: _vm._$s(15, "sc", "graph-card"), attrs: { _i: 15 } },
            [
              _c(
                "view",
                {
                  staticClass: _vm._$s(16, "sc", "graph-stage"),
                  attrs: { _i: 16 },
                },
                [
                  _c("text", {
                    staticClass: _vm._$s(17, "sc", "layer-title top"),
                    attrs: { _i: 17 },
                  }),
                  _c("text", {
                    staticClass: _vm._$s(18, "sc", "layer-title middle"),
                    attrs: { _i: 18 },
                  }),
                  _c("text", {
                    staticClass: _vm._$s(19, "sc", "layer-title bottom"),
                    attrs: { _i: 19 },
                  }),
                  _vm._l(
                    _vm._$s(20, "f", { forItems: _vm.visualEdges }),
                    function (e, idx, $20, $30) {
                      return _c("view", {
                        key: _vm._$s(20, "f", {
                          forIndex: $20,
                          key: "e" + idx,
                        }),
                        staticClass: _vm._$s("20-" + $30, "sc", "graph-line"),
                        style: _vm._$s("20-" + $30, "s", e.style),
                        attrs: { _i: "20-" + $30 },
                      })
                    }
                  ),
                  _vm._l(
                    _vm._$s(21, "f", { forItems: _vm.visualNodes }),
                    function (n, $11, $21, $31) {
                      return _c(
                        "view",
                        {
                          key: _vm._$s(21, "f", { forIndex: $21, key: n.id }),
                          class: _vm._$s(
                            "21-" + $31,
                            "c",
                            "graph-node " + n.className
                          ),
                          style: _vm._$s("21-" + $31, "s", n.style),
                          attrs: { _i: "21-" + $31 },
                          on: {
                            click: function ($event) {
                              return _vm.tapNode(n)
                            },
                          },
                        },
                        [
                          _c(
                            "text",
                            {
                              staticClass: _vm._$s(
                                "22-" + $31,
                                "sc",
                                "node-main"
                              ),
                              attrs: { _i: "22-" + $31 },
                            },
                            [
                              _vm._v(
                                _vm._$s(
                                  "22-" + $31,
                                  "t0-0",
                                  _vm._s(n.shortLabel)
                                )
                              ),
                            ]
                          ),
                          _c(
                            "text",
                            {
                              staticClass: _vm._$s(
                                "23-" + $31,
                                "sc",
                                "node-sub"
                              ),
                              attrs: { _i: "23-" + $31 },
                            },
                            [
                              _vm._v(
                                _vm._$s(
                                  "23-" + $31,
                                  "t0-0",
                                  _vm._s(n.typeLabel)
                                )
                              ),
                            ]
                          ),
                        ]
                      )
                    }
                  ),
                ],
                2
              ),
            ]
          )
        : _vm._e(),
      _vm._$s(24, "i", _vm.visualNodes.length)
        ? _c(
            "view",
            {
              staticClass: _vm._$s(24, "sc", "card legend-card"),
              attrs: { _i: 24 },
            },
            [
              _c("text", {
                staticClass: _vm._$s(25, "sc", "sub-title"),
                attrs: { _i: 25 },
              }),
              _c(
                "view",
                {
                  staticClass: _vm._$s(26, "sc", "legend-row"),
                  attrs: { _i: 26 },
                },
                [
                  _c("text", {
                    staticClass: _vm._$s(27, "sc", "dot center"),
                    attrs: { _i: 27 },
                  }),
                  _c("text", {
                    staticClass: _vm._$s(28, "sc", "muted"),
                    attrs: { _i: 28 },
                  }),
                  _c("text", {
                    staticClass: _vm._$s(29, "sc", "dot semantic"),
                    attrs: { _i: 29 },
                  }),
                  _c("text", {
                    staticClass: _vm._$s(30, "sc", "muted"),
                    attrs: { _i: 30 },
                  }),
                  _c("text", {
                    staticClass: _vm._$s(31, "sc", "dot book"),
                    attrs: { _i: 31 },
                  }),
                  _c("text", {
                    staticClass: _vm._$s(32, "sc", "muted"),
                    attrs: { _i: 32 },
                  }),
                ]
              ),
            ]
          )
        : _vm._e(),
    ]
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),
/* 32 */
/*!*************************************************************************************************************************!*\
  !*** E:/翻译漫画/book-main (14)/book-main/frontend-uni/pages/graph-full/graph-full.vue?vue&type=script&lang=js&mpType=page ***!
  \*************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_1_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_graph_full_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--7-1!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/using-components.js!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./graph-full.vue?vue&type=script&lang=js&mpType=page */ 33);\n/* harmony import */ var _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_1_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_graph_full_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_1_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_graph_full_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_1_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_graph_full_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__) if([\"default\"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_1_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_graph_full_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n /* harmony default export */ __webpack_exports__[\"default\"] = (_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_1_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_graph_full_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0___default.a); //# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbbnVsbF0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQXFxQixDQUFnQixtckJBQUcsRUFBQyIsImZpbGUiOiIzMi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vSEJ1aWxkZXJYLjUuMDcuMjAyNjA0MTAwNi9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzIS4uLy4uLy4uLy4uLy4uL0hCdWlsZGVyWC41LjA3LjIwMjYwNDEwMDYvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy93ZWJwYWNrLXByZXByb2Nlc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTctMSEuLi8uLi8uLi8uLi8uLi9IQnVpbGRlclguNS4wNy4yMDI2MDQxMDA2L0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvd2VicGFjay11bmktYXBwLWxvYWRlci91c2luZy1jb21wb25lbnRzLmpzIS4uLy4uLy4uLy4uLy4uL0hCdWlsZGVyWC41LjA3LjIwMjYwNDEwMDYvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vZ3JhcGgtZnVsbC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmbXBUeXBlPXBhZ2VcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi9IQnVpbGRlclguNS4wNy4yMDI2MDQxMDA2L0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanMhLi4vLi4vLi4vLi4vLi4vSEJ1aWxkZXJYLjUuMDcuMjAyNjA0MTAwNi9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vdnVlLWNsaS1wbHVnaW4tdW5pL3BhY2thZ2VzL3dlYnBhY2stcHJlcHJvY2Vzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tNy0xIS4uLy4uLy4uLy4uLy4uL0hCdWlsZGVyWC41LjA3LjIwMjYwNDEwMDYvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy93ZWJwYWNrLXVuaS1hcHAtbG9hZGVyL3VzaW5nLWNvbXBvbmVudHMuanMhLi4vLi4vLi4vLi4vLi4vSEJ1aWxkZXJYLjUuMDcuMjAyNjA0MTAwNi9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vdnVlLWNsaS1wbHVnaW4tdW5pL3BhY2thZ2VzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9ncmFwaC1mdWxsLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZtcFR5cGU9cGFnZVwiIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///32\n");

/***/ }),
/* 33 */
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--7-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/using-components.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!E:/翻译漫画/book-main (14)/book-main/frontend-uni/pages/graph-full/graph-full.vue?vue&type=script&lang=js&mpType=page ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\nvar _request = __webpack_require__(/*! ../../api/request.js */ 17);\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n\nvar STAGE_W = 650;\nvar _default = {\n  data: function data() {\n    return {\n      mode: 'profile',\n      loading: false,\n      error: '',\n      graph: {},\n      nodes: [],\n      edges: []\n    };\n  },\n  computed: {\n    modeLabel: function modeLabel() {\n      var map = {\n        profile: '我的阅读画像',\n        recent: '最近阅读',\n        high_rated: '高分图书'\n      };\n      return map[this.mode] || '知识图谱';\n    },\n    visualNodes: function visualNodes() {\n      var source = (this.nodes || []).slice(0, 26);\n      if (!source.length) return [];\n      var centerId = this.graph && this.graph.center || '';\n      var centerNode = source.find(function (n) {\n        return n.id === centerId || n.type === 'Profile';\n      }) || source[0];\n      var rest = source.filter(function (n) {\n        return n.id !== centerNode.id;\n      });\n      var semanticTypes = {\n        InterestCluster: true,\n        Tag: true,\n        Field: true,\n        Audience: true,\n        Difficulty: true,\n        Keyword: true,\n        Topic: true\n      };\n      var bookTypes = {\n        Book: true,\n        SeedBook: true\n      };\n      var semantic = rest.filter(function (n) {\n        return semanticTypes[n.type];\n      }).slice(0, 8);\n      var books = rest.filter(function (n) {\n        return bookTypes[n.type];\n      }).slice(0, 10);\n      var others = rest.filter(function (n) {\n        return !semanticTypes[n.type] && !bookTypes[n.type];\n      }).slice(0, 4);\n      var arranged = [];\n      arranged.push(this.buildVisualNode(centerNode, 325, 170, 124, 'center'));\n      this.placeRow(semantic.slice(0, 4), 470, 92, 'semantic', arranged);\n      this.placeRow(semantic.slice(4, 8), 610, 88, 'semantic', arranged);\n      this.placeRow(others, 735, 80, 'other', arranged);\n      this.placeRow(books.slice(0, 5), 1010, 94, 'book', arranged);\n      this.placeRow(books.slice(5, 10), 1170, 94, 'book', arranged);\n      return arranged;\n    },\n    visualNodeMap: function visualNodeMap() {\n      var map = {};\n      this.visualNodes.forEach(function (n) {\n        map[n.id] = n;\n      });\n      return map;\n    },\n    visualEdges: function visualEdges() {\n      var map = this.visualNodeMap;\n      var lines = [];\n      var used = {};\n      (this.edges || []).forEach(function (e) {\n        var a = map[e.source];\n        var b = map[e.target];\n        if (!a || !b) return;\n        var sig = e.source + '|' + e.target;\n        if (used[sig]) return;\n        used[sig] = true;\n        var dx = b.cx - a.cx;\n        var dy = b.cy - a.cy;\n        var len = Math.sqrt(dx * dx + dy * dy);\n        if (!len) return;\n        var deg = Math.atan2(dy, dx) * 180 / Math.PI;\n        lines.push({\n          style: 'left:' + a.cx + 'rpx;top:' + a.cy + 'rpx;width:' + Math.max(40, Math.round(len)) + 'rpx;transform:rotate(' + deg + 'deg);'\n        });\n      });\n      return lines.slice(0, 34);\n    }\n  },\n  onLoad: function onLoad(query) {\n    this.mode = query && query.mode || 'profile';\n    this.load();\n  },\n  onPullDownRefresh: function onPullDownRefresh() {\n    var that = this;\n    this.load(function () {\n      uni.stopPullDownRefresh();\n    });\n  },\n  methods: {\n    load: function load(done) {\n      var that = this;\n      that.loading = true;\n      that.error = '';\n      (0, _request.request)('/graph/profile-graph?mode=' + that.mode + '&limit=42').then(function (res) {\n        that.graph = res || {};\n        that.nodes = that.graph.nodes || [];\n        that.edges = that.graph.edges || [];\n      }).catch(function (e) {\n        that.error = e.message || '图谱加载失败';\n      }).then(function () {\n        that.loading = false;\n        if (done) done();\n      });\n    },\n    changeMode: function changeMode(m) {\n      this.mode = m;\n      this.load();\n    },\n    placeRow: function placeRow(list, y, size, cls, arranged) {\n      var _this = this;\n      var count = list.length;\n      if (!count) return;\n      var gap = STAGE_W / (count + 1);\n      list.forEach(function (n, idx) {\n        arranged.push(_this.buildVisualNode(n, Math.round(gap * (idx + 1)), y, size, cls));\n      });\n    },\n    typeLabel: function typeLabel(type) {\n      var map = {\n        Profile: '画像',\n        InterestCluster: '兴趣簇',\n        SeedBook: '种子书',\n        Book: '图书',\n        Author: '作者',\n        Tag: '标签',\n        Field: '领域',\n        Audience: '适读人群',\n        Difficulty: '难度',\n        Keyword: '关键词',\n        Topic: '主题',\n        Publisher: '出版社',\n        Series: '系列'\n      };\n      return map[type] || type || '节点';\n    },\n    shortLabel: function shortLabel(label, max) {\n      label = String(label || '节点');\n      max = max || 5;\n      return label.length > max ? label.slice(0, max) + '…' : label;\n    },\n    buildVisualNode: function buildVisualNode(n, x, y, size, cls) {\n      var isBook = n.type === 'Book' || n.type === 'SeedBook';\n      return {\n        id: n.id,\n        label: n.label || '节点',\n        shortLabel: this.shortLabel(n.label, cls === 'center' ? 6 : 5),\n        type: n.type,\n        typeLabel: this.typeLabel(n.type),\n        book_id: n.book_id || (isBook ? String(n.id).split(':').pop() : null),\n        cx: Math.round(x),\n        cy: Math.round(y),\n        size: size,\n        className: cls,\n        style: 'left:' + Math.round(x - size / 2) + 'rpx;top:' + Math.round(y - size / 2) + 'rpx;width:' + size + 'rpx;height:' + size + 'rpx;'\n      };\n    },\n    tapNode: function tapNode(n) {\n      if (n.book_id) uni.navigateTo({\n        url: '/pages/detail/detail?id=' + n.book_id\n      });else uni.showToast({\n        title: n.label,\n        icon: 'none'\n      });\n    }\n  }\n};\nexports.default = _default;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVuaS1hcHA6Ly8vcGFnZXMvZ3JhcGgtZnVsbC9ncmFwaC1mdWxsLnZ1ZSJdLCJuYW1lcyI6WyJkYXRhIiwibW9kZSIsImxvYWRpbmciLCJlcnJvciIsImdyYXBoIiwibm9kZXMiLCJlZGdlcyIsImNvbXB1dGVkIiwibW9kZUxhYmVsIiwicHJvZmlsZSIsInJlY2VudCIsImhpZ2hfcmF0ZWQiLCJ2aXN1YWxOb2RlcyIsIkludGVyZXN0Q2x1c3RlciIsIlRhZyIsIkZpZWxkIiwiQXVkaWVuY2UiLCJEaWZmaWN1bHR5IiwiS2V5d29yZCIsIlRvcGljIiwiQm9vayIsIlNlZWRCb29rIiwiYXJyYW5nZWQiLCJ2aXN1YWxOb2RlTWFwIiwibWFwIiwidmlzdWFsRWRnZXMiLCJ1c2VkIiwibGluZXMiLCJzdHlsZSIsIm9uTG9hZCIsIm9uUHVsbERvd25SZWZyZXNoIiwidW5pIiwibWV0aG9kcyIsImxvYWQiLCJ0aGF0IiwiY2hhbmdlTW9kZSIsInBsYWNlUm93IiwibGlzdCIsInR5cGVMYWJlbCIsIlByb2ZpbGUiLCJBdXRob3IiLCJQdWJsaXNoZXIiLCJTZXJpZXMiLCJzaG9ydExhYmVsIiwibGFiZWwiLCJtYXgiLCJidWlsZFZpc3VhbE5vZGUiLCJpZCIsInR5cGUiLCJib29rX2lkIiwiY3giLCJjeSIsInNpemUiLCJjbGFzc05hbWUiLCJ0YXBOb2RlIiwidXJsIiwidGl0bGUiLCJpY29uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUErQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBO0FBQUEsZUFFQTtFQUNBQTtJQUNBO01BQUFDO01BQUFDO01BQUFDO01BQUFDO01BQUFDO01BQUFDO0lBQUE7RUFDQTtFQUNBQztJQUNBQztNQUNBO1FBQUFDO1FBQUFDO1FBQUFDO01BQUE7TUFDQTtJQUNBO0lBQ0FDO01BQ0E7TUFDQTtNQUVBO01BQ0E7UUFBQTtNQUFBO01BQ0E7UUFBQTtNQUFBO01BRUE7UUFBQUM7UUFBQUM7UUFBQUM7UUFBQUM7UUFBQUM7UUFBQUM7UUFBQUM7TUFBQTtNQUNBO1FBQUFDO1FBQUFDO01BQUE7TUFFQTtRQUFBO01BQUE7TUFDQTtRQUFBO01BQUE7TUFDQTtRQUFBO01BQUE7TUFFQTtNQUNBQztNQUVBO01BQ0E7TUFDQTtNQUNBO01BQ0E7TUFFQTtJQUNBO0lBQ0FDO01BQ0E7TUFDQTtRQUFBQztNQUFBO01BQ0E7SUFDQTtJQUNBQztNQUNBO01BQ0E7TUFDQTtNQUNBO1FBQ0E7UUFDQTtRQUNBO1FBRUE7UUFDQTtRQUNBQztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQUM7VUFDQUM7UUFDQTtNQUNBO01BQ0E7SUFDQTtFQUNBO0VBQ0FDO0lBQ0E7SUFDQTtFQUNBO0VBQ0FDO0lBQ0E7SUFDQTtNQUFBQztJQUFBO0VBQ0E7RUFDQUM7SUFDQUM7TUFDQTtNQUNBQztNQUNBQTtNQUNBO1FBQ0FBO1FBQ0FBO1FBQ0FBO01BQ0E7UUFDQUE7TUFDQTtRQUNBQTtRQUNBO01BQ0E7SUFDQTtJQUNBQztNQUFBO01BQUE7SUFBQTtJQUNBQztNQUFBO01BQ0E7TUFDQTtNQUNBO01BQ0FDO1FBQ0FmO01BQ0E7SUFDQTtJQUNBZ0I7TUFDQTtRQUFBQztRQUFBMUI7UUFBQVE7UUFBQUQ7UUFBQW9CO1FBQUExQjtRQUFBQztRQUFBQztRQUFBQztRQUFBQztRQUFBQztRQUFBc0I7UUFBQUM7TUFBQTtNQUNBO0lBQ0E7SUFDQUM7TUFDQUM7TUFDQUM7TUFDQTtJQUNBO0lBQ0FDO01BQ0E7TUFDQTtRQUNBQztRQUNBSDtRQUNBRDtRQUNBSztRQUNBVjtRQUNBVztRQUNBQztRQUNBQztRQUNBQztRQUNBQztRQUNBekI7TUFDQTtJQUNBO0lBQ0EwQjtNQUNBO1FBQUFDO01BQUEsUUFDQXhCO1FBQUF5QjtRQUFBQztNQUFBO0lBQ0E7RUFDQTtBQUNBO0FBQUEiLCJmaWxlIjoiMzMuanMiLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XG4gIDx2aWV3IGNsYXNzPVwiY29udGFpbmVyIGZ1bGwtcGFnZVwiPlxuICAgIDx2aWV3IGNsYXNzPVwiY2FyZCB0b3AtY2FyZFwiPlxuICAgICAgPHZpZXcgY2xhc3M9XCJiZXR3ZWVuXCI+XG4gICAgICAgIDx2aWV3PlxuICAgICAgICAgIDx0ZXh0IGNsYXNzPVwidGl0bGVcIj7lm77osLHlhbPns7vlm748L3RleHQ+XG4gICAgICAgICAgPHRleHQgY2xhc3M9XCJtdXRlZFwiPnt7IG1vZGVMYWJlbCB9fSDCtyB7eyB2aXN1YWxOb2Rlcy5sZW5ndGggfX0g5Liq6IqC54K5IMK3IHt7IHZpc3VhbEVkZ2VzLmxlbmd0aCB9fSDmnaHlhbPns7s8L3RleHQ+XG4gICAgICAgIDwvdmlldz5cbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBzbWFsbCBzZWNvbmRhcnlcIiBAY2xpY2s9XCJsb2FkXCI+5Yi35pawPC9idXR0b24+XG4gICAgICA8L3ZpZXc+XG4gICAgICA8dmlldyBjbGFzcz1cIm1vZGUtcm93XCI+XG4gICAgICAgIDx0ZXh0IDpjbGFzcz1cIm1vZGU9PT0ncHJvZmlsZSc/J2NoaXAgYWN0aXZlJzonY2hpcCdcIiBAY2xpY2s9XCJjaGFuZ2VNb2RlKCdwcm9maWxlJylcIj7nlLvlg488L3RleHQ+XG4gICAgICAgIDx0ZXh0IDpjbGFzcz1cIm1vZGU9PT0ncmVjZW50Jz8nY2hpcCBhY3RpdmUnOidjaGlwJ1wiIEBjbGljaz1cImNoYW5nZU1vZGUoJ3JlY2VudCcpXCI+5pyA6L+R6ZiF6K+7PC90ZXh0PlxuICAgICAgICA8dGV4dCA6Y2xhc3M9XCJtb2RlPT09J2hpZ2hfcmF0ZWQnPydjaGlwIGFjdGl2ZSc6J2NoaXAnXCIgQGNsaWNrPVwiY2hhbmdlTW9kZSgnaGlnaF9yYXRlZCcpXCI+6auY5YiG5Zu+5LmmPC90ZXh0PlxuICAgICAgPC92aWV3PlxuICAgIDwvdmlldz5cblxuICAgIDx2aWV3IHYtaWY9XCJlcnJvclwiIGNsYXNzPVwiY2FyZFwiPjx0ZXh0IGNsYXNzPVwibXV0ZWRcIj57eyBlcnJvciB9fTwvdGV4dD48L3ZpZXc+XG4gICAgPHZpZXcgdi1pZj1cImxvYWRpbmdcIiBjbGFzcz1cImNhcmRcIj48dGV4dCBjbGFzcz1cIm11dGVkXCI+5q2j5Zyo55Sf5oiQ5Zu+6LCx5YWz57O75Zu+Li4uPC90ZXh0Pjwvdmlldz5cblxuICAgIDx2aWV3IGNsYXNzPVwiZ3JhcGgtY2FyZFwiIHYtaWY9XCJ2aXN1YWxOb2Rlcy5sZW5ndGhcIj5cbiAgICAgIDx2aWV3IGNsYXNzPVwiZ3JhcGgtc3RhZ2VcIj5cbiAgICAgICAgPHRleHQgY2xhc3M9XCJsYXllci10aXRsZSB0b3BcIj7nlLvlg4/kuK3lv4M8L3RleHQ+XG4gICAgICAgIDx0ZXh0IGNsYXNzPVwibGF5ZXItdGl0bGUgbWlkZGxlXCI+5YW06LajIC8g6K+t5LmJ6IqC54K5PC90ZXh0PlxuICAgICAgICA8dGV4dCBjbGFzcz1cImxheWVyLXRpdGxlIGJvdHRvbVwiPuaOqOiNkOWbvuS5pjwvdGV4dD5cblxuICAgICAgICA8dmlldyB2LWZvcj1cIihlLGlkeCkgaW4gdmlzdWFsRWRnZXNcIiA6a2V5PVwiJ2UnK2lkeFwiIGNsYXNzPVwiZ3JhcGgtbGluZVwiIDpzdHlsZT1cImUuc3R5bGVcIj48L3ZpZXc+XG5cbiAgICAgICAgPHZpZXcgdi1mb3I9XCJuIGluIHZpc3VhbE5vZGVzXCIgOmtleT1cIm4uaWRcIiA6Y2xhc3M9XCInZ3JhcGgtbm9kZSAnICsgbi5jbGFzc05hbWVcIiA6c3R5bGU9XCJuLnN0eWxlXCIgQGNsaWNrPVwidGFwTm9kZShuKVwiPlxuICAgICAgICAgIDx0ZXh0IGNsYXNzPVwibm9kZS1tYWluXCI+e3sgbi5zaG9ydExhYmVsIH19PC90ZXh0PlxuICAgICAgICAgIDx0ZXh0IGNsYXNzPVwibm9kZS1zdWJcIj57eyBuLnR5cGVMYWJlbCB9fTwvdGV4dD5cbiAgICAgICAgPC92aWV3PlxuICAgICAgPC92aWV3PlxuICAgIDwvdmlldz5cblxuICAgIDx2aWV3IGNsYXNzPVwiY2FyZCBsZWdlbmQtY2FyZFwiIHYtaWY9XCJ2aXN1YWxOb2Rlcy5sZW5ndGhcIj5cbiAgICAgIDx0ZXh0IGNsYXNzPVwic3ViLXRpdGxlXCI+5Zu+5L6LPC90ZXh0PlxuICAgICAgPHZpZXcgY2xhc3M9XCJsZWdlbmQtcm93XCI+XG4gICAgICAgIDx0ZXh0IGNsYXNzPVwiZG90IGNlbnRlclwiPjwvdGV4dD48dGV4dCBjbGFzcz1cIm11dGVkXCI+55S75YOP5Lit5b+DPC90ZXh0PlxuICAgICAgICA8dGV4dCBjbGFzcz1cImRvdCBzZW1hbnRpY1wiPjwvdGV4dD48dGV4dCBjbGFzcz1cIm11dGVkXCI+5YW06LajIC8g6K+t5LmJ6IqC54K5PC90ZXh0PlxuICAgICAgICA8dGV4dCBjbGFzcz1cImRvdCBib29rXCI+PC90ZXh0Pjx0ZXh0IGNsYXNzPVwibXV0ZWRcIj7lm77kuaboioLngrk8L3RleHQ+XG4gICAgICA8L3ZpZXc+XG4gICAgPC92aWV3PlxuICA8L3ZpZXc+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuaW1wb3J0IHsgcmVxdWVzdCB9IGZyb20gJy4uLy4uL2FwaS9yZXF1ZXN0LmpzJ1xuXG5jb25zdCBTVEFHRV9XID0gNjUwXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB7IG1vZGU6ICdwcm9maWxlJywgbG9hZGluZzogZmFsc2UsIGVycm9yOiAnJywgZ3JhcGg6IHt9LCBub2RlczogW10sIGVkZ2VzOiBbXSB9XG4gIH0sXG4gIGNvbXB1dGVkOiB7XG4gICAgbW9kZUxhYmVsOiBmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zdCBtYXAgPSB7IHByb2ZpbGU6ICfmiJHnmoTpmIXor7vnlLvlg48nLCByZWNlbnQ6ICfmnIDov5HpmIXor7snLCBoaWdoX3JhdGVkOiAn6auY5YiG5Zu+5LmmJyB9XG4gICAgICByZXR1cm4gbWFwW3RoaXMubW9kZV0gfHwgJ+efpeivhuWbvuiwsSdcbiAgICB9LFxuICAgIHZpc3VhbE5vZGVzOiBmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zdCBzb3VyY2UgPSAodGhpcy5ub2RlcyB8fCBbXSkuc2xpY2UoMCwgMjYpXG4gICAgICBpZiAoIXNvdXJjZS5sZW5ndGgpIHJldHVybiBbXVxuXG4gICAgICBjb25zdCBjZW50ZXJJZCA9ICh0aGlzLmdyYXBoICYmIHRoaXMuZ3JhcGguY2VudGVyKSB8fCAnJ1xuICAgICAgY29uc3QgY2VudGVyTm9kZSA9IHNvdXJjZS5maW5kKGZ1bmN0aW9uIChuKSB7IHJldHVybiBuLmlkID09PSBjZW50ZXJJZCB8fCBuLnR5cGUgPT09ICdQcm9maWxlJyB9KSB8fCBzb3VyY2VbMF1cbiAgICAgIGNvbnN0IHJlc3QgPSBzb3VyY2UuZmlsdGVyKGZ1bmN0aW9uIChuKSB7IHJldHVybiBuLmlkICE9PSBjZW50ZXJOb2RlLmlkIH0pXG5cbiAgICAgIGNvbnN0IHNlbWFudGljVHlwZXMgPSB7IEludGVyZXN0Q2x1c3RlcjogdHJ1ZSwgVGFnOiB0cnVlLCBGaWVsZDogdHJ1ZSwgQXVkaWVuY2U6IHRydWUsIERpZmZpY3VsdHk6IHRydWUsIEtleXdvcmQ6IHRydWUsIFRvcGljOiB0cnVlIH1cbiAgICAgIGNvbnN0IGJvb2tUeXBlcyA9IHsgQm9vazogdHJ1ZSwgU2VlZEJvb2s6IHRydWUgfVxuXG4gICAgICBjb25zdCBzZW1hbnRpYyA9IHJlc3QuZmlsdGVyKGZ1bmN0aW9uIChuKSB7IHJldHVybiBzZW1hbnRpY1R5cGVzW24udHlwZV0gfSkuc2xpY2UoMCwgOClcbiAgICAgIGNvbnN0IGJvb2tzID0gcmVzdC5maWx0ZXIoZnVuY3Rpb24gKG4pIHsgcmV0dXJuIGJvb2tUeXBlc1tuLnR5cGVdIH0pLnNsaWNlKDAsIDEwKVxuICAgICAgY29uc3Qgb3RoZXJzID0gcmVzdC5maWx0ZXIoZnVuY3Rpb24gKG4pIHsgcmV0dXJuICFzZW1hbnRpY1R5cGVzW24udHlwZV0gJiYgIWJvb2tUeXBlc1tuLnR5cGVdIH0pLnNsaWNlKDAsIDQpXG5cbiAgICAgIGNvbnN0IGFycmFuZ2VkID0gW11cbiAgICAgIGFycmFuZ2VkLnB1c2godGhpcy5idWlsZFZpc3VhbE5vZGUoY2VudGVyTm9kZSwgMzI1LCAxNzAsIDEyNCwgJ2NlbnRlcicpKVxuXG4gICAgICB0aGlzLnBsYWNlUm93KHNlbWFudGljLnNsaWNlKDAsIDQpLCA0NzAsIDkyLCAnc2VtYW50aWMnLCBhcnJhbmdlZClcbiAgICAgIHRoaXMucGxhY2VSb3coc2VtYW50aWMuc2xpY2UoNCwgOCksIDYxMCwgODgsICdzZW1hbnRpYycsIGFycmFuZ2VkKVxuICAgICAgdGhpcy5wbGFjZVJvdyhvdGhlcnMsIDczNSwgODAsICdvdGhlcicsIGFycmFuZ2VkKVxuICAgICAgdGhpcy5wbGFjZVJvdyhib29rcy5zbGljZSgwLCA1KSwgMTAxMCwgOTQsICdib29rJywgYXJyYW5nZWQpXG4gICAgICB0aGlzLnBsYWNlUm93KGJvb2tzLnNsaWNlKDUsIDEwKSwgMTE3MCwgOTQsICdib29rJywgYXJyYW5nZWQpXG5cbiAgICAgIHJldHVybiBhcnJhbmdlZFxuICAgIH0sXG4gICAgdmlzdWFsTm9kZU1hcDogZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3QgbWFwID0ge31cbiAgICAgIHRoaXMudmlzdWFsTm9kZXMuZm9yRWFjaChmdW5jdGlvbiAobikgeyBtYXBbbi5pZF0gPSBuIH0pXG4gICAgICByZXR1cm4gbWFwXG4gICAgfSxcbiAgICB2aXN1YWxFZGdlczogZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3QgbWFwID0gdGhpcy52aXN1YWxOb2RlTWFwXG4gICAgICBjb25zdCBsaW5lcyA9IFtdXG4gICAgICBjb25zdCB1c2VkID0ge31cbiAgICAgIDsodGhpcy5lZGdlcyB8fCBbXSkuZm9yRWFjaChmdW5jdGlvbiAoZSkge1xuICAgICAgICBjb25zdCBhID0gbWFwW2Uuc291cmNlXVxuICAgICAgICBjb25zdCBiID0gbWFwW2UudGFyZ2V0XVxuICAgICAgICBpZiAoIWEgfHwgIWIpIHJldHVyblxuXG4gICAgICAgIGNvbnN0IHNpZyA9IGUuc291cmNlICsgJ3wnICsgZS50YXJnZXRcbiAgICAgICAgaWYgKHVzZWRbc2lnXSkgcmV0dXJuXG4gICAgICAgIHVzZWRbc2lnXSA9IHRydWVcblxuICAgICAgICBjb25zdCBkeCA9IGIuY3ggLSBhLmN4XG4gICAgICAgIGNvbnN0IGR5ID0gYi5jeSAtIGEuY3lcbiAgICAgICAgY29uc3QgbGVuID0gTWF0aC5zcXJ0KGR4ICogZHggKyBkeSAqIGR5KVxuICAgICAgICBpZiAoIWxlbikgcmV0dXJuXG4gICAgICAgIGNvbnN0IGRlZyA9IE1hdGguYXRhbjIoZHksIGR4KSAqIDE4MCAvIE1hdGguUElcbiAgICAgICAgbGluZXMucHVzaCh7XG4gICAgICAgICAgc3R5bGU6ICdsZWZ0OicgKyBhLmN4ICsgJ3JweDt0b3A6JyArIGEuY3kgKyAncnB4O3dpZHRoOicgKyBNYXRoLm1heCg0MCwgTWF0aC5yb3VuZChsZW4pKSArICdycHg7dHJhbnNmb3JtOnJvdGF0ZSgnICsgZGVnICsgJ2RlZyk7J1xuICAgICAgICB9KVxuICAgICAgfSlcbiAgICAgIHJldHVybiBsaW5lcy5zbGljZSgwLCAzNClcbiAgICB9XG4gIH0sXG4gIG9uTG9hZDogZnVuY3Rpb24gKHF1ZXJ5KSB7XG4gICAgdGhpcy5tb2RlID0gKHF1ZXJ5ICYmIHF1ZXJ5Lm1vZGUpIHx8ICdwcm9maWxlJ1xuICAgIHRoaXMubG9hZCgpXG4gIH0sXG4gIG9uUHVsbERvd25SZWZyZXNoOiBmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgdGhhdCA9IHRoaXNcbiAgICB0aGlzLmxvYWQoZnVuY3Rpb24gKCkgeyB1bmkuc3RvcFB1bGxEb3duUmVmcmVzaCgpIH0pXG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBsb2FkOiBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgY29uc3QgdGhhdCA9IHRoaXNcbiAgICAgIHRoYXQubG9hZGluZyA9IHRydWVcbiAgICAgIHRoYXQuZXJyb3IgPSAnJ1xuICAgICAgcmVxdWVzdCgnL2dyYXBoL3Byb2ZpbGUtZ3JhcGg/bW9kZT0nICsgdGhhdC5tb2RlICsgJyZsaW1pdD00MicpLnRoZW4oZnVuY3Rpb24gKHJlcykge1xuICAgICAgICB0aGF0LmdyYXBoID0gcmVzIHx8IHt9XG4gICAgICAgIHRoYXQubm9kZXMgPSB0aGF0LmdyYXBoLm5vZGVzIHx8IFtdXG4gICAgICAgIHRoYXQuZWRnZXMgPSB0aGF0LmdyYXBoLmVkZ2VzIHx8IFtdXG4gICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZSkge1xuICAgICAgICB0aGF0LmVycm9yID0gZS5tZXNzYWdlIHx8ICflm77osLHliqDovb3lpLHotKUnXG4gICAgICB9KS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhhdC5sb2FkaW5nID0gZmFsc2VcbiAgICAgICAgaWYgKGRvbmUpIGRvbmUoKVxuICAgICAgfSlcbiAgICB9LFxuICAgIGNoYW5nZU1vZGU6IGZ1bmN0aW9uIChtKSB7IHRoaXMubW9kZSA9IG07IHRoaXMubG9hZCgpIH0sXG4gICAgcGxhY2VSb3c6IGZ1bmN0aW9uIChsaXN0LCB5LCBzaXplLCBjbHMsIGFycmFuZ2VkKSB7XG4gICAgICBjb25zdCBjb3VudCA9IGxpc3QubGVuZ3RoXG4gICAgICBpZiAoIWNvdW50KSByZXR1cm5cbiAgICAgIGNvbnN0IGdhcCA9IFNUQUdFX1cgLyAoY291bnQgKyAxKVxuICAgICAgbGlzdC5mb3JFYWNoKChuLCBpZHgpID0+IHtcbiAgICAgICAgYXJyYW5nZWQucHVzaCh0aGlzLmJ1aWxkVmlzdWFsTm9kZShuLCBNYXRoLnJvdW5kKGdhcCAqIChpZHggKyAxKSksIHksIHNpemUsIGNscykpXG4gICAgICB9KVxuICAgIH0sXG4gICAgdHlwZUxhYmVsOiBmdW5jdGlvbiAodHlwZSkge1xuICAgICAgY29uc3QgbWFwID0geyBQcm9maWxlOiAn55S75YOPJywgSW50ZXJlc3RDbHVzdGVyOiAn5YW06Laj57CHJywgU2VlZEJvb2s6ICfnp43lrZDkuaYnLCBCb29rOiAn5Zu+5LmmJywgQXV0aG9yOiAn5L2c6ICFJywgVGFnOiAn5qCH562+JywgRmllbGQ6ICfpoobln58nLCBBdWRpZW5jZTogJ+mAguivu+S6uue+pCcsIERpZmZpY3VsdHk6ICfpmr7luqYnLCBLZXl3b3JkOiAn5YWz6ZSu6K+NJywgVG9waWM6ICfkuLvpopgnLCBQdWJsaXNoZXI6ICflh7rniYjnpL4nLCBTZXJpZXM6ICfns7vliJcnIH1cbiAgICAgIHJldHVybiBtYXBbdHlwZV0gfHwgdHlwZSB8fCAn6IqC54K5J1xuICAgIH0sXG4gICAgc2hvcnRMYWJlbDogZnVuY3Rpb24gKGxhYmVsLCBtYXgpIHtcbiAgICAgIGxhYmVsID0gU3RyaW5nKGxhYmVsIHx8ICfoioLngrknKVxuICAgICAgbWF4ID0gbWF4IHx8IDVcbiAgICAgIHJldHVybiBsYWJlbC5sZW5ndGggPiBtYXggPyBsYWJlbC5zbGljZSgwLCBtYXgpICsgJ+KApicgOiBsYWJlbFxuICAgIH0sXG4gICAgYnVpbGRWaXN1YWxOb2RlOiBmdW5jdGlvbiAobiwgeCwgeSwgc2l6ZSwgY2xzKSB7XG4gICAgICBjb25zdCBpc0Jvb2sgPSBuLnR5cGUgPT09ICdCb29rJyB8fCBuLnR5cGUgPT09ICdTZWVkQm9vaydcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGlkOiBuLmlkLFxuICAgICAgICBsYWJlbDogbi5sYWJlbCB8fCAn6IqC54K5JyxcbiAgICAgICAgc2hvcnRMYWJlbDogdGhpcy5zaG9ydExhYmVsKG4ubGFiZWwsIGNscyA9PT0gJ2NlbnRlcicgPyA2IDogNSksXG4gICAgICAgIHR5cGU6IG4udHlwZSxcbiAgICAgICAgdHlwZUxhYmVsOiB0aGlzLnR5cGVMYWJlbChuLnR5cGUpLFxuICAgICAgICBib29rX2lkOiBuLmJvb2tfaWQgfHwgKGlzQm9vayA/IFN0cmluZyhuLmlkKS5zcGxpdCgnOicpLnBvcCgpIDogbnVsbCksXG4gICAgICAgIGN4OiBNYXRoLnJvdW5kKHgpLFxuICAgICAgICBjeTogTWF0aC5yb3VuZCh5KSxcbiAgICAgICAgc2l6ZTogc2l6ZSxcbiAgICAgICAgY2xhc3NOYW1lOiBjbHMsXG4gICAgICAgIHN0eWxlOiAnbGVmdDonICsgTWF0aC5yb3VuZCh4IC0gc2l6ZSAvIDIpICsgJ3JweDt0b3A6JyArIE1hdGgucm91bmQoeSAtIHNpemUgLyAyKSArICdycHg7d2lkdGg6JyArIHNpemUgKyAncnB4O2hlaWdodDonICsgc2l6ZSArICdycHg7J1xuICAgICAgfVxuICAgIH0sXG4gICAgdGFwTm9kZTogZnVuY3Rpb24gKG4pIHtcbiAgICAgIGlmIChuLmJvb2tfaWQpIHVuaS5uYXZpZ2F0ZVRvKHsgdXJsOiAnL3BhZ2VzL2RldGFpbC9kZXRhaWw/aWQ9JyArIG4uYm9va19pZCB9KVxuICAgICAgZWxzZSB1bmkuc2hvd1RvYXN0KHsgdGl0bGU6IG4ubGFiZWwsIGljb246ICdub25lJyB9KVxuICAgIH1cbiAgfVxufVxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG4uZnVsbC1wYWdle3BhZGRpbmctYm90dG9tOmNhbGMoMzRycHggKyBlbnYoc2FmZS1hcmVhLWluc2V0LWJvdHRvbSkpfVxuLnRvcC1jYXJke2JhY2tncm91bmQ6bGluZWFyLWdyYWRpZW50KDEzNWRlZywjZmZmLCNlZmY2ZmYgNTUlLCNmM2U4ZmYpfVxuLm1vZGUtcm93e21hcmdpbi10b3A6MThycHh9XG4uZ3JhcGgtY2FyZHtiYWNrZ3JvdW5kOiNmZmY7Ym9yZGVyLXJhZGl1czozNHJweDtwYWRkaW5nOjIwcnB4O21hcmdpbi1ib3R0b206MjJycHg7Ym94LXNoYWRvdzowIDE4cnB4IDQ0cnB4IHJnYmEoMTUsMjMsNDIsLjA4KTtvdmVyZmxvdzpoaWRkZW59XG4uZ3JhcGgtc3RhZ2V7XG4gIHBvc2l0aW9uOnJlbGF0aXZlO1xuICB3aWR0aDo2NTBycHg7XG4gIGhlaWdodDoxMzIwcnB4O1xuICBtYXJnaW46MCBhdXRvO1xuICBib3JkZXItcmFkaXVzOjMycnB4O1xuICBiYWNrZ3JvdW5kOmxpbmVhci1ncmFkaWVudCgxODBkZWcsI2Y4ZmJmZiAwJSwjZjNmMGZmIDQ4JSwjZmZmOGVkIDEwMCUpO1xuICBvdmVyZmxvdzpoaWRkZW47XG4gIGJvcmRlcjoxcnB4IHNvbGlkICNlOWQ1ZmY7XG59XG4uZ3JhcGgtc3RhZ2U6YmVmb3Jle2NvbnRlbnQ6XCJcIjtwb3NpdGlvbjphYnNvbHV0ZTtsZWZ0OjQwcnB4O3JpZ2h0OjQwcnB4O3RvcDozMDBycHg7Ym9yZGVyLXRvcDoxcnB4IGRhc2hlZCByZ2JhKDEyNCw1OCwyMzcsLjE2KX1cbi5ncmFwaC1zdGFnZTphZnRlcntjb250ZW50OlwiXCI7cG9zaXRpb246YWJzb2x1dGU7bGVmdDo0MHJweDtyaWdodDo0MHJweDt0b3A6OTAwcnB4O2JvcmRlci10b3A6MXJweCBkYXNoZWQgcmdiYSgyNDksMTE1LDIyLC4xOCl9XG4ubGF5ZXItdGl0bGV7XG4gIHBvc2l0aW9uOmFic29sdXRlO1xuICBsZWZ0OjI4cnB4O1xuICB6LWluZGV4OjY7XG4gIGZvbnQtc2l6ZToyMnJweDtcbiAgZm9udC13ZWlnaHQ6OTAwO1xuICBib3JkZXItcmFkaXVzOjk5OXJweDtcbiAgcGFkZGluZzo4cnB4IDE0cnB4O1xuICBiYWNrZ3JvdW5kOnJnYmEoMjU1LDI1NSwyNTUsLjg2KTtcbiAgYm94LXNoYWRvdzowIDhycHggMjBycHggcmdiYSgxNSwyMyw0MiwuMDUpO1xufVxuLmxheWVyLXRpdGxlLnRvcHt0b3A6MjRycHg7Y29sb3I6IzdjM2FlZH1cbi5sYXllci10aXRsZS5taWRkbGV7dG9wOjMyMHJweDtjb2xvcjojNGMxZDk1fVxuLmxheWVyLXRpdGxlLmJvdHRvbXt0b3A6OTIwcnB4O2NvbG9yOiNjMjQxMGN9XG4uZ3JhcGgtbGluZXtwb3NpdGlvbjphYnNvbHV0ZTtoZWlnaHQ6M3JweDtiYWNrZ3JvdW5kOmxpbmVhci1ncmFkaWVudCg5MGRlZyxyZ2JhKDEyNCw1OCwyMzcsLjE4KSxyZ2JhKDE0LDE2NSwyMzMsLjM0KSk7dHJhbnNmb3JtLW9yaWdpbjowIDUwJTt6LWluZGV4OjF9XG4uZ3JhcGgtbm9kZXtwb3NpdGlvbjphYnNvbHV0ZTtib3JkZXItcmFkaXVzOjk5OTlycHg7ei1pbmRleDoyO2Rpc3BsYXk6ZmxleDtmbGV4LWRpcmVjdGlvbjpjb2x1bW47YWxpZ24taXRlbXM6Y2VudGVyO2p1c3RpZnktY29udGVudDpjZW50ZXI7dGV4dC1hbGlnbjpjZW50ZXI7cGFkZGluZzo4cnB4O2JveC1zaGFkb3c6MCAxNHJweCAzOHJweCByZ2JhKDE1LDIzLDQyLC4xMSk7Ym9yZGVyOjJycHggc29saWQgcmdiYSgyNTUsMjU1LDI1NSwuOTIpfVxuLmdyYXBoLW5vZGUuY2VudGVye2JhY2tncm91bmQ6bGluZWFyLWdyYWRpZW50KDEzNWRlZywjN2MzYWVkLCMwZWE1ZTkpO2NvbG9yOiNmZmZ9XG4uZ3JhcGgtbm9kZS5zZW1hbnRpY3tiYWNrZ3JvdW5kOmxpbmVhci1ncmFkaWVudCgxMzVkZWcsI2VkZTlmZSwjZTBmMmZlKTtjb2xvcjojNGMxZDk1fVxuLmdyYXBoLW5vZGUuYm9va3tiYWNrZ3JvdW5kOmxpbmVhci1ncmFkaWVudCgxMzVkZWcsI2ZmZjdlZCwjZmZmKTtjb2xvcjojMTExODI3O2JvcmRlci1jb2xvcjojZmVkN2FhfVxuLmdyYXBoLW5vZGUub3RoZXJ7YmFja2dyb3VuZDpsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCNmMWY1ZjksI2ZmZik7Y29sb3I6IzMzNDE1NX1cbi5ub2RlLW1haW57Zm9udC1zaXplOjIycnB4O2ZvbnQtd2VpZ2h0OjkwMDtsaW5lLWhlaWdodDoxLjEyfVxuLmdyYXBoLW5vZGUuY2VudGVyIC5ub2RlLW1haW57Zm9udC1zaXplOjI1cnB4fVxuLm5vZGUtc3Vie2ZvbnQtc2l6ZToxN3JweDttYXJnaW4tdG9wOjRycHg7b3BhY2l0eTouNzg7Zm9udC13ZWlnaHQ6ODAwfVxuLmxlZ2VuZC1yb3d7ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcjtnYXA6MTBycHg7ZmxleC13cmFwOndyYXB9XG4uZG90e2Rpc3BsYXk6aW5saW5lLWJsb2NrO3dpZHRoOjI0cnB4O2hlaWdodDoyNHJweDtib3JkZXItcmFkaXVzOjUwJTttYXJnaW4tbGVmdDo4cnB4fVxuLmRvdC5jZW50ZXJ7YmFja2dyb3VuZDojN2MzYWVkfVxuLmRvdC5zZW1hbnRpY3tiYWNrZ3JvdW5kOiNjNGI1ZmR9XG4uZG90LmJvb2t7YmFja2dyb3VuZDojZmRiYTc0fVxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogMzgwcHgpe1xuICAuZ3JhcGgtc3RhZ2V7d2lkdGg6NjIwcnB4O2hlaWdodDoxMzIwcnB4fVxufVxuPC9zdHlsZT5cbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///33\n");

/***/ }),
/* 34 */
/*!***************************************************************************************!*\
  !*** E:/翻译漫画/book-main (14)/book-main/frontend-uni/pages/shelf/shelf.vue?mpType=page ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _shelf_vue_vue_type_template_id_209df2ec_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shelf.vue?vue&type=template&id=209df2ec&scoped=true&mpType=page */ 35);\n/* harmony import */ var _shelf_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shelf.vue?vue&type=script&lang=js&mpType=page */ 37);\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _shelf_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__) if([\"default\"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _shelf_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n/* harmony import */ var _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 18);\n\nvar renderjs\n\n\n\n\n/* normalize component */\n\nvar component = Object(_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\n  _shelf_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _shelf_vue_vue_type_template_id_209df2ec_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _shelf_vue_vue_type_template_id_209df2ec_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  \"209df2ec\",\n  null,\n  false,\n  _shelf_vue_vue_type_template_id_209df2ec_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__[\"components\"],\n  renderjs\n)\n\ncomponent.options.__file = \"pages/shelf/shelf.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbbnVsbF0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBeUk7QUFDekk7QUFDb0U7QUFDTDs7O0FBRy9EO0FBQ2dNO0FBQ2hNLGdCQUFnQix1TUFBVTtBQUMxQixFQUFFLHNGQUFNO0FBQ1IsRUFBRSx1R0FBTTtBQUNSLEVBQUUsZ0hBQWU7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUUsMkdBQVU7QUFDWjtBQUNBOztBQUVBO0FBQ2UsZ0YiLCJmaWxlIjoiMzQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucywgcmVjeWNsYWJsZVJlbmRlciwgY29tcG9uZW50cyB9IGZyb20gXCIuL3NoZWxmLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD0yMDlkZjJlYyZzY29wZWQ9dHJ1ZSZtcFR5cGU9cGFnZVwiXG52YXIgcmVuZGVyanNcbmltcG9ydCBzY3JpcHQgZnJvbSBcIi4vc2hlbGYudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJm1wVHlwZT1wYWdlXCJcbmV4cG9ydCAqIGZyb20gXCIuL3NoZWxmLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZtcFR5cGU9cGFnZVwiXG5cblxuLyogbm9ybWFsaXplIGNvbXBvbmVudCAqL1xuaW1wb3J0IG5vcm1hbGl6ZXIgZnJvbSBcIiEuLi8uLi8uLi8uLi8uLi9IQnVpbGRlclguNS4wNy4yMDI2MDQxMDA2L0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvdnVlLWxvYWRlci9saWIvcnVudGltZS9jb21wb25lbnROb3JtYWxpemVyLmpzXCJcbnZhciBjb21wb25lbnQgPSBub3JtYWxpemVyKFxuICBzY3JpcHQsXG4gIHJlbmRlcixcbiAgc3RhdGljUmVuZGVyRm5zLFxuICBmYWxzZSxcbiAgbnVsbCxcbiAgXCIyMDlkZjJlY1wiLFxuICBudWxsLFxuICBmYWxzZSxcbiAgY29tcG9uZW50cyxcbiAgcmVuZGVyanNcbilcblxuY29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJwYWdlcy9zaGVsZi9zaGVsZi52dWVcIlxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50LmV4cG9ydHMiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///34\n");

/***/ }),
/* 35 */
/*!*********************************************************************************************************************************!*\
  !*** E:/翻译漫画/book-main (14)/book-main/frontend-uni/pages/shelf/shelf.vue?vue&type=template&id=209df2ec&scoped=true&mpType=page ***!
  \*********************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_0_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_shelf_vue_vue_type_template_id_209df2ec_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--11-0!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/filter-modules-template.js!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./shelf.vue?vue&type=template&id=209df2ec&scoped=true&mpType=page */ 36);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_0_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_shelf_vue_vue_type_template_id_209df2ec_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_0_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_shelf_vue_vue_type_template_id_209df2ec_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_0_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_shelf_vue_vue_type_template_id_209df2ec_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_0_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_shelf_vue_vue_type_template_id_209df2ec_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),
/* 36 */
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--11-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/filter-modules-template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!E:/翻译漫画/book-main (14)/book-main/frontend-uni/pages/shelf/shelf.vue?vue&type=template&id=209df2ec&scoped=true&mpType=page ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "view",
    { staticClass: _vm._$s(0, "sc", "container shelf-page"), attrs: { _i: 0 } },
    [
      _c(
        "view",
        { staticClass: _vm._$s(1, "sc", "card hero"), attrs: { _i: 1 } },
        [
          _c(
            "view",
            { staticClass: _vm._$s(2, "sc", "between"), attrs: { _i: 2 } },
            [
              _c("text", {
                staticClass: _vm._$s(3, "sc", "title"),
                attrs: { _i: 3 },
              }),
              _vm._$s(4, "i", !_vm.logged)
                ? _c("button", {
                    staticClass: _vm._$s(4, "sc", "btn small"),
                    attrs: { _i: 4 },
                    on: { click: _vm.goLogin },
                  })
                : _vm._e(),
            ]
          ),
          _c("text", {
            staticClass: _vm._$s(5, "sc", "muted"),
            attrs: { _i: 5 },
          }),
        ]
      ),
      _vm._$s(6, "i", _vm.error)
        ? _c(
            "view",
            { staticClass: _vm._$s(6, "sc", "card"), attrs: { _i: 6 } },
            [
              _c(
                "text",
                { staticClass: _vm._$s(7, "sc", "muted"), attrs: { _i: 7 } },
                [_vm._v(_vm._$s(7, "t0-0", _vm._s(_vm.error)))]
              ),
            ]
          )
        : _vm._e(),
      _vm._$s(8, "i", !_vm.logged)
        ? _c(
            "view",
            { staticClass: _vm._$s(8, "sc", "card guest"), attrs: { _i: 8 } },
            [
              _c("text", {
                staticClass: _vm._$s(9, "sc", "title"),
                attrs: { _i: 9 },
              }),
              _c("text", {
                staticClass: _vm._$s(10, "sc", "muted"),
                attrs: { _i: 10 },
              }),
              _c(
                "view",
                {
                  staticClass: _vm._$s(11, "sc", "guest-stats"),
                  attrs: { _i: 11 },
                },
                [
                  _c("view", [
                    _c("text", {
                      staticClass: _vm._$s(13, "sc", "stat-num"),
                      attrs: { _i: 13 },
                    }),
                    _c("text", {
                      staticClass: _vm._$s(14, "sc", "muted"),
                      attrs: { _i: 14 },
                    }),
                  ]),
                  _c("view", [
                    _c("text", {
                      staticClass: _vm._$s(16, "sc", "stat-num"),
                      attrs: { _i: 16 },
                    }),
                    _c("text", {
                      staticClass: _vm._$s(17, "sc", "muted"),
                      attrs: { _i: 17 },
                    }),
                  ]),
                  _c("view", [
                    _c("text", {
                      staticClass: _vm._$s(19, "sc", "stat-num"),
                      attrs: { _i: 19 },
                    }),
                    _c("text", {
                      staticClass: _vm._$s(20, "sc", "muted"),
                      attrs: { _i: 20 },
                    }),
                  ]),
                ]
              ),
              _c("button", {
                staticClass: _vm._$s(21, "sc", "btn"),
                attrs: { _i: 21 },
                on: { click: _vm.goLogin },
              }),
            ]
          )
        : _vm._e(),
      _vm._$s(22, "i", _vm.logged)
        ? _c(
            "view",
            { staticClass: _vm._$s(22, "sc", "tabs"), attrs: { _i: 22 } },
            _vm._l(
              _vm._$s(23, "f", { forItems: _vm.shelves }),
              function (s, $10, $20, $30) {
                return _c(
                  "text",
                  {
                    key: _vm._$s(23, "f", { forIndex: $20, key: s.name }),
                    class: _vm._$s(
                      "23-" + $30,
                      "c",
                      _vm.active === s.name ? "chip active" : "chip"
                    ),
                    attrs: { _i: "23-" + $30 },
                    on: {
                      click: function ($event) {
                        _vm.active = s.name
                      },
                    },
                  },
                  [
                    _vm._v(
                      _vm._$s("23-" + $30, "t0-0", _vm._s(s.name)) +
                        _vm._$s("23-" + $30, "t0-1", _vm._s(s.count))
                    ),
                  ]
                )
              }
            ),
            0
          )
        : _vm._e(),
      _vm._$s(24, "i", _vm.logged && !_vm.activeBooks.length)
        ? _c(
            "view",
            { staticClass: _vm._$s(24, "sc", "card empty"), attrs: { _i: 24 } },
            [
              _c("text", {
                staticClass: _vm._$s(25, "sc", "muted"),
                attrs: { _i: 25 },
              }),
              _c("button", {
                staticClass: _vm._$s(26, "sc", "btn small"),
                attrs: { _i: 26 },
                on: { click: _vm.goSearch },
              }),
            ]
          )
        : _vm._e(),
      _vm._l(
        _vm._$s(27, "f", { forItems: _vm.activeBooks }),
        function (item, $11, $21, $31) {
          return _c(
            "view",
            {
              key: _vm._$s(27, "f", { forIndex: $21, key: item.book.id }),
              staticClass: _vm._$s("27-" + $31, "sc", "shelf-book card"),
              attrs: { _i: "27-" + $31 },
            },
            [
              _c("BookCard", {
                attrs: { book: item.book, _i: "28-" + $31 },
                on: { click: _vm.goDetail },
              }),
              _c(
                "view",
                {
                  staticClass: _vm._$s("29-" + $31, "sc", "book-actions"),
                  attrs: { _i: "29-" + $31 },
                },
                [
                  _c("button", {
                    staticClass: _vm._$s("30-" + $31, "sc", "btn small"),
                    attrs: { _i: "30-" + $31 },
                    on: {
                      click: function ($event) {
                        return _vm.continueRead(item)
                      },
                    },
                  }),
                  _c("button", {
                    staticClass: _vm._$s(
                      "31-" + $31,
                      "sc",
                      "btn secondary small"
                    ),
                    attrs: { _i: "31-" + $31 },
                    on: {
                      click: function ($event) {
                        return _vm.move(item, "在读")
                      },
                    },
                  }),
                  _c("button", {
                    staticClass: _vm._$s(
                      "32-" + $31,
                      "sc",
                      "btn secondary small"
                    ),
                    attrs: { _i: "32-" + $31 },
                    on: {
                      click: function ($event) {
                        return _vm.move(item, "已读")
                      },
                    },
                  }),
                  _c("button", {
                    staticClass: _vm._$s("33-" + $31, "sc", "btn danger small"),
                    attrs: { _i: "33-" + $31 },
                    on: {
                      click: function ($event) {
                        return _vm.remove(item)
                      },
                    },
                  }),
                ]
              ),
            ],
            1
          )
        }
      ),
    ],
    2
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),
/* 37 */
/*!***************************************************************************************************************!*\
  !*** E:/翻译漫画/book-main (14)/book-main/frontend-uni/pages/shelf/shelf.vue?vue&type=script&lang=js&mpType=page ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_1_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_shelf_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--7-1!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/using-components.js!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./shelf.vue?vue&type=script&lang=js&mpType=page */ 38);\n/* harmony import */ var _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_1_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_shelf_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_1_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_shelf_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_1_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_shelf_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__) if([\"default\"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_1_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_shelf_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n /* harmony default export */ __webpack_exports__[\"default\"] = (_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_1_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_shelf_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0___default.a); //# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbbnVsbF0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQWdxQixDQUFnQiw4cUJBQUcsRUFBQyIsImZpbGUiOiIzNy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vSEJ1aWxkZXJYLjUuMDcuMjAyNjA0MTAwNi9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzIS4uLy4uLy4uLy4uLy4uL0hCdWlsZGVyWC41LjA3LjIwMjYwNDEwMDYvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy93ZWJwYWNrLXByZXByb2Nlc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTctMSEuLi8uLi8uLi8uLi8uLi9IQnVpbGRlclguNS4wNy4yMDI2MDQxMDA2L0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvd2VicGFjay11bmktYXBwLWxvYWRlci91c2luZy1jb21wb25lbnRzLmpzIS4uLy4uLy4uLy4uLy4uL0hCdWlsZGVyWC41LjA3LjIwMjYwNDEwMDYvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vc2hlbGYudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJm1wVHlwZT1wYWdlXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vSEJ1aWxkZXJYLjUuMDcuMjAyNjA0MTAwNi9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzIS4uLy4uLy4uLy4uLy4uL0hCdWlsZGVyWC41LjA3LjIwMjYwNDEwMDYvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy93ZWJwYWNrLXByZXByb2Nlc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTctMSEuLi8uLi8uLi8uLi8uLi9IQnVpbGRlclguNS4wNy4yMDI2MDQxMDA2L0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvd2VicGFjay11bmktYXBwLWxvYWRlci91c2luZy1jb21wb25lbnRzLmpzIS4uLy4uLy4uLy4uLy4uL0hCdWlsZGVyWC41LjA3LjIwMjYwNDEwMDYvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vc2hlbGYudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJm1wVHlwZT1wYWdlXCIiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///37\n");

/***/ }),
/* 38 */
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--7-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/using-components.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!E:/翻译漫画/book-main (14)/book-main/frontend-uni/pages/shelf/shelf.vue?vue&type=script&lang=js&mpType=page ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 1);\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\nvar _BookCard = _interopRequireDefault(__webpack_require__(/*! ../../components/BookCard.vue */ 12));\nvar _request = __webpack_require__(/*! ../../api/request.js */ 17);\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\nvar _default = {\n  components: {\n    BookCard: _BookCard.default\n  },\n  data: function data() {\n    return {\n      logged: false,\n      error: '',\n      shelves: [],\n      active: '想读'\n    };\n  },\n  computed: {\n    activeBooks: function activeBooks() {\n      var s = this.shelves.find(function (x) {\n        return x.name === this.active;\n      }.bind(this));\n      return s ? s.books || [] : [];\n    }\n  },\n  onShow: function onShow() {\n    this.load();\n  },\n  onPullDownRefresh: function onPullDownRefresh() {\n    var that = this;\n    this.load(function () {\n      uni.stopPullDownRefresh();\n    });\n  },\n  methods: {\n    load: function load(done) {\n      var that = this;\n      that.logged = !!(0, _request.getToken)();\n      that.error = '';\n      if (!that.logged) {\n        that.shelves = [];\n        if (done) done();\n        return;\n      }\n      (0, _request.request)('/ecosystem/shelves').then(function (res) {\n        that.shelves = res && res.shelves || [];\n        if (!that.shelves.find(function (s) {\n          return s.name === that.active;\n        }) && that.shelves.length) that.active = that.shelves[0].name;\n      }).catch(function (e) {\n        that.error = e.message || '书架加载失败';\n      }).then(function () {\n        if (done) done();\n      });\n    },\n    goLogin: function goLogin() {\n      uni.navigateTo({\n        url: '/pages/login/login'\n      });\n    },\n    goSearch: function goSearch() {\n      uni.switchTab({\n        url: '/pages/search/search'\n      });\n    },\n    goDetail: function goDetail(book) {\n      uni.navigateTo({\n        url: '/pages/detail/detail?id=' + (book.id || book.book_id)\n      });\n    },\n    continueRead: function continueRead(item) {\n      var b = item.book || {};\n      uni.navigateTo({\n        url: '/pages/reader/reader?id=' + (b.id || b.book_id)\n      });\n    },\n    move: function move(item, target) {\n      var that = this;\n      var b = item.book || {};\n      var status = target === '已读' ? 'read' : 'reading';\n      (0, _request.request)('/ecosystem/shelves/book/' + (b.id || b.book_id), {\n        method: 'POST',\n        data: {\n          shelf_name: target,\n          reading_status: status\n        }\n      }).then(function () {\n        uni.showToast({\n          title: '已加入' + target\n        });\n        that.load();\n      }).catch(function (e) {\n        (0, _request.showError)(e, '操作失败');\n      });\n    },\n    remove: function remove(item) {\n      var that = this;\n      var b = item.book || {};\n      var id = b.id || b.book_id;\n      (0, _request.request)('/ecosystem/shelves/book/' + id + '?shelf_name=' + encodeURIComponent(that.active), {\n        method: 'DELETE'\n      }).then(function () {\n        uni.showToast({\n          title: '已移除'\n        });\n        that.load();\n      }).catch(function (e) {\n        (0, _request.showError)(e, '移除失败');\n      });\n    }\n  }\n};\nexports.default = _default;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVuaS1hcHA6Ly8vcGFnZXMvc2hlbGYvc2hlbGYudnVlIl0sIm5hbWVzIjpbImNvbXBvbmVudHMiLCJCb29rQ2FyZCIsImRhdGEiLCJsb2dnZWQiLCJlcnJvciIsInNoZWx2ZXMiLCJhY3RpdmUiLCJjb21wdXRlZCIsImFjdGl2ZUJvb2tzIiwib25TaG93Iiwib25QdWxsRG93blJlZnJlc2giLCJ1bmkiLCJtZXRob2RzIiwibG9hZCIsInRoYXQiLCJnb0xvZ2luIiwidXJsIiwiZ29TZWFyY2giLCJnb0RldGFpbCIsImNvbnRpbnVlUmVhZCIsIm1vdmUiLCJtZXRob2QiLCJzaGVsZl9uYW1lIiwicmVhZGluZ19zdGF0dXMiLCJ0aXRsZSIsInJlbW92ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQXlDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztlQUNBO0VBQ0FBO0lBQUFDO0VBQUE7RUFDQUM7SUFBQTtNQUFBQztNQUFBQztNQUFBQztNQUFBQztJQUFBO0VBQUE7RUFDQUM7SUFBQUM7TUFBQTtRQUFBO01BQUE7TUFBQTtJQUFBO0VBQUE7RUFDQUM7SUFBQTtFQUFBO0VBQ0FDO0lBQUE7SUFBQTtNQUFBQztJQUFBO0VBQUE7RUFDQUM7SUFDQUM7TUFDQTtNQUNBQztNQUFBQTtNQUNBO1FBQUFBO1FBQUE7UUFBQTtNQUFBO01BQ0E7UUFDQUE7UUFDQTtVQUFBO1FBQUE7TUFDQTtRQUFBQTtNQUFBO1FBQUE7TUFBQTtJQUNBO0lBQ0FDO01BQUFKO1FBQUFLO01BQUE7SUFBQTtJQUNBQztNQUFBTjtRQUFBSztNQUFBO0lBQUE7SUFDQUU7TUFBQVA7UUFBQUs7TUFBQTtJQUFBO0lBQ0FHO01BQUE7TUFBQVI7UUFBQUs7TUFBQTtJQUFBO0lBQ0FJO01BQ0E7TUFBQTtNQUFBO01BQ0E7UUFBQUM7UUFBQW5CO1VBQUFvQjtVQUFBQztRQUFBO01BQUE7UUFBQVo7VUFBQWE7UUFBQTtRQUFBVjtNQUFBO1FBQUE7TUFBQTtJQUNBO0lBQ0FXO01BQ0E7TUFBQTtNQUFBO01BQ0E7UUFBQUo7TUFBQTtRQUFBVjtVQUFBYTtRQUFBO1FBQUFWO01BQUE7UUFBQTtNQUFBO0lBQ0E7RUFDQTtBQUNBO0FBQUEiLCJmaWxlIjoiMzguanMiLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XG4gIDx2aWV3IGNsYXNzPVwiY29udGFpbmVyIHNoZWxmLXBhZ2VcIj5cbiAgICA8dmlldyBjbGFzcz1cImNhcmQgaGVyb1wiPlxuICAgICAgPHZpZXcgY2xhc3M9XCJiZXR3ZWVuXCI+PHRleHQgY2xhc3M9XCJ0aXRsZVwiPuaIkeeahOS5puaetjwvdGV4dD48YnV0dG9uIHYtaWY9XCIhbG9nZ2VkXCIgY2xhc3M9XCJidG4gc21hbGxcIiBAY2xpY2s9XCJnb0xvZ2luXCI+55m75b2VPC9idXR0b24+PC92aWV3PlxuICAgICAgPHRleHQgY2xhc3M9XCJtdXRlZFwiPueuoeeQhuaDs+ivu+OAgeWcqOivu+OAgeW3suivu+WbvuS5pu+8jOe7p+e7reS4iuasoemYheivu+OAgjwvdGV4dD5cbiAgICA8L3ZpZXc+XG5cbiAgICA8dmlldyB2LWlmPVwiZXJyb3JcIiBjbGFzcz1cImNhcmRcIj48dGV4dCBjbGFzcz1cIm11dGVkXCI+e3sgZXJyb3IgfX08L3RleHQ+PC92aWV3PlxuXG4gICAgPHZpZXcgdi1pZj1cIiFsb2dnZWRcIiBjbGFzcz1cImNhcmQgZ3Vlc3RcIj5cbiAgICAgIDx0ZXh0IGNsYXNzPVwidGl0bGVcIj7nmbvlvZXlkI7op6PplIHlrozmlbTkuabmnrY8L3RleHQ+XG4gICAgICA8dGV4dCBjbGFzcz1cIm11dGVkXCI+55m75b2V5ZCO5Y+v5Lul5ZCM5q2l6ZiF6K+76L+b5bqm44CB5pS26JeP5Zu+5Lmm44CB57un57ut6ZiF6K+75ZKM55Sf5oiQ5YW06Laj55S75YOP44CCPC90ZXh0PlxuICAgICAgPHZpZXcgY2xhc3M9XCJndWVzdC1zdGF0c1wiPlxuICAgICAgICA8dmlldz48dGV4dCBjbGFzcz1cInN0YXQtbnVtXCI+5oOz6K+7PC90ZXh0Pjx0ZXh0IGNsYXNzPVwibXV0ZWRcIj7mlLbol4/orqHliJI8L3RleHQ+PC92aWV3PlxuICAgICAgICA8dmlldz48dGV4dCBjbGFzcz1cInN0YXQtbnVtXCI+5Zyo6K+7PC90ZXh0Pjx0ZXh0IGNsYXNzPVwibXV0ZWRcIj7nu63or7vov5vluqY8L3RleHQ+PC92aWV3PlxuICAgICAgICA8dmlldz48dGV4dCBjbGFzcz1cInN0YXQtbnVtXCI+5bey6K+7PC90ZXh0Pjx0ZXh0IGNsYXNzPVwibXV0ZWRcIj7msonmt4DnlLvlg488L3RleHQ+PC92aWV3PlxuICAgICAgPC92aWV3PlxuICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0blwiIEBjbGljaz1cImdvTG9naW5cIj7nmbvlvZXlkI7mn6XnnIvkuabmnrY8L2J1dHRvbj5cbiAgICA8L3ZpZXc+XG5cbiAgICA8dmlldyB2LWlmPVwibG9nZ2VkXCIgY2xhc3M9XCJ0YWJzXCI+XG4gICAgICA8dGV4dCB2LWZvcj1cInMgaW4gc2hlbHZlc1wiIDprZXk9XCJzLm5hbWVcIiA6Y2xhc3M9XCJhY3RpdmU9PT1zLm5hbWU/J2NoaXAgYWN0aXZlJzonY2hpcCdcIiBAY2xpY2s9XCJhY3RpdmU9cy5uYW1lXCI+e3sgcy5uYW1lIH19IHt7IHMuY291bnQgfX08L3RleHQ+XG4gICAgPC92aWV3PlxuXG4gICAgPHZpZXcgdi1pZj1cImxvZ2dlZCAmJiAhYWN0aXZlQm9va3MubGVuZ3RoXCIgY2xhc3M9XCJjYXJkIGVtcHR5XCI+XG4gICAgICA8dGV4dCBjbGFzcz1cIm11dGVkXCI+5b2T5YmN5Lmm5p625pqC5peg5Zu+5Lmm77yM5Y+v5Lul5Y675Y+R546w6aG15re75Yqg44CCPC90ZXh0PlxuICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBzbWFsbFwiIEBjbGljaz1cImdvU2VhcmNoXCI+5Y675Y+R546wPC9idXR0b24+XG4gICAgPC92aWV3PlxuXG4gICAgPHZpZXcgdi1mb3I9XCJpdGVtIGluIGFjdGl2ZUJvb2tzXCIgOmtleT1cIml0ZW0uYm9vay5pZFwiIGNsYXNzPVwic2hlbGYtYm9vayBjYXJkXCI+XG4gICAgICA8Qm9va0NhcmQgOmJvb2s9XCJpdGVtLmJvb2tcIiBAY2xpY2s9XCJnb0RldGFpbFwiPjwvQm9va0NhcmQ+XG4gICAgICA8dmlldyBjbGFzcz1cImJvb2stYWN0aW9uc1wiPlxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIHNtYWxsXCIgQGNsaWNrPVwiY29udGludWVSZWFkKGl0ZW0pXCI+57un57ut6ZiF6K+7PC9idXR0b24+XG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gc2Vjb25kYXJ5IHNtYWxsXCIgQGNsaWNrPVwibW92ZShpdGVtLCAn5Zyo6K+7JylcIj7lnKjor7s8L2J1dHRvbj5cbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBzZWNvbmRhcnkgc21hbGxcIiBAY2xpY2s9XCJtb3ZlKGl0ZW0sICflt7Lor7snKVwiPuW3suivuzwvYnV0dG9uPlxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGRhbmdlciBzbWFsbFwiIEBjbGljaz1cInJlbW92ZShpdGVtKVwiPuenu+mZpDwvYnV0dG9uPlxuICAgICAgPC92aWV3PlxuICAgIDwvdmlldz5cbiAgPC92aWV3PlxuPC90ZW1wbGF0ZT5cbjxzY3JpcHQ+XG5pbXBvcnQgQm9va0NhcmQgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9Cb29rQ2FyZC52dWUnXG5pbXBvcnQgeyByZXF1ZXN0LCBnZXRUb2tlbiwgc2hvd0Vycm9yIH0gZnJvbSAnLi4vLi4vYXBpL3JlcXVlc3QuanMnXG5leHBvcnQgZGVmYXVsdCB7XG4gIGNvbXBvbmVudHM6IHsgQm9va0NhcmQ6IEJvb2tDYXJkIH0sXG4gIGRhdGE6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHsgbG9nZ2VkOiBmYWxzZSwgZXJyb3I6ICcnLCBzaGVsdmVzOiBbXSwgYWN0aXZlOiAn5oOz6K+7JyB9IH0sXG4gIGNvbXB1dGVkOiB7IGFjdGl2ZUJvb2tzOiBmdW5jdGlvbiAoKSB7IGNvbnN0IHMgPSB0aGlzLnNoZWx2ZXMuZmluZChmdW5jdGlvbiAoeCkgeyByZXR1cm4geC5uYW1lID09PSB0aGlzLmFjdGl2ZSB9LmJpbmQodGhpcykpOyByZXR1cm4gcyA/IChzLmJvb2tzIHx8IFtdKSA6IFtdIH0gfSxcbiAgb25TaG93OiBmdW5jdGlvbiAoKSB7IHRoaXMubG9hZCgpIH0sXG4gIG9uUHVsbERvd25SZWZyZXNoOiBmdW5jdGlvbiAoKSB7IGNvbnN0IHRoYXQgPSB0aGlzOyB0aGlzLmxvYWQoZnVuY3Rpb24gKCkgeyB1bmkuc3RvcFB1bGxEb3duUmVmcmVzaCgpIH0pIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBsb2FkOiBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgY29uc3QgdGhhdCA9IHRoaXNcbiAgICAgIHRoYXQubG9nZ2VkID0gISFnZXRUb2tlbigpOyB0aGF0LmVycm9yID0gJydcbiAgICAgIGlmICghdGhhdC5sb2dnZWQpIHsgdGhhdC5zaGVsdmVzID0gW107IGlmIChkb25lKSBkb25lKCk7IHJldHVybiB9XG4gICAgICByZXF1ZXN0KCcvZWNvc3lzdGVtL3NoZWx2ZXMnKS50aGVuKGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgdGhhdC5zaGVsdmVzID0gKHJlcyAmJiByZXMuc2hlbHZlcykgfHwgW11cbiAgICAgICAgaWYgKCF0aGF0LnNoZWx2ZXMuZmluZChmdW5jdGlvbiAocykgeyByZXR1cm4gcy5uYW1lID09PSB0aGF0LmFjdGl2ZSB9KSAmJiB0aGF0LnNoZWx2ZXMubGVuZ3RoKSB0aGF0LmFjdGl2ZSA9IHRoYXQuc2hlbHZlc1swXS5uYW1lXG4gICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZSkgeyB0aGF0LmVycm9yID0gZS5tZXNzYWdlIHx8ICfkuabmnrbliqDovb3lpLHotKUnIH0pLnRoZW4oZnVuY3Rpb24gKCkgeyBpZiAoZG9uZSkgZG9uZSgpIH0pXG4gICAgfSxcbiAgICBnb0xvZ2luOiBmdW5jdGlvbiAoKSB7IHVuaS5uYXZpZ2F0ZVRvKHsgdXJsOiAnL3BhZ2VzL2xvZ2luL2xvZ2luJyB9KSB9LFxuICAgIGdvU2VhcmNoOiBmdW5jdGlvbiAoKSB7IHVuaS5zd2l0Y2hUYWIoeyB1cmw6ICcvcGFnZXMvc2VhcmNoL3NlYXJjaCcgfSkgfSxcbiAgICBnb0RldGFpbDogZnVuY3Rpb24gKGJvb2spIHsgdW5pLm5hdmlnYXRlVG8oeyB1cmw6ICcvcGFnZXMvZGV0YWlsL2RldGFpbD9pZD0nICsgKGJvb2suaWQgfHwgYm9vay5ib29rX2lkKSB9KSB9LFxuICAgIGNvbnRpbnVlUmVhZDogZnVuY3Rpb24gKGl0ZW0pIHsgY29uc3QgYiA9IGl0ZW0uYm9vayB8fCB7fTsgdW5pLm5hdmlnYXRlVG8oeyB1cmw6ICcvcGFnZXMvcmVhZGVyL3JlYWRlcj9pZD0nICsgKGIuaWQgfHwgYi5ib29rX2lkKSB9KSB9LFxuICAgIG1vdmU6IGZ1bmN0aW9uIChpdGVtLCB0YXJnZXQpIHtcbiAgICAgIGNvbnN0IHRoYXQgPSB0aGlzOyBjb25zdCBiID0gaXRlbS5ib29rIHx8IHt9OyBjb25zdCBzdGF0dXMgPSB0YXJnZXQgPT09ICflt7Lor7snID8gJ3JlYWQnIDogJ3JlYWRpbmcnXG4gICAgICByZXF1ZXN0KCcvZWNvc3lzdGVtL3NoZWx2ZXMvYm9vay8nICsgKGIuaWQgfHwgYi5ib29rX2lkKSwgeyBtZXRob2Q6ICdQT1NUJywgZGF0YTogeyBzaGVsZl9uYW1lOiB0YXJnZXQsIHJlYWRpbmdfc3RhdHVzOiBzdGF0dXMgfSB9KS50aGVuKGZ1bmN0aW9uICgpIHsgdW5pLnNob3dUb2FzdCh7IHRpdGxlOiAn5bey5Yqg5YWlJyArIHRhcmdldCB9KTsgdGhhdC5sb2FkKCkgfSkuY2F0Y2goZnVuY3Rpb24gKGUpIHsgc2hvd0Vycm9yKGUsICfmk43kvZzlpLHotKUnKSB9KVxuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgY29uc3QgdGhhdCA9IHRoaXM7IGNvbnN0IGIgPSBpdGVtLmJvb2sgfHwge307IGNvbnN0IGlkID0gYi5pZCB8fCBiLmJvb2tfaWRcbiAgICAgIHJlcXVlc3QoJy9lY29zeXN0ZW0vc2hlbHZlcy9ib29rLycgKyBpZCArICc/c2hlbGZfbmFtZT0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHRoYXQuYWN0aXZlKSwgeyBtZXRob2Q6ICdERUxFVEUnIH0pLnRoZW4oZnVuY3Rpb24gKCkgeyB1bmkuc2hvd1RvYXN0KHsgdGl0bGU6ICflt7Lnp7vpmaQnIH0pOyB0aGF0LmxvYWQoKSB9KS5jYXRjaChmdW5jdGlvbiAoZSkgeyBzaG93RXJyb3IoZSwgJ+enu+mZpOWksei0pScpIH0pXG4gICAgfVxuICB9XG59XG48L3NjcmlwdD5cbjxzdHlsZSBzY29wZWQ+XG4uaGVyb3tiYWNrZ3JvdW5kOmxpbmVhci1ncmFkaWVudCgxMzVkZWcsI2ZmZiwjZWZmNmZmKX0udGFic3tkaXNwbGF5OmZsZXg7Z2FwOjEycnB4O2ZsZXgtd3JhcDp3cmFwO21hcmdpbi1ib3R0b206MjBycHh9LnNoZWxmLWJvb2t7cGFkZGluZzoxMHJweCAwIDIycnB4fS5ib29rLWFjdGlvbnN7ZGlzcGxheTpmbGV4O2dhcDoxMHJweDtwYWRkaW5nOjAgMjBycHg7ZmxleC13cmFwOndyYXB9LmJvb2stYWN0aW9ucyAuYnRue2ZsZXg6MTtwYWRkaW5nOjAgOHJweDtmb250LXNpemU6MjJycHh9Lmd1ZXN0LXN0YXRze2Rpc3BsYXk6ZmxleDtnYXA6MTJycHg7bWFyZ2luOjIycnB4IDB9Lmd1ZXN0LXN0YXRzIHZpZXd7ZmxleDoxO2JhY2tncm91bmQ6I2ZmZjtib3JkZXItcmFkaXVzOjIwcnB4O3BhZGRpbmc6MThycHggOHJweDt0ZXh0LWFsaWduOmNlbnRlcjtib3JkZXI6MXJweCBzb2xpZCAjZWVmMmY3fS5ndWVzdCAuYnRue21hcmdpbi10b3A6OHJweH1cbjwvc3R5bGU+XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///38\n");

/***/ }),
/* 39 */
/*!*******************************************************************************************!*\
  !*** E:/翻译漫画/book-main (14)/book-main/frontend-uni/pages/profile/profile.vue?mpType=page ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _profile_vue_vue_type_template_id_0600fcaa_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./profile.vue?vue&type=template&id=0600fcaa&scoped=true&mpType=page */ 40);\n/* harmony import */ var _profile_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./profile.vue?vue&type=script&lang=js&mpType=page */ 42);\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _profile_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__) if([\"default\"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _profile_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n/* harmony import */ var _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 18);\n\nvar renderjs\n\n\n\n\n/* normalize component */\n\nvar component = Object(_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\n  _profile_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _profile_vue_vue_type_template_id_0600fcaa_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _profile_vue_vue_type_template_id_0600fcaa_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  \"0600fcaa\",\n  null,\n  false,\n  _profile_vue_vue_type_template_id_0600fcaa_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__[\"components\"],\n  renderjs\n)\n\ncomponent.options.__file = \"pages/profile/profile.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbbnVsbF0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBMkk7QUFDM0k7QUFDc0U7QUFDTDs7O0FBR2pFO0FBQ2dNO0FBQ2hNLGdCQUFnQix1TUFBVTtBQUMxQixFQUFFLHdGQUFNO0FBQ1IsRUFBRSx5R0FBTTtBQUNSLEVBQUUsa0hBQWU7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUUsNkdBQVU7QUFDWjtBQUNBOztBQUVBO0FBQ2UsZ0YiLCJmaWxlIjoiMzkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucywgcmVjeWNsYWJsZVJlbmRlciwgY29tcG9uZW50cyB9IGZyb20gXCIuL3Byb2ZpbGUudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTA2MDBmY2FhJnNjb3BlZD10cnVlJm1wVHlwZT1wYWdlXCJcbnZhciByZW5kZXJqc1xuaW1wb3J0IHNjcmlwdCBmcm9tIFwiLi9wcm9maWxlLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZtcFR5cGU9cGFnZVwiXG5leHBvcnQgKiBmcm9tIFwiLi9wcm9maWxlLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZtcFR5cGU9cGFnZVwiXG5cblxuLyogbm9ybWFsaXplIGNvbXBvbmVudCAqL1xuaW1wb3J0IG5vcm1hbGl6ZXIgZnJvbSBcIiEuLi8uLi8uLi8uLi8uLi9IQnVpbGRlclguNS4wNy4yMDI2MDQxMDA2L0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvdnVlLWxvYWRlci9saWIvcnVudGltZS9jb21wb25lbnROb3JtYWxpemVyLmpzXCJcbnZhciBjb21wb25lbnQgPSBub3JtYWxpemVyKFxuICBzY3JpcHQsXG4gIHJlbmRlcixcbiAgc3RhdGljUmVuZGVyRm5zLFxuICBmYWxzZSxcbiAgbnVsbCxcbiAgXCIwNjAwZmNhYVwiLFxuICBudWxsLFxuICBmYWxzZSxcbiAgY29tcG9uZW50cyxcbiAgcmVuZGVyanNcbilcblxuY29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJwYWdlcy9wcm9maWxlL3Byb2ZpbGUudnVlXCJcbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudC5leHBvcnRzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///39\n");

/***/ }),
/* 40 */
/*!*************************************************************************************************************************************!*\
  !*** E:/翻译漫画/book-main (14)/book-main/frontend-uni/pages/profile/profile.vue?vue&type=template&id=0600fcaa&scoped=true&mpType=page ***!
  \*************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_0_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_profile_vue_vue_type_template_id_0600fcaa_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--11-0!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/filter-modules-template.js!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./profile.vue?vue&type=template&id=0600fcaa&scoped=true&mpType=page */ 41);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_0_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_profile_vue_vue_type_template_id_0600fcaa_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_0_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_profile_vue_vue_type_template_id_0600fcaa_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_0_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_profile_vue_vue_type_template_id_0600fcaa_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_0_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_profile_vue_vue_type_template_id_0600fcaa_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),
/* 41 */
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--11-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/filter-modules-template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!E:/翻译漫画/book-main (14)/book-main/frontend-uni/pages/profile/profile.vue?vue&type=template&id=0600fcaa&scoped=true&mpType=page ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "view",
    {
      staticClass: _vm._$s(0, "sc", "container profile-page"),
      attrs: { _i: 0 },
    },
    [
      _c(
        "view",
        { staticClass: _vm._$s(1, "sc", "user-card card"), attrs: { _i: 1 } },
        [
          _c(
            "text",
            { staticClass: _vm._$s(2, "sc", "avatar"), attrs: { _i: 2 } },
            [_vm._v(_vm._$s(2, "t0-0", _vm._s(_vm.avatarText)))]
          ),
          _c(
            "view",
            { staticClass: _vm._$s(3, "sc", "user-info"), attrs: { _i: 3 } },
            [
              _c(
                "text",
                { staticClass: _vm._$s(4, "sc", "title"), attrs: { _i: 4 } },
                [_vm._v(_vm._$s(4, "t0-0", _vm._s(_vm.displayName)))]
              ),
              _c(
                "text",
                { staticClass: _vm._$s(5, "sc", "muted"), attrs: { _i: 5 } },
                [
                  _vm._v(
                    _vm._$s(
                      5,
                      "t0-0",
                      _vm._s(
                        _vm.logged
                          ? _vm.user.is_admin
                            ? "管理员"
                            : "普通用户"
                          : "未登录"
                      )
                    )
                  ),
                ]
              ),
            ]
          ),
          _c(
            "button",
            {
              staticClass: _vm._$s(6, "sc", "btn small"),
              attrs: { _i: 6 },
              on: {
                click: function ($event) {
                  _vm.logged ? _vm.doLogout() : _vm.goLogin()
                },
              },
            },
            [_vm._v(_vm._$s(6, "t0-0", _vm._s(_vm.logged ? "退出" : "登录")))]
          ),
        ]
      ),
      _c(
        "view",
        { staticClass: _vm._$s(7, "sc", "quick-grid"), attrs: { _i: 7 } },
        [
          _c(
            "view",
            {
              staticClass: _vm._$s(8, "sc", "quick"),
              attrs: { _i: 8 },
              on: { click: _vm.goChat },
            },
            [_c("text"), _c("text")]
          ),
          _c(
            "view",
            {
              staticClass: _vm._$s(11, "sc", "quick"),
              attrs: { _i: 11 },
              on: { click: _vm.goOriginal },
            },
            [_c("text"), _c("text")]
          ),
          _c(
            "view",
            {
              staticClass: _vm._$s(14, "sc", "quick"),
              attrs: { _i: 14 },
              on: { click: _vm.goPlatform },
            },
            [_c("text"), _c("text")]
          ),
          _vm._$s(17, "i", _vm.isAdminUser)
            ? _c(
                "view",
                {
                  staticClass: _vm._$s(17, "sc", "quick"),
                  attrs: { _i: 17 },
                  on: { click: _vm.goAdmin },
                },
                [_c("text"), _c("text")]
              )
            : _vm._e(),
        ]
      ),
      _vm._$s(20, "i", !_vm.logged)
        ? _c(
            "view",
            { staticClass: _vm._$s(20, "sc", "card guest"), attrs: { _i: 20 } },
            [
              _c("text", {
                staticClass: _vm._$s(21, "sc", "title"),
                attrs: { _i: 21 },
              }),
              _c("text", {
                staticClass: _vm._$s(22, "sc", "muted"),
                attrs: { _i: 22 },
              }),
              _c("button", {
                staticClass: _vm._$s(23, "sc", "btn"),
                attrs: { _i: 23 },
                on: { click: _vm.goLogin },
              }),
            ]
          )
        : _vm._e(),
      _vm._$s(24, "i", _vm.error)
        ? _c(
            "view",
            { staticClass: _vm._$s(24, "sc", "card"), attrs: { _i: 24 } },
            [
              _c(
                "text",
                { staticClass: _vm._$s(25, "sc", "muted"), attrs: { _i: 25 } },
                [_vm._v(_vm._$s(25, "t0-0", _vm._s(_vm.error)))]
              ),
            ]
          )
        : _vm._e(),
      _vm._$s(26, "i", _vm.logged)
        ? _c(
            "view",
            { staticClass: _vm._$s(26, "sc", "card"), attrs: { _i: 26 } },
            [
              _c(
                "view",
                {
                  staticClass: _vm._$s(27, "sc", "between"),
                  attrs: { _i: 27 },
                },
                [
                  _c("text", {
                    staticClass: _vm._$s(28, "sc", "title"),
                    attrs: { _i: 28 },
                  }),
                  _c("button", {
                    staticClass: _vm._$s(29, "sc", "btn secondary small"),
                    attrs: { _i: 29 },
                    on: { click: _vm.rebuildProfile },
                  }),
                ]
              ),
              _c(
                "view",
                {
                  staticClass: _vm._$s(30, "sc", "stat-grid"),
                  attrs: { _i: 30 },
                },
                [
                  _c(
                    "view",
                    {
                      staticClass: _vm._$s(31, "sc", "stat-item"),
                      attrs: { _i: 31 },
                    },
                    [
                      _c(
                        "text",
                        {
                          staticClass: _vm._$s(32, "sc", "stat-num"),
                          attrs: { _i: 32 },
                        },
                        [
                          _vm._v(
                            _vm._$s(
                              32,
                              "t0-0",
                              _vm._s(_vm.statValue("total_reading_minutes"))
                            )
                          ),
                        ]
                      ),
                      _c("text", {
                        staticClass: _vm._$s(33, "sc", "muted"),
                        attrs: { _i: 33 },
                      }),
                    ]
                  ),
                  _c(
                    "view",
                    {
                      staticClass: _vm._$s(34, "sc", "stat-item"),
                      attrs: { _i: 34 },
                    },
                    [
                      _c(
                        "text",
                        {
                          staticClass: _vm._$s(35, "sc", "stat-num"),
                          attrs: { _i: 35 },
                        },
                        [
                          _vm._v(
                            _vm._$s(
                              35,
                              "t0-0",
                              _vm._s(_vm.statValue("completed_books"))
                            )
                          ),
                        ]
                      ),
                      _c("text", {
                        staticClass: _vm._$s(36, "sc", "muted"),
                        attrs: { _i: 36 },
                      }),
                    ]
                  ),
                  _c(
                    "view",
                    {
                      staticClass: _vm._$s(37, "sc", "stat-item"),
                      attrs: { _i: 37 },
                    },
                    [
                      _c(
                        "text",
                        {
                          staticClass: _vm._$s(38, "sc", "stat-num"),
                          attrs: { _i: 38 },
                        },
                        [
                          _vm._v(
                            _vm._$s(
                              38,
                              "t0-0",
                              _vm._s(_vm.statValue("reading_books"))
                            )
                          ),
                        ]
                      ),
                      _c("text", {
                        staticClass: _vm._$s(39, "sc", "muted"),
                        attrs: { _i: 39 },
                      }),
                    ]
                  ),
                  _c(
                    "view",
                    {
                      staticClass: _vm._$s(40, "sc", "stat-item"),
                      attrs: { _i: 40 },
                    },
                    [
                      _c(
                        "text",
                        {
                          staticClass: _vm._$s(41, "sc", "stat-num"),
                          attrs: { _i: 41 },
                        },
                        [
                          _vm._v(
                            _vm._$s(
                              41,
                              "t0-0",
                              _vm._s(_vm.statValue("shelf_count"))
                            )
                          ),
                        ]
                      ),
                      _c("text", {
                        staticClass: _vm._$s(42, "sc", "muted"),
                        attrs: { _i: 42 },
                      }),
                    ]
                  ),
                ]
              ),
            ]
          )
        : _vm._e(),
      _vm._$s(43, "i", _vm.logged)
        ? _c(
            "view",
            { staticClass: _vm._$s(43, "sc", "card"), attrs: { _i: 43 } },
            [
              _c("text", {
                staticClass: _vm._$s(44, "sc", "title"),
                attrs: { _i: 44 },
              }),
              _vm._$s(45, "i", _vm.tagBubbles.length)
                ? _c(
                    "view",
                    {
                      staticClass: _vm._$s(45, "sc", "bubble-box"),
                      attrs: { _i: 45 },
                    },
                    _vm._l(
                      _vm._$s(46, "f", { forItems: _vm.tagBubbles }),
                      function (t, idx, $20, $30) {
                        return _c(
                          "text",
                          {
                            key: _vm._$s(46, "f", {
                              forIndex: $20,
                              key: t.name,
                            }),
                            class: _vm._$s(
                              "46-" + $30,
                              "c",
                              idx === 0 ? "bubble primary" : "bubble"
                            ),
                            style: _vm._$s(
                              "46-" + $30,
                              "s",
                              _vm.bubbleStyle(t, idx)
                            ),
                            attrs: { _i: "46-" + $30 },
                          },
                          [_vm._v(_vm._$s("46-" + $30, "t0-0", _vm._s(t.name)))]
                        )
                      }
                    ),
                    0
                  )
                : _c("text", {
                    staticClass: _vm._$s(47, "sc", "muted"),
                    attrs: { _i: 47 },
                  }),
              _c(
                "view",
                {
                  staticClass: _vm._$s(48, "sc", "preference-block"),
                  attrs: { _i: 48 },
                },
                [
                  _c("text", {
                    staticClass: _vm._$s(49, "sc", "sub-title"),
                    attrs: { _i: 49 },
                  }),
                  _c(
                    "view",
                    {
                      staticClass: _vm._$s(50, "sc", "chips"),
                      attrs: { _i: 50 },
                    },
                    _vm._l(
                      _vm._$s(51, "f", { forItems: _vm.authors }),
                      function (a, $11, $21, $31) {
                        return _c(
                          "text",
                          {
                            key: _vm._$s(51, "f", {
                              forIndex: $21,
                              key: a.name || a,
                            }),
                            staticClass: _vm._$s("51-" + $31, "sc", "chip"),
                            attrs: { _i: "51-" + $31 },
                          },
                          [
                            _vm._v(
                              _vm._$s("51-" + $31, "t0-0", _vm._s(a.name || a))
                            ),
                          ]
                        )
                      }
                    ),
                    0
                  ),
                ]
              ),
              _c(
                "view",
                {
                  staticClass: _vm._$s(52, "sc", "preference-block"),
                  attrs: { _i: 52 },
                },
                [
                  _c("text", {
                    staticClass: _vm._$s(53, "sc", "sub-title"),
                    attrs: { _i: 53 },
                  }),
                  _c(
                    "view",
                    {
                      staticClass: _vm._$s(54, "sc", "chips"),
                      attrs: { _i: 54 },
                    },
                    _vm._l(
                      _vm._$s(55, "f", { forItems: _vm.categories }),
                      function (c, $12, $22, $32) {
                        return _c(
                          "text",
                          {
                            key: _vm._$s(55, "f", {
                              forIndex: $22,
                              key: c.name || c,
                            }),
                            staticClass: _vm._$s(
                              "55-" + $32,
                              "sc",
                              "chip active"
                            ),
                            attrs: { _i: "55-" + $32 },
                          },
                          [
                            _vm._v(
                              _vm._$s("55-" + $32, "t0-0", _vm._s(c.name || c))
                            ),
                          ]
                        )
                      }
                    ),
                    0
                  ),
                ]
              ),
            ]
          )
        : _vm._e(),
      _vm._$s(56, "i", _vm.logged)
        ? _c(
            "view",
            { staticClass: _vm._$s(56, "sc", "card"), attrs: { _i: 56 } },
            [
              _c("text", {
                staticClass: _vm._$s(57, "sc", "title"),
                attrs: { _i: 57 },
              }),
              _vm._l(
                _vm._$s(58, "f", { forItems: _vm.history }),
                function (item, $13, $23, $33) {
                  return _c(
                    "view",
                    {
                      key: _vm._$s(58, "f", {
                        forIndex: $23,
                        key: item.id || item.book_id,
                      }),
                      staticClass: _vm._$s("58-" + $33, "sc", "history"),
                      attrs: { _i: "58-" + $33 },
                      on: {
                        click: function ($event) {
                          return _vm.goDetail(item.book)
                        },
                      },
                    },
                    [
                      _c(
                        "view",
                        {
                          staticClass: _vm._$s(
                            "59-" + $33,
                            "sc",
                            "history-main"
                          ),
                          attrs: { _i: "59-" + $33 },
                        },
                        [
                          _c(
                            "text",
                            {
                              staticClass: _vm._$s(
                                "60-" + $33,
                                "sc",
                                "history-title"
                              ),
                              attrs: { _i: "60-" + $33 },
                            },
                            [
                              _vm._v(
                                _vm._$s(
                                  "60-" + $33,
                                  "t0-0",
                                  _vm._s(item.book && item.book.title)
                                )
                              ),
                            ]
                          ),
                          _c(
                            "text",
                            {
                              staticClass: _vm._$s("61-" + $33, "sc", "muted"),
                              attrs: { _i: "61-" + $33 },
                            },
                            [
                              _vm._v(
                                _vm._$s(
                                  "61-" + $33,
                                  "t0-0",
                                  _vm._s(item.current_page || 1)
                                ) +
                                  _vm._$s(
                                    "61-" + $33,
                                    "t0-1",
                                    _vm._s(item.progress_percent || 0)
                                  ) +
                                  _vm._$s(
                                    "61-" + $33,
                                    "t0-2",
                                    _vm._s(_vm.formatTime(item.read_at))
                                  )
                              ),
                            ]
                          ),
                        ]
                      ),
                      _c("button", {
                        staticClass: _vm._$s("62-" + $33, "sc", "btn small"),
                        attrs: { _i: "62-" + $33 },
                        on: {
                          click: function ($event) {
                            $event.stopPropagation()
                            return _vm.continueRead(item)
                          },
                        },
                      }),
                    ]
                  )
                }
              ),
              _vm._$s(63, "i", _vm.history.length === 0)
                ? _c("text", {
                    staticClass: _vm._$s(63, "sc", "muted"),
                    attrs: { _i: 63 },
                  })
                : _vm._e(),
            ],
            2
          )
        : _vm._e(),
    ]
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),
/* 42 */
/*!*******************************************************************************************************************!*\
  !*** E:/翻译漫画/book-main (14)/book-main/frontend-uni/pages/profile/profile.vue?vue&type=script&lang=js&mpType=page ***!
  \*******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_1_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_profile_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--7-1!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/using-components.js!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./profile.vue?vue&type=script&lang=js&mpType=page */ 43);\n/* harmony import */ var _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_1_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_profile_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_1_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_profile_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_1_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_profile_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__) if([\"default\"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_1_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_profile_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n /* harmony default export */ __webpack_exports__[\"default\"] = (_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_1_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_profile_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0___default.a); //# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbbnVsbF0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQWtxQixDQUFnQixnckJBQUcsRUFBQyIsImZpbGUiOiI0Mi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vSEJ1aWxkZXJYLjUuMDcuMjAyNjA0MTAwNi9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzIS4uLy4uLy4uLy4uLy4uL0hCdWlsZGVyWC41LjA3LjIwMjYwNDEwMDYvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy93ZWJwYWNrLXByZXByb2Nlc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTctMSEuLi8uLi8uLi8uLi8uLi9IQnVpbGRlclguNS4wNy4yMDI2MDQxMDA2L0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvd2VicGFjay11bmktYXBwLWxvYWRlci91c2luZy1jb21wb25lbnRzLmpzIS4uLy4uLy4uLy4uLy4uL0hCdWlsZGVyWC41LjA3LjIwMjYwNDEwMDYvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vcHJvZmlsZS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmbXBUeXBlPXBhZ2VcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi9IQnVpbGRlclguNS4wNy4yMDI2MDQxMDA2L0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanMhLi4vLi4vLi4vLi4vLi4vSEJ1aWxkZXJYLjUuMDcuMjAyNjA0MTAwNi9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vdnVlLWNsaS1wbHVnaW4tdW5pL3BhY2thZ2VzL3dlYnBhY2stcHJlcHJvY2Vzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tNy0xIS4uLy4uLy4uLy4uLy4uL0hCdWlsZGVyWC41LjA3LjIwMjYwNDEwMDYvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy93ZWJwYWNrLXVuaS1hcHAtbG9hZGVyL3VzaW5nLWNvbXBvbmVudHMuanMhLi4vLi4vLi4vLi4vLi4vSEJ1aWxkZXJYLjUuMDcuMjAyNjA0MTAwNi9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vdnVlLWNsaS1wbHVnaW4tdW5pL3BhY2thZ2VzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9wcm9maWxlLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZtcFR5cGU9cGFnZVwiIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///42\n");

/***/ }),
/* 43 */
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--7-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/using-components.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!E:/翻译漫画/book-main (14)/book-main/frontend-uni/pages/profile/profile.vue?vue&type=script&lang=js&mpType=page ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\nvar _request = __webpack_require__(/*! ../../api/request.js */ 17);\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\nvar _default = {\n  data: function data() {\n    return {\n      logged: false,\n      user: null,\n      stats: {},\n      profile: {},\n      history: [],\n      error: ''\n    };\n  },\n  computed: {\n    displayName: function displayName() {\n      return this.user ? this.user.nickname || this.user.username || '用户' : '游客';\n    },\n    avatarText: function avatarText() {\n      return this.displayName ? this.displayName.charAt(0).toUpperCase() : 'U';\n    },\n    isAdminUser: function isAdminUser() {\n      return (0, _request.isAdmin)();\n    },\n    tags: function tags() {\n      return this.profile && (this.profile.tag_preferences || this.profile.tags || []) || [];\n    },\n    authors: function authors() {\n      return this.profile && (this.profile.favorite_authors || this.profile.author_preferences || this.profile.authors || []) || [];\n    },\n    categories: function categories() {\n      return this.profile && (this.profile.favorite_categories || this.profile.categories || []) || [];\n    },\n    tagBubbles: function tagBubbles() {\n      return this.tags.slice(0, 12).map(function (x) {\n        if (typeof x === 'string') return {\n          name: x,\n          weight: 0.5\n        };\n        return {\n          name: x.name || x.label || String(x),\n          weight: Number(x.weight || x.score || 0.5)\n        };\n      });\n    }\n  },\n  onShow: function onShow() {\n    this.load();\n  },\n  onPullDownRefresh: function onPullDownRefresh() {\n    var that = this;\n    this.load(function () {\n      uni.stopPullDownRefresh();\n    });\n  },\n  methods: {\n    load: function load(done) {\n      var that = this;\n      that.logged = !!(0, _request.getToken)();\n      that.user = (0, _request.getUser)();\n      that.error = '';\n      if (!that.logged) {\n        that.stats = {};\n        that.profile = {};\n        that.history = [];\n        if (done) done();\n        return;\n      }\n      Promise.all([(0, _request.request)('/user/stats'), (0, _request.request)('/user/profile'), (0, _request.request)('/user/history')]).then(function (res) {\n        that.stats = res[0] || {};\n        that.profile = res[1] || {};\n        that.history = res[2] && res[2].items || [];\n      }).catch(function (e) {\n        that.error = e.message || '个人中心加载失败';\n      }).then(function () {\n        if (done) done();\n      });\n    },\n    bubbleStyle: function bubbleStyle(t, idx) {\n      var weight = Math.max(0.18, Math.min(1.4, Number(t.weight || 0.5)));\n      var size = Math.round(76 + weight * 76 + (idx === 0 ? 16 : 0));\n      var font = Math.max(22, Math.min(42, Math.round(size * (idx === 0 ? 0.27 : 0.24))));\n      return 'width:' + size + 'rpx;height:' + size + 'rpx;font-size:' + font + 'rpx;';\n    },\n    statValue: function statValue(key) {\n      return this.stats && this.stats[key] != null ? this.stats[key] : 0;\n    },\n    formatTime: function formatTime(v) {\n      return (0, _request.formatDate)(v);\n    },\n    goLogin: function goLogin() {\n      uni.navigateTo({\n        url: '/pages/login/login'\n      });\n    },\n    goChat: function goChat() {\n      uni.navigateTo({\n        url: '/pages/chat/chat'\n      });\n    },\n    goOriginal: function goOriginal() {\n      uni.navigateTo({\n        url: '/pages/original/original'\n      });\n    },\n    goPlatform: function goPlatform() {\n      uni.navigateTo({\n        url: '/pages/platform/platform'\n      });\n    },\n    goAdmin: function goAdmin() {\n      uni.navigateTo({\n        url: '/pages/admin/admin'\n      });\n    },\n    doLogout: function doLogout() {\n      (0, _request.logout)();\n      this.load();\n      uni.showToast({\n        title: '已退出',\n        icon: 'success'\n      });\n    },\n    rebuildProfile: function rebuildProfile() {\n      var that = this;\n      (0, _request.request)('/user/profile/rebuild', {\n        method: 'POST'\n      }).then(function () {\n        uni.showToast({\n          title: '画像已重建',\n          icon: 'success'\n        });\n        that.load();\n      }).catch(function (e) {\n        (0, _request.showError)(e, '重建失败');\n      });\n    },\n    goDetail: function goDetail(book) {\n      if (book) uni.navigateTo({\n        url: '/pages/detail/detail?id=' + (book.id || book.book_id)\n      });\n    },\n    continueRead: function continueRead(item) {\n      var b = item.book || {};\n      uni.navigateTo({\n        url: '/pages/reader/reader?id=' + (b.id || b.book_id)\n      });\n    }\n  }\n};\nexports.default = _default;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVuaS1hcHA6Ly8vcGFnZXMvcHJvZmlsZS9wcm9maWxlLnZ1ZSJdLCJuYW1lcyI6WyJkYXRhIiwibG9nZ2VkIiwidXNlciIsInN0YXRzIiwicHJvZmlsZSIsImhpc3RvcnkiLCJlcnJvciIsImNvbXB1dGVkIiwiZGlzcGxheU5hbWUiLCJhdmF0YXJUZXh0IiwiaXNBZG1pblVzZXIiLCJ0YWdzIiwiYXV0aG9ycyIsImNhdGVnb3JpZXMiLCJ0YWdCdWJibGVzIiwibmFtZSIsIndlaWdodCIsIm9uU2hvdyIsIm9uUHVsbERvd25SZWZyZXNoIiwidW5pIiwibWV0aG9kcyIsImxvYWQiLCJ0aGF0IiwiUHJvbWlzZSIsImJ1YmJsZVN0eWxlIiwic3RhdFZhbHVlIiwiZm9ybWF0VGltZSIsImdvTG9naW4iLCJ1cmwiLCJnb0NoYXQiLCJnb09yaWdpbmFsIiwiZ29QbGF0Zm9ybSIsImdvQWRtaW4iLCJkb0xvZ291dCIsInRpdGxlIiwiaWNvbiIsInJlYnVpbGRQcm9maWxlIiwibWV0aG9kIiwiZ29EZXRhaWwiLCJjb250aW51ZVJlYWQiXSwibWFwcGluZ3MiOiI7Ozs7OztBQW9FQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7ZUFDQTtFQUNBQTtJQUFBO01BQUFDO01BQUFDO01BQUFDO01BQUFDO01BQUFDO01BQUFDO0lBQUE7RUFBQTtFQUNBQztJQUNBQztNQUFBO0lBQUE7SUFDQUM7TUFBQTtJQUFBO0lBQ0FDO01BQUE7SUFBQTtJQUNBQztNQUFBO0lBQUE7SUFDQUM7TUFBQTtJQUFBO0lBQ0FDO01BQUE7SUFBQTtJQUNBQztNQUNBO1FBQ0E7VUFBQUM7VUFBQUM7UUFBQTtRQUNBO1VBQUFEO1VBQUFDO1FBQUE7TUFDQTtJQUNBO0VBQ0E7RUFDQUM7SUFBQTtFQUFBO0VBQ0FDO0lBQUE7SUFBQTtNQUFBQztJQUFBO0VBQUE7RUFDQUM7SUFDQUM7TUFDQTtNQUNBQztNQUFBQTtNQUFBQTtNQUNBO1FBQUFBO1FBQUFBO1FBQUFBO1FBQUE7UUFBQTtNQUFBO01BQ0FDO1FBQ0FEO1FBQ0FBO1FBQ0FBO01BQ0E7UUFBQUE7TUFBQTtRQUFBO01BQUE7SUFDQTtJQUNBRTtNQUNBO01BQ0E7TUFDQTtNQUNBO0lBQ0E7SUFDQUM7TUFBQTtJQUFBO0lBQ0FDO01BQUE7SUFBQTtJQUNBQztNQUFBUjtRQUFBUztNQUFBO0lBQUE7SUFDQUM7TUFBQVY7UUFBQVM7TUFBQTtJQUFBO0lBQ0FFO01BQUFYO1FBQUFTO01BQUE7SUFBQTtJQUNBRztNQUFBWjtRQUFBUztNQUFBO0lBQUE7SUFDQUk7TUFBQWI7UUFBQVM7TUFBQTtJQUFBO0lBQ0FLO01BQUE7TUFBQTtNQUFBZDtRQUFBZTtRQUFBQztNQUFBO0lBQUE7SUFDQUM7TUFBQTtNQUFBO1FBQUFDO01BQUE7UUFBQWxCO1VBQUFlO1VBQUFDO1FBQUE7UUFBQWI7TUFBQTtRQUFBO01BQUE7SUFBQTtJQUNBZ0I7TUFBQTtRQUFBVjtNQUFBO0lBQUE7SUFDQVc7TUFBQTtNQUFBcEI7UUFBQVM7TUFBQTtJQUFBO0VBQ0E7QUFDQTtBQUFBIiwiZmlsZSI6IjQzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiPHRlbXBsYXRlPlxuICA8dmlldyBjbGFzcz1cImNvbnRhaW5lciBwcm9maWxlLXBhZ2VcIj5cbiAgICA8dmlldyBjbGFzcz1cInVzZXItY2FyZCBjYXJkXCI+XG4gICAgICA8dGV4dCBjbGFzcz1cImF2YXRhclwiPnt7IGF2YXRhclRleHQgfX08L3RleHQ+XG4gICAgICA8dmlldyBjbGFzcz1cInVzZXItaW5mb1wiPlxuICAgICAgICA8dGV4dCBjbGFzcz1cInRpdGxlXCI+e3sgZGlzcGxheU5hbWUgfX08L3RleHQ+XG4gICAgICAgIDx0ZXh0IGNsYXNzPVwibXV0ZWRcIj57eyBsb2dnZWQgPyAodXNlci5pc19hZG1pbiA/ICfnrqHnkIblkZgnIDogJ+aZrumAmueUqOaItycpIDogJ+acqueZu+W9lScgfX08L3RleHQ+XG4gICAgICA8L3ZpZXc+XG4gICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIHNtYWxsXCIgQGNsaWNrPVwibG9nZ2VkID8gZG9Mb2dvdXQoKSA6IGdvTG9naW4oKVwiPnt7IGxvZ2dlZCA/ICfpgIDlh7onIDogJ+eZu+W9lScgfX08L2J1dHRvbj5cbiAgICA8L3ZpZXc+XG5cbiAgICA8dmlldyBjbGFzcz1cInF1aWNrLWdyaWRcIj5cbiAgICAgIDx2aWV3IGNsYXNzPVwicXVpY2tcIiBAY2xpY2s9XCJnb0NoYXRcIj48dGV4dD7wn6SWPC90ZXh0Pjx0ZXh0PkFJIOiNkOS5pjwvdGV4dD48L3ZpZXc+XG4gICAgICA8dmlldyBjbGFzcz1cInF1aWNrXCIgQGNsaWNrPVwiZ29PcmlnaW5hbFwiPjx0ZXh0PuKcje+4jzwvdGV4dD48dGV4dD7lsI/or7Tlt6XlnYo8L3RleHQ+PC92aWV3PlxuICAgICAgPHZpZXcgY2xhc3M9XCJxdWlja1wiIEBjbGljaz1cImdvUGxhdGZvcm1cIj48dGV4dD7wn5OhPC90ZXh0Pjx0ZXh0Pui/nuaOpeiviuaWrTwvdGV4dD48L3ZpZXc+XG4gICAgICA8dmlldyBjbGFzcz1cInF1aWNrXCIgdi1pZj1cImlzQWRtaW5Vc2VyXCIgQGNsaWNrPVwiZ29BZG1pblwiPjx0ZXh0PvCfm6DvuI88L3RleHQ+PHRleHQ+566h55CG5ZCO5Y+wPC90ZXh0Pjwvdmlldz5cbiAgICA8L3ZpZXc+XG5cbiAgICA8dmlldyB2LWlmPVwiIWxvZ2dlZFwiIGNsYXNzPVwiY2FyZCBndWVzdFwiPlxuICAgICAgPHRleHQgY2xhc3M9XCJ0aXRsZVwiPueZu+W9leWQjueUn+aIkOS4quS6uueUu+WDjzwvdGV4dD5cbiAgICAgIDx0ZXh0IGNsYXNzPVwibXV0ZWRcIj7ns7vnu5/kvJrmoLnmja7pmIXor7vljoblj7LjgIHkuabmnrbjgIHor4TliIbjgIHor4TorrrlkozmkJzntKLooYzkuLrnlJ/miJDlhbTotqPmoIfnrb7vvIzlubbnlKjkuo7mjqjojZDop6Pph4rjgII8L3RleHQ+XG4gICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuXCIgQGNsaWNrPVwiZ29Mb2dpblwiPueri+WNs+eZu+W9lTwvYnV0dG9uPlxuICAgIDwvdmlldz5cblxuICAgIDx2aWV3IHYtaWY9XCJlcnJvclwiIGNsYXNzPVwiY2FyZFwiPjx0ZXh0IGNsYXNzPVwibXV0ZWRcIj57eyBlcnJvciB9fTwvdGV4dD48L3ZpZXc+XG5cbiAgICA8dmlldyBjbGFzcz1cImNhcmRcIiB2LWlmPVwibG9nZ2VkXCI+XG4gICAgICA8dmlldyBjbGFzcz1cImJldHdlZW5cIj48dGV4dCBjbGFzcz1cInRpdGxlXCI+6ZiF6K+757uf6K6hPC90ZXh0PjxidXR0b24gY2xhc3M9XCJidG4gc2Vjb25kYXJ5IHNtYWxsXCIgQGNsaWNrPVwicmVidWlsZFByb2ZpbGVcIj7ph43lu7rnlLvlg488L2J1dHRvbj48L3ZpZXc+XG4gICAgICA8dmlldyBjbGFzcz1cInN0YXQtZ3JpZFwiPlxuICAgICAgICA8dmlldyBjbGFzcz1cInN0YXQtaXRlbVwiPjx0ZXh0IGNsYXNzPVwic3RhdC1udW1cIj57eyBzdGF0VmFsdWUoJ3RvdGFsX3JlYWRpbmdfbWludXRlcycpIH19PC90ZXh0Pjx0ZXh0IGNsYXNzPVwibXV0ZWRcIj7liIbpkp88L3RleHQ+PC92aWV3PlxuICAgICAgICA8dmlldyBjbGFzcz1cInN0YXQtaXRlbVwiPjx0ZXh0IGNsYXNzPVwic3RhdC1udW1cIj57eyBzdGF0VmFsdWUoJ2NvbXBsZXRlZF9ib29rcycpIH19PC90ZXh0Pjx0ZXh0IGNsYXNzPVwibXV0ZWRcIj7lt7Lor7s8L3RleHQ+PC92aWV3PlxuICAgICAgICA8dmlldyBjbGFzcz1cInN0YXQtaXRlbVwiPjx0ZXh0IGNsYXNzPVwic3RhdC1udW1cIj57eyBzdGF0VmFsdWUoJ3JlYWRpbmdfYm9va3MnKSB9fTwvdGV4dD48dGV4dCBjbGFzcz1cIm11dGVkXCI+5Zyo6K+7PC90ZXh0Pjwvdmlldz5cbiAgICAgICAgPHZpZXcgY2xhc3M9XCJzdGF0LWl0ZW1cIj48dGV4dCBjbGFzcz1cInN0YXQtbnVtXCI+e3sgc3RhdFZhbHVlKCdzaGVsZl9jb3VudCcpIH19PC90ZXh0Pjx0ZXh0IGNsYXNzPVwibXV0ZWRcIj7kuabmnrY8L3RleHQ+PC92aWV3PlxuICAgICAgPC92aWV3PlxuICAgIDwvdmlldz5cblxuICAgIDx2aWV3IGNsYXNzPVwiY2FyZFwiIHYtaWY9XCJsb2dnZWRcIj5cbiAgICAgIDx0ZXh0IGNsYXNzPVwidGl0bGVcIj7lhbTotqPnlLvlg488L3RleHQ+XG4gICAgICA8dmlldyBjbGFzcz1cImJ1YmJsZS1ib3hcIiB2LWlmPVwidGFnQnViYmxlcy5sZW5ndGhcIj5cbiAgICAgICAgPHRleHQgdi1mb3I9XCIodCxpZHgpIGluIHRhZ0J1YmJsZXNcIiA6a2V5PVwidC5uYW1lXCIgOmNsYXNzPVwiaWR4PT09MD8nYnViYmxlIHByaW1hcnknOididWJibGUnXCIgOnN0eWxlPVwiYnViYmxlU3R5bGUodCwgaWR4KVwiPnt7IHQubmFtZSB9fTwvdGV4dD5cbiAgICAgIDwvdmlldz5cbiAgICAgIDx0ZXh0IHYtZWxzZSBjbGFzcz1cIm11dGVkXCI+57un57ut6ZiF6K+744CB5pCc57Si5ZKM6K+E5YiG5ZCO5Lya55Sf5oiQ5YW06Laj5rCU5rOh44CCPC90ZXh0PlxuXG4gICAgICA8dmlldyBjbGFzcz1cInByZWZlcmVuY2UtYmxvY2tcIj5cbiAgICAgICAgPHRleHQgY2xhc3M9XCJzdWItdGl0bGVcIj7lgY/lpb3kvZzogIU8L3RleHQ+XG4gICAgICAgIDx2aWV3IGNsYXNzPVwiY2hpcHNcIj48dGV4dCB2LWZvcj1cImEgaW4gYXV0aG9yc1wiIDprZXk9XCJhLm5hbWUgfHwgYVwiIGNsYXNzPVwiY2hpcFwiPnt7IGEubmFtZSB8fCBhIH19PC90ZXh0Pjwvdmlldz5cbiAgICAgIDwvdmlldz5cbiAgICAgIDx2aWV3IGNsYXNzPVwicHJlZmVyZW5jZS1ibG9ja1wiPlxuICAgICAgICA8dGV4dCBjbGFzcz1cInN1Yi10aXRsZVwiPuWBj+WlveWIhuexuzwvdGV4dD5cbiAgICAgICAgPHZpZXcgY2xhc3M9XCJjaGlwc1wiPjx0ZXh0IHYtZm9yPVwiYyBpbiBjYXRlZ29yaWVzXCIgOmtleT1cImMubmFtZSB8fCBjXCIgY2xhc3M9XCJjaGlwIGFjdGl2ZVwiPnt7IGMubmFtZSB8fCBjIH19PC90ZXh0Pjwvdmlldz5cbiAgICAgIDwvdmlldz5cbiAgICA8L3ZpZXc+XG5cbiAgICA8dmlldyBjbGFzcz1cImNhcmRcIiB2LWlmPVwibG9nZ2VkXCI+XG4gICAgICA8dGV4dCBjbGFzcz1cInRpdGxlXCI+57un57ut6ZiF6K+7PC90ZXh0PlxuICAgICAgPHZpZXcgdi1mb3I9XCJpdGVtIGluIGhpc3RvcnlcIiA6a2V5PVwiaXRlbS5pZCB8fCBpdGVtLmJvb2tfaWRcIiBjbGFzcz1cImhpc3RvcnlcIiBAY2xpY2s9XCJnb0RldGFpbChpdGVtLmJvb2spXCI+XG4gICAgICAgIDx2aWV3IGNsYXNzPVwiaGlzdG9yeS1tYWluXCI+XG4gICAgICAgICAgPHRleHQgY2xhc3M9XCJoaXN0b3J5LXRpdGxlXCI+e3sgaXRlbS5ib29rICYmIGl0ZW0uYm9vay50aXRsZSB9fTwvdGV4dD5cbiAgICAgICAgICA8dGV4dCBjbGFzcz1cIm11dGVkXCI+56ysIHt7IGl0ZW0uY3VycmVudF9wYWdlIHx8IDEgfX0g6aG1IMK3IHt7IGl0ZW0ucHJvZ3Jlc3NfcGVyY2VudCB8fCAwIH19JSDCtyB7eyBmb3JtYXRUaW1lKGl0ZW0ucmVhZF9hdCkgfX08L3RleHQ+XG4gICAgICAgIDwvdmlldz5cbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBzbWFsbFwiIEBjbGljay5zdG9wPVwiY29udGludWVSZWFkKGl0ZW0pXCI+57un57utPC9idXR0b24+XG4gICAgICA8L3ZpZXc+XG4gICAgICA8dGV4dCB2LWlmPVwiaGlzdG9yeS5sZW5ndGggPT09IDBcIiBjbGFzcz1cIm11dGVkXCI+5pqC5peg6ZiF6K+75Y6G5Y+y44CCPC90ZXh0PlxuICAgIDwvdmlldz5cbiAgPC92aWV3PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmltcG9ydCB7IHJlcXVlc3QsIGdldFRva2VuLCBnZXRVc2VyLCBsb2dvdXQsIGlzQWRtaW4sIGZvcm1hdERhdGUsIHNob3dFcnJvciB9IGZyb20gJy4uLy4uL2FwaS9yZXF1ZXN0LmpzJ1xuZXhwb3J0IGRlZmF1bHQge1xuICBkYXRhOiBmdW5jdGlvbiAoKSB7IHJldHVybiB7IGxvZ2dlZDogZmFsc2UsIHVzZXI6IG51bGwsIHN0YXRzOiB7fSwgcHJvZmlsZToge30sIGhpc3Rvcnk6IFtdLCBlcnJvcjogJycgfSB9LFxuICBjb21wdXRlZDoge1xuICAgIGRpc3BsYXlOYW1lOiBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLnVzZXIgPyAodGhpcy51c2VyLm5pY2tuYW1lIHx8IHRoaXMudXNlci51c2VybmFtZSB8fCAn55So5oi3JykgOiAn5ri45a6iJyB9LFxuICAgIGF2YXRhclRleHQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMuZGlzcGxheU5hbWUgPyB0aGlzLmRpc3BsYXlOYW1lLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpIDogJ1UnIH0sXG4gICAgaXNBZG1pblVzZXI6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGlzQWRtaW4oKSB9LFxuICAgIHRhZ3M6IGZ1bmN0aW9uICgpIHsgcmV0dXJuICh0aGlzLnByb2ZpbGUgJiYgKHRoaXMucHJvZmlsZS50YWdfcHJlZmVyZW5jZXMgfHwgdGhpcy5wcm9maWxlLnRhZ3MgfHwgW10pKSB8fCBbXSB9LFxuICAgIGF1dGhvcnM6IGZ1bmN0aW9uICgpIHsgcmV0dXJuICh0aGlzLnByb2ZpbGUgJiYgKHRoaXMucHJvZmlsZS5mYXZvcml0ZV9hdXRob3JzIHx8IHRoaXMucHJvZmlsZS5hdXRob3JfcHJlZmVyZW5jZXMgfHwgdGhpcy5wcm9maWxlLmF1dGhvcnMgfHwgW10pKSB8fCBbXSB9LFxuICAgIGNhdGVnb3JpZXM6IGZ1bmN0aW9uICgpIHsgcmV0dXJuICh0aGlzLnByb2ZpbGUgJiYgKHRoaXMucHJvZmlsZS5mYXZvcml0ZV9jYXRlZ29yaWVzIHx8IHRoaXMucHJvZmlsZS5jYXRlZ29yaWVzIHx8IFtdKSkgfHwgW10gfSxcbiAgICB0YWdCdWJibGVzOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcy50YWdzLnNsaWNlKDAsIDEyKS5tYXAoZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB4ID09PSAnc3RyaW5nJykgcmV0dXJuIHsgbmFtZTogeCwgd2VpZ2h0OiAwLjUgfVxuICAgICAgICByZXR1cm4geyBuYW1lOiB4Lm5hbWUgfHwgeC5sYWJlbCB8fCBTdHJpbmcoeCksIHdlaWdodDogTnVtYmVyKHgud2VpZ2h0IHx8IHguc2NvcmUgfHwgMC41KSB9XG4gICAgICB9KVxuICAgIH1cbiAgfSxcbiAgb25TaG93OiBmdW5jdGlvbiAoKSB7IHRoaXMubG9hZCgpIH0sXG4gIG9uUHVsbERvd25SZWZyZXNoOiBmdW5jdGlvbiAoKSB7IGNvbnN0IHRoYXQgPSB0aGlzOyB0aGlzLmxvYWQoZnVuY3Rpb24gKCkgeyB1bmkuc3RvcFB1bGxEb3duUmVmcmVzaCgpIH0pIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBsb2FkOiBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgY29uc3QgdGhhdCA9IHRoaXNcbiAgICAgIHRoYXQubG9nZ2VkID0gISFnZXRUb2tlbigpOyB0aGF0LnVzZXIgPSBnZXRVc2VyKCk7IHRoYXQuZXJyb3IgPSAnJ1xuICAgICAgaWYgKCF0aGF0LmxvZ2dlZCkgeyB0aGF0LnN0YXRzID0ge307IHRoYXQucHJvZmlsZSA9IHt9OyB0aGF0Lmhpc3RvcnkgPSBbXTsgaWYgKGRvbmUpIGRvbmUoKTsgcmV0dXJuIH1cbiAgICAgIFByb21pc2UuYWxsKFtyZXF1ZXN0KCcvdXNlci9zdGF0cycpLCByZXF1ZXN0KCcvdXNlci9wcm9maWxlJyksIHJlcXVlc3QoJy91c2VyL2hpc3RvcnknKV0pLnRoZW4oZnVuY3Rpb24gKHJlcykge1xuICAgICAgICB0aGF0LnN0YXRzID0gcmVzWzBdIHx8IHt9XG4gICAgICAgIHRoYXQucHJvZmlsZSA9IHJlc1sxXSB8fCB7fVxuICAgICAgICB0aGF0Lmhpc3RvcnkgPSAocmVzWzJdICYmIHJlc1syXS5pdGVtcykgfHwgW11cbiAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlKSB7IHRoYXQuZXJyb3IgPSBlLm1lc3NhZ2UgfHwgJ+S4quS6uuS4reW/g+WKoOi9veWksei0pScgfSkudGhlbihmdW5jdGlvbiAoKSB7IGlmIChkb25lKSBkb25lKCkgfSlcbiAgICB9LFxuICAgIGJ1YmJsZVN0eWxlOiBmdW5jdGlvbiAodCwgaWR4KSB7XG4gICAgICBjb25zdCB3ZWlnaHQgPSBNYXRoLm1heCgwLjE4LCBNYXRoLm1pbigxLjQsIE51bWJlcih0LndlaWdodCB8fCAwLjUpKSlcbiAgICAgIGNvbnN0IHNpemUgPSBNYXRoLnJvdW5kKDc2ICsgd2VpZ2h0ICogNzYgKyAoaWR4ID09PSAwID8gMTYgOiAwKSlcbiAgICAgIGNvbnN0IGZvbnQgPSBNYXRoLm1heCgyMiwgTWF0aC5taW4oNDIsIE1hdGgucm91bmQoc2l6ZSAqIChpZHggPT09IDAgPyAwLjI3IDogMC4yNCkpKSlcbiAgICAgIHJldHVybiAnd2lkdGg6JyArIHNpemUgKyAncnB4O2hlaWdodDonICsgc2l6ZSArICdycHg7Zm9udC1zaXplOicgKyBmb250ICsgJ3JweDsnXG4gICAgfSxcbiAgICBzdGF0VmFsdWU6IGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuIHRoaXMuc3RhdHMgJiYgdGhpcy5zdGF0c1trZXldICE9IG51bGwgPyB0aGlzLnN0YXRzW2tleV0gOiAwIH0sXG4gICAgZm9ybWF0VGltZTogZnVuY3Rpb24gKHYpIHsgcmV0dXJuIGZvcm1hdERhdGUodikgfSxcbiAgICBnb0xvZ2luOiBmdW5jdGlvbiAoKSB7IHVuaS5uYXZpZ2F0ZVRvKHsgdXJsOiAnL3BhZ2VzL2xvZ2luL2xvZ2luJyB9KSB9LFxuICAgIGdvQ2hhdDogZnVuY3Rpb24gKCkgeyB1bmkubmF2aWdhdGVUbyh7IHVybDogJy9wYWdlcy9jaGF0L2NoYXQnIH0pIH0sXG4gICAgZ29PcmlnaW5hbDogZnVuY3Rpb24gKCkgeyB1bmkubmF2aWdhdGVUbyh7IHVybDogJy9wYWdlcy9vcmlnaW5hbC9vcmlnaW5hbCcgfSkgfSxcbiAgICBnb1BsYXRmb3JtOiBmdW5jdGlvbiAoKSB7IHVuaS5uYXZpZ2F0ZVRvKHsgdXJsOiAnL3BhZ2VzL3BsYXRmb3JtL3BsYXRmb3JtJyB9KSB9LFxuICAgIGdvQWRtaW46IGZ1bmN0aW9uICgpIHsgdW5pLm5hdmlnYXRlVG8oeyB1cmw6ICcvcGFnZXMvYWRtaW4vYWRtaW4nIH0pIH0sXG4gICAgZG9Mb2dvdXQ6IGZ1bmN0aW9uICgpIHsgbG9nb3V0KCk7IHRoaXMubG9hZCgpOyB1bmkuc2hvd1RvYXN0KHsgdGl0bGU6ICflt7LpgIDlh7onLCBpY29uOiAnc3VjY2VzcycgfSkgfSxcbiAgICByZWJ1aWxkUHJvZmlsZTogZnVuY3Rpb24gKCkgeyBjb25zdCB0aGF0ID0gdGhpczsgcmVxdWVzdCgnL3VzZXIvcHJvZmlsZS9yZWJ1aWxkJywgeyBtZXRob2Q6ICdQT1NUJyB9KS50aGVuKGZ1bmN0aW9uICgpIHsgdW5pLnNob3dUb2FzdCh7IHRpdGxlOiAn55S75YOP5bey6YeN5bu6JywgaWNvbjogJ3N1Y2Nlc3MnIH0pOyB0aGF0LmxvYWQoKSB9KS5jYXRjaChmdW5jdGlvbiAoZSkgeyBzaG93RXJyb3IoZSwgJ+mHjeW7uuWksei0pScpIH0pIH0sXG4gICAgZ29EZXRhaWw6IGZ1bmN0aW9uIChib29rKSB7IGlmIChib29rKSB1bmkubmF2aWdhdGVUbyh7IHVybDogJy9wYWdlcy9kZXRhaWwvZGV0YWlsP2lkPScgKyAoYm9vay5pZCB8fCBib29rLmJvb2tfaWQpIH0pIH0sXG4gICAgY29udGludWVSZWFkOiBmdW5jdGlvbiAoaXRlbSkgeyBjb25zdCBiID0gaXRlbS5ib29rIHx8IHt9OyB1bmkubmF2aWdhdGVUbyh7IHVybDogJy9wYWdlcy9yZWFkZXIvcmVhZGVyP2lkPScgKyAoYi5pZCB8fCBiLmJvb2tfaWQpIH0pIH1cbiAgfVxufVxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG4ucHJvZmlsZS1wYWdle3BhZGRpbmctYm90dG9tOmNhbGMoMzJycHggKyBlbnYoc2FmZS1hcmVhLWluc2V0LWJvdHRvbSkpfS51c2VyLWNhcmR7ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcjtnYXA6MThycHh9LmF2YXRhcnt3aWR0aDo5NnJweDtoZWlnaHQ6OTZycHg7bGluZS1oZWlnaHQ6OTZycHg7dGV4dC1hbGlnbjpjZW50ZXI7Ym9yZGVyLXJhZGl1czoyOHJweDtiYWNrZ3JvdW5kOmxpbmVhci1ncmFkaWVudCgxMzVkZWcsIzdjM2FlZCwjMGVhNWU5KTtjb2xvcjojZmZmO2ZvbnQtc2l6ZTozOHJweDtmb250LXdlaWdodDo5MDB9LnVzZXItaW5mb3tmbGV4OjF9LnF1aWNrLWdyaWR7ZGlzcGxheTpmbGV4O2ZsZXgtd3JhcDp3cmFwO2dhcDoxMnJweDttYXJnaW4tYm90dG9tOjIycnB4fS5xdWlja3t3aWR0aDpjYWxjKDI1JSAtIDlycHgpO2Rpc3BsYXk6ZmxleDtmbGV4LWRpcmVjdGlvbjpjb2x1bW47YWxpZ24taXRlbXM6Y2VudGVyO2p1c3RpZnktY29udGVudDpjZW50ZXI7Z2FwOjhycHg7YmFja2dyb3VuZDojZmZmO2JvcmRlci1yYWRpdXM6MjJycHg7cGFkZGluZzoxOHJweCA4cnB4O2JveC1zaGFkb3c6MCAxMHJweCAyOHJweCByZ2JhKDE1LDIzLDQyLC4wNyl9LnF1aWNrIHRleHQ6Zmlyc3QtY2hpbGR7Zm9udC1zaXplOjM0cnB4fS5xdWljayB0ZXh0Omxhc3QtY2hpbGR7Zm9udC1zaXplOjIwcnB4O2NvbG9yOiMzMzQxNTU7Zm9udC13ZWlnaHQ6OTAwfS5ndWVzdCAuYnRue21hcmdpbi10b3A6MjJycHh9LmJ1YmJsZS1ib3h7bWluLWhlaWdodDoyNjBycHg7cGFkZGluZzoyNHJweDtib3JkZXItcmFkaXVzOjI4cnB4O2JvcmRlcjoxcnB4IHNvbGlkICNlOWQ1ZmY7YmFja2dyb3VuZDpsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCNmZmZmZmYsI2VmZjZmZik7ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcjthbGlnbi1jb250ZW50OmNlbnRlcjtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO2dhcDoxNnJweDtmbGV4LXdyYXA6d3JhcH0uYnViYmxle2JvcmRlci1yYWRpdXM6OTk5OXJweDtiYWNrZ3JvdW5kOmxpbmVhci1ncmFkaWVudCgxMzVkZWcscmdiYSgxMjQsNTgsMjM3LC4xOCkscmdiYSgxNCwxNjUsMjMzLC4xOCkpO2JvcmRlcjoxcnB4IHNvbGlkIHJnYmEoMTI0LDU4LDIzNywuMTYpO2JveC1zaGFkb3c6MCAxMnJweCAzMHJweCByZ2JhKDEyNCw1OCwyMzcsLjEyKTtkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyO2p1c3RpZnktY29udGVudDpjZW50ZXI7dGV4dC1hbGlnbjpjZW50ZXI7Y29sb3I6IzExMTgyNztmb250LXdlaWdodDo5MDA7bGluZS1oZWlnaHQ6MS4xNTtwYWRkaW5nOjAgMTBycHg7b3ZlcmZsb3c6aGlkZGVufS5idWJibGUucHJpbWFyeXtiYWNrZ3JvdW5kOmxpbmVhci1ncmFkaWVudCgxMzVkZWcscmdiYSgxMjQsNTgsMjM3LC4yOCkscmdiYSgxNCwxNjUsMjMzLC4yMikpfS5wcmVmZXJlbmNlLWJsb2Nre21hcmdpbi10b3A6MjJycHh9Lmhpc3Rvcnl7ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcjtnYXA6MTRycHg7cGFkZGluZzoxOHJweCAwO2JvcmRlci1ib3R0b206MXJweCBzb2xpZCAjZWVmMmY3fS5oaXN0b3J5LW1haW57ZmxleDoxfS5oaXN0b3J5LXRpdGxle2Rpc3BsYXk6YmxvY2s7Y29sb3I6IzExMTgyNztmb250LXNpemU6MjhycHg7Zm9udC13ZWlnaHQ6OTAwO21hcmdpbi1ib3R0b206NnJweH1AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOjM4MHB4KXsucXVpY2t7d2lkdGg6Y2FsYyg1MCUgLSA2cnB4KX19XG48L3N0eWxlPlxuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///43\n");

/***/ }),
/* 44 */
/*!*****************************************************************************************!*\
  !*** E:/翻译漫画/book-main (14)/book-main/frontend-uni/pages/detail/detail.vue?mpType=page ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _detail_vue_vue_type_template_id_1262b4f6_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./detail.vue?vue&type=template&id=1262b4f6&scoped=true&mpType=page */ 45);\n/* harmony import */ var _detail_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./detail.vue?vue&type=script&lang=js&mpType=page */ 47);\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _detail_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__) if([\"default\"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _detail_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n/* harmony import */ var _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 18);\n\nvar renderjs\n\n\n\n\n/* normalize component */\n\nvar component = Object(_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\n  _detail_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _detail_vue_vue_type_template_id_1262b4f6_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _detail_vue_vue_type_template_id_1262b4f6_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  \"1262b4f6\",\n  null,\n  false,\n  _detail_vue_vue_type_template_id_1262b4f6_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__[\"components\"],\n  renderjs\n)\n\ncomponent.options.__file = \"pages/detail/detail.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbbnVsbF0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBMEk7QUFDMUk7QUFDcUU7QUFDTDs7O0FBR2hFO0FBQ2dNO0FBQ2hNLGdCQUFnQix1TUFBVTtBQUMxQixFQUFFLHVGQUFNO0FBQ1IsRUFBRSx3R0FBTTtBQUNSLEVBQUUsaUhBQWU7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUUsNEdBQVU7QUFDWjtBQUNBOztBQUVBO0FBQ2UsZ0YiLCJmaWxlIjoiNDQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucywgcmVjeWNsYWJsZVJlbmRlciwgY29tcG9uZW50cyB9IGZyb20gXCIuL2RldGFpbC52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9MTI2MmI0ZjYmc2NvcGVkPXRydWUmbXBUeXBlPXBhZ2VcIlxudmFyIHJlbmRlcmpzXG5pbXBvcnQgc2NyaXB0IGZyb20gXCIuL2RldGFpbC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmbXBUeXBlPXBhZ2VcIlxuZXhwb3J0ICogZnJvbSBcIi4vZGV0YWlsLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZtcFR5cGU9cGFnZVwiXG5cblxuLyogbm9ybWFsaXplIGNvbXBvbmVudCAqL1xuaW1wb3J0IG5vcm1hbGl6ZXIgZnJvbSBcIiEuLi8uLi8uLi8uLi8uLi9IQnVpbGRlclguNS4wNy4yMDI2MDQxMDA2L0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvdnVlLWxvYWRlci9saWIvcnVudGltZS9jb21wb25lbnROb3JtYWxpemVyLmpzXCJcbnZhciBjb21wb25lbnQgPSBub3JtYWxpemVyKFxuICBzY3JpcHQsXG4gIHJlbmRlcixcbiAgc3RhdGljUmVuZGVyRm5zLFxuICBmYWxzZSxcbiAgbnVsbCxcbiAgXCIxMjYyYjRmNlwiLFxuICBudWxsLFxuICBmYWxzZSxcbiAgY29tcG9uZW50cyxcbiAgcmVuZGVyanNcbilcblxuY29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJwYWdlcy9kZXRhaWwvZGV0YWlsLnZ1ZVwiXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///44\n");

/***/ }),
/* 45 */
/*!***********************************************************************************************************************************!*\
  !*** E:/翻译漫画/book-main (14)/book-main/frontend-uni/pages/detail/detail.vue?vue&type=template&id=1262b4f6&scoped=true&mpType=page ***!
  \***********************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_0_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_detail_vue_vue_type_template_id_1262b4f6_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--11-0!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/filter-modules-template.js!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./detail.vue?vue&type=template&id=1262b4f6&scoped=true&mpType=page */ 46);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_0_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_detail_vue_vue_type_template_id_1262b4f6_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_0_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_detail_vue_vue_type_template_id_1262b4f6_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_0_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_detail_vue_vue_type_template_id_1262b4f6_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_0_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_detail_vue_vue_type_template_id_1262b4f6_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),
/* 46 */
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--11-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/filter-modules-template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!E:/翻译漫画/book-main (14)/book-main/frontend-uni/pages/detail/detail.vue?vue&type=template&id=1262b4f6&scoped=true&mpType=page ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "view",
    { staticClass: _vm._$s(0, "sc", "container"), attrs: { _i: 0 } },
    [
      _vm._$s(1, "i", _vm.loading)
        ? _c(
            "view",
            { staticClass: _vm._$s(1, "sc", "card"), attrs: { _i: 1 } },
            [
              _c("text", {
                staticClass: _vm._$s(2, "sc", "muted"),
                attrs: { _i: 2 },
              }),
            ]
          )
        : _vm._$s(3, "e", _vm.error)
        ? _c(
            "view",
            { staticClass: _vm._$s(3, "sc", "card"), attrs: { _i: 3 } },
            [
              _c(
                "text",
                { staticClass: _vm._$s(4, "sc", "muted"), attrs: { _i: 4 } },
                [_vm._v(_vm._$s(4, "t0-0", _vm._s(_vm.error)))]
              ),
            ]
          )
        : _c("view", { attrs: { _i: 5 } }, [
            _c(
              "view",
              { staticClass: _vm._$s(6, "sc", "card top"), attrs: { _i: 6 } },
              [
                _c("image", {
                  staticClass: _vm._$s(7, "sc", "cover"),
                  attrs: {
                    src: _vm._$s(7, "a-src", _vm.book.cover_url),
                    _i: 7,
                  },
                }),
                _c(
                  "view",
                  { staticClass: _vm._$s(8, "sc", "info"), attrs: { _i: 8 } },
                  [
                    _c(
                      "text",
                      {
                        staticClass: _vm._$s(9, "sc", "book-title"),
                        attrs: { _i: 9 },
                      },
                      [_vm._v(_vm._$s(9, "t0-0", _vm._s(_vm.book.title)))]
                    ),
                    _c(
                      "text",
                      {
                        staticClass: _vm._$s(10, "sc", "muted"),
                        attrs: { _i: 10 },
                      },
                      [
                        _vm._v(
                          _vm._$s(
                            10,
                            "t0-0",
                            _vm._s(_vm.book.author || "未知作者")
                          )
                        ),
                      ]
                    ),
                    _c(
                      "text",
                      {
                        staticClass: _vm._$s(11, "sc", "muted"),
                        attrs: { _i: 11 },
                      },
                      [
                        _vm._v(
                          _vm._$s(
                            11,
                            "t0-0",
                            _vm._s(_vm.book.publisher || "未知出版社")
                          ) +
                            _vm._$s(
                              11,
                              "t0-1",
                              _vm._s(_vm.book.page_count || "-")
                            )
                        ),
                      ]
                    ),
                    _c(
                      "text",
                      {
                        staticClass: _vm._$s(12, "sc", "rating"),
                        attrs: { _i: 12 },
                      },
                      [
                        _vm._v(
                          _vm._$s(
                            12,
                            "t0-0",
                            _vm._s(_vm.book.avg_rating || 0)
                          ) +
                            _vm._$s(
                              12,
                              "t0-1",
                              _vm._s(_vm.book.rating_count || 0)
                            )
                        ),
                      ]
                    ),
                    _c(
                      "view",
                      {
                        staticClass: _vm._$s(13, "sc", "chips"),
                        attrs: { _i: 13 },
                      },
                      _vm._l(
                        _vm._$s(14, "f", { forItems: _vm.book.tags }),
                        function (t, $10, $20, $30) {
                          return _c(
                            "text",
                            {
                              key: _vm._$s(14, "f", { forIndex: $20, key: t }),
                              staticClass: _vm._$s("14-" + $30, "sc", "chip"),
                              attrs: { _i: "14-" + $30 },
                            },
                            [_vm._v(_vm._$s("14-" + $30, "t0-0", _vm._s(t)))]
                          )
                        }
                      ),
                      0
                    ),
                  ]
                ),
              ]
            ),
            _c(
              "view",
              { staticClass: _vm._$s(15, "sc", "actions"), attrs: { _i: 15 } },
              [
                _c("button", {
                  staticClass: _vm._$s(16, "sc", "btn"),
                  attrs: { _i: 16 },
                  on: { click: _vm.openReader },
                }),
                _c("button", {
                  staticClass: _vm._$s(17, "sc", "btn secondary"),
                  attrs: { _i: 17 },
                  on: {
                    click: function ($event) {
                      return _vm.addShelf("想读")
                    },
                  },
                }),
                _c("button", {
                  staticClass: _vm._$s(18, "sc", "btn secondary"),
                  attrs: { _i: 18 },
                  on: {
                    click: function ($event) {
                      return _vm.addShelf("在读")
                    },
                  },
                }),
              ]
            ),
            _c(
              "view",
              { staticClass: _vm._$s(19, "sc", "card"), attrs: { _i: 19 } },
              [
                _c("text", {
                  staticClass: _vm._$s(20, "sc", "title"),
                  attrs: { _i: 20 },
                }),
                _c(
                  "text",
                  { staticClass: _vm._$s(21, "sc", "desc"), attrs: { _i: 21 } },
                  [
                    _vm._v(
                      _vm._$s(
                        21,
                        "t0-0",
                        _vm._s(_vm.book.description || "暂无简介")
                      )
                    ),
                  ]
                ),
              ]
            ),
            _vm._$s(22, "i", _vm.purchase.length || _vm.channels.length)
              ? _c(
                  "view",
                  { staticClass: _vm._$s(22, "sc", "card"), attrs: { _i: 22 } },
                  [
                    _c("text", {
                      staticClass: _vm._$s(23, "sc", "title"),
                      attrs: { _i: 23 },
                    }),
                    _vm._l(
                      _vm._$s(24, "f", { forItems: _vm.purchase }),
                      function (p, $11, $21, $31) {
                        return _c(
                          "view",
                          {
                            key: _vm._$s(24, "f", {
                              forIndex: $21,
                              key: "p" + p.id,
                            }),
                            staticClass: _vm._$s("24-" + $31, "sc", "purchase"),
                            attrs: { _i: "24-" + $31 },
                            on: {
                              click: function ($event) {
                                return _vm.openPurchase(p)
                              },
                            },
                          },
                          [
                            _c(
                              "text",
                              {
                                staticClass: _vm._$s(
                                  "25-" + $31,
                                  "sc",
                                  "purchase-name"
                                ),
                                attrs: { _i: "25-" + $31 },
                              },
                              [
                                _vm._v(
                                  _vm._$s(
                                    "25-" + $31,
                                    "t0-0",
                                    _vm._s(p.platform)
                                  )
                                ),
                              ]
                            ),
                            _c(
                              "text",
                              {
                                staticClass: _vm._$s(
                                  "26-" + $31,
                                  "sc",
                                  "muted"
                                ),
                                attrs: { _i: "26-" + $31 },
                              },
                              [
                                _vm._v(
                                  _vm._$s(
                                    "26-" + $31,
                                    "t0-0",
                                    _vm._s(p.price ? "￥" + p.price : "查看")
                                  )
                                ),
                              ]
                            ),
                          ]
                        )
                      }
                    ),
                    _vm._l(
                      _vm._$s(27, "f", { forItems: _vm.channels }),
                      function (c, $12, $22, $32) {
                        return _c(
                          "view",
                          {
                            key: _vm._$s(27, "f", {
                              forIndex: $22,
                              key: c.platform,
                            }),
                            staticClass: _vm._$s("27-" + $32, "sc", "purchase"),
                            attrs: { _i: "27-" + $32 },
                            on: {
                              click: function ($event) {
                                return _vm.openChannel(c)
                              },
                            },
                          },
                          [
                            _c(
                              "text",
                              {
                                staticClass: _vm._$s(
                                  "28-" + $32,
                                  "sc",
                                  "purchase-name"
                                ),
                                attrs: { _i: "28-" + $32 },
                              },
                              [
                                _vm._v(
                                  _vm._$s(
                                    "28-" + $32,
                                    "t0-0",
                                    _vm._s(c.platform)
                                  )
                                ),
                              ]
                            ),
                            _c("text", {
                              staticClass: _vm._$s("29-" + $32, "sc", "muted"),
                              attrs: { _i: "29-" + $32 },
                            }),
                          ]
                        )
                      }
                    ),
                  ],
                  2
                )
              : _vm._e(),
            _c(
              "view",
              { staticClass: _vm._$s(30, "sc", "card"), attrs: { _i: 30 } },
              [
                _c("text", {
                  staticClass: _vm._$s(31, "sc", "title"),
                  attrs: { _i: 31 },
                }),
                _c(
                  "view",
                  {
                    staticClass: _vm._$s(32, "sc", "chips"),
                    attrs: { _i: 32 },
                  },
                  _vm._l(
                    _vm._$s(33, "f", { forItems: [1, 2, 3, 4, 5] }),
                    function (n, $13, $23, $33) {
                      return _c(
                        "text",
                        {
                          key: _vm._$s(33, "f", { forIndex: $23, key: n }),
                          class: _vm._$s(
                            "33-" + $33,
                            "c",
                            _vm.rating === n ? "chip active" : "chip"
                          ),
                          attrs: { _i: "33-" + $33 },
                          on: {
                            click: function ($event) {
                              _vm.rating = n
                            },
                          },
                        },
                        [_vm._v(_vm._$s("33-" + $33, "t0-0", _vm._s(n)))]
                      )
                    }
                  ),
                  0
                ),
                _c("textarea", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.commentText,
                      expression: "commentText",
                    },
                  ],
                  staticClass: _vm._$s(34, "sc", "textarea"),
                  attrs: { _i: 34 },
                  domProps: { value: _vm._$s(34, "v-model", _vm.commentText) },
                  on: {
                    input: function ($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.commentText = $event.target.value
                    },
                  },
                }),
                _c("button", {
                  staticClass: _vm._$s(35, "sc", "btn"),
                  attrs: { _i: 35 },
                  on: { click: _vm.submitComment },
                }),
              ]
            ),
            _c(
              "view",
              { staticClass: _vm._$s(36, "sc", "card"), attrs: { _i: 36 } },
              [
                _c(
                  "text",
                  {
                    staticClass: _vm._$s(37, "sc", "title"),
                    attrs: { _i: 37 },
                  },
                  [_vm._v(_vm._$s(37, "t0-0", _vm._s(_vm.summary.total || 0)))]
                ),
                _vm._l(
                  _vm._$s(38, "f", { forItems: _vm.comments }),
                  function (c, $14, $24, $34) {
                    return _c(
                      "view",
                      {
                        key: _vm._$s(38, "f", { forIndex: $24, key: c.id }),
                        staticClass: _vm._$s("38-" + $34, "sc", "comment"),
                        attrs: { _i: "38-" + $34 },
                      },
                      [
                        _c(
                          "view",
                          {
                            staticClass: _vm._$s("39-" + $34, "sc", "between"),
                            attrs: { _i: "39-" + $34 },
                          },
                          [
                            _c(
                              "text",
                              {
                                staticClass: _vm._$s(
                                  "40-" + $34,
                                  "sc",
                                  "comment-user"
                                ),
                                attrs: { _i: "40-" + $34 },
                              },
                              [
                                _vm._v(
                                  _vm._$s(
                                    "40-" + $34,
                                    "t0-0",
                                    _vm._s(c.nickname || c.username || "读者")
                                  )
                                ),
                              ]
                            ),
                            _c(
                              "text",
                              {
                                staticClass: _vm._$s(
                                  "41-" + $34,
                                  "sc",
                                  "muted"
                                ),
                                attrs: { _i: "41-" + $34 },
                              },
                              [
                                _vm._v(
                                  _vm._$s(
                                    "41-" + $34,
                                    "t0-0",
                                    _vm._s(c.rating || "-")
                                  )
                                ),
                              ]
                            ),
                          ]
                        ),
                        _c(
                          "text",
                          {
                            staticClass: _vm._$s(
                              "42-" + $34,
                              "sc",
                              "comment-text"
                            ),
                            attrs: { _i: "42-" + $34 },
                          },
                          [
                            _vm._v(
                              _vm._$s("42-" + $34, "t0-0", _vm._s(c.content))
                            ),
                          ]
                        ),
                        _c(
                          "view",
                          {
                            staticClass: _vm._$s("43-" + $34, "sc", "between"),
                            attrs: { _i: "43-" + $34 },
                          },
                          [
                            _c(
                              "text",
                              {
                                staticClass: _vm._$s(
                                  "44-" + $34,
                                  "sc",
                                  "muted"
                                ),
                                attrs: { _i: "44-" + $34 },
                              },
                              [
                                _vm._v(
                                  _vm._$s(
                                    "44-" + $34,
                                    "t0-0",
                                    _vm._s(c.created_at)
                                  )
                                ),
                              ]
                            ),
                            _c(
                              "text",
                              {
                                staticClass: _vm._$s("45-" + $34, "sc", "like"),
                                attrs: { _i: "45-" + $34 },
                                on: {
                                  click: function ($event) {
                                    return _vm.like(c)
                                  },
                                },
                              },
                              [
                                _vm._v(
                                  _vm._$s(
                                    "45-" + $34,
                                    "t0-0",
                                    _vm._s(c.likes_count || 0)
                                  )
                                ),
                              ]
                            ),
                          ]
                        ),
                      ]
                    )
                  }
                ),
                _vm._$s(46, "i", !_vm.comments.length)
                  ? _c("text", {
                      staticClass: _vm._$s(46, "sc", "muted"),
                      attrs: { _i: 46 },
                    })
                  : _vm._e(),
              ],
              2
            ),
            _c(
              "view",
              { staticClass: _vm._$s(47, "sc", "card"), attrs: { _i: 47 } },
              [
                _c("text", {
                  staticClass: _vm._$s(48, "sc", "title"),
                  attrs: { _i: 48 },
                }),
                _vm._l(
                  _vm._$s(49, "f", { forItems: _vm.similar }),
                  function (item, $15, $25, $35) {
                    return _c("BookCard", {
                      key: _vm._$s(49, "f", { forIndex: $25, key: item.id }),
                      attrs: { book: item, _i: "49-" + $35 },
                      on: { click: _vm.goDetail },
                    })
                  }
                ),
              ],
              2
            ),
          ]),
    ]
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),
/* 47 */
/*!*****************************************************************************************************************!*\
  !*** E:/翻译漫画/book-main (14)/book-main/frontend-uni/pages/detail/detail.vue?vue&type=script&lang=js&mpType=page ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_1_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_detail_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--7-1!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/using-components.js!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./detail.vue?vue&type=script&lang=js&mpType=page */ 48);\n/* harmony import */ var _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_1_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_detail_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_1_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_detail_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_1_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_detail_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__) if([\"default\"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_1_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_detail_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n /* harmony default export */ __webpack_exports__[\"default\"] = (_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_1_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_detail_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0___default.a); //# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbbnVsbF0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQWlxQixDQUFnQiwrcUJBQUcsRUFBQyIsImZpbGUiOiI0Ny5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vSEJ1aWxkZXJYLjUuMDcuMjAyNjA0MTAwNi9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzIS4uLy4uLy4uLy4uLy4uL0hCdWlsZGVyWC41LjA3LjIwMjYwNDEwMDYvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy93ZWJwYWNrLXByZXByb2Nlc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTctMSEuLi8uLi8uLi8uLi8uLi9IQnVpbGRlclguNS4wNy4yMDI2MDQxMDA2L0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvd2VicGFjay11bmktYXBwLWxvYWRlci91c2luZy1jb21wb25lbnRzLmpzIS4uLy4uLy4uLy4uLy4uL0hCdWlsZGVyWC41LjA3LjIwMjYwNDEwMDYvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vZGV0YWlsLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZtcFR5cGU9cGFnZVwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uL0hCdWlsZGVyWC41LjA3LjIwMjYwNDEwMDYvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcyEuLi8uLi8uLi8uLi8uLi9IQnVpbGRlclguNS4wNy4yMDI2MDQxMDA2L0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvd2VicGFjay1wcmVwcm9jZXNzLWxvYWRlci9pbmRleC5qcz8/cmVmLS03LTEhLi4vLi4vLi4vLi4vLi4vSEJ1aWxkZXJYLjUuMDcuMjAyNjA0MTAwNi9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vdnVlLWNsaS1wbHVnaW4tdW5pL3BhY2thZ2VzL3dlYnBhY2stdW5pLWFwcC1sb2FkZXIvdXNpbmctY29tcG9uZW50cy5qcyEuLi8uLi8uLi8uLi8uLi9IQnVpbGRlclguNS4wNy4yMDI2MDQxMDA2L0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL2RldGFpbC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmbXBUeXBlPXBhZ2VcIiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///47\n");

/***/ }),
/* 48 */
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--7-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/using-components.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!E:/翻译漫画/book-main (14)/book-main/frontend-uni/pages/detail/detail.vue?vue&type=script&lang=js&mpType=page ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 1);\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\nvar _BookCard = _interopRequireDefault(__webpack_require__(/*! ../../components/BookCard.vue */ 12));\nvar _request = __webpack_require__(/*! ../../api/request.js */ 17);\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\nvar _default = {\n  components: {\n    BookCard: _BookCard.default\n  },\n  data: function data() {\n    return {\n      id: '',\n      loading: false,\n      error: '',\n      book: {\n        tags: []\n      },\n      similar: [],\n      comments: [],\n      summary: {},\n      purchase: [],\n      channels: [],\n      rating: 5,\n      commentText: ''\n    };\n  },\n  onLoad: function onLoad(query) {\n    this.id = query.id || query.book_id || '';\n    this.load();\n  },\n  methods: {\n    load: function load() {\n      var that = this;\n      if (!that.id) {\n        that.error = '缺少图书ID';\n        return;\n      }\n      that.loading = true;\n      that.error = '';\n      Promise.all([(0, _request.request)('/books/' + that.id), (0, _request.request)('/recommend/similar/' + that.id + '?limit=8'), (0, _request.request)('/ecosystem/comments/' + that.id), (0, _request.request)('/ecosystem/purchase-links/' + that.id)]).then(function (res) {\n        that.book = (0, _request.normalizeBook)(res[0]);\n        that.similar = (0, _request.normalizeBooks)(res[1] && res[1].items || []);\n        that.comments = res[2] && res[2].items || [];\n        that.summary = res[2] && res[2].summary || {};\n        that.purchase = res[3] && res[3].links || [];\n        that.channels = res[3] && res[3].channels || that.book.purchase_channels || [];\n      }).catch(function (e) {\n        that.error = e.message || '详情加载失败';\n      }).then(function () {\n        that.loading = false;\n      });\n    },\n    openReader: function openReader() {\n      uni.navigateTo({\n        url: '/pages/reader/reader?id=' + this.id\n      });\n    },\n    addShelf: function addShelf(name) {\n      if (!(0, _request.requireLogin)()) return;\n      var status = name === '在读' ? 'reading' : name === '已读' ? 'read' : 'want_to_read';\n      (0, _request.request)('/ecosystem/shelves/book/' + this.id, {\n        method: 'POST',\n        data: {\n          shelf_name: name,\n          reading_status: status\n        }\n      }).then(function () {\n        uni.showToast({\n          title: '已加入' + name,\n          icon: 'success'\n        });\n      }).catch(function (e) {\n        (0, _request.showError)(e, '加入失败');\n      });\n    },\n    submitComment: function submitComment() {\n      var that = this;\n      if (!(0, _request.requireLogin)()) return;\n      if (!that.commentText) {\n        uni.showToast({\n          title: '请先输入评论',\n          icon: 'none'\n        });\n        return;\n      }\n      (0, _request.request)('/ecosystem/comments/' + that.id, {\n        method: 'POST',\n        data: {\n          content: that.commentText,\n          rating: that.rating\n        }\n      }).then(function () {\n        that.commentText = '';\n        uni.showToast({\n          title: '已发布',\n          icon: 'success'\n        });\n        that.load();\n      }).catch(function (e) {\n        (0, _request.showError)(e, '发布失败');\n      });\n    },\n    like: function like(c) {\n      if (!(0, _request.requireLogin)()) return;\n      var that = this;\n      (0, _request.request)('/ecosystem/comments/' + c.id + '/like', {\n        method: 'POST'\n      }).then(function () {\n        that.load();\n      }).catch(function (e) {\n        (0, _request.showError)(e, '点赞失败');\n      });\n    },\n    openPurchase: function openPurchase(p) {\n      (0, _request.request)('/ecosystem/purchase-click/' + this.id + '?channel=' + encodeURIComponent(p.platform), {\n        method: 'POST'\n      }).catch(function () {});\n      this.openUrl(p.url);\n    },\n    openChannel: function openChannel(c) {\n      this.openUrl(c.url);\n    },\n    openUrl: function openUrl(url) {\n      if (!url) return;\n      uni.showModal({\n        title: '购书链接',\n        content: url,\n        showCancel: false\n      });\n    },\n    goDetail: function goDetail(book) {\n      uni.navigateTo({\n        url: '/pages/detail/detail?id=' + (book.id || book.book_id)\n      });\n    }\n  }\n};\nexports.default = _default;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVuaS1hcHA6Ly8vcGFnZXMvZGV0YWlsL2RldGFpbC52dWUiXSwibmFtZXMiOlsiY29tcG9uZW50cyIsIkJvb2tDYXJkIiwiZGF0YSIsImlkIiwibG9hZGluZyIsImVycm9yIiwiYm9vayIsInRhZ3MiLCJzaW1pbGFyIiwiY29tbWVudHMiLCJzdW1tYXJ5IiwicHVyY2hhc2UiLCJjaGFubmVscyIsInJhdGluZyIsImNvbW1lbnRUZXh0Iiwib25Mb2FkIiwibWV0aG9kcyIsImxvYWQiLCJ0aGF0IiwiUHJvbWlzZSIsIm9wZW5SZWFkZXIiLCJ1bmkiLCJ1cmwiLCJhZGRTaGVsZiIsIm1ldGhvZCIsInNoZWxmX25hbWUiLCJyZWFkaW5nX3N0YXR1cyIsInRpdGxlIiwiaWNvbiIsInN1Ym1pdENvbW1lbnQiLCJjb250ZW50IiwibGlrZSIsIm9wZW5QdXJjaGFzZSIsIm9wZW5DaGFubmVsIiwib3BlblVybCIsInNob3dDYW5jZWwiLCJnb0RldGFpbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQWlFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztlQUNBO0VBQ0FBO0lBQUFDO0VBQUE7RUFDQUM7SUFBQTtNQUFBQztNQUFBQztNQUFBQztNQUFBQztRQUFBQztNQUFBO01BQUFDO01BQUFDO01BQUFDO01BQUFDO01BQUFDO01BQUFDO01BQUFDO0lBQUE7RUFBQTtFQUNBQztJQUFBO0lBQUE7RUFBQTtFQUNBQztJQUNBQztNQUNBO01BQ0E7UUFBQUM7UUFBQTtNQUFBO01BQ0FBO01BQUFBO01BQ0FDLGFBQ0EsNENBQ0EscUVBQ0EseURBQ0EsOERBQ0E7UUFDQUQ7UUFDQUE7UUFDQUE7UUFDQUE7UUFDQUE7UUFDQUE7TUFDQTtRQUFBQTtNQUFBO1FBQUFBO01BQUE7SUFDQTtJQUNBRTtNQUFBQztRQUFBQztNQUFBO0lBQUE7SUFDQUM7TUFDQTtNQUNBO01BQ0E7UUFBQUM7UUFBQXRCO1VBQUF1QjtVQUFBQztRQUFBO01BQUE7UUFBQUw7VUFBQU07VUFBQUM7UUFBQTtNQUFBO1FBQUE7TUFBQTtJQUNBO0lBQ0FDO01BQ0E7TUFDQTtNQUNBO1FBQUFSO1VBQUFNO1VBQUFDO1FBQUE7UUFBQTtNQUFBO01BQ0E7UUFBQUo7UUFBQXRCO1VBQUE0QjtVQUFBakI7UUFBQTtNQUFBO1FBQ0FLO1FBQ0FHO1VBQUFNO1VBQUFDO1FBQUE7UUFDQVY7TUFDQTtRQUFBO01BQUE7SUFDQTtJQUNBYTtNQUNBO01BQ0E7TUFDQTtRQUFBUDtNQUFBO1FBQUFOO01BQUE7UUFBQTtNQUFBO0lBQ0E7SUFDQWM7TUFDQTtRQUFBUjtNQUFBO01BQ0E7SUFDQTtJQUNBUztNQUFBO0lBQUE7SUFDQUM7TUFDQTtNQUtBYjtRQUFBTTtRQUFBRztRQUFBSztNQUFBO0lBRUE7SUFDQUM7TUFBQWY7UUFBQUM7TUFBQTtJQUFBO0VBQ0E7QUFDQTtBQUFBIiwiZmlsZSI6IjQ4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiPHRlbXBsYXRlPlxuICA8dmlldyBjbGFzcz1cImNvbnRhaW5lclwiPlxuICAgIDx2aWV3IHYtaWY9XCJsb2FkaW5nXCIgY2xhc3M9XCJjYXJkXCI+PHRleHQgY2xhc3M9XCJtdXRlZFwiPuato+WcqOWKoOi9veivpuaDhS4uLjwvdGV4dD48L3ZpZXc+XG4gICAgPHZpZXcgdi1lbHNlLWlmPVwiZXJyb3JcIiBjbGFzcz1cImNhcmRcIj48dGV4dCBjbGFzcz1cIm11dGVkXCI+e3sgZXJyb3IgfX08L3RleHQ+PC92aWV3PlxuICAgIDx2aWV3IHYtZWxzZT5cbiAgICAgIDx2aWV3IGNsYXNzPVwiY2FyZCB0b3BcIj5cbiAgICAgICAgPGltYWdlIGNsYXNzPVwiY292ZXJcIiA6c3JjPVwiYm9vay5jb3Zlcl91cmxcIiBtb2RlPVwiYXNwZWN0RmlsbFwiPjwvaW1hZ2U+XG4gICAgICAgIDx2aWV3IGNsYXNzPVwiaW5mb1wiPlxuICAgICAgICAgIDx0ZXh0IGNsYXNzPVwiYm9vay10aXRsZVwiPnt7IGJvb2sudGl0bGUgfX08L3RleHQ+XG4gICAgICAgICAgPHRleHQgY2xhc3M9XCJtdXRlZFwiPnt7IGJvb2suYXV0aG9yIHx8ICfmnKrnn6XkvZzogIUnIH19PC90ZXh0PlxuICAgICAgICAgIDx0ZXh0IGNsYXNzPVwibXV0ZWRcIj57eyBib29rLnB1Ymxpc2hlciB8fCAn5pyq55+l5Ye654mI56S+JyB9fSDCtyB7eyBib29rLnBhZ2VfY291bnQgfHwgJy0nIH19IOmhtTwvdGV4dD5cbiAgICAgICAgICA8dGV4dCBjbGFzcz1cInJhdGluZ1wiPuKtkCB7eyBib29rLmF2Z19yYXRpbmcgfHwgMCB9fSDCtyB7eyBib29rLnJhdGluZ19jb3VudCB8fCAwIH19IOS6uuivhOWIhjwvdGV4dD5cbiAgICAgICAgICA8dmlldyBjbGFzcz1cImNoaXBzXCI+PHRleHQgdi1mb3I9XCJ0IGluIGJvb2sudGFnc1wiIDprZXk9XCJ0XCIgY2xhc3M9XCJjaGlwXCI+e3sgdCB9fTwvdGV4dD48L3ZpZXc+XG4gICAgICAgIDwvdmlldz5cbiAgICAgIDwvdmlldz5cblxuICAgICAgPHZpZXcgY2xhc3M9XCJhY3Rpb25zXCI+XG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJidG5cIiBAY2xpY2s9XCJvcGVuUmVhZGVyXCI+5Zyo57q/6K+V6K+7PC9idXR0b24+XG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gc2Vjb25kYXJ5XCIgQGNsaWNrPVwiYWRkU2hlbGYoJ+aDs+ivuycpXCI+5oOz6K+7PC9idXR0b24+XG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gc2Vjb25kYXJ5XCIgQGNsaWNrPVwiYWRkU2hlbGYoJ+WcqOivuycpXCI+5Zyo6K+7PC9idXR0b24+XG4gICAgICA8L3ZpZXc+XG5cbiAgICAgIDx2aWV3IGNsYXNzPVwiY2FyZFwiPlxuICAgICAgICA8dGV4dCBjbGFzcz1cInRpdGxlXCI+5YaF5a65566A5LuLPC90ZXh0PlxuICAgICAgICA8dGV4dCBjbGFzcz1cImRlc2NcIj57eyBib29rLmRlc2NyaXB0aW9uIHx8ICfmmoLml6DnroDku4snIH19PC90ZXh0PlxuICAgICAgPC92aWV3PlxuXG4gICAgICA8dmlldyBjbGFzcz1cImNhcmRcIiB2LWlmPVwicHVyY2hhc2UubGVuZ3RoIHx8IGNoYW5uZWxzLmxlbmd0aFwiPlxuICAgICAgICA8dGV4dCBjbGFzcz1cInRpdGxlXCI+6LSt5Lmm5YWl5Y+jPC90ZXh0PlxuICAgICAgICA8dmlldyBjbGFzcz1cInB1cmNoYXNlXCIgdi1mb3I9XCJwIGluIHB1cmNoYXNlXCIgOmtleT1cIidwJytwLmlkXCIgQGNsaWNrPVwib3BlblB1cmNoYXNlKHApXCI+XG4gICAgICAgICAgPHRleHQgY2xhc3M9XCJwdXJjaGFzZS1uYW1lXCI+e3sgcC5wbGF0Zm9ybSB9fTwvdGV4dD5cbiAgICAgICAgICA8dGV4dCBjbGFzcz1cIm11dGVkXCI+e3sgcC5wcmljZSA/ICfvv6UnICsgcC5wcmljZSA6ICfmn6XnnIsnIH19PC90ZXh0PlxuICAgICAgICA8L3ZpZXc+XG4gICAgICAgIDx2aWV3IGNsYXNzPVwicHVyY2hhc2VcIiB2LWZvcj1cImMgaW4gY2hhbm5lbHNcIiA6a2V5PVwiYy5wbGF0Zm9ybVwiIEBjbGljaz1cIm9wZW5DaGFubmVsKGMpXCI+XG4gICAgICAgICAgPHRleHQgY2xhc3M9XCJwdXJjaGFzZS1uYW1lXCI+e3sgYy5wbGF0Zm9ybSB9fTwvdGV4dD5cbiAgICAgICAgICA8dGV4dCBjbGFzcz1cIm11dGVkXCI+5pCc57Si6LSt5LmmPC90ZXh0PlxuICAgICAgICA8L3ZpZXc+XG4gICAgICA8L3ZpZXc+XG5cbiAgICAgIDx2aWV3IGNsYXNzPVwiY2FyZFwiPlxuICAgICAgICA8dGV4dCBjbGFzcz1cInRpdGxlXCI+5oiR55qE6K+E5YiGIC8g6K+E6K66PC90ZXh0PlxuICAgICAgICA8dmlldyBjbGFzcz1cImNoaXBzXCI+PHRleHQgdi1mb3I9XCJuIGluIFsxLDIsMyw0LDVdXCIgOmtleT1cIm5cIiA6Y2xhc3M9XCJyYXRpbmc9PT1uPydjaGlwIGFjdGl2ZSc6J2NoaXAnXCIgQGNsaWNrPVwicmF0aW5nPW5cIj57eyBuIH19IOaYnzwvdGV4dD48L3ZpZXc+XG4gICAgICAgIDx0ZXh0YXJlYSBjbGFzcz1cInRleHRhcmVhXCIgdi1tb2RlbD1cImNvbW1lbnRUZXh0XCIgcGxhY2Vob2xkZXI9XCLlhpnkuIvkvaDnmoTkuabor4RcIj48L3RleHRhcmVhPlxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuXCIgQGNsaWNrPVwic3VibWl0Q29tbWVudFwiPuWPkeW4g+ivhOiuujwvYnV0dG9uPlxuICAgICAgPC92aWV3PlxuXG4gICAgICA8dmlldyBjbGFzcz1cImNhcmRcIj5cbiAgICAgICAgPHRleHQgY2xhc3M9XCJ0aXRsZVwiPuS5puWPi+ivhOiuuiB7eyBzdW1tYXJ5LnRvdGFsIHx8IDAgfX08L3RleHQ+XG4gICAgICAgIDx2aWV3IHYtZm9yPVwiYyBpbiBjb21tZW50c1wiIDprZXk9XCJjLmlkXCIgY2xhc3M9XCJjb21tZW50XCI+XG4gICAgICAgICAgPHZpZXcgY2xhc3M9XCJiZXR3ZWVuXCI+PHRleHQgY2xhc3M9XCJjb21tZW50LXVzZXJcIj57eyBjLm5pY2tuYW1lIHx8IGMudXNlcm5hbWUgfHwgJ+ivu+iAhScgfX08L3RleHQ+PHRleHQgY2xhc3M9XCJtdXRlZFwiPuKtkCB7eyBjLnJhdGluZyB8fCAnLScgfX08L3RleHQ+PC92aWV3PlxuICAgICAgICAgIDx0ZXh0IGNsYXNzPVwiY29tbWVudC10ZXh0XCI+e3sgYy5jb250ZW50IH19PC90ZXh0PlxuICAgICAgICAgIDx2aWV3IGNsYXNzPVwiYmV0d2VlblwiPjx0ZXh0IGNsYXNzPVwibXV0ZWRcIj57eyBjLmNyZWF0ZWRfYXQgfX08L3RleHQ+PHRleHQgY2xhc3M9XCJsaWtlXCIgQGNsaWNrPVwibGlrZShjKVwiPui1niB7eyBjLmxpa2VzX2NvdW50IHx8IDAgfX08L3RleHQ+PC92aWV3PlxuICAgICAgICA8L3ZpZXc+XG4gICAgICAgIDx0ZXh0IHYtaWY9XCIhY29tbWVudHMubGVuZ3RoXCIgY2xhc3M9XCJtdXRlZFwiPuaaguaXoOivhOiuuu+8jOadpeWGmeesrOS4gOadoeWQp+OAgjwvdGV4dD5cbiAgICAgIDwvdmlldz5cblxuICAgICAgPHZpZXcgY2xhc3M9XCJjYXJkXCI+XG4gICAgICAgIDx0ZXh0IGNsYXNzPVwidGl0bGVcIj7nm7jkvLzmjqjojZA8L3RleHQ+XG4gICAgICAgIDxCb29rQ2FyZCB2LWZvcj1cIml0ZW0gaW4gc2ltaWxhclwiIDprZXk9XCJpdGVtLmlkXCIgOmJvb2s9XCJpdGVtXCIgQGNsaWNrPVwiZ29EZXRhaWxcIj48L0Jvb2tDYXJkPlxuICAgICAgPC92aWV3PlxuICAgIDwvdmlldz5cbiAgPC92aWV3PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmltcG9ydCBCb29rQ2FyZCBmcm9tICcuLi8uLi9jb21wb25lbnRzL0Jvb2tDYXJkLnZ1ZSdcbmltcG9ydCB7IHJlcXVlc3QsIG5vcm1hbGl6ZUJvb2ssIG5vcm1hbGl6ZUJvb2tzLCByZXF1aXJlTG9naW4sIHNob3dFcnJvciB9IGZyb20gJy4uLy4uL2FwaS9yZXF1ZXN0LmpzJ1xuZXhwb3J0IGRlZmF1bHQge1xuICBjb21wb25lbnRzOiB7IEJvb2tDYXJkOiBCb29rQ2FyZCB9LFxuICBkYXRhOiBmdW5jdGlvbiAoKSB7IHJldHVybiB7IGlkOiAnJywgbG9hZGluZzogZmFsc2UsIGVycm9yOiAnJywgYm9vazogeyB0YWdzOiBbXSB9LCBzaW1pbGFyOiBbXSwgY29tbWVudHM6IFtdLCBzdW1tYXJ5OiB7fSwgcHVyY2hhc2U6IFtdLCBjaGFubmVsczogW10sIHJhdGluZzogNSwgY29tbWVudFRleHQ6ICcnIH0gfSxcbiAgb25Mb2FkOiBmdW5jdGlvbiAocXVlcnkpIHsgdGhpcy5pZCA9IHF1ZXJ5LmlkIHx8IHF1ZXJ5LmJvb2tfaWQgfHwgJyc7IHRoaXMubG9hZCgpIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBsb2FkOiBmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zdCB0aGF0ID0gdGhpc1xuICAgICAgaWYgKCF0aGF0LmlkKSB7IHRoYXQuZXJyb3IgPSAn57y65bCR5Zu+5LmmSUQnOyByZXR1cm4gfVxuICAgICAgdGhhdC5sb2FkaW5nID0gdHJ1ZTsgdGhhdC5lcnJvciA9ICcnXG4gICAgICBQcm9taXNlLmFsbChbXG4gICAgICAgIHJlcXVlc3QoJy9ib29rcy8nICsgdGhhdC5pZCksXG4gICAgICAgIHJlcXVlc3QoJy9yZWNvbW1lbmQvc2ltaWxhci8nICsgdGhhdC5pZCArICc/bGltaXQ9OCcpLFxuICAgICAgICByZXF1ZXN0KCcvZWNvc3lzdGVtL2NvbW1lbnRzLycgKyB0aGF0LmlkKSxcbiAgICAgICAgcmVxdWVzdCgnL2Vjb3N5c3RlbS9wdXJjaGFzZS1saW5rcy8nICsgdGhhdC5pZClcbiAgICAgIF0pLnRoZW4oZnVuY3Rpb24gKHJlcykge1xuICAgICAgICB0aGF0LmJvb2sgPSBub3JtYWxpemVCb29rKHJlc1swXSlcbiAgICAgICAgdGhhdC5zaW1pbGFyID0gbm9ybWFsaXplQm9va3MoKHJlc1sxXSAmJiByZXNbMV0uaXRlbXMpIHx8IFtdKVxuICAgICAgICB0aGF0LmNvbW1lbnRzID0gKHJlc1syXSAmJiByZXNbMl0uaXRlbXMpIHx8IFtdXG4gICAgICAgIHRoYXQuc3VtbWFyeSA9IChyZXNbMl0gJiYgcmVzWzJdLnN1bW1hcnkpIHx8IHt9XG4gICAgICAgIHRoYXQucHVyY2hhc2UgPSAocmVzWzNdICYmIHJlc1szXS5saW5rcykgfHwgW11cbiAgICAgICAgdGhhdC5jaGFubmVscyA9IChyZXNbM10gJiYgcmVzWzNdLmNoYW5uZWxzKSB8fCB0aGF0LmJvb2sucHVyY2hhc2VfY2hhbm5lbHMgfHwgW11cbiAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlKSB7IHRoYXQuZXJyb3IgPSBlLm1lc3NhZ2UgfHwgJ+ivpuaDheWKoOi9veWksei0pScgfSkudGhlbihmdW5jdGlvbiAoKSB7IHRoYXQubG9hZGluZyA9IGZhbHNlIH0pXG4gICAgfSxcbiAgICBvcGVuUmVhZGVyOiBmdW5jdGlvbiAoKSB7IHVuaS5uYXZpZ2F0ZVRvKHsgdXJsOiAnL3BhZ2VzL3JlYWRlci9yZWFkZXI/aWQ9JyArIHRoaXMuaWQgfSkgfSxcbiAgICBhZGRTaGVsZjogZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgIGlmICghcmVxdWlyZUxvZ2luKCkpIHJldHVyblxuICAgICAgY29uc3Qgc3RhdHVzID0gbmFtZSA9PT0gJ+WcqOivuycgPyAncmVhZGluZycgOiAobmFtZSA9PT0gJ+W3suivuycgPyAncmVhZCcgOiAnd2FudF90b19yZWFkJylcbiAgICAgIHJlcXVlc3QoJy9lY29zeXN0ZW0vc2hlbHZlcy9ib29rLycgKyB0aGlzLmlkLCB7IG1ldGhvZDogJ1BPU1QnLCBkYXRhOiB7IHNoZWxmX25hbWU6IG5hbWUsIHJlYWRpbmdfc3RhdHVzOiBzdGF0dXMgfSB9KS50aGVuKGZ1bmN0aW9uICgpIHsgdW5pLnNob3dUb2FzdCh7IHRpdGxlOiAn5bey5Yqg5YWlJyArIG5hbWUsIGljb246ICdzdWNjZXNzJyB9KSB9KS5jYXRjaChmdW5jdGlvbiAoZSkgeyBzaG93RXJyb3IoZSwgJ+WKoOWFpeWksei0pScpIH0pXG4gICAgfSxcbiAgICBzdWJtaXRDb21tZW50OiBmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zdCB0aGF0ID0gdGhpc1xuICAgICAgaWYgKCFyZXF1aXJlTG9naW4oKSkgcmV0dXJuXG4gICAgICBpZiAoIXRoYXQuY29tbWVudFRleHQpIHsgdW5pLnNob3dUb2FzdCh7IHRpdGxlOiAn6K+35YWI6L6T5YWl6K+E6K66JywgaWNvbjogJ25vbmUnIH0pOyByZXR1cm4gfVxuICAgICAgcmVxdWVzdCgnL2Vjb3N5c3RlbS9jb21tZW50cy8nICsgdGhhdC5pZCwgeyBtZXRob2Q6ICdQT1NUJywgZGF0YTogeyBjb250ZW50OiB0aGF0LmNvbW1lbnRUZXh0LCByYXRpbmc6IHRoYXQucmF0aW5nIH0gfSkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoYXQuY29tbWVudFRleHQgPSAnJ1xuICAgICAgICB1bmkuc2hvd1RvYXN0KHsgdGl0bGU6ICflt7Llj5HluIMnLCBpY29uOiAnc3VjY2VzcycgfSlcbiAgICAgICAgdGhhdC5sb2FkKClcbiAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlKSB7IHNob3dFcnJvcihlLCAn5Y+R5biD5aSx6LSlJykgfSlcbiAgICB9LFxuICAgIGxpa2U6IGZ1bmN0aW9uIChjKSB7XG4gICAgICBpZiAoIXJlcXVpcmVMb2dpbigpKSByZXR1cm5cbiAgICAgIGNvbnN0IHRoYXQgPSB0aGlzXG4gICAgICByZXF1ZXN0KCcvZWNvc3lzdGVtL2NvbW1lbnRzLycgKyBjLmlkICsgJy9saWtlJywgeyBtZXRob2Q6ICdQT1NUJyB9KS50aGVuKGZ1bmN0aW9uICgpIHsgdGhhdC5sb2FkKCkgfSkuY2F0Y2goZnVuY3Rpb24gKGUpIHsgc2hvd0Vycm9yKGUsICfngrnotZ7lpLHotKUnKSB9KVxuICAgIH0sXG4gICAgb3BlblB1cmNoYXNlOiBmdW5jdGlvbiAocCkge1xuICAgICAgcmVxdWVzdCgnL2Vjb3N5c3RlbS9wdXJjaGFzZS1jbGljay8nICsgdGhpcy5pZCArICc/Y2hhbm5lbD0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHAucGxhdGZvcm0pLCB7IG1ldGhvZDogJ1BPU1QnIH0pLmNhdGNoKGZ1bmN0aW9uICgpIHt9KVxuICAgICAgdGhpcy5vcGVuVXJsKHAudXJsKVxuICAgIH0sXG4gICAgb3BlbkNoYW5uZWw6IGZ1bmN0aW9uIChjKSB7IHRoaXMub3BlblVybChjLnVybCkgfSxcbiAgICBvcGVuVXJsOiBmdW5jdGlvbiAodXJsKSB7XG4gICAgICBpZiAoIXVybCkgcmV0dXJuXG4gICAgICAvLyAjaWZkZWYgSDVcbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gdXJsXG4gICAgICAvLyAjZW5kaWZcbiAgICAgIC8vICNpZm5kZWYgSDVcbiAgICAgIHVuaS5zaG93TW9kYWwoeyB0aXRsZTogJ+i0reS5pumTvuaOpScsIGNvbnRlbnQ6IHVybCwgc2hvd0NhbmNlbDogZmFsc2UgfSlcbiAgICAgIC8vICNlbmRpZlxuICAgIH0sXG4gICAgZ29EZXRhaWw6IGZ1bmN0aW9uIChib29rKSB7IHVuaS5uYXZpZ2F0ZVRvKHsgdXJsOiAnL3BhZ2VzL2RldGFpbC9kZXRhaWw/aWQ9JyArIChib29rLmlkIHx8IGJvb2suYm9va19pZCkgfSkgfVxuICB9XG59XG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cbi50b3B7ZGlzcGxheTpmbGV4O2dhcDoyMnJweDthbGlnbi1pdGVtczpmbGV4LXN0YXJ0O2JhY2tncm91bmQ6bGluZWFyLWdyYWRpZW50KDEzNWRlZywjZmZmLCNlZmY2ZmYpfS5jb3Zlcnt3aWR0aDoxOTBycHg7aGVpZ2h0OjI3MHJweDtib3JkZXItcmFkaXVzOjI0cnB4O2JhY2tncm91bmQ6I2U1ZTdlYjtib3gtc2hhZG93OjAgMTRycHggMzRycHggcmdiYSgxNSwyMyw0MiwuMTIpO2ZsZXgtc2hyaW5rOjB9LmluZm97ZmxleDoxO21pbi13aWR0aDowfS5ib29rLXRpdGxle2Rpc3BsYXk6YmxvY2s7Y29sb3I6IzExMTgyNztmb250LXNpemU6MzhycHg7Zm9udC13ZWlnaHQ6OTAwO2xpbmUtaGVpZ2h0OjEuMjU7bWFyZ2luLWJvdHRvbToxMnJweH0ucmF0aW5ne2Rpc3BsYXk6YmxvY2s7Y29sb3I6I2Y1OWUwYjtmb250LXNpemU6MjVycHg7Zm9udC13ZWlnaHQ6OTAwO21hcmdpbjoxMnJweCAwfS5hY3Rpb25ze2Rpc3BsYXk6ZmxleDtnYXA6MTJycHg7bWFyZ2luLWJvdHRvbToyMnJweH0uYWN0aW9ucyAuYnRue2ZsZXg6MTtmb250LXNpemU6MjRycHg7cGFkZGluZzowIDEwcnB4fS5kZXNje2Rpc3BsYXk6YmxvY2s7Y29sb3I6IzQ3NTQ2Nztmb250LXNpemU6MjZycHg7bGluZS1oZWlnaHQ6MS43NX0ucHVyY2hhc2V7ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcjtqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYmV0d2VlbjtwYWRkaW5nOjE4cnB4IDA7Ym9yZGVyLWJvdHRvbToxcnB4IHNvbGlkICNlZWYyZjd9LnB1cmNoYXNlLW5hbWV7Zm9udC1zaXplOjI4cnB4O2ZvbnQtd2VpZ2h0OjkwMDtjb2xvcjojMTExODI3fS50ZXh0YXJlYXttYXJnaW46MTZycHggMH0uY29tbWVudHtwYWRkaW5nOjIwcnB4IDA7Ym9yZGVyLWJvdHRvbToxcnB4IHNvbGlkICNlZWYyZjd9LmNvbW1lbnQtdXNlcntmb250LXNpemU6MjZycHg7Zm9udC13ZWlnaHQ6OTAwO2NvbG9yOiMxMTE4Mjd9LmNvbW1lbnQtdGV4dHtkaXNwbGF5OmJsb2NrO2NvbG9yOiM0NzU0Njc7Zm9udC1zaXplOjI1cnB4O2xpbmUtaGVpZ2h0OjEuNjU7bWFyZ2luOjEwcnB4IDB9Lmxpa2V7Y29sb3I6IzdjM2FlZDtmb250LXNpemU6MjRycHg7Zm9udC13ZWlnaHQ6OTAwfUBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6MzgwcHgpey50b3B7ZGlzcGxheTpibG9ja30uY292ZXJ7d2lkdGg6MjIwcnB4O2hlaWdodDozMTBycHg7bWFyZ2luLWJvdHRvbToxOHJweH0uYWN0aW9uc3tkaXNwbGF5OmJsb2NrfS5hY3Rpb25zIC5idG57bWFyZ2luLWJvdHRvbToxMnJweH19XG48L3N0eWxlPlxuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///48\n");

/***/ }),
/* 49 */
/*!***************************************************************************************!*\
  !*** E:/翻译漫画/book-main (14)/book-main/frontend-uni/pages/login/login.vue?mpType=page ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _login_vue_vue_type_template_id_5b26a3ac_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./login.vue?vue&type=template&id=5b26a3ac&scoped=true&mpType=page */ 50);\n/* harmony import */ var _login_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./login.vue?vue&type=script&lang=js&mpType=page */ 52);\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _login_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__) if([\"default\"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _login_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n/* harmony import */ var _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 18);\n\nvar renderjs\n\n\n\n\n/* normalize component */\n\nvar component = Object(_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\n  _login_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _login_vue_vue_type_template_id_5b26a3ac_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _login_vue_vue_type_template_id_5b26a3ac_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  \"5b26a3ac\",\n  null,\n  false,\n  _login_vue_vue_type_template_id_5b26a3ac_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__[\"components\"],\n  renderjs\n)\n\ncomponent.options.__file = \"pages/login/login.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbbnVsbF0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBeUk7QUFDekk7QUFDb0U7QUFDTDs7O0FBRy9EO0FBQ2dNO0FBQ2hNLGdCQUFnQix1TUFBVTtBQUMxQixFQUFFLHNGQUFNO0FBQ1IsRUFBRSx1R0FBTTtBQUNSLEVBQUUsZ0hBQWU7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUUsMkdBQVU7QUFDWjtBQUNBOztBQUVBO0FBQ2UsZ0YiLCJmaWxlIjoiNDkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucywgcmVjeWNsYWJsZVJlbmRlciwgY29tcG9uZW50cyB9IGZyb20gXCIuL2xvZ2luLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD01YjI2YTNhYyZzY29wZWQ9dHJ1ZSZtcFR5cGU9cGFnZVwiXG52YXIgcmVuZGVyanNcbmltcG9ydCBzY3JpcHQgZnJvbSBcIi4vbG9naW4udnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJm1wVHlwZT1wYWdlXCJcbmV4cG9ydCAqIGZyb20gXCIuL2xvZ2luLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZtcFR5cGU9cGFnZVwiXG5cblxuLyogbm9ybWFsaXplIGNvbXBvbmVudCAqL1xuaW1wb3J0IG5vcm1hbGl6ZXIgZnJvbSBcIiEuLi8uLi8uLi8uLi8uLi9IQnVpbGRlclguNS4wNy4yMDI2MDQxMDA2L0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvdnVlLWxvYWRlci9saWIvcnVudGltZS9jb21wb25lbnROb3JtYWxpemVyLmpzXCJcbnZhciBjb21wb25lbnQgPSBub3JtYWxpemVyKFxuICBzY3JpcHQsXG4gIHJlbmRlcixcbiAgc3RhdGljUmVuZGVyRm5zLFxuICBmYWxzZSxcbiAgbnVsbCxcbiAgXCI1YjI2YTNhY1wiLFxuICBudWxsLFxuICBmYWxzZSxcbiAgY29tcG9uZW50cyxcbiAgcmVuZGVyanNcbilcblxuY29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJwYWdlcy9sb2dpbi9sb2dpbi52dWVcIlxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50LmV4cG9ydHMiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///49\n");

/***/ }),
/* 50 */
/*!*********************************************************************************************************************************!*\
  !*** E:/翻译漫画/book-main (14)/book-main/frontend-uni/pages/login/login.vue?vue&type=template&id=5b26a3ac&scoped=true&mpType=page ***!
  \*********************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_0_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_login_vue_vue_type_template_id_5b26a3ac_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--11-0!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/filter-modules-template.js!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./login.vue?vue&type=template&id=5b26a3ac&scoped=true&mpType=page */ 51);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_0_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_login_vue_vue_type_template_id_5b26a3ac_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_0_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_login_vue_vue_type_template_id_5b26a3ac_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_0_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_login_vue_vue_type_template_id_5b26a3ac_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_0_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_login_vue_vue_type_template_id_5b26a3ac_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),
/* 51 */
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--11-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/filter-modules-template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!E:/翻译漫画/book-main (14)/book-main/frontend-uni/pages/login/login.vue?vue&type=template&id=5b26a3ac&scoped=true&mpType=page ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "view",
    { staticClass: _vm._$s(0, "sc", "container login-page"), attrs: { _i: 0 } },
    [
      _c(
        "view",
        { staticClass: _vm._$s(1, "sc", "card login-card"), attrs: { _i: 1 } },
        [
          _c("text", {
            staticClass: _vm._$s(2, "sc", "logo"),
            attrs: { _i: 2 },
          }),
          _c("text", {
            staticClass: _vm._$s(3, "sc", "title center"),
            attrs: { _i: 3 },
          }),
          _c("input", {
            directives: [
              {
                name: "model",
                rawName: "v-model",
                value: _vm.account,
                expression: "account",
              },
            ],
            staticClass: _vm._$s(4, "sc", "input"),
            attrs: { _i: 4 },
            domProps: { value: _vm._$s(4, "v-model", _vm.account) },
            on: {
              input: function ($event) {
                if ($event.target.composing) {
                  return
                }
                _vm.account = $event.target.value
              },
            },
          }),
          _c("input", {
            directives: [
              {
                name: "model",
                rawName: "v-model",
                value: _vm.password,
                expression: "password",
              },
            ],
            staticClass: _vm._$s(5, "sc", "input"),
            attrs: { _i: 5 },
            domProps: { value: _vm._$s(5, "v-model", _vm.password) },
            on: {
              input: function ($event) {
                if ($event.target.composing) {
                  return
                }
                _vm.password = $event.target.value
              },
            },
          }),
          _c("button", {
            staticClass: _vm._$s(6, "sc", "btn"),
            attrs: { _i: 6 },
            on: { click: _vm.login },
          }),
          _c("button", {
            staticClass: _vm._$s(7, "sc", "btn secondary"),
            attrs: { _i: 7 },
            on: { click: _vm.registerAccount },
          }),
          _c("button", {
            staticClass: _vm._$s(8, "sc", "btn secondary"),
            attrs: { _i: 8 },
            on: { click: _vm.demo },
          }),
        ]
      ),
    ]
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),
/* 52 */
/*!***************************************************************************************************************!*\
  !*** E:/翻译漫画/book-main (14)/book-main/frontend-uni/pages/login/login.vue?vue&type=script&lang=js&mpType=page ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_1_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_login_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--7-1!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/using-components.js!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./login.vue?vue&type=script&lang=js&mpType=page */ 53);\n/* harmony import */ var _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_1_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_login_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_1_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_login_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_1_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_login_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__) if([\"default\"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_1_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_login_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n /* harmony default export */ __webpack_exports__[\"default\"] = (_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_1_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_login_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0___default.a); //# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbbnVsbF0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQWdxQixDQUFnQiw4cUJBQUcsRUFBQyIsImZpbGUiOiI1Mi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vSEJ1aWxkZXJYLjUuMDcuMjAyNjA0MTAwNi9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzIS4uLy4uLy4uLy4uLy4uL0hCdWlsZGVyWC41LjA3LjIwMjYwNDEwMDYvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy93ZWJwYWNrLXByZXByb2Nlc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTctMSEuLi8uLi8uLi8uLi8uLi9IQnVpbGRlclguNS4wNy4yMDI2MDQxMDA2L0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvd2VicGFjay11bmktYXBwLWxvYWRlci91c2luZy1jb21wb25lbnRzLmpzIS4uLy4uLy4uLy4uLy4uL0hCdWlsZGVyWC41LjA3LjIwMjYwNDEwMDYvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vbG9naW4udnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJm1wVHlwZT1wYWdlXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vSEJ1aWxkZXJYLjUuMDcuMjAyNjA0MTAwNi9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzIS4uLy4uLy4uLy4uLy4uL0hCdWlsZGVyWC41LjA3LjIwMjYwNDEwMDYvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy93ZWJwYWNrLXByZXByb2Nlc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTctMSEuLi8uLi8uLi8uLi8uLi9IQnVpbGRlclguNS4wNy4yMDI2MDQxMDA2L0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvd2VicGFjay11bmktYXBwLWxvYWRlci91c2luZy1jb21wb25lbnRzLmpzIS4uLy4uLy4uLy4uLy4uL0hCdWlsZGVyWC41LjA3LjIwMjYwNDEwMDYvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vbG9naW4udnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJm1wVHlwZT1wYWdlXCIiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///52\n");

/***/ }),
/* 53 */
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--7-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/using-components.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!E:/翻译漫画/book-main (14)/book-main/frontend-uni/pages/login/login.vue?vue&type=script&lang=js&mpType=page ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\nvar _request = __webpack_require__(/*! ../../api/request.js */ 17);\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\nvar _default = {\n  data: function data() {\n    return {\n      account: 'demo',\n      password: 'demo123'\n    };\n  },\n  methods: {\n    login: function login() {\n      var that = this;\n      if (!that.account || !that.password) {\n        uni.showToast({\n          title: '请输入账号和密码',\n          icon: 'none'\n        });\n        return;\n      }\n      (0, _request.request)('/user/login', {\n        method: 'POST',\n        data: {\n          account: that.account,\n          username_or_email: that.account,\n          password: that.password,\n          role: 'user'\n        }\n      }).then(function (res) {\n        (0, _request.saveLogin)(res);\n        uni.showToast({\n          title: '登录成功',\n          icon: 'success'\n        });\n        setTimeout(function () {\n          uni.switchTab({\n            url: '/pages/profile/profile'\n          });\n        }, 500);\n      }).catch(function (e) {\n        (0, _request.showError)(e, '登录失败');\n      });\n    },\n    registerAccount: function registerAccount() {\n      var that = this;\n      if (!that.account || !that.password) {\n        uni.showToast({\n          title: '请先填写账号密码',\n          icon: 'none'\n        });\n        return;\n      }\n      (0, _request.request)('/user/register', {\n        method: 'POST',\n        data: {\n          username: that.account,\n          email: that.account + '@demo.com',\n          nickname: that.account,\n          password: that.password\n        }\n      }).then(function () {\n        that.login();\n      }).catch(function (e) {\n        (0, _request.showError)(e, '注册失败');\n      });\n    },\n    demo: function demo() {\n      this.account = 'demo';\n      this.password = 'demo123';\n      this.login();\n    }\n  }\n};\nexports.default = _default;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVuaS1hcHA6Ly8vcGFnZXMvbG9naW4vbG9naW4udnVlIl0sIm5hbWVzIjpbImRhdGEiLCJhY2NvdW50IiwicGFzc3dvcmQiLCJtZXRob2RzIiwibG9naW4iLCJ1bmkiLCJ0aXRsZSIsImljb24iLCJtZXRob2QiLCJ1c2VybmFtZV9vcl9lbWFpbCIsInJvbGUiLCJzZXRUaW1lb3V0IiwidXJsIiwicmVnaXN0ZXJBY2NvdW50IiwidXNlcm5hbWUiLCJlbWFpbCIsIm5pY2tuYW1lIiwidGhhdCIsImRlbW8iXSwibWFwcGluZ3MiOiI7Ozs7OztBQWNBOzs7Ozs7Ozs7Ozs7OztlQUNBO0VBQ0FBO0lBQUE7TUFBQUM7TUFBQUM7SUFBQTtFQUFBO0VBQ0FDO0lBQ0FDO01BQ0E7TUFDQTtRQUFBQztVQUFBQztVQUFBQztRQUFBO1FBQUE7TUFBQTtNQUNBO1FBQUFDO1FBQUFSO1VBQUFDO1VBQUFRO1VBQUFQO1VBQUFRO1FBQUE7TUFBQTtRQUNBO1FBQ0FMO1VBQUFDO1VBQUFDO1FBQUE7UUFDQUk7VUFBQU47WUFBQU87VUFBQTtRQUFBO01BQ0E7UUFBQTtNQUFBO0lBQ0E7SUFDQUM7TUFDQTtNQUNBO1FBQUFSO1VBQUFDO1VBQUFDO1FBQUE7UUFBQTtNQUFBO01BQ0E7UUFBQUM7UUFBQVI7VUFBQWM7VUFBQUM7VUFBQUM7VUFBQWQ7UUFBQTtNQUFBO1FBQUFlO01BQUE7UUFBQTtNQUFBO0lBQ0E7SUFDQUM7TUFBQTtNQUFBO01BQUE7SUFBQTtFQUNBO0FBQ0E7QUFBQSIsImZpbGUiOiI1My5qcyIsInNvdXJjZXNDb250ZW50IjpbIjx0ZW1wbGF0ZT5cbiAgPHZpZXcgY2xhc3M9XCJjb250YWluZXIgbG9naW4tcGFnZVwiPlxuICAgIDx2aWV3IGNsYXNzPVwiY2FyZCBsb2dpbi1jYXJkXCI+XG4gICAgICA8dGV4dCBjbGFzcz1cImxvZ29cIj5LRzwvdGV4dD5cbiAgICAgIDx0ZXh0IGNsYXNzPVwidGl0bGUgY2VudGVyXCI+55So5oi355m75b2VPC90ZXh0PlxuICAgICAgPGlucHV0IGNsYXNzPVwiaW5wdXRcIiB2LW1vZGVsPVwiYWNjb3VudFwiIHBsYWNlaG9sZGVyPVwi55So5oi35ZCNIC8g6YKu566xXCIgLz5cbiAgICAgIDxpbnB1dCBjbGFzcz1cImlucHV0XCIgdi1tb2RlbD1cInBhc3N3b3JkXCIgcGFzc3dvcmQgcGxhY2Vob2xkZXI9XCLlr4bnoIFcIiAvPlxuICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0blwiIEBjbGljaz1cImxvZ2luXCI+55m75b2VPC9idXR0b24+XG4gICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIHNlY29uZGFyeVwiIEBjbGljaz1cInJlZ2lzdGVyQWNjb3VudFwiPuazqOWGjOW9k+WJjei0puWPtzwvYnV0dG9uPlxuICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBzZWNvbmRhcnlcIiBAY2xpY2s9XCJkZW1vXCI+5L2/55So5ryU56S66LSm5Y+3PC9idXR0b24+XG4gICAgPC92aWV3PlxuICA8L3ZpZXc+XG48L3RlbXBsYXRlPlxuPHNjcmlwdD5cbmltcG9ydCB7IHJlcXVlc3QsIHNhdmVMb2dpbiwgc2hvd0Vycm9yIH0gZnJvbSAnLi4vLi4vYXBpL3JlcXVlc3QuanMnXG5leHBvcnQgZGVmYXVsdCB7XG4gIGRhdGE6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHsgYWNjb3VudDogJ2RlbW8nLCBwYXNzd29yZDogJ2RlbW8xMjMnIH0gfSxcbiAgbWV0aG9kczoge1xuICAgIGxvZ2luOiBmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zdCB0aGF0ID0gdGhpc1xuICAgICAgaWYgKCF0aGF0LmFjY291bnQgfHwgIXRoYXQucGFzc3dvcmQpIHsgdW5pLnNob3dUb2FzdCh7IHRpdGxlOiAn6K+36L6T5YWl6LSm5Y+35ZKM5a+G56CBJywgaWNvbjogJ25vbmUnIH0pOyByZXR1cm4gfVxuICAgICAgcmVxdWVzdCgnL3VzZXIvbG9naW4nLCB7IG1ldGhvZDogJ1BPU1QnLCBkYXRhOiB7IGFjY291bnQ6IHRoYXQuYWNjb3VudCwgdXNlcm5hbWVfb3JfZW1haWw6IHRoYXQuYWNjb3VudCwgcGFzc3dvcmQ6IHRoYXQucGFzc3dvcmQsIHJvbGU6ICd1c2VyJyB9IH0pLnRoZW4oZnVuY3Rpb24gKHJlcykge1xuICAgICAgICBzYXZlTG9naW4ocmVzKVxuICAgICAgICB1bmkuc2hvd1RvYXN0KHsgdGl0bGU6ICfnmbvlvZXmiJDlip8nLCBpY29uOiAnc3VjY2VzcycgfSlcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7IHVuaS5zd2l0Y2hUYWIoeyB1cmw6ICcvcGFnZXMvcHJvZmlsZS9wcm9maWxlJyB9KSB9LCA1MDApXG4gICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZSkgeyBzaG93RXJyb3IoZSwgJ+eZu+W9leWksei0pScpIH0pXG4gICAgfSxcbiAgICByZWdpc3RlckFjY291bnQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnN0IHRoYXQgPSB0aGlzXG4gICAgICBpZiAoIXRoYXQuYWNjb3VudCB8fCAhdGhhdC5wYXNzd29yZCkgeyB1bmkuc2hvd1RvYXN0KHsgdGl0bGU6ICfor7flhYjloavlhpnotKblj7flr4bnoIEnLCBpY29uOiAnbm9uZScgfSk7IHJldHVybiB9XG4gICAgICByZXF1ZXN0KCcvdXNlci9yZWdpc3RlcicsIHsgbWV0aG9kOiAnUE9TVCcsIGRhdGE6IHsgdXNlcm5hbWU6IHRoYXQuYWNjb3VudCwgZW1haWw6IHRoYXQuYWNjb3VudCArICdAZGVtby5jb20nLCBuaWNrbmFtZTogdGhhdC5hY2NvdW50LCBwYXNzd29yZDogdGhhdC5wYXNzd29yZCB9IH0pLnRoZW4oZnVuY3Rpb24gKCkgeyB0aGF0LmxvZ2luKCkgfSkuY2F0Y2goZnVuY3Rpb24gKGUpIHsgc2hvd0Vycm9yKGUsICfms6jlhozlpLHotKUnKSB9KVxuICAgIH0sXG4gICAgZGVtbzogZnVuY3Rpb24gKCkgeyB0aGlzLmFjY291bnQgPSAnZGVtbyc7IHRoaXMucGFzc3dvcmQgPSAnZGVtbzEyMyc7IHRoaXMubG9naW4oKSB9XG4gIH1cbn1cbjwvc2NyaXB0PlxuPHN0eWxlIHNjb3BlZD5cbi5sb2dpbi1wYWdle2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7anVzdGlmeS1jb250ZW50OmNlbnRlcn0ubG9naW4tY2FyZHt3aWR0aDoxMDAlO3BhZGRpbmc6NDBycHh9LmxvZ297ZGlzcGxheTpibG9jazt3aWR0aDo5MnJweDtoZWlnaHQ6OTJycHg7bGluZS1oZWlnaHQ6OTJycHg7dGV4dC1hbGlnbjpjZW50ZXI7bWFyZ2luOjAgYXV0byAyNHJweDtib3JkZXItcmFkaXVzOjI0cnB4O2NvbG9yOiNmZmY7Zm9udC1zaXplOjM4cnB4O2ZvbnQtd2VpZ2h0OjkwMDtiYWNrZ3JvdW5kOmxpbmVhci1ncmFkaWVudCgxMzVkZWcsIzdjM2FlZCwjMGVhNWU5KX0uY2VudGVye3RleHQtYWxpZ246Y2VudGVyO2Rpc3BsYXk6YmxvY2t9LmlucHV0e21hcmdpbi1ib3R0b206MjBycHh9LmJ0bnttYXJnaW4tdG9wOjEycnB4fVxuPC9zdHlsZT5cbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///53\n");

/***/ }),
/* 54 */
/*!*****************************************************************************************!*\
  !*** E:/翻译漫画/book-main (14)/book-main/frontend-uni/pages/reader/reader.vue?mpType=page ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _reader_vue_vue_type_template_id_559130b6_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./reader.vue?vue&type=template&id=559130b6&scoped=true&mpType=page */ 55);\n/* harmony import */ var _reader_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./reader.vue?vue&type=script&lang=js&mpType=page */ 57);\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _reader_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__) if([\"default\"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _reader_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n/* harmony import */ var _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 18);\n\nvar renderjs\n\n\n\n\n/* normalize component */\n\nvar component = Object(_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\n  _reader_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _reader_vue_vue_type_template_id_559130b6_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _reader_vue_vue_type_template_id_559130b6_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  \"559130b6\",\n  null,\n  false,\n  _reader_vue_vue_type_template_id_559130b6_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__[\"components\"],\n  renderjs\n)\n\ncomponent.options.__file = \"pages/reader/reader.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbbnVsbF0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBMEk7QUFDMUk7QUFDcUU7QUFDTDs7O0FBR2hFO0FBQ2dNO0FBQ2hNLGdCQUFnQix1TUFBVTtBQUMxQixFQUFFLHVGQUFNO0FBQ1IsRUFBRSx3R0FBTTtBQUNSLEVBQUUsaUhBQWU7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUUsNEdBQVU7QUFDWjtBQUNBOztBQUVBO0FBQ2UsZ0YiLCJmaWxlIjoiNTQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucywgcmVjeWNsYWJsZVJlbmRlciwgY29tcG9uZW50cyB9IGZyb20gXCIuL3JlYWRlci52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9NTU5MTMwYjYmc2NvcGVkPXRydWUmbXBUeXBlPXBhZ2VcIlxudmFyIHJlbmRlcmpzXG5pbXBvcnQgc2NyaXB0IGZyb20gXCIuL3JlYWRlci52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmbXBUeXBlPXBhZ2VcIlxuZXhwb3J0ICogZnJvbSBcIi4vcmVhZGVyLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZtcFR5cGU9cGFnZVwiXG5cblxuLyogbm9ybWFsaXplIGNvbXBvbmVudCAqL1xuaW1wb3J0IG5vcm1hbGl6ZXIgZnJvbSBcIiEuLi8uLi8uLi8uLi8uLi9IQnVpbGRlclguNS4wNy4yMDI2MDQxMDA2L0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvdnVlLWxvYWRlci9saWIvcnVudGltZS9jb21wb25lbnROb3JtYWxpemVyLmpzXCJcbnZhciBjb21wb25lbnQgPSBub3JtYWxpemVyKFxuICBzY3JpcHQsXG4gIHJlbmRlcixcbiAgc3RhdGljUmVuZGVyRm5zLFxuICBmYWxzZSxcbiAgbnVsbCxcbiAgXCI1NTkxMzBiNlwiLFxuICBudWxsLFxuICBmYWxzZSxcbiAgY29tcG9uZW50cyxcbiAgcmVuZGVyanNcbilcblxuY29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJwYWdlcy9yZWFkZXIvcmVhZGVyLnZ1ZVwiXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///54\n");

/***/ }),
/* 55 */
/*!***********************************************************************************************************************************!*\
  !*** E:/翻译漫画/book-main (14)/book-main/frontend-uni/pages/reader/reader.vue?vue&type=template&id=559130b6&scoped=true&mpType=page ***!
  \***********************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_0_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_reader_vue_vue_type_template_id_559130b6_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--11-0!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/filter-modules-template.js!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./reader.vue?vue&type=template&id=559130b6&scoped=true&mpType=page */ 56);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_0_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_reader_vue_vue_type_template_id_559130b6_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_0_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_reader_vue_vue_type_template_id_559130b6_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_0_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_reader_vue_vue_type_template_id_559130b6_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_0_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_reader_vue_vue_type_template_id_559130b6_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),
/* 56 */
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--11-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/filter-modules-template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!E:/翻译漫画/book-main (14)/book-main/frontend-uni/pages/reader/reader.vue?vue&type=template&id=559130b6&scoped=true&mpType=page ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "view",
    { staticClass: _vm._$s(0, "sc", "page reader-page"), attrs: { _i: 0 } },
    [
      _c(
        "view",
        { staticClass: _vm._$s(1, "sc", "reader-head"), attrs: { _i: 1 } },
        [
          _c(
            "view",
            {
              staticClass: _vm._$s(2, "sc", "reader-title-box"),
              attrs: { _i: 2 },
            },
            [
              _c("text", {
                staticClass: _vm._$s(3, "sc", "h1"),
                attrs: { _i: 3 },
              }),
              _c(
                "text",
                { staticClass: _vm._$s(4, "sc", "meta"), attrs: { _i: 4 } },
                [_vm._v(_vm._$s(4, "t0-0", _vm._s(_vm.platformLabel)))]
              ),
            ]
          ),
          _c("button", {
            staticClass: _vm._$s(5, "sc", "btn small secondary copy"),
            attrs: { _i: 5 },
            on: { click: _vm.copyUrl },
          }),
        ]
      ),
      _vm._$s(6, "i", _vm.tip)
        ? _c(
            "view",
            { staticClass: _vm._$s(6, "sc", "tip"), attrs: { _i: 6 } },
            [_c("text", [_vm._v(_vm._$s(7, "t0-0", _vm._s(_vm.tip)))])]
          )
        : _vm._e(),
      _vm._$s(8, "i", _vm.readerUrl)
        ? _c("web-view", {
            staticClass: _vm._$s(8, "sc", "webview"),
            attrs: { src: _vm._$s(8, "a-src", _vm.readerUrl), _i: 8 },
          })
        : _vm._e(),
    ]
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),
/* 57 */
/*!*****************************************************************************************************************!*\
  !*** E:/翻译漫画/book-main (14)/book-main/frontend-uni/pages/reader/reader.vue?vue&type=script&lang=js&mpType=page ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_1_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_reader_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--7-1!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/using-components.js!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./reader.vue?vue&type=script&lang=js&mpType=page */ 58);\n/* harmony import */ var _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_1_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_reader_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_1_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_reader_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_1_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_reader_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__) if([\"default\"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_1_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_reader_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n /* harmony default export */ __webpack_exports__[\"default\"] = (_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_1_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_reader_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0___default.a); //# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbbnVsbF0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQWlxQixDQUFnQiwrcUJBQUcsRUFBQyIsImZpbGUiOiI1Ny5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vSEJ1aWxkZXJYLjUuMDcuMjAyNjA0MTAwNi9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzIS4uLy4uLy4uLy4uLy4uL0hCdWlsZGVyWC41LjA3LjIwMjYwNDEwMDYvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy93ZWJwYWNrLXByZXByb2Nlc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTctMSEuLi8uLi8uLi8uLi8uLi9IQnVpbGRlclguNS4wNy4yMDI2MDQxMDA2L0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvd2VicGFjay11bmktYXBwLWxvYWRlci91c2luZy1jb21wb25lbnRzLmpzIS4uLy4uLy4uLy4uLy4uL0hCdWlsZGVyWC41LjA3LjIwMjYwNDEwMDYvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vcmVhZGVyLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZtcFR5cGU9cGFnZVwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uL0hCdWlsZGVyWC41LjA3LjIwMjYwNDEwMDYvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcyEuLi8uLi8uLi8uLi8uLi9IQnVpbGRlclguNS4wNy4yMDI2MDQxMDA2L0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvd2VicGFjay1wcmVwcm9jZXNzLWxvYWRlci9pbmRleC5qcz8/cmVmLS03LTEhLi4vLi4vLi4vLi4vLi4vSEJ1aWxkZXJYLjUuMDcuMjAyNjA0MTAwNi9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vdnVlLWNsaS1wbHVnaW4tdW5pL3BhY2thZ2VzL3dlYnBhY2stdW5pLWFwcC1sb2FkZXIvdXNpbmctY29tcG9uZW50cy5qcyEuLi8uLi8uLi8uLi8uLi9IQnVpbGRlclguNS4wNy4yMDI2MDQxMDA2L0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL3JlYWRlci52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmbXBUeXBlPXBhZ2VcIiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///57\n");

/***/ }),
/* 58 */
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--7-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/using-components.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!E:/翻译漫画/book-main (14)/book-main/frontend-uni/pages/reader/reader.vue?vue&type=script&lang=js&mpType=page ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\nvar _request = __webpack_require__(/*! ../../api/request.js */ 17);\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\nvar _default = {\n  data: function data() {\n    return {\n      readerUrl: '',\n      platformLabel: (0, _request.getPlatformLabel)(),\n      tip: ''\n    };\n  },\n  onLoad: function onLoad(options) {\n    var id = options && (options.id || options.book_id) || 1;\n    var token = (0, _request.getToken)();\n    var platform = (0, _request.getPlatformName)();\n    var query = ['book_id=' + encodeURIComponent(id), 'record=0', 'from=uni', 'platform=' + encodeURIComponent(platform), 'v=mobile-reader-one-page-1'];\n    if (token) query.push('token=' + encodeURIComponent(token));\n    this.readerUrl = _request.SERVER_ORIGIN + '/static/reader.html?' + query.join('&');\n    if (platform === 'mp-weixin') {\n      this.tip = '微信小程序正式发布时，reader 页面需要配置 HTTPS 业务域名；本地开发阶段可在开发者工具关闭合法域名校验。';\n    } else if (platform === 'ios') {\n      this.tip = 'iOS 调试局域网 HTTP 时，如打不开，请优先使用 HTTPS 域名或检查 manifest 的网络安全配置。';\n    }\n  },\n  methods: {\n    copyUrl: function copyUrl() {\n      var that = this;\n      uni.setClipboardData({\n        data: that.readerUrl,\n        success: function success() {\n          uni.showToast({\n            title: '已复制',\n            icon: 'success'\n          });\n        }\n      });\n    }\n  }\n};\nexports.default = _default;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVuaS1hcHA6Ly8vcGFnZXMvcmVhZGVyL3JlYWRlci52dWUiXSwibmFtZXMiOlsiZGF0YSIsInJlYWRlclVybCIsInBsYXRmb3JtTGFiZWwiLCJ0aXAiLCJvbkxvYWQiLCJtZXRob2RzIiwiY29weVVybCIsInVuaSIsInN1Y2Nlc3MiLCJ0aXRsZSIsImljb24iXSwibWFwcGluZ3MiOiI7Ozs7OztBQW1CQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztlQUVBO0VBQ0FBO0lBQ0E7TUFDQUM7TUFDQUM7TUFDQUM7SUFDQTtFQUNBO0VBQ0FDO0lBQ0E7SUFDQTtJQUNBO0lBQ0EsYUFDQSxxQ0FDQSxZQUNBLFlBQ0EsNENBQ0EsNkJBQ0E7SUFDQTtJQUNBO0lBRUE7TUFDQTtJQUNBO01BQ0E7SUFDQTtFQUNBO0VBQ0FDO0lBQ0FDO01BQ0E7TUFDQUM7UUFDQVA7UUFDQVE7VUFBQUQ7WUFBQUU7WUFBQUM7VUFBQTtRQUFBO01BQ0E7SUFDQTtFQUNBO0FBQ0E7QUFBQSIsImZpbGUiOiI1OC5qcyIsInNvdXJjZXNDb250ZW50IjpbIjx0ZW1wbGF0ZT5cbiAgPHZpZXcgY2xhc3M9XCJwYWdlIHJlYWRlci1wYWdlXCI+XG4gICAgPHZpZXcgY2xhc3M9XCJyZWFkZXItaGVhZFwiPlxuICAgICAgPHZpZXcgY2xhc3M9XCJyZWFkZXItdGl0bGUtYm94XCI+XG4gICAgICAgIDx0ZXh0IGNsYXNzPVwiaDFcIj7nlLXlrZDkuablnKjnur/or5Xor7s8L3RleHQ+XG4gICAgICAgIDx0ZXh0IGNsYXNzPVwibWV0YVwiPnt7IHBsYXRmb3JtTGFiZWwgfX0gwrcg6YCa6L+HIFdlYlZpZXcg5omT5byA5ZCO56uv6ZiF6K+75ZmoPC90ZXh0PlxuICAgICAgPC92aWV3PlxuICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBzbWFsbCBzZWNvbmRhcnkgY29weVwiIEBjbGljaz1cImNvcHlVcmxcIj7lpI3liLblnLDlnYA8L2J1dHRvbj5cbiAgICA8L3ZpZXc+XG5cbiAgICA8dmlldyB2LWlmPVwidGlwXCIgY2xhc3M9XCJ0aXBcIj5cbiAgICAgIDx0ZXh0Pnt7IHRpcCB9fTwvdGV4dD5cbiAgICA8L3ZpZXc+XG5cbiAgICA8d2ViLXZpZXcgdi1pZj1cInJlYWRlclVybFwiIDpzcmM9XCJyZWFkZXJVcmxcIiBjbGFzcz1cIndlYnZpZXdcIiAvPlxuICA8L3ZpZXc+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuaW1wb3J0IHsgU0VSVkVSX09SSUdJTiwgZ2V0VG9rZW4sIGdldFBsYXRmb3JtTGFiZWwsIGdldFBsYXRmb3JtTmFtZSB9IGZyb20gJy4uLy4uL2FwaS9yZXF1ZXN0LmpzJ1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlYWRlclVybDogJycsXG4gICAgICBwbGF0Zm9ybUxhYmVsOiBnZXRQbGF0Zm9ybUxhYmVsKCksXG4gICAgICB0aXA6ICcnXG4gICAgfVxuICB9LFxuICBvbkxvYWQob3B0aW9ucykge1xuICAgIGNvbnN0IGlkID0gKG9wdGlvbnMgJiYgKG9wdGlvbnMuaWQgfHwgb3B0aW9ucy5ib29rX2lkKSkgfHwgMVxuICAgIGNvbnN0IHRva2VuID0gZ2V0VG9rZW4oKVxuICAgIGNvbnN0IHBsYXRmb3JtID0gZ2V0UGxhdGZvcm1OYW1lKClcbiAgICBjb25zdCBxdWVyeSA9IFtcbiAgICAgICdib29rX2lkPScgKyBlbmNvZGVVUklDb21wb25lbnQoaWQpLFxuICAgICAgJ3JlY29yZD0wJyxcbiAgICAgICdmcm9tPXVuaScsXG4gICAgICAncGxhdGZvcm09JyArIGVuY29kZVVSSUNvbXBvbmVudChwbGF0Zm9ybSksXG4gICAgICAndj1tb2JpbGUtcmVhZGVyLW9uZS1wYWdlLTEnXG4gICAgXVxuICAgIGlmICh0b2tlbikgcXVlcnkucHVzaCgndG9rZW49JyArIGVuY29kZVVSSUNvbXBvbmVudCh0b2tlbikpXG4gICAgdGhpcy5yZWFkZXJVcmwgPSBTRVJWRVJfT1JJR0lOICsgJy9zdGF0aWMvcmVhZGVyLmh0bWw/JyArIHF1ZXJ5LmpvaW4oJyYnKVxuXG4gICAgaWYgKHBsYXRmb3JtID09PSAnbXAtd2VpeGluJykge1xuICAgICAgdGhpcy50aXAgPSAn5b6u5L+h5bCP56iL5bqP5q2j5byP5Y+R5biD5pe277yMcmVhZGVyIOmhtemdoumcgOimgemFjee9riBIVFRQUyDkuJrliqHln5/lkI3vvJvmnKzlnLDlvIDlj5HpmLbmrrXlj6/lnKjlvIDlj5HogIXlt6XlhbflhbPpl63lkIjms5Xln5/lkI3moKHpqozjgIInXG4gICAgfSBlbHNlIGlmIChwbGF0Zm9ybSA9PT0gJ2lvcycpIHtcbiAgICAgIHRoaXMudGlwID0gJ2lPUyDosIPor5XlsYDln5/nvZEgSFRUUCDml7bvvIzlpoLmiZPkuI3lvIDvvIzor7fkvJjlhYjkvb/nlKggSFRUUFMg5Z+f5ZCN5oiW5qOA5p+lIG1hbmlmZXN0IOeahOe9kee7nOWuieWFqOmFjee9ruOAgidcbiAgICB9XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBjb3B5VXJsOiBmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zdCB0aGF0ID0gdGhpc1xuICAgICAgdW5pLnNldENsaXBib2FyZERhdGEoe1xuICAgICAgICBkYXRhOiB0aGF0LnJlYWRlclVybCxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKCkgeyB1bmkuc2hvd1RvYXN0KHsgdGl0bGU6ICflt7LlpI3liLYnLCBpY29uOiAnc3VjY2VzcycgfSkgfVxuICAgICAgfSlcbiAgICB9XG4gIH1cbn1cbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuLnJlYWRlci1wYWdle2hlaWdodDoxMDB2aDtwYWRkaW5nOjA7YmFja2dyb3VuZDojZjhmYWZjfS5yZWFkZXItaGVhZHtkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyO2p1c3RpZnktY29udGVudDpzcGFjZS1iZXR3ZWVuO2dhcDoxNnJweDttYXJnaW46MThycHg7cGFkZGluZzoyMnJweDtib3JkZXItcmFkaXVzOjI0cnB4O2JhY2tncm91bmQ6I2ZmZjtib3gtc2hhZG93OjAgMTJycHggMzBycHggcmdiYSgxNSwyMyw0MiwuMDgpfS5yZWFkZXItdGl0bGUtYm94e2ZsZXg6MTttaW4td2lkdGg6MH0uaDF7ZGlzcGxheTpibG9jaztmb250LXNpemU6MzZycHg7Zm9udC13ZWlnaHQ6OTAwO2NvbG9yOiMxMTE4Mjd9Lm1ldGF7ZGlzcGxheTpibG9jaztjb2xvcjojNjY3MDg1O21hcmdpbi10b3A6OHJweDtmb250LXNpemU6MjJycHh9LmNvcHl7d2lkdGg6MTQ4cnB4O3BhZGRpbmc6MDtmb250LXNpemU6MjJycHh9LnRpcHttYXJnaW46MCAxOHJweCAxNHJweDtwYWRkaW5nOjE2cnB4IDIwcnB4O2JvcmRlci1yYWRpdXM6MThycHg7YmFja2dyb3VuZDojZmZmN2VkO2NvbG9yOiM5YTM0MTI7Zm9udC1zaXplOjIzcnB4O2xpbmUtaGVpZ2h0OjEuNTV9LndlYnZpZXd7d2lkdGg6MTAwJTtoZWlnaHQ6Y2FsYygxMDB2aCAtIDE1NHJweCl9XG48L3N0eWxlPlxuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///58\n");

/***/ }),
/* 59 */
/*!***************************************************************************************!*\
  !*** E:/翻译漫画/book-main (14)/book-main/frontend-uni/pages/admin/admin.vue?mpType=page ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _admin_vue_vue_type_template_id_97988d14_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./admin.vue?vue&type=template&id=97988d14&scoped=true&mpType=page */ 60);\n/* harmony import */ var _admin_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./admin.vue?vue&type=script&lang=js&mpType=page */ 62);\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _admin_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__) if([\"default\"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _admin_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n/* harmony import */ var _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 18);\n\nvar renderjs\n\n\n\n\n/* normalize component */\n\nvar component = Object(_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\n  _admin_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _admin_vue_vue_type_template_id_97988d14_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _admin_vue_vue_type_template_id_97988d14_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  \"97988d14\",\n  null,\n  false,\n  _admin_vue_vue_type_template_id_97988d14_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__[\"components\"],\n  renderjs\n)\n\ncomponent.options.__file = \"pages/admin/admin.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbbnVsbF0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBeUk7QUFDekk7QUFDb0U7QUFDTDs7O0FBRy9EO0FBQ2dNO0FBQ2hNLGdCQUFnQix1TUFBVTtBQUMxQixFQUFFLHNGQUFNO0FBQ1IsRUFBRSx1R0FBTTtBQUNSLEVBQUUsZ0hBQWU7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUUsMkdBQVU7QUFDWjtBQUNBOztBQUVBO0FBQ2UsZ0YiLCJmaWxlIjoiNTkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucywgcmVjeWNsYWJsZVJlbmRlciwgY29tcG9uZW50cyB9IGZyb20gXCIuL2FkbWluLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD05Nzk4OGQxNCZzY29wZWQ9dHJ1ZSZtcFR5cGU9cGFnZVwiXG52YXIgcmVuZGVyanNcbmltcG9ydCBzY3JpcHQgZnJvbSBcIi4vYWRtaW4udnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJm1wVHlwZT1wYWdlXCJcbmV4cG9ydCAqIGZyb20gXCIuL2FkbWluLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZtcFR5cGU9cGFnZVwiXG5cblxuLyogbm9ybWFsaXplIGNvbXBvbmVudCAqL1xuaW1wb3J0IG5vcm1hbGl6ZXIgZnJvbSBcIiEuLi8uLi8uLi8uLi8uLi9IQnVpbGRlclguNS4wNy4yMDI2MDQxMDA2L0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvdnVlLWxvYWRlci9saWIvcnVudGltZS9jb21wb25lbnROb3JtYWxpemVyLmpzXCJcbnZhciBjb21wb25lbnQgPSBub3JtYWxpemVyKFxuICBzY3JpcHQsXG4gIHJlbmRlcixcbiAgc3RhdGljUmVuZGVyRm5zLFxuICBmYWxzZSxcbiAgbnVsbCxcbiAgXCI5Nzk4OGQxNFwiLFxuICBudWxsLFxuICBmYWxzZSxcbiAgY29tcG9uZW50cyxcbiAgcmVuZGVyanNcbilcblxuY29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJwYWdlcy9hZG1pbi9hZG1pbi52dWVcIlxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50LmV4cG9ydHMiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///59\n");

/***/ }),
/* 60 */
/*!*********************************************************************************************************************************!*\
  !*** E:/翻译漫画/book-main (14)/book-main/frontend-uni/pages/admin/admin.vue?vue&type=template&id=97988d14&scoped=true&mpType=page ***!
  \*********************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_0_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_admin_vue_vue_type_template_id_97988d14_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--11-0!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/filter-modules-template.js!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./admin.vue?vue&type=template&id=97988d14&scoped=true&mpType=page */ 61);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_0_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_admin_vue_vue_type_template_id_97988d14_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_0_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_admin_vue_vue_type_template_id_97988d14_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_0_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_admin_vue_vue_type_template_id_97988d14_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_0_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_admin_vue_vue_type_template_id_97988d14_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),
/* 61 */
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--11-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/filter-modules-template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!E:/翻译漫画/book-main (14)/book-main/frontend-uni/pages/admin/admin.vue?vue&type=template&id=97988d14&scoped=true&mpType=page ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "view",
    { staticClass: _vm._$s(0, "sc", "container"), attrs: { _i: 0 } },
    [
      _c("view", { staticClass: _vm._$s(1, "sc", "card"), attrs: { _i: 1 } }, [
        _c("text", {
          staticClass: _vm._$s(2, "sc", "title"),
          attrs: { _i: 2 },
        }),
        _c("text", {
          staticClass: _vm._$s(3, "sc", "muted"),
          attrs: { _i: 3 },
        }),
        _c("button", {
          staticClass: _vm._$s(4, "sc", "btn"),
          attrs: { _i: 4 },
          on: { click: _vm.load },
        }),
      ]),
      _vm._$s(5, "i", !_vm.admin)
        ? _c(
            "view",
            { staticClass: _vm._$s(5, "sc", "card"), attrs: { _i: 5 } },
            [
              _c("text", {
                staticClass: _vm._$s(6, "sc", "muted"),
                attrs: { _i: 6 },
              }),
              _c("button", {
                staticClass: _vm._$s(7, "sc", "btn"),
                attrs: { _i: 7 },
                on: { click: _vm.goLogin },
              }),
            ]
          )
        : _vm._e(),
      _vm._$s(8, "i", _vm.error)
        ? _c(
            "view",
            { staticClass: _vm._$s(8, "sc", "card"), attrs: { _i: 8 } },
            [
              _c(
                "text",
                { staticClass: _vm._$s(9, "sc", "muted"), attrs: { _i: 9 } },
                [_vm._v(_vm._$s(9, "t0-0", _vm._s(_vm.error)))]
              ),
            ]
          )
        : _vm._e(),
      _vm._$s(10, "i", _vm.admin && _vm.dashboard)
        ? _c(
            "view",
            { staticClass: _vm._$s(10, "sc", "card"), attrs: { _i: 10 } },
            [
              _c("text", {
                staticClass: _vm._$s(11, "sc", "title"),
                attrs: { _i: 11 },
              }),
              _c(
                "view",
                {
                  staticClass: _vm._$s(12, "sc", "stat-grid"),
                  attrs: { _i: 12 },
                },
                [
                  _c(
                    "view",
                    {
                      staticClass: _vm._$s(13, "sc", "stat-item"),
                      attrs: { _i: 13 },
                    },
                    [
                      _c(
                        "text",
                        {
                          staticClass: _vm._$s(14, "sc", "stat-num"),
                          attrs: { _i: 14 },
                        },
                        [_vm._v(_vm._$s(14, "t0-0", _vm._s(_vm.d("users"))))]
                      ),
                      _c("text", {
                        staticClass: _vm._$s(15, "sc", "muted"),
                        attrs: { _i: 15 },
                      }),
                    ]
                  ),
                  _c(
                    "view",
                    {
                      staticClass: _vm._$s(16, "sc", "stat-item"),
                      attrs: { _i: 16 },
                    },
                    [
                      _c(
                        "text",
                        {
                          staticClass: _vm._$s(17, "sc", "stat-num"),
                          attrs: { _i: 17 },
                        },
                        [_vm._v(_vm._$s(17, "t0-0", _vm._s(_vm.d("books"))))]
                      ),
                      _c("text", {
                        staticClass: _vm._$s(18, "sc", "muted"),
                        attrs: { _i: 18 },
                      }),
                    ]
                  ),
                  _c(
                    "view",
                    {
                      staticClass: _vm._$s(19, "sc", "stat-item"),
                      attrs: { _i: 19 },
                    },
                    [
                      _c(
                        "text",
                        {
                          staticClass: _vm._$s(20, "sc", "stat-num"),
                          attrs: { _i: 20 },
                        },
                        [_vm._v(_vm._$s(20, "t0-0", _vm._s(_vm.d("comments"))))]
                      ),
                      _c("text", {
                        staticClass: _vm._$s(21, "sc", "muted"),
                        attrs: { _i: 21 },
                      }),
                    ]
                  ),
                  _c(
                    "view",
                    {
                      staticClass: _vm._$s(22, "sc", "stat-item"),
                      attrs: { _i: 22 },
                    },
                    [
                      _c(
                        "text",
                        {
                          staticClass: _vm._$s(23, "sc", "stat-num"),
                          attrs: { _i: 23 },
                        },
                        [
                          _vm._v(
                            _vm._$s(23, "t0-0", _vm._s(_vm.d("feedbacks")))
                          ),
                        ]
                      ),
                      _c("text", {
                        staticClass: _vm._$s(24, "sc", "muted"),
                        attrs: { _i: 24 },
                      }),
                    ]
                  ),
                ]
              ),
            ]
          )
        : _vm._e(),
      _vm._$s(25, "i", _vm.admin)
        ? _c(
            "view",
            { staticClass: _vm._$s(25, "sc", "card"), attrs: { _i: 25 } },
            [
              _c("text", {
                staticClass: _vm._$s(26, "sc", "title"),
                attrs: { _i: 26 },
              }),
              _c("button", {
                staticClass: _vm._$s(27, "sc", "btn"),
                attrs: { _i: 27 },
                on: { click: _vm.syncGraph },
              }),
              _c("button", {
                staticClass: _vm._$s(28, "sc", "btn secondary"),
                attrs: { _i: 28 },
                on: { click: _vm.precompute },
              }),
              _c("button", {
                staticClass: _vm._$s(29, "sc", "btn secondary"),
                attrs: { _i: 29 },
                on: { click: _vm.openWebAdmin },
              }),
            ]
          )
        : _vm._e(),
      _vm._$s(30, "i", _vm.admin)
        ? _c(
            "view",
            { staticClass: _vm._$s(30, "sc", "card"), attrs: { _i: 30 } },
            [
              _c("text", {
                staticClass: _vm._$s(31, "sc", "title"),
                attrs: { _i: 31 },
              }),
              _c(
                "view",
                {
                  staticClass: _vm._$s(32, "sc", "search-row"),
                  attrs: { _i: 32 },
                },
                [
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.userQ,
                        expression: "userQ",
                      },
                    ],
                    staticClass: _vm._$s(33, "sc", "input"),
                    attrs: { _i: 33 },
                    domProps: { value: _vm._$s(33, "v-model", _vm.userQ) },
                    on: {
                      input: function ($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.userQ = $event.target.value
                      },
                    },
                  }),
                  _c("button", {
                    staticClass: _vm._$s(34, "sc", "btn small"),
                    attrs: { _i: 34 },
                    on: { click: _vm.loadUsers },
                  }),
                ]
              ),
              _vm._l(
                _vm._$s(35, "f", { forItems: _vm.users }),
                function (u, $10, $20, $30) {
                  return _c(
                    "view",
                    {
                      key: _vm._$s(35, "f", { forIndex: $20, key: u.id }),
                      staticClass: _vm._$s("35-" + $30, "sc", "user"),
                      attrs: { _i: "35-" + $30 },
                    },
                    [
                      _c(
                        "text",
                        {
                          staticClass: _vm._$s("36-" + $30, "sc", "user-name"),
                          attrs: { _i: "36-" + $30 },
                        },
                        [
                          _vm._v(
                            _vm._$s("36-" + $30, "t0-0", _vm._s(u.username)) +
                              _vm._$s(
                                "36-" + $30,
                                "t0-1",
                                _vm._s(u.is_admin ? "管理员" : "用户")
                              )
                          ),
                        ]
                      ),
                      _c(
                        "text",
                        {
                          staticClass: _vm._$s("37-" + $30, "sc", "muted"),
                          attrs: { _i: "37-" + $30 },
                        },
                        [
                          _vm._v(
                            _vm._$s(
                              "37-" + $30,
                              "t0-0",
                              _vm._s(u.email || "")
                            ) +
                              _vm._$s(
                                "37-" + $30,
                                "t0-1",
                                _vm._s(u.is_active ? "启用" : "禁用")
                              )
                          ),
                        ]
                      ),
                      _c(
                        "view",
                        {
                          staticClass: _vm._$s(
                            "38-" + $30,
                            "sc",
                            "row-actions"
                          ),
                          attrs: { _i: "38-" + $30 },
                        },
                        [
                          _c(
                            "button",
                            {
                              staticClass: _vm._$s(
                                "39-" + $30,
                                "sc",
                                "btn secondary small"
                              ),
                              attrs: { _i: "39-" + $30 },
                              on: {
                                click: function ($event) {
                                  return _vm.toggleUser(u)
                                },
                              },
                            },
                            [
                              _vm._v(
                                _vm._$s(
                                  "39-" + $30,
                                  "t0-0",
                                  _vm._s(u.is_active ? "禁用" : "启用")
                                )
                              ),
                            ]
                          ),
                          _c(
                            "button",
                            {
                              staticClass: _vm._$s(
                                "40-" + $30,
                                "sc",
                                "btn secondary small"
                              ),
                              attrs: { _i: "40-" + $30 },
                              on: {
                                click: function ($event) {
                                  return _vm.toggleRole(u)
                                },
                              },
                            },
                            [
                              _vm._v(
                                _vm._$s(
                                  "40-" + $30,
                                  "t0-0",
                                  _vm._s(u.is_admin ? "转用户" : "设管理员")
                                )
                              ),
                            ]
                          ),
                        ]
                      ),
                    ]
                  )
                }
              ),
            ],
            2
          )
        : _vm._e(),
      _vm._$s(41, "i", _vm.admin)
        ? _c(
            "view",
            { staticClass: _vm._$s(41, "sc", "card"), attrs: { _i: 41 } },
            [
              _c("text", {
                staticClass: _vm._$s(42, "sc", "title"),
                attrs: { _i: 42 },
              }),
              _vm._l(
                _vm._$s(43, "f", { forItems: _vm.comments }),
                function (c, $11, $21, $31) {
                  return _c(
                    "view",
                    {
                      key: _vm._$s(43, "f", { forIndex: $21, key: c.id }),
                      staticClass: _vm._$s("43-" + $31, "sc", "comment"),
                      attrs: { _i: "43-" + $31 },
                    },
                    [
                      _c(
                        "text",
                        {
                          staticClass: _vm._$s(
                            "44-" + $31,
                            "sc",
                            "comment-title"
                          ),
                          attrs: { _i: "44-" + $31 },
                        },
                        [
                          _vm._v(
                            _vm._$s(
                              "44-" + $31,
                              "t0-0",
                              _vm._s(c.book_title || "图书")
                            ) +
                              _vm._$s(
                                "44-" + $31,
                                "t0-1",
                                _vm._s(c.nickname || c.username)
                              )
                          ),
                        ]
                      ),
                      _c(
                        "text",
                        {
                          staticClass: _vm._$s("45-" + $31, "sc", "muted"),
                          attrs: { _i: "45-" + $31 },
                        },
                        [
                          _vm._v(
                            _vm._$s("45-" + $31, "t0-0", _vm._s(c.content))
                          ),
                        ]
                      ),
                      _c(
                        "view",
                        {
                          staticClass: _vm._$s(
                            "46-" + $31,
                            "sc",
                            "row-actions"
                          ),
                          attrs: { _i: "46-" + $31 },
                        },
                        [
                          _c("button", {
                            staticClass: _vm._$s(
                              "47-" + $31,
                              "sc",
                              "btn secondary small"
                            ),
                            attrs: { _i: "47-" + $31 },
                            on: {
                              click: function ($event) {
                                return _vm.pinComment(c)
                              },
                            },
                          }),
                          _c("button", {
                            staticClass: _vm._$s(
                              "48-" + $31,
                              "sc",
                              "btn danger small"
                            ),
                            attrs: { _i: "48-" + $31 },
                            on: {
                              click: function ($event) {
                                return _vm.deleteComment(c)
                              },
                            },
                          }),
                        ]
                      ),
                    ]
                  )
                }
              ),
            ],
            2
          )
        : _vm._e(),
    ]
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),
/* 62 */
/*!***************************************************************************************************************!*\
  !*** E:/翻译漫画/book-main (14)/book-main/frontend-uni/pages/admin/admin.vue?vue&type=script&lang=js&mpType=page ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_1_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_admin_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--7-1!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/using-components.js!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./admin.vue?vue&type=script&lang=js&mpType=page */ 63);\n/* harmony import */ var _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_1_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_admin_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_1_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_admin_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_1_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_admin_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__) if([\"default\"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_1_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_admin_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n /* harmony default export */ __webpack_exports__[\"default\"] = (_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_1_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_admin_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0___default.a); //# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbbnVsbF0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQWdxQixDQUFnQiw4cUJBQUcsRUFBQyIsImZpbGUiOiI2Mi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vSEJ1aWxkZXJYLjUuMDcuMjAyNjA0MTAwNi9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzIS4uLy4uLy4uLy4uLy4uL0hCdWlsZGVyWC41LjA3LjIwMjYwNDEwMDYvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy93ZWJwYWNrLXByZXByb2Nlc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTctMSEuLi8uLi8uLi8uLi8uLi9IQnVpbGRlclguNS4wNy4yMDI2MDQxMDA2L0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvd2VicGFjay11bmktYXBwLWxvYWRlci91c2luZy1jb21wb25lbnRzLmpzIS4uLy4uLy4uLy4uLy4uL0hCdWlsZGVyWC41LjA3LjIwMjYwNDEwMDYvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vYWRtaW4udnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJm1wVHlwZT1wYWdlXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vSEJ1aWxkZXJYLjUuMDcuMjAyNjA0MTAwNi9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzIS4uLy4uLy4uLy4uLy4uL0hCdWlsZGVyWC41LjA3LjIwMjYwNDEwMDYvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy93ZWJwYWNrLXByZXByb2Nlc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTctMSEuLi8uLi8uLi8uLi8uLi9IQnVpbGRlclguNS4wNy4yMDI2MDQxMDA2L0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvd2VicGFjay11bmktYXBwLWxvYWRlci91c2luZy1jb21wb25lbnRzLmpzIS4uLy4uLy4uLy4uLy4uL0hCdWlsZGVyWC41LjA3LjIwMjYwNDEwMDYvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vYWRtaW4udnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJm1wVHlwZT1wYWdlXCIiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///62\n");

/***/ }),
/* 63 */
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--7-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/using-components.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!E:/翻译漫画/book-main (14)/book-main/frontend-uni/pages/admin/admin.vue?vue&type=script&lang=js&mpType=page ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\nvar _request = __webpack_require__(/*! ../../api/request.js */ 17);\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\nvar _default = {\n  data: function data() {\n    return {\n      admin: false,\n      dashboard: null,\n      users: [],\n      comments: [],\n      userQ: '',\n      error: ''\n    };\n  },\n  onShow: function onShow() {\n    this.admin = (0, _request.isAdmin)();\n    if (this.admin) this.load();\n  },\n  methods: {\n    d: function d(key) {\n      return this.dashboard && (this.dashboard.cards && this.dashboard.cards[key] || this.dashboard[key] || this.dashboard[key + '_count']) || 0;\n    },\n    load: function load() {\n      var that = this;\n      that.error = '';\n      if (!(0, _request.isAdmin)()) {\n        that.admin = false;\n        return;\n      }\n      that.admin = true;\n      Promise.all([(0, _request.request)('/admin/dashboard'), (0, _request.request)('/admin/users'), (0, _request.request)('/ecosystem/admin/comments?limit=20')]).then(function (res) {\n        that.dashboard = res[0] || {};\n        that.users = res[1] && res[1].items || [];\n        that.comments = res[2] && res[2].items || [];\n      }).catch(function (e) {\n        that.error = e.message || '管理数据加载失败';\n      });\n    },\n    loadUsers: function loadUsers() {\n      var that = this;\n      (0, _request.request)('/admin/users' + (that.userQ ? '?q=' + encodeURIComponent(that.userQ) : '')).then(function (res) {\n        that.users = res && res.items || [];\n      }).catch(function (e) {\n        (0, _request.showError)(e, '用户加载失败');\n      });\n    },\n    toggleUser: function toggleUser(u) {\n      var that = this;\n      (0, _request.request)('/admin/users/' + u.id + '/status', {\n        method: 'PUT',\n        data: {\n          is_active: !u.is_active\n        }\n      }).then(function () {\n        that.loadUsers();\n      }).catch(function (e) {\n        (0, _request.showError)(e, '操作失败');\n      });\n    },\n    toggleRole: function toggleRole(u) {\n      var that = this;\n      (0, _request.request)('/admin/users/' + u.id + '/role', {\n        method: 'PUT',\n        data: {\n          is_admin: !u.is_admin\n        }\n      }).then(function () {\n        that.loadUsers();\n      }).catch(function (e) {\n        (0, _request.showError)(e, '操作失败');\n      });\n    },\n    pinComment: function pinComment(c) {\n      var that = this;\n      (0, _request.request)('/ecosystem/admin/comments/' + c.id + '/pin', {\n        method: 'POST'\n      }).then(function () {\n        that.load();\n      }).catch(function (e) {\n        (0, _request.showError)(e, '操作失败');\n      });\n    },\n    deleteComment: function deleteComment(c) {\n      var that = this;\n      uni.showModal({\n        title: '确认删除',\n        content: '确定删除这条评论吗？',\n        success: function success(res) {\n          if (res.confirm) (0, _request.request)('/ecosystem/admin/comments/' + c.id, {\n            method: 'DELETE'\n          }).then(function () {\n            that.load();\n          }).catch(function (e) {\n            (0, _request.showError)(e, '删除失败');\n          });\n        }\n      });\n    },\n    syncGraph: function syncGraph() {\n      (0, _request.request)('/graph/admin/sync', {\n        method: 'POST'\n      }).then(function () {\n        uni.showToast({\n          title: '已同步'\n        });\n      }).catch(function (e) {\n        (0, _request.showError)(e, '同步失败');\n      });\n    },\n    precompute: function precompute() {\n      (0, _request.request)('/recommend/admin/precompute-itemcf', {\n        method: 'POST'\n      }).then(function () {\n        uni.showToast({\n          title: '已完成'\n        });\n      }).catch(function (e) {\n        (0, _request.showError)(e, '操作失败');\n      });\n    },\n    goLogin: function goLogin() {\n      uni.navigateTo({\n        url: '/pages/login/login'\n      });\n    },\n    openWebAdmin: function openWebAdmin() {\n      uni.showModal({\n        title: '网页后台地址',\n        content: _request.ORIGIN + '/admin',\n        showCancel: false\n      });\n    }\n  }\n};\nexports.default = _default;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVuaS1hcHA6Ly8vcGFnZXMvYWRtaW4vYWRtaW4udnVlIl0sIm5hbWVzIjpbImRhdGEiLCJhZG1pbiIsImRhc2hib2FyZCIsInVzZXJzIiwiY29tbWVudHMiLCJ1c2VyUSIsImVycm9yIiwib25TaG93IiwibWV0aG9kcyIsImQiLCJsb2FkIiwidGhhdCIsIlByb21pc2UiLCJsb2FkVXNlcnMiLCJ0b2dnbGVVc2VyIiwibWV0aG9kIiwiaXNfYWN0aXZlIiwidG9nZ2xlUm9sZSIsImlzX2FkbWluIiwicGluQ29tbWVudCIsImRlbGV0ZUNvbW1lbnQiLCJ1bmkiLCJ0aXRsZSIsImNvbnRlbnQiLCJzdWNjZXNzIiwic3luY0dyYXBoIiwicHJlY29tcHV0ZSIsImdvTG9naW4iLCJ1cmwiLCJvcGVuV2ViQWRtaW4iLCJzaG93Q2FuY2VsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFxREE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2VBQ0E7RUFDQUE7SUFBQTtNQUFBQztNQUFBQztNQUFBQztNQUFBQztNQUFBQztNQUFBQztJQUFBO0VBQUE7RUFDQUM7SUFBQTtJQUFBO0VBQUE7RUFDQUM7SUFDQUM7TUFBQTtJQUFBO0lBQ0FDO01BQ0E7TUFBQUM7TUFDQTtRQUFBQTtRQUFBO01BQUE7TUFDQUE7TUFDQUM7UUFDQUQ7UUFDQUE7UUFDQUE7TUFDQTtRQUFBQTtNQUFBO0lBQ0E7SUFDQUU7TUFBQTtNQUFBO1FBQUFGO01BQUE7UUFBQTtNQUFBO0lBQUE7SUFDQUc7TUFBQTtNQUFBO1FBQUFDO1FBQUFmO1VBQUFnQjtRQUFBO01BQUE7UUFBQUw7TUFBQTtRQUFBO01BQUE7SUFBQTtJQUNBTTtNQUFBO01BQUE7UUFBQUY7UUFBQWY7VUFBQWtCO1FBQUE7TUFBQTtRQUFBUDtNQUFBO1FBQUE7TUFBQTtJQUFBO0lBQ0FRO01BQUE7TUFBQTtRQUFBSjtNQUFBO1FBQUFKO01BQUE7UUFBQTtNQUFBO0lBQUE7SUFDQVM7TUFBQTtNQUFBQztRQUFBQztRQUFBQztRQUFBQztVQUFBO1lBQUFUO1VBQUE7WUFBQUo7VUFBQTtZQUFBO1VBQUE7UUFBQTtNQUFBO0lBQUE7SUFDQWM7TUFBQTtRQUFBVjtNQUFBO1FBQUFNO1VBQUFDO1FBQUE7TUFBQTtRQUFBO01BQUE7SUFBQTtJQUNBSTtNQUFBO1FBQUFYO01BQUE7UUFBQU07VUFBQUM7UUFBQTtNQUFBO1FBQUE7TUFBQTtJQUFBO0lBQ0FLO01BQUFOO1FBQUFPO01BQUE7SUFBQTtJQUNBQztNQUFBUjtRQUFBQztRQUFBQztRQUFBTztNQUFBO0lBQUE7RUFDQTtBQUNBO0FBQUEiLCJmaWxlIjoiNjMuanMiLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XG4gIDx2aWV3IGNsYXNzPVwiY29udGFpbmVyXCI+XG4gICAgPHZpZXcgY2xhc3M9XCJjYXJkXCI+XG4gICAgICA8dGV4dCBjbGFzcz1cInRpdGxlXCI+56e75Yqo56uv566h55CG5ZCO5Y+wPC90ZXh0PlxuICAgICAgPHRleHQgY2xhc3M9XCJtdXRlZFwiPuaPkOS+m+aVsOaNruaAu+iniOOAgeeUqOaIt+OAgeivhOiuuuOAgeaOqOiNkOadg+mHjeWSjOWbvuiwseWQjOatpeetieW4uOeUqOeuoeeQhuWKn+iDveOAguWkjeadguWbvuS5pue8lui+keS7jeW7uuiuruS9v+eUqOe9kemhteWQjuWPsOOAgjwvdGV4dD5cbiAgICAgIDxidXR0b24gY2xhc3M9XCJidG5cIiBAY2xpY2s9XCJsb2FkXCI+5Yi35paw5pWw5o2uPC9idXR0b24+XG4gICAgPC92aWV3PlxuXG4gICAgPHZpZXcgdi1pZj1cIiFhZG1pblwiIGNsYXNzPVwiY2FyZFwiPlxuICAgICAgPHRleHQgY2xhc3M9XCJtdXRlZFwiPuW9k+WJjei0puWPt+S4jeaYr+euoeeQhuWRmO+8jOivt+S9v+eUqOeuoeeQhuWRmOi0puWPt+eZu+W9leWQjuafpeeci+OAgjwvdGV4dD5cbiAgICAgIDxidXR0b24gY2xhc3M9XCJidG5cIiBAY2xpY2s9XCJnb0xvZ2luXCI+5Y6755m75b2VPC9idXR0b24+XG4gICAgPC92aWV3PlxuXG4gICAgPHZpZXcgdi1pZj1cImVycm9yXCIgY2xhc3M9XCJjYXJkXCI+PHRleHQgY2xhc3M9XCJtdXRlZFwiPnt7IGVycm9yIH19PC90ZXh0Pjwvdmlldz5cblxuICAgIDx2aWV3IHYtaWY9XCJhZG1pbiAmJiBkYXNoYm9hcmRcIiBjbGFzcz1cImNhcmRcIj5cbiAgICAgIDx0ZXh0IGNsYXNzPVwidGl0bGVcIj7mlbDmja7mgLvop4g8L3RleHQ+XG4gICAgICA8dmlldyBjbGFzcz1cInN0YXQtZ3JpZFwiPlxuICAgICAgICA8dmlldyBjbGFzcz1cInN0YXQtaXRlbVwiPjx0ZXh0IGNsYXNzPVwic3RhdC1udW1cIj57eyBkKCd1c2VycycpIH19PC90ZXh0Pjx0ZXh0IGNsYXNzPVwibXV0ZWRcIj7nlKjmiLc8L3RleHQ+PC92aWV3PlxuICAgICAgICA8dmlldyBjbGFzcz1cInN0YXQtaXRlbVwiPjx0ZXh0IGNsYXNzPVwic3RhdC1udW1cIj57eyBkKCdib29rcycpIH19PC90ZXh0Pjx0ZXh0IGNsYXNzPVwibXV0ZWRcIj7lm77kuaY8L3RleHQ+PC92aWV3PlxuICAgICAgICA8dmlldyBjbGFzcz1cInN0YXQtaXRlbVwiPjx0ZXh0IGNsYXNzPVwic3RhdC1udW1cIj57eyBkKCdjb21tZW50cycpIH19PC90ZXh0Pjx0ZXh0IGNsYXNzPVwibXV0ZWRcIj7or4Torro8L3RleHQ+PC92aWV3PlxuICAgICAgICA8dmlldyBjbGFzcz1cInN0YXQtaXRlbVwiPjx0ZXh0IGNsYXNzPVwic3RhdC1udW1cIj57eyBkKCdmZWVkYmFja3MnKSB9fTwvdGV4dD48dGV4dCBjbGFzcz1cIm11dGVkXCI+5Y+N6aaIPC90ZXh0Pjwvdmlldz5cbiAgICAgIDwvdmlldz5cbiAgICA8L3ZpZXc+XG5cbiAgICA8dmlldyB2LWlmPVwiYWRtaW5cIiBjbGFzcz1cImNhcmRcIj5cbiAgICAgIDx0ZXh0IGNsYXNzPVwidGl0bGVcIj7lv6vmjbfmk43kvZw8L3RleHQ+XG4gICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuXCIgQGNsaWNrPVwic3luY0dyYXBoXCI+5ZCM5q2l55+l6K+G5Zu+6LCxPC9idXR0b24+XG4gICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIHNlY29uZGFyeVwiIEBjbGljaz1cInByZWNvbXB1dGVcIj7pooTorqHnrpcgSXRlbUNGPC9idXR0b24+XG4gICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIHNlY29uZGFyeVwiIEBjbGljaz1cIm9wZW5XZWJBZG1pblwiPuaJk+W8gOe9kemhteWQjuWPsOWcsOWdgDwvYnV0dG9uPlxuICAgIDwvdmlldz5cblxuICAgIDx2aWV3IHYtaWY9XCJhZG1pblwiIGNsYXNzPVwiY2FyZFwiPlxuICAgICAgPHRleHQgY2xhc3M9XCJ0aXRsZVwiPueUqOaIt+euoeeQhjwvdGV4dD5cbiAgICAgIDx2aWV3IGNsYXNzPVwic2VhcmNoLXJvd1wiPjxpbnB1dCBjbGFzcz1cImlucHV0XCIgdi1tb2RlbD1cInVzZXJRXCIgcGxhY2Vob2xkZXI9XCLmkJzntKLnlKjmiLdcIiAvPjxidXR0b24gY2xhc3M9XCJidG4gc21hbGxcIiBAY2xpY2s9XCJsb2FkVXNlcnNcIj7mkJzntKI8L2J1dHRvbj48L3ZpZXc+XG4gICAgICA8dmlldyBjbGFzcz1cInVzZXJcIiB2LWZvcj1cInUgaW4gdXNlcnNcIiA6a2V5PVwidS5pZFwiPlxuICAgICAgICA8dGV4dCBjbGFzcz1cInVzZXItbmFtZVwiPnt7IHUudXNlcm5hbWUgfX0gwrcge3sgdS5pc19hZG1pbiA/ICfnrqHnkIblkZgnIDogJ+eUqOaItycgfX08L3RleHQ+XG4gICAgICAgIDx0ZXh0IGNsYXNzPVwibXV0ZWRcIj57eyB1LmVtYWlsIHx8ICcnIH19IMK3IHt7IHUuaXNfYWN0aXZlID8gJ+WQr+eUqCcgOiAn56aB55SoJyB9fTwvdGV4dD5cbiAgICAgICAgPHZpZXcgY2xhc3M9XCJyb3ctYWN0aW9uc1wiPjxidXR0b24gY2xhc3M9XCJidG4gc2Vjb25kYXJ5IHNtYWxsXCIgQGNsaWNrPVwidG9nZ2xlVXNlcih1KVwiPnt7IHUuaXNfYWN0aXZlID8gJ+emgeeUqCcgOiAn5ZCv55SoJyB9fTwvYnV0dG9uPjxidXR0b24gY2xhc3M9XCJidG4gc2Vjb25kYXJ5IHNtYWxsXCIgQGNsaWNrPVwidG9nZ2xlUm9sZSh1KVwiPnt7IHUuaXNfYWRtaW4gPyAn6L2s55So5oi3JyA6ICforr7nrqHnkIblkZgnIH19PC9idXR0b24+PC92aWV3PlxuICAgICAgPC92aWV3PlxuICAgIDwvdmlldz5cblxuICAgIDx2aWV3IHYtaWY9XCJhZG1pblwiIGNsYXNzPVwiY2FyZFwiPlxuICAgICAgPHRleHQgY2xhc3M9XCJ0aXRsZVwiPuivhOiuuueuoeeQhjwvdGV4dD5cbiAgICAgIDx2aWV3IGNsYXNzPVwiY29tbWVudFwiIHYtZm9yPVwiYyBpbiBjb21tZW50c1wiIDprZXk9XCJjLmlkXCI+XG4gICAgICAgIDx0ZXh0IGNsYXNzPVwiY29tbWVudC10aXRsZVwiPnt7IGMuYm9va190aXRsZSB8fCAn5Zu+5LmmJyB9fSDCtyB7eyBjLm5pY2tuYW1lIHx8IGMudXNlcm5hbWUgfX08L3RleHQ+XG4gICAgICAgIDx0ZXh0IGNsYXNzPVwibXV0ZWRcIj57eyBjLmNvbnRlbnQgfX08L3RleHQ+XG4gICAgICAgIDx2aWV3IGNsYXNzPVwicm93LWFjdGlvbnNcIj48YnV0dG9uIGNsYXNzPVwiYnRuIHNlY29uZGFyeSBzbWFsbFwiIEBjbGljaz1cInBpbkNvbW1lbnQoYylcIj7nva7pobYv5Y+W5raIPC9idXR0b24+PGJ1dHRvbiBjbGFzcz1cImJ0biBkYW5nZXIgc21hbGxcIiBAY2xpY2s9XCJkZWxldGVDb21tZW50KGMpXCI+5Yig6ZmkPC9idXR0b24+PC92aWV3PlxuICAgICAgPC92aWV3PlxuICAgIDwvdmlldz5cbiAgPC92aWV3PlxuPC90ZW1wbGF0ZT5cbjxzY3JpcHQ+XG5pbXBvcnQgeyByZXF1ZXN0LCBnZXRVc2VyLCBpc0FkbWluLCBPUklHSU4sIHNob3dFcnJvciB9IGZyb20gJy4uLy4uL2FwaS9yZXF1ZXN0LmpzJ1xuZXhwb3J0IGRlZmF1bHQge1xuICBkYXRhOiBmdW5jdGlvbiAoKSB7IHJldHVybiB7IGFkbWluOiBmYWxzZSwgZGFzaGJvYXJkOiBudWxsLCB1c2VyczogW10sIGNvbW1lbnRzOiBbXSwgdXNlclE6ICcnLCBlcnJvcjogJycgfSB9LFxuICBvblNob3c6IGZ1bmN0aW9uICgpIHsgdGhpcy5hZG1pbiA9IGlzQWRtaW4oKTsgaWYgKHRoaXMuYWRtaW4pIHRoaXMubG9hZCgpIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBkOiBmdW5jdGlvbiAoa2V5KSB7IHJldHVybiAodGhpcy5kYXNoYm9hcmQgJiYgKCh0aGlzLmRhc2hib2FyZC5jYXJkcyAmJiB0aGlzLmRhc2hib2FyZC5jYXJkc1trZXldKSB8fCB0aGlzLmRhc2hib2FyZFtrZXldIHx8IHRoaXMuZGFzaGJvYXJkW2tleSArICdfY291bnQnXSkpIHx8IDAgfSxcbiAgICBsb2FkOiBmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zdCB0aGF0ID0gdGhpczsgdGhhdC5lcnJvciA9ICcnXG4gICAgICBpZiAoIWlzQWRtaW4oKSkgeyB0aGF0LmFkbWluID0gZmFsc2U7IHJldHVybiB9XG4gICAgICB0aGF0LmFkbWluID0gdHJ1ZVxuICAgICAgUHJvbWlzZS5hbGwoW3JlcXVlc3QoJy9hZG1pbi9kYXNoYm9hcmQnKSwgcmVxdWVzdCgnL2FkbWluL3VzZXJzJyksIHJlcXVlc3QoJy9lY29zeXN0ZW0vYWRtaW4vY29tbWVudHM/bGltaXQ9MjAnKV0pLnRoZW4oZnVuY3Rpb24gKHJlcykge1xuICAgICAgICB0aGF0LmRhc2hib2FyZCA9IHJlc1swXSB8fCB7fVxuICAgICAgICB0aGF0LnVzZXJzID0gKHJlc1sxXSAmJiByZXNbMV0uaXRlbXMpIHx8IFtdXG4gICAgICAgIHRoYXQuY29tbWVudHMgPSAocmVzWzJdICYmIHJlc1syXS5pdGVtcykgfHwgW11cbiAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlKSB7IHRoYXQuZXJyb3IgPSBlLm1lc3NhZ2UgfHwgJ+euoeeQhuaVsOaNruWKoOi9veWksei0pScgfSlcbiAgICB9LFxuICAgIGxvYWRVc2VyczogZnVuY3Rpb24gKCkgeyBjb25zdCB0aGF0ID0gdGhpczsgcmVxdWVzdCgnL2FkbWluL3VzZXJzJyArICh0aGF0LnVzZXJRID8gJz9xPScgKyBlbmNvZGVVUklDb21wb25lbnQodGhhdC51c2VyUSkgOiAnJykpLnRoZW4oZnVuY3Rpb24gKHJlcykgeyB0aGF0LnVzZXJzID0gKHJlcyAmJiByZXMuaXRlbXMpIHx8IFtdIH0pLmNhdGNoKGZ1bmN0aW9uIChlKSB7IHNob3dFcnJvcihlLCAn55So5oi35Yqg6L295aSx6LSlJykgfSkgfSxcbiAgICB0b2dnbGVVc2VyOiBmdW5jdGlvbiAodSkgeyBjb25zdCB0aGF0ID0gdGhpczsgcmVxdWVzdCgnL2FkbWluL3VzZXJzLycgKyB1LmlkICsgJy9zdGF0dXMnLCB7IG1ldGhvZDogJ1BVVCcsIGRhdGE6IHsgaXNfYWN0aXZlOiAhdS5pc19hY3RpdmUgfSB9KS50aGVuKGZ1bmN0aW9uICgpIHsgdGhhdC5sb2FkVXNlcnMoKSB9KS5jYXRjaChmdW5jdGlvbiAoZSkgeyBzaG93RXJyb3IoZSwgJ+aTjeS9nOWksei0pScpIH0pIH0sXG4gICAgdG9nZ2xlUm9sZTogZnVuY3Rpb24gKHUpIHsgY29uc3QgdGhhdCA9IHRoaXM7IHJlcXVlc3QoJy9hZG1pbi91c2Vycy8nICsgdS5pZCArICcvcm9sZScsIHsgbWV0aG9kOiAnUFVUJywgZGF0YTogeyBpc19hZG1pbjogIXUuaXNfYWRtaW4gfSB9KS50aGVuKGZ1bmN0aW9uICgpIHsgdGhhdC5sb2FkVXNlcnMoKSB9KS5jYXRjaChmdW5jdGlvbiAoZSkgeyBzaG93RXJyb3IoZSwgJ+aTjeS9nOWksei0pScpIH0pIH0sXG4gICAgcGluQ29tbWVudDogZnVuY3Rpb24gKGMpIHsgY29uc3QgdGhhdCA9IHRoaXM7IHJlcXVlc3QoJy9lY29zeXN0ZW0vYWRtaW4vY29tbWVudHMvJyArIGMuaWQgKyAnL3BpbicsIHsgbWV0aG9kOiAnUE9TVCcgfSkudGhlbihmdW5jdGlvbiAoKSB7IHRoYXQubG9hZCgpIH0pLmNhdGNoKGZ1bmN0aW9uIChlKSB7IHNob3dFcnJvcihlLCAn5pON5L2c5aSx6LSlJykgfSkgfSxcbiAgICBkZWxldGVDb21tZW50OiBmdW5jdGlvbiAoYykgeyBjb25zdCB0aGF0ID0gdGhpczsgdW5pLnNob3dNb2RhbCh7IHRpdGxlOiAn56Gu6K6k5Yig6ZmkJywgY29udGVudDogJ+ehruWumuWIoOmZpOi/meadoeivhOiuuuWQl++8nycsIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHsgaWYgKHJlcy5jb25maXJtKSByZXF1ZXN0KCcvZWNvc3lzdGVtL2FkbWluL2NvbW1lbnRzLycgKyBjLmlkLCB7IG1ldGhvZDogJ0RFTEVURScgfSkudGhlbihmdW5jdGlvbiAoKSB7IHRoYXQubG9hZCgpIH0pLmNhdGNoKGZ1bmN0aW9uIChlKSB7IHNob3dFcnJvcihlLCAn5Yig6Zmk5aSx6LSlJykgfSkgfSB9KSB9LFxuICAgIHN5bmNHcmFwaDogZnVuY3Rpb24gKCkgeyByZXF1ZXN0KCcvZ3JhcGgvYWRtaW4vc3luYycsIHsgbWV0aG9kOiAnUE9TVCcgfSkudGhlbihmdW5jdGlvbiAoKSB7IHVuaS5zaG93VG9hc3QoeyB0aXRsZTogJ+W3suWQjOatpScgfSkgfSkuY2F0Y2goZnVuY3Rpb24gKGUpIHsgc2hvd0Vycm9yKGUsICflkIzmraXlpLHotKUnKSB9KSB9LFxuICAgIHByZWNvbXB1dGU6IGZ1bmN0aW9uICgpIHsgcmVxdWVzdCgnL3JlY29tbWVuZC9hZG1pbi9wcmVjb21wdXRlLWl0ZW1jZicsIHsgbWV0aG9kOiAnUE9TVCcgfSkudGhlbihmdW5jdGlvbiAoKSB7IHVuaS5zaG93VG9hc3QoeyB0aXRsZTogJ+W3suWujOaIkCcgfSkgfSkuY2F0Y2goZnVuY3Rpb24gKGUpIHsgc2hvd0Vycm9yKGUsICfmk43kvZzlpLHotKUnKSB9KSB9LFxuICAgIGdvTG9naW46IGZ1bmN0aW9uICgpIHsgdW5pLm5hdmlnYXRlVG8oeyB1cmw6ICcvcGFnZXMvbG9naW4vbG9naW4nIH0pIH0sXG4gICAgb3BlbldlYkFkbWluOiBmdW5jdGlvbiAoKSB7IHVuaS5zaG93TW9kYWwoeyB0aXRsZTogJ+e9kemhteWQjuWPsOWcsOWdgCcsIGNvbnRlbnQ6IE9SSUdJTiArICcvYWRtaW4nLCBzaG93Q2FuY2VsOiBmYWxzZSB9KSB9XG4gIH1cbn1cbjwvc2NyaXB0PlxuPHN0eWxlIHNjb3BlZD5cbi5zZWFyY2gtcm93e2Rpc3BsYXk6ZmxleDtnYXA6MTJycHg7bWFyZ2luLWJvdHRvbToxOHJweH0uc2VhcmNoLXJvdyAuaW5wdXR7ZmxleDoxfS51c2VyLC5jb21tZW50e3BhZGRpbmc6MThycHggMDtib3JkZXItYm90dG9tOjFycHggc29saWQgI2VlZjJmN30udXNlci1uYW1lLC5jb21tZW50LXRpdGxle2Rpc3BsYXk6YmxvY2s7Zm9udC1zaXplOjI4cnB4O2NvbG9yOiMxMTE4Mjc7Zm9udC13ZWlnaHQ6OTAwO21hcmdpbi1ib3R0b206OHJweH0ucm93LWFjdGlvbnN7ZGlzcGxheTpmbGV4O2dhcDoxMnJweDttYXJnaW4tdG9wOjEycnB4fS5yb3ctYWN0aW9ucyAuYnRue2ZsZXg6MX1cbjwvc3R5bGU+XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///63\n");

/***/ }),
/* 64 */
/*!*************************************************************************************!*\
  !*** E:/翻译漫画/book-main (14)/book-main/frontend-uni/pages/chat/chat.vue?mpType=page ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _chat_vue_vue_type_template_id_e057ff54_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chat.vue?vue&type=template&id=e057ff54&scoped=true&mpType=page */ 65);\n/* harmony import */ var _chat_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./chat.vue?vue&type=script&lang=js&mpType=page */ 67);\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _chat_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__) if([\"default\"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _chat_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n/* harmony import */ var _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 18);\n\nvar renderjs\n\n\n\n\n/* normalize component */\n\nvar component = Object(_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\n  _chat_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _chat_vue_vue_type_template_id_e057ff54_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _chat_vue_vue_type_template_id_e057ff54_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  \"e057ff54\",\n  null,\n  false,\n  _chat_vue_vue_type_template_id_e057ff54_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__[\"components\"],\n  renderjs\n)\n\ncomponent.options.__file = \"pages/chat/chat.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbbnVsbF0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBd0k7QUFDeEk7QUFDbUU7QUFDTDs7O0FBRzlEO0FBQ2dNO0FBQ2hNLGdCQUFnQix1TUFBVTtBQUMxQixFQUFFLHFGQUFNO0FBQ1IsRUFBRSxzR0FBTTtBQUNSLEVBQUUsK0dBQWU7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUUsMEdBQVU7QUFDWjtBQUNBOztBQUVBO0FBQ2UsZ0YiLCJmaWxlIjoiNjQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucywgcmVjeWNsYWJsZVJlbmRlciwgY29tcG9uZW50cyB9IGZyb20gXCIuL2NoYXQudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPWUwNTdmZjU0JnNjb3BlZD10cnVlJm1wVHlwZT1wYWdlXCJcbnZhciByZW5kZXJqc1xuaW1wb3J0IHNjcmlwdCBmcm9tIFwiLi9jaGF0LnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZtcFR5cGU9cGFnZVwiXG5leHBvcnQgKiBmcm9tIFwiLi9jaGF0LnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZtcFR5cGU9cGFnZVwiXG5cblxuLyogbm9ybWFsaXplIGNvbXBvbmVudCAqL1xuaW1wb3J0IG5vcm1hbGl6ZXIgZnJvbSBcIiEuLi8uLi8uLi8uLi8uLi9IQnVpbGRlclguNS4wNy4yMDI2MDQxMDA2L0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvdnVlLWxvYWRlci9saWIvcnVudGltZS9jb21wb25lbnROb3JtYWxpemVyLmpzXCJcbnZhciBjb21wb25lbnQgPSBub3JtYWxpemVyKFxuICBzY3JpcHQsXG4gIHJlbmRlcixcbiAgc3RhdGljUmVuZGVyRm5zLFxuICBmYWxzZSxcbiAgbnVsbCxcbiAgXCJlMDU3ZmY1NFwiLFxuICBudWxsLFxuICBmYWxzZSxcbiAgY29tcG9uZW50cyxcbiAgcmVuZGVyanNcbilcblxuY29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJwYWdlcy9jaGF0L2NoYXQudnVlXCJcbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudC5leHBvcnRzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///64\n");

/***/ }),
/* 65 */
/*!*******************************************************************************************************************************!*\
  !*** E:/翻译漫画/book-main (14)/book-main/frontend-uni/pages/chat/chat.vue?vue&type=template&id=e057ff54&scoped=true&mpType=page ***!
  \*******************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_0_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_chat_vue_vue_type_template_id_e057ff54_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--11-0!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/filter-modules-template.js!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./chat.vue?vue&type=template&id=e057ff54&scoped=true&mpType=page */ 66);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_0_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_chat_vue_vue_type_template_id_e057ff54_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_0_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_chat_vue_vue_type_template_id_e057ff54_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_0_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_chat_vue_vue_type_template_id_e057ff54_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_0_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_chat_vue_vue_type_template_id_e057ff54_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),
/* 66 */
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--11-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/filter-modules-template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!E:/翻译漫画/book-main (14)/book-main/frontend-uni/pages/chat/chat.vue?vue&type=template&id=e057ff54&scoped=true&mpType=page ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "view",
    { staticClass: _vm._$s(0, "sc", "chat-page"), attrs: { _i: 0 } },
    [
      _c(
        "scroll-view",
        {
          staticClass: _vm._$s(1, "sc", "messages"),
          attrs: {
            "scroll-top": _vm._$s(1, "a-scroll-top", _vm.scrollTop),
            _i: 1,
          },
        },
        [
          _vm._$s(2, "i", _vm.messages.length === 0)
            ? _c(
                "view",
                {
                  staticClass: _vm._$s(2, "sc", "welcome card"),
                  attrs: { _i: 2 },
                },
                [
                  _c("text", {
                    staticClass: _vm._$s(3, "sc", "title"),
                    attrs: { _i: 3 },
                  }),
                  _c("text", {
                    staticClass: _vm._$s(4, "sc", "muted"),
                    attrs: { _i: 4 },
                  }),
                  _c(
                    "view",
                    {
                      staticClass: _vm._$s(5, "sc", "chips"),
                      attrs: { _i: 5 },
                    },
                    [
                      _c("text", {
                        staticClass: _vm._$s(6, "sc", "chip"),
                        attrs: { _i: 6 },
                        on: {
                          click: function ($event) {
                            return _vm.quick("推荐几本人工智能入门书")
                          },
                        },
                      }),
                      _c("text", {
                        staticClass: _vm._$s(7, "sc", "chip"),
                        attrs: { _i: 7 },
                        on: {
                          click: function ($event) {
                            return _vm.quick("推荐几本科幻小说")
                          },
                        },
                      }),
                      _c("text", {
                        staticClass: _vm._$s(8, "sc", "chip"),
                        attrs: { _i: 8 },
                        on: {
                          click: function ($event) {
                            return _vm.quick("怎么管理书架？")
                          },
                        },
                      }),
                    ]
                  ),
                ]
              )
            : _vm._e(),
          _vm._l(
            _vm._$s(9, "f", { forItems: _vm.messages }),
            function (m, idx, $20, $30) {
              return _c(
                "view",
                {
                  key: _vm._$s(9, "f", { forIndex: $20, key: idx }),
                  class: _vm._$s(
                    "9-" + $30,
                    "c",
                    m.role === "user" ? "msg user" : "msg bot"
                  ),
                  attrs: { _i: "9-" + $30 },
                },
                [
                  _c(
                    "text",
                    {
                      staticClass: _vm._$s("10-" + $30, "sc", "msg-text"),
                      attrs: { _i: "10-" + $30 },
                    },
                    [_vm._v(_vm._$s("10-" + $30, "t0-0", _vm._s(m.content)))]
                  ),
                ]
              )
            }
          ),
          _vm._l(
            _vm._$s(11, "f", { forItems: _vm.books }),
            function (b, $11, $21, $31) {
              return _c("BookCard", {
                key: _vm._$s(11, "f", { forIndex: $21, key: b.id }),
                attrs: { book: b, _i: "11-" + $31 },
                on: { click: _vm.goDetail },
              })
            }
          ),
        ],
        2
      ),
      _c(
        "view",
        { staticClass: _vm._$s(12, "sc", "input-bar"), attrs: { _i: 12 } },
        [
          _c("input", {
            directives: [
              {
                name: "model",
                rawName: "v-model",
                value: _vm.text,
                expression: "text",
              },
            ],
            staticClass: _vm._$s(13, "sc", "input"),
            attrs: { _i: 13 },
            domProps: { value: _vm._$s(13, "v-model", _vm.text) },
            on: {
              confirm: _vm.send,
              input: function ($event) {
                if ($event.target.composing) {
                  return
                }
                _vm.text = $event.target.value
              },
            },
          }),
          _c("button", {
            staticClass: _vm._$s(14, "sc", "btn send"),
            attrs: { _i: 14 },
            on: { click: _vm.send },
          }),
        ]
      ),
    ]
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),
/* 67 */
/*!*************************************************************************************************************!*\
  !*** E:/翻译漫画/book-main (14)/book-main/frontend-uni/pages/chat/chat.vue?vue&type=script&lang=js&mpType=page ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_1_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_chat_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--7-1!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/using-components.js!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./chat.vue?vue&type=script&lang=js&mpType=page */ 68);\n/* harmony import */ var _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_1_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_chat_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_1_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_chat_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_1_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_chat_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__) if([\"default\"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_1_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_chat_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n /* harmony default export */ __webpack_exports__[\"default\"] = (_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_1_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_chat_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0___default.a); //# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbbnVsbF0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQStwQixDQUFnQiw2cUJBQUcsRUFBQyIsImZpbGUiOiI2Ny5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vSEJ1aWxkZXJYLjUuMDcuMjAyNjA0MTAwNi9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzIS4uLy4uLy4uLy4uLy4uL0hCdWlsZGVyWC41LjA3LjIwMjYwNDEwMDYvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy93ZWJwYWNrLXByZXByb2Nlc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTctMSEuLi8uLi8uLi8uLi8uLi9IQnVpbGRlclguNS4wNy4yMDI2MDQxMDA2L0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvd2VicGFjay11bmktYXBwLWxvYWRlci91c2luZy1jb21wb25lbnRzLmpzIS4uLy4uLy4uLy4uLy4uL0hCdWlsZGVyWC41LjA3LjIwMjYwNDEwMDYvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vY2hhdC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmbXBUeXBlPXBhZ2VcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi9IQnVpbGRlclguNS4wNy4yMDI2MDQxMDA2L0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanMhLi4vLi4vLi4vLi4vLi4vSEJ1aWxkZXJYLjUuMDcuMjAyNjA0MTAwNi9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vdnVlLWNsaS1wbHVnaW4tdW5pL3BhY2thZ2VzL3dlYnBhY2stcHJlcHJvY2Vzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tNy0xIS4uLy4uLy4uLy4uLy4uL0hCdWlsZGVyWC41LjA3LjIwMjYwNDEwMDYvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy93ZWJwYWNrLXVuaS1hcHAtbG9hZGVyL3VzaW5nLWNvbXBvbmVudHMuanMhLi4vLi4vLi4vLi4vLi4vSEJ1aWxkZXJYLjUuMDcuMjAyNjA0MTAwNi9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vdnVlLWNsaS1wbHVnaW4tdW5pL3BhY2thZ2VzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9jaGF0LnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZtcFR5cGU9cGFnZVwiIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///67\n");

/***/ }),
/* 68 */
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--7-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/using-components.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!E:/翻译漫画/book-main (14)/book-main/frontend-uni/pages/chat/chat.vue?vue&type=script&lang=js&mpType=page ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 1);\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\nvar _BookCard = _interopRequireDefault(__webpack_require__(/*! ../../components/BookCard.vue */ 12));\nvar _request = __webpack_require__(/*! ../../api/request.js */ 17);\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\nvar _default = {\n  components: {\n    BookCard: _BookCard.default\n  },\n  data: function data() {\n    return {\n      text: '',\n      messages: [],\n      books: [],\n      sending: false,\n      scrollTop: 0\n    };\n  },\n  methods: {\n    quick: function quick(t) {\n      this.text = t;\n      this.send();\n    },\n    send: function send() {\n      var that = this;\n      var msg = that.text.trim();\n      if (!msg || that.sending) return;\n      that.text = '';\n      that.sending = true;\n      that.books = [];\n      that.messages.push({\n        role: 'user',\n        content: msg\n      });\n      (0, _request.request)('/chat/send', {\n        method: 'POST',\n        data: {\n          message: msg\n        }\n      }).then(function (res) {\n        that.messages.push({\n          role: 'assistant',\n          content: res.answer || '暂时没有回答。'\n        });\n        that.books = (0, _request.normalizeBooks)(res.books || []);\n        setTimeout(function () {\n          that.scrollTop += 9999;\n        }, 100);\n      }).catch(function (e) {\n        (0, _request.showError)(e, '发送失败');\n      }).then(function () {\n        that.sending = false;\n      });\n    },\n    goDetail: function goDetail(book) {\n      uni.navigateTo({\n        url: '/pages/detail/detail?id=' + (book.id || book.book_id)\n      });\n    }\n  }\n};\nexports.default = _default;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVuaS1hcHA6Ly8vcGFnZXMvY2hhdC9jaGF0LnZ1ZSJdLCJuYW1lcyI6WyJjb21wb25lbnRzIiwiQm9va0NhcmQiLCJkYXRhIiwidGV4dCIsIm1lc3NhZ2VzIiwiYm9va3MiLCJzZW5kaW5nIiwic2Nyb2xsVG9wIiwibWV0aG9kcyIsInF1aWNrIiwic2VuZCIsInRoYXQiLCJyb2xlIiwiY29udGVudCIsIm1ldGhvZCIsIm1lc3NhZ2UiLCJzZXRUaW1lb3V0IiwiZ29EZXRhaWwiLCJ1bmkiLCJ1cmwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFvQkE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7ZUFDQTtFQUNBQTtJQUFBQztFQUFBO0VBQ0FDO0lBQUE7TUFBQUM7TUFBQUM7TUFBQUM7TUFBQUM7TUFBQUM7SUFBQTtFQUFBO0VBQ0FDO0lBQ0FDO01BQUE7TUFBQTtJQUFBO0lBQ0FDO01BQ0E7TUFDQTtNQUNBO01BQ0FDO01BQUFBO01BQUFBO01BQ0FBO1FBQUFDO1FBQUFDO01BQUE7TUFDQTtRQUFBQztRQUFBWjtVQUFBYTtRQUFBO01BQUE7UUFDQUo7VUFBQUM7VUFBQUM7UUFBQTtRQUNBRjtRQUNBSztVQUFBTDtRQUFBO01BQ0E7UUFBQTtNQUFBO1FBQUFBO01BQUE7SUFDQTtJQUNBTTtNQUFBQztRQUFBQztNQUFBO0lBQUE7RUFDQTtBQUNBO0FBQUEiLCJmaWxlIjoiNjguanMiLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XG4gIDx2aWV3IGNsYXNzPVwiY2hhdC1wYWdlXCI+XG4gICAgPHNjcm9sbC12aWV3IHNjcm9sbC15IGNsYXNzPVwibWVzc2FnZXNcIiA6c2Nyb2xsLXRvcD1cInNjcm9sbFRvcFwiPlxuICAgICAgPHZpZXcgY2xhc3M9XCJ3ZWxjb21lIGNhcmRcIiB2LWlmPVwibWVzc2FnZXMubGVuZ3RoID09PSAwXCI+XG4gICAgICAgIDx0ZXh0IGNsYXNzPVwidGl0bGVcIj5BSSDojZDkuabliqnmiYs8L3RleHQ+XG4gICAgICAgIDx0ZXh0IGNsYXNzPVwibXV0ZWRcIj7lj6/ku6Xpl67vvJrmjqjojZDlh6DmnKznp5HlubvlsI/or7TjgIHmgI7kuYjnrqHnkIbkuabmnrbjgIHnn6Xor4blm77osLHmjqjojZDot6/lvoTmgI7kuYjnrpfjgII8L3RleHQ+XG4gICAgICAgIDx2aWV3IGNsYXNzPVwiY2hpcHNcIj48dGV4dCBjbGFzcz1cImNoaXBcIiBAY2xpY2s9XCJxdWljaygn5o6o6I2Q5Yeg5pys5Lq65bel5pm66IO95YWl6Zeo5LmmJylcIj7kurrlt6Xmmbrog73lhaXpl6g8L3RleHQ+PHRleHQgY2xhc3M9XCJjaGlwXCIgQGNsaWNrPVwicXVpY2soJ+aOqOiNkOWHoOacrOenkeW5u+Wwj+ivtCcpXCI+56eR5bm75bCP6K+0PC90ZXh0Pjx0ZXh0IGNsYXNzPVwiY2hpcFwiIEBjbGljaz1cInF1aWNrKCfmgI7kuYjnrqHnkIbkuabmnrbvvJ8nKVwiPuS5puaetuW4ruWKqTwvdGV4dD48L3ZpZXc+XG4gICAgICA8L3ZpZXc+XG4gICAgICA8dmlldyB2LWZvcj1cIihtLGlkeCkgaW4gbWVzc2FnZXNcIiA6a2V5PVwiaWR4XCIgOmNsYXNzPVwibS5yb2xlPT09J3VzZXInPydtc2cgdXNlcic6J21zZyBib3QnXCI+XG4gICAgICAgIDx0ZXh0IGNsYXNzPVwibXNnLXRleHRcIj57eyBtLmNvbnRlbnQgfX08L3RleHQ+XG4gICAgICA8L3ZpZXc+XG4gICAgICA8Qm9va0NhcmQgdi1mb3I9XCJiIGluIGJvb2tzXCIgOmtleT1cImIuaWRcIiA6Ym9vaz1cImJcIiBAY2xpY2s9XCJnb0RldGFpbFwiPjwvQm9va0NhcmQ+XG4gICAgPC9zY3JvbGwtdmlldz5cbiAgICA8dmlldyBjbGFzcz1cImlucHV0LWJhclwiPlxuICAgICAgPGlucHV0IGNsYXNzPVwiaW5wdXRcIiB2LW1vZGVsPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwi6L6T5YWl6Zeu6aKYXCIgY29uZmlybS10eXBlPVwic2VuZFwiIEBjb25maXJtPVwic2VuZFwiIC8+XG4gICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIHNlbmRcIiBAY2xpY2s9XCJzZW5kXCI+5Y+R6YCBPC9idXR0b24+XG4gICAgPC92aWV3PlxuICA8L3ZpZXc+XG48L3RlbXBsYXRlPlxuPHNjcmlwdD5cbmltcG9ydCBCb29rQ2FyZCBmcm9tICcuLi8uLi9jb21wb25lbnRzL0Jvb2tDYXJkLnZ1ZSdcbmltcG9ydCB7IHJlcXVlc3QsIG5vcm1hbGl6ZUJvb2tzLCBzaG93RXJyb3IgfSBmcm9tICcuLi8uLi9hcGkvcmVxdWVzdC5qcydcbmV4cG9ydCBkZWZhdWx0IHtcbiAgY29tcG9uZW50czogeyBCb29rQ2FyZDogQm9va0NhcmQgfSxcbiAgZGF0YTogZnVuY3Rpb24gKCkgeyByZXR1cm4geyB0ZXh0OiAnJywgbWVzc2FnZXM6IFtdLCBib29rczogW10sIHNlbmRpbmc6IGZhbHNlLCBzY3JvbGxUb3A6IDAgfSB9LFxuICBtZXRob2RzOiB7XG4gICAgcXVpY2s6IGZ1bmN0aW9uICh0KSB7IHRoaXMudGV4dCA9IHQ7IHRoaXMuc2VuZCgpIH0sXG4gICAgc2VuZDogZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3QgdGhhdCA9IHRoaXNcbiAgICAgIGNvbnN0IG1zZyA9IHRoYXQudGV4dC50cmltKClcbiAgICAgIGlmICghbXNnIHx8IHRoYXQuc2VuZGluZykgcmV0dXJuXG4gICAgICB0aGF0LnRleHQgPSAnJzsgdGhhdC5zZW5kaW5nID0gdHJ1ZTsgdGhhdC5ib29rcyA9IFtdXG4gICAgICB0aGF0Lm1lc3NhZ2VzLnB1c2goeyByb2xlOiAndXNlcicsIGNvbnRlbnQ6IG1zZyB9KVxuICAgICAgcmVxdWVzdCgnL2NoYXQvc2VuZCcsIHsgbWV0aG9kOiAnUE9TVCcsIGRhdGE6IHsgbWVzc2FnZTogbXNnIH0gfSkudGhlbihmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgIHRoYXQubWVzc2FnZXMucHVzaCh7IHJvbGU6ICdhc3Npc3RhbnQnLCBjb250ZW50OiByZXMuYW5zd2VyIHx8ICfmmoLml7bmsqHmnInlm57nrZTjgIInIH0pXG4gICAgICAgIHRoYXQuYm9va3MgPSBub3JtYWxpemVCb29rcyhyZXMuYm9va3MgfHwgW10pXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkgeyB0aGF0LnNjcm9sbFRvcCArPSA5OTk5IH0sIDEwMClcbiAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlKSB7IHNob3dFcnJvcihlLCAn5Y+R6YCB5aSx6LSlJykgfSkudGhlbihmdW5jdGlvbiAoKSB7IHRoYXQuc2VuZGluZyA9IGZhbHNlIH0pXG4gICAgfSxcbiAgICBnb0RldGFpbDogZnVuY3Rpb24gKGJvb2spIHsgdW5pLm5hdmlnYXRlVG8oeyB1cmw6ICcvcGFnZXMvZGV0YWlsL2RldGFpbD9pZD0nICsgKGJvb2suaWQgfHwgYm9vay5ib29rX2lkKSB9KSB9XG4gIH1cbn1cbjwvc2NyaXB0PlxuPHN0eWxlIHNjb3BlZD5cbi5jaGF0LXBhZ2V7aGVpZ2h0OjEwMHZoO2JhY2tncm91bmQ6I2Y4ZmFmYztkaXNwbGF5OmZsZXg7ZmxleC1kaXJlY3Rpb246Y29sdW1ufS5tZXNzYWdlc3tmbGV4OjE7cGFkZGluZzoyNHJweH0ubXNne21heC13aWR0aDo4NiU7cGFkZGluZzoyMHJweCAyNHJweDtib3JkZXItcmFkaXVzOjI0cnB4O21hcmdpbi1ib3R0b206MThycHh9Lm1zZy51c2Vye21hcmdpbi1sZWZ0OmF1dG87YmFja2dyb3VuZDojN2MzYWVkO2NvbG9yOiNmZmZ9Lm1zZy5ib3R7YmFja2dyb3VuZDojZmZmO2NvbG9yOiMxMTE4Mjc7Ym94LXNoYWRvdzowIDEwcnB4IDI2cnB4IHJnYmEoMTUsMjMsNDIsLjA3KX0ubXNnLXRleHR7Zm9udC1zaXplOjI4cnB4O2xpbmUtaGVpZ2h0OjEuNjV9LmlucHV0LWJhcntkaXNwbGF5OmZsZXg7Z2FwOjEycnB4O2JhY2tncm91bmQ6I2ZmZjtwYWRkaW5nOjE4cnB4IDIwcnB4O3BhZGRpbmctYm90dG9tOmNhbGMoMThycHggKyBlbnYoc2FmZS1hcmVhLWluc2V0LWJvdHRvbSkpO2JveC1zaGFkb3c6MCAtOHJweCAyOHJweCByZ2JhKDE1LDIzLDQyLC4wOCl9LmlucHV0LWJhciAuaW5wdXR7ZmxleDoxfS5zZW5ke3dpZHRoOjE0MHJweDtmb250LXNpemU6MjZycHg7cGFkZGluZzowfVxuPC9zdHlsZT5cbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///68\n");

/***/ }),
/* 69 */
/*!*********************************************************************************************!*\
  !*** E:/翻译漫画/book-main (14)/book-main/frontend-uni/pages/original/original.vue?mpType=page ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _original_vue_vue_type_template_id_73927414_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./original.vue?vue&type=template&id=73927414&scoped=true&mpType=page */ 70);\n/* harmony import */ var _original_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./original.vue?vue&type=script&lang=js&mpType=page */ 72);\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _original_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__) if([\"default\"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _original_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n/* harmony import */ var _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 18);\n\nvar renderjs\n\n\n\n\n/* normalize component */\n\nvar component = Object(_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\n  _original_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _original_vue_vue_type_template_id_73927414_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _original_vue_vue_type_template_id_73927414_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  \"73927414\",\n  null,\n  false,\n  _original_vue_vue_type_template_id_73927414_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__[\"components\"],\n  renderjs\n)\n\ncomponent.options.__file = \"pages/original/original.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbbnVsbF0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBNEk7QUFDNUk7QUFDdUU7QUFDTDs7O0FBR2xFO0FBQ2dNO0FBQ2hNLGdCQUFnQix1TUFBVTtBQUMxQixFQUFFLHlGQUFNO0FBQ1IsRUFBRSwwR0FBTTtBQUNSLEVBQUUsbUhBQWU7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUUsOEdBQVU7QUFDWjtBQUNBOztBQUVBO0FBQ2UsZ0YiLCJmaWxlIjoiNjkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucywgcmVjeWNsYWJsZVJlbmRlciwgY29tcG9uZW50cyB9IGZyb20gXCIuL29yaWdpbmFsLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD03MzkyNzQxNCZzY29wZWQ9dHJ1ZSZtcFR5cGU9cGFnZVwiXG52YXIgcmVuZGVyanNcbmltcG9ydCBzY3JpcHQgZnJvbSBcIi4vb3JpZ2luYWwudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJm1wVHlwZT1wYWdlXCJcbmV4cG9ydCAqIGZyb20gXCIuL29yaWdpbmFsLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZtcFR5cGU9cGFnZVwiXG5cblxuLyogbm9ybWFsaXplIGNvbXBvbmVudCAqL1xuaW1wb3J0IG5vcm1hbGl6ZXIgZnJvbSBcIiEuLi8uLi8uLi8uLi8uLi9IQnVpbGRlclguNS4wNy4yMDI2MDQxMDA2L0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvdnVlLWxvYWRlci9saWIvcnVudGltZS9jb21wb25lbnROb3JtYWxpemVyLmpzXCJcbnZhciBjb21wb25lbnQgPSBub3JtYWxpemVyKFxuICBzY3JpcHQsXG4gIHJlbmRlcixcbiAgc3RhdGljUmVuZGVyRm5zLFxuICBmYWxzZSxcbiAgbnVsbCxcbiAgXCI3MzkyNzQxNFwiLFxuICBudWxsLFxuICBmYWxzZSxcbiAgY29tcG9uZW50cyxcbiAgcmVuZGVyanNcbilcblxuY29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJwYWdlcy9vcmlnaW5hbC9vcmlnaW5hbC52dWVcIlxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50LmV4cG9ydHMiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///69\n");

/***/ }),
/* 70 */
/*!***************************************************************************************************************************************!*\
  !*** E:/翻译漫画/book-main (14)/book-main/frontend-uni/pages/original/original.vue?vue&type=template&id=73927414&scoped=true&mpType=page ***!
  \***************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_0_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_original_vue_vue_type_template_id_73927414_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--11-0!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/filter-modules-template.js!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./original.vue?vue&type=template&id=73927414&scoped=true&mpType=page */ 71);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_0_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_original_vue_vue_type_template_id_73927414_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_0_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_original_vue_vue_type_template_id_73927414_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_0_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_original_vue_vue_type_template_id_73927414_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_0_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_original_vue_vue_type_template_id_73927414_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),
/* 71 */
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--11-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/filter-modules-template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!E:/翻译漫画/book-main (14)/book-main/frontend-uni/pages/original/original.vue?vue&type=template&id=73927414&scoped=true&mpType=page ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "view",
    {
      staticClass: _vm._$s(0, "sc", "container original-page"),
      attrs: { _i: 0 },
    },
    [
      _c(
        "view",
        { staticClass: _vm._$s(1, "sc", "hero-card"), attrs: { _i: 1 } },
        [
          _c("text", {
            staticClass: _vm._$s(2, "sc", "eyebrow"),
            attrs: { _i: 2 },
          }),
          _c("text", {
            staticClass: _vm._$s(3, "sc", "big-title"),
            attrs: { _i: 3 },
          }),
          _c("text", {
            staticClass: _vm._$s(4, "sc", "hero-desc"),
            attrs: { _i: 4 },
          }),
          _c(
            "view",
            { staticClass: _vm._$s(5, "sc", "hero-tags"), attrs: { _i: 5 } },
            [_c("text"), _c("text"), _c("text"), _c("text")]
          ),
        ]
      ),
      _vm._$s(10, "i", !_vm.logged)
        ? _c(
            "view",
            { staticClass: _vm._$s(10, "sc", "lock-card"), attrs: { _i: 10 } },
            [
              _c("text", {
                staticClass: _vm._$s(11, "sc", "lock-icon"),
                attrs: { _i: 11 },
              }),
              _c("text", {
                staticClass: _vm._$s(12, "sc", "title center"),
                attrs: { _i: 12 },
              }),
              _c("text", {
                staticClass: _vm._$s(13, "sc", "muted center"),
                attrs: { _i: 13 },
              }),
              _c("button", {
                staticClass: _vm._$s(14, "sc", "btn"),
                attrs: { _i: 14 },
                on: { click: _vm.goLogin },
              }),
            ]
          )
        : _vm._e(),
      _vm._$s(15, "i", _vm.logged)
        ? _c(
            "view",
            { staticClass: _vm._$s(15, "sc", "layout"), attrs: { _i: 15 } },
            [
              _c(
                "view",
                {
                  staticClass: _vm._$s(16, "sc", "card form-card"),
                  attrs: { _i: 16 },
                },
                [
                  _c(
                    "view",
                    {
                      staticClass: _vm._$s(17, "sc", "section-head"),
                      attrs: { _i: 17 },
                    },
                    [
                      _c("view", [
                        _c("text", {
                          staticClass: _vm._$s(19, "sc", "title"),
                          attrs: { _i: 19 },
                        }),
                        _c("text", {
                          staticClass: _vm._$s(20, "sc", "muted"),
                          attrs: { _i: 20 },
                        }),
                      ]),
                    ]
                  ),
                  _c(
                    "view",
                    {
                      staticClass: _vm._$s(21, "sc", "field-row"),
                      attrs: { _i: 21 },
                    },
                    [
                      _c(
                        "view",
                        {
                          staticClass: _vm._$s(22, "sc", "field half"),
                          attrs: { _i: 22 },
                        },
                        [
                          _c("text", {
                            staticClass: _vm._$s(23, "sc", "label"),
                            attrs: { _i: 23 },
                          }),
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.title,
                                expression: "title",
                              },
                            ],
                            staticClass: _vm._$s(24, "sc", "input"),
                            attrs: { _i: 24 },
                            domProps: {
                              value: _vm._$s(24, "v-model", _vm.title),
                            },
                            on: {
                              input: function ($event) {
                                if ($event.target.composing) {
                                  return
                                }
                                _vm.title = $event.target.value
                              },
                            },
                          }),
                        ]
                      ),
                      _c(
                        "view",
                        {
                          staticClass: _vm._$s(25, "sc", "field half"),
                          attrs: { _i: 25 },
                        },
                        [
                          _c("text", {
                            staticClass: _vm._$s(26, "sc", "label"),
                            attrs: { _i: 26 },
                          }),
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.genre,
                                expression: "genre",
                              },
                            ],
                            staticClass: _vm._$s(27, "sc", "input"),
                            attrs: { _i: 27 },
                            domProps: {
                              value: _vm._$s(27, "v-model", _vm.genre),
                            },
                            on: {
                              input: function ($event) {
                                if ($event.target.composing) {
                                  return
                                }
                                _vm.genre = $event.target.value
                              },
                            },
                          }),
                        ]
                      ),
                    ]
                  ),
                  _c(
                    "view",
                    {
                      staticClass: _vm._$s(28, "sc", "field"),
                      attrs: { _i: 28 },
                    },
                    [
                      _c("text", {
                        staticClass: _vm._$s(29, "sc", "label"),
                        attrs: { _i: 29 },
                      }),
                      _c(
                        "picker",
                        {
                          attrs: {
                            range: _vm._$s(30, "a-range", _vm.wordOptions),
                            value: _vm._$s(30, "a-value", _vm.wordIndex),
                            _i: 30,
                          },
                          on: { change: _vm.wordChange },
                        },
                        [
                          _c(
                            "view",
                            {
                              staticClass: _vm._$s(31, "sc", "picker-box"),
                              attrs: { _i: 31 },
                            },
                            [
                              _vm._v(
                                _vm._$s(
                                  31,
                                  "t0-0",
                                  _vm._s(_vm.wordOptions[_vm.wordIndex].label)
                                )
                              ),
                            ]
                          ),
                        ]
                      ),
                    ]
                  ),
                  _c(
                    "view",
                    {
                      staticClass: _vm._$s(32, "sc", "field"),
                      attrs: { _i: 32 },
                    },
                    [
                      _c("text", {
                        staticClass: _vm._$s(33, "sc", "label"),
                        attrs: { _i: 33 },
                      }),
                      _c("textarea", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.reference,
                            expression: "reference",
                          },
                        ],
                        staticClass: _vm._$s(34, "sc", "textarea ref"),
                        attrs: { _i: 34 },
                        domProps: {
                          value: _vm._$s(34, "v-model", _vm.reference),
                        },
                        on: {
                          input: function ($event) {
                            if ($event.target.composing) {
                              return
                            }
                            _vm.reference = $event.target.value
                          },
                        },
                      }),
                    ]
                  ),
                  _c(
                    "view",
                    {
                      staticClass: _vm._$s(35, "sc", "field"),
                      attrs: { _i: 35 },
                    },
                    [
                      _c("text", {
                        staticClass: _vm._$s(36, "sc", "label"),
                        attrs: { _i: 36 },
                      }),
                      _c("textarea", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.requirement,
                            expression: "requirement",
                          },
                        ],
                        staticClass: _vm._$s(37, "sc", "textarea req"),
                        attrs: { _i: 37 },
                        domProps: {
                          value: _vm._$s(37, "v-model", _vm.requirement),
                        },
                        on: {
                          input: function ($event) {
                            if ($event.target.composing) {
                              return
                            }
                            _vm.requirement = $event.target.value
                          },
                        },
                      }),
                    ]
                  ),
                  _c(
                    "view",
                    {
                      staticClass: _vm._$s(38, "sc", "actions"),
                      attrs: { _i: 38 },
                    },
                    [
                      _c("button", {
                        staticClass: _vm._$s(39, "sc", "btn"),
                        attrs: {
                          loading: _vm._$s(39, "a-loading", _vm.generating),
                          _i: 39,
                        },
                        on: { click: _vm.generate },
                      }),
                      _c("button", {
                        staticClass: _vm._$s(40, "sc", "btn secondary"),
                        attrs: {
                          loading: _vm._$s(40, "a-loading", _vm.saving),
                          _i: 40,
                        },
                        on: { click: _vm.save },
                      }),
                    ]
                  ),
                ]
              ),
              _c(
                "view",
                {
                  staticClass: _vm._$s(41, "sc", "card result-card"),
                  attrs: { _i: 41 },
                },
                [
                  _c("text", {
                    staticClass: _vm._$s(42, "sc", "title"),
                    attrs: { _i: 42 },
                  }),
                  _c("text", {
                    staticClass: _vm._$s(43, "sc", "muted"),
                    attrs: { _i: 43 },
                  }),
                  _c(
                    "view",
                    {
                      staticClass: _vm._$s(44, "sc", "assist-box"),
                      attrs: { _i: 44 },
                    },
                    [
                      _vm._$s(45, "i", !_vm.assist)
                        ? _c("text", {
                            staticClass: _vm._$s(45, "sc", "muted"),
                            attrs: { _i: 45 },
                          })
                        : _c(
                            "view",
                            { attrs: { _i: 46 } },
                            [
                              _c(
                                "text",
                                {
                                  staticClass: _vm._$s(
                                    47,
                                    "sc",
                                    "assist-title"
                                  ),
                                  attrs: { _i: 47 },
                                },
                                [
                                  _vm._v(
                                    _vm._$s(
                                      47,
                                      "t0-0",
                                      _vm._s(
                                        _vm.assist.title ||
                                          _vm.title ||
                                          "未命名作品"
                                      )
                                    )
                                  ),
                                ]
                              ),
                              _c(
                                "text",
                                {
                                  staticClass: _vm._$s(
                                    48,
                                    "sc",
                                    "assist-summary"
                                  ),
                                  attrs: { _i: 48 },
                                },
                                [
                                  _vm._v(
                                    _vm._$s(
                                      48,
                                      "t0-0",
                                      _vm._s(_vm.assist.summary || "暂无简介")
                                    )
                                  ),
                                ]
                              ),
                              _c(
                                "view",
                                {
                                  staticClass: _vm._$s(49, "sc", "chips"),
                                  attrs: { _i: 49 },
                                },
                                _vm._l(
                                  _vm._$s(50, "f", {
                                    forItems: _vm.assistTags,
                                  }),
                                  function (t, $10, $20, $30) {
                                    return _c(
                                      "text",
                                      {
                                        key: _vm._$s(50, "f", {
                                          forIndex: $20,
                                          key: t,
                                        }),
                                        staticClass: _vm._$s(
                                          "50-" + $30,
                                          "sc",
                                          "chip active"
                                        ),
                                        attrs: { _i: "50-" + $30 },
                                      },
                                      [
                                        _vm._v(
                                          _vm._$s(
                                            "50-" + $30,
                                            "t0-0",
                                            _vm._s(t)
                                          )
                                        ),
                                      ]
                                    )
                                  }
                                ),
                                0
                              ),
                              _c("text", {
                                staticClass: _vm._$s(
                                  51,
                                  "sc",
                                  "sub-title suggestions-title"
                                ),
                                attrs: { _i: 51 },
                              }),
                              _vm._l(
                                _vm._$s(52, "f", { forItems: _vm.suggestions }),
                                function (x, idx, $21, $31) {
                                  return _c(
                                    "text",
                                    {
                                      key: _vm._$s(52, "f", {
                                        forIndex: $21,
                                        key: idx,
                                      }),
                                      staticClass: _vm._$s(
                                        "52-" + $31,
                                        "sc",
                                        "suggestion"
                                      ),
                                      attrs: { _i: "52-" + $31 },
                                    },
                                    [
                                      _vm._v(
                                        _vm._$s("52-" + $31, "t0-0", _vm._s(x))
                                      ),
                                    ]
                                  )
                                }
                              ),
                            ],
                            2
                          ),
                    ]
                  ),
                ]
              ),
              _c(
                "view",
                {
                  staticClass: _vm._$s(53, "sc", "card manuscript-card"),
                  attrs: { _i: 53 },
                },
                [
                  _c("text", {
                    staticClass: _vm._$s(54, "sc", "title"),
                    attrs: { _i: 54 },
                  }),
                  _c("text", {
                    staticClass: _vm._$s(55, "sc", "muted"),
                    attrs: { _i: 55 },
                  }),
                  _c("textarea", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.manuscript,
                        expression: "manuscript",
                      },
                    ],
                    staticClass: _vm._$s(56, "sc", "textarea manuscript"),
                    attrs: { _i: 56 },
                    domProps: { value: _vm._$s(56, "v-model", _vm.manuscript) },
                    on: {
                      input: function ($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.manuscript = $event.target.value
                      },
                    },
                  }),
                ]
              ),
              _c(
                "view",
                { staticClass: _vm._$s(57, "sc", "card"), attrs: { _i: 57 } },
                [
                  _c(
                    "view",
                    {
                      staticClass: _vm._$s(58, "sc", "between"),
                      attrs: { _i: 58 },
                    },
                    [
                      _c("text", {
                        staticClass: _vm._$s(59, "sc", "title"),
                        attrs: { _i: 59 },
                      }),
                      _c(
                        "text",
                        {
                          staticClass: _vm._$s(60, "sc", "badge"),
                          attrs: { _i: 60 },
                        },
                        [_vm._v(_vm._$s(60, "t0-0", _vm._s(_vm.works.length)))]
                      ),
                    ]
                  ),
                  _vm._l(
                    _vm._$s(61, "f", { forItems: _vm.works }),
                    function (w, $12, $22, $32) {
                      return _c(
                        "view",
                        {
                          key: _vm._$s(61, "f", {
                            forIndex: $22,
                            key: w.id || (w.book && w.book.id),
                          }),
                          staticClass: _vm._$s("61-" + $32, "sc", "work-item"),
                          attrs: { _i: "61-" + $32 },
                          on: {
                            click: function ($event) {
                              return _vm.openWork(w)
                            },
                          },
                        },
                        [
                          _c(
                            "text",
                            {
                              staticClass: _vm._$s(
                                "62-" + $32,
                                "sc",
                                "work-title"
                              ),
                              attrs: { _i: "62-" + $32 },
                            },
                            [
                              _vm._v(
                                _vm._$s(
                                  "62-" + $32,
                                  "t0-0",
                                  _vm._s(_vm.workTitle(w))
                                )
                              ),
                            ]
                          ),
                          _c(
                            "text",
                            {
                              staticClass: _vm._$s("63-" + $32, "sc", "muted"),
                              attrs: { _i: "63-" + $32 },
                            },
                            [
                              _vm._v(
                                _vm._$s(
                                  "63-" + $32,
                                  "t0-0",
                                  _vm._s(_vm.workAuthor(w))
                                )
                              ),
                            ]
                          ),
                        ]
                      )
                    }
                  ),
                  _vm._$s(64, "i", _vm.works.length === 0)
                    ? _c("text", {
                        staticClass: _vm._$s(64, "sc", "muted"),
                        attrs: { _i: 64 },
                      })
                    : _vm._e(),
                ],
                2
              ),
            ]
          )
        : _vm._e(),
    ]
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),
/* 72 */
/*!*********************************************************************************************************************!*\
  !*** E:/翻译漫画/book-main (14)/book-main/frontend-uni/pages/original/original.vue?vue&type=script&lang=js&mpType=page ***!
  \*********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_1_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_original_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--7-1!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/using-components.js!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./original.vue?vue&type=script&lang=js&mpType=page */ 73);\n/* harmony import */ var _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_1_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_original_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_1_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_original_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_1_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_original_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__) if([\"default\"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_1_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_original_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n /* harmony default export */ __webpack_exports__[\"default\"] = (_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_1_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_original_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0___default.a); //# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbbnVsbF0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQW1xQixDQUFnQixpckJBQUcsRUFBQyIsImZpbGUiOiI3Mi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vSEJ1aWxkZXJYLjUuMDcuMjAyNjA0MTAwNi9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzIS4uLy4uLy4uLy4uLy4uL0hCdWlsZGVyWC41LjA3LjIwMjYwNDEwMDYvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy93ZWJwYWNrLXByZXByb2Nlc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTctMSEuLi8uLi8uLi8uLi8uLi9IQnVpbGRlclguNS4wNy4yMDI2MDQxMDA2L0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvd2VicGFjay11bmktYXBwLWxvYWRlci91c2luZy1jb21wb25lbnRzLmpzIS4uLy4uLy4uLy4uLy4uL0hCdWlsZGVyWC41LjA3LjIwMjYwNDEwMDYvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vb3JpZ2luYWwudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJm1wVHlwZT1wYWdlXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vSEJ1aWxkZXJYLjUuMDcuMjAyNjA0MTAwNi9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzIS4uLy4uLy4uLy4uLy4uL0hCdWlsZGVyWC41LjA3LjIwMjYwNDEwMDYvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy93ZWJwYWNrLXByZXByb2Nlc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTctMSEuLi8uLi8uLi8uLi8uLi9IQnVpbGRlclguNS4wNy4yMDI2MDQxMDA2L0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvd2VicGFjay11bmktYXBwLWxvYWRlci91c2luZy1jb21wb25lbnRzLmpzIS4uLy4uLy4uLy4uLy4uL0hCdWlsZGVyWC41LjA3LjIwMjYwNDEwMDYvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vb3JpZ2luYWwudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJm1wVHlwZT1wYWdlXCIiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///72\n");

/***/ }),
/* 73 */
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--7-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/using-components.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!E:/翻译漫画/book-main (14)/book-main/frontend-uni/pages/original/original.vue?vue&type=script&lang=js&mpType=page ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\nvar _request = __webpack_require__(/*! ../../api/request.js */ 17);\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\nvar _default = {\n  data: function data() {\n    return {\n      logged: false,\n      title: '',\n      genre: '',\n      requirement: '',\n      reference: '',\n      manuscript: '',\n      assist: null,\n      works: [],\n      generating: false,\n      saving: false,\n      wordIndex: 1,\n      wordOptions: [{\n        label: '短篇 600-1000 字',\n        value: 800\n      }, {\n        label: '标准短篇 1000-2000 字',\n        value: 1500\n      }, {\n        label: '中篇片段 2000-4000 字',\n        value: 3000\n      }, {\n        label: '长篇章节 4000-8000 字',\n        value: 6000\n      }, {\n        label: '长篇扩写 8000-12000 字',\n        value: 10000\n      }]\n    };\n  },\n  computed: {\n    assistTags: function assistTags() {\n      return this.assist && this.assist.tags || [];\n    },\n    suggestions: function suggestions() {\n      return this.assist && this.assist.layout_suggestions || ['建议先生成小说后再保存作品。'];\n    }\n  },\n  onShow: function onShow() {\n    this.logged = !!(0, _request.getToken)();\n    if (this.logged) this.loadWorks();\n  },\n  methods: {\n    wordChange: function wordChange(e) {\n      this.wordIndex = Number(e.detail.value || 0);\n    },\n    goLogin: function goLogin() {\n      uni.navigateTo({\n        url: '/pages/login/login'\n      });\n    },\n    validateGenerate: function validateGenerate() {\n      if (!this.title.trim()) throw new Error('请填写作品标题');\n      if (!this.genre.trim()) throw new Error('请填写题材方向');\n      if (!this.requirement.trim()) throw new Error('请填写具体需求');\n    },\n    generate: function generate() {\n      var that = this;\n      try {\n        that.validateGenerate();\n      } catch (e) {\n        (0, _request.showError)(e);\n        return;\n      }\n      that.generating = true;\n      that.assist = null;\n      (0, _request.request)('/chat/original/generate', {\n        method: 'POST',\n        data: {\n          title: that.title.trim(),\n          genre: that.genre.trim(),\n          requirement: that.requirement.trim(),\n          reference_text: that.reference.trim() || null,\n          word_count: that.wordOptions[that.wordIndex].value\n        },\n        timeout: 60000\n      }).then(function (res) {\n        that.manuscript = res.manuscript || '';\n        that.assist = res.assist || null;\n        uni.showToast({\n          title: '生成完成',\n          icon: 'success'\n        });\n      }).catch(function (e) {\n        (0, _request.showError)(e, '生成失败');\n      }).then(function () {\n        that.generating = false;\n      });\n    },\n    save: function save() {\n      var that = this;\n      if (!that.manuscript.trim() || that.manuscript.trim().length < 20) {\n        uni.showToast({\n          title: '正文至少需要 20 个字',\n          icon: 'none'\n        });\n        return;\n      }\n      that.saving = true;\n      var assist = that.assist || {};\n      (0, _request.request)('/chat/original/save', {\n        method: 'POST',\n        data: {\n          title: that.title.trim() || '未命名原创作品',\n          genre: that.genre.trim() || '原创',\n          manuscript: that.manuscript.trim(),\n          summary: assist.summary || null,\n          tags: assist.tags || [],\n          layout_suggestions: assist.layout_suggestions || [],\n          save_to_shelf: true\n        },\n        timeout: 30000\n      }).then(function (res) {\n        that.assist = res.assist || that.assist;\n        uni.showToast({\n          title: '已保存到书架',\n          icon: 'success'\n        });\n        that.loadWorks();\n        if (res.book && res.book.id) {\n          setTimeout(function () {\n            uni.navigateTo({\n              url: '/pages/detail/detail?id=' + res.book.id\n            });\n          }, 500);\n        }\n      }).catch(function (e) {\n        (0, _request.showError)(e, '保存失败');\n      }).then(function () {\n        that.saving = false;\n      });\n    },\n    loadWorks: function loadWorks() {\n      var that = this;\n      (0, _request.request)('/chat/original/mine').then(function (res) {\n        that.works = res.items || [];\n      }).catch(function () {\n        that.works = [];\n      });\n    },\n    workTitle: function workTitle(w) {\n      var b = w.book || w;\n      return b.title || '未命名作品';\n    },\n    workAuthor: function workAuthor(w) {\n      var b = w.book || w;\n      return Array.isArray(b.authors) ? b.authors.join('、') || '我' : b.author || '我';\n    },\n    openWork: function openWork(w) {\n      var b = w.book || w;\n      var id = b.id || b.book_id;\n      if (id) uni.navigateTo({\n        url: '/pages/detail/detail?id=' + id\n      });\n    }\n  }\n};\nexports.default = _default;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVuaS1hcHA6Ly8vcGFnZXMvb3JpZ2luYWwvb3JpZ2luYWwudnVlIl0sIm5hbWVzIjpbImRhdGEiLCJsb2dnZWQiLCJ0aXRsZSIsImdlbnJlIiwicmVxdWlyZW1lbnQiLCJyZWZlcmVuY2UiLCJtYW51c2NyaXB0IiwiYXNzaXN0Iiwid29ya3MiLCJnZW5lcmF0aW5nIiwic2F2aW5nIiwid29yZEluZGV4Iiwid29yZE9wdGlvbnMiLCJsYWJlbCIsInZhbHVlIiwiY29tcHV0ZWQiLCJhc3Npc3RUYWdzIiwic3VnZ2VzdGlvbnMiLCJvblNob3ciLCJtZXRob2RzIiwid29yZENoYW5nZSIsImdvTG9naW4iLCJ1bmkiLCJ1cmwiLCJ2YWxpZGF0ZUdlbmVyYXRlIiwiZ2VuZXJhdGUiLCJ0aGF0IiwibWV0aG9kIiwicmVmZXJlbmNlX3RleHQiLCJ3b3JkX2NvdW50IiwidGltZW91dCIsImljb24iLCJzYXZlIiwic3VtbWFyeSIsInRhZ3MiLCJsYXlvdXRfc3VnZ2VzdGlvbnMiLCJzYXZlX3RvX3NoZWxmIiwic2V0VGltZW91dCIsImxvYWRXb3JrcyIsIndvcmtUaXRsZSIsIndvcmtBdXRob3IiLCJvcGVuV29yayJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBa0dBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztlQUVBO0VBQ0FBO0lBQ0E7TUFDQUM7TUFDQUM7TUFDQUM7TUFDQUM7TUFDQUM7TUFDQUM7TUFDQUM7TUFDQUM7TUFDQUM7TUFDQUM7TUFDQUM7TUFDQUMsY0FDQTtRQUFBQztRQUFBQztNQUFBLEdBQ0E7UUFBQUQ7UUFBQUM7TUFBQSxHQUNBO1FBQUFEO1FBQUFDO01BQUEsR0FDQTtRQUFBRDtRQUFBQztNQUFBLEdBQ0E7UUFBQUQ7UUFBQUM7TUFBQTtJQUVBO0VBQ0E7RUFDQUM7SUFDQUM7TUFBQTtJQUFBO0lBQ0FDO01BQUE7SUFBQTtFQUNBO0VBQ0FDO0lBQ0E7SUFDQTtFQUNBO0VBQ0FDO0lBQ0FDO01BQUE7SUFBQTtJQUNBQztNQUFBQztRQUFBQztNQUFBO0lBQUE7SUFDQUM7TUFDQTtNQUNBO01BQ0E7SUFDQTtJQUNBQztNQUNBO01BQ0E7UUFBQUM7TUFBQTtRQUFBO1FBQUE7TUFBQTtNQUNBQTtNQUNBQTtNQUNBO1FBQ0FDO1FBQ0EzQjtVQUNBRTtVQUNBQztVQUNBQztVQUNBd0I7VUFDQUM7UUFDQTtRQUNBQztNQUNBO1FBQ0FKO1FBQ0FBO1FBQ0FKO1VBQUFwQjtVQUFBNkI7UUFBQTtNQUNBO1FBQUE7TUFBQTtRQUFBTDtNQUFBO0lBQ0E7SUFDQU07TUFDQTtNQUNBO1FBQ0FWO1VBQUFwQjtVQUFBNkI7UUFBQTtRQUNBO01BQ0E7TUFDQUw7TUFDQTtNQUNBO1FBQ0FDO1FBQ0EzQjtVQUNBRTtVQUNBQztVQUNBRztVQUNBMkI7VUFDQUM7VUFDQUM7VUFDQUM7UUFDQTtRQUNBTjtNQUNBO1FBQ0FKO1FBQ0FKO1VBQUFwQjtVQUFBNkI7UUFBQTtRQUNBTDtRQUNBO1VBQ0FXO1lBQUFmO2NBQUFDO1lBQUE7VUFBQTtRQUNBO01BQ0E7UUFBQTtNQUFBO1FBQUFHO01BQUE7SUFDQTtJQUNBWTtNQUNBO01BQ0E7UUFBQVo7TUFBQTtRQUFBQTtNQUFBO0lBQ0E7SUFDQWE7TUFBQTtNQUFBO0lBQUE7SUFDQUM7TUFBQTtNQUFBO0lBQUE7SUFDQUM7TUFBQTtNQUFBO01BQUE7UUFBQWxCO01BQUE7SUFBQTtFQUNBO0FBQ0E7QUFBQSIsImZpbGUiOiI3My5qcyIsInNvdXJjZXNDb250ZW50IjpbIjx0ZW1wbGF0ZT5cbiAgPHZpZXcgY2xhc3M9XCJjb250YWluZXIgb3JpZ2luYWwtcGFnZVwiPlxuICAgIDx2aWV3IGNsYXNzPVwiaGVyby1jYXJkXCI+XG4gICAgICA8dGV4dCBjbGFzcz1cImV5ZWJyb3dcIj5BSSBXcml0aW5nIFN0dWRpbzwvdGV4dD5cbiAgICAgIDx0ZXh0IGNsYXNzPVwiYmlnLXRpdGxlXCI+QUnlsI/or7Tlt6XlnYo8L3RleHQ+XG4gICAgICA8dGV4dCBjbGFzcz1cImhlcm8tZGVzY1wiPuWhq+WGmeiuvuWumuOAgeWPguiAg+i1hOaWmeWSjOWFt+S9k+imgeaxgu+8jOeUn+aIkOWwj+ivtOWQjuWPr+S/neWtmOWIsOS4quS6uuS5puaetuOAgjwvdGV4dD5cbiAgICAgIDx2aWV3IGNsYXNzPVwiaGVyby10YWdzXCI+XG4gICAgICAgIDx0ZXh0PueUn+aIkOato+aWhzwvdGV4dD48dGV4dD7oh6rliqjnroDku4s8L3RleHQ+PHRleHQ+5qCH562+5o+Q5Y+WPC90ZXh0Pjx0ZXh0PuS/neWtmOWFpeaetjwvdGV4dD5cbiAgICAgIDwvdmlldz5cbiAgICA8L3ZpZXc+XG5cbiAgICA8dmlldyB2LWlmPVwiIWxvZ2dlZFwiIGNsYXNzPVwibG9jay1jYXJkXCI+XG4gICAgICA8dGV4dCBjbGFzcz1cImxvY2staWNvblwiPvCflJI8L3RleHQ+XG4gICAgICA8dGV4dCBjbGFzcz1cInRpdGxlIGNlbnRlclwiPueZu+W9leWQjuino+mUgSBBSSDlsI/or7Tlt6XlnYo8L3RleHQ+XG4gICAgICA8dGV4dCBjbGFzcz1cIm11dGVkIGNlbnRlclwiPueZu+W9leWQjuWPr+S7peeUn+aIkOWwj+ivtOOAgee8lui+keato+aWh+OAgeS/neWtmOWIsOaIkeeahOS5puaetu+8jOW5tuWcqOmYheivu+WZqOS4ree7p+e7remYheivu+OAgjwvdGV4dD5cbiAgICAgIDxidXR0b24gY2xhc3M9XCJidG5cIiBAY2xpY2s9XCJnb0xvZ2luXCI+5Y6755m75b2VPC9idXR0b24+XG4gICAgPC92aWV3PlxuXG4gICAgPHZpZXcgdi1pZj1cImxvZ2dlZFwiIGNsYXNzPVwibGF5b3V0XCI+XG4gICAgICA8dmlldyBjbGFzcz1cImNhcmQgZm9ybS1jYXJkXCI+XG4gICAgICAgIDx2aWV3IGNsYXNzPVwic2VjdGlvbi1oZWFkXCI+XG4gICAgICAgICAgPHZpZXc+XG4gICAgICAgICAgICA8dGV4dCBjbGFzcz1cInRpdGxlXCI+5Yib5L2c5L+h5oGvPC90ZXh0PlxuICAgICAgICAgICAgPHRleHQgY2xhc3M9XCJtdXRlZFwiPuWhq+WGmeWfuuehgOiuvuWumuWQjuWGjeeUn+aIkDwvdGV4dD5cbiAgICAgICAgICA8L3ZpZXc+XG4gICAgICAgIDwvdmlldz5cblxuICAgICAgICA8dmlldyBjbGFzcz1cImZpZWxkLXJvd1wiPlxuICAgICAgICAgIDx2aWV3IGNsYXNzPVwiZmllbGQgaGFsZlwiPlxuICAgICAgICAgICAgPHRleHQgY2xhc3M9XCJsYWJlbFwiPuS9nOWTgeagh+mimDwvdGV4dD5cbiAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImlucHV0XCIgdi1tb2RlbD1cInRpdGxlXCIgcGxhY2Vob2xkZXI9XCLkvovlpoLvvJrmmJ/mtbfmnaXkv6FcIiAvPlxuICAgICAgICAgIDwvdmlldz5cbiAgICAgICAgICA8dmlldyBjbGFzcz1cImZpZWxkIGhhbGZcIj5cbiAgICAgICAgICAgIDx0ZXh0IGNsYXNzPVwibGFiZWxcIj7popjmnZDmlrnlkJE8L3RleHQ+XG4gICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJpbnB1dFwiIHYtbW9kZWw9XCJnZW5yZVwiIHBsYWNlaG9sZGVyPVwi56eR5bm744CB5oKs55aR44CB5oiQ6ZW/XCIgLz5cbiAgICAgICAgICA8L3ZpZXc+XG4gICAgICAgIDwvdmlldz5cblxuICAgICAgICA8dmlldyBjbGFzcz1cImZpZWxkXCI+XG4gICAgICAgICAgPHRleHQgY2xhc3M9XCJsYWJlbFwiPuimgeaxguWtl+aVsDwvdGV4dD5cbiAgICAgICAgICA8cGlja2VyIDpyYW5nZT1cIndvcmRPcHRpb25zXCIgcmFuZ2Uta2V5PVwibGFiZWxcIiA6dmFsdWU9XCJ3b3JkSW5kZXhcIiBAY2hhbmdlPVwid29yZENoYW5nZVwiPlxuICAgICAgICAgICAgPHZpZXcgY2xhc3M9XCJwaWNrZXItYm94XCI+e3sgd29yZE9wdGlvbnNbd29yZEluZGV4XS5sYWJlbCB9fTwvdmlldz5cbiAgICAgICAgICA8L3BpY2tlcj5cbiAgICAgICAgPC92aWV3PlxuXG4gICAgICAgIDx2aWV3IGNsYXNzPVwiZmllbGRcIj5cbiAgICAgICAgICA8dGV4dCBjbGFzcz1cImxhYmVsXCI+5Y+C6ICD5paH5qGjPC90ZXh0PlxuICAgICAgICAgIDx0ZXh0YXJlYSBjbGFzcz1cInRleHRhcmVhIHJlZlwiIHYtbW9kZWw9XCJyZWZlcmVuY2VcIiBwbGFjZWhvbGRlcj1cIueymOi0tOWPguiAg+iuvuWumuOAgeS6uueJqeWFs+ezu+OAgeS4lueVjOinguOAgeaVheS6i+eJh+auteetie+8jOWPr+S4uuepuuOAglwiPjwvdGV4dGFyZWE+XG4gICAgICAgIDwvdmlldz5cblxuICAgICAgICA8dmlldyBjbGFzcz1cImZpZWxkXCI+XG4gICAgICAgICAgPHRleHQgY2xhc3M9XCJsYWJlbFwiPuWFt+S9k+mcgOaxgjwvdGV4dD5cbiAgICAgICAgICA8dGV4dGFyZWEgY2xhc3M9XCJ0ZXh0YXJlYSByZXFcIiB2LW1vZGVsPVwicmVxdWlyZW1lbnRcIiBwbGFjZWhvbGRlcj1cIuS+i+Wmgu+8muS4u+inkuaYr+S4gOWQjeWbvuS5pueuoeeQhuWRmO+8jOWPkeeOsOaXp+S5puWPr+S7pemAmuW+gOS4jeWQjOaYn+eQg++8m+mjjuagvOa4qeaflOS9huacieaCrOW/te+8jOe7k+WwvueVmeS4i+e7reS9nOepuumXtOOAglwiPjwvdGV4dGFyZWE+XG4gICAgICAgIDwvdmlldz5cblxuICAgICAgICA8dmlldyBjbGFzcz1cImFjdGlvbnNcIj5cbiAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuXCIgOmxvYWRpbmc9XCJnZW5lcmF0aW5nXCIgQGNsaWNrPVwiZ2VuZXJhdGVcIj7nlJ/miJDlsI/or7Q8L2J1dHRvbj5cbiAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIHNlY29uZGFyeVwiIDpsb2FkaW5nPVwic2F2aW5nXCIgQGNsaWNrPVwic2F2ZVwiPuS/neWtmOWIsOaIkeeahOS5puaetjwvYnV0dG9uPlxuICAgICAgICA8L3ZpZXc+XG4gICAgICA8L3ZpZXc+XG5cbiAgICAgIDx2aWV3IGNsYXNzPVwiY2FyZCByZXN1bHQtY2FyZFwiPlxuICAgICAgICA8dGV4dCBjbGFzcz1cInRpdGxlXCI+QUkg6L6F5Yqp57uT5p6cPC90ZXh0PlxuICAgICAgICA8dGV4dCBjbGFzcz1cIm11dGVkXCI+566A5LuL44CB5qCH562+5ZKM5o6S54mI5bu66K6uPC90ZXh0PlxuICAgICAgICA8dmlldyBjbGFzcz1cImFzc2lzdC1ib3hcIj5cbiAgICAgICAgICA8dGV4dCB2LWlmPVwiIWFzc2lzdFwiIGNsYXNzPVwibXV0ZWRcIj7nlJ/miJDlkI7kvJrlnKjov5nph4zmmL7npLrnroDku4vjgIHmoIfnrb7lkozmjpLniYjlu7rorq7jgII8L3RleHQ+XG4gICAgICAgICAgPHZpZXcgdi1lbHNlPlxuICAgICAgICAgICAgPHRleHQgY2xhc3M9XCJhc3Npc3QtdGl0bGVcIj57eyBhc3Npc3QudGl0bGUgfHwgdGl0bGUgfHwgJ+acquWRveWQjeS9nOWTgScgfX08L3RleHQ+XG4gICAgICAgICAgICA8dGV4dCBjbGFzcz1cImFzc2lzdC1zdW1tYXJ5XCI+e3sgYXNzaXN0LnN1bW1hcnkgfHwgJ+aaguaXoOeugOS7iycgfX08L3RleHQ+XG4gICAgICAgICAgICA8dmlldyBjbGFzcz1cImNoaXBzXCI+PHRleHQgdi1mb3I9XCJ0IGluIGFzc2lzdFRhZ3NcIiA6a2V5PVwidFwiIGNsYXNzPVwiY2hpcCBhY3RpdmVcIj57eyB0IH19PC90ZXh0Pjwvdmlldz5cbiAgICAgICAgICAgIDx0ZXh0IGNsYXNzPVwic3ViLXRpdGxlIHN1Z2dlc3Rpb25zLXRpdGxlXCI+5o6S54mI5bu66K6uPC90ZXh0PlxuICAgICAgICAgICAgPHRleHQgdi1mb3I9XCIoeCxpZHgpIGluIHN1Z2dlc3Rpb25zXCIgOmtleT1cImlkeFwiIGNsYXNzPVwic3VnZ2VzdGlvblwiPuKAoiB7eyB4IH19PC90ZXh0PlxuICAgICAgICAgIDwvdmlldz5cbiAgICAgICAgPC92aWV3PlxuICAgICAgPC92aWV3PlxuXG4gICAgICA8dmlldyBjbGFzcz1cImNhcmQgbWFudXNjcmlwdC1jYXJkXCI+XG4gICAgICAgIDx0ZXh0IGNsYXNzPVwidGl0bGVcIj7nlJ/miJDmraPmloc8L3RleHQ+XG4gICAgICAgIDx0ZXh0IGNsYXNzPVwibXV0ZWRcIj7lj6/ku6XmiYvliqjkv67mlLnlkI7kv53lrZg8L3RleHQ+XG4gICAgICAgIDx0ZXh0YXJlYSBjbGFzcz1cInRleHRhcmVhIG1hbnVzY3JpcHRcIiB2LW1vZGVsPVwibWFudXNjcmlwdFwiIHBsYWNlaG9sZGVyPVwi54K55Ye755Sf5oiQ5bCP6K+05ZCO77yM5q2j5paH5Lya5Ye6546w5Zyo6L+Z6YeM77yb5Lmf5Y+v5Lul55u05o6l57KY6LS06Ieq5bex55qE5q2j5paH5ZCO5L+d5a2Y44CCXCI+PC90ZXh0YXJlYT5cbiAgICAgIDwvdmlldz5cblxuICAgICAgPHZpZXcgY2xhc3M9XCJjYXJkXCI+XG4gICAgICAgIDx2aWV3IGNsYXNzPVwiYmV0d2VlblwiPlxuICAgICAgICAgIDx0ZXh0IGNsYXNzPVwidGl0bGVcIj7miJHnmoRBSeWwj+ivtDwvdGV4dD5cbiAgICAgICAgICA8dGV4dCBjbGFzcz1cImJhZGdlXCI+e3sgd29ya3MubGVuZ3RoIH19IOevhzwvdGV4dD5cbiAgICAgICAgPC92aWV3PlxuICAgICAgICA8dmlldyB2LWZvcj1cIncgaW4gd29ya3NcIiA6a2V5PVwidy5pZCB8fCAody5ib29rICYmIHcuYm9vay5pZClcIiBjbGFzcz1cIndvcmstaXRlbVwiIEBjbGljaz1cIm9wZW5Xb3JrKHcpXCI+XG4gICAgICAgICAgPHRleHQgY2xhc3M9XCJ3b3JrLXRpdGxlXCI+e3sgd29ya1RpdGxlKHcpIH19PC90ZXh0PlxuICAgICAgICAgIDx0ZXh0IGNsYXNzPVwibXV0ZWRcIj57eyB3b3JrQXV0aG9yKHcpIH19PC90ZXh0PlxuICAgICAgICA8L3ZpZXc+XG4gICAgICAgIDx0ZXh0IHYtaWY9XCJ3b3Jrcy5sZW5ndGggPT09IDBcIiBjbGFzcz1cIm11dGVkXCI+6L+Y5rKh5pyJ5L+d5a2YIEFJIOWwj+ivtOOAgjwvdGV4dD5cbiAgICAgIDwvdmlldz5cbiAgICA8L3ZpZXc+XG4gIDwvdmlldz5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5pbXBvcnQgeyByZXF1ZXN0LCBnZXRUb2tlbiwgc2hvd0Vycm9yIH0gZnJvbSAnLi4vLi4vYXBpL3JlcXVlc3QuanMnXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB7XG4gICAgICBsb2dnZWQ6IGZhbHNlLFxuICAgICAgdGl0bGU6ICcnLFxuICAgICAgZ2VucmU6ICcnLFxuICAgICAgcmVxdWlyZW1lbnQ6ICcnLFxuICAgICAgcmVmZXJlbmNlOiAnJyxcbiAgICAgIG1hbnVzY3JpcHQ6ICcnLFxuICAgICAgYXNzaXN0OiBudWxsLFxuICAgICAgd29ya3M6IFtdLFxuICAgICAgZ2VuZXJhdGluZzogZmFsc2UsXG4gICAgICBzYXZpbmc6IGZhbHNlLFxuICAgICAgd29yZEluZGV4OiAxLFxuICAgICAgd29yZE9wdGlvbnM6IFtcbiAgICAgICAgeyBsYWJlbDogJ+efreevhyA2MDAtMTAwMCDlrZcnLCB2YWx1ZTogODAwIH0sXG4gICAgICAgIHsgbGFiZWw6ICfmoIflh4bnn63nr4cgMTAwMC0yMDAwIOWtlycsIHZhbHVlOiAxNTAwIH0sXG4gICAgICAgIHsgbGFiZWw6ICfkuK3nr4fniYfmrrUgMjAwMC00MDAwIOWtlycsIHZhbHVlOiAzMDAwIH0sXG4gICAgICAgIHsgbGFiZWw6ICfplb/nr4fnq6DoioIgNDAwMC04MDAwIOWtlycsIHZhbHVlOiA2MDAwIH0sXG4gICAgICAgIHsgbGFiZWw6ICfplb/nr4fmianlhpkgODAwMC0xMjAwMCDlrZcnLCB2YWx1ZTogMTAwMDAgfVxuICAgICAgXVxuICAgIH1cbiAgfSxcbiAgY29tcHV0ZWQ6IHtcbiAgICBhc3Npc3RUYWdzOiBmdW5jdGlvbiAoKSB7IHJldHVybiAodGhpcy5hc3Npc3QgJiYgdGhpcy5hc3Npc3QudGFncykgfHwgW10gfSxcbiAgICBzdWdnZXN0aW9uczogZnVuY3Rpb24gKCkgeyByZXR1cm4gKHRoaXMuYXNzaXN0ICYmIHRoaXMuYXNzaXN0LmxheW91dF9zdWdnZXN0aW9ucykgfHwgWyflu7rorq7lhYjnlJ/miJDlsI/or7TlkI7lho3kv53lrZjkvZzlk4HjgIInXSB9XG4gIH0sXG4gIG9uU2hvdzogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMubG9nZ2VkID0gISFnZXRUb2tlbigpXG4gICAgaWYgKHRoaXMubG9nZ2VkKSB0aGlzLmxvYWRXb3JrcygpXG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICB3b3JkQ2hhbmdlOiBmdW5jdGlvbiAoZSkgeyB0aGlzLndvcmRJbmRleCA9IE51bWJlcihlLmRldGFpbC52YWx1ZSB8fCAwKSB9LFxuICAgIGdvTG9naW46IGZ1bmN0aW9uICgpIHsgdW5pLm5hdmlnYXRlVG8oeyB1cmw6ICcvcGFnZXMvbG9naW4vbG9naW4nIH0pIH0sXG4gICAgdmFsaWRhdGVHZW5lcmF0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKCF0aGlzLnRpdGxlLnRyaW0oKSkgdGhyb3cgbmV3IEVycm9yKCfor7floavlhpnkvZzlk4HmoIfpopgnKVxuICAgICAgaWYgKCF0aGlzLmdlbnJlLnRyaW0oKSkgdGhyb3cgbmV3IEVycm9yKCfor7floavlhpnpopjmnZDmlrnlkJEnKVxuICAgICAgaWYgKCF0aGlzLnJlcXVpcmVtZW50LnRyaW0oKSkgdGhyb3cgbmV3IEVycm9yKCfor7floavlhpnlhbfkvZPpnIDmsYInKVxuICAgIH0sXG4gICAgZ2VuZXJhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnN0IHRoYXQgPSB0aGlzXG4gICAgICB0cnkgeyB0aGF0LnZhbGlkYXRlR2VuZXJhdGUoKSB9IGNhdGNoIChlKSB7IHNob3dFcnJvcihlKTsgcmV0dXJuIH1cbiAgICAgIHRoYXQuZ2VuZXJhdGluZyA9IHRydWVcbiAgICAgIHRoYXQuYXNzaXN0ID0gbnVsbFxuICAgICAgcmVxdWVzdCgnL2NoYXQvb3JpZ2luYWwvZ2VuZXJhdGUnLCB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgdGl0bGU6IHRoYXQudGl0bGUudHJpbSgpLFxuICAgICAgICAgIGdlbnJlOiB0aGF0LmdlbnJlLnRyaW0oKSxcbiAgICAgICAgICByZXF1aXJlbWVudDogdGhhdC5yZXF1aXJlbWVudC50cmltKCksXG4gICAgICAgICAgcmVmZXJlbmNlX3RleHQ6IHRoYXQucmVmZXJlbmNlLnRyaW0oKSB8fCBudWxsLFxuICAgICAgICAgIHdvcmRfY291bnQ6IHRoYXQud29yZE9wdGlvbnNbdGhhdC53b3JkSW5kZXhdLnZhbHVlXG4gICAgICAgIH0sXG4gICAgICAgIHRpbWVvdXQ6IDYwMDAwXG4gICAgICB9KS50aGVuKGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgdGhhdC5tYW51c2NyaXB0ID0gcmVzLm1hbnVzY3JpcHQgfHwgJydcbiAgICAgICAgdGhhdC5hc3Npc3QgPSByZXMuYXNzaXN0IHx8IG51bGxcbiAgICAgICAgdW5pLnNob3dUb2FzdCh7IHRpdGxlOiAn55Sf5oiQ5a6M5oiQJywgaWNvbjogJ3N1Y2Nlc3MnIH0pXG4gICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZSkgeyBzaG93RXJyb3IoZSwgJ+eUn+aIkOWksei0pScpIH0pLnRoZW4oZnVuY3Rpb24gKCkgeyB0aGF0LmdlbmVyYXRpbmcgPSBmYWxzZSB9KVxuICAgIH0sXG4gICAgc2F2ZTogZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3QgdGhhdCA9IHRoaXNcbiAgICAgIGlmICghdGhhdC5tYW51c2NyaXB0LnRyaW0oKSB8fCB0aGF0Lm1hbnVzY3JpcHQudHJpbSgpLmxlbmd0aCA8IDIwKSB7XG4gICAgICAgIHVuaS5zaG93VG9hc3QoeyB0aXRsZTogJ+ato+aWh+iHs+WwkemcgOimgSAyMCDkuKrlrZcnLCBpY29uOiAnbm9uZScgfSlcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICB0aGF0LnNhdmluZyA9IHRydWVcbiAgICAgIGNvbnN0IGFzc2lzdCA9IHRoYXQuYXNzaXN0IHx8IHt9XG4gICAgICByZXF1ZXN0KCcvY2hhdC9vcmlnaW5hbC9zYXZlJywge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIHRpdGxlOiB0aGF0LnRpdGxlLnRyaW0oKSB8fCAn5pyq5ZG95ZCN5Y6f5Yib5L2c5ZOBJyxcbiAgICAgICAgICBnZW5yZTogdGhhdC5nZW5yZS50cmltKCkgfHwgJ+WOn+WImycsXG4gICAgICAgICAgbWFudXNjcmlwdDogdGhhdC5tYW51c2NyaXB0LnRyaW0oKSxcbiAgICAgICAgICBzdW1tYXJ5OiBhc3Npc3Quc3VtbWFyeSB8fCBudWxsLFxuICAgICAgICAgIHRhZ3M6IGFzc2lzdC50YWdzIHx8IFtdLFxuICAgICAgICAgIGxheW91dF9zdWdnZXN0aW9uczogYXNzaXN0LmxheW91dF9zdWdnZXN0aW9ucyB8fCBbXSxcbiAgICAgICAgICBzYXZlX3RvX3NoZWxmOiB0cnVlXG4gICAgICAgIH0sXG4gICAgICAgIHRpbWVvdXQ6IDMwMDAwXG4gICAgICB9KS50aGVuKGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgdGhhdC5hc3Npc3QgPSByZXMuYXNzaXN0IHx8IHRoYXQuYXNzaXN0XG4gICAgICAgIHVuaS5zaG93VG9hc3QoeyB0aXRsZTogJ+W3suS/neWtmOWIsOS5puaeticsIGljb246ICdzdWNjZXNzJyB9KVxuICAgICAgICB0aGF0LmxvYWRXb3JrcygpXG4gICAgICAgIGlmIChyZXMuYm9vayAmJiByZXMuYm9vay5pZCkge1xuICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkgeyB1bmkubmF2aWdhdGVUbyh7IHVybDogJy9wYWdlcy9kZXRhaWwvZGV0YWlsP2lkPScgKyByZXMuYm9vay5pZCB9KSB9LCA1MDApXG4gICAgICAgIH1cbiAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlKSB7IHNob3dFcnJvcihlLCAn5L+d5a2Y5aSx6LSlJykgfSkudGhlbihmdW5jdGlvbiAoKSB7IHRoYXQuc2F2aW5nID0gZmFsc2UgfSlcbiAgICB9LFxuICAgIGxvYWRXb3JrczogZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3QgdGhhdCA9IHRoaXNcbiAgICAgIHJlcXVlc3QoJy9jaGF0L29yaWdpbmFsL21pbmUnKS50aGVuKGZ1bmN0aW9uIChyZXMpIHsgdGhhdC53b3JrcyA9IHJlcy5pdGVtcyB8fCBbXSB9KS5jYXRjaChmdW5jdGlvbiAoKSB7IHRoYXQud29ya3MgPSBbXSB9KVxuICAgIH0sXG4gICAgd29ya1RpdGxlOiBmdW5jdGlvbiAodykgeyBjb25zdCBiID0gdy5ib29rIHx8IHc7IHJldHVybiBiLnRpdGxlIHx8ICfmnKrlkb3lkI3kvZzlk4EnIH0sXG4gICAgd29ya0F1dGhvcjogZnVuY3Rpb24gKHcpIHsgY29uc3QgYiA9IHcuYm9vayB8fCB3OyByZXR1cm4gQXJyYXkuaXNBcnJheShiLmF1dGhvcnMpID8gKGIuYXV0aG9ycy5qb2luKCfjgIEnKSB8fCAn5oiRJykgOiAoYi5hdXRob3IgfHwgJ+aIkScpIH0sXG4gICAgb3Blbldvcms6IGZ1bmN0aW9uICh3KSB7IGNvbnN0IGIgPSB3LmJvb2sgfHwgdzsgY29uc3QgaWQgPSBiLmlkIHx8IGIuYm9va19pZDsgaWYgKGlkKSB1bmkubmF2aWdhdGVUbyh7IHVybDogJy9wYWdlcy9kZXRhaWwvZGV0YWlsP2lkPScgKyBpZCB9KSB9XG4gIH1cbn1cbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuLm9yaWdpbmFsLXBhZ2V7cGFkZGluZy1ib3R0b206Y2FsYygzNnJweCArIGVudihzYWZlLWFyZWEtaW5zZXQtYm90dG9tKSl9Lmhlcm8tY2FyZHtwYWRkaW5nOjM0cnB4O21hcmdpbi1ib3R0b206MjJycHg7Ym9yZGVyLXJhZGl1czozNHJweDtiYWNrZ3JvdW5kOmxpbmVhci1ncmFkaWVudCgxMzVkZWcsI2VkZTlmZSwjZTBmMmZlKTtib3gtc2hhZG93OjAgMjBycHggNDZycHggcmdiYSgxNSwyMyw0MiwuMDgpfS5leWVicm93e2Rpc3BsYXk6YmxvY2s7Y29sb3I6IzZkMjhkOTtmb250LXNpemU6MjJycHg7Zm9udC13ZWlnaHQ6OTAwO21hcmdpbi1ib3R0b206MTBycHh9LmJpZy10aXRsZXtkaXNwbGF5OmJsb2NrO2ZvbnQtc2l6ZTo0NnJweDtmb250LXdlaWdodDo5MDA7Y29sb3I6IzExMTgyNzttYXJnaW4tYm90dG9tOjEwcnB4fS5oZXJvLWRlc2N7ZGlzcGxheTpibG9jaztjb2xvcjojNDc1NDY3O2ZvbnQtc2l6ZToyNnJweDtsaW5lLWhlaWdodDoxLjd9Lmhlcm8tdGFnc3tkaXNwbGF5OmZsZXg7Z2FwOjEwcnB4O2ZsZXgtd3JhcDp3cmFwO21hcmdpbi10b3A6MjJycHh9Lmhlcm8tdGFncyB0ZXh0e3BhZGRpbmc6MTBycHggMTZycHg7Ym9yZGVyLXJhZGl1czo5OTlycHg7YmFja2dyb3VuZDpyZ2JhKDI1NSwyNTUsMjU1LC43Mik7Y29sb3I6IzMzNDE1NTtmb250LXNpemU6MjJycHg7Zm9udC13ZWlnaHQ6ODAwfS5sb2NrLWNhcmR7dGV4dC1hbGlnbjpjZW50ZXI7YmFja2dyb3VuZDojZmZmO2JvcmRlci1yYWRpdXM6MzRycHg7cGFkZGluZzo1MHJweCAzNHJweDtib3gtc2hhZG93OjAgMjBycHggNTBycHggcmdiYSgxNSwyMyw0MiwuMDgpfS5sb2NrLWljb257ZGlzcGxheTpibG9jaztmb250LXNpemU6NjRycHg7bWFyZ2luLWJvdHRvbToxNHJweH0uY2VudGVye3RleHQtYWxpZ246Y2VudGVyfS5sb2NrLWNhcmQgLmJ0bnttYXJnaW4tdG9wOjI4cnB4fS5sYXlvdXR7ZGlzcGxheTpibG9ja30uZm9ybS1jYXJkLC5yZXN1bHQtY2FyZCwubWFudXNjcmlwdC1jYXJke3BhZGRpbmc6MzBycHh9LnNlY3Rpb24taGVhZHtkaXNwbGF5OmZsZXg7anVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW47YWxpZ24taXRlbXM6Y2VudGVyO21hcmdpbi1ib3R0b206MThycHh9LmZpZWxke21hcmdpbi1ib3R0b206MjJycHh9LmZpZWxkLXJvd3tkaXNwbGF5OmZsZXg7Z2FwOjE4cnB4fS5maWVsZC5oYWxme2ZsZXg6MX0ubGFiZWx7ZGlzcGxheTpibG9jazttYXJnaW4tYm90dG9tOjEwcnB4O2NvbG9yOiMzNDQwNTQ7Zm9udC1zaXplOjI0cnB4O2ZvbnQtd2VpZ2h0OjkwMH0ucGlja2VyLWJveHtoZWlnaHQ6ODJycHg7bGluZS1oZWlnaHQ6ODJycHg7cGFkZGluZzowIDI0cnB4O2JvcmRlci1yYWRpdXM6MjBycHg7Ym9yZGVyOjFycHggc29saWQgI2QwZDVkZDtiYWNrZ3JvdW5kOiNmZmY7Y29sb3I6IzExMTgyNztmb250LXNpemU6MjhycHh9LnJlZnttaW4taGVpZ2h0OjE3MHJweH0ucmVxe21pbi1oZWlnaHQ6MTkwcnB4fS5hY3Rpb25ze2Rpc3BsYXk6ZmxleDtnYXA6MTZycHh9LmFjdGlvbnMgLmJ0bntmbGV4OjF9LmFzc2lzdC1ib3h7bWluLWhlaWdodDoxNTBycHg7cGFkZGluZzoyNHJweDtib3JkZXI6MXJweCBkYXNoZWQgI2NiZDVlMTtib3JkZXItcmFkaXVzOjI0cnB4O2JhY2tncm91bmQ6I2Y4ZmFmYzttYXJnaW4tdG9wOjE4cnB4fS5hc3Npc3QtdGl0bGV7ZGlzcGxheTpibG9jaztmb250LXNpemU6MzBycHg7Zm9udC13ZWlnaHQ6OTAwO2NvbG9yOiMxMTE4Mjc7bWFyZ2luLWJvdHRvbToxMnJweH0uYXNzaXN0LXN1bW1hcnl7ZGlzcGxheTpibG9jaztjb2xvcjojNDc1NDY3O2ZvbnQtc2l6ZToyNXJweDtsaW5lLWhlaWdodDoxLjc7bWFyZ2luLWJvdHRvbToxNHJweH0uc3VnZ2VzdGlvbnMtdGl0bGV7bWFyZ2luLXRvcDoxNnJweH0uc3VnZ2VzdGlvbntkaXNwbGF5OmJsb2NrO2NvbG9yOiM0NzU0Njc7Zm9udC1zaXplOjI0cnB4O2xpbmUtaGVpZ2h0OjEuOH0ubWFudXNjcmlwdHttaW4taGVpZ2h0OjUyMHJweDttYXJnaW4tdG9wOjE4cnB4fS5iYWRnZXtwYWRkaW5nOjhycHggMTRycHg7Ym9yZGVyLXJhZGl1czo5OTlycHg7YmFja2dyb3VuZDojZWRlOWZlO2NvbG9yOiM2ZDI4ZDk7Zm9udC1zaXplOjIycnB4O2ZvbnQtd2VpZ2h0OjkwMH0ud29yay1pdGVte3BhZGRpbmc6MThycHggMDtib3JkZXItYm90dG9tOjFycHggc29saWQgI2VlZjJmN30ud29yay10aXRsZXtkaXNwbGF5OmJsb2NrO2NvbG9yOiMxMTE4Mjc7Zm9udC1zaXplOjI4cnB4O2ZvbnQtd2VpZ2h0OjkwMDttYXJnaW4tYm90dG9tOjZycHh9QG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDozODBweCl7LmZpZWxkLXJvd3tkaXNwbGF5OmJsb2NrfS5hY3Rpb25ze2Rpc3BsYXk6YmxvY2t9LmFjdGlvbnMgLmJ0bnttYXJnaW4tYm90dG9tOjEycnB4fX1cbjwvc3R5bGU+XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///73\n");

/***/ }),
/* 74 */
/*!*********************************************************************************************!*\
  !*** E:/翻译漫画/book-main (14)/book-main/frontend-uni/pages/platform/platform.vue?mpType=page ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _platform_vue_vue_type_template_id_45d4c794_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./platform.vue?vue&type=template&id=45d4c794&scoped=true&mpType=page */ 75);\n/* harmony import */ var _platform_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./platform.vue?vue&type=script&lang=js&mpType=page */ 77);\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _platform_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__) if([\"default\"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _platform_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n/* harmony import */ var _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 18);\n\nvar renderjs\n\n\n\n\n/* normalize component */\n\nvar component = Object(_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\n  _platform_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _platform_vue_vue_type_template_id_45d4c794_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _platform_vue_vue_type_template_id_45d4c794_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  \"45d4c794\",\n  null,\n  false,\n  _platform_vue_vue_type_template_id_45d4c794_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__[\"components\"],\n  renderjs\n)\n\ncomponent.options.__file = \"pages/platform/platform.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbbnVsbF0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBNEk7QUFDNUk7QUFDdUU7QUFDTDs7O0FBR2xFO0FBQ2dNO0FBQ2hNLGdCQUFnQix1TUFBVTtBQUMxQixFQUFFLHlGQUFNO0FBQ1IsRUFBRSwwR0FBTTtBQUNSLEVBQUUsbUhBQWU7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUUsOEdBQVU7QUFDWjtBQUNBOztBQUVBO0FBQ2UsZ0YiLCJmaWxlIjoiNzQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucywgcmVjeWNsYWJsZVJlbmRlciwgY29tcG9uZW50cyB9IGZyb20gXCIuL3BsYXRmb3JtLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD00NWQ0Yzc5NCZzY29wZWQ9dHJ1ZSZtcFR5cGU9cGFnZVwiXG52YXIgcmVuZGVyanNcbmltcG9ydCBzY3JpcHQgZnJvbSBcIi4vcGxhdGZvcm0udnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJm1wVHlwZT1wYWdlXCJcbmV4cG9ydCAqIGZyb20gXCIuL3BsYXRmb3JtLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZtcFR5cGU9cGFnZVwiXG5cblxuLyogbm9ybWFsaXplIGNvbXBvbmVudCAqL1xuaW1wb3J0IG5vcm1hbGl6ZXIgZnJvbSBcIiEuLi8uLi8uLi8uLi8uLi9IQnVpbGRlclguNS4wNy4yMDI2MDQxMDA2L0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvdnVlLWxvYWRlci9saWIvcnVudGltZS9jb21wb25lbnROb3JtYWxpemVyLmpzXCJcbnZhciBjb21wb25lbnQgPSBub3JtYWxpemVyKFxuICBzY3JpcHQsXG4gIHJlbmRlcixcbiAgc3RhdGljUmVuZGVyRm5zLFxuICBmYWxzZSxcbiAgbnVsbCxcbiAgXCI0NWQ0Yzc5NFwiLFxuICBudWxsLFxuICBmYWxzZSxcbiAgY29tcG9uZW50cyxcbiAgcmVuZGVyanNcbilcblxuY29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJwYWdlcy9wbGF0Zm9ybS9wbGF0Zm9ybS52dWVcIlxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50LmV4cG9ydHMiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///74\n");

/***/ }),
/* 75 */
/*!***************************************************************************************************************************************!*\
  !*** E:/翻译漫画/book-main (14)/book-main/frontend-uni/pages/platform/platform.vue?vue&type=template&id=45d4c794&scoped=true&mpType=page ***!
  \***************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_0_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_platform_vue_vue_type_template_id_45d4c794_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--11-0!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/filter-modules-template.js!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./platform.vue?vue&type=template&id=45d4c794&scoped=true&mpType=page */ 76);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_0_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_platform_vue_vue_type_template_id_45d4c794_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_0_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_platform_vue_vue_type_template_id_45d4c794_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_0_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_platform_vue_vue_type_template_id_45d4c794_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_0_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_platform_vue_vue_type_template_id_45d4c794_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),
/* 76 */
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--11-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/filter-modules-template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!E:/翻译漫画/book-main (14)/book-main/frontend-uni/pages/platform/platform.vue?vue&type=template&id=45d4c794&scoped=true&mpType=page ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "view",
    { staticClass: _vm._$s(0, "sc", "container"), attrs: { _i: 0 } },
    [
      _c(
        "view",
        { staticClass: _vm._$s(1, "sc", "card hero"), attrs: { _i: 1 } },
        [
          _c("text", {
            staticClass: _vm._$s(2, "sc", "title"),
            attrs: { _i: 2 },
          }),
          _c("text", {
            staticClass: _vm._$s(3, "sc", "muted"),
            attrs: { _i: 3 },
          }),
        ]
      ),
      _c("view", { staticClass: _vm._$s(4, "sc", "card"), attrs: { _i: 4 } }, [
        _c("text", {
          staticClass: _vm._$s(5, "sc", "sub-title"),
          attrs: { _i: 5 },
        }),
        _c(
          "view",
          { staticClass: _vm._$s(6, "sc", "info-row"), attrs: { _i: 6 } },
          [
            _c("text"),
            _c("text", [_vm._v(_vm._$s(8, "t0-0", _vm._s(_vm.platformLabel)))]),
          ]
        ),
        _c(
          "view",
          { staticClass: _vm._$s(9, "sc", "info-row"), attrs: { _i: 9 } },
          [
            _c("text"),
            _c("text", [_vm._v(_vm._$s(11, "t0-0", _vm._s(_vm.origin)))]),
          ]
        ),
        _c(
          "view",
          { staticClass: _vm._$s(12, "sc", "info-row"), attrs: { _i: 12 } },
          [
            _c("text"),
            _c("text", [_vm._v(_vm._$s(14, "t0-0", _vm._s(_vm.apiBase)))]),
          ]
        ),
        _c(
          "view",
          { staticClass: _vm._$s(15, "sc", "info-row"), attrs: { _i: 15 } },
          [
            _c("text"),
            _c("text", [_vm._v(_vm._$s(17, "t0-0", _vm._s(_vm.systemText)))]),
          ]
        ),
        _c("button", {
          staticClass: _vm._$s(18, "sc", "btn"),
          attrs: { _i: 18 },
          on: { click: _vm.check },
        }),
      ]),
      _vm._$s(19, "i", _vm.status)
        ? _c(
            "view",
            { staticClass: _vm._$s(19, "sc", "card"), attrs: { _i: 19 } },
            [
              _c("text", {
                staticClass: _vm._$s(20, "sc", "sub-title"),
                attrs: { _i: 20 },
              }),
              _c(
                "text",
                {
                  class: _vm._$s(21, "c", _vm.ok ? "ok" : "bad"),
                  attrs: { _i: 21 },
                },
                [_vm._v(_vm._$s(21, "t0-0", _vm._s(_vm.status)))]
              ),
              _vm._$s(22, "i", _vm.tips)
                ? _c(
                    "text",
                    {
                      staticClass: _vm._$s(22, "sc", "muted"),
                      attrs: { _i: 22 },
                    },
                    [_vm._v(_vm._$s(22, "t0-0", _vm._s(_vm.tips)))]
                  )
                : _vm._e(),
            ]
          )
        : _vm._e(),
      _c(
        "view",
        { staticClass: _vm._$s(23, "sc", "card"), attrs: { _i: 23 } },
        [
          _c("text", {
            staticClass: _vm._$s(24, "sc", "sub-title"),
            attrs: { _i: 24 },
          }),
          _c("text", {
            staticClass: _vm._$s(25, "sc", "muted"),
            attrs: { _i: 25 },
          }),
          _c("text", {
            staticClass: _vm._$s(26, "sc", "muted"),
            attrs: { _i: 26 },
          }),
          _c("text", {
            staticClass: _vm._$s(27, "sc", "muted"),
            attrs: { _i: 27 },
          }),
        ]
      ),
    ]
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),
/* 77 */
/*!*********************************************************************************************************************!*\
  !*** E:/翻译漫画/book-main (14)/book-main/frontend-uni/pages/platform/platform.vue?vue&type=script&lang=js&mpType=page ***!
  \*********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_1_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_platform_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--7-1!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/using-components.js!../../../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./platform.vue?vue&type=script&lang=js&mpType=page */ 78);\n/* harmony import */ var _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_1_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_platform_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_1_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_platform_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_1_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_platform_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__) if([\"default\"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_1_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_platform_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n /* harmony default export */ __webpack_exports__[\"default\"] = (_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_1_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_platform_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0___default.a); //# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbbnVsbF0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQW1xQixDQUFnQixpckJBQUcsRUFBQyIsImZpbGUiOiI3Ny5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vSEJ1aWxkZXJYLjUuMDcuMjAyNjA0MTAwNi9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzIS4uLy4uLy4uLy4uLy4uL0hCdWlsZGVyWC41LjA3LjIwMjYwNDEwMDYvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy93ZWJwYWNrLXByZXByb2Nlc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTctMSEuLi8uLi8uLi8uLi8uLi9IQnVpbGRlclguNS4wNy4yMDI2MDQxMDA2L0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvd2VicGFjay11bmktYXBwLWxvYWRlci91c2luZy1jb21wb25lbnRzLmpzIS4uLy4uLy4uLy4uLy4uL0hCdWlsZGVyWC41LjA3LjIwMjYwNDEwMDYvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vcGxhdGZvcm0udnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJm1wVHlwZT1wYWdlXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vSEJ1aWxkZXJYLjUuMDcuMjAyNjA0MTAwNi9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzIS4uLy4uLy4uLy4uLy4uL0hCdWlsZGVyWC41LjA3LjIwMjYwNDEwMDYvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy93ZWJwYWNrLXByZXByb2Nlc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTctMSEuLi8uLi8uLi8uLi8uLi9IQnVpbGRlclguNS4wNy4yMDI2MDQxMDA2L0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvd2VicGFjay11bmktYXBwLWxvYWRlci91c2luZy1jb21wb25lbnRzLmpzIS4uLy4uLy4uLy4uLy4uL0hCdWlsZGVyWC41LjA3LjIwMjYwNDEwMDYvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vcGxhdGZvcm0udnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJm1wVHlwZT1wYWdlXCIiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///77\n");

/***/ }),
/* 78 */
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--7-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/using-components.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!E:/翻译漫画/book-main (14)/book-main/frontend-uni/pages/platform/platform.vue?vue&type=script&lang=js&mpType=page ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\nvar _request = __webpack_require__(/*! ../../api/request.js */ 17);\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\nvar _default = {\n  data: function data() {\n    return {\n      origin: _request.ORIGIN,\n      apiBase: _request.API_BASE,\n      platformLabel: (0, _request.getPlatformLabel)(),\n      system: (0, _request.systemInfo)(),\n      status: '',\n      tips: '',\n      ok: false\n    };\n  },\n  computed: {\n    systemText: function systemText() {\n      var s = this.system || {};\n      return [s.platform, s.system, s.model].filter(Boolean).join(' · ') || '未知';\n    }\n  },\n  onLoad: function onLoad() {\n    this.check();\n  },\n  methods: {\n    check: function check() {\n      var that = this;\n      that.status = '正在检测...';\n      that.tips = '';\n      that.ok = false;\n      (0, _request.healthCheck)().then(function () {\n        that.ok = true;\n        that.status = '后端连接正常';\n        that.tips = '现在可以继续测试登录、搜索、图谱、书架和阅读器。';\n      }).catch(function (e) {\n        that.ok = false;\n        that.status = e && e.message || '后端连接失败';\n        that.tips = '请确认后端已启动、手机和电脑同一网络、防火墙已放行 8000 端口，并检查 LAN_ORIGIN 是否为电脑真实 IPv4。';\n      });\n    }\n  }\n};\nexports.default = _default;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVuaS1hcHA6Ly8vcGFnZXMvcGxhdGZvcm0vcGxhdGZvcm0udnVlIl0sIm5hbWVzIjpbImRhdGEiLCJvcmlnaW4iLCJhcGlCYXNlIiwicGxhdGZvcm1MYWJlbCIsInN5c3RlbSIsInN0YXR1cyIsInRpcHMiLCJvayIsImNvbXB1dGVkIiwic3lzdGVtVGV4dCIsIm9uTG9hZCIsIm1ldGhvZHMiLCJjaGVjayIsInRoYXQiXSwibWFwcGluZ3MiOiI7Ozs7OztBQWdDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7ZUFFQTtFQUNBQTtJQUNBO01BQ0FDO01BQ0FDO01BQ0FDO01BQ0FDO01BQ0FDO01BQ0FDO01BQ0FDO0lBQ0E7RUFDQTtFQUNBQztJQUNBQztNQUNBO01BQ0E7SUFDQTtFQUNBO0VBQ0FDO0lBQUE7RUFBQTtFQUNBQztJQUNBQztNQUNBO01BQ0FDO01BQ0FBO01BQ0FBO01BQ0E7UUFDQUE7UUFDQUE7UUFDQUE7TUFDQTtRQUNBQTtRQUNBQTtRQUNBQTtNQUNBO0lBQ0E7RUFDQTtBQUNBO0FBQUEiLCJmaWxlIjoiNzguanMiLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XG4gIDx2aWV3IGNsYXNzPVwiY29udGFpbmVyXCI+XG4gICAgPHZpZXcgY2xhc3M9XCJjYXJkIGhlcm9cIj5cbiAgICAgIDx0ZXh0IGNsYXNzPVwidGl0bGVcIj7lpJrnq6/ov57mjqXor4rmlq08L3RleHQ+XG4gICAgICA8dGV4dCBjbGFzcz1cIm11dGVkXCI+55So5LqOIEFuZHJvaWTjgIFpT1PjgIHlvq7kv6HlsI/nqIvluo/osIPor5XmjqXlj6PlnLDlnYDlkozlkI7nq6/ov57pgJrmgKfjgII8L3RleHQ+XG4gICAgPC92aWV3PlxuXG4gICAgPHZpZXcgY2xhc3M9XCJjYXJkXCI+XG4gICAgICA8dGV4dCBjbGFzcz1cInN1Yi10aXRsZVwiPuW9k+WJjei/kOihjOeOr+WigzwvdGV4dD5cbiAgICAgIDx2aWV3IGNsYXNzPVwiaW5mby1yb3dcIj48dGV4dD7lubPlj7A8L3RleHQ+PHRleHQ+e3sgcGxhdGZvcm1MYWJlbCB9fTwvdGV4dD48L3ZpZXc+XG4gICAgICA8dmlldyBjbGFzcz1cImluZm8tcm93XCI+PHRleHQ+5ZCO56uv5Zyw5Z2APC90ZXh0Pjx0ZXh0Pnt7IG9yaWdpbiB9fTwvdGV4dD48L3ZpZXc+XG4gICAgICA8dmlldyBjbGFzcz1cImluZm8tcm93XCI+PHRleHQ+5o6l5Y+j5Zyw5Z2APC90ZXh0Pjx0ZXh0Pnt7IGFwaUJhc2UgfX08L3RleHQ+PC92aWV3PlxuICAgICAgPHZpZXcgY2xhc3M9XCJpbmZvLXJvd1wiPjx0ZXh0Puezu+e7nzwvdGV4dD48dGV4dD57eyBzeXN0ZW1UZXh0IH19PC90ZXh0Pjwvdmlldz5cbiAgICAgIDxidXR0b24gY2xhc3M9XCJidG5cIiBAY2xpY2s9XCJjaGVja1wiPua1i+ivleWQjuerr+i/nuaOpTwvYnV0dG9uPlxuICAgIDwvdmlldz5cblxuICAgIDx2aWV3IGNsYXNzPVwiY2FyZFwiIHYtaWY9XCJzdGF0dXNcIj5cbiAgICAgIDx0ZXh0IGNsYXNzPVwic3ViLXRpdGxlXCI+5qOA5rWL57uT5p6cPC90ZXh0PlxuICAgICAgPHRleHQgOmNsYXNzPVwib2sgPyAnb2snIDogJ2JhZCdcIj57eyBzdGF0dXMgfX08L3RleHQ+XG4gICAgICA8dGV4dCBjbGFzcz1cIm11dGVkXCIgdi1pZj1cInRpcHNcIj57eyB0aXBzIH19PC90ZXh0PlxuICAgIDwvdmlldz5cblxuICAgIDx2aWV3IGNsYXNzPVwiY2FyZFwiPlxuICAgICAgPHRleHQgY2xhc3M9XCJzdWItdGl0bGVcIj7ov5DooYzmj5DnpLo8L3RleHQ+XG4gICAgICA8dGV4dCBjbGFzcz1cIm11dGVkXCI+QW5kcm9pZCAvIGlQaG9uZSDnnJ/mnLrvvJrmiYvmnLrlkoznlLXohJHopoHlnKjlkIzkuIDkuKogV2ktRmnvvIzlkI7nq6/lv4XpobvnlKggLS1ob3N0IDAuMC4wLjAg5ZCv5Yqo44CCPC90ZXh0PlxuICAgICAgPHRleHQgY2xhc3M9XCJtdXRlZFwiPuW+ruS/oeWwj+eoi+W6j+W8gOWPkeW3peWFt++8muacrOWcsOiwg+ivleWPr+WFs+mXreWQiOazleWfn+WQjeagoemqjO+8m+ato+W8j+WPkeW4g+mcgOimgSBIVFRQUyDln5/lkI3jgII8L3RleHQ+XG4gICAgICA8dGV4dCBjbGFzcz1cIm11dGVkXCI+5aaC5p6c6L+e5o6l5aSx6LSl77yM5L+u5pS5IGZyb250ZW5kLXVuaS9hcGkvcmVxdWVzdC5qcyDph4znmoQgTEFOX09SSUdJTuOAgjwvdGV4dD5cbiAgICA8L3ZpZXc+XG4gIDwvdmlldz5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5pbXBvcnQgeyBPUklHSU4sIEFQSV9CQVNFLCBnZXRQbGF0Zm9ybUxhYmVsLCBzeXN0ZW1JbmZvLCBoZWFsdGhDaGVjayB9IGZyb20gJy4uLy4uL2FwaS9yZXF1ZXN0LmpzJ1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGRhdGE6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgb3JpZ2luOiBPUklHSU4sXG4gICAgICBhcGlCYXNlOiBBUElfQkFTRSxcbiAgICAgIHBsYXRmb3JtTGFiZWw6IGdldFBsYXRmb3JtTGFiZWwoKSxcbiAgICAgIHN5c3RlbTogc3lzdGVtSW5mbygpLFxuICAgICAgc3RhdHVzOiAnJyxcbiAgICAgIHRpcHM6ICcnLFxuICAgICAgb2s6IGZhbHNlXG4gICAgfVxuICB9LFxuICBjb21wdXRlZDoge1xuICAgIHN5c3RlbVRleHQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnN0IHMgPSB0aGlzLnN5c3RlbSB8fCB7fVxuICAgICAgcmV0dXJuIFtzLnBsYXRmb3JtLCBzLnN5c3RlbSwgcy5tb2RlbF0uZmlsdGVyKEJvb2xlYW4pLmpvaW4oJyDCtyAnKSB8fCAn5pyq55+lJ1xuICAgIH1cbiAgfSxcbiAgb25Mb2FkOiBmdW5jdGlvbiAoKSB7IHRoaXMuY2hlY2soKSB9LFxuICBtZXRob2RzOiB7XG4gICAgY2hlY2s6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnN0IHRoYXQgPSB0aGlzXG4gICAgICB0aGF0LnN0YXR1cyA9ICfmraPlnKjmo4DmtYsuLi4nXG4gICAgICB0aGF0LnRpcHMgPSAnJ1xuICAgICAgdGhhdC5vayA9IGZhbHNlXG4gICAgICBoZWFsdGhDaGVjaygpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGF0Lm9rID0gdHJ1ZVxuICAgICAgICB0aGF0LnN0YXR1cyA9ICflkI7nq6/ov57mjqXmraPluLgnXG4gICAgICAgIHRoYXQudGlwcyA9ICfnjrDlnKjlj6/ku6Xnu6fnu63mtYvor5XnmbvlvZXjgIHmkJzntKLjgIHlm77osLHjgIHkuabmnrblkozpmIXor7vlmajjgIInXG4gICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZSkge1xuICAgICAgICB0aGF0Lm9rID0gZmFsc2VcbiAgICAgICAgdGhhdC5zdGF0dXMgPSAoZSAmJiBlLm1lc3NhZ2UpIHx8ICflkI7nq6/ov57mjqXlpLHotKUnXG4gICAgICAgIHRoYXQudGlwcyA9ICfor7fnoa7orqTlkI7nq6/lt7LlkK/liqjjgIHmiYvmnLrlkoznlLXohJHlkIzkuIDnvZHnu5zjgIHpmLLngavlopnlt7LmlL7ooYwgODAwMCDnq6/lj6PvvIzlubbmo4Dmn6UgTEFOX09SSUdJTiDmmK/lkKbkuLrnlLXohJHnnJ/lrp4gSVB2NOOAgidcbiAgICAgIH0pXG4gICAgfVxuICB9XG59XG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cbi5oZXJve2JhY2tncm91bmQ6bGluZWFyLWdyYWRpZW50KDEzNWRlZywjZmZmLCNlZmY2ZmYpfS5pbmZvLXJvd3tkaXNwbGF5OmZsZXg7anVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW47Z2FwOjE4cnB4O3BhZGRpbmc6MThycHggMDtib3JkZXItYm90dG9tOjFycHggc29saWQgI2VlZjJmN30uaW5mby1yb3cgdGV4dDpmaXJzdC1jaGlsZHtjb2xvcjojNjY3MDg1O2ZvbnQtc2l6ZToyNnJweH0uaW5mby1yb3cgdGV4dDpsYXN0LWNoaWxke2ZsZXg6MTt0ZXh0LWFsaWduOnJpZ2h0O2NvbG9yOiMxMTE4Mjc7Zm9udC1zaXplOjI0cnB4O2ZvbnQtd2VpZ2h0OjgwMDt3b3JkLWJyZWFrOmJyZWFrLWFsbH0ub2t7ZGlzcGxheTpibG9jaztjb2xvcjojMDQ3ODU3O2ZvbnQtc2l6ZTozMHJweDtmb250LXdlaWdodDo5MDA7bWFyZ2luLWJvdHRvbToxMnJweH0uYmFke2Rpc3BsYXk6YmxvY2s7Y29sb3I6I2I0MjMxODtmb250LXNpemU6MzBycHg7Zm9udC13ZWlnaHQ6OTAwO21hcmdpbi1ib3R0b206MTJycHh9LmJ0bnttYXJnaW4tdG9wOjIycnB4fVxuPC9zdHlsZT5cbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///78\n");

/***/ }),
/* 79 */
/*!**********************!*\
  !*** external "Vue" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = Vue;

/***/ }),
/* 80 */
/*!*************************************************************!*\
  !*** E:/翻译漫画/book-main (14)/book-main/frontend-uni/App.vue ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App.vue?vue&type=script&lang=js& */ 81);\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if([\"default\"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n/* harmony import */ var _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 18);\nvar render, staticRenderFns, recyclableRender, components\nvar renderjs\n\n\n\n\n/* normalize component */\n\nvar component = Object(_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(\n  _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n  render,\n  staticRenderFns,\n  false,\n  null,\n  null,\n  null,\n  false,\n  components,\n  renderjs\n)\n\ncomponent.options.__file = \"App.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbbnVsbF0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUN1RDtBQUNMOzs7QUFHbEQ7QUFDMEw7QUFDMUwsZ0JBQWdCLHVNQUFVO0FBQzFCLEVBQUUseUVBQU07QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNlLGdGIiwiZmlsZSI6IjgwLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIHJlbmRlciwgc3RhdGljUmVuZGVyRm5zLCByZWN5Y2xhYmxlUmVuZGVyLCBjb21wb25lbnRzXG52YXIgcmVuZGVyanNcbmltcG9ydCBzY3JpcHQgZnJvbSBcIi4vQXBwLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuZXhwb3J0ICogZnJvbSBcIi4vQXBwLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuXG5cbi8qIG5vcm1hbGl6ZSBjb21wb25lbnQgKi9cbmltcG9ydCBub3JtYWxpemVyIGZyb20gXCIhLi4vLi4vLi4vSEJ1aWxkZXJYLjUuMDcuMjAyNjA0MTAwNi9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vdnVlLWNsaS1wbHVnaW4tdW5pL3BhY2thZ2VzL3Z1ZS1sb2FkZXIvbGliL3J1bnRpbWUvY29tcG9uZW50Tm9ybWFsaXplci5qc1wiXG52YXIgY29tcG9uZW50ID0gbm9ybWFsaXplcihcbiAgc2NyaXB0LFxuICByZW5kZXIsXG4gIHN0YXRpY1JlbmRlckZucyxcbiAgZmFsc2UsXG4gIG51bGwsXG4gIG51bGwsXG4gIG51bGwsXG4gIGZhbHNlLFxuICBjb21wb25lbnRzLFxuICByZW5kZXJqc1xuKVxuXG5jb21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcIkFwcC52dWVcIlxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50LmV4cG9ydHMiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///80\n");

/***/ }),
/* 81 */
/*!**************************************************************************************!*\
  !*** E:/翻译漫画/book-main (14)/book-main/frontend-uni/App.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_1_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--7-1!../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/using-components.js!../../../HBuilderX.5.07.2026041006/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./App.vue?vue&type=script&lang=js& */ 82);\n/* harmony import */ var _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_1_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_1_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_1_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if([\"default\"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_1_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n /* harmony default export */ __webpack_exports__[\"default\"] = (_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_1_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_HBuilderX_5_07_2026041006_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); //# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbbnVsbF0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQTJuQixDQUFnQixpcUJBQUcsRUFBQyIsImZpbGUiOiI4MS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vSEJ1aWxkZXJYLjUuMDcuMjAyNjA0MTAwNi9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzIS4uLy4uLy4uL0hCdWlsZGVyWC41LjA3LjIwMjYwNDEwMDYvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy93ZWJwYWNrLXByZXByb2Nlc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTctMSEuLi8uLi8uLi9IQnVpbGRlclguNS4wNy4yMDI2MDQxMDA2L0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvd2VicGFjay11bmktYXBwLWxvYWRlci91c2luZy1jb21wb25lbnRzLmpzIS4uLy4uLy4uL0hCdWlsZGVyWC41LjA3LjIwMjYwNDEwMDYvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vQXBwLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi9IQnVpbGRlclguNS4wNy4yMDI2MDQxMDA2L0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanMhLi4vLi4vLi4vSEJ1aWxkZXJYLjUuMDcuMjAyNjA0MTAwNi9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vdnVlLWNsaS1wbHVnaW4tdW5pL3BhY2thZ2VzL3dlYnBhY2stcHJlcHJvY2Vzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tNy0xIS4uLy4uLy4uL0hCdWlsZGVyWC41LjA3LjIwMjYwNDEwMDYvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy93ZWJwYWNrLXVuaS1hcHAtbG9hZGVyL3VzaW5nLWNvbXBvbmVudHMuanMhLi4vLi4vLi4vSEJ1aWxkZXJYLjUuMDcuMjAyNjA0MTAwNi9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vdnVlLWNsaS1wbHVnaW4tdW5pL3BhY2thZ2VzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9BcHAudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///81\n");

/***/ }),
/* 82 */
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--7-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/using-components.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!E:/翻译漫画/book-main (14)/book-main/frontend-uni/App.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(__f__) {\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\nvar _request = __webpack_require__(/*! ./api/request.js */ 17);\nvar _default = {\n  onLaunch: function onLaunch() {\n    __f__(\"log\", '[frontend-uni] app launch:', (0, _request.getPlatformLabel)(), _request.ORIGIN, \" at App.vue:6\");\n  },\n  onShow: function onShow() {\n    __f__(\"log\", '[frontend-uni] app show', \" at App.vue:9\");\n  }\n};\nexports.default = _default;\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/lib/format-log.js */ 83)[\"default\"]))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVuaS1hcHA6Ly8vQXBwLnZ1ZSJdLCJuYW1lcyI6WyJvbkxhdW5jaCIsImdldFBsYXRmb3JtTGFiZWwiLCJPUklHSU4iLCJvblNob3ciXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBO0FBQTJELGVBRTVDO0VBQ2JBLFFBQVEsRUFBRSxvQkFBWTtJQUNwQixhQUFZLDRCQUE0QixFQUFFLElBQUFDLHlCQUFnQixHQUFFLEVBQUVDLGVBQU07RUFDdEUsQ0FBQztFQUNEQyxNQUFNLEVBQUUsa0JBQVk7SUFDbEIsYUFBWSx5QkFBeUI7RUFDdkM7QUFDRixDQUFDO0FBQUEsMkIiLCJmaWxlIjoiODIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB7IGdldFBsYXRmb3JtTGFiZWwsIE9SSUdJTiB9IGZyb20gJy4vYXBpL3JlcXVlc3QuanMnXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgb25MYXVuY2g6IGZ1bmN0aW9uICgpIHtcbiAgICBjb25zb2xlLmxvZygnW2Zyb250ZW5kLXVuaV0gYXBwIGxhdW5jaDonLCBnZXRQbGF0Zm9ybUxhYmVsKCksIE9SSUdJTilcbiAgfSxcbiAgb25TaG93OiBmdW5jdGlvbiAoKSB7XG4gICAgY29uc29sZS5sb2coJ1tmcm9udGVuZC11bmldIGFwcCBzaG93JylcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///82\n");

/***/ }),
/* 83 */
/*!*********************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/lib/format-log.js ***!
  \*********************************************************************/
/*! exports provided: log, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "log", function() { return log; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return formatLog; });
function typof (v) {
  var s = Object.prototype.toString.call(v)
  return s.substring(8, s.length - 1)
}

function isDebugMode () {
  /* eslint-disable no-undef */
  return typeof __channelId__ === 'string' && __channelId__
}

function jsonStringifyReplacer (k, p) {
  switch (typof(p)) {
    case 'Function':
      return 'function() { [native code] }'
    default :
      return p
  }
}

function log (type) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key]
  }
  console[type].apply(console, args)
}

function formatLog () {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key]
  }
  var type = args.shift()
  if (isDebugMode()) {
    args.push(args.pop().replace('at ', 'uni-app:///'))
    return console[type].apply(console, args)
  }

  var msgs = args.map(function (v) {
    var type = Object.prototype.toString.call(v).toLowerCase()

    if (type === '[object object]' || type === '[object array]') {
      try {
        v = '---BEGIN:JSON---' + JSON.stringify(v, jsonStringifyReplacer) + '---END:JSON---'
      } catch (e) {
        v = type
      }
    } else {
      if (v === null) {
        v = '---NULL---'
      } else if (v === undefined) {
        v = '---UNDEFINED---'
      } else {
        var vType = typof(v).toUpperCase()

        if (vType === 'NUMBER' || vType === 'BOOLEAN') {
          v = '---BEGIN:' + vType + '---' + v + '---END:' + vType + '---'
        } else {
          v = String(v)
        }
      }
    }

    return v
  })
  var msg = ''

  if (msgs.length > 1) {
    var lastMsg = msgs.pop()
    msg = msgs.join('---COMMA---')

    if (lastMsg.indexOf(' at ') === 0) {
      msg += lastMsg
    } else {
      msg += '---COMMA---' + lastMsg
    }
  } else {
    msg = msgs[0]
  }

  console[type](msg)
}


/***/ })
],[[0,"app-config"]]]);