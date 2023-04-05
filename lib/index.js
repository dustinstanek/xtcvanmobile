import DinoGame from './game/DinoGame.js'

const game = new DinoGame(600, 250)
const isTouchDevice =
  'ontouchstart' in window ||
  navigator.maxTouchPoints > 0 ||
  navigator.msMaxTouchPoints > 0

if (isTouchDevice) {
  let touchStartTimestamp;
  let touchHoldTimeout;
  
  document.addEventListener('touchstart', ({ touches }) => {
    touchStartTimestamp = Date.now();
    touchHoldTimeout = setTimeout(() => {
      game.onInput('duck')
    }, 250) // 500ms hold duration to trigger 'duck'
    
    if (touches.length === 1) {
      game.onInput('jump')
    }
  })

  document.addEventListener('touchend', ({ touches }) => {
    clearTimeout(touchHoldTimeout);
    if (Date.now() - touchStartTimestamp >= 500) {
      game.onInput('stop-duck')
    }
  })
} else {
  const keycodes = {
    // up, spacebar
    JUMP: { 38: 1, 32: 1 },
    // down
    DUCK: { 40: 1 },
  }

  document.addEventListener('keydown', ({ keyCode }) => {
    if (keycodes.JUMP[keyCode]) {
      game.onInput('jump')
    } else if (keycodes.DUCK[keyCode]) {
      game.onInput('duck')
    }
  })

  document.addEventListener('keyup', ({ keyCode }) => {
    if (keycodes.DUCK[keyCode]) {
      game.onInput('stop-duck')
    }
  })
}

game.start().catch(console.error)
