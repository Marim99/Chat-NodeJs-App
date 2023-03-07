let currDate = new Date();
class FormatMessage {
  userName;
  text;
  date = currDate.getHours() + ":" + currDate.getMinutes();
  constructor(userName, text) {
    this.userName = userName;
    this.text = text;
  }
}

module.exports = {
  FormatMessage,
};
