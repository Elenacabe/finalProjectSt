module.exports = app => {

  const authRoutes = require('./auth.routes')
  app.use("/api/auth", authRoutes)

  const storiesRoutes = require("./stories.routes")
  app.use("/api/stories", storiesRoutes)

  const commentsRoutes = require("./comment.routes")
  app.use("/api/comments", commentsRoutes)


}