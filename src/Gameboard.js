import Ship from "./Ship.js";

export default class Gameboard {
  constructor() {
    this.grid = this.createGrid();
    this.ships = [];
  }

  createGrid() {
    let grid = [];
    for (let i = 0; i < 10; i++) {
      let row = [];
      for (let j = 0; j < 10; j++) {
        row.push({ hasShip: false, isHit: false });
      }
      grid.push(row);
    }
    return grid;
  }

  isSpaceEmpty(arr) {
    for (let i = 0; i < arr.length; i++) {
      const verticalPos = arr[i][0];
      const horizontaPos = arr[i][1];
      if (this.grid[verticalPos][horizontaPos].hasShip) {
        return false;
      }
    }
    return true;
  }

  fillSpaces(arr) {
    for (let i = 0; i < arr.length; i++) {
      const verticalPos = arr[i][0];
      const horizontalPos = arr[i][1];
      this.grid[verticalPos][horizontalPos].hasShip = true;
    }
  }

  placeShip(position) {
    if (position.length < 2 || position.length > 5) {
      throw new Error("Illegal ship length.");
    }
    if (this.isSpaceEmpty(position)) {
      const ship = new Ship(position);
      this.fillSpaces(position);
      this.ships.push(ship);
      return true;
    } else {
      alert("Those spaces are filled.");
      return false;
    }
  }

  receiveAttack(verticalPos, horizontaPos) {
    if (!this.grid[verticalPos][horizontaPos].isHit) {
      this.grid[verticalPos][horizontaPos].isHit = true;

      if (this.grid[verticalPos][horizontaPos].hasShip) {
        this.findShip(verticalPos, horizontaPos);
      }
      return true;
    } else {
      alert("That spot has already been attacked.");
      return false;
    }
  }

  findShip(verticalPos, horizontaPos) {
    let ship_found = false;

    for (let i = 0; i < this.ships.length; i++) {
      if (ship_found) {
        break;
      }
      for (let j = 0; j < this.ships[i].position.length; j++) {
        if (
          this.ships[i].position[j][0] === verticalPos &&
          this.ships[i].position[j][1] === horizontaPos
        ) {
          this.ships[i].hit();
          ship_found = true;
          break;
        }
      }
    }
  }

  shipsSunk() {
    for (let i = 0; i < this.ships.length; i++) {
      if (!this.ships[i].isSunk()) {
        return false;
      }
    }
    return true;
  }
}