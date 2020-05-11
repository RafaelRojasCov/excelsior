(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./handler.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./functions/index.js":
/*!****************************!*\
  !*** ./functions/index.js ***!
  \****************************/
/*! exports provided: getPolicy, calculateTotalPolicyCost, calculateCopaymentWorkers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPolicy", function() { return getPolicy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "calculateTotalPolicyCost", function() { return calculateTotalPolicyCost; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "calculateCopaymentWorkers", function() { return calculateCopaymentWorkers; });
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! source-map-support/register */ "source-map-support/register");
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils */ "./utils/index.js");
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bignumber.js */ "bignumber.js");
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(bignumber_js__WEBPACK_IMPORTED_MODULE_2__);



const getPolicy = async () => {
  const {
    bicePolicy
  } = _utils__WEBPACK_IMPORTED_MODULE_1__["urls"];
  return fetch(bicePolicy).then(res => res.json()).then(data => ({
    data: data.policy,
    error: null
  })).catch(error => ({
    data: null,
    error
  }));
};
const calculateTotalPolicyCost = ({
  workers,
  has_dental_care,
  company_percentage
}) => {
  const {
    calculateTotalHealthCost,
    calculateTotalDentalCost
  } = _utils__WEBPACK_IMPORTED_MODULE_1__["costs"];
  let totalDentalCost = new bignumber_js__WEBPACK_IMPORTED_MODULE_2___default.a(0);
  console.log(workers);
  const totalHealthCost = calculateTotalHealthCost(workers);

  if (has_dental_care) {
    totalDentalCost = calculateTotalDentalCost(workers);
  } //return the total cost for the company


  return totalHealthCost.plus(totalDentalCost).multipliedBy(company_percentage).dividedBy(100).toFixed(4);
};
const calculateCopaymentWorkers = ({
  workers,
  has_dental_care,
  company_percentage
}) => {
  const {
    healthCostPerChild,
    dentalCostPerChild
  } = _utils__WEBPACK_IMPORTED_MODULE_1__["costs"];
  const {
    hasCoverageByAge
  } = _utils__WEBPACK_IMPORTED_MODULE_1__["validations"];
  const maxPercentageCoverage = 100;
  const copaymentFactor = maxPercentageCoverage - company_percentage;
  const copayWorkers = workers.reduce((totalCopay, worker) => {
    let dentalCopayment;

    if (hasCoverageByAge(worker)) {
      const healthCopayment = new bignumber_js__WEBPACK_IMPORTED_MODULE_2___default.a(healthCostPerChild(worker)).multipliedBy(copaymentFactor).dividedBy(maxPercentageCoverage).toFixed(4);

      if (has_dental_care) {
        dentalCopayment = new bignumber_js__WEBPACK_IMPORTED_MODULE_2___default.a(dentalCostPerChild(worker)).multipliedBy(copaymentFactor).dividedBy(maxPercentageCoverage).toFixed(4);
      } else {
        dentalCopayment = "not covered";
      }

      return [...totalCopay, { ...worker,
        healthCopayment,
        dentalCopayment
      }];
    } else {
      return [...totalCopay, { ...worker,
        healthCopayment: "not covered",
        dentalCopayment: "not coverxed"
      }];
    }
  }, []);
  return copayWorkers;
};

/***/ }),

/***/ "./handler.js":
/*!********************!*\
  !*** ./handler.js ***!
  \********************/
/*! exports provided: hello */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hello", function() { return hello; });
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! source-map-support/register */ "source-map-support/register");
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _functions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./functions */ "./functions/index.js");




const hello = async event => {
  const {
    data,
    error
  } = await Object(_functions__WEBPACK_IMPORTED_MODULE_1__["getPolicy"])();

  if (error !== null) {
    return JSON.stringify({
      status: 400,
      message: "ERROR",
      error
    }, null, 2);
  } else {
    return JSON.stringify({
      status: 200,
      message: "OK",
      data: {
        totalPolicyCost: Object(_functions__WEBPACK_IMPORTED_MODULE_1__["calculateTotalPolicyCost"])(data),
        workersPolicy: Object(_functions__WEBPACK_IMPORTED_MODULE_1__["calculateCopaymentWorkers"])(data)
      }
    }, null, 2);
  }
};

