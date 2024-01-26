import Ship from "../Ship.js";

let ship;
beforeEach(() => {
  const position = [
    [0, 1],
    [0, 2],
    [0, 3],
  ];
  ship = new Ship(position);
});

test("Ship receives a hit", () => {
  ship.hit();
  expect(ship.hits).toBe(1);
});

test("Ship receives multiple hits", () => {
  ship.hit();
  ship.hit();
  expect(ship.hits).toBe(2);
});

test("Ship is not sunk", () => {
  expect(ship.isSunk()).toBe(false);
});

test("Ship is sunk", () => {
  ship.hit();
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});