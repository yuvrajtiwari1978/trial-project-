const express = require('express');
const app = express();
const port = 5000;

const dotenv = require('dotenv');
dotenv.config({
  path: '.env'
})

const cors = require('cors')
app.use(cors({
  origin: '*',
}))

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const userRoute = require("./routes/user.route")
const blogRoute = require("./routes/blog.route")
const authRoute = require('./routes/auth.route')

const userController = require('./controllers/user.controlller');
const postController = require('./controllers/post.controller');
const db = require('./models/db')

// app.use(express.json());
app.get("/", (Req, res) => {
  return res.send("This is / route")
})

app.use("/user", userRoute)
app.use("/blog", blogRoute)
app.use("/auth", authRoute)

// all this goes in the router folder
// app.get('/user/:id', userController.getUserById)
// app.put("/user/:id", userController.updatedUser)
// app.post("/user", userController.createUser)
// app.patch("/user/status/:id", userController.changeStatus)
// app.patch("/user/name/:id", userController.updatedUserName)
// app.delete("/user/:id", userController.deleteUser)

db.on('error', (err) => {
  console.log(`Some error has occured ${err}`)
})

console.log(postController.getPosts)
//ye ek api url ka hai 
app.get("/user", postController.getUsers)
app.get("/user/:id", postController.getUserById)
app.get('/posts', postController.getPosts);//app.get-
app.get('/posts/:id', postController.getPostById);
app.post('/posts', postController.createPost)


app.listen(port, () => {
  console.log(`Server running ${port}`);
});





// // const express = require('express')
// // const postController = require("./controller/post.controller")
// // const db = require("./db")

// // console.log(postController.getPosts)
// // app.get("/posts", postController.getPosts)


// // db.on('error', (err) => {
// //     console.log("Some eror has ocyrd" + err)
// // })

// // const port = 3000
// // const cors = require("cors")

// // const app = express()

// // app.use(cors({
// //     origin: "*"
// // }))

// // app.use(express.json())
// // console.log(postController.getPost)

// // app.get("/posts", postController.getPosts)
// // app.get("/posts/:id", postController.getPostById)
// // app.post("/posts", postController.createPost)


// // app.get('/', (req, res) => {
// //     res.send('Hello World!')
// // })

// // app.listen(port, () => {
// //     console.log(`Example app listening on port ${port}`)
// // })




// const express = require('express');
// const postController = require('./controllers/post.controller');
// const db = require('./models/db')

// db.on('error', (err) => {
//     console.log(`Some error has occured ${ err }`)
// })

// const port = 5000;
// const app = express();

// app.use(express.json());
// //ye ek api url ka hai 
// app.get('/posts', postController.getPosts);//app.get-
// app.get('/posts/:idssss', postController.getPostById);
// app.post('/posts', postController.createPost)

// app.get("/user")

// app.listen(port, () => {
//     console.log(`Server running ${ port }`);
// });
