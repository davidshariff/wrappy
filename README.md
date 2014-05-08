# Wrappy

wrappy.js is a simple utility library that helps wraps your functions and object methods in Promises. For those developers that often deal with Promises and Deferreds in a fluent interface, manually making a function or method return a promise quickly becomes tiresome and produces code bloat.

wrappy simplfies this by creating a Promise proxy around each method passed, allowing you to focus on building your features.

## Getting Started

### Including it on your page
Simply include the wrappy source file on your page. wrappy has no dependencies on other libraries or frameworks.
```html
<script src="wrappy.js"></script>
```
### Make a method of an object a Promise
After you have passed your method to wrappy, when invoking wrappy will append a `Promise` object as the last argument that can either `resolve` or `reject`.
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

// Make myObj.myMethod a Promise proxy that returns a deferred object
wrappy.wrapMethod(myObj, 'myMethod');

// You can now invoke myObj.myMethod as a Promised method
myObj.myMethod('David').then(function(result) {
    console.log(result); // My name is David
});
```
