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
/******/ 	return __webpack_require__(__webpack_require__.s = 14);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),
/* 1 */
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
var Utils_1 = __webpack_require__(3);
var Actions = __webpack_require__(4);
/**
 * Вьюшка.
 */
var View = (function (_super) {
    __extends(View, _super);
    function View(props, stores) {
        var _this = _super.call(this, props) || this;
        _this.__emmiterTokens = [];
        _this.__myName = Utils_1.default.getClassName(_this);
        // Сторы, на которые подписываемся
        _this.__stores = stores;
        // устанавливаем состояния - !!! выполняется последним, после всей инициализации объекта !!!
        _this.state = _this.getState(); // такая форма записи обновления состояний позволительна только в конструкторе вьюшек
        return _this;
    }
    View.prototype._hasAnyStore = function () {
        return this.__stores != null && this.__stores != undefined && this.__stores.length > 0;
    };
    /**
     * Начинаем слушать Сторы.
     * Если наследующая Вьюшка переопределит этот метод, не забыть вызвать этот базовый super.componentDidMount();
     */
    View.prototype.componentDidMount = function () {
        var _this = this;
        if (this._hasAnyStore()) {
            this.__stores.forEach(function (store) { return _this.__emmiterTokens.push(store.addChangeListener(_this._onChange, _this)); });
        }
    };
    /**
     * Больше не слушаем Сторы.
     * Если наследующая Вьюшка переопределит этот метод, не забыть вызвать этот базовый super.componentWillUnmount();
     */
    View.prototype.componentWillUnmount = function () {
        var _this = this;
        if (this._hasAnyStore()) {
            //
            this.__stores.forEach(function (store) { return store.removeChangeListener(_this._onChange); });
            this.__stores = null;
            //
            if (this.__emmiterTokens != null && this.__emmiterTokens != undefined && this.__emmiterTokens.length > 0) {
                this.__emmiterTokens.forEach(function (token) { return token.remove(); });
                this.__emmiterTokens = null;
            }
        }
    };
    /**
     * Произошло изменение в зависимых Сторах, обновляем свое состояние.
     */
    View.prototype._onChange = function () {
        this.setState(this.getState());
    };
    /**
     * Интересующие нас состояния (получаем их строго из Сторов)
     * Если наследующая вьюшка слушает Сторы, то обязана переопределить этот метод и вернуть необходимый объект.
     */
    View.prototype.getState = function () {
        if (this._hasAnyStore()) {
            var storeNames = this.__stores.map(function (s) { return Utils_1.default.getClassName(s); });
            Utils_1.default.logError("Вьюшка '" + this.__myName + "' не переопределила метод 'getState', в котором слушает состояния из Сторов, хотя подписалась на '" + storeNames + "'");
        }
        return null;
    };
    /**
     * ActionCreator - система сообщений, через которую все компоненты оповещают приложение о новых событиях в одном направлении.
     * - этот метод можно использовать, если лень импортировать пространство имен ('import Actions from './actions/Actions';')
     */
    View.prototype.getActionCreator = function () {
        return Actions.default;
    };
    ///
    /// Render
    ///
    View.prototype.render = function () {
        return React.createElement("div", { className: "ViewErrorBlock" },
            "\u041D\u0435 \u0440\u0435\u0430\u043B\u0438\u0437\u043E\u0432\u0430\u043D View \u0441 \u0438\u043C\u0435\u043D\u0435\u043C '",
            this.__myName,
            "'");
    };
    return View;
}(React.Component));
exports.View = View;
exports.default = View;


/***/ }),
/* 2 */
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
var BaseStore_1 = __webpack_require__(10);
var ActionTypes_1 = __webpack_require__(5);
/**
 * Основное хранилище приложения.
 * Глобальные модели состояний, состяние интерфейса приложения.
 * Отдельно от изменений транзакций и прочее, чтобы не обновлялись вьюшки с данными.
 */
