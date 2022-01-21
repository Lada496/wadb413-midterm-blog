const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const Article = require('./models/article')
const articleRoute = require('./routes/articles')
const app = express()
const dotenv = require('dotenv')
dotenv.config()


// mongoose.connect('mongodb://localhost:27017/myapp', {
//     useNewUrlParser: true, useUnifiedTopology: true
//   });
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.log(err))


app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.get('/', async (req,res) => {
    const articles = await Article.find().sort({ createdAt: 'desc' })
    res.render('articles/index', { articles: articles })
})

app.use('/articles', articleRoute)

app.listen(process.env.PORT || 8000, () => {
  console.log('Backend server is running')
})