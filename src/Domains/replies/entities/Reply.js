class Reply {
  constructor(payload) {
    this._verifyPayload(payload);

    const {id, username, content, date, isDelete} = payload;

    this.id = id;
    this.username = username;
    this.date = date;
    this.content = isDelete ? '**balasan telah dihapus**' : content;
  }

  _verifyPayload({
    id,
    username,
    date,
    content,
    isDelete,
  }) {
    if(!id || !username || !content || isDelete === undefined || isDelete === null) {
        throw new Error('REPLY.NOT_CONTAIN_NEEDED_PROPERTY')
    }

    if(typeof id !== 'string' || typeof username !== 'string' || typeof date !== 'string' || typeof content !== 'string' || typeof isDelete !== 'boolean') {
        throw new Error('REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION')
    }
  }
}

module.exports = Reply;
