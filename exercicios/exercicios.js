// Exercício 1
function typeNumbers() {
    const numbers = Array.from({length: 100}, (_, i) => i + 1)
    numbers.forEach((num) => {
      if (num % 3 === 0 && num % 5 === 0) console.log("FizzBuzz")
      else if (num % 3 === 0) console.log("Fizz")
      else if (num % 5 === 0) console.log("Buzz")
    })
}

// Exercício 2
function anagrams(str1, str2) {
    if (str1.length !== str2.length) return false
  
    const str1Order = str1.split("").sort().join("")
    const str2Order = str2.split("").sort().join("")
  
    return str1Order === str2Order
}

// Exercício 3
function recursiveFibonacci(n) {
    if (n <= 1) return n
    return recursiveFibonacci(n - 1) + recursiveFibonacci(n - 2)
}

function iterativeFibonacci(n) {
    if (n <= 1) return n
    let a = 0
    let b = 1
    for (let i = 2; i <= n; i++) {
      const c = a + b
      a = b
      b = c
    }
    return b
}

// Exercício 4
function minNumber(arr) {
    let i = 1
    while(true){
        if(!arr.includes(i)) return i
        else i++
    } 
}

// Exercício 5
function grayCode(n) {
    if (n === 0) return ['']
    else {
      const prevCodes = grayCode(n - 1)
      const currentCodes = []
      for (let i = 0; i < prevCodes.length; i++) {
        currentCodes.push('0' + prevCodes[i])
      }
      for (let i = prevCodes.length - 1; i >= 0; i--) {
        currentCodes.push('1' + prevCodes[i])
      }
      return currentCodes;
    }
}

// Exercício 6
function longestPrefix(strs) {
    if (strs.length === 0) return ''
    let prefix = strs[0]
    for (let i = 1; i < strs.length; i++) {
      while (strs[i].indexOf(prefix) !== 0) {
        prefix = prefix.substring(0, prefix.length - 1)
        if (prefix === '') return ''
      }
    }
    return prefix
}

// Exercício 7
function steps(num) {
    let steps = 0
    while (num > 0) {
      if (num % 2 === 0) num = num / 2
      else num = num - 1
      steps++
    }
    return steps
}

// Exercício 8
function checkPalindrome(root) {
    let slow = root
    let fast = root
    let stack = []
  
    while (fast && fast.next) {
      stack.push(slow.val)
      slow = slow.next
      fast = fast.next.next
    }
    if (fast) slow = slow.next
    while (slow) {
      if (stack.pop() !== slow.val) return false
      slow = slow.next
    }
    return true
}

// =============================
// Perguntas
// 1. R= 7 corridas.
// 2. R= Se o primeiro jogador colocar sua moeda oposta à última moeda do segundo jogador, acabará limitando os movimentos de seu inimigo e vencendo todas rodadas.

