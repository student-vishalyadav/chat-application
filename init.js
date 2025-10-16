const mongoose = require("mongoose");
const Chat = require("./models/chat"); // assuming this exports the Chat model


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


    let allchats = [
      {
        from: "neha",
        to: "priya",
        msg: "send me your exam sheets",
        createdAt: new Date()
      },
      {
        from: "rajesh",
        to: "riya",
        msg: "hii !",
        createdAt: new Date()
      },
      {
        from: "sonu",
        to: "ridhi",
        msg: "hello babu",
        createdAt: new Date()
      },
      {
        from: "Anuj",
        to: "jriya",
        msg: "kaise ho!",
        createdAt: new Date()
      },
      {
        from: "reha",
        to: "shriya",
        msg: "no one here so you are come on",
        createdAt: new Date()
      },
      {
        from: "raju",
        to: "priya",
        msg: "i have a pen!",
        createdAt: new Date()
      },
    ];

   Chat.insertMany(allchats);
   