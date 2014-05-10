var wrappy = (typeof require !== "undefined") ? require("../wrappy.js") : window.wrappy,
    expect = require('chai').expect;

// shim node Promise
Promise = (typeof Promise !== "undefined") ? Promise : require("es6-promise").Promise,

//------------------------------------------------------------------------------
// Actual tests
//------------------------------------------------------------------------------

describe("Wrappy global object", function() {

    it("Should have 2 methods, wrappy.wrapMethod() and wrappy.wrapFunction()", function() {
        expect(wrappy).to.have.property('wrapMethod');
        expect(wrappy).to.have.property('wrapFunction');
    });

});

describe("Wrapping a method on an object", function() {
    
    var myObject;

    it("Should throw an error if incorrect arguments are passed", function() {
        
        expect(wrappy.wrapMethod).to.throw(Error);
        
        expect(function() {
            wrappy.wrapMethod('im a string');
        }).to.throw(Error);
        
        expect(function() {
            wrappy.wrapMethod(null, {});
        }).to.throw(Error);
        
        expect(function() {
            wrappy.wrapMethod(null, 'methodName');
        }).to.throw(Error);
        
    });
    
    // create test object and wrap it
    beforeEach(function() {
        
        myObject = {
            method1: function(val, promise) {

                if (val === 'resolveMe') {
                    promise.resolve(val + ' was resolved');
                }
                else {
                    promise.reject(val + ' was not resolved');
                }
                
            }
        };
        
        wrappy.wrapMethod(myObject, 'method1');
        
    });

    it("Should wrap original method as a promise proxy", function() {
        expect(myObject.method1.name).to.equal('promiseProxy');
    });

    it("Should be chainable with then() function", function() {
        expect(myObject.method1('resolveMe').then).to.exist;
    });

    it("Should resolve and pass any returned values to then()", function() {
        myObject.method1('resolveMe').then(function(result) {
           expect(result).to.equal('resolveMe was resolved'); 
        });
    });
    
    it("Should reject and pass any returned values to then()", function() {
        myObject.method1('random').then(function(result) {
           expect(result).to.equal('random was not resolved'); 
        });
    });

});

describe("Wrapping a function", function() {
    
    var myFunction;

    it("Should throw an error if incorrect arguments are passed", function() {
        
        expect(wrappy.wrapFunction).to.throw(Error);
        
        expect(function() {
            wrappy.wrapFunction('im a string');
        }).to.throw(Error);
        
        expect(function() {
            wrappy.wrapFunction({});
        }).to.throw(Error);
        
    });

    // create test function and wrap it
    beforeEach(function() {
        
        myFunction = function(val, promise) {

            if (val === 'resolveMe') {
                promise.resolve(val + ' was resolved');
            }
            else {
                promise.reject(val + ' was not resolved');
            }
            
        };
        
        myFunction = wrappy.wrapFunction(myFunction);
        
    });

    it("Should wrap original function as a promise proxy", function() {
        expect(myFunction.name).to.equal('promiseProxy');
    });

    it("Should be chainable with then() function", function() {
        expect(myFunction('resolveMe').then).to.exist;
    });

    it("Should resolve and pass any returned values to then()", function() {
        myFunction('resolveMe').then(function(result) {
           expect(result).to.equal('resolveMe was resolved'); 
        });
    });

    it("Should reject and pass any returned values to then()", function() {
        myFunction('random').then(function(result) {
           expect(result).to.equal('random was not resolved'); 
        });
    });

});

