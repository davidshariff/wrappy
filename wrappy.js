/*
 * wrappy.js - A function / method Promise wrapper utility for JavaScript
 * 
 * http://davidshariff.github.com/wrappy
 *
 * Copyright (c) 2014 David Shariff
 * MIT licensed.
 */
(function() {
    'use strict';
    
    //---------------------
    // Top-level namespace
    //---------------------
    var wrappy;
    if (typeof exports !== 'undefined') {
        wrappy = exports;
    } 
    else {
        wrappy = this.wrappy = {};
    }
    
    //---------------------
    // Helper functions
    //---------------------
    
    function createDefer() {
        
        return (function() {
            
            var result = {};
            result.promise = new Promise(function(resolve, reject) {
                result.resolve = resolve;
                result.reject = reject;
            });
            return result;
            
        }());  
        
    }
    
    function createPromiseProxy(fn, self) {
        
        return function promiseProxy() {
            
            var defer = createDefer(),
                args  = Array.prototype.slice.call(arguments);
            
            args.push(defer);
            fn.apply(self || null, args);
            
            return defer.promise;
            
        };
        
    }
    
    //---------------------
    // Primary interface
    //---------------------
    
    wrappy.wrapMethod = function (self, methodName) {
        if (typeof methodName !== 'string' || !self) {
            throw new Error('Error: Need to pass base object that the method name belongs to.');
        }
        self[methodName] = createPromiseProxy(self[methodName], self);
    };
    
    wrappy.wrapFunction = function (fn) {
        if (typeof fn !== 'function') {
            throw new Error('Error: Expected argument to be a function.');
        }
        return createPromiseProxy(fn);
    };
    
}).call(this);
