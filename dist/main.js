/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Game.js":
/*!*********************!*\
  !*** ./src/Game.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Player_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Player.js */ \"./src/Player.js\");\n\n\nconst player = new _Player_js__WEBPACK_IMPORTED_MODULE_0__.Player();\nconst computer = new _Player_js__WEBPACK_IMPORTED_MODULE_0__.Computer();\n\nlet shipPhase = true;\nconst shipLengths = [5, 4, 3, 3, 2];\nlet gameOver = false;\n\nconst result = document.querySelector(\"#result\");\n\nfunction displaySquares(container, user) {\n  for (let i = 0; i < user.gameboard.grid.length; i++) {\n    const row = document.createElement(\"div\");\n    row.classList = \"row\";\n    for (let j = 0; j < user.gameboard.grid[i].length; j++) {\n      const square = document.createElement(\"div\");\n\n      styleSquare(square, user.gameboard.grid[i][j]);\n\n      if (shipPhase) {\n        if (!(user instanceof _Player_js__WEBPACK_IMPORTED_MODULE_0__.Computer)) {\n          placePlayerShips(i, j, square);\n        }\n      } else if (user instanceof _Player_js__WEBPACK_IMPORTED_MODULE_0__.Computer) {\n        square.addEventListener(\"click\", () => {\n          playerMove(i, j);\n        });\n      }\n\n      row.appendChild(square);\n    }\n    container.appendChild(row);\n  }\n}\n\nfunction placePlayerShips(verticalPos, horizontalPos, square) {\n  if (horizontalPos + shipLengths[0] <= player.gameboard.grid.length) {\n    square.addEventListener(\"click\", () => {\n      let position = [];\n      for (let i = 0; i < shipLengths[0]; i++) {\n        position.push([verticalPos, horizontalPos + i]);\n      }\n      if (player.gameboard.placeShip(position)) {\n        shipLengths.shift();\n        clearSquares(playerGameboard);\n        displaySquares(playerGameboard, player);\n        result.textContent = `Place another battleship on the board! It is ${shipLengths[0]} units long.`;\n\n        if (shipLengths.length === 0) {\n          result.textContent = \"Click on the Computer's board to make a move.\";\n          shipPhase = false;\n          placeComputerShips();\n        }\n      }\n    });\n  }\n}\n\nfunction placeComputerShips() {\n  let shipLengths = [5, 4, 3, 3, 2];\n  while (shipLengths.length > 0) {\n    let validSpaces = true;\n    let horizontalPos = Math.floor(\n      Math.random() * (computer.gameboard.grid.length - shipLengths[0])\n    );\n    let verticalPos = Math.floor(\n      Math.random() * computer.gameboard.grid.length\n    );\n\n    for (let i = 0; i < shipLengths[0]; i++) {\n      if (computer.gameboard.grid[verticalPos][horizontalPos + i].hasShip) {\n        validSpaces = false;\n        break;\n      }\n    }\n\n    if (!validSpaces) {\n      continue;\n    } else {\n      let position = [];\n      for (let i = 0; i < shipLengths[0]; i++) {\n        position.push([verticalPos, horizontalPos + i]);\n      }\n      computer.gameboard.placeShip(position);\n      shipLengths.shift();\n    }\n  }\n  clearSquares(computerGameboard);\n  displaySquares(computerGameboard, computer);\n}\n\nfunction playerMove(verticalPos, horizontalPos) {\n  let validMove;\n\n  if (!gameOver) {\n    validMove = player.makeMove(computer, [verticalPos, horizontalPos]);\n    console.log(validMove);\n    clearSquares(computerGameboard);\n    displaySquares(computerGameboard, computer);\n  }\n  checkShips();\n\n  if (!gameOver && validMove) {\n    computer.makeMove(player);\n    clearSquares(playerGameboard);\n    displaySquares(playerGameboard, player);\n    checkShips();\n  }\n}\n\nfunction styleSquare(square, position) {\n  if (position.isHit) {\n    square.classList = \"hit\";\n    square.textContent = \"✕\";\n  }\n  if (position.hasShip) {\n    square.classList += \" filled\";\n  }\n  if (position.isHit && position.hasShip) {\n    square.textContent = \"○\";\n  }\n}\n\nfunction clearSquares(container) {\n  while (container.hasChildNodes()) {\n    container.removeChild(container.firstChild);\n  }\n}\n\nfunction checkShips() {\n  if (computer.gameboard.shipsSunk()) {\n    gameOver = true;\n    result.textContent = \"Enemy ships are all sunk! You won!\";\n  } else if (player.gameboard.shipsSunk()) {\n    gameOver = true;\n    result.textContent = \"Player ships are all sunk! You lost.\";\n  }\n}\n\n// Display the player and computer gameboards.\nconst playerGameboard = document.querySelector(\"#player-gameboard\");\ndisplaySquares(playerGameboard, player);\nconst computerGameboard = document.querySelector(\"#computer-gameboard\");\ndisplaySquares(computerGameboard, computer);\n\n//# sourceURL=webpack://battleship-/./src/Game.js?");

