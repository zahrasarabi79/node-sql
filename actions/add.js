const common = require("./Common");
const DB = require("./DB");
async function dataQuestions() {
  let data = await common.questions(
    "what is your name?",
    "what is your phone?"
  );
  await DB.insertIntoTable(data);
}

module.exports = dataQuestions;
