// import authRoutes from './authRoutes'
// import user from './user'
import postRoutes from "./postRoutes";

const webRoutes = (app) => {
  // app.use('/api/v1/auth', authRoutes)
  // app.use('/api/v1/user', user)
    app.use("/api/v1/posts", postRoutes);
}
export default webRoutes
