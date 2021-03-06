require("dotenv").config();
var express   =   require("express"),
    app       =   express(),
    cors      =   require("cors"),
    bodyParser  = require("body-parser"),
    authRoutes  = require("./routes/auth"),
    db      = require("./models"),
    discover = require("./helpers/discover");
    auth = require("./middleware/auth"),
    jwt = require("jsonwebtoken"),
    messagesRoutes  = require("./routes/messages"),
    userInfoRoutes = require("./routes/userinformation"),
    otherRoutes = ("./routes/routes");
app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
process.on('unhandledRejection', function(reason, promise) {
    console.log(promise);
});
app.get("/", function(req, res){
  res.json({message:"Please connect through an approved method"});
});
app.use("/api/messages", messagesRoutes);
// app.use("/api/users/:id/messages", auth.loginRequired, auth.ensureCorrectUser, messagesRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userInfoRoutes);
app.get("/api/discover/users", discover.getDiscoverUsers);

// app.post("/api/:username/follow", helpers.followUser);
// app.use("/api/messages/:mid/like", helpers.likeMessage);
// app.get("/api/messages/", helpers.getGetAllMessages);
// app.get("/api/message/:mid/likes", helpers.getMessageLikes);
/*

New Routing System to be implemented

app.use("/api/auth")
    - POST signin
    - POST signup
app.use("/api/user")
    - Get User messages
    - Get UserProfile
    - POST Update profile
    - Get Followers
    - POST Follow
app.use("/api/messages")
    - Get AllMessages
    - Post like message
    - Get Message likes
    - Post message
    - Put Delete message


app.use("/api/discover")
    - Get Discover users

*/


const PORT = process.env.PORT;
app.listen(PORT, function(){
  console.log(`Server is listening on port ${PORT}`);
});
