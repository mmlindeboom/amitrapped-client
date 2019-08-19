webpackHotUpdate("static/development/pages/signup.js",{

/***/ "./components/SignupForm.js":
/*!**********************************!*\
  !*** ./components/SignupForm.js ***!
  \**********************************/
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
/* harmony import */ var apollo_boost__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! apollo-boost */ "./node_modules/apollo-boost/lib/bundle.esm.js");
/* harmony import */ var semantic_ui_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! semantic-ui-react */ "../node_modules/semantic-ui-react/dist/es/index.js");
/* harmony import */ var next_app__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! next/app */ "./node_modules/next/app.js");
/* harmony import */ var next_app__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(next_app__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../lib/auth */ "./lib/auth.js");
/* harmony import */ var _data_user__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../data/user */ "./data/user.js");



var _jsxFileName = "/Users/mattl/Dev/personal/amitrapped/client/components/SignupForm.js";









var useLoginForm = function useLoginForm(callback) {
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])({
    email: '',
    password: '',
    passwordConfirmation: '',
    firstName: '',
    lastName: ''
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

var SignupForm = function SignupForm(_ref) {
  var token = _ref.token;

  var _useMutation = Object(_apollo_react_hooks__WEBPACK_IMPORTED_MODULE_4__["useMutation"])(_data_user__WEBPACK_IMPORTED_MODULE_9__["SIGNUP_USER"]),
      _useMutation2 = Object(_babel_runtime_corejs2_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_2__["default"])(_useMutation, 2),
      signup = _useMutation2[0],
      _useMutation2$ = _useMutation2[1],
      loading = _useMutation2$.loading,
      data = _useMutation2$.data,
      error = _useMutation2$.error;

  var _useLoginForm = useLoginForm(function () {
    return signup({
      variables: inputs
    });
  }),
      inputs = _useLoginForm.inputs,
      handleChange = _useLoginForm.handleChange,
      handleSubmit = _useLoginForm.handleSubmit;

  if (data && data.signUp.token) {
    Object(_lib_auth__WEBPACK_IMPORTED_MODULE_8__["loginReadyFor"])(data.signUp.token);
  }

  return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(next_app__WEBPACK_IMPORTED_MODULE_7__["Container"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 44
    },
    __self: this
  }, error && react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_6__["Message"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 46
    },
    __self: this
  }, error.message), loading && react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_6__["Dimmer"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 49
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_6__["Loader"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 49
    },
    __self: this
  })), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_6__["Grid"], {
    textAlign: "center",
    style: {
      height: '100vh'
    },
    verticalAlign: "middle",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 51
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_6__["Grid"].Column, {
    style: {
      maxWidth: 450
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 52
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_6__["Header"], {
    as: "h2",
    color: "teal",
    textAlign: "center",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 53
    },
    __self: this
  }, "Create an account"), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_6__["Form"], {
    size: "large",
    onSubmit: handleSubmit,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 57
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_6__["Segment"], {
    stacked: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 58
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_6__["Form"].Input, {
    fluid: true,
    icon: "user",
    iconPosition: "left",
    placeholder: "E-mail address",
    name: "email",
    value: inputs.email,
    onChange: handleChange,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 59
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_6__["Form"].Input, {
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
      lineNumber: 65
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_6__["Form"].Input, {
    fluid: true,
    icon: "lock",
    iconPosition: "left",
    placeholder: "Password",
    type: "password",
    name: "passwordConfirmation",
    value: inputs.passwordConfirmation,
    onChange: handleChange,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 75
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_6__["Form"].Input, {
    fluid: true,
    icon: "lock",
    iconPosition: "left",
    placeholder: "First Name",
    name: "firstName",
    value: inputs.firstName,
    onChange: handleChange,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 85
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_6__["Form"].Input, {
    fluid: true,
    icon: "lock",
    iconPosition: "left",
    placeholder: "Last Name",
    name: "lastName",
    value: inputs.lastName,
    onChange: handleChange,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 94
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_6__["Button"], {
    color: "teal",
    fluid: true,
    size: "large",
    type: "submit",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 105
    },
    __self: this
  }, "Sign Up"))), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_6__["Message"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 110
    },
    __self: this
  }, "New to us? ", react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("a", {
    href: "#",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 111
    },
    __self: this
  }, "Sign Up")))));
};

/* harmony default export */ __webpack_exports__["default"] = (SignupForm);

/***/ })

})
//# sourceMappingURL=signup.js.3d06037b9fb417a8cda2.hot-update.js.map