const process = require("process")

const CalSum = ()=>{
    let sum = 0
    for(let i=1; i<=1000000; i++){
        sum += i
    }
    return sum
}

const Stime = process.hrtime();
const res = CalSum()
const Etime = process.hrtime(Stime)

const TimeTaken = Etime[0]*1e9 + Etime[1]

console.log(`Time Taken to sum of number from 1 to 1000000 is ${TimeTaken}`)