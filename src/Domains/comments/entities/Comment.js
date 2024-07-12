class Comment {
  constructor(payload) {
    this._verifyPayload(payload);
  }

  _verifyPayload({
    id,
    username,
    date,
    content,
    isDelete,
  }) {
    if (!id || !username || !date || !content || !isDelete === undefined === null) {
      throw new Error('COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    }
  }
}

module.exports = Comment;
