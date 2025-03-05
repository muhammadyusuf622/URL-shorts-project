const fs = require("node:fs")

const readJSONFile = (filePath) => {
  try{

    const data = fs.readFileSync(filePath, "utf-8");
    return data.length ? JSON.parse(data) : [];
  }catch (err){
    console.error(err.message);
  }
};

const writeToFile = (filePath, data) => {

  fs.writeFile(filePath, JSON.stringify(data, null, 4), "utf8" , (err) => {
    if(err){
      console.error("File yozishda xatolik")
    } else{
      console.log("File Mufoqyatli yozildi")
    }
  });
};


module.exports = {readJSONFile, writeToFile};