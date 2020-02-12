var mongoose = require("mongoose");

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
const ArticleSchema = new Schema({
  // `title` is required and of type String
  title: {
    type: String,
    required: true,
    unique: true,
  },
  // `link` is required and of type String
  blurb: {
    type: String,
    required: true
  },
  articleURL: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    required: true
  },
  isSaved: {
    type: Boolean,
    default: false
  },
  
  note: [
    {type: Schema.Types.ObjectId,
    ref: "Note"}
  ]
});


// This creates our model from the above schema, using mongoose's model method
const Article = mongoose.model("Article", ArticleSchema);

// Export the Article model
module.exports = Article;
