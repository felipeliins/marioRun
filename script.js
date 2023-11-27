const mario = document.querySelector('.mario')
const pipe = document.querySelector('.pipe')
const coin = document.querySelector('.coin')

const start = document.querySelector('.start')
const gameOver = document.querySelector('.game-over')

audioStart = new Audio('./soung/audio_theme.mp3')
audioGameOver = new Audio('./soung/audio_gameover.mp3')

var score = 0;
var cu = 0;
var verifica = 0;
let coinCount = 0;

const startGame = () => {
  pipe.classList.add('pipe-animation')
  start.style.display = 'none'
  verifica = 1;

  // audio
  audioStart.play()
}

const restartGame = () => {
  verifica = 1;
  verifica1 = 1;
  gameOver.style.display = 'none'
  pipe.style.left = ''
  pipe.style.right = '0'
  mario.src = './img/mario.gif'
  mario.style.width = '150px'
  mario.style.bottom = '0'
  coin.style.left = ''
  coin.style.right = '0'
  coin.style.display = 'none'

  start.style.display = 'none'

  audioGameOver.pause()
  audioGameOver.currentTime = 0;

  audioStart.play()
  audioStart.currentTime = 0;
  verifica = 1;
  verifica1 = 1;

}
var cont;
var verifica1 = 0;
let coinStartPosition = coin.offsetLeft

function resetCoin() {
  // verifica se o score é múltiplo de 1000
  if (score > 1000) { 
      coin.classList.add('coin-animation')
      start.style.display = 'none'// <--- corrigi a condição aqui
      // verifica se o Mario está no tamanho normal
      if(mario.style.width === '150px') {
        // faz a moeda voltar a aparecer
        coin.style.display = 'block'
        coin.style.opacity = 1 // <--- adicionei essa linha aqui
        // coloca a moeda na posição inicial
        //coin.style.left = `${coinStartPosition}px`
      }
    }
}


function resetMario() {
  // define o tempo em milissegundos
  let time = 10000
  // usa a função setTimeout para executar um código depois do tempo definido
  setTimeout(() => {
    // faz o Mario voltar ao tamanho normal
    mario.style.width = '150px'
    
  }, time)
}


function updateScore(){
  document.getElementById("score").textContent = score;
  
  if(verifica === 1){
    score += 1;
    cu += 1;
  } 
}

// função que faz a moeda desaparecer de forma suave
function fadeCoin() {
  // define a opacidade inicial da moeda como 1
  let opacity = 1
  // define o intervalo de tempo em milissegundos para diminuir a opacidade
  let time = 50
  // usa a função setInterval para executar um código a cada intervalo de tempo
  let interval = setInterval(() => {
    // diminui a opacidade em 0.1
    opacity -= 0.1
    // aplica a opacidade na moeda
    coin.style.opacity = opacity
    // verifica se a opacidade chegou a 0
    if (opacity <= 0) {
      // para o intervalo
      clearInterval(interval)
      // faz a moeda ficar invisível
      coin.style.display = 'none'
    }
  }, time)
}



const jump = () => {
  mario.classList.add('jump')
  setTimeout(() => {
    mario.classList.remove('jump')
  }, 800)
}

const loop = () => {
  setInterval(() => {
    const pipePosition = pipe.offsetLeft
    const coinPositionLeft = coin.offsetLeft
    const coinPositionTop = coin.offsetTop

    const marioPositionLeft = parseInt(window.getComputedStyle(mario).left.replace('px', ''))
    const marioPositionTop = parseInt(window.getComputedStyle(mario).bottom.replace('px', ''))

    const marioWidth = mario.offsetWidth
    const marioHeight = mario.offsetHeight
    const coinWidth = coin.offsetWidth
    const coinHeight = coin.offsetHeight

    const marioPosition = window
      .getComputedStyle(mario)
      .bottom.replace('px', ' ')

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
      verifica = 0;
      verifica1 = 0;
      score = 0;
      cu = 0;
      pipe.classList.remove('.pipe-animation')
      pipe.style.left = `${pipePosition}px`

      mario.classList.remove('.jump')
      mario.style.bottom = `${marioPosition}px`

      mario.src = './img/game-over.png'
      mario.style.width = '80px'
      mario.style.marginLeft = '50px'

      
      
      
      function stopAudioStart() {
        audioStart.pause()
      }
      stopAudioStart()
      
      audioGameOver.play()
      
      function stopAudio() {
        audioGameOver.pause()
      }
      setTimeout(stopAudio, 7000)
      
      gameOver.style.display = 'flex'

      startGame.pause();
      
      clearInterval(loop)
    }
    updateScore()
    resetCoin()
    if (marioPositionLeft < coinPositionLeft + coinWidth &&
      marioPositionLeft + marioWidth > coinPositionLeft &&
      marioPositionTop < coinPositionTop + coinHeight &&
      marioPositionTop + marioHeight > coinPositionTop) {
        verifica1 = 1;
        cu = 0;

        // faz a moeda desaparecer de forma suave
        fadeCoin() // <--- chame a função aqui
        mario.style.width = '200px'
        resetMario()
    }
    // verifica se é hora de fazer a moeda reaparecer
    resetCoin() // <--- chame a função aqui
  }, 10)
}

loop()
document.addEventListener('keypress', e => {
  const tecla = e.key
  if (tecla === 'w' || tecla === 'W') {
    jump()
  }
})
document.addEventListener('touchstart', e => {
  if (e.touches.length) {
    jump() 
  }
})

document.addEventListener('keypress', e => {
  const tecla = e.key
  if (tecla === 'Enter') {
    startGame()
    verifica = 1;
    verifica1 = 1;
  }
})