/***/ }),

/***/ "./src/Gameboard.js":
/*!**************************!*\
  !*** ./src/Gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Gameboard)\n/* harmony export */ });\n/* harmony import */ var _Ship_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Ship.js */ \"./src/Ship.js\");\n\n\nclass Gameboard {\n  constructor() {\n    this.grid = this.createGrid();\n    this.ships = [];\n  }\n\n  createGrid() {\n    let grid = [];\n    for (let i = 0; i < 10; i++) {\n      let row = [];\n      for (let j = 0; j < 10; j++) {\n        row.push({ hasShip: false, isHit: false });\n      }\n      grid.push(row);\n    }\n    return grid;\n  }\n\n  isSpaceEmpty(arr) {\n    for (let i = 0; i < arr.length; i++) {\n      const verticalPos = arr[i][0];\n      const horizontaPos = arr[i][1];\n      if (this.grid[verticalPos][horizontaPos].hasShip) {\n        return false;\n      }\n    }\n    return true;\n  }\n\n  fillSpaces(arr) {\n    for (let i = 0; i < arr.length; i++) {\n      const verticalPos = arr[i][0];\n      const horizontalPos = arr[i][1];\n      this.grid[verticalPos][horizontalPos].hasShip = true;\n    }\n  }\n\n  placeShip(position) {\n    if (position.length < 2 || position.length > 5) {\n      throw new Error(\"Illegal ship length.\");\n    }\n    if (this.isSpaceEmpty(position)) {\n      const ship = new _Ship_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](position);\n      this.fillSpaces(position);\n      this.ships.push(ship);\n      return true;\n    } else {\n      alert(\"Those spaces are filled.\");\n      return false;\n    }\n  }\n\n  receiveAttack(verticalPos, horizontaPos) {\n    if (!this.grid[verticalPos][horizontaPos].isHit) {\n      this.grid[verticalPos][horizontaPos].isHit = true;\n\n      if (this.grid[verticalPos][horizontaPos].hasShip) {\n        this.findShip(verticalPos, horizontaPos);\n      }\n      return true;\n    } else {\n      alert(\"That spot has already been attacked.\");\n      return false;\n    }\n  }\n\n  findShip(verticalPos, horizontaPos) {\n    let ship_found = false;\n\n    for (let i = 0; i < this.ships.length; i++) {\n      if (ship_found) {\n        break;\n      }\n      for (let j = 0; j < this.ships[i].position.length; j++) {\n        if (\n          this.ships[i].position[j][0] === verticalPos &&\n          this.ships[i].position[j][1] === horizontaPos\n        ) {\n          this.ships[i].hit();\n          ship_found = true;\n          break;\n        }\n      }\n    }\n  }\n\n  shipsSunk() {\n    for (let i = 0; i < this.ships.length; i++) {\n      if (!this.ships[i].isSunk()) {\n        return false;\n      }\n    }\n    return true;\n  }\n}\n\n//# sourceURL=webpack://battleship-/./src/Gameboard.js?");

/***/ }),

/***/ "./src/Player.js":
/*!***********************!*\
  !*** ./src/Player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Computer: () => (/* binding */ Computer),\n/* harmony export */   Player: () => (/* binding */ Player)\n/* harmony export */ });\n/* harmony import */ var _Gameboard_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Gameboard.js */ \"./src/Gameboard.js\");\n\n\nclass Player {\n  constructor() {\n    this.gameboard = new _Gameboard_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n  }\n\n  makeMove(opponent, position) {\n    return opponent.gameboard.receiveAttack(position[0], position[1]);\n  }\n}\n\nclass Computer extends Player {\n  constructor() {\n    super();\n  }\n\n  makeMove(opponent) {\n    const max = 10;\n    let randomX = Math.floor(Math.random() * max);\n    let randomY = Math.floor(Math.random() * max);\n\n    while (opponent.gameboard.grid[randomX][randomY].isHit) {\n      randomX = Math.floor(Math.random() * max);\n      randomY = Math.floor(Math.random() * max);\n    }\n\n    return opponent.gameboard.receiveAttack(randomX, randomY);\n  }\n}\n\n//# sourceURL=webpack://battleship-/./src/Player.js?");

/***/ }),

/***/ "./src/Ship.js":
/*!*********************!*\
  !*** ./src/Ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Ship)\n/* harmony export */ });\nclass Ship{\n    constructor (position){\n        this.length = position.length\n        this.hits = 0\n        this.sunk = false\n        this.position = position\n    }\n\n    hit = () => {\n        if(!this.sunk){\n            this.hits++\n            this.isSunk()\n        }\n    }\n\n    isSunk = () => {\n        if(!this.sunk){\n            if(this.hits === this.length){\n                this.sunk = true\n            }\n        }\n        return this.sunk\n    }\n}\n\n//# sourceURL=webpack://battleship-/./src/Ship.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/Game.js");
/******/ 	
/******/ })()
;