var AppStore = (function (_super) {
    __extends(AppStore, _super);
    function AppStore() {
        var _this = _super.call(this) || this;
        _this._logTextValue = "";
        _this._errorFatalTextValue = "";
        _this._navIndex = 1;
        _this._isLoading = false;
        return _this;
    }
    //
    // Функции интерфейсы для Вьюшек.
    // Эти данные для их состояний. При изменении которых, Вьюшки обновляются.
    //
    AppStore.prototype.getLogText = function () { return this._logTextValue; };
    AppStore.prototype.getErrorFatalText = function () { return this._errorFatalTextValue; };
    AppStore.prototype.getNavigationIndex = function () { return this._navIndex; };
    AppStore.prototype.isLoading = function () { return this._isLoading; };
    /**
     * Обрабатываем сообщения от диспетчера.
     * Обновляем модели данных, обращаемся к серверу.
     * @param type
     * @param obj
     */
    AppStore.prototype.onDispatch = function (type, obj) {
        switch (type) {
            case ActionTypes_1.default.LOG:
                this._logTextValue = obj;
                break;
            case ActionTypes_1.default.ERROR_FATAL:
                this._errorFatalTextValue = obj;
                break;
            case ActionTypes_1.default.NAVIGATION:
                this._navIndex = obj;
                break;
            case ActionTypes_1.default.LOADING_START:
                this._isLoading = true;
                break;
            case ActionTypes_1.default.LOADING_STOP:
                this._isLoading = false;
                break;
            default:
                return true;
        }
        this.emitChange();
        return true;
    };
    return AppStore;
}(BaseStore_1.default));
exports.AppStore = AppStore;
exports.default = new AppStore;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var FluxUtils;
(function (FluxUtils) {
    /**
     * Имя класса.
     */
    function getClassName(obj) {
        var funcNameRegex = /function (.{1,})\(/;
        var results = (funcNameRegex).exec((obj).constructor.toString());
        return (results && results.length > 1) ? results[1] : "";
    }
    FluxUtils.getClassName = getClassName;
    /**
     * GUID.
     */
    function guidGenerator() {
        var S4 = function () {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    }
    FluxUtils.guidGenerator = guidGenerator;
    function logStyle(msg, style) {
        if (!console)
            return;
        if (!style)
            style = 'background: #F22; color: #FFFF66; padding: 0 4px;';
        console.log("%c" + msg, style);
    }
    FluxUtils.logStyle = logStyle;
    function logRed(msg) { logStyle(msg, 'background: #F22; color: #FFFF66; padding: 0 4px;'); }
    FluxUtils.logRed = logRed;
    function logGreen(msg) { logStyle(msg, 'background: #ECF8EC; color: #339933; padding: 0 4px;'); }
    FluxUtils.logGreen = logGreen;
    function logYellow(msg) { logStyle(msg, 'background: #FFFAE5; color: #FF7B24; padding: 0 4px;'); }
    FluxUtils.logYellow = logYellow;
    function log(msg) { logYellow(msg); }
    FluxUtils.log = log;
    function logError(msg) { logRed(msg); }
    FluxUtils.logError = logError;
})(FluxUtils || (FluxUtils = {}));
exports.default = FluxUtils;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ActionTypes_1 = __webpack_require__(5);
var Dispatcher_1 = __webpack_require__(9);
/**
 *      Action Creator - методы, как singleton - доступны из всего приложения
 *  Все действия приложения, которые через диспетчера оповестят интересующихся
 */
var Actions;
(function (Actions) {
    /**
     * Менеджер действий. Сообщает диспетчеру о новых событиях.
     * - функции обернуты в класс, чтобы можно было их возвращать наследуемым объектам (для удобства использования), как в 'flux/View.tsx'.
     */
    var ActionCreator = (function () {
        function ActionCreator() {
        }
        ActionCreator.prototype.log = function (msg) {
            Dispatcher_1.default.dispatch(ActionTypes_1.default.LOG, msg);
        };
        ActionCreator.prototype.errorFatal = function (msg) {
            Dispatcher_1.default.dispatch(ActionTypes_1.default.ERROR_FATAL, msg);
        };
        ActionCreator.prototype.navigation = function (navIndex) {
            Dispatcher_1.default.dispatch(ActionTypes_1.default.NAVIGATION, navIndex);
        };
        ActionCreator.prototype.loadInitData = function () {
            Dispatcher_1.default.dispatch(ActionTypes_1.default.LOAD_INIT_DATA, null);
        };
        ActionCreator.prototype.loadingStart = function () {
            Dispatcher_1.default.dispatch(ActionTypes_1.default.LOADING_START, null);
        };
        ActionCreator.prototype.loadingStop = function () {
            Dispatcher_1.default.dispatch(ActionTypes_1.default.LOADING_STOP, null);
        };
        ActionCreator.prototype.loadAccounts = function () {
            Dispatcher_1.default.dispatch(ActionTypes_1.default.ACCOUNTS_LOAD, null);
        };
        ActionCreator.prototype.loadTransactions = function () {
            Dispatcher_1.default.dispatch(ActionTypes_1.default.TRANSACTIONS_LOAD, null);
        };
        ActionCreator.prototype.addItem = function (item) {
            Dispatcher_1.default.dispatch(ActionTypes_1.default.ADD_ITEM, item);
            this.log("добавление элемента: ..");
        };
        ActionCreator.prototype.deleteItem = function (id) {
            Dispatcher_1.default.dispatch(ActionTypes_1.default.DELETE_ITEM, id);
            this.log("удаление элемента: " + id);
        };
        return ActionCreator;
    }());
    Actions.ActionCreator = ActionCreator;
})(Actions = exports.Actions || (exports.Actions = {}));
//export default Actions;
exports.default = new Actions.ActionCreator;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ActionTypes;
(function (ActionTypes) {
    ActionTypes[ActionTypes["LOG"] = 1] = "LOG";
    ActionTypes[ActionTypes["NAVIGATION"] = 10] = "NAVIGATION";
    ActionTypes[ActionTypes["LOAD_INIT_DATA"] = 20] = "LOAD_INIT_DATA";
    ActionTypes[ActionTypes["LOADING_START"] = 30] = "LOADING_START";
    ActionTypes[ActionTypes["LOADING_STOP"] = 31] = "LOADING_STOP";
    ActionTypes[ActionTypes["ERROR_FATAL"] = 40] = "ERROR_FATAL";
    ActionTypes[ActionTypes["ACCOUNTS_LOAD"] = 100] = "ACCOUNTS_LOAD";
    ActionTypes[ActionTypes["TRANSACTIONS_LOAD"] = 200] = "TRANSACTIONS_LOAD";
    ActionTypes[ActionTypes["ADD_ITEM"] = 950] = "ADD_ITEM";
    ActionTypes[ActionTypes["DELETE_ITEM"] = 951] = "DELETE_ITEM";
})(ActionTypes || (ActionTypes = {}));
;
exports.default = ActionTypes;


/***/ }),
/* 6 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


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
var BaseStore_1 = __webpack_require__(10);
var ActionTypes_1 = __webpack_require__(5);
var Actions_1 = __webpack_require__(4);
var Transactions_1 = __webpack_require__(31);
var Client_1 = __webpack_require__(32);
/**
 * Хранилище с транзакциями
 */
var TransactionStore = (function (_super) {
    __extends(TransactionStore, _super);
    function TransactionStore() {
        var _this = _super.call(this) || this;
        _this.__accounts = [];
        _this.__transactions = [];
        _this.__transactionFilter = new Transactions_1.default.TransactionFilters();
        return _this;
    }
    //
    // Функции интерфейсы для Вьюшек.
    // Эти данные для их состояний. При изменении которых, Вьюшки обновляются.
    //
    TransactionStore.prototype.getAccounts = function () { return this.__accounts; };
    TransactionStore.prototype.getTransactions = function () { return this.__transactions; };
    //
    //
    //
    TransactionStore.prototype._loadInitDataAsync = function () {
        var _this = this;
        Actions_1.default.loadingStart();
        // счета
        this._loadAccountsAsync(function (s, m) {
            if (!s) {
                _this._onFatalError(m);
                return;
            }
            // транзакции
            _this._loadTransactionsAsync(function (s, m) {
                if (!s) {
                    _this._onFatalError(m);
                    return;
                }
                // оповещаем
                _this.emitChange();
                Actions_1.default.loadingStop();
            });
        });
    };
    TransactionStore.prototype._loadAccountsAsync = function (callBack) {
        var _this = this;
        Client_1.default.getAccounts(function (s, m, acs) {
            _this.__accounts = acs;
            if (callBack != null)
                callBack(s, m);
        });
    };
    TransactionStore.prototype._loadTransactionsAsync = function (callBack) {
        var _this = this;
        Client_1.default.getTransactions(this.__transactionFilter, function (s, m, trs) {
            _this.__transactions = trs;
            if (callBack != null)
                callBack(s, m);
        });
    };
    //
    //
    //
    TransactionStore.prototype._onError = function (msg) {
        Actions_1.default.log("Ошибка: " + msg);
    };
    TransactionStore.prototype._onFatalError = function (msg) {
        Actions_1.default.errorFatal(msg);
        Actions_1.default.loadingStop(); // критическая ошибка выпадает при загрузках, значит тут всегда сами отключаем панель загрузки
    };
    /**
     * Обрабатываем сообщения от диспетчера.
     * Обновляем модели данных, обращаемся к серверу.
     * @param type
     * @param obj
     */
    TransactionStore.prototype.onDispatch = function (type, obj) {
        var _this = this;
        switch (type) {
            case ActionTypes_1.default.LOAD_INIT_DATA:
                this._loadInitDataAsync();
                return true;
            case ActionTypes_1.default.ACCOUNTS_LOAD:
                this._loadAccountsAsync(function (s, m) { if (!s) {
                    _this._onError(m);
                } _this.emitChange(); });
                return true;
            //break;
            case ActionTypes_1.default.TRANSACTIONS_LOAD:
                this._loadTransactionsAsync(function (s, m) { if (!s) {
                    _this._onError(m);
                } _this.emitChange(); });
                return true;
        }
        //this.emitChange();
        return true;
    };
    return TransactionStore;
}(BaseStore_1.default));
exports.TransactionStore = TransactionStore;
exports.default = new TransactionStore;


