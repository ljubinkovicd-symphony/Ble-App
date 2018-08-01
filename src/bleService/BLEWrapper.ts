// Devices can be connectable, databases...
export interface IConnectable {
  connect(): void;
  disconnect(): void;
}

export interface IReadable {
  read(): void;
}

export interface IWriteable {
  write<T>(data: T): void;
}

export interface IScanable {
  startScan(): void;
  stopScan(): void;
}

export interface IBluetooth
  extends IConnectable,
    IReadable,
    IWriteable,
    IScanable {
  peripheralID: string;
  serviceUUID: string;
  characteristicUUID: string;
}

// example:
// PolideaBle implements BLEWrapper {
//   initialize(): void;

//   startScan(): void;
//   stopScan(): void;

//   // example
//   connect(to: PolideaScannedObject): void;
//   disconnect(from: PolideaScannedObject): void;
// }

// InnoveitBleManager implements BLEWrapper {
//   initialize(): void;

//   startScan(): void;
//   stopScan(): void;

//   // example
//   connect(to: InnoveitScannedObject): void;
//   disconnect(from: InnoveitScannedObject): void;
// }

// Simple Interface Sample
/** The type-checker checks the call to printLabel.
 * The printLabel function has a single parameter that
 * requires that the object passed in has a property called
 * label of type string. Notice that our object actually has more properties
 * than this, but the compiler only checks that at least the ones required are present
 * and match the types required. */
interface LabelledValue {
  label: string;
}

function printLabel(labelledObj: LabelledValue) {
  console.log(labelledObj.label);
}

// The interface LabelledValue is a name we can now use to describe the requirement in the previous example.
// It still represents having a single property called label that is of type string.
// Notice we didn’t have to explicitly say that the object we pass to printLabel implements this interface like we might have to in other languages.
// Here, it’s only the shape that matters. If the object we pass to the function meets the requirements listed, then it’s allowed.
let myObj = { size: 10, label: "Size 10 object" };
printLabel(myObj);

// Optional Properties
interface SquareConfig {
  color?: string;
  width?: number;
  // string index signature
  // Here we’re saying a SquareConfig can have any number of properties, and as long as they aren’t color or width, their types don’t matter.
  [propName: string]: any; // so that we can add any additional properties that we might need.
}

function createSquare(config: SquareConfig): { color: string; area: number } {
  let newSquare = { color: "white", area: 100 };
  if (config.color) {
    newSquare.color = config.color;
  }
  if (config.width) {
    newSquare.area = config.width * config.width;
  }

  return newSquare;
}

// If an object literal has any properties that the “target type” doesn’t have, you’ll get an error.
// let mySquare = createSquare({ colour: "black" });
let mySquare = createSquare({ color: "black", opacity: 0.5 } as SquareConfig);

let squareOptions = { colour: "red", width: 100 };
let mySquare2 = createSquare(squareOptions);

// Readonly properties
interface Point {
  // readonly vs const
  // The easiest way to remember whether to use readonly or const is to ask whether you’re using it on a variable or a property.
  // Variables use const whereas properties use readonly.
  readonly x: number;
  readonly y: number;
}

let p1: Point = { x: 10, y: 20 };
// p1.x = 5; // error!

let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;
// ro[0] = 12; // error!
// ro.push(5); // error!
// ro.length = 100; // error!
// a = ro; // error!
a = ro as number[];

// Function Types
interface SearchFunc {
  (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
  let result = source.search(subString);
  return result > -1;
};

let mySearch2: SearchFunc;
mySearch2 = function(src: string, sub: string): boolean {
  let result = src.search(sub);
  return result > -1;
};

let mySearch3: SearchFunc;
mySearch3 = function(src, sub) {
  let result = src.search(sub);
  return result > -1;
};

// Indexable Types
interface StringArray {
  [index: number]: string;
}

let myArray: StringArray;
myArray = ["Bob", "Fred"];

let myStr: string = myArray[0];

class Animal {
  name: string;
}
class Dog extends Animal {
  breed: string;
}

// Error: indexing with a numeric string might get you a completely separate type of Animal!
interface NotOkay {
  [x: number]: Animal;
  [x: string]: Dog;
}

// ________________________________________________________________________________________________________________________________
// Class Types
// interface ClockInterface {
//   currentTime: Date;
//   setTime(d: Date);
// }

// class Clock implements ClockInterface {
//   currentTime: Date;
//   setTime(d: Date) {
//     this.currentTime = d;
//   }
//   constructor(h: number, m: number) {}
// }
interface ClockInterface {
  tick(): void;
}

interface ClockConstructor {
  new (hour: number, minute: number): ClockInterface;
}

function createClock(
  ctor: ClockConstructor,
  hour: number,
  minute: number
): ClockInterface {
  return new ctor(hour, minute);
}

class DigitalClock implements ClockInterface {
  constructor(h: number, m: number) {}
  tick() {
    console.log("beep beep");
  }
}

class AnalogClock implements ClockInterface {
  constructor(h: number, m: number) {}
  tick() {
    console.log("tick tock");
  }
}

let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);

// Extending Interfaces
interface Shape {
  color: string;
}

interface PenStroke {
  penWidth: number;
}

interface Square extends Shape, PenStroke {
  sideLength: number;
}

let square = <Square>{};
square.color = "blue";
square.sideLength = 10;
square.penWidth = 5.0;

// Hybrid Types
interface Counter {
  (start: number): string;
  interval: number;
  reset(): void;
}

function getCounter(): Counter {
  let counter = <Counter>function(start: number) {};
  counter.interval = 123;
  counter.reset = function() {};
  return counter;
}

let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;
