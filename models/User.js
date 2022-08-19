const { useCLS } = require("sequelize");
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");

//create our User model
class User extends Model {
  //set up method to run on instance data (per user) to check password
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

//Define table columns and configuration
User.init(
  {
    //define an id column
    id: {
      //use the special Sequelize DataTypes object provide what type of data it is
      type: DataTypes.INTEGER,
      //thhis is equivalent to SQLS 'NOT NULL' option
      allowNull: false,
      //instruct that this is the Primary Key
      primaryKey: true,
      //turn on auto increment
      autoIncrement: true,
    },
    //define a username column
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    //define email column
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      //there cannot be any duplicate email values in this table
      unique: true,
      //if allowNull is set to false, we can run our data through validators before creating the table of data
      validate: {
        isEmail: true,
      },
    },
    //define a password
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        //this means the password must be at least four characters long
        len: [4],
      },
    },
  },
  {
    hooks: {
      // set up beforeCreate lifecycle "hooK" functionality
      async beforeCreate(newUserData) {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      //set up beforeUpdate lifecycle "hook" functionality

      async beforeUpdate(updatedUserData) {
        updatedUserData.password = await bcrypt.hash(
          updatedUserData.password,
          10
        );
        return updatedUserData;
      },
    },

    // TABLE CONFIG OPTION GO HERE

    // pass in our imported sequelize connection ( the direct connection to our database)
    sequelize,
    //dont automatically create createdAt/updatedAt timestamp fields
    timestamps: false,
    //don't pluralize name of databse table
    freezeTableName: true,
    //use underscores instead of camel-casing (i.e 'comment_text' instead of commentText)
    underscored: true,
    //make it so our model name stays lowercase in the datbase
    modelName: "user",
  }
);

module.exports = User;
