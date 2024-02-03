## Node Internals

1. Write a program that uses process.nextTick() to execute a function after the current event loop iteration completes. The function should print a message to the console after a delay of 2 seconds.

2. Write a program that uses process.hrtime() to measure the time it takes to execute a function. The function should calculate the sum of the numbers from 1 to 1000000, and the program should print the time it takes to execute the function in nanoseconds.

3. Prove the order of execution of event loop phases. using process.nextTick(), Promise, setTimeout, setInterval, setImmediate, and file reading.(Prove means use all timers and show using console that which timer is running first, second and so on.)

