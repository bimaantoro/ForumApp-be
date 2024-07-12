const Reply = require('../Reply');

describe('a Reply entities', () => {
    it('should throw error when payload did not contain needed property', () => {
        // Arrange
        const payload = {
          id: 'reply-123',
          username: 'dicoding',
          date: '2021-08-08T08:07:01.522Z',
        };
    
        // Action and Assert
        expect(() => new Reply(payload)).toThrowError('REPLY.NOT_CONTAIN_NEEDED_PROPERTY');
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
        expect(() => new Reply(payload)).toThrowError('REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION');
      });

      it('should create replies object correctly', () => {
        // Arrange
        const payload = {
          id: 'reply-123',
          username: 'dicoding',
          date: '2021-08-08T08:07:01.522Z',
          content: 'sebuah balasan',
          isDelete: true,
        };
    
        // Action
        const {
          id, username, date, content,
        } = new Reply(payload);
    
        // Assert
        expect(id).toEqual(payload.id);
        expect(username).toEqual(payload.username);
        expect(date).toEqual(payload.date);
        expect(content).toEqual('**balasan telah dihapus**');
      });
})