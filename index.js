const green = document.getElementById('green')
const red = document.getElementById('red')
const yellow = document.getElementById('yellow')
const blue = document.getElementById('blue')
const btnStart = document.getElementById('btnStart')

class Game {
  constructor(){
    this.initialize()
    this.generateSequence()
    this.nextLevel()
  }
  initialize(){
    this.chooseColor = this.chooseColor.bind(this)
    btnStart.classList.add('hide')
    this.level = 1
    this.colors = {
      green,
      red,
      yellow,
      blue
    }
  }

  generateSequence(){
    this.sequence = new Array(10).fill(0).map(n => Math.floor(Math.random() * 4))
  }

  nextLevel(){
    this.illuminateSequence()
    this.addEventsClick()
  }

  transformNumberToColor(number){
    switch(number){
      case 0:
        return 'green'
      case 1:
        return 'red'
      case 2:
        return 'yellow'
      case 3:
        return 'blue'
    }
  }

  illuminateSequence(){
    for(let i = 0; i< this.level; i++){
      const color = this.transformNumberToColor(this.sequence[i])
      setTimeout(()=> this.illuminateColor(color), 1000 * i)
    }
  }
  illuminateColor(color){
    this.colors[color].classList.add('light')
    setTimeout(()=> this.offColor(color), 340)
  }
  offColor(color){
    this.colors[color].classList.remove('light')
  }
  addEventsClick(){
    this.colors.green.addEventListener('click', this.chooseColor)
    this.colors.red.addEventListener('click', this.chooseColor)
    this.colors.yellow.addEventListener('click', this.chooseColor)
    this.colors.blue.addEventListener('click', this.chooseColor)
  }

  chooseColor(ev){
    console.log(ev)
    
  }
}

function startGame() {
  window.game = new Game()
}