//////////closure
//////////when we return a function from another function it will store the scope of that function
function outer() {
  let counter = 0;
  function inner() {
    counter++;
    // console.log(counter,'without closure')
  }
inner();

}
outer();
outer();
function secondOuter() {
  let counter = 0;
  function inner() {
    counter++;
    // console.log(counter)
  }
  return inner;

}
const fn = secondOuter();
fn();
fn();
outer();
outer();
/////////////function currying/////////////////////////////
function sum(a, b, c) {
  return a + b + c;
}
// console.log(sum(1, 2, 3))
function curry(fn) {
  return function (a) {
    return function (b) {
      return function (c) {
        return fn(a, b, c);
      };
    };
  };
}

const curriedSum = curry(sum);
// console.log(curriedSum(2)(3)(5))
const add2 = curriedSum(2);
const add3 = add2(3);
const add5 = add3(5);
// console.log(add5);

function Othercurry(fn) {
  return function (a) {
    return function (b) {
      return a - b;
    };
  };
}
let subtract = Othercurry();

// console.log(subtract(1)(2), "curry");

///////////this keyword/////////////////////////////

///implicit binding rule/////
const person = {
  name: "md",
  sayMyName: function () {
    // console.log(`my name is ${this.name}`);
  },
};
person.sayMyName();
///explicit binding rule/////
function sayMyName() {
  // console.log(`my name is ${this.name}`);
}
sayMyName.call(person);
//////new binding/////
function PersonName(name) {
  this.name = name;
}
const p1 = new PersonName("iron man");
const p2 = new PersonName("bat man");
// console.log(p1, p2)

///////////default binding/////
const name = "super man";
globalThis.name = name;
sayMyName();

/////////////prototype/////

function persons(fname, lname) {
  this.firstName = fname;
  this.lastName = lname;
}
const person1 = new persons("bruce", "wayne");
const person2 = new persons("clark", "kent");

//it is attached to only one copy of function
person1.getfullName = function () {
  return this.firstName + "" + this.lastName;
};
///to apply the property to all instances of persons func
persons.prototype.getfullName = function () {
  return this.firstName + "" + this.lastName;
};
// console.log(person2.getfullName())
////prototype inheritance
function superHero(fname, lname) {
  persons.call(this, fname, lname);
  this.isSuperHero = true;
}
superHero.prototype.fightCrime = function () {
  // console.log('fighting crime')
};
superHero.prototype = Object.create(persons.prototype);
const batman = new superHero("iron", "man");
superHero.prototype.constructor = superHero;
// console.log(batman.getfullName())

//////////class /////////////////////////////////
class newperson {
  constructor(fname, lname) {
    this.firstName = fname;
    this.lastName = lname;
  }
  sayMyName() {
    return this.firstName + " " + this.lastName;
  }
}
const persona = new newperson("md ", "mohi uddin");
// console.log(persona.sayMyName());
//////extending old class taking its properties
class SuperHero extends newperson {
  constructor(fname, lname) {
    super(fname, lname);
    this.isSuperHero = true;
  }
}
const captainAmerica = new SuperHero("captain", "america");
// console.log(captainAmerica.sayMyName())

// iterables and iterators//////////////////////////////

const obj = {
  [Symbol.iterator]: function () {
    let step = 0;
    const iterator = {
      next: function () {
        step++;
        if (step === 1) {
          return { value: "hello", done: false };
        } else if (step === 2) {
          return { value: "world", done: false };
        }
        return { value: undefined, done: true };
      },
    };
    return iterator;
  },
};

for (const word of obj) {
  // console.log(word);
}

/////Generator////////////////

function normalFuncton() {
  // console.log("Hello");
  // return console.log("stop");
}
normalFuncton();

function* generatorFuncton() {
  ///it yields a value
  yield "hello";
  yield "world";
}

////////it makes an iterator
const generatorObj = generatorFuncton();

for (const word of generatorObj) {
  // console.log(word);
}

///////////////////Asynchronous js/////////////////////////////////////////////////////////////////////////////

////////recursive set timout////////////////////////////

///it will take atleast 100ms to run the code.(after it depends on pending / time taken by this func)
setTimeout(function run() {
  // console.log("hello");
  setTimeout(run, 100);
}, 100);

