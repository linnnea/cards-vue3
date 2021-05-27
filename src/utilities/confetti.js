import confetti from 'canvas-confetti'

export const launchConfetti = () => {
  const end = Date.now() + 10 * 1000

  const colors = ['#FFBAFC', '#fcf9b5']

  ;(function frame() {
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors
    })
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors
    })

    if (Date.now() < end) {
      requestAnimationFrame(frame)
    }
  })()
}