/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Flux;
(function (Flux) {
    var Dispatcher = (function () {
        function Dispatcher() {
            //console.log("creating Dispatcher..");
        }
        /**
         * Все интересующиеся в событиях, посланных через Actions.
         */
        Dispatcher.prototype.initStores = function (stores) {
            this._stores = stores;
        };
        /**
         * Произошло событие.
         * @param type Тип события
         * @param obj Объект события
         */
        Dispatcher.prototype.dispatch = function (type, obj) {
            this._stores.forEach(function (store) { return store.onDispatch(type, obj); });
        };
        return Dispatcher;
    }());
    Flux.Dispatcher = Dispatcher;
})(Flux || (Flux = {}));
// экспортируем сразу как Singleton
// пример импорта: import Dispatcher from './../flux/Dispatcher';
// пример использования: Dispatcher.dispatch(ActionTypes.ADD_ITEM, item);
exports.default = new Flux.Dispatcher();


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var fbemitter_1 = __webpack_require__(22);
var Utils_1 = __webpack_require__(3);
//type StoreCallback = () => any;
/**
 * Базовый стор.
 *      Его наследуют сторы приложения, и они, как правило, должны быть синглетонами (export new default SomeStore;).
 *      Их используют в любой части приложения (виджеты, компоненты, контайнеры) для подписки на них (addChangeListener), в случае изменений данных.
 *      Подписавшиеся, получая событие от стора на изменение, обновляют свои состояния (получают от Стора объект и обновляя свой state), соответственно React обновит их.
 */
var BaseStore = (function () {
    function BaseStore() {
        this.__myName = Utils_1.default.getClassName(this);
        this.__emitter = new fbemitter_1.EventEmitter();
        this.__changeEvent = 'change';
    }
    BaseStore.prototype.__invokeOnDispatch = function (payload) {
        //this.__changed = false;
        //this.__onDispatch(payload);
        //if (this.__changed) {
        this.__emitter.emit(this.__changeEvent);
        //}
    };
    /**
     * Реализующий Стор, должен вызывать этот метод, когда произошли хоть какие изменения в моделях (после сообщения диспетчера, в методе 'onDispatch').
     */
    BaseStore.prototype.emitChange = function () {
        this.__invokeOnDispatch(null);
    };
    // Add change listener
    BaseStore.prototype.addChangeListener = function (callback, s) {
        var token = this.__emitter.addListener(this.__changeEvent, callback, s);
        return token;
    };
    // Remove change listener
    BaseStore.prototype.removeChangeListener = function (callback) {
        //this.__emitter.removeAllListeners()
    };
    /**
     * Получили сообщение от диспетчера. Наследующий обязуется реализовать его.
     * @param type
     * @param obj
     */
    BaseStore.prototype.onDispatch = function (type, obj) {
        Utils_1.default.logError("'" + this.__myName + "' не переопределил метод 'onDispatch' из базового BaseStore");
        return false;
        /*
        * Must be like:
        *
        switch(type) {
            case ActionTypes.ADD_ITEM:
                this._someValue = "adding.."; // work with data
                break;
            case ActionTypes.DELETE_ITEM:
                this._someValue = "deleting.."; // work with data
                break;
            default:
                return true;
        }
        this.emitChange();
        return true;
        */
    };
    return BaseStore;
}());
exports.BaseStore = BaseStore;
exports.default = BaseStore;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 * 
 * @providesModule EmitterSubscription
 * @typechecks
 */



function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EventSubscription = __webpack_require__(24);

/**
 * EmitterSubscription represents a subscription with listener and context data.
 */

var EmitterSubscription = (function (_EventSubscription) {
  _inherits(EmitterSubscription, _EventSubscription);

  /**
   * @param {EventSubscriptionVendor} subscriber - The subscriber that controls
   *   this subscription
   * @param {function} listener - Function to invoke when the specified event is
   *   emitted
   * @param {*} context - Optional context object to use when invoking the
   *   listener
   */

  function EmitterSubscription(subscriber, listener, context) {
    _classCallCheck(this, EmitterSubscription);

    _EventSubscription.call(this, subscriber);
    this.listener = listener;
    this.context = context;
  }

  return EmitterSubscription;
})(EventSubscription);

