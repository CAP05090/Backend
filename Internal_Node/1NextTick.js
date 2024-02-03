const process = require("process")

function func1(){
    console.log("function func1 executes after 2 sec")
}

process.nextTick(()=>{
    setTimeout(func1, 2000)
})

console.log("Start Program")