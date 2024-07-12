class Reply {
  constructor(payload) {
    this._verifyPayload(payload);
  }

  _verifyPayload({
    id,
    content,
    date,
    username,
    isDelete,
  }) {

  }
}

module.exports = Reply;
