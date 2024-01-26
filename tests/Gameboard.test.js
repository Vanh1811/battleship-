import Gameboard from "../Gameboard";
import { jest } from "@jest/globals";

let gameboard;
beforeEach(() => {
  gameboard = new Gameboard();
});

test("Place ship at specific coordinates", () => {
  let position = [
    [0, 1],
    [0, 2],
    [0, 3],
  ];
  gameboard.placeShip(position);
  expect(gameboard.ships[0].position).toEqual(position);
});

test("Throw error if ship is illegal length", () => {
  let position = [[0, 1]];
  let positionTwo = [
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
    [0, 5],
    [0, 6],
  ];
  expect(() => {
    gameboard.placeShip(position);
  }).toThrow();
  expect(() => {
    gameboard.placeShip(positionTwo);
  }).toThrow();
});

test("Throw error if ship is placed on non-empty spot", () => {
  let position = [
    [0, 1],
    [0, 2],
  ];
  gameboard.placeShip(position);
  expect(() => {
    gameboard.placeShip(position);
  }).toThrow();
});

test("Determine if ship is hit after attack", () => {
  let position = [
    [0, 1],
    [0, 2],
    [0, 3],
  ];
  gameboard.placeShip(position);
  expect(gameboard.receiveAttack(0, 1)).toBe(true);
  expect(gameboard.grid[0][1].isHit).toBe(true);
  expect(gameboard.grid[0][1].hasShip).toBe(true);
});

test("Alert if attacking spot that's already been hit", () => {
  global.alert = jest.fn();
  let position = [
    [0, 1],
    [0, 2],
  ];
  gameboard.placeShip(position);
  gameboard.receiveAttack(0, 1);
  gameboard.receiveAttack(0, 1);
  expect(global.alert).toHaveBeenCalledTimes(1);
});

test("Record hit on a specific ship", () => {
  let position = [
    [0, 1],
    [0, 2],
  ];
  let positionTwo = [
    [0, 3],
    [0, 4],
  ];
  gameboard.placeShip(position);
  gameboard.placeShip(positionTwo);
  gameboard.receiveAttack(0, 1);
  gameboard.receiveAttack(0, 3);
  gameboard.receiveAttack(0, 4);
  expect(gameboard.ships[0].hits).toBe(1);
  expect(gameboard.ships[1].hits).toBe(2);
});

test("Record coordinates of missed attack", () => {
  gameboard.receiveAttack(0, 1);
  expect(gameboard.grid[0][1].isHit).toBe(true);
  expect(gameboard.grid[0][1].hasShip).toBe(false);
});

describe("Check if ships are sunk", () => {
  beforeEach(() => {
    let position = [
      [0, 1],
      [0, 2],
    ];
    gameboard.placeShip(position);
  });
  test("Ships are not all sunk", () => {
    gameboard.receiveAttack(0, 1);
    expect(gameboard.shipsSunk()).toBe(false);
  });
  test("Ships are all sunk", () => {
    gameboard.receiveAttack(0, 1);
    gameboard.receiveAttack(0, 2);
    expect(gameboard.shipsSunk()).toBe(true);
  });
});