module.exports = EmitterSubscription;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (process.env.NODE_ENV !== 'production') {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Navigation_1 = __webpack_require__(29);
// активные вьюшки
var TransactionActive_1 = __webpack_require__(30);
var AccountActive_1 = __webpack_require__(35);
// сторы
var AppStore_1 = __webpack_require__(2);
var TransactionStore_1 = __webpack_require__(7);
var AppData;
(function (AppData) {
    /**
     * Пункты навигации и их связь с Вьюшками.
     * В конструктор третьим параметром передаем на нужный тип Вьюшки с реализацией.
     */
    function getNavigations() {
        var ind = 1;
        return [
            new Navigation_1.default.NavigationLine(ind++, "Транзакции", TransactionActive_1.TransactionActive),
            new Navigation_1.default.NavigationLine(ind++, "Счета", AccountActive_1.AccountActive)
        ];
    }
    AppData.getNavigations = getNavigations;
    /**
     * Список всех сторов (синглетонов).
     * Необходимо для Диспетчера.
     */
    function getStores() {
        return [AppStore_1.default, TransactionStore_1.default];
    }
    AppData.getStores = getStores;
})(AppData || (AppData = {}));
exports.default = AppData;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = __webpack_require__(15);
window.onload = function () {
    var zapp = new app_1.ZeApp("appplace");
    zapp.start();
};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var AppDesc_1 = __webpack_require__(16);
var MainAppWidget_1 = __webpack_require__(18);
var Dispatcher_1 = __webpack_require__(9);
//import AppStore from './stores/AppStore';
var AppData_1 = __webpack_require__(13);
/**
 * Приложение.
 */
var ZeApp = (function () {
    function ZeApp(mainDivId) {
        var mainDiv = document.getElementById(mainDivId);
        /***
         * Статические вечные слои. Они никогда не меняются и незачем их рендерить React'ом.
         * **/
        //- оборачиваем
        var wrapDiv = document.createElement('div');
        mainDiv.appendChild(wrapDiv);
        mainDiv.className += " AppWrapper";
        //- слой для описания
        this._descDiv = document.createElement('div');
        wrapDiv.appendChild(this._descDiv);
        //- слой для приложения
        this._appDiv = document.createElement('div');
        wrapDiv.appendChild(this._appDiv);
    }
    ZeApp.prototype.start = function () {
        // инициализируем диспетчера
        Dispatcher_1.default.initStores(AppData_1.default.getStores());
        // основные виджеты
        var widgetDescription = new AppDesc_1.AppDescWidget(this._descDiv);
        var widgetApp = new MainAppWidget_1.default(this._appDiv);
        // отображаем виджеты
        widgetDescription.draw();
        widgetApp.draw();
    };
    return ZeApp;
}());
exports.ZeApp = ZeApp;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var ReactDOM = __webpack_require__(8);
var ComDesc = __webpack_require__(17);
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
/* 17 */
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
            React.createElement("p", null, "ZeDK - Your budget. \u041F\u0440\u043E\u0441\u0442\u043E\u0435 \u0438 \u0431\u044B\u0441\u0442\u0440\u043E\u0435 \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0435 \u0434\u043B\u044F \u0432\u043D\u0435\u0441\u0435\u043D\u0438\u044F \u0434\u0430\u043D\u043D\u044B\u0445 \u043E \u0441\u0432\u043E\u0438\u0445 \u0440\u0430\u0441\u0445\u043E\u0434\u0430\u0445 \u0438 \u0434\u043E\u0445\u043E\u0434\u0430\u0445."),
            React.createElement("p", null,
                "\u0414\u0430\u043D\u043D\u0430\u044F \u0432\u0435\u0440\u0441\u0438\u044F \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u044F \u043D\u0430\u043F\u0438\u0441\u0430\u043D\u0430 \u0441 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0435\u043C TypeScript + React \u0438 \u044F\u0432\u043B\u044F\u0435\u0442\u0441\u044F \u0430\u043D\u0430\u043B\u043E\u0433\u043E\u043C \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u044F \u0441 WindowsPhone (",
                React.createElement("a", { href: "http://zelder.pro/soft/zedkbudget", target: "_blank" }, "\u0441\u0441\u044B\u043B\u043A\u0430"),
                ")."),
            React.createElement("p", null, "\u041F\u0435\u0440\u0432\u0430\u044F \u0432\u0435\u0440\u0441\u0438\u044F \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u044F (\u043F\u043E\u0434 WP) \u0431\u044B\u043B\u0430 \u043D\u0430\u043F\u0438\u0441\u0430\u043D\u0430 \u0431\u0435\u0437 \u043A\u0430\u043A\u0438\u0445 \u043B\u0438\u0431\u043E \u043F\u0430\u0442\u0442\u0435\u0440\u043D\u043E\u0432. \u041C\u043D\u043E\u0436\u0435\u0441\u0442\u0432\u043E \u0440\u0430\u0437\u043D\u044B\u0445 \u0441\u043E\u0431\u044B\u0442\u0438\u0439 (\u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u043F\u043B\u0430\u0442\u0435\u0436\u0430, \u043F\u0440\u0438\u0431\u044B\u043B\u0438 \u0438 \u043F\u0440\u043E\u0447\u0435\u0435) \u0434\u043E\u043B\u0436\u043D\u044B \u0431\u044B\u043B\u0438 \u043F\u0440\u043E\u0441\u043B\u0435\u0436\u0438\u0432\u0430\u0442\u044C\u0441\u044F \u043C\u043D\u043E\u0433\u0438\u043C\u0438 \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442\u0430\u043C\u0438 (\u0432\u044B\u0432\u0435\u0441\u0442\u0438 \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u043D\u0443\u044E \u043F\u043B\u0430\u0442\u0435\u0436\u043A\u0443, \u043E\u0431\u043D\u043E\u0432\u0438\u0442\u044C \u043E\u0431\u0449\u0443\u044E \u0441\u0443\u043C\u043C\u0443, \u043F\u0435\u0440\u0435\u0441\u0447\u0438\u0442\u0430\u0442\u044C \u0431\u044E\u0434\u0436\u0435\u0442). \u0414\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u043D\u043E\u0432\u043E\u0439 \u043B\u043E\u0433\u0438\u043A\u0438 \u0441\u0442\u0430\u043D\u043E\u0432\u0438\u043B\u043E\u0441\u044C \u0432\u0441\u0435 \u0437\u0430\u0442\u0440\u0443\u0434\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u0435\u0439. \u041D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u043E \u0431\u044B\u043B\u043E \u0432\u044B\u043B\u043E\u0432\u0438\u0442\u044C \u0432\u0441\u0435 \u0441\u0432\u044F\u0437\u0438 \u0441\u043E\u0431\u044B\u0442\u0438\u0439 - \u044D\u0442\u043E \u0441\u0442\u0430\u043B\u043E \u043D\u0430\u0441\u0442\u043E\u044F\u0449\u0438\u043C \u0430\u0434\u043E\u043C."),
            React.createElement("p", null, "\u0412 \u044D\u0442\u043E\u0439 \u0432\u0435\u0440\u0441\u0438\u0438 \u043F\u0440\u0438\u043C\u0435\u043D\u044F\u0435\u0442\u0441\u044F \u043F\u0430\u0442\u0442\u0435\u0440\u043D Flux. \u0412\u0441\u0435 \u0441\u043E\u0431\u044B\u0442\u0438\u044F \u0438\u0434\u0443\u0442 \u0432 \u043E\u0434\u043D\u043E\u043C \u043D\u0430\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0438, \u0432\u0441\u0435 \u0437\u0430\u0438\u043D\u0442\u0435\u0440\u0435\u0441\u043E\u0432\u0430\u043D\u043D\u044B\u0435 \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442\u044B \u0440\u0435\u0430\u0433\u0438\u0440\u0443\u044E\u0442 \u043A\u0430\u043A \u0438\u043C \u0443\u0434\u043E\u0431\u043D\u043E. \u0410 React \u0432 \u0441\u0432\u044F\u0437\u043A\u0435 \u0441 TypeScript \u043F\u043E\u043A\u0430\u0437\u0430\u043B\u0441\u044F \u0431\u043E\u043B\u0435\u0435 \u0443\u0434\u043E\u0431\u043D\u044B\u043C \u0434\u043B\u044F \u0442\u0430\u043A\u043E\u0433\u043E \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u044F \u043F\u043E\u0434 web."));
    };
    return AppDesc;
}(React.Component));
exports.AppDesc = AppDesc;


/***/ }),
/* 18 */
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
var ReactDOM = __webpack_require__(8);
var BaseWidget_1 = __webpack_require__(19);
var MainPanel_1 = __webpack_require__(20);
var LogPanel_1 = __webpack_require__(37);
/**
 * Основной виджет приложения.
 */
var MainAppWidget = (function (_super) {
    __extends(MainAppWidget, _super);
    function MainAppWidget(place) {
        var _this = _super.call(this) || this;
        /**
         * Создадим статические вечные слои, и внедрим в них отдельные виджеты. Для более удобной (модульной) организации приложения.
         */
        _this._mainDiv = document.createElement('div');
        place.appendChild(_this._mainDiv);
        _this._logDiv = document.createElement('div');
        place.appendChild(_this._logDiv);
        // загружаем начальные данные !!!
        _this.getActionCreator().loadInitData();
        return _this;
    }
    MainAppWidget.prototype.draw = function () {
        ReactDOM.render(React.createElement(MainPanel_1.MainPanel, null), this._mainDiv);
        ReactDOM.render(React.createElement(LogPanel_1.LogPanel, null), this._logDiv);
    };
    return MainAppWidget;
}(BaseWidget_1.BaseWidget));
exports.MainAppWidget = MainAppWidget;
exports.default = MainAppWidget;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = __webpack_require__(3);
var Actions = __webpack_require__(4);
/**
 * Базовый виджет.
 */
