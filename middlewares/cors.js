import cors from 'cors'

const ACCEPTED_ORIGINS = [
  'http://localhost:8080',
  'http://localhost:4200',
  'https://api-habbbits-8l04mzvyx-fernandos-projects-77f8272b.vercel.app',
  'https://api-habbbits-ljumd624z-fernandos-projects-77f8272b.vercel.app',
]

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: false
})