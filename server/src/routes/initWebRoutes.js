import authRoutes from "./authRoutes";
import user from "./user";
import postRoutes from "./postRoutes";
import category from "./category";
import comments from "./comments";
import messages from "./message";
import conversation from "./conversation";

const webRoutes = (app) => {
  app.use("/api/v1/auth", authRoutes);
  app.use("/api/v1/user", user);
  app.use("/api/v1/posts", postRoutes);
  app.use("/api/v1/categorys", category);
  app.use("/api/v1/comments", comments);
  app.use("/api/v1/messages/", messages);
  app.use("/api/v1/conversations/", conversation);
};
export default webRoutes;
