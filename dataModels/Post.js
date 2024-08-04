const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configuration/config');

class Post extends Model {}

// Initialize the Post model with its fields and configuration
Post.init(
  {
    
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    // Configure the model with sequelize instance, timestamps, table name, and field naming conventions
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'post',
  }
);

// Define associations between Post and other models
Post.associate = (models) => {
  Post.hasMany(models.Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE',
  });

  Post.belongsTo(models.User, {
    foreignKey: 'user_id',
  });
};

module.exports = Post;