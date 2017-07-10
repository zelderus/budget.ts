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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = __webpack_require__(3);
window.onload = function () {
    var zapp = new app_1.ZeApp("appplace");
    zapp.start();
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
//import * as DescWidget from "./widgets/appdesc";
var appdesc_1 = __webpack_require__(4);
var AppWidget = __webpack_require__(6);
/**
 * Приложение.
 */
var ZeApp = (function () {
    function ZeApp(mainDivId) {
        this._mainDiv = document.getElementById(mainDivId);
        //- оборачиваем
        this._wrapDiv = document.createElement('div');
        this._mainDiv.appendChild(this._wrapDiv);
        this._mainDiv.className += " AppWrapper";
        //- слой для описания
        this._descDiv = document.createElement('div');
        this._wrapDiv.appendChild(this._descDiv);
        //- слой для приложения
        this._appDiv = document.createElement('div');
        this._wrapDiv.appendChild(this._appDiv);
        this.initWidgets();
    }
    // инициализация виджетов
    ZeApp.prototype.initWidgets = function () {
        this._widgetDescription = new appdesc_1.AppDescWidget(this._descDiv);
        this._widgetApp = new AppWidget.AppNotYetWidget(this._appDiv);
    };
    ZeApp.prototype.start = function () {
        this._widgetDescription.draw();
        this._widgetApp.draw();
        // TODO:
    };
    return ZeApp;
}());
exports.ZeApp = ZeApp;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var ReactDOM = __webpack_require__(1);
var ComDesc = __webpack_require__(5);
/**
 * Виджет вывода описания приложения.
 */
var AppDescWidget = (function () {
    function AppDescWidget(place) {
        this._place = place;
    }
    AppDescWidget.prototype.draw = function () {
        ReactDOM.render(React.createElement(ComDesc.AppDesc, { title: "nothing" }), this._place);
    };
    return AppDescWidget;
}());
exports.AppDescWidget = AppDescWidget;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
/**
 * Описание приложения.
 */
var AppDesc = (function (_super) {
    __extends(AppDesc, _super);
    function AppDesc() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AppDesc.prototype.render = function () {
        return React.createElement("div", { className: "AppDesc" },
            React.createElement("p", null, "ZeDK - Your budget. \u041F\u0440\u043E\u0441\u0442\u043E\u0435 \u0438 \u0431\u044B\u0441\u0442\u0440\u043E\u0435 \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0435 \u0434\u043B\u044F \u0432\u043D\u0435\u0441\u0435\u043D\u0438\u044F \u0434\u0430\u043D\u043D\u044B\u0445 \u043E \u0441\u0432\u043E\u0438\u0445 \u0440\u0430\u0441\u0445\u043E\u0434\u0430\u0445 \u0438 \u0434\u043E\u0445\u043E\u0434\u0430\u0445. \u041F\u0440\u043E\u0441\u043C\u0430\u0442\u0440\u0438\u0432\u0430\u0439\u0442\u0435 \u0432 \u0443\u0434\u043E\u0431\u043D\u043E\u043C \u0432\u0438\u0434\u0435 \u0441\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0443 \u043F\u043E \u043C\u0435\u0441\u044F\u0446\u0430\u043C."),
            React.createElement("p", null,
                "\u0414\u0430\u043D\u043D\u0430\u044F \u0432\u0435\u0440\u0441\u0438\u044F \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u044F \u043D\u0430\u043F\u0438\u0441\u0430\u043D\u0430 \u0441 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0435\u043C TypeScript + React \u0438 \u044F\u0432\u043B\u044F\u0435\u0442\u0441\u044F \u0430\u043D\u0430\u043B\u043E\u0433\u043E\u043C \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u044F \u0441 WindowsPhone (",
                React.createElement("a", { href: "http://zelder.pro/soft/zedkbudget", target: "_blank" }, "\u0441\u0441\u044B\u043B\u043A\u0430"),
                ")."));
    };
    return AppDesc;
}(React.Component));
exports.AppDesc = AppDesc;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var ReactDOM = __webpack_require__(1);
var appnotyet_1 = __webpack_require__(7);
/**
 * Виджет приложения. В разработке.
 */
var AppNotYetWidget = (function () {
    function AppNotYetWidget(place) {
        this._place = place;
    }
    AppNotYetWidget.prototype.draw = function () {
        ReactDOM.render(React.createElement(appnotyet_1.AppNotYet, null), this._place);
    };
    return AppNotYetWidget;
}());
exports.AppNotYetWidget = AppNotYetWidget;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
//export interface IAppNotYetProps { title: string; }
/**
 * Приложение еще не доступно.
 */
var AppNotYet = (function (_super) {
    __extends(AppNotYet, _super);
    function AppNotYet() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AppNotYet.prototype.render = function () {
        return React.createElement("div", { className: "MainDomNotYet" },
            React.createElement("p", null, "\u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0435 \u0432 \u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u043A\u0435"));
    };
    return AppNotYet;
}(React.Component));
exports.AppNotYet = AppNotYet;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map