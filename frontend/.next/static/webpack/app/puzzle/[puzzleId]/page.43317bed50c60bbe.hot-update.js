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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n\nvar _s = $RefreshSig$();\n\nconst Square = /*#__PURE__*/ _s((0,react__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(_c = _s((param, ref)=>{\n    let { onKeyPress, onClick, onBackspace, onBlur, isFocused, isHighlighted, editorMode, number, initialContents, externalLetter } = param;\n    _s();\n    const [letter, setLetter] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(initialContents);\n    const [content, setContent] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(initialContents);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        setContent(letter);\n    }, [\n        letter\n    ]);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        if (isFocused) {\n            handleKeyPress(externalLetter);\n        }\n    }, [\n        externalLetter\n    ]);\n    const handlePCKeyPress = (event)=>{\n        const key = event.key;\n        handleKeyPress(key);\n    };\n    const handleKeyPress = (key)=>{\n        console.log(\"CONTENTS FOR SQUARE\" + initialContents);\n        if (editorMode || key !== \".\" && letter !== \".\") {\n            if (key.length === 1 && key.match(/[a-zA-Z\\.]/)) {\n                setLetter(key.toUpperCase());\n            } else if (key === \"Backspace\") {\n                setLetter(\"\");\n                onBackspace(); // Notify Board to move focus backward\n            }\n            onKeyPress(key);\n        }\n    };\n    const handleClick = ()=>{\n        if (editorMode || content !== \".\") {\n            onClick(); // Call onClick when the square is clicked\n        }\n    };\n    const handleBlur = ()=>{\n        console.log(\"SQUARE BLURRED!\");\n        onBlur();\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        ref: ref,\n        \"data-letter\": letter,\n        \"data-number\": number !== undefined && number !== null ? number.toString() : \"\",\n        tabIndex: 0,\n        onKeyDown: handlePCKeyPress,\n        onClick: handleClick,\n        style: {\n            width: \"50px\",\n            height: \"50px\",\n            border: \"1px solid black\",\n            position: \"relative\",\n            fontSize: \"24px\",\n            fontFamily: \"Kadwa\",\n            fontWeight: 400,\n            fontStyle: \"normal\",\n            userSelect: \"none\",\n            outline: \"none\",\n            backgroundColor: isFocused ? \"lightblue\" : isHighlighted ? \"lightgrey\" : content === \".\" ? \"black\" : \"white\"\n        },\n        children: [\n            number !== null && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                style: {\n                    position: \"absolute\",\n                    top: \"2px\",\n                    left: \"2px\",\n                    fontSize: \"12px\",\n                    lineHeight: \"12px\",\n                    fontFamily: \"Kadwa\",\n                    fontWeight: 400,\n                    userSelect: \"none\"\n                },\n                children: number\n            }, void 0, false, {\n                fileName: \"/Users/evanvonoehsen/Develop/crucible/frontend/app/shared/board/square.tsx\",\n                lineNumber: 83,\n                columnNumber: 11\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                style: {\n                    display: \"flex\",\n                    justifyContent: \"center\",\n                    alignItems: \"center\",\n                    width: \"100%\",\n                    height: \"100%\",\n                    fontFamily: \"Kadwa\",\n                    fontWeight: 400\n                },\n                children: content\n            }, void 0, false, {\n                fileName: \"/Users/evanvonoehsen/Develop/crucible/frontend/app/shared/board/square.tsx\",\n                lineNumber: 98,\n                columnNumber: 9\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/evanvonoehsen/Develop/crucible/frontend/app/shared/board/square.tsx\",\n        lineNumber: 61,\n        columnNumber: 7\n    }, undefined);\n}, \"Id7OC9OyoW3Bnnzh/qpUUAXYzq8=\")), \"Id7OC9OyoW3Bnnzh/qpUUAXYzq8=\");\n_c1 = Square;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Square);\nvar _c, _c1;\n$RefreshReg$(_c, \"Square$forwardRef\");\n$RefreshReg$(_c1, \"Square\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2FwcC9zaGFyZWQvYm9hcmQvc3F1YXJlLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBK0Q7QUFlL0QsTUFBTUksdUJBQVNELEdBQUFBLGlEQUFVQSxTQUN2QixRQUE4SEU7UUFBN0gsRUFBRUMsVUFBVSxFQUFFQyxPQUFPLEVBQUVDLFdBQVcsRUFBRUMsTUFBTSxFQUFFQyxTQUFTLEVBQUVDLGFBQWEsRUFBRUMsVUFBVSxFQUFFQyxNQUFNLEVBQUVDLGVBQWUsRUFBRUMsY0FBYyxFQUFFOztJQUMxSCxNQUFNLENBQUNDLFFBQVFDLFVBQVUsR0FBR2hCLCtDQUFRQSxDQUFDYTtJQUNyQyxNQUFNLENBQUNJLFNBQVNDLFdBQVcsR0FBR2xCLCtDQUFRQSxDQUFDYTtJQUV2Q1osZ0RBQVNBLENBQUM7UUFDUmlCLFdBQVdIO0lBQ2IsR0FBRztRQUFDQTtLQUFPO0lBRVhkLGdEQUFTQSxDQUFDO1FBQ1IsSUFBR1EsV0FBVztZQUNaVSxlQUFlTDtRQUNqQjtJQUNGLEdBQUc7UUFBQ0E7S0FBZTtJQUVuQixNQUFNTSxtQkFBbUIsQ0FBQ0M7UUFDeEIsTUFBTUMsTUFBTUQsTUFBTUMsR0FBRztRQUNyQkgsZUFBZUc7SUFDakI7SUFFQSxNQUFNSCxpQkFBaUIsQ0FBQ0c7UUFDdEJDLFFBQVFDLEdBQUcsQ0FBQyx3QkFBd0JYO1FBQ3BDLElBQUlGLGNBQWVXLFFBQVEsT0FBT1AsV0FBVyxLQUFNO1lBQ2pELElBQUlPLElBQUlHLE1BQU0sS0FBSyxLQUFLSCxJQUFJSSxLQUFLLENBQUMsZUFBZTtnQkFDL0NWLFVBQVVNLElBQUlLLFdBQVc7WUFDM0IsT0FBTyxJQUFJTCxRQUFRLGFBQWE7Z0JBQzlCTixVQUFVO2dCQUNWVCxlQUFlLHNDQUFzQztZQUN2RDtZQUNBRixXQUFXaUI7UUFDYjtJQUNGO0lBRUEsTUFBTU0sY0FBYztRQUNsQixJQUFJakIsY0FBY00sWUFBWSxLQUFLO1lBQ2pDWCxXQUFXLDBDQUEwQztRQUN2RDtJQUNGO0lBRUEsTUFBTXVCLGFBQWE7UUFDakJOLFFBQVFDLEdBQUcsQ0FBQztRQUNaaEI7SUFDRjtJQUVBLHFCQUNFLDhEQUFDc0I7UUFDQzFCLEtBQUtBO1FBQ0wyQixlQUFhaEI7UUFDYmlCLGVBQWFwQixXQUFXcUIsYUFBYXJCLFdBQVcsT0FBT0EsT0FBT3NCLFFBQVEsS0FBSztRQUMzRUMsVUFBVTtRQUNWQyxXQUFXaEI7UUFDWGQsU0FBU3NCO1FBQ1RTLE9BQU87WUFDTEMsT0FBTztZQUNQQyxRQUFRO1lBQ1JDLFFBQVE7WUFDUkMsVUFBVTtZQUNWQyxVQUFVO1lBQ1ZDLFlBQVk7WUFDWkMsWUFBWTtZQUNaQyxXQUFXO1lBQ1hDLFlBQVk7WUFDWkMsU0FBUztZQUNUQyxpQkFBaUJ2QyxZQUFZLGNBQWNDLGdCQUFnQixjQUFjTyxZQUFZLE1BQU0sVUFBVTtRQUN2Rzs7WUFFQ0wsV0FBVyxzQkFDViw4REFBQ2tCO2dCQUNDTyxPQUFPO29CQUNMSSxVQUFVO29CQUNWUSxLQUFLO29CQUNMQyxNQUFNO29CQUNOUixVQUFVO29CQUNWUyxZQUFZO29CQUNaUixZQUFZO29CQUNaQyxZQUFZO29CQUNaRSxZQUFZO2dCQUNkOzBCQUVDbEM7Ozs7OzswQkFHTCw4REFBQ2tCO2dCQUNDTyxPQUFPO29CQUNMZSxTQUFTO29CQUNUQyxnQkFBZ0I7b0JBQ2hCQyxZQUFZO29CQUNaaEIsT0FBTztvQkFDUEMsUUFBUTtvQkFDUkksWUFBWTtvQkFDWkMsWUFBWTtnQkFDZDswQkFFQzNCOzs7Ozs7Ozs7Ozs7QUFJVDs7QUFHRiwrREFBZWQsTUFBTUEsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9hcHAvc2hhcmVkL2JvYXJkL3NxdWFyZS50c3g/NmNmYiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCwgZm9yd2FyZFJlZiB9IGZyb20gJ3JlYWN0JztcblxuaW50ZXJmYWNlIFNxdWFyZVByb3BzIHtcbiAgb25LZXlQcmVzczogKGtleTogU3RyaW5nKSA9PiB2b2lkO1xuICBvbkNsaWNrOiAoKSA9PiB2b2lkO1xuICBvbkJhY2tzcGFjZTogKCkgPT4gdm9pZDtcbiAgb25CbHVyOiAoKSA9PiB2b2lkO1xuICBpc0ZvY3VzZWQ6IGJvb2xlYW47XG4gIGlzSGlnaGxpZ2h0ZWQ6IGJvb2xlYW47XG4gIGVkaXRvck1vZGU6IGJvb2xlYW47XG4gIG51bWJlcjogbnVtYmVyIHwgbnVsbDtcbiAgaW5pdGlhbENvbnRlbnRzOiBzdHJpbmc7XG4gIGV4dGVybmFsTGV0dGVyPzogc3RyaW5nOyAvLyBOZXcgcHJvcCBmb3IgZXh0ZXJuYWwgY29udHJvbCBvZiBsZXR0ZXJcbn1cblxuY29uc3QgU3F1YXJlID0gZm9yd2FyZFJlZjxIVE1MRGl2RWxlbWVudCwgU3F1YXJlUHJvcHM+KFxuICAoeyBvbktleVByZXNzLCBvbkNsaWNrLCBvbkJhY2tzcGFjZSwgb25CbHVyLCBpc0ZvY3VzZWQsIGlzSGlnaGxpZ2h0ZWQsIGVkaXRvck1vZGUsIG51bWJlciwgaW5pdGlhbENvbnRlbnRzLCBleHRlcm5hbExldHRlciB9LCByZWYpID0+IHtcbiAgICBjb25zdCBbbGV0dGVyLCBzZXRMZXR0ZXJdID0gdXNlU3RhdGUoaW5pdGlhbENvbnRlbnRzKTtcbiAgICBjb25zdCBbY29udGVudCwgc2V0Q29udGVudF0gPSB1c2VTdGF0ZShpbml0aWFsQ29udGVudHMpO1xuXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgIHNldENvbnRlbnQobGV0dGVyKVxuICAgIH0sIFtsZXR0ZXJdKTtcblxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICBpZihpc0ZvY3VzZWQpIHtcbiAgICAgICAgaGFuZGxlS2V5UHJlc3MoZXh0ZXJuYWxMZXR0ZXIpXG4gICAgICB9XG4gICAgfSwgW2V4dGVybmFsTGV0dGVyXSk7XG5cbiAgICBjb25zdCBoYW5kbGVQQ0tleVByZXNzID0gKGV2ZW50OiBSZWFjdC5LZXlib2FyZEV2ZW50PEhUTUxEaXZFbGVtZW50PikgPT4ge1xuICAgICAgY29uc3Qga2V5ID0gZXZlbnQua2V5O1xuICAgICAgaGFuZGxlS2V5UHJlc3Moa2V5KVxuICAgIH07XG5cbiAgICBjb25zdCBoYW5kbGVLZXlQcmVzcyA9IChrZXk6IFN0cmluZykgPT4ge1xuICAgICAgY29uc29sZS5sb2coXCJDT05URU5UUyBGT1IgU1FVQVJFXCIgKyBpbml0aWFsQ29udGVudHMpXG4gICAgICBpZiAoZWRpdG9yTW9kZSB8fCAoa2V5ICE9PSAnLicgJiYgbGV0dGVyICE9PSAnLicpKSB7XG4gICAgICAgIGlmIChrZXkubGVuZ3RoID09PSAxICYmIGtleS5tYXRjaCgvW2EtekEtWlxcLl0vKSkge1xuICAgICAgICAgIHNldExldHRlcihrZXkudG9VcHBlckNhc2UoKSk7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSAnQmFja3NwYWNlJykge1xuICAgICAgICAgIHNldExldHRlcignJyk7XG4gICAgICAgICAgb25CYWNrc3BhY2UoKTsgLy8gTm90aWZ5IEJvYXJkIHRvIG1vdmUgZm9jdXMgYmFja3dhcmRcbiAgICAgICAgfVxuICAgICAgICBvbktleVByZXNzKGtleSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IGhhbmRsZUNsaWNrID0gKCkgPT4ge1xuICAgICAgaWYgKGVkaXRvck1vZGUgfHwgY29udGVudCAhPT0gJy4nKSB7XG4gICAgICAgIG9uQ2xpY2soKTsgLy8gQ2FsbCBvbkNsaWNrIHdoZW4gdGhlIHNxdWFyZSBpcyBjbGlja2VkXG4gICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IGhhbmRsZUJsdXIgPSAoKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhcIlNRVUFSRSBCTFVSUkVEIVwiKTtcbiAgICAgIG9uQmx1cigpO1xuICAgIH07XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgZGF0YS1sZXR0ZXI9e2xldHRlcn0gXG4gICAgICAgIGRhdGEtbnVtYmVyPXtudW1iZXIgIT09IHVuZGVmaW5lZCAmJiBudW1iZXIgIT09IG51bGwgPyBudW1iZXIudG9TdHJpbmcoKSA6ICcnfVxuICAgICAgICB0YWJJbmRleD17MH1cbiAgICAgICAgb25LZXlEb3duPXtoYW5kbGVQQ0tleVByZXNzfVxuICAgICAgICBvbkNsaWNrPXtoYW5kbGVDbGlja31cbiAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICB3aWR0aDogJzUwcHgnLFxuICAgICAgICAgIGhlaWdodDogJzUwcHgnLFxuICAgICAgICAgIGJvcmRlcjogJzFweCBzb2xpZCBibGFjaycsXG4gICAgICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZScsXG4gICAgICAgICAgZm9udFNpemU6ICcyNHB4JyxcbiAgICAgICAgICBmb250RmFtaWx5OiAnS2Fkd2EnLCBcbiAgICAgICAgICBmb250V2VpZ2h0OiA0MDAsIFxuICAgICAgICAgIGZvbnRTdHlsZTogJ25vcm1hbCcsIFxuICAgICAgICAgIHVzZXJTZWxlY3Q6ICdub25lJyxcbiAgICAgICAgICBvdXRsaW5lOiAnbm9uZScsXG4gICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBpc0ZvY3VzZWQgPyAnbGlnaHRibHVlJyA6IGlzSGlnaGxpZ2h0ZWQgPyAnbGlnaHRncmV5JyA6IGNvbnRlbnQgPT09ICcuJyA/ICdibGFjaycgOiAnd2hpdGUnXG4gICAgICAgIH19XG4gICAgICA+XG4gICAgICAgIHtudW1iZXIgIT09IG51bGwgJiYgKFxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgICAgICB0b3A6ICcycHgnLFxuICAgICAgICAgICAgICBsZWZ0OiAnMnB4JyxcbiAgICAgICAgICAgICAgZm9udFNpemU6ICcxMnB4JyxcbiAgICAgICAgICAgICAgbGluZUhlaWdodDogJzEycHgnLFxuICAgICAgICAgICAgICBmb250RmFtaWx5OiAnS2Fkd2EnLFxuICAgICAgICAgICAgICBmb250V2VpZ2h0OiA0MDAsXG4gICAgICAgICAgICAgIHVzZXJTZWxlY3Q6ICdub25lJyxcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgPlxuICAgICAgICAgICAge251bWJlcn1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cbiAgICAgICAgPGRpdlxuICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsXG4gICAgICAgICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgICAgICAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICAgICAgICBoZWlnaHQ6ICcxMDAlJyxcbiAgICAgICAgICAgIGZvbnRGYW1pbHk6ICdLYWR3YScsXG4gICAgICAgICAgICBmb250V2VpZ2h0OiA0MDBcbiAgICAgICAgICB9fVxuICAgICAgICA+XG4gICAgICAgICAge2NvbnRlbnR9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuKTtcblxuZXhwb3J0IGRlZmF1bHQgU3F1YXJlOyJdLCJuYW1lcyI6WyJSZWFjdCIsInVzZVN0YXRlIiwidXNlRWZmZWN0IiwiZm9yd2FyZFJlZiIsIlNxdWFyZSIsInJlZiIsIm9uS2V5UHJlc3MiLCJvbkNsaWNrIiwib25CYWNrc3BhY2UiLCJvbkJsdXIiLCJpc0ZvY3VzZWQiLCJpc0hpZ2hsaWdodGVkIiwiZWRpdG9yTW9kZSIsIm51bWJlciIsImluaXRpYWxDb250ZW50cyIsImV4dGVybmFsTGV0dGVyIiwibGV0dGVyIiwic2V0TGV0dGVyIiwiY29udGVudCIsInNldENvbnRlbnQiLCJoYW5kbGVLZXlQcmVzcyIsImhhbmRsZVBDS2V5UHJlc3MiLCJldmVudCIsImtleSIsImNvbnNvbGUiLCJsb2ciLCJsZW5ndGgiLCJtYXRjaCIsInRvVXBwZXJDYXNlIiwiaGFuZGxlQ2xpY2siLCJoYW5kbGVCbHVyIiwiZGl2IiwiZGF0YS1sZXR0ZXIiLCJkYXRhLW51bWJlciIsInVuZGVmaW5lZCIsInRvU3RyaW5nIiwidGFiSW5kZXgiLCJvbktleURvd24iLCJzdHlsZSIsIndpZHRoIiwiaGVpZ2h0IiwiYm9yZGVyIiwicG9zaXRpb24iLCJmb250U2l6ZSIsImZvbnRGYW1pbHkiLCJmb250V2VpZ2h0IiwiZm9udFN0eWxlIiwidXNlclNlbGVjdCIsIm91dGxpbmUiLCJiYWNrZ3JvdW5kQ29sb3IiLCJ0b3AiLCJsZWZ0IiwibGluZUhlaWdodCIsImRpc3BsYXkiLCJqdXN0aWZ5Q29udGVudCIsImFsaWduSXRlbXMiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./app/shared/board/square.tsx\n"));

/***/ })

});