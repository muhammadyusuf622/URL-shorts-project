const {readJSONFile, writeToFile} = require("../helpers/fs");
const path = require("node:path")

exports.getAllUsers = (req,res) => {
  const filePath = path.join(__dirname, "..", "data", "users.json");
  const users = readJSONFile(filePath);

  res.send(users);
};

exports. register = (req,res) => {
  const {name, email , password} = req.body
  const filePath = path.join(__dirname, "..", "data", "users.json");
  const users = readJSONFile(filePath)

  const foundedUser = users.find((us) => us.email === email && us.password == password);

  if(!foundedUser){
    res.status(409).send({
      message:"Bunday email va password user allaqachin bor"
    });
    return
  }

  const newUser = {
    id: users.at(-1)?.id +1 || 1,
    name,
    email,
    password
  };

  users.push(newUser);

  writeToFile(filePath, users);

  res.redirect("/")
};

exports. login = (req,res) => {
  const {email , password} = req.body
  const filePath = path.join(__dirname, "..", "data", "users.json");
  const users = readJSONFile(filePath)

  const foundedUser = users.find((us) => us.email === email && us.password == password);

  if(!foundedUser){
    res.status(404).send({
      message:"Bunday foydalanuvchi mavjud emas"
    });
    return
  }

  res.redirect("/")
};

exports.deleteUser = (req,res) => {

  const { id } = req.params;

  if(!Number(id)){
    res.status(400).send({
      message: `Give ID: ${id} is not a number`
    });
    return;
  };

  const filePath = path.join(__dirname, "..", "data", "users.json");
  const users = readJSONFile(filePath);

  const foundedUserIndex = users.findIndex(us => us.id == id);

  if(foundedUserIndex === -1){
    return res.status(404).send({
      message:"Bunday foydalanuvchi topilmadi"
    });
  };


  users.splice(foundedUserIndex, 1);

  writeToFile(filePath, users);

  res.status(204).send();

};