const Reply = require('../../../replies/entities/Reply');
const Comment = require('../Comment');

describe('a Comment entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      id: 'comment-123',
      username: 'dicoding',
      date: '2021-08-08T07:22:33.555Z',
    };

    // Action and Assert
    expect(() => new Comment(payload)).toThrowError('COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      id: 123,
      username: 123,
      date: true,
      content: {},
      isDelete: 'false',
    };

    // Action and Assert
    expect(() => new Comment(payload)).toThrowError('COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create comment object correctly', () => {
    // Arrange
    const payload = {
      id: 'comment-123',
      username: 'dicoding',
      date: '2021-08-08T07:26:21.338Z',
      content: 'sebuah comment',
      isDelete: true,
    };

    // Action
    const {
      id, username, date, content, replies
    } = new Comment(payload);

    // Assert
    expect(id).toEqual(payload.id);
    expect(username).toEqual(payload.username);
    expect(date).toEqual(payload.date);
    expect(content).toEqual('**komentar telah dihapus**');
    expect(replies).toEqual([])
  });

  it('should throw error when replies not contain array', () => {
    // Arrange
    const payload = {
        id: 'comment-123',
        username: 'dicoding',
        date: '2021-08-08T07:19:09.775Z',
        content: 'sebuah comment',
        isDelete: false,
      };

      const comment = new Comment(payload);

      // Action and Assert
      expect(() => comment.setReplies({})).toThrowError('COMMENT.REPLIES_NOT_ARRAY');
  })

  it('should throw error when replies not contain Replies object', () => {
    // Arrange
    const payload = {
      id: 'comment-123',
      username: 'dicoding',
      date: '2021-08-08T07:59:18.982Z',
      content: 'sebuah comment',
      isDelete: false,
    };

    const comment = new Comment(payload);

    // Action and Assert
    expect(() => comment.setReplies([{}])).toThrowError('COMMENT.REPLIES.CONTAINS_INVALID_MEMBER');
  });

it('should set replies correctly', () => {
    // Arrange
    const payload = {
      id: 'comment-123',
      username: 'dicoding',
      date: '2021-08-08T07:59:18.982Z',
      content: 'sebuah comment',
      isDelete: false,
    };

    const comment = new Comment(payload);
    const replies = [
      new Reply({
        id: 'reply-123',
        content: 'sebuah balasan',
        date: '2021-08-08T08:07:01.522Z',
        username: 'dicoding',
        isDelete: false,
      }),
    ];

    // Action
    comment.setReplies(replies);

    // Assert
    expect(comment.replies).toEqual(replies);
  });
});