var BaseWidget = (function () {
    function BaseWidget() {
    }
    /**
     * ActionCreator - система сообщений, через которую все компоненты оповещают приложение о новых событиях в одном направлении.
     * - этот метод можно использовать, если лень импортировать пространство имен ('import Actions from './actions/Actions';')
     */
    BaseWidget.prototype.getActionCreator = function () {
        return Actions.default;
    };
    BaseWidget.prototype.draw = function () {
        Utils_1.default.logError("Не реализован метод 'draw' в виджете '" + Utils_1.default.getClassName(this) + "'");
        return;
    };
    return BaseWidget;
}());
exports.BaseWidget = BaseWidget;
exports.default = BaseWidget;


/***/ }),
/* 20 */
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
var View_1 = __webpack_require__(1);
var NavigationPanel_1 = __webpack_require__(21);
var ActionPanel_1 = __webpack_require__(27);
var ControlPanel_1 = __webpack_require__(28);
var AppData_1 = __webpack_require__(13);
var AppStore_1 = __webpack_require__(2);
/**
 * Основная панель
 */
var MainPanel = (function (_super) {
    __extends(MainPanel, _super);
    function MainPanel(props) {
        return _super.call(this, props, [AppStore_1.default]) || this;
    }
    // Интересующие нас состояния (получаем их строго из Сторов)
    MainPanel.prototype.getState = function () {
        return {
            isLoading: AppStore_1.default.isLoading(),
            fatalMsg: AppStore_1.default.getErrorFatalText()
        };
    };
    ///
    /// Render
    ///
    MainPanel.prototype.renderFatal = function () {
        if (this.state.fatalMsg == null || this.state.fatalMsg == "")
            return null;
        return React.createElement("div", { className: "FatalPanel" },
            React.createElement("div", { className: "Content" },
                React.createElement("div", { className: "Title" }, "\u041A\u0440\u0438\u0442\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u043E\u0448\u0438\u0431\u043A\u0430"),
                React.createElement("div", { className: "Description" }, this.state.fatalMsg)));
    };
    MainPanel.prototype.renderLoading = function () {
        if (!this.state.isLoading)
            return null;
        return React.createElement("div", { className: "LoadingPanel" },
            React.createElement("div", { className: "Content" },
                React.createElement("div", { className: "Pic" }),
                React.createElement("div", { className: "Title" }, "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u0434\u0430\u043D\u043D\u044B\u0445..")));
    };
    MainPanel.prototype.render = function () {
        var navs = AppData_1.default.getNavigations();
        var fatalPanel = this.renderFatal();
        var loadingPanel = this.renderLoading();
        return React.createElement("div", { className: "MainPanel" },
            fatalPanel,
            loadingPanel,
            React.createElement(NavigationPanel_1.NavigationPanel, { navLines: navs }),
            React.createElement(ActionPanel_1.ActionPanel, { navLines: navs }),
            React.createElement(ControlPanel_1.ControlPanel, null));
    };
    return MainPanel;
}(View_1.default));
exports.MainPanel = MainPanel;


/***/ }),
/* 21 */
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
var View_1 = __webpack_require__(1);
var AppStore_1 = __webpack_require__(2);
/**
 * Навигация (расходы, доходы, бюджет, статистика..)
 */
var NavigationPanel = (function (_super) {
    __extends(NavigationPanel, _super);
    function NavigationPanel(props) {
        return _super.call(this, props, [AppStore_1.default]) || this;
    }
    // Интересующие нас состояния (получаем их строго из Сторов)
    NavigationPanel.prototype.getState = function () {
        return {
            navIndex: AppStore_1.default.getNavigationIndex()
        };
    };
    ///
    /// User interactions
    ///
    NavigationPanel.prototype.onNavClick = function (navIndex) {
        if (navIndex == this.state.navIndex)
            return false; // хоть и ничего не обновится, если не изменилось, все же поможем ничего не делать (расслабим React)
        this.getActionCreator().navigation(navIndex);
    };
    ///
    /// Render
    ///
    // контент кнопки
    NavigationPanel.prototype.renderButtonLine = function (navLine) {
        var _this = this;
        var activeNavIndex = this.state.navIndex; // текущая вкладка (меняется через диспетчера)
        var classNameExt = activeNavIndex == navLine.navIndex ? 'Active' : '';
        var classNameFull = "Button " + classNameExt;
        // разница с привязкой обработчиков
        if (navLine.navIndex == this.state.navIndex)
            return React.createElement("div", { className: classNameFull }, navLine.title);
        else
            return React.createElement("div", { className: classNameFull, onClick: function (e) { return _this.onNavClick(navLine.navIndex); } }, navLine.title);
    };
    NavigationPanel.prototype.render = function () {
        var _this = this;
        // все кнопки
        var lines = this.props.navLines.map(function (line) { return _this.renderButtonLine(line); });
        return React.createElement("div", { className: "NavigationPanel" }, lines);
    };
    return NavigationPanel;
}(View_1.default));
exports.NavigationPanel = NavigationPanel;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var fbemitter = {
  EventEmitter: __webpack_require__(23),
  EmitterSubscription : __webpack_require__(11)
};

module.exports = fbemitter;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule BaseEventEmitter
 * @typechecks
 */



function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var EmitterSubscription = __webpack_require__(11);
var EventSubscriptionVendor = __webpack_require__(25);

var emptyFunction = __webpack_require__(26);
var invariant = __webpack_require__(12);

/**
 * @class BaseEventEmitter
 * @description
 * An EventEmitter is responsible for managing a set of listeners and publishing
 * events to them when it is told that such events happened. In addition to the
 * data for the given event it also sends a event control object which allows
 * the listeners/handlers to prevent the default behavior of the given event.
 *
 * The emitter is designed to be generic enough to support all the different
 * contexts in which one might want to emit events. It is a simple multicast
 * mechanism on top of which extra functionality can be composed. For example, a
 * more advanced emitter may use an EventHolder and EventFactory.
 */

