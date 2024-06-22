import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()
const configCors = (app) => {
  app.use(
    cors({
      origin: process.env.CLIENT_URL,
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );
}

export default configCors
