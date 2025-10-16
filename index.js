const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require('./models/chat.js');
const methodOverride = require("method-override");



app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


main()
  .then(() => {
    console.log("Connection successful");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Whatsapp');
}

// Get all chats
app.get("/chats", async (req, res) => {
  try {
    let chats = await Chat.find();
    res.render("index", { chats });
  } catch (err) {
    console.error("Error fetching chats:", err);
    res.status(500).send("Error fetching chats");
  }
});

// Show form to create a new chat
app.get("/chats/new", (req, res) => {
  res.render("new");
});

// Create a new chat
app.post("/chats", async (req, res) => {
  let { from, to, msg } = req.body;
  let newChat = new Chat({
    from,
    to,
    msg,
    created_at: new Date()
  });

  try {
    await newChat.save();
    console.log("chat was saved");
    res.redirect("/chats");
  } catch (err) {
    console.error("Error saving chat:", err);
    res.status(500).send("Failed to save chat");
  }
});

//edit route
app.get("/chats/:id/edit" ,async (req , res)=>{
  let {id}= req.params;
  let chat = await Chat.findById(id);
 res.render("edit", { chat }); // ✅ CORRECT

})
//update route
app.put("/chats/:id" , async(req , res)=>{
  let {id}= req.params;
  let { msg:newMsg} = req.body;
  let updatedChat = await Chat.findByIdAndUpdate(
  id,
  { msg: newMsg },
  {
    runValidators: true, 
    new: true
  }
);

  console.log(updatedChat);
  res.redirect("/chats")
})

//destroy route
app.delete("/chats/:id" ,async (req , res)=>{
  let {id} = req.params;
  let Deleteted_chat =await Chat.findByIdAndDelete(id);
  console.log(Deleteted_chat);
  res.redirect("/chats");


})


app.get("/", (req, res) => {
  res.redirect("/chats");
});







const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server running on port ${port}`));
