function fibonacci(n) {
    if (n <= 1) return n;
    const number = fibonacci(n - 1) + fibonacci(n - 2)

    return number

}
process.on('message', (n) => {
console.log("🚀 ~ file: fibonacci.js:11 ~ process.on ~ n:", n)

    const num = fibonacci(n)
    process.send(num)
})
