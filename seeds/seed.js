const sequelize = require('../configuration/config');
const { User, Post, Comment } = require('../dataModels');
const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');

// Function to seed the database
const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  
  await User.bulkCreate(userData, {
    individualHooks: true, 
    returning: true, 
  });

  await Post.bulkCreate(postData);

  await Comment.bulkCreate(commentData);

  process.exit(0);
};

seedDatabase();