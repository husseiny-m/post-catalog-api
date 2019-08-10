const userRoutes = require('./user.routes')
const postRoutes = require('./post.routes')

module.exports = (app)=>{
  app.use('/api/v1/posts', postRoutes);
  app.use('/api/v1/users', userRoutes);
};