var BaseEventEmitter = (function () {
  /**
   * @constructor
   */

  function BaseEventEmitter() {
    _classCallCheck(this, BaseEventEmitter);

    this._subscriber = new EventSubscriptionVendor();
    this._currentSubscription = null;
  }

  /**
   * Adds a listener to be invoked when events of the specified type are
   * emitted. An optional calling context may be provided. The data arguments
   * emitted will be passed to the listener function.
   *
   * TODO: Annotate the listener arg's type. This is tricky because listeners
   *       can be invoked with varargs.
   *
   * @param {string} eventType - Name of the event to listen to
   * @param {function} listener - Function to invoke when the specified event is
   *   emitted
   * @param {*} context - Optional context object to use when invoking the
   *   listener
   */

  BaseEventEmitter.prototype.addListener = function addListener(eventType, listener, context) {
    return this._subscriber.addSubscription(eventType, new EmitterSubscription(this._subscriber, listener, context));
  };

  /**
   * Similar to addListener, except that the listener is removed after it is
   * invoked once.
   *
   * @param {string} eventType - Name of the event to listen to
   * @param {function} listener - Function to invoke only once when the
   *   specified event is emitted
   * @param {*} context - Optional context object to use when invoking the
   *   listener
   */

  BaseEventEmitter.prototype.once = function once(eventType, listener, context) {
    var emitter = this;
    return this.addListener(eventType, function () {
      emitter.removeCurrentListener();
      listener.apply(context, arguments);
    });
  };

  /**
   * Removes all of the registered listeners, including those registered as
   * listener maps.
   *
   * @param {?string} eventType - Optional name of the event whose registered
   *   listeners to remove
   */

  BaseEventEmitter.prototype.removeAllListeners = function removeAllListeners(eventType) {
    this._subscriber.removeAllSubscriptions(eventType);
  };

  /**
   * Provides an API that can be called during an eventing cycle to remove the
   * last listener that was invoked. This allows a developer to provide an event
   * object that can remove the listener (or listener map) during the
   * invocation.
   *
   * If it is called when not inside of an emitting cycle it will throw.
   *
   * @throws {Error} When called not during an eventing cycle
   *
   * @example
   *   var subscription = emitter.addListenerMap({
   *     someEvent: function(data, event) {
   *       console.log(data);
   *       emitter.removeCurrentListener();
   *     }
   *   });
   *
   *   emitter.emit('someEvent', 'abc'); // logs 'abc'
   *   emitter.emit('someEvent', 'def'); // does not log anything
   */

  BaseEventEmitter.prototype.removeCurrentListener = function removeCurrentListener() {
    !!!this._currentSubscription ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Not in an emitting cycle; there is no current subscription') : invariant(false) : undefined;
    this._subscriber.removeSubscription(this._currentSubscription);
  };

  /**
   * Returns an array of listeners that are currently registered for the given
   * event.
   *
   * @param {string} eventType - Name of the event to query
   * @return {array}
   */

  BaseEventEmitter.prototype.listeners = function listeners(eventType) /* TODO: Array<EventSubscription> */{
    var subscriptions = this._subscriber.getSubscriptionsForType(eventType);
    return subscriptions ? subscriptions.filter(emptyFunction.thatReturnsTrue).map(function (subscription) {
      return subscription.listener;
    }) : [];
  };

  /**
   * Emits an event of the given type with the given data. All handlers of that
   * particular type will be notified.
   *
   * @param {string} eventType - Name of the event to emit
   * @param {*} Arbitrary arguments to be passed to each registered listener
   *
   * @example
   *   emitter.addListener('someEvent', function(message) {
   *     console.log(message);
   *   });
   *
   *   emitter.emit('someEvent', 'abc'); // logs 'abc'
   */

  BaseEventEmitter.prototype.emit = function emit(eventType) {
    var subscriptions = this._subscriber.getSubscriptionsForType(eventType);
    if (subscriptions) {
      var keys = Object.keys(subscriptions);
      for (var ii = 0; ii < keys.length; ii++) {
        var key = keys[ii];
        var subscription = subscriptions[key];
        // The subscription may have been removed during this event loop.
        if (subscription) {
          this._currentSubscription = subscription;
          this.__emitToSubscription.apply(this, [subscription].concat(Array.prototype.slice.call(arguments)));
        }
      }
      this._currentSubscription = null;
    }
  };

  /**
   * Provides a hook to override how the emitter emits an event to a specific
   * subscription. This allows you to set up logging and error boundaries
   * specific to your environment.
   *
   * @param {EmitterSubscription} subscription
   * @param {string} eventType
   * @param {*} Arbitrary arguments to be passed to each registered listener
   */

  BaseEventEmitter.prototype.__emitToSubscription = function __emitToSubscription(subscription, eventType) {
    var args = Array.prototype.slice.call(arguments, 2);
    subscription.listener.apply(subscription.context, args);
  };

  return BaseEventEmitter;
})();

module.exports = BaseEventEmitter;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule EventSubscription
 * @typechecks
 */



/**
 * EventSubscription represents a subscription to a particular event. It can
 * remove its own subscription.
 */

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var EventSubscription = (function () {

  /**
   * @param {EventSubscriptionVendor} subscriber the subscriber that controls
   *   this subscription.
   */

  function EventSubscription(subscriber) {
    _classCallCheck(this, EventSubscription);

    this.subscriber = subscriber;
  }

  /**
   * Removes this subscription from the subscriber that controls it.
   */

  EventSubscription.prototype.remove = function remove() {
    if (this.subscriber) {
      this.subscriber.removeSubscription(this);
      this.subscriber = null;
    }
  };

  return EventSubscription;
})();

module.exports = EventSubscription;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 * 
 * @providesModule EventSubscriptionVendor
 * @typechecks
 */



function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var invariant = __webpack_require__(12);

/**
 * EventSubscriptionVendor stores a set of EventSubscriptions that are
 * subscribed to a particular event type.
 */

var EventSubscriptionVendor = (function () {
  function EventSubscriptionVendor() {
    _classCallCheck(this, EventSubscriptionVendor);

    this._subscriptionsForType = {};
    this._currentSubscription = null;
  }

  /**
   * Adds a subscription keyed by an event type.
   *
   * @param {string} eventType
   * @param {EventSubscription} subscription
   */

  EventSubscriptionVendor.prototype.addSubscription = function addSubscription(eventType, subscription) {
    !(subscription.subscriber === this) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'The subscriber of the subscription is incorrectly set.') : invariant(false) : undefined;
    if (!this._subscriptionsForType[eventType]) {
      this._subscriptionsForType[eventType] = [];
    }
    var key = this._subscriptionsForType[eventType].length;
    this._subscriptionsForType[eventType].push(subscription);
    subscription.eventType = eventType;
    subscription.key = key;
    return subscription;
  };

  /**
   * Removes a bulk set of the subscriptions.
   *
   * @param {?string} eventType - Optional name of the event type whose
   *   registered supscriptions to remove, if null remove all subscriptions.
   */

  EventSubscriptionVendor.prototype.removeAllSubscriptions = function removeAllSubscriptions(eventType) {
    if (eventType === undefined) {
      this._subscriptionsForType = {};
    } else {
      delete this._subscriptionsForType[eventType];
    }
  };

  /**
   * Removes a specific subscription. Instead of calling this function, call
   * `subscription.remove()` directly.
   *
   * @param {object} subscription
   */

  EventSubscriptionVendor.prototype.removeSubscription = function removeSubscription(subscription) {
    var eventType = subscription.eventType;
    var key = subscription.key;

    var subscriptionsForType = this._subscriptionsForType[eventType];
    if (subscriptionsForType) {
      delete subscriptionsForType[key];
    }
  };

  /**
   * Returns the array of subscriptions that are currently registered for the
   * given event type.
   *
   * Note: This array can be potentially sparse as subscriptions are deleted
   * from it when they are removed.
   *
   * TODO: This returns a nullable array. wat?
   *
   * @param {string} eventType
   * @return {?array}
   */

  EventSubscriptionVendor.prototype.getSubscriptionsForType = function getSubscriptionsForType(eventType) {
    return this._subscriptionsForType[eventType];
  };

  return EventSubscriptionVendor;
})();

module.exports = EventSubscriptionVendor;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

