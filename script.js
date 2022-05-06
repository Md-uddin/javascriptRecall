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
// outer();
// outer();
/////////////function currying/////////////////////////////
function sum(a, b, c) {
  return a + b + c;

}
// console.log(sum(1, 2, 3))
function curry(fn) {
  return function (a) {
    return function (b) {
      return function (c) {
        return fn(a,b,c)
      }
    }
  }
}
const curriedSum = curry(sum);
// console.log(curriedSum(2)(3)(5))
const add2 = curriedSum(2);
const add3 = add2(3);
const add5 = add3(5);
// console.log(add5);
///////////this keyword/////////////////////////////

///implicit binding rule/////
const person = {
  name: 'md',
  sayMyName: function () {
    // console.log(`my name is ${this.name}`);
  }
}
person.sayMyName();
///explicit binding rule/////
  function sayMyName() {
    // console.log(`my name is ${this.name}`);
  }
sayMyName.call(person)
//////new binding/////
function PersonName(name) {
  this.name = name
}
const p1 = new PersonName('iron man');
const p2 = new PersonName('bat man');
// console.log(p1, p2)

///////////default binding/////
const name = 'super man';
globalThis.name = name;
sayMyName()

/////////////prototype/////

function persons(fname, lname) {
  this.firstName = fname
  this.lastName = lname
}
const person1 = new persons('bruce', 'wayne');
const person2 = new persons('clark', 'kent');

//it is attached to only one copy of function
person1.getfullName = function () {
  return this.firstName +""+this.lastName

}
///to apply the property to all instances of persons func
persons.prototype.getfullName = function () {
  return this.firstName +""+this.lastName
}
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
  constructor(fname,lname) {
    this.firstName = fname;
    this.lastName = lname;
  }
  sayMyName() {
    return this.firstName + ' ' + this.lastName
  }
}
const persona = new newperson("md ", "mohi uddin");
// console.log(persona.sayMyName());
//////extending old class taking its properties
class SuperHero extends newperson {
  constructor(fname, lname) {
    super(fname, lname)
    this.isSuperHero = true;
  }
}
const captainAmerica = new SuperHero("captain", "america");
// console.log(captainAmerica.sayMyName())

// iterables and iterators////////////////////////////////
 