///////it will include the time taken by this func to execute.(the interval is 40ms - if the code takes 60ms to run)
setInterval(function run() {
  // console.log("hello");
}, 100);

///////////callbacks////////////////////////////////

////a simple callback(syncronous)
const sayHello = (name) => {
  // console.log(`Hello ${name}`);
};

const Greet = (greetfunc) => {
  let name = "md";
  greetfunc(name);
};
Greet(sayHello);

////////////// simple async callback ////////////////////
setTimeout(() => {
  sayHello("md");
}, 1000);

/////////////////////promises//////////////////
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    ////resolve if this happens
    resolve("md mohi uddin");
    /////////////reject if this happens
    // reject("sorry");
  }, 5000);
});
/////can be used but not preferred
promise.then(
  (name) => sayHello(name),
  (msg) => console.log(msg)
);

///////////preferred

///////if it is solved
promise.then((name) => {
  sayHello(name);
});
///////if it is rejected
promise.catch((msg) => console.log(msg));

/////////channing with promisses (callback hell as well)
promise
  .then((result) => sayHello(result))
  .then((result) => result) ///////do something like data fetching
  .then(
    (result) =>
      // fetchdata("/api")
      "next"
  );
//////////some promise static methods
const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, "done");
});

/////wait for all promises to be done - fails even if any one fails.
Promise.all([promise1, promise2, promise3]).then((values) => {
  // console.log(values);
});
/////wait for all to complete either success or failure
// Promise.allSettled([promise1, promise2, promise3]).then((values) => { console.log(/values); });

//////get the value of any promise which is solved or reject first
// Promise.race([promise1, promise2, promise3]).then((values) => { console.log(values) });

//////////////async await ////////////
async function greet() {
  return "hello";
}
console.log(greet()); ///////always return promise

async function GreetAll() {
  let promise = new Promise(function (resolve, reject) {
    setTimeout(
      () => {
        resolve();
      },
      1000,
      "Hello world"
    );
  });
  let result = await promise;
  // console.log(result,"result");
};

//////////channing with async await

async function fetchdata() {
  // try {
  //   const user = await user('api/user');
  //   const otherData = await user('api/data');
  //   const diffrentData = await user('api/data');
  //   const data = await user('api/data');
  //   const data2 = await user('api/data');
  // } catch (err) {
  //   console.log(err)
  // }
};
//////////sequencial execution
function resolveHello() {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve("hello");
    },4000)
  })
}
function resolveworld() {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve("world");
    },1000)
  })
}
async function sequencial() {
  const hello = await resolveHello();
  ///////take 2 seconds
  console.log(hello);
  const world = await resolveworld();
  ///////////take 2 + 1 seconds
  console.log(world);
};
// sequencial();

////////////////concurrent execution //////////////////
async function concurrent() {
  const hello =  resolveHello();
  const world =  resolveworld();
  console.log(await hello);
  console.log(await world);
}
// concurrent();

///////////////parallel execution
function parallel() {
  Promise.all([
    (async () => console.log(await resolveHello()))(), (async () => console.log(await resolveworld()))()
  ]);
}
parallel();


////////////////////////Event loop//////////////////////
/* Get better undertanding with the given images
for the syncronus tasks-
 the global variables and func are declared then the simple functions and consoles are executed one by one.


 for set timeout-
 continuing syncronus tasks. then the timout function is are poped out with callback and duration, send to web Apis(as the js coudn't handle the timout,dom func and api calls and it is browser ability). after that task execution the func and pushed to callback queue/task queue, mean while other lines of code is executed symoltaneously on call stack.Now event loop comes in action and it check whether the call stack is clear or not. if it is clear than the task is pushed to call stack and executed.


 for promise-
 it is similar to setTimeout only when the task are pushed to webApis the promise obj is created in memory. and also the then and catch functions are passed syncronously to webApis.after resolving or rejecting the promise the value is pushed to the obj initiated before and pushed from memory to micro task queue,Now same as above the event loop stack this when ever the callback is empty and executed.

 For promises and set timeout at the same time-
 everything works same only the micro task queue has more priority than callback queue/task queue.Therefore the pending on micro task queue is pushed to call stack with event loop earlier as it gets empty.
  */