/***/ }),
/* 27 */
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
var View_1 = __webpack_require__(1);
var AppStore_1 = __webpack_require__(2);
/**
 * Основная панель приложения.
 * Эта часть меняется в зависимости от выбранного пункта навигации, и отображается каждая часть через свою 'Активную Вьюшку'.
 * На основе выбранной вкладки - отображает текущий контент - активную Вьюшку (лежат в '/components/ActivePanels').
 * Все необходимые 'активные вьюшки' связаны с навигацией и инициализируются в '/datas/AppData'.
 */
var ActionPanel = (function (_super) {
    __extends(ActionPanel, _super);
    function ActionPanel(props) {
        return _super.call(this, props, [AppStore_1.default]) || this;
    }
    // Интересующие нас состояния (получаем их строго из Сторов)
    ActionPanel.prototype.getState = function () {
        return {
            navIndex: AppStore_1.default.getNavigationIndex()
        };
    };
    ///
    /// Render
    ///
    ActionPanel.prototype.drawError = function (msg) {
        return React.createElement("div", { className: "ActiveViewError" }, msg);
    };
    ActionPanel.prototype.render = function () {
        var curNavIndex = this.state.navIndex;
        var curLine = null;
        //this.props.navLines.forEach(line => { if (line.navIndex == curNavIndex) { curLine = line; return false;} });
        for (var _i = 0, _a = this.props.navLines; _i < _a.length; _i++) {
            var line = _a[_i];
            if (line.navIndex == curNavIndex) {
                curLine = line;
                break; // только ради этого
            }
        }
        if (curLine == null || curLine == undefined)
            return this.drawError("Не найдена активная панель приложения с индексом '" + curNavIndex + "'");
        // динамически определяем компонент (активную вьюшку) и рендерим ее
        var PanelViewName = curLine.viewRef;
        return React.createElement("div", { className: "ActionPanel" },
            React.createElement(PanelViewName, null));
    };
    return ActionPanel;
}(View_1.default));
exports.ActionPanel = ActionPanel;


/***/ }),
/* 28 */
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
var View_1 = __webpack_require__(1);
/**
 * Основные кнопки управления
 */
var ControlPanel = (function (_super) {
    __extends(ControlPanel, _super);
    function ControlPanel(props) {
        return _super.call(this, props, []) || this;
    }
    // Интересующие нас состояния (получаем их строго из Сторов)
    ControlPanel.prototype.getState = function () {
        return {};
    };
    ///
    /// User interactions
    ///
    ControlPanel.prototype.onButtonAdd = function () {
        this.getActionCreator().addItem({ t: 'bebebeee' });
    };
    ControlPanel.prototype.onButtonDelete = function () {
        this.getActionCreator().deleteItem(null);
    };
    ///
    /// Render
    ///
    ControlPanel.prototype.drawButtons = function () {
        var _this = this;
        return React.createElement("div", { className: "Buttons" },
            React.createElement("div", { className: "Button", onClick: function (e) { return _this.onButtonAdd(); } }, "Add"),
            React.createElement("div", { className: "Button", onClick: function (e) { return _this.onButtonDelete(); } }, "Delete"));
    };
    ControlPanel.prototype.render = function () {
        var buttons = this.drawButtons();
        return React.createElement("div", { className: "ControlPanel" }, buttons);
    };
    return ControlPanel;
}(View_1.default));
exports.ControlPanel = ControlPanel;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Navigation;
(function (Navigation) {
    var NavigationLine = (function () {
        function NavigationLine(navIndex, title, viewRef) {
            this.navIndex = navIndex;
            this.title = title;
            this.viewRef = viewRef;
        }
        return NavigationLine;
    }());
    Navigation.NavigationLine = NavigationLine;
})(Navigation || (Navigation = {}));
exports.default = Navigation;


/***/ }),
/* 30 */
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
var View_1 = __webpack_require__(1);
var TransactionStore_1 = __webpack_require__(7);
var TransactionLine_1 = __webpack_require__(34);
/**
 * Панель - транзакции.
 */
var TransactionActive = (function (_super) {
    __extends(TransactionActive, _super);
    function TransactionActive(props) {
        return _super.call(this, props, [TransactionStore_1.default]) || this;
    }
    // Интересующие нас состояния (получаем их строго из Сторов)
    TransactionActive.prototype.getState = function () {
        return {
            transactions: TransactionStore_1.default.getTransactions()
        };
    };
    ///
    /// User interactions
    ///
    ///
    /// Render
    ///
    TransactionActive.prototype.renderLines = function () {
        var lines = this.state.transactions;
        // sort by Date
        lines = lines.sort(function (a, b) { return a.date > b.date ? -1 : 1; });
        // render
        var linesForRender = lines.map(function (line) { return React.createElement(TransactionLine_1.default, { transaction: line }); });
        return React.createElement("div", { className: "LinesPlace" }, linesForRender);
    };
    TransactionActive.prototype.render = function () {
        return React.createElement("div", { className: "TransactionActive" }, this.renderLines());
    };
    return TransactionActive;
}(View_1.default));
exports.TransactionActive = TransactionActive;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Transactions;
(function (Transactions) {
    /**
     * Фильтры транзакций. Используется Клиентом при запросах к данным.
     */
    var TransactionFilters = (function () {
        function TransactionFilters() {
            this.packType = 1; // пакет - размерность выборки (день,месяц,год)
            this.packType = 1;
        }
        return TransactionFilters;
    }());
    Transactions.TransactionFilters = TransactionFilters;
    /**
     * Типы транзакции.
     */
    var TransactionTypes;
    (function (TransactionTypes) {
        TransactionTypes[TransactionTypes["Spend"] = 1] = "Spend";
        TransactionTypes[TransactionTypes["Profit"] = 2] = "Profit";
        TransactionTypes[TransactionTypes["Transfer"] = 3] = "Transfer"; // перевод на другой счет
    })(TransactionTypes = Transactions.TransactionTypes || (Transactions.TransactionTypes = {}));
    /**
     * Вывод транзакции.
     */
    var TransactionLine = (function () {
        function TransactionLine(id, date, type, currency, cost) {
            this.id = id;
            this.date = date;
            this.type = type;
            this.currency = currency;
            this.cost = cost;
        }
        return TransactionLine;
    }());
    Transactions.TransactionLine = TransactionLine;
})(Transactions || (Transactions = {}));
exports.default = Transactions;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Ajax_1 = __webpack_require__(33);
var Client;
(function (Client) {
    /**
     * Запрос к данным.
     */
    var ClientAccessor = (function () {
        function ClientAccessor() {
        }
        /**
         * Счета.
         */
        /*getAccounts(callBack: ICbfGetAccounts): Accounts.AccountLine[] {
            return Mock.getAccounts();
        }*/
        ClientAccessor.prototype.getAccounts = function (callBack) {
            //callBack(true, "", Mock.getAccounts());
            /*setTimeout(function(){
                callBack(false, "сервер не отвечает", null);
            }, 5000);*/
            /*setTimeout(function(){
                callBack(true, "", Mock.getAccounts());
            }, 2000);*/
            //
            Ajax_1.default.get("public/fakes/accounts.json", {}, function (data) {
                var dataModel = JSON.parse(data);
                callBack(dataModel.success, dataModel.message, dataModel.data);
            }, function (errorMsg) {
                callBack(false, errorMsg, null);
            });
        };
        /**
         * Транзакции.
         */
        ClientAccessor.prototype.getTransactions = function (filters, callBack) {
            // TODO: filters
            //return data;
            //callBack(true, "", Mock.getTransactions());
            Ajax_1.default.get("public/fakes/transactions.json", filters, function (data) {
                var dataModel = JSON.parse(data);
                callBack(dataModel.success, dataModel.message, dataModel.data);
            }, function (errorMsg) {
                callBack(false, errorMsg, null);
            });
        };
        return ClientAccessor;
    }());
    Client.ClientAccessor = ClientAccessor;
})(Client || (Client = {}));
exports.default = new Client.ClientAccessor;


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Ajax;
(function (Ajax) {
    function _x() {
        if (typeof XMLHttpRequest !== 'undefined') {
            return new XMLHttpRequest();
        }
        var versions = [
            "MSXML2.XmlHttp.6.0",
            "MSXML2.XmlHttp.5.0",
            "MSXML2.XmlHttp.4.0",
            "MSXML2.XmlHttp.3.0",
            "MSXML2.XmlHttp.2.0",
            "Microsoft.XmlHttp"
        ];
        var xhr;
        for (var i = 0; i < versions.length; i++) {
            try {
                xhr = new ActiveXObject(versions[i]);
                break;
            }
            catch (e) {
            }
        }
        return xhr;
    }
    ;
    function send(url, callback, onerror, method, data, async) {
        if (async === undefined) {
            async = true;
        }
        var x = _x();
        x.open(method, url, async);
        x.onreadystatechange = function () {
            if (x.readyState == XMLHttpRequest.DONE) {
                if (x.status == 200) {
                    callback(x.responseText);
                }
                else if (x.status == 400) {
                    onerror("400 (" + x.statusText + "); " + url);
                }
                else if (x.status == 404) {
                    onerror("404 (" + x.statusText + "); " + url);
                }
                else {
                    onerror(x.statusText);
                }
            }
        };
        x.onabort = function (d) {
            onerror(x.statusText);
        };
        x.onerror = function (d) {
            onerror(x.statusText);
        };
        if (method == 'POST') {
            x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        }
        x.send(data);
    }
    ;
    function get(url, data, callback, onerror, async) {
        var query = [];
        for (var key in data) {
            query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
        }
        send(url + (query.length ? '?' + query.join('&') : ''), callback, onerror, 'GET', null, async);
    }
    Ajax.get = get;
    ;
    function post(url, data, callback, onerror, async) {
        var query = [];
        for (var key in data) {
            query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
        }
        send(url, callback, onerror, 'POST', query.join('&'), async);
    }
    ;
})(Ajax = exports.Ajax || (exports.Ajax = {}));
exports.default = Ajax;


