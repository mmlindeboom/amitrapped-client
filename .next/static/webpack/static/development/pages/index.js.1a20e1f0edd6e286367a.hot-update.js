webpackHotUpdate("static/development/pages/index.js",{

/***/ "./components/LoginForm.js":
/*!*********************************!*\
  !*** ./components/LoginForm.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/objectSpread */ "./node_modules/@babel/runtime-corejs2/helpers/esm/objectSpread.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/slicedToArray */ "./node_modules/@babel/runtime-corejs2/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _apollo_react_hooks__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @apollo/react-hooks */ "./node_modules/@apollo/react-hooks/lib/react-hooks.esm.js");
/* harmony import */ var semantic_ui_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! semantic-ui-react */ "../node_modules/semantic-ui-react/dist/es/index.js");
/* harmony import */ var next_app__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! next/app */ "./node_modules/next/app.js");
/* harmony import */ var next_app__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(next_app__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../lib/auth */ "./lib/auth.js");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! next/router */ "./node_modules/next/dist/client/router.js");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _data_user__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../data/user */ "./data/user.js");



var _jsxFileName = "/Users/mattl/Dev/personal/amitrapped/client/components/LoginForm.js";










var useLoginForm = function useLoginForm(callback) {
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])({
    email: '',
    password: ''
  }),
      _useState2 = Object(_babel_runtime_corejs2_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_2__["default"])(_useState, 2),
      inputs = _useState2[0],
      setInputs = _useState2[1];

  var handleSubmit = function handleSubmit(e) {
    if (e) e.preventDefault();
    callback();
  };

  var handleChange = function handleChange(e) {
    e.persist();
    setInputs(Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, inputs, Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])({}, e.target.name, e.target.value)));
  };

  return {
    handleSubmit: handleSubmit,
    handleChange: handleChange,
    inputs: inputs
  };
};

var Login = function Login(_ref) {
  var token = _ref.token;

  var _useMutation = Object(_apollo_react_hooks__WEBPACK_IMPORTED_MODULE_4__["useMutation"])(_data_user__WEBPACK_IMPORTED_MODULE_10__["AUTHENTICATE_USER"]),
      _useMutation2 = Object(_babel_runtime_corejs2_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_2__["default"])(_useMutation, 2),
      login = _useMutation2[0],
      _useMutation2$ = _useMutation2[1],
      loading = _useMutation2$.loading,
      data = _useMutation2$.data,
      error = _useMutation2$.error;

  var _useLoginForm = useLoginForm(function () {
    return login({
      variables: inputs
    });
  }),
      inputs = _useLoginForm.inputs,
      handleChange = _useLoginForm.handleChange,
      handleSubmit = _useLoginForm.handleSubmit;

  if (token) {
    next_router__WEBPACK_IMPORTED_MODULE_9__["Router"].push('/home');
  }

  if (data && data.login.token) {
    Object(_lib_auth__WEBPACK_IMPORTED_MODULE_8__["loginReadyFor"])(data.login.token);
  }

  return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(next_app__WEBPACK_IMPORTED_MODULE_6__["Container"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 42
    },
    __self: this
  }, error && react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_5__["Message"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 44
    },
    __self: this
  }, error.message), loading && react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_5__["Dimmer"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 47
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_5__["Loader"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 47
    },
    __self: this
  })), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_5__["Grid"], {
    textAlign: "center",
    style: {
      height: '100vh'
    },
    verticalAlign: "middle",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 49
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_5__["Grid"].Column, {
    style: {
      maxWidth: 450
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 50
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_5__["Header"], {
    as: "h2",
    color: "teal",
    textAlign: "center",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 51
    },
    __self: this
  }, "Log-in to your account"), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_5__["Form"], {
    size: "large",
    onSubmit: handleSubmit,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 55
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_5__["Segment"], {
    stacked: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 56
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_5__["Form"].Input, {
    fluid: true,
    icon: "user",
    iconPosition: "left",
    placeholder: "E-mail address",
    name: "email",
    value: inputs.email,
    onChange: handleChange,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 57
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_5__["Form"].Input, {
    fluid: true,
    icon: "lock",
    iconPosition: "left",
    placeholder: "Password",
    type: "password",
    name: "password",
    value: inputs.password,
    onChange: handleChange,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 63
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_5__["Button"], {
    color: "teal",
    fluid: true,
    size: "large",
    type: "submit",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 74
    },
    __self: this
  }, "Login"))), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_5__["Message"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 79
    },
    __self: this
  }, "New to us? ", react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_7___default.a, {
    href: "/signup",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 80
    },
    __self: this
  }, "Sign Up")))));
};

/* harmony default export */ __webpack_exports__["default"] = (Login);

/***/ })

})
//# sourceMappingURL=index.js.1a20e1f0edd6e286367a.hot-update.js.map