console.log('%c  localhost worker js', 'background:red;color:white;')
self.postMessage('来了')

console.time()

var result = []
for (let i = 0; i < 10000; i++) {
  result.push(i)
}

console.timeEnd()
