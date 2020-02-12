var mongoose = require("mongoose");

const Schema = mongoose.Schema;


const ArticleSchema = new Schema({
  
  title: {
    type: String,
    required: true,
    unique: true,
  },
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


const Article = mongoose.model("Article", ArticleSchema);


module.exports = Article;