/***/ }),

/***/ "./utils/costs.js":
/*!************************!*\
  !*** ./utils/costs.js ***!
  \************************/
/*! exports provided: calculateTotalHealthCost, calculateTotalDentalCost, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "calculateTotalHealthCost", function() { return calculateTotalHealthCost; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "calculateTotalDentalCost", function() { return calculateTotalDentalCost; });
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! source-map-support/register */ "source-map-support/register");
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bignumber.js */ "bignumber.js");
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(bignumber_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _validations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./validations */ "./utils/validations.js");




const healthCostPerChild = ({
  childs
}) => {
  if (childs === 0) {
    return 0.279;
  }

  if (childs === 1) {
    return 0.4396;
  } // if none of above, then we can assume that the worker has more than 2 childs.


  return 0.5599;
};

const dentalCostPerChild = ({
  childs
}) => {
  if (childs === 0) {
    return 0.12;
  }

  if (childs === 1) {
    return 0.195;
  } // if none of above, then we can assume that the worker has more than 2 childs.


  return 0.248;
};

const calculateTotalHealthCost = workers => workers.reduce((totalCost, worker) => {
  if (Object(_validations__WEBPACK_IMPORTED_MODULE_2__["hasCoverageByAge"])(worker)) {
    return totalCost.plus(healthCostPerChild(worker));
  } else {
    return totalCost;
  }
}, new bignumber_js__WEBPACK_IMPORTED_MODULE_1___default.a(0));
const calculateTotalDentalCost = workers => workers.reduce((totalCost, worker) => {
  if (Object(_validations__WEBPACK_IMPORTED_MODULE_2__["hasCoverageByAge"])(worker)) {
    return totalCost.plus(dentalCostPerChild(worker));
  } else {
    return totalCost;
  }
}, new bignumber_js__WEBPACK_IMPORTED_MODULE_1___default.a(0));
/* harmony default export */ __webpack_exports__["default"] = ({
  healthCostPerChild,
  dentalCostPerChild,
  calculateTotalHealthCost,
  calculateTotalDentalCost
});

/***/ }),

/***/ "./utils/index.js":
/*!************************!*\
  !*** ./utils/index.js ***!
  \************************/
/*! exports provided: urls, costs, validations */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! source-map-support/register */ "source-map-support/register");
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _urls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./urls */ "./utils/urls.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "urls", function() { return _urls__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _costs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./costs */ "./utils/costs.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "costs", function() { return _costs__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _validations__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./validations */ "./utils/validations.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "validations", function() { return _validations__WEBPACK_IMPORTED_MODULE_3__["default"]; });







/***/ }),

/***/ "./utils/urls.js":
/*!***********************!*\
  !*** ./utils/urls.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! source-map-support/register */ "source-map-support/register");
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = ({
  bicePolicy: "https://dn8mlk7hdujby.cloudfront.net/interview/insurance/policy"
});

/***/ }),

/***/ "./utils/validations.js":
/*!******************************!*\
  !*** ./utils/validations.js ***!
  \******************************/
/*! exports provided: hasCoverageByAge, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasCoverageByAge", function() { return hasCoverageByAge; });
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! source-map-support/register */ "source-map-support/register");
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_0__);

// Constants
const MAX_AGE_LIMIT_COVERAGE = 65; // validations

const hasCoverageByAge = ({
  age
}) => age < MAX_AGE_LIMIT_COVERAGE;
/* harmony default export */ __webpack_exports__["default"] = ({
  hasCoverageByAge
});

/***/ }),

/***/ "bignumber.js":
/*!*******************************!*\
  !*** external "bignumber.js" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("bignumber.js");

/***/ }),

/***/ "source-map-support/register":
/*!**********************************************!*\
  !*** external "source-map-support/register" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("source-map-support/register");

/***/ })

/******/ })));
//# sourceMappingURL=handler.js.map