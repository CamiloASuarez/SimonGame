const green = document.getElementById('green')
const red = document.getElementById('red')
const yellow = document.getElementById('yellow')
const blue = document.getElementById('blue')
const btnStart = document.getElementById('btnStart')

class Game {
  constructor(){
    this.initialize()
  }
  initialize(){
    btnStart.classList.add('hide')
  }
}

function startGame() {
  var game = new Game()
}