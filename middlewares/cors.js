import cors from 'cors'

const ACCEPTED_ORIGINS = [
  'http://localhost:8080',
  'http://localhost:4200',
  'https://api-habbbits-8l04mzvyx-fernandos-projects-77f8272b.vercel.app',
  'https://api-habbbits-ljumd624z-fernandos-projects-77f8272b.vercel.app',
]

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => cors({
  origin: true,  // Permite cualquier origen (pero requiere `credentials: true`)
  credentials: true,  // Habilita cookies y auth headers
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],  // Headers permitidos
})