const process = require("process")
const fs = require("fs")

/*
// if time == 0
console.log("program Started")      // first 

//Using Promises
Promise.resolve().then(()=>{        // Fourth
    console.log("Promise callback func")
})

// Using process.nextTick
process.nextTick(()=>{              // Third
    console.log("Next Tick function")
})

// Using SetTimeout
setTimeout(() => {          // Depend on timeout if (timeout!=0) setImmediate, else: either setTimeout or setImmediate
    console.log("Set Time Out")     // Fifth
}, 0);

// Using setInterval
let intervalcnt = 0
const intervalid = setInterval(() => {      // Sixth, Eigth
    console.log("Set Interval Time")
    intervalcnt ++
    if(intervalcnt == 2){
        clearInterval(intervalid)
    }
}, 0);

// Using setImmediate
setImmediate(()=>{          // Depend on timeout if (timeout!=0) setImmediate, else: either setTimeout or setImmediate
    console.log("Set Immediate Time")   // Seventh
})

// Using file reading

fs.readFile("./db.json", "utf8", (err, data)=>{     // Nineth
    console.log("file reading func")
})

console.log("Program Ended")        // Second

*/

// if time != 0
console.log("program Started")      // first 

//Using Promises
Promise.resolve().then(()=>{        // Fourth
    console.log("Promise callback func")
})

// Using process.nextTick
process.nextTick(()=>{              // Third
    console.log("Process Next Tick function")
})

// Using SetTimeout
setTimeout(() => {          // Depend on timeout if (timeout!=0) setImmediate, else: either setTimeout or setImmediate
    console.log("Set Time Out")     // Seventh
}, 100);

// Using setInterval
let intervalcnt1 = 0
const intervalid1 = setInterval(() => {      // eigth ....
    console.log("Set Interval Time")
    intervalcnt1 ++
    if(intervalcnt1 == 3){
        clearInterval(intervalid1)
    }
}, 100);

// Using setImmediate
setImmediate(()=>{          // Fifth
    console.log("Set Immediate Time")   
})

// Using file reading

fs.readFile("./db.json", "utf8", (err, data)=>{     // Sixth
    console.log("file reading func")
})

console.log("Program Ended")        // Second
