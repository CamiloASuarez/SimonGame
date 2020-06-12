const green = document.getElementById('green')
const red = document.getElementById('red')
const yellow = document.getElementById('yellow')
const blue = document.getElementById('blue')
const btnStart = document.getElementById('btnStart')
const lastLevel =  10

swal ('Welcome to the G A M E')

class Game {
  constructor(){
    this.initialize = this.initialize.bind(this)
    this.initialize()
    this.generateSequence()
    setTimeout(this.nextLevel(), 1000)
    
  }
  initialize(){
    this.nextLevel = this.nextLevel.bind(this)
    this.chooseColor = this.chooseColor.bind(this)
    this.toggleBtnStart()
    this.level = 1
    this.colors = {
      green,
      red,
      yellow,
      blue
    }
  }

  toggleBtnStart(){
    if(btnStart.classList.contains('hide')){
      btnStart.classList.remove('hide')
    }else{
      btnStart.classList.add('hide')
    }
  }

  generateSequence(){
    this.sequence = new Array(lastLevel).fill(0).map(n => Math.floor(Math.random() * 4))
  }

  nextLevel(){
    this.sublevel = 0
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

  transformColorToNumber(color){
    switch(color){
      case 'green':
        return 0
      case 'red':
        return 1
      case'yellow':
        return 2
      case 'blue':
        return 3
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
  deleteEventsClick(){
    this.colors.green.removeEventListener('click', this.chooseColor)
    this.colors.red.removeEventListener('click', this.chooseColor)
    this.colors.yellow.removeEventListener('click', this.chooseColor)
    this.colors.blue.removeEventListener('click', this.chooseColor)
  }

  chooseColor(ev){
    const nameColor = ev.target.dataset.color
    const numberColor = this.transformColorToNumber(nameColor)
    this.illuminateColor(nameColor)
    if(numberColor === this.sequence[this.sublevel]){
      this.sublevel ++
      if (this.sublevel === this.level){
        this.level ++
        this.deleteEventsClick()
        if(this.level === (lastLevel + 1)){
          this.wonTheGame()
        } else {
          setTimeout(this.nextLevel, 1500)
        }
      }
    } else {
      this.lostTheGame()
    }
  }
  wonTheGame(){
    swal('PlatziGame', 'Congratulations you have won the game', 'success')
    .then(this.initialize)
  }

  lostTheGame(){
    swal('PlatziGame', 'Sorry you have lost the game', 'error')
    .then(()=>{
      this.deleteEventsClick()
      this.initialize()
    })
  }

}

function startGame() {
  window.game = new Game()
}