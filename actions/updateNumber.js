const common = require("./Common");
const DB = require("./DB");
async function dataQuestions() {
  let data = await common.questions(
    "What is your previous name?",
    "write a new number "
  );
  await DB.updatePhoneOf(data);
}
module.exports = dataQuestions;
