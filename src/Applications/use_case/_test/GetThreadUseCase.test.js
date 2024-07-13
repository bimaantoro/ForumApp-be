const CommentRepository = require('../../../Domains/comments/CommentRepository');
const Comment = require('../../../Domains/comments/entities/Comment');
const Thread = require('../../../Domains/threads/entities/Thread');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const GetThreadUseCase = require('../GetThreadUseCase');

describe('GetThreadUseCase', () => {
  it('should throw error when thread is not found', async () => {
    // Arrange
    const mockThreadRepository = new ThreadRepository();
    mockThreadRepository.getThreadById = jest.fn()
      .mockImplementation(() => Promise.resolve(null));

    const mockCommentRepository = new CommentRepository();

    const useCase = new GetThreadUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
    });

    const expectedError = new Error('GET_THREAD_USE_CASE.THREAD_NOT_FOUND');

    // Action and Assert
    await expect(useCase.execute('thread-123')).rejects.toThrowError(expectedError);
  });

  it('should orchestrating the get thread action correctly', async () => {
    // Arrange
    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();

    const mockThread = new Thread({
      id: 'thread-123',
      title: 'sebuah thread',
      body: 'body thread',
      date: new Date().toISOString(),
      username: 'dicoding',
    });

    const mockComments = [
      new Comment({
        id: 'comment-123',
        username: 'dicoding',
        date: new Date().toISOString(),
        content: 'sebuah comment',
        isDelete: false,
      }),
    ];

    mockThreadRepository.getThreadById = jest.fn()
      .mockImplementation(() => Promise.resolve(mockThread));
    mockCommentRepository.getCommentsByThreadId = jest.fn()
      .mockImplementation(() => Promise.resolve(mockComments));

    const useCase = new GetThreadUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
    });

    // action
    const thread = await useCase.execute('thread-123');

    // Assert
    expect(thread.id).toEqual('thread-123');
    expect(thread.title).toEqual('sebuah thread');
    expect(thread.body).toEqual('body thread');
    expect(thread.date).toBeDefined();
    expect(thread.username).toEqual('dicoding');
    expect(thread.comments).toHaveLength(1);
    expect(thread.comments[0].id).toEqual('comment-123');
    expect(thread.comments[0].username).toEqual('dicoding');
    expect(thread.comments[0].content).toEqual('sebuah comment');

    // validate mock function call
    expect(mockThreadRepository.getThreadById).toHaveBeenCalledWith('thread-123');
    expect(mockCommentRepository.getCommentsByThreadId).toHaveBeenCalledWith('thread-123');
  });
});
