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

/***/ "(app-pages-browser)/./app/puzzle/[puzzleId]/page.tsx":
/*!****************************************!*\
  !*** ./app/puzzle/[puzzleId]/page.tsx ***!
  \****************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Puzzle; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/navigation */ \"(app-pages-browser)/./node_modules/next/dist/api/navigation.js\");\n/* harmony import */ var _shared_components_author__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../shared/components/author */ \"(app-pages-browser)/./shared/components/author.tsx\");\n/* harmony import */ var _shared_components_title__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../shared/components/title */ \"(app-pages-browser)/./shared/components/title.tsx\");\n/* harmony import */ var _shared_board_board__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../shared/board/board */ \"(app-pages-browser)/./app/shared/board/board.tsx\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! next/link */ \"(app-pages-browser)/./node_modules/next/dist/api/link.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! axios */ \"(app-pages-browser)/./node_modules/axios/lib/axios.js\");\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../config */ \"(app-pages-browser)/./app/config.tsx\");\n/* harmony import */ var _app_mocks_server__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../app/mocks/server */ \"(app-pages-browser)/./app/mocks/server.tsx\");\n/* harmony import */ var react_simple_keyboard__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-simple-keyboard */ \"(app-pages-browser)/./node_modules/react-simple-keyboard/build/index.js\");\n/* harmony import */ var react_simple_keyboard__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_simple_keyboard__WEBPACK_IMPORTED_MODULE_9__);\n/* harmony import */ var react_simple_keyboard_build_css_index_css__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-simple-keyboard/build/css/index.css */ \"(app-pages-browser)/./node_modules/react-simple-keyboard/build/css/index.css\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\n\n\n\n\n\n\n\nfunction Puzzle() {\n    _s();\n    (0,_app_mocks_server__WEBPACK_IMPORTED_MODULE_8__.makeServer)();\n    const editorMode = false;\n    const [puzzle, setPuzzle] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [boardContents, setBoardContents] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);\n    const searchParams = (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.useSearchParams)();\n    const puzzleId = searchParams.get(\"puzzleId\");\n    const [showPopup, setShowPopup] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const [popupMessage, setPopupMessage] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    const [isIOS, setIsIOS] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const [currentLetter, setCurrentLetter] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const fetchPuzzle = async ()=>{\n            try {\n                const response = await axios__WEBPACK_IMPORTED_MODULE_11__[\"default\"].get(\"\".concat(_config__WEBPACK_IMPORTED_MODULE_7__.GET_PUZZLE, \"/\").concat(puzzleId)); // Replace '1' with the actual puzzleId\n                setPuzzle(response.data);\n                console.log(response.data);\n            } catch (error) {\n                console.error(\"Error fetching puzzle:\", error);\n            }\n        };\n        fetchPuzzle();\n    }, []);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const userAgent = window.navigator.userAgent;\n        setIsIOS(/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream);\n    }, []);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        console.log(\"PUZZLE: \" + JSON.stringify(puzzle));\n    }, [\n        puzzle\n    ]);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        console.log(\"BOARD CONTENTS: \" + JSON.stringify(boardContents));\n    }, [\n        boardContents\n    ]);\n    const handleSubmit = async ()=>{\n        console.log(\"SUBMITTING...\");\n        try {\n            const response = await axios__WEBPACK_IMPORTED_MODULE_11__[\"default\"].post(\"\".concat(_config__WEBPACK_IMPORTED_MODULE_7__.VALIDATE_PUZZLE, \"/\").concat(puzzleId), {\n                solution: boardContents\n            });\n            if (response.data.isCorrect) {\n                setPopupMessage(\"Congrats! You solved the puzzle!\");\n            } else {\n                setPopupMessage(\"Oof, incorrect. Try again.\");\n            }\n            setShowPopup(true);\n        } catch (error) {\n            console.error(\"Error submitting puzzle:\", error);\n        }\n    };\n    if (!puzzle) {\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            children: \"Loading...\"\n        }, void 0, false, {\n            fileName: \"/Users/evanvonoehsen/Develop/crucible/frontend/app/puzzle/[puzzleId]/page.tsx\",\n            lineNumber: 73,\n            columnNumber: 12\n        }, this);\n    }\n    // const onChange = (input: string) => {\n    //   if (input.length > 0) {\n    //     console.log(\"NEW ONCHANGE FROM CUSTOM KEYBOARD: \" + input)\n    //     setCurrentLetter(input.slice(-1)); // Takes the last character of the string\n    //   }\n    // };\n    const onKeyPress = (input)=>{\n        if (input.length > 0) {\n            console.log(\"NEW ONKEYPRESS FROM CUSTOM KEYBOARD: \" + input);\n            setCurrentLetter(input.slice(-1)); // Takes the last character of the string\n        }\n    };\n    const onKeyRelease = ()=>{\n        setCurrentLetter(\"KEYBOARDINPUT\");\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_link__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {\n                href: \"/\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                    style: {\n                        fontFamily: \"Kadwa\",\n                        fontWeight: 400,\n                        fontStyle: \"normal\",\n                        fontSize: 20,\n                        marginBottom: 10,\n                        marginLeft: 30,\n                        marginTop: 10\n                    },\n                    children: \"HOME\"\n                }, void 0, false, {\n                    fileName: \"/Users/evanvonoehsen/Develop/crucible/frontend/app/puzzle/[puzzleId]/page.tsx\",\n                    lineNumber: 100,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"/Users/evanvonoehsen/Develop/crucible/frontend/app/puzzle/[puzzleId]/page.tsx\",\n                lineNumber: 99,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                style: {\n                    alignItems: \"center\",\n                    display: \"flex\",\n                    justifyContent: \"center\"\n                },\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_shared_components_title__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n                            editorMode: editorMode,\n                            value: puzzle.title\n                        }, void 0, false, {\n                            fileName: \"/Users/evanvonoehsen/Develop/crucible/frontend/app/puzzle/[puzzleId]/page.tsx\",\n                            lineNumber: 116,\n                            columnNumber: 11\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_shared_components_author__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                            editorMode: editorMode,\n                            value: puzzle.createdBy\n                        }, void 0, false, {\n                            fileName: \"/Users/evanvonoehsen/Develop/crucible/frontend/app/puzzle/[puzzleId]/page.tsx\",\n                            lineNumber: 117,\n                            columnNumber: 11\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            style: {\n                                marginBottom: 30\n                            }\n                        }, void 0, false, {\n                            fileName: \"/Users/evanvonoehsen/Develop/crucible/frontend/app/puzzle/[puzzleId]/page.tsx\",\n                            lineNumber: 118,\n                            columnNumber: 11\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_shared_board_board__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n                            boardWidth: puzzle === null || puzzle === void 0 ? void 0 : puzzle.boardWidth,\n                            boardHeight: puzzle === null || puzzle === void 0 ? void 0 : puzzle.boardHeight,\n                            editorMode: editorMode,\n                            initialStructure: puzzle === null || puzzle === void 0 ? void 0 : puzzle.initialStructure,\n                            initialHints: puzzle === null || puzzle === void 0 ? void 0 : puzzle.hints,\n                            onBoardContentChange: setBoardContents,\n                            externalLetter: currentLetter\n                        }, void 0, false, {\n                            fileName: \"/Users/evanvonoehsen/Develop/crucible/frontend/app/puzzle/[puzzleId]/page.tsx\",\n                            lineNumber: 119,\n                            columnNumber: 11\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            children:  true ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((react_simple_keyboard__WEBPACK_IMPORTED_MODULE_9___default()), {\n                                onKeyPress: onKeyPress,\n                                onKeyRelease: onKeyRelease,\n                                layout: {\n                                    default: [\n                                        \"Q W E R T Y U I O P\",\n                                        \"A S D F G H J K L\",\n                                        \"Z X C V B N M {bksp}\"\n                                    ]\n                                }\n                            }, void 0, false, {\n                                fileName: \"/Users/evanvonoehsen/Develop/crucible/frontend/app/puzzle/[puzzleId]/page.tsx\",\n                                lineNumber: 130,\n                                columnNumber: 19\n                            }, this) : /*#__PURE__*/ 0\n                        }, void 0, false, {\n                            fileName: \"/Users/evanvonoehsen/Develop/crucible/frontend/app/puzzle/[puzzleId]/page.tsx\",\n                            lineNumber: 128,\n                            columnNumber: 15\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                            onClick: handleSubmit,\n                            children: \"Submit\"\n                        }, void 0, false, {\n                            fileName: \"/Users/evanvonoehsen/Develop/crucible/frontend/app/puzzle/[puzzleId]/page.tsx\",\n                            lineNumber: 144,\n                            columnNumber: 11\n                        }, this),\n                        showPopup && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            style: {\n                                position: \"fixed\",\n                                top: \"50%\",\n                                left: \"50%\",\n                                transform: \"translate(-50%, -50%)\",\n                                backgroundColor: \"#fff\",\n                                padding: \"2rem\",\n                                boxShadow: \"0 0 10px rgba(0, 0, 0, 0.5)\",\n                                zIndex: 1000\n                            },\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h2\", {\n                                    children: popupMessage\n                                }, void 0, false, {\n                                    fileName: \"/Users/evanvonoehsen/Develop/crucible/frontend/app/puzzle/[puzzleId]/page.tsx\",\n                                    lineNumber: 158,\n                                    columnNumber: 9\n                                }, this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                    onClick: ()=>setShowPopup(false),\n                                    style: {\n                                        marginTop: \"1rem\",\n                                        backgroundColor: \"#4CAF50\",\n                                        color: \"white\",\n                                        padding: \"0.5rem 1rem\",\n                                        border: \"none\",\n                                        borderRadius: \"4px\",\n                                        cursor: \"pointer\"\n                                    },\n                                    children: \"OK\"\n                                }, void 0, false, {\n                                    fileName: \"/Users/evanvonoehsen/Develop/crucible/frontend/app/puzzle/[puzzleId]/page.tsx\",\n                                    lineNumber: 159,\n                                    columnNumber: 9\n                                }, this)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"/Users/evanvonoehsen/Develop/crucible/frontend/app/puzzle/[puzzleId]/page.tsx\",\n                            lineNumber: 146,\n                            columnNumber: 7\n                        }, this)\n                    ]\n                }, void 0, true, {\n                    fileName: \"/Users/evanvonoehsen/Develop/crucible/frontend/app/puzzle/[puzzleId]/page.tsx\",\n                    lineNumber: 115,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"/Users/evanvonoehsen/Develop/crucible/frontend/app/puzzle/[puzzleId]/page.tsx\",\n                lineNumber: 110,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/evanvonoehsen/Develop/crucible/frontend/app/puzzle/[puzzleId]/page.tsx\",\n        lineNumber: 98,\n        columnNumber: 5\n    }, this);\n}\n_s(Puzzle, \"ADODsalnBtwqQy5mCSZ3b0F40V4=\", false, function() {\n    return [\n        next_navigation__WEBPACK_IMPORTED_MODULE_2__.useSearchParams\n    ];\n});\n_c = Puzzle;\nvar _c;\n$RefreshReg$(_c, \"Puzzle\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2FwcC9wdXp6bGUvW3B1enpsZUlkXS9wYWdlLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUUyRDtBQUNJO0FBQ1I7QUFDRjtBQUNSO0FBQ2hCO0FBQ0g7QUFDYTtBQUNnQjtBQUNWO0FBQ007QUFJcEMsU0FBU1k7O0lBQ3RCRiw2REFBVUE7SUFDVixNQUFNRyxhQUFhO0lBQ25CLE1BQU0sQ0FBQ0MsUUFBUUMsVUFBVSxHQUFHZCwrQ0FBUUEsQ0FBYTtJQUNqRCxNQUFNLENBQUNlLGVBQWVDLGlCQUFpQixHQUFHaEIsK0NBQVFBLENBQVcsRUFBRTtJQUMvRCxNQUFNaUIsZUFBZWYsZ0VBQWVBO0lBQ3BDLE1BQU1nQixXQUFXRCxhQUFhRSxHQUFHLENBQUM7SUFDbEMsTUFBTSxDQUFDQyxXQUFXQyxhQUFhLEdBQUdyQiwrQ0FBUUEsQ0FBQztJQUMzQyxNQUFNLENBQUNzQixjQUFjQyxnQkFBZ0IsR0FBR3ZCLCtDQUFRQSxDQUFDO0lBQ2pELE1BQU0sQ0FBQ3dCLE9BQU9DLFNBQVMsR0FBR3pCLCtDQUFRQSxDQUFDO0lBQ25DLE1BQU0sQ0FBQzBCLGVBQWVDLGlCQUFpQixHQUFHM0IsK0NBQVFBLENBQUM7SUFFbkRDLGdEQUFTQSxDQUFDO1FBQ1IsTUFBTTJCLGNBQWM7WUFDbEIsSUFBSTtnQkFDRixNQUFNQyxXQUFXLE1BQU10Qiw4Q0FBS0EsQ0FBQ1ksR0FBRyxDQUFDLEdBQXdCRCxPQUFyQlYsK0NBQWlCLEVBQUMsS0FBWSxPQUFUVSxZQUFhLHVDQUF1QztnQkFDN0dKLFVBQVVlLFNBQVNFLElBQUk7Z0JBQ3ZCQyxRQUFRQyxHQUFHLENBQUNKLFNBQVNFLElBQUk7WUFDM0IsRUFBRSxPQUFPRyxPQUFPO2dCQUNkRixRQUFRRSxLQUFLLENBQUMsMEJBQTBCQTtZQUMxQztRQUNGO1FBRUFOO0lBQ0YsR0FBRyxFQUFFO0lBRUwzQixnREFBU0EsQ0FBQztRQUNSLE1BQU1rQyxZQUFZQyxPQUFPQyxTQUFT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Q3RCLDJCQUNDLDhEQUFDMkI7NEJBQ0NRLE9BQU87Z0NBQ0x5QixVQUFVO2dDQUNWQyxLQUFLO2dDQUNMQyxNQUFNO2dDQUNOQyxXQUFXO2dDQUNYQyxpQkFBaUI7Z0NBQ2pCQyxTQUFTO2dDQUNUQyxXQUFXO2dDQUNYQyxRQUFROzRCQUNWOzs4Q0FFQSw4REFBQ0M7OENBQUlsRTs7Ozs7OzhDQUNMLDhEQUFDZ0M7b0NBQ0N5QixTQUFTLElBQU0xRCxhQUFhO29DQUM1QmtDLE9BQU87d0NBQ0xPLFdBQVc7d0NBQ1hzQixpQkFBaUI7d0NBQ2pCSyxPQUFPO3dDQUNQSixTQUFTO3dDQUNUSyxRQUFRO3dDQUNSQyxjQUFjO3dDQUNkQyxRQUFRO29DQUNWOzhDQUNEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQVNUO0dBbEt3QmpGOztRQUtEVCw0REFBZUE7OztLQUxkUyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9hcHAvcHV6emxlL1twdXp6bGVJZF0vcGFnZS50c3g/NDA5ZCJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGNsaWVudCdcblxuaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VSZWYsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZVBhdGhuYW1lLCB1c2VTZWFyY2hQYXJhbXMgfSBmcm9tICduZXh0L25hdmlnYXRpb24nO1xuaW1wb3J0IEF1dGhvciBmcm9tICcuLi8uLi8uLi9zaGFyZWQvY29tcG9uZW50cy9hdXRob3InO1xuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL3NoYXJlZC9jb21wb25lbnRzL3RpdGxlJztcbmltcG9ydCBCb2FyZCBmcm9tICcuLi8uLi9zaGFyZWQvYm9hcmQvYm9hcmQnO1xuaW1wb3J0IExpbmsgZnJvbSAnbmV4dC9saW5rJztcbmltcG9ydCBheGlvcyBmcm9tICdheGlvcyc7XG5pbXBvcnQgKiBhcyBjb25zdHMgZnJvbSAnLi4vLi4vY29uZmlnJztcbmltcG9ydCB7IG1ha2VTZXJ2ZXIgfSBmcm9tICcuLi8uLi8uLi9hcHAvbW9ja3Mvc2VydmVyJztcbmltcG9ydCBLZXlib2FyZCBmcm9tICdyZWFjdC1zaW1wbGUta2V5Ym9hcmQnO1xuaW1wb3J0ICdyZWFjdC1zaW1wbGUta2V5Ym9hcmQvYnVpbGQvY3NzL2luZGV4LmNzcyc7XG5cblxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBQdXp6bGUoKSB7XG4gIG1ha2VTZXJ2ZXIoKTtcbiAgY29uc3QgZWRpdG9yTW9kZSA9IGZhbHNlO1xuICBjb25zdCBbcHV6emxlLCBzZXRQdXp6bGVdID0gdXNlU3RhdGU8YW55IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtib2FyZENvbnRlbnRzLCBzZXRCb2FyZENvbnRlbnRzXSA9IHVzZVN0YXRlPHN0cmluZ1tdPihbXSk7XG4gIGNvbnN0IHNlYXJjaFBhcmFtcyA9IHVzZVNlYXJjaFBhcmFtcygpO1xuICBjb25zdCBwdXp6bGVJZCA9IHNlYXJjaFBhcmFtcy5nZXQoJ3B1enpsZUlkJyk7XG4gIGNvbnN0IFtzaG93UG9wdXAsIHNldFNob3dQb3B1cF0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtwb3B1cE1lc3NhZ2UsIHNldFBvcHVwTWVzc2FnZV0gPSB1c2VTdGF0ZSgnJyk7XG4gIGNvbnN0IFtpc0lPUywgc2V0SXNJT1NdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbY3VycmVudExldHRlciwgc2V0Q3VycmVudExldHRlcl0gPSB1c2VTdGF0ZSgnJyk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBmZXRjaFB1enpsZSA9IGFzeW5jICgpID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXhpb3MuZ2V0KGAke2NvbnN0cy5HRVRfUFVaWkxFfS8ke3B1enpsZUlkfWApOyAvLyBSZXBsYWNlICcxJyB3aXRoIHRoZSBhY3R1YWwgcHV6emxlSWRcbiAgICAgICAgc2V0UHV6emxlKHJlc3BvbnNlLmRhdGEpO1xuICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZS5kYXRhKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGZldGNoaW5nIHB1enpsZTonLCBlcnJvcik7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGZldGNoUHV6emxlKCk7XG4gIH0sIFtdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IHVzZXJBZ2VudCA9IHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50O1xuICAgIHNldElzSU9TKC9pUGFkfGlQaG9uZXxpUG9kLy50ZXN0KHVzZXJBZ2VudCkgJiYgISh3aW5kb3cgYXMgYW55KS5NU1N0cmVhbSk7XG4gIH0sIFtdKTtcbiAgXG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zb2xlLmxvZyhcIlBVWlpMRTogXCIgKyBKU09OLnN0cmluZ2lmeShwdXp6bGUpKVxuICB9LCBbcHV6emxlXSlcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKFwiQk9BUkQgQ09OVEVOVFM6IFwiICsgSlNPTi5zdHJpbmdpZnkoYm9hcmRDb250ZW50cykpXG4gIH0sIFtib2FyZENvbnRlbnRzXSlcblxuICBjb25zdCBoYW5kbGVTdWJtaXQgPSBhc3luYyAoKSA9PiB7XG4gICAgY29uc29sZS5sb2coXCJTVUJNSVRUSU5HLi4uXCIpO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGF4aW9zLnBvc3QoYCR7Y29uc3RzLlZBTElEQVRFX1BVWlpMRX0vJHtwdXp6bGVJZH1gLCB7IHNvbHV0aW9uOiBib2FyZENvbnRlbnRzIH0pO1xuICAgICAgaWYgKHJlc3BvbnNlLmRhdGEuaXNDb3JyZWN0KSB7XG4gICAgICAgIHNldFBvcHVwTWVzc2FnZSgnQ29uZ3JhdHMhIFlvdSBzb2x2ZWQgdGhlIHB1enpsZSEnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNldFBvcHVwTWVzc2FnZSgnT29mLCBpbmNvcnJlY3QuIFRyeSBhZ2Fpbi4nKTtcbiAgICAgIH1cbiAgICAgIHNldFNob3dQb3B1cCh0cnVlKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcignRXJyb3Igc3VibWl0dGluZyBwdXp6bGU6JywgZXJyb3IpO1xuICAgIH1cbiAgfTtcblxuICBpZiAoIXB1enpsZSkge1xuICAgIHJldHVybiA8ZGl2PkxvYWRpbmcuLi48L2Rpdj47XG4gIH1cblxuXG4gIC8vIGNvbnN0IG9uQ2hhbmdlID0gKGlucHV0OiBzdHJpbmcpID0+IHtcbiAgLy8gICBpZiAoaW5wdXQubGVuZ3RoID4gMCkge1xuICAvLyAgICAgY29uc29sZS5sb2coXCJORVcgT05DSEFOR0UgRlJPTSBDVVNUT00gS0VZQk9BUkQ6IFwiICsgaW5wdXQpXG4gIC8vICAgICBzZXRDdXJyZW50TGV0dGVyKGlucHV0LnNsaWNlKC0xKSk7IC8vIFRha2VzIHRoZSBsYXN0IGNoYXJhY3RlciBvZiB0aGUgc3RyaW5nXG4gIC8vICAgfVxuICAvLyB9O1xuICAgIFxuICBjb25zdCBvbktleVByZXNzID0gKGlucHV0OiBzdHJpbmcpID0+IHtcbiAgICBpZiAoaW5wdXQubGVuZ3RoID4gMCkge1xuICAgICAgY29uc29sZS5sb2coXCJORVcgT05LRVlQUkVTUyBGUk9NIENVU1RPTSBLRVlCT0FSRDogXCIgKyBpbnB1dClcbiAgICAgIHNldEN1cnJlbnRMZXR0ZXIoaW5wdXQuc2xpY2UoLTEpKTsgLy8gVGFrZXMgdGhlIGxhc3QgY2hhcmFjdGVyIG9mIHRoZSBzdHJpbmdcbiAgICB9XG4gIH07ICBcblxuICBjb25zdCBvbktleVJlbGVhc2UgPSAoKSA9PiB7XG4gICAgc2V0Q3VycmVudExldHRlcignS0VZQk9BUkRJTlBVVCcpO1xuICB9XG5cblxuXG4gIHJldHVybiAoXG4gICAgPGRpdj5cbiAgICAgIDxMaW5rIGhyZWY9XCIvXCI+XG4gICAgICAgIDxidXR0b24gc3R5bGU9e3tcbiAgICAgICAgICBmb250RmFtaWx5OiAnS2Fkd2EnLFxuICAgICAgICAgIGZvbnRXZWlnaHQ6IDQwMCxcbiAgICAgICAgICBmb250U3R5bGU6ICdub3JtYWwnLFxuICAgICAgICAgIGZvbnRTaXplOiAyMCxcbiAgICAgICAgICBtYXJnaW5Cb3R0b206IDEwLFxuICAgICAgICAgIG1hcmdpbkxlZnQ6IDMwLFxuICAgICAgICAgIG1hcmdpblRvcDogMTBcbiAgICAgICAgfX0+SE9NRTwvYnV0dG9uPlxuICAgICAgPC9MaW5rPlxuICAgICAgPGRpdiBzdHlsZT17e1xuICAgICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgICAgICAgZGlzcGxheTonZmxleCcsXG4gICAgICAgIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcbiAgICAgIH19PlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxUaXRsZSBlZGl0b3JNb2RlPXtlZGl0b3JNb2RlfSB2YWx1ZT17cHV6emxlLnRpdGxlfSAvPlxuICAgICAgICAgIDxBdXRob3IgZWRpdG9yTW9kZT17ZWRpdG9yTW9kZX0gdmFsdWU9e3B1enpsZS5jcmVhdGVkQnl9IC8+XG4gICAgICAgICAgPGRpdiBzdHlsZT17e21hcmdpbkJvdHRvbTogMzB9fT48L2Rpdj5cbiAgICAgICAgICA8Qm9hcmRcbiAgICAgICAgICAgIGJvYXJkV2lkdGg9e3B1enpsZT8uYm9hcmRXaWR0aH1cbiAgICAgICAgICAgIGJvYXJkSGVpZ2h0PXtwdXp6bGU/LmJvYXJkSGVpZ2h0fVxuICAgICAgICAgICAgZWRpdG9yTW9kZT17ZWRpdG9yTW9kZX1cbiAgICAgICAgICAgIGluaXRpYWxTdHJ1Y3R1cmU9e3B1enpsZT8uaW5pdGlhbFN0cnVjdHVyZX1cbiAgICAgICAgICAgIGluaXRpYWxIaW50cz17cHV6emxlPy5oaW50c31cbiAgICAgICAgICAgIG9uQm9hcmRDb250ZW50Q2hhbmdlPXtzZXRCb2FyZENvbnRlbnRzfVxuICAgICAgICAgICAgZXh0ZXJuYWxMZXR0ZXI9e2N1cnJlbnRMZXR0ZXJ9XG4gICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPGRpdj5cbiAgICAgIHt0cnVlID8gKFxuICAgICAgICAgICAgICAgICAgPEtleWJvYXJkXG4gICAgICAgICAgICAgICAgICBvbktleVByZXNzPXtvbktleVByZXNzfVxuICAgICAgICAgICAgICAgICAgb25LZXlSZWxlYXNlPXtvbktleVJlbGVhc2V9XG4gICAgICAgICAgICAgICAgICBsYXlvdXQ9e3tkZWZhdWx0OiBbXG4gICAgICAgICAgICAgICAgICAgICdRIFcgRSBSIFQgWSBVIEkgTyBQJyxcbiAgICAgICAgICAgICAgICAgICAgJ0EgUyBEIEYgRyBIIEogSyBMJyxcbiAgICAgICAgICAgICAgICAgICAgJ1ogWCBDIFYgQiBOIE0ge2Jrc3B9JyxcbiAgICAgICAgICAgICAgICAgICAgXX19XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICkgOiAoXG4gICAgICAgIDxwPm5vdCBzaG93aW5nIGtleWJvYXJkIGJlY2F1c2UgbWFjLjwvcD5cbiAgICAgICl9XG4gICAgPC9kaXY+XG5cbiAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e2hhbmRsZVN1Ym1pdH0+U3VibWl0PC9idXR0b24+XG4gICAge3Nob3dQb3B1cCAmJiAoXG4gICAgICA8ZGl2XG4gICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgcG9zaXRpb246ICdmaXhlZCcsXG4gICAgICAgICAgdG9wOiAnNTAlJyxcbiAgICAgICAgICBsZWZ0OiAnNTAlJyxcbiAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGUoLTUwJSwgLTUwJSknLFxuICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJyNmZmYnLFxuICAgICAgICAgIHBhZGRpbmc6ICcycmVtJyxcbiAgICAgICAgICBib3hTaGFkb3c6ICcwIDAgMTBweCByZ2JhKDAsIDAsIDAsIDAuNSknLFxuICAgICAgICAgIHpJbmRleDogMTAwMCxcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAgPGgyPntwb3B1cE1lc3NhZ2V9PC9oMj5cbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFNob3dQb3B1cChmYWxzZSl9XG4gICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgIG1hcmdpblRvcDogJzFyZW0nLFxuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnIzRDQUY1MCcsXG4gICAgICAgICAgICBjb2xvcjogJ3doaXRlJyxcbiAgICAgICAgICAgIHBhZGRpbmc6ICcwLjVyZW0gMXJlbScsXG4gICAgICAgICAgICBib3JkZXI6ICdub25lJyxcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzRweCcsXG4gICAgICAgICAgICBjdXJzb3I6ICdwb2ludGVyJyxcbiAgICAgICAgICB9fVxuICAgICAgICA+XG4gICAgICAgICAgT0tcbiAgICAgICAgPC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICApfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufSJdLCJuYW1lcyI6WyJSZWFjdCIsInVzZVN0YXRlIiwidXNlRWZmZWN0IiwidXNlU2VhcmNoUGFyYW1zIiwiQXV0aG9yIiwiVGl0bGUiLCJCb2FyZCIsIkxpbmsiLCJheGlvcyIsImNvbnN0cyIsIm1ha2VTZXJ2ZXIiLCJLZXlib2FyZCIsIlB1enpsZSIsImVkaXRvck1vZGUiLCJwdXp6bGUiLCJzZXRQdXp6bGUiLCJib2FyZENvbnRlbnRzIiwic2V0Qm9hcmRDb250ZW50cyIsInNlYXJjaFBhcmFtcyIsInB1enpsZUlkIiwiZ2V0Iiwic2hvd1BvcHVwIiwic2V0U2hvd1BvcHVwIiwicG9wdXBNZXNzYWdlIiwic2V0UG9wdXBNZXNzYWdlIiwiaXNJT1MiLCJzZXRJc0lPUyIsImN1cnJlbnRMZXR0ZXIiLCJzZXRDdXJyZW50TGV0dGVyIiwiZmV0Y2hQdXp6bGUiLCJyZXNwb25zZSIsIkdFVF9QVVpaTEUiLCJkYXRhIiwiY29uc29sZSIsImxvZyIsImVycm9yIiwidXNlckFnZW50Iiwid2luZG93IiwibmF2aWdhdG9yIiwidGVzdCIsIk1TU3RyZWFtIiwiSlNPTiIsInN0cmluZ2lmeSIsImhhbmRsZVN1Ym1pdCIsInBvc3QiLCJWQUxJREFURV9QVVpaTEUiLCJzb2x1dGlvbiIsImlzQ29ycmVjdCIsImRpdiIsIm9uS2V5UHJlc3MiLCJpbnB1dCIsImxlbmd0aCIsInNsaWNlIiwib25LZXlSZWxlYXNlIiwiaHJlZiIsImJ1dHRvbiIsInN0eWxlIiwiZm9udEZhbWlseSIsImZvbnRXZWlnaHQiLCJmb250U3R5bGUiLCJmb250U2l6ZSIsIm1hcmdpbkJvdHRvbSIsIm1hcmdpbkxlZnQiLCJtYXJnaW5Ub3AiLCJhbGlnbkl0ZW1zIiwiZGlzcGxheSIsImp1c3RpZnlDb250ZW50IiwidmFsdWUiLCJ0aXRsZSIsImNyZWF0ZWRCeSIsImJvYXJkV2lkdGgiLCJib2FyZEhlaWdodCIsImluaXRpYWxTdHJ1Y3R1cmUiLCJpbml0aWFsSGludHMiLCJoaW50cyIsIm9uQm9hcmRDb250ZW50Q2hhbmdlIiwiZXh0ZXJuYWxMZXR0ZXIiLCJsYXlvdXQiLCJkZWZhdWx0IiwicCIsIm9uQ2xpY2siLCJwb3NpdGlvbiIsInRvcCIsImxlZnQiLCJ0cmFuc2Zvcm0iLCJiYWNrZ3JvdW5kQ29sb3IiLCJwYWRkaW5nIiwiYm94U2hhZG93IiwiekluZGV4IiwiaDIiLCJjb2xvciIsImJvcmRlciIsImJvcmRlclJhZGl1cyIsImN1cnNvciJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./app/puzzle/[puzzleId]/page.tsx\n"));

/***/ })

});