/***/ }),
/* 34 */
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
var View_1 = __webpack_require__(1);
/**
 * Строка дохода/расхода
 */
var TransactionLine = (function (_super) {
    __extends(TransactionLine, _super);
    function TransactionLine(props) {
        return _super.call(this, props, []) || this;
    }
    // Интересующие нас состояния (получаем их строго из Сторов)
    TransactionLine.prototype.getState = function () {
        return {};
    };
    TransactionLine.prototype.numberFormat = function (num, slices) {
        return ("0" + num).slice(-slices);
    };
    TransactionLine.prototype.numTo2Zero = function (num) {
        return this.numberFormat(num, 2);
    };
    ///
    /// User interactions
    ///
    ///
    /// Render
    ///
    TransactionLine.prototype.render = function () {
        return React.createElement("div", { className: "TransactionLine" },
            React.createElement("span", { className: "Date" },
                this.numTo2Zero(this.props.transaction.date.getDate()),
                ".",
                this.numTo2Zero(this.props.transaction.date.getMonth()),
                ".",
                this.props.transaction.date.getFullYear()),
            React.createElement("span", { className: "Time" },
                "(",
                this.numTo2Zero(this.props.transaction.date.getHours()),
                ":",
                this.numTo2Zero(this.props.transaction.date.getMinutes()),
                ")"),
            React.createElement("span", { className: "Title" }, this.props.transaction.cost));
    };
    return TransactionLine;
}(View_1.default));
exports.TransactionLine = TransactionLine;
exports.default = TransactionLine;


/***/ }),
/* 35 */
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
var View_1 = __webpack_require__(1);
var TransactionStore_1 = __webpack_require__(7);
var AccountLine_1 = __webpack_require__(36);
/**
 * Панель - счета.
 */
var AccountActive = (function (_super) {
    __extends(AccountActive, _super);
    function AccountActive(props) {
        return _super.call(this, props, [TransactionStore_1.default]) || this;
    }
    // Интересующие нас состояния (получаем их строго из Сторов)
    AccountActive.prototype.getState = function () {
        return {
            accounts: TransactionStore_1.default.getAccounts()
        };
    };
    ///
    /// User interactions
    ///
    ///
    /// Render
    ///
    AccountActive.prototype.renderAccountLines = function () {
        var lines = this.state.accounts;
        // sort
        lines = lines.sort(function (a, b) { return a.order < b.order ? -1 : 1; });
        // render
        var linesForRender = lines.map(function (line) { return React.createElement(AccountLine_1.default, { account: line }); });
        return React.createElement("div", { className: "LinesPlace" }, linesForRender);
    };
    AccountActive.prototype.render = function () {
        return React.createElement("div", { className: "AccountActive" }, this.renderAccountLines());
    };
    return AccountActive;
}(View_1.default));
exports.AccountActive = AccountActive;


/***/ }),
/* 36 */
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
var View_1 = __webpack_require__(1);
/**
 * Строка счета
 */
var AccountLine = (function (_super) {
    __extends(AccountLine, _super);
    function AccountLine(props) {
        return _super.call(this, props, []) || this;
    }
    // Интересующие нас состояния (получаем их строго из Сторов)
    AccountLine.prototype.getState = function () {
        return {};
    };
    ///
    /// User interactions
    ///
    ///
    /// Render
    ///
    AccountLine.prototype.render = function () {
        return React.createElement("div", { className: "AccountLine" }, this.props.account.title);
    };
    return AccountLine;
}(View_1.default));
exports.AccountLine = AccountLine;
exports.default = AccountLine;


/***/ }),
/* 37 */
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
var AppStore_1 = __webpack_require__(2);
var View_1 = __webpack_require__(1);
/**
 * Лог
 */
var LogPanel = (function (_super) {
    __extends(LogPanel, _super);
    function LogPanel(props) {
        return _super.call(this, props, [AppStore_1.default]) || this;
    }
    // Интересующие нас состояния (получаем их строго из Сторов)
    LogPanel.prototype.getState = function () {
        return {
            logText: AppStore_1.default.getLogText()
        };
    };
    ///
    /// Render
    ///
    LogPanel.prototype.render = function () {
        return React.createElement("div", { className: "LogPanel" },
            React.createElement("span", null,
                "\u043B\u043E\u0433: ",
                React.createElement("b", null, this.state.logText)));
    };
    return LogPanel;
}(View_1.default));
exports.LogPanel = LogPanel;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map