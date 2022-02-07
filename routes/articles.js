const router = require("express").Router();
const Article = require("../models/article");

// get new article page
router.get("/newArticle", (req, res) => {
  res.render("articles/newArticle", { article: new Article() });
});

// get edit page
router.get("/edit/:id", async (req, res) => {
  const article = await Article.findById(req.params.id);
  res.render("articles/edit", { article: article });
});
// post edited article
router.put("/:id", async (req, res) => {
  let article = await Article.findById(req.params.id);
  (article.title = req.body.title),
    (article.description = req.body.description),
    (article.content = req.body.content);
  try {
    updatedArticle = await article.save();
    res.redirect(`/articles/${updatedArticle.id}`);
  } catch (err) {
    console.log(err);
    res.render("articles/edit", { article: article });
  }
});

// get single page
router.get("/:id", async (req, res) => {
  const article = await Article.findById(req.params.id);
  if (!article) res.redirect("/");
  res.render("articles/detail", { article: article });
});
// post a new article
router.post("/", async (req, res) => {
  let article = new Article({
    title: req.body.title,
    description: req.body.description,
    content: req.body.content,
  });
  try {
    article = await article.save();
    res.redirect(`/articles/${article.id}`);
  } catch (err) {
    console.log(err);
    res.render("articles/newArticle", { article: article });
  }
});

// delete
router.delete("/:id", async (req, res) => {
  await Article.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

// get a single page for comments
router.get("/comment/:id", async (req, res) => {
  const article = await Article.findById(req.params.id);
  res.render("articles/newComment", { article: article });
});

//post a comment
router.post("/:id", async (req, res) => {
  console.log();
  //   const comment = { text: req.body.comment };
  const comment = req.body.comment;
  try {
    Article.findByIdAndUpdate(
      req.params.id,
      { $push: { comment: [comment] } },
      { new: true }
    ).exec((err) => {
      if (err) console.log(err);
    });
  } catch (e) {
    console.log(e.message);
  }
  res.redirect(`/articles/${req.params.id}`);
});

// router.put('/:id', async (req,res) => {
//     let comment = await Article.findOne({ comment:req.params.comment})
//     comment.push(req.params.comment)
//     const updatedComment = comment.save()
//     res.redirect(`/articles/${req.params.id}`)
// })

// app.post("/index/:id", function (req, res) {
//     TestData.findById(req.params.id, function (err, theUser) {
//         if (err) {
//             console.log(err);
//         } else {
//             theUser.likes += 1;
//             theUser.save();
//             console.log(theUser.likes);
//             res.send({likeCount: theUser.likes}); //something like this...
//         }

// const doc = await Model.create({ nums: [3, 4] });
// doc.nums.push(5); // Add 5 to the end of the array
// await doc.save();

// like
router.post("/like/:id", async (req, res) => {
  const article = await Article.findById(req.params.id);
  article.like.push(req.params.id);

  try {
    await article.save();
    res.redirect(`/articles/${article.id}`);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
