'use client'

import { useEffect, useRef, useCallback, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

interface PickleballPongProps {
  className?: string
}

interface GameState {
  ball: {
    x: number
    y: number
    vx: number
    vy: number
    radius: number
  }
  playerPaddle: {
    y: number
    prevY: number
    width: number
    height: number
  }
  aiPaddle: {
    y: number
    prevY: number
    width: number
    height: number
  }
  score: {
    player: number
    ai: number
  }
  court: {
    x: number
    y: number
    width: number
    height: number
  }
}

// Colors
const COURT_BLUE = '#1a5f7a'
const OUTSIDE_BLUE = '#0d3d4d'
const LINE_WHITE = 'rgba(255, 255, 255, 0.9)'
const PLAYER_PADDLE_COLOR = '#BFFF00'
const AI_PADDLE_COLOR = '#00BFA5'
const BALL_COLOR = '#ffffff'

export function PickleballPong({ className = '' }: PickleballPongProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const gameStateRef = useRef<GameState | null>(null)
  const animationFrameRef = useRef<number>(0)
  const mouseYRef = useRef<number>(0)
  const prefersReducedMotion = useReducedMotion()
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  // Initialize game state
  const initGameState = useCallback((width: number, height: number): GameState => {
    // Court is 90% of container, centered
    const courtMargin = 0.05
    const courtX = width * courtMargin
    const courtY = height * courtMargin
    const courtWidth = width * (1 - courtMargin * 2)
    const courtHeight = height * (1 - courtMargin * 2)

    // Smaller paddle size - more realistic
    const paddleHeight = courtHeight * 0.12
    const paddleWidth = courtWidth * 0.008
    const ballRadius = Math.min(courtWidth, courtHeight) * 0.018

    return {
      ball: {
        x: width / 2,
        y: height / 2,
        vx: courtWidth * 0.0025 * (Math.random() > 0.5 ? 1 : -1),
        vy: courtHeight * 0.0015 * (Math.random() > 0.5 ? 1 : -1),
        radius: ballRadius,
      },
      playerPaddle: {
        y: height / 2,
        prevY: height / 2,
        width: paddleWidth,
        height: paddleHeight,
      },
      aiPaddle: {
        y: height / 2,
        prevY: height / 2,
        width: paddleWidth,
        height: paddleHeight,
      },
      score: {
        player: 0,
        ai: 0,
      },
      court: {
        x: courtX,
        y: courtY,
        width: courtWidth,
        height: courtHeight,
      },
    }
  }, [])

  // Reset ball to center
  const resetBall = useCallback((state: GameState, width: number, height: number) => {
    state.ball.x = width / 2
    state.ball.y = height / 2
    state.ball.vx = state.court.width * 0.003 * (Math.random() > 0.5 ? 1 : -1)
    state.ball.vy = state.court.height * 0.002 * (Math.random() - 0.5) * 2
  }, [])

  // Draw pickleball (ball with holes)
  const drawPickleball = useCallback((ctx: CanvasRenderingContext2D, x: number, y: number, radius: number) => {
    // Main ball
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, Math.PI * 2)
    ctx.fillStyle = BALL_COLOR
    ctx.fill()

    // Fewer, bigger holes
    const holeRadius = radius * 0.18
    ctx.fillStyle = 'rgba(80, 80, 80, 0.5)'

    // Center hole
    ctx.beginPath()
    ctx.arc(x, y, holeRadius, 0, Math.PI * 2)
    ctx.fill()

    // Ring of 6 holes around center
    const ringRadius = radius * 0.55
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI * 2) / 6
      const hx = x + ringRadius * Math.cos(angle)
      const hy = y + ringRadius * Math.sin(angle)
      ctx.beginPath()
      ctx.arc(hx, hy, holeRadius, 0, Math.PI * 2)
      ctx.fill()
    }
  }, [])

  // Draw paddle - realistic pickleball paddle shape
  const drawPaddle = useCallback((
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    isPlayer: boolean
  ) => {
    const paddleColor = isPlayer ? PLAYER_PADDLE_COLOR : AI_PADDLE_COLOR

    // Paddle proportions - based on real pickleball paddle
    const faceWidth = height * 0.55
    const faceHeight = height * 0.7
    const handleWidth = faceWidth * 0.28
    const handleHeight = height * 0.3
    const cornerRadius = faceWidth * 0.18

    // Calculate face center (offset up from paddle center to account for handle)
    const faceCenterY = y - handleHeight * 0.3

    // Draw paddle face with uniform rounded corners
    ctx.beginPath()
    ctx.roundRect(
      x - faceWidth / 2,
      faceCenterY - faceHeight / 2,
      faceWidth,
      faceHeight,
      cornerRadius
    )
    ctx.fillStyle = paddleColor
    ctx.fill()

    // Handle
    ctx.beginPath()
    ctx.roundRect(x - handleWidth / 2, faceCenterY + faceHeight / 2 - 2, handleWidth, handleHeight, 2)
    ctx.fillStyle = '#222'
    ctx.fill()

    // Handle grip lines
    ctx.strokeStyle = '#333'
    ctx.lineWidth = 1
    const gripStart = faceCenterY + faceHeight / 2 + 3
    const gripEnd = faceCenterY + faceHeight / 2 + handleHeight - 5
    const numLines = 5
    for (let i = 0; i < numLines; i++) {
      const ly = gripStart + (gripEnd - gripStart) * (i / (numLines - 1))
      ctx.beginPath()
      ctx.moveTo(x - handleWidth / 2 + 2, ly)
      ctx.lineTo(x + handleWidth / 2 - 2, ly)
      ctx.stroke()
    }
  }, [])

  // Draw court
  const drawCourt = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number, court: GameState['court']) => {
    // Outside area (darker blue)
    ctx.fillStyle = OUTSIDE_BLUE
    ctx.fillRect(0, 0, width, height)

    // Court surface (lighter blue)
    ctx.fillStyle = COURT_BLUE
    ctx.fillRect(court.x, court.y, court.width, court.height)

    // Court border
    ctx.strokeStyle = LINE_WHITE
    ctx.lineWidth = 3
    ctx.strokeRect(court.x, court.y, court.width, court.height)

    // Center line (dashed - the "net")
    ctx.setLineDash([15, 10])
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.moveTo(width / 2, court.y)
    ctx.lineTo(width / 2, court.y + court.height)
    ctx.stroke()

    // Kitchen/NVZ lines (solid)
    ctx.setLineDash([])
    ctx.lineWidth = 2
    const kitchenWidth = court.width * 0.175

    // Left kitchen line
    ctx.beginPath()
    ctx.moveTo(court.x + kitchenWidth, court.y)
    ctx.lineTo(court.x + kitchenWidth, court.y + court.height)
    ctx.stroke()

    // Right kitchen line
    ctx.beginPath()
    ctx.moveTo(court.x + court.width - kitchenWidth, court.y)
    ctx.lineTo(court.x + court.width - kitchenWidth, court.y + court.height)
    ctx.stroke()

    // Centerline for service boxes (horizontal)
    ctx.beginPath()
    ctx.moveTo(court.x, court.y + court.height / 2)
    ctx.lineTo(court.x + kitchenWidth, court.y + court.height / 2)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(court.x + court.width - kitchenWidth, court.y + court.height / 2)
    ctx.lineTo(court.x + court.width, court.y + court.height / 2)
    ctx.stroke()
  }, [])

  // Draw score
  const drawScore = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number, score: { player: number; ai: number }, court: GameState['court']) => {
    ctx.font = `bold ${Math.min(court.width, court.height) * 0.12}px "Space Grotesk", sans-serif`
    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    // Player score (left - player controls left paddle)
    ctx.fillText(score.player.toString(), court.x + court.width * 0.25, court.y + court.height * 0.5)
    // AI score (right)
    ctx.fillText(score.ai.toString(), court.x + court.width * 0.75, court.y + court.height * 0.5)
  }, [])

  // Game update logic
  const updateGame = useCallback((state: GameState, width: number, height: number) => {
    const { ball, playerPaddle, aiPaddle, score, court } = state
    const paddleOffset = court.width * 0.07

    // Store previous positions for velocity calculation
    playerPaddle.prevY = playerPaddle.y
    aiPaddle.prevY = aiPaddle.y

    // Player paddle on LEFT - follows mouse (more responsive)
    const targetY = mouseYRef.current
    playerPaddle.y += (targetY - playerPaddle.y) * 0.18

    // Clamp player paddle to court bounds
    playerPaddle.y = Math.max(
      court.y + playerPaddle.height / 2,
      Math.min(court.y + court.height - playerPaddle.height / 2, playerPaddle.y)
    )

    // AI paddle on RIGHT - follows ball with delay
    const aiSpeed = 0.035
    const aiTargetY = ball.y + (ball.vy * 6)
    aiPaddle.y += (aiTargetY - aiPaddle.y) * aiSpeed
    aiPaddle.y = Math.max(
      court.y + aiPaddle.height / 2,
      Math.min(court.y + court.height - aiPaddle.height / 2, aiPaddle.y)
    )

    // Calculate paddle velocities for spin
    const playerVelocity = playerPaddle.y - playerPaddle.prevY
    const aiVelocity = aiPaddle.y - aiPaddle.prevY

    // Update ball position
    ball.x += ball.vx
    ball.y += ball.vy

    // Ball collision with top/bottom court walls
    if (ball.y - ball.radius <= court.y) {
      ball.vy *= -1
      ball.y = court.y + ball.radius
    } else if (ball.y + ball.radius >= court.y + court.height) {
      ball.vy *= -1
      ball.y = court.y + court.height - ball.radius
    }

    // Paddle face dimensions for collision (matching draw function)
    const faceHeight = playerPaddle.height * 0.7
    const faceWidth = faceHeight * 0.55
    const faceCenterOffset = playerPaddle.height * 0.3 * 0.3  // Handle offset

    // Player paddle collision (LEFT side)
    const playerPaddleX = court.x + paddleOffset
    const playerFaceCenterY = playerPaddle.y - faceCenterOffset
    if (
      ball.x - ball.radius <= playerPaddleX + faceWidth / 2 &&
      ball.x + ball.radius >= playerPaddleX - faceWidth / 2 &&
      ball.y >= playerFaceCenterY - faceHeight / 2 &&
      ball.y <= playerFaceCenterY + faceHeight / 2 &&
      ball.vx < 0
    ) {
      // Speed up ball on hit (gradual increase)
      ball.vx = Math.abs(ball.vx) * 1.02
      ball.x = playerPaddleX + faceWidth / 2 + ball.radius

      // Slight velocity adjustment based on paddle movement
      ball.vy += playerVelocity * 0.08
    }

    // AI paddle collision (RIGHT side)
    const aiPaddleX = court.x + court.width - paddleOffset
    const aiFaceCenterY = aiPaddle.y - faceCenterOffset
    if (
      ball.x + ball.radius >= aiPaddleX - faceWidth / 2 &&
      ball.x - ball.radius <= aiPaddleX + faceWidth / 2 &&
      ball.y >= aiFaceCenterY - faceHeight / 2 &&
      ball.y <= aiFaceCenterY + faceHeight / 2 &&
      ball.vx > 0
    ) {
      // Speed up ball on hit (gradual increase)
      ball.vx = -Math.abs(ball.vx) * 1.02
      ball.x = aiPaddleX - faceWidth / 2 - ball.radius
    }

    // Cap ball speed (allow it to get faster over time but with a max)
    const maxSpeed = court.width * 0.012
    ball.vx = Math.max(-maxSpeed, Math.min(maxSpeed, ball.vx))
    ball.vy = Math.max(-maxSpeed * 0.7, Math.min(maxSpeed * 0.7, ball.vy))

    // Scoring
    if (ball.x < court.x) {
      score.ai++
      resetBall(state, width, height)
    } else if (ball.x > court.x + court.width) {
      score.player++
      resetBall(state, width, height)
    }

    // Reset score after one side reaches 7
    if (score.player >= 7 || score.ai >= 7) {
      score.player = 0
      score.ai = 0
    }
  }, [resetBall])

  // Main game loop
  const gameLoop = useCallback(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    const state = gameStateRef.current

    if (!canvas || !ctx || !state) return

    const { width, height } = canvas

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Draw court
    drawCourt(ctx, width, height, state.court)

    // Draw score
    drawScore(ctx, width, height, state.score, state.court)

    // Update game state
    updateGame(state, width, height)

    // Draw paddles
    const paddleOffset = state.court.width * 0.06
    // Player paddle on LEFT
    drawPaddle(ctx, state.court.x + paddleOffset, state.playerPaddle.y, state.playerPaddle.width, state.playerPaddle.height, true)
    // AI paddle on RIGHT
    drawPaddle(ctx, state.court.x + state.court.width - paddleOffset, state.aiPaddle.y, state.aiPaddle.width, state.aiPaddle.height, false)

    // Draw ball
    drawPickleball(ctx, state.ball.x, state.ball.y, state.ball.radius)

    // Continue loop
    animationFrameRef.current = requestAnimationFrame(gameLoop)
  }, [drawCourt, drawScore, drawPaddle, drawPickleball, updateGame])

  // Draw static court for reduced motion
  const drawStaticCourt = useCallback(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    const state = gameStateRef.current
    if (!canvas || !ctx || !state) return

    const { width, height } = canvas
    ctx.clearRect(0, 0, width, height)
    drawCourt(ctx, width, height, state.court)

    // Draw paddles in center
    const paddleOffset = state.court.width * 0.06
    drawPaddle(ctx, state.court.x + paddleOffset, height / 2, state.playerPaddle.width, state.playerPaddle.height, true)
    drawPaddle(ctx, state.court.x + state.court.width - paddleOffset, height / 2, state.aiPaddle.width, state.aiPaddle.height, false)

    // Draw ball in center
    drawPickleball(ctx, width / 2, height / 2, state.ball.radius)
  }, [drawCourt, drawPaddle, drawPickleball])

  // Handle resize
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect
        setDimensions({ width, height })

        const canvas = canvasRef.current
        if (canvas) {
          canvas.width = width
          canvas.height = height
          gameStateRef.current = initGameState(width, height)
          mouseYRef.current = height / 2
        }
      }
    })

    resizeObserver.observe(container)
    return () => resizeObserver.disconnect()
  }, [initGameState])

  // Handle mouse/touch movement
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      mouseYRef.current = e.clientY - rect.top
    }

    const handleTouchMove = (e: TouchEvent) => {
      const rect = container.getBoundingClientRect()
      const touch = e.touches[0]
      if (touch) {
        mouseYRef.current = touch.clientY - rect.top
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    container.addEventListener('touchmove', handleTouchMove, { passive: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('touchmove', handleTouchMove)
    }
  }, [])

  // Start/stop game loop
  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return

    if (prefersReducedMotion) {
      drawStaticCourt()
      return
    }

    // Start game loop
    animationFrameRef.current = requestAnimationFrame(gameLoop)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [dimensions, prefersReducedMotion, gameLoop, drawStaticCourt])

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none ${className}`}
      style={{ touchAction: 'none' }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
      />
    </div>
  )
}
