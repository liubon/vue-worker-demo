export default class Cards {
  constructor(id, length) {
    this.SL = length;
    this.count = 0;
    this.CardId = id;
  }
  list = [];
  addCards(sid, section) {
    if (this.CardId == sid) {
      this.count++;
      this.list = this.list.concat(section);
    }
    if (this.count == this.SL) {
      return this.list;
    } else {
      return [];
    }
  }
  empty() {
    this.list = [];
  }
  get() {
    return this.list;
  }
}
