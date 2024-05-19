"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/puzzle/[puzzleId]/page",{

/***/ "(app-pages-browser)/./app/shared/board/square.tsx":
/*!*************************************!*\
  !*** ./app/shared/board/square.tsx ***!
  \*************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n\nvar _s = $RefreshSig$();\n\nconst Square = /*#__PURE__*/ _s((0,react__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(_c = _s((param, ref)=>{\n    let { onKeyPress, onClick, onBackspace, onBlur, isFocused, isHighlighted, editorMode, number, initialContents, externalLetter } = param;\n    _s();\n    const [letter, setLetter] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(initialContents);\n    const [content, setContent] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(initialContents);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        setContent(letter);\n    }, [\n        letter\n    ]);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        if (isFocused) {\n            handleKeyPress(externalLetter);\n        }\n    }, [\n        externalLetter\n    ]);\n    const handlePCKeyPress = (event)=>{\n        const key = event.key;\n        handleKeyPress(key);\n    };\n    const handleKeyPress = (key)=>{\n        console.log(\"CONTENTS FOR SQUARE\" + initialContents);\n        if (editorMode || key !== \".\" && letter !== \".\") {\n            if (key.length === 1 && key.match(/[a-zA-Z\\.]/)) {\n                setLetter(key.toUpperCase());\n            } else if (key === \"Backspace\") {\n                setLetter(\"\");\n                onBackspace(); // Notify Board to move focus backward\n            }\n            onKeyPress(key);\n        }\n    };\n    const handleClick = ()=>{\n        if (editorMode || content !== \".\") {\n            onClick(); // Call onClick when the square is clicked\n        }\n    };\n    const handleBlur = ()=>{\n        console.log(\"SQUARE BLURRED!\");\n        onBlur();\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        ref: ref,\n        \"data-letter\": letter,\n        \"data-number\": number !== undefined && number !== null ? number.toString() : \"\",\n        tabIndex: 0,\n        onKeyDown: handlePCKeyPress,\n        onBlur: handleBlur,\n        onClick: handleClick,\n        style: {\n            width: \"50px\",\n            height: \"50px\",\n            border: \"1px solid black\",\n            position: \"relative\",\n            fontSize: \"24px\",\n            fontFamily: \"Kadwa\",\n            fontWeight: 400,\n            fontStyle: \"normal\",\n            userSelect: \"none\",\n            outline: \"none\",\n            backgroundColor: isFocused ? \"lightblue\" : isHighlighted ? \"lightgrey\" : content === \".\" ? \"black\" : \"white\"\n        },\n        children: [\n            number !== null && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                style: {\n                    position: \"absolute\",\n                    top: \"2px\",\n                    left: \"2px\",\n                    fontSize: \"12px\",\n                    lineHeight: \"12px\",\n                    fontFamily: \"Kadwa\",\n                    fontWeight: 400,\n                    userSelect: \"none\"\n                },\n                children: number\n            }, void 0, false, {\n                fileName: \"/Users/evanvonoehsen/Develop/crucible/frontend/app/shared/board/square.tsx\",\n                lineNumber: 84,\n                columnNumber: 11\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                style: {\n                    display: \"flex\",\n                    justifyContent: \"center\",\n                    alignItems: \"center\",\n                    width: \"100%\",\n                    height: \"100%\",\n                    fontFamily: \"Kadwa\",\n                    fontWeight: 400\n                },\n                children: content\n            }, void 0, false, {\n                fileName: \"/Users/evanvonoehsen/Develop/crucible/frontend/app/shared/board/square.tsx\",\n                lineNumber: 99,\n                columnNumber: 9\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/evanvonoehsen/Develop/crucible/frontend/app/shared/board/square.tsx\",\n        lineNumber: 61,\n        columnNumber: 7\n    }, undefined);\n}, \"Id7OC9OyoW3Bnnzh/qpUUAXYzq8=\")), \"Id7OC9OyoW3Bnnzh/qpUUAXYzq8=\");\n_c1 = Square;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Square);\nvar _c, _c1;\n$RefreshReg$(_c, \"Square$forwardRef\");\n$RefreshReg$(_c1, \"Square\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2FwcC9zaGFyZWQvYm9hcmQvc3F1YXJlLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBK0Q7QUFlL0QsTUFBTUksdUJBQVNELEdBQUFBLGlEQUFVQSxTQUN2QixRQUE4SEU7UUFBN0gsRUFBRUMsVUFBVSxFQUFFQyxPQUFPLEVBQUVDLFdBQVcsRUFBRUMsTUFBTSxFQUFFQyxTQUFTLEVBQUVDLGFBQWEsRUFBRUMsVUFBVSxFQUFFQyxNQUFNLEVBQUVDLGVBQWUsRUFBRUMsY0FBYyxFQUFFOztJQUMxSCxNQUFNLENBQUNDLFFBQVFDLFVBQVUsR0FBR2hCLCtDQUFRQSxDQUFDYTtJQUNyQyxNQUFNLENBQUNJLFNBQVNDLFdBQVcsR0FBR2xCLCtDQUFRQSxDQUFDYTtJQUV2Q1osZ0RBQVNBLENBQUM7UUFDUmlCLFdBQVdIO0lBQ2IsR0FBRztRQUFDQTtLQUFPO0lBRVhkLGdEQUFTQSxDQUFDO1FBQ1IsSUFBR1EsV0FBVztZQUNaVSxlQUFlTDtRQUNqQjtJQUNGLEdBQUc7UUFBQ0E7S0FBZTtJQUVuQixNQUFNTSxtQkFBbUIsQ0FBQ0M7UUFDeEIsTUFBTUMsTUFBTUQsTUFBTUMsR0FBRztRQUNyQkgsZUFBZUc7SUFDakI7SUFFQSxNQUFNSCxpQkFBaUIsQ0FBQ0c7UUFDdEJDLFFBQVFDLEdBQUcsQ0FBQyx3QkFBd0JYO1FBQ3BDLElBQUlGLGNBQWVXLFFBQVEsT0FBT1AsV0FBVyxLQUFNO1lBQ2pELElBQUlPLElBQUlHLE1BQU0sS0FBSyxLQUFLSCxJQUFJSSxLQUFLLENBQUMsZUFBZTtnQkFDL0NWLFVBQVVNLElBQUlLLFdBQVc7WUFDM0IsT0FBTyxJQUFJTCxRQUFRLGFBQWE7Z0JBQzlCTixVQUFVO2dCQUNWVCxlQUFlLHNDQUFzQztZQUN2RDtZQUNBRixXQUFXaUI7UUFDYjtJQUNGO0lBRUEsTUFBTU0sY0FBYztRQUNsQixJQUFJakIsY0FBY00sWUFBWSxLQUFLO1lBQ2pDWCxXQUFXLDBDQUEwQztRQUN2RDtJQUNGO0lBRUEsTUFBTXVCLGFBQWE7UUFDakJOLFFBQVFDLEdBQUcsQ0FBQztRQUNaaEI7SUFDRjtJQUVBLHFCQUNFLDhEQUFDc0I7UUFDQzFCLEtBQUtBO1FBQ0wyQixlQUFhaEI7UUFDYmlCLGVBQWFwQixXQUFXcUIsYUFBYXJCLFdBQVcsT0FBT0EsT0FBT3NCLFFBQVEsS0FBSztRQUMzRUMsVUFBVTtRQUNWQyxXQUFXaEI7UUFDWFosUUFBUXFCO1FBQ1J2QixTQUFTc0I7UUFDVFMsT0FBTztZQUNMQyxPQUFPO1lBQ1BDLFFBQVE7WUFDUkMsUUFBUTtZQUNSQyxVQUFVO1lBQ1ZDLFVBQVU7WUFDVkMsWUFBWTtZQUNaQyxZQUFZO1lBQ1pDLFdBQVc7WUFDWEMsWUFBWTtZQUNaQyxTQUFTO1lBQ1RDLGlCQUFpQnZDLFlBQVksY0FBY0MsZ0JBQWdCLGNBQWNPLFlBQVksTUFBTSxVQUFVO1FBQ3ZHOztZQUVDTCxXQUFXLHNCQUNWLDhEQUFDa0I7Z0JBQ0NPLE9BQU87b0JBQ0xJLFVBQVU7b0JBQ1ZRLEtBQUs7b0JBQ0xDLE1BQU07b0JBQ05SLFVBQVU7b0JBQ1ZTLFlBQVk7b0JBQ1pSLFlBQVk7b0JBQ1pDLFlBQVk7b0JBQ1pFLFlBQVk7Z0JBQ2Q7MEJBRUNsQzs7Ozs7OzBCQUdMLDhEQUFDa0I7Z0JBQ0NPLE9BQU87b0JBQ0xlLFNBQVM7b0JBQ1RDLGdCQUFnQjtvQkFDaEJDLFlBQVk7b0JBQ1poQixPQUFPO29CQUNQQyxRQUFRO29CQUNSSSxZQUFZO29CQUNaQyxZQUFZO2dCQUNkOzBCQUVDM0I7Ozs7Ozs7Ozs7OztBQUlUOztBQUdGLCtEQUFlZCxNQUFNQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL2FwcC9zaGFyZWQvYm9hcmQvc3F1YXJlLnRzeD82Y2ZiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0LCBmb3J3YXJkUmVmIH0gZnJvbSAncmVhY3QnO1xuXG5pbnRlcmZhY2UgU3F1YXJlUHJvcHMge1xuICBvbktleVByZXNzOiAoa2V5OiBTdHJpbmcpID0+IHZvaWQ7XG4gIG9uQ2xpY2s6ICgpID0+IHZvaWQ7XG4gIG9uQmFja3NwYWNlOiAoKSA9PiB2b2lkO1xuICBvbkJsdXI6ICgpID0+IHZvaWQ7XG4gIGlzRm9jdXNlZDogYm9vbGVhbjtcbiAgaXNIaWdobGlnaHRlZDogYm9vbGVhbjtcbiAgZWRpdG9yTW9kZTogYm9vbGVhbjtcbiAgbnVtYmVyOiBudW1iZXIgfCBudWxsO1xuICBpbml0aWFsQ29udGVudHM6IHN0cmluZztcbiAgZXh0ZXJuYWxMZXR0ZXI/OiBzdHJpbmc7IC8vIE5ldyBwcm9wIGZvciBleHRlcm5hbCBjb250cm9sIG9mIGxldHRlclxufVxuXG5jb25zdCBTcXVhcmUgPSBmb3J3YXJkUmVmPEhUTUxEaXZFbGVtZW50LCBTcXVhcmVQcm9wcz4oXG4gICh7IG9uS2V5UHJlc3MsIG9uQ2xpY2ssIG9uQmFja3NwYWNlLCBvbkJsdXIsIGlzRm9jdXNlZCwgaXNIaWdobGlnaHRlZCwgZWRpdG9yTW9kZSwgbnVtYmVyLCBpbml0aWFsQ29udGVudHMsIGV4dGVybmFsTGV0dGVyIH0sIHJlZikgPT4ge1xuICAgIGNvbnN0IFtsZXR0ZXIsIHNldExldHRlcl0gPSB1c2VTdGF0ZShpbml0aWFsQ29udGVudHMpO1xuICAgIGNvbnN0IFtjb250ZW50LCBzZXRDb250ZW50XSA9IHVzZVN0YXRlKGluaXRpYWxDb250ZW50cyk7XG5cbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgc2V0Q29udGVudChsZXR0ZXIpXG4gICAgfSwgW2xldHRlcl0pO1xuXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgIGlmKGlzRm9jdXNlZCkge1xuICAgICAgICBoYW5kbGVLZXlQcmVzcyhleHRlcm5hbExldHRlcilcbiAgICAgIH1cbiAgICB9LCBbZXh0ZXJuYWxMZXR0ZXJdKTtcblxuICAgIGNvbnN0IGhhbmRsZVBDS2V5UHJlc3MgPSAoZXZlbnQ6IFJlYWN0LktleWJvYXJkRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB7XG4gICAgICBjb25zdCBrZXkgPSBldmVudC5rZXk7XG4gICAgICBoYW5kbGVLZXlQcmVzcyhrZXkpXG4gICAgfTtcblxuICAgIGNvbnN0IGhhbmRsZUtleVByZXNzID0gKGtleTogU3RyaW5nKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhcIkNPTlRFTlRTIEZPUiBTUVVBUkVcIiArIGluaXRpYWxDb250ZW50cylcbiAgICAgIGlmIChlZGl0b3JNb2RlIHx8IChrZXkgIT09ICcuJyAmJiBsZXR0ZXIgIT09ICcuJykpIHtcbiAgICAgICAgaWYgKGtleS5sZW5ndGggPT09IDEgJiYga2V5Lm1hdGNoKC9bYS16QS1aXFwuXS8pKSB7XG4gICAgICAgICAgc2V0TGV0dGVyKGtleS50b1VwcGVyQ2FzZSgpKTtcbiAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09ICdCYWNrc3BhY2UnKSB7XG4gICAgICAgICAgc2V0TGV0dGVyKCcnKTtcbiAgICAgICAgICBvbkJhY2tzcGFjZSgpOyAvLyBOb3RpZnkgQm9hcmQgdG8gbW92ZSBmb2N1cyBiYWNrd2FyZFxuICAgICAgICB9XG4gICAgICAgIG9uS2V5UHJlc3Moa2V5KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3QgaGFuZGxlQ2xpY2sgPSAoKSA9PiB7XG4gICAgICBpZiAoZWRpdG9yTW9kZSB8fCBjb250ZW50ICE9PSAnLicpIHtcbiAgICAgICAgb25DbGljaygpOyAvLyBDYWxsIG9uQ2xpY2sgd2hlbiB0aGUgc3F1YXJlIGlzIGNsaWNrZWRcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3QgaGFuZGxlQmx1ciA9ICgpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKFwiU1FVQVJFIEJMVVJSRUQhXCIpO1xuICAgICAgb25CbHVyKCk7XG4gICAgfTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIHJlZj17cmVmfVxuICAgICAgICBkYXRhLWxldHRlcj17bGV0dGVyfSBcbiAgICAgICAgZGF0YS1udW1iZXI9e251bWJlciAhPT0gdW5kZWZpbmVkICYmIG51bWJlciAhPT0gbnVsbCA/IG51bWJlci50b1N0cmluZygpIDogJyd9XG4gICAgICAgIHRhYkluZGV4PXswfVxuICAgICAgICBvbktleURvd249e2hhbmRsZVBDS2V5UHJlc3N9XG4gICAgICAgIG9uQmx1cj17aGFuZGxlQmx1cn1cbiAgICAgICAgb25DbGljaz17aGFuZGxlQ2xpY2t9XG4gICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgd2lkdGg6ICc1MHB4JyxcbiAgICAgICAgICBoZWlnaHQ6ICc1MHB4JyxcbiAgICAgICAgICBib3JkZXI6ICcxcHggc29saWQgYmxhY2snLFxuICAgICAgICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuICAgICAgICAgIGZvbnRTaXplOiAnMjRweCcsXG4gICAgICAgICAgZm9udEZhbWlseTogJ0thZHdhJywgXG4gICAgICAgICAgZm9udFdlaWdodDogNDAwLCBcbiAgICAgICAgICBmb250U3R5bGU6ICdub3JtYWwnLCBcbiAgICAgICAgICB1c2VyU2VsZWN0OiAnbm9uZScsXG4gICAgICAgICAgb3V0bGluZTogJ25vbmUnLFxuICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogaXNGb2N1c2VkID8gJ2xpZ2h0Ymx1ZScgOiBpc0hpZ2hsaWdodGVkID8gJ2xpZ2h0Z3JleScgOiBjb250ZW50ID09PSAnLicgPyAnYmxhY2snIDogJ3doaXRlJ1xuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICB7bnVtYmVyICE9PSBudWxsICYmIChcbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICAgICAgdG9wOiAnMnB4JyxcbiAgICAgICAgICAgICAgbGVmdDogJzJweCcsXG4gICAgICAgICAgICAgIGZvbnRTaXplOiAnMTJweCcsXG4gICAgICAgICAgICAgIGxpbmVIZWlnaHQ6ICcxMnB4JyxcbiAgICAgICAgICAgICAgZm9udEZhbWlseTogJ0thZHdhJyxcbiAgICAgICAgICAgICAgZm9udFdlaWdodDogNDAwLFxuICAgICAgICAgICAgICB1c2VyU2VsZWN0OiAnbm9uZScsXG4gICAgICAgICAgICB9fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtudW1iZXJ9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICl9XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLFxuICAgICAgICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gICAgICAgICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgICAgICAgaGVpZ2h0OiAnMTAwJScsXG4gICAgICAgICAgICBmb250RmFtaWx5OiAnS2Fkd2EnLFxuICAgICAgICAgICAgZm9udFdlaWdodDogNDAwXG4gICAgICAgICAgfX1cbiAgICAgICAgPlxuICAgICAgICAgIHtjb250ZW50fVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbik7XG5cbmV4cG9ydCBkZWZhdWx0IFNxdWFyZTsiXSwibmFtZXMiOlsiUmVhY3QiLCJ1c2VTdGF0ZSIsInVzZUVmZmVjdCIsImZvcndhcmRSZWYiLCJTcXVhcmUiLCJyZWYiLCJvbktleVByZXNzIiwib25DbGljayIsIm9uQmFja3NwYWNlIiwib25CbHVyIiwiaXNGb2N1c2VkIiwiaXNIaWdobGlnaHRlZCIsImVkaXRvck1vZGUiLCJudW1iZXIiLCJpbml0aWFsQ29udGVudHMiLCJleHRlcm5hbExldHRlciIsImxldHRlciIsInNldExldHRlciIsImNvbnRlbnQiLCJzZXRDb250ZW50IiwiaGFuZGxlS2V5UHJlc3MiLCJoYW5kbGVQQ0tleVByZXNzIiwiZXZlbnQiLCJrZXkiLCJjb25zb2xlIiwibG9nIiwibGVuZ3RoIiwibWF0Y2giLCJ0b1VwcGVyQ2FzZSIsImhhbmRsZUNsaWNrIiwiaGFuZGxlQmx1ciIsImRpdiIsImRhdGEtbGV0dGVyIiwiZGF0YS1udW1iZXIiLCJ1bmRlZmluZWQiLCJ0b1N0cmluZyIsInRhYkluZGV4Iiwib25LZXlEb3duIiwic3R5bGUiLCJ3aWR0aCIsImhlaWdodCIsImJvcmRlciIsInBvc2l0aW9uIiwiZm9udFNpemUiLCJmb250RmFtaWx5IiwiZm9udFdlaWdodCIsImZvbnRTdHlsZSIsInVzZXJTZWxlY3QiLCJvdXRsaW5lIiwiYmFja2dyb3VuZENvbG9yIiwidG9wIiwibGVmdCIsImxpbmVIZWlnaHQiLCJkaXNwbGF5IiwianVzdGlmeUNvbnRlbnQiLCJhbGlnbkl0ZW1zIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./app/shared/board/square.tsx\n"));

/***/ })

});