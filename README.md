# Wrappy.js

Wrappy.js is a simple utility library that helps wraps your functions and methods in Promises. For those developers who often deal with Promises and Deferreds in a fluent interface, manually making a function or method return a promise quickly becomes tiresome and produces code bloat.

Wrappy simplfies this by creating a Promise proxy around each method of your methods, allowing you to focus on building your features.

## Getting Started

### Including it on your page
Simply include the wrappy source file on your page. Wrappy has no dependencies on other libraries or frameworks.
```html
<script src="wrappy.js"></script>
```
### Method on a Object as a Promise
To make your method a Promise object, you need to call `wrappy.wrapMethod()`, with the object and method name:
```javascript
// Make myObj.myMethod a Promise proxy that replaces myMethod() with a proxy
wrappy.wrapMethod(myObj, 'myMethod');
```
When invoking your method, Wrappy will append a `Promise` object as the last argument, that can either `resolve` or `reject`:
```javascript
// Your custom object
var myObj = {
    myMethod: function(name, promise) {
    
        // Simulate an asynchronous operation that completes in 5sec.
        // This could be an ajax call or something else
        setTimeout(function() {
            promise.resolve('My name is ' + name);
        }, 5000);
        
        // Returns immediately, non-blocking
        
    }
};

// You can now invoke myObj.myMethod as usual, but it's now a Promised method
myObj.myMethod('David').then(function(result) {
    console.log(result); // My name is David
});
```

### Function as a Promise
To make a standalone function a Promise object, you need to call `wrappy.wrapFunction()` with the function to wrap and assign the result back from Wrappy to your original function:
```javascript
// Make myFunction a Promise proxy that replaces reassigns itself
myFunction = wrappy.wrapFunction(myFunction);
```
Then call your function as usual:
```javascript
function myFunction(promise) {
    // do async stuff...
    promise.reject('Some reason why the async operation failed');
}

myFunction().then(function(result) {
    console.log(result); // 'Some reason why the async operation failed'
});
