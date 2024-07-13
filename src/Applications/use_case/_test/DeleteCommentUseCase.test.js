const CommentRepository = require('../../../Domains/comments/CommentRepository');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const DeleteCommentUseCase = require('../DeleteCommentUseCase');

describe('DeleteCommentUseCase', () => {
  it('should throw error when thread is not exists', async () => {
    // Arrange
    const useCasePayload = {
      id: 'comment-123',
      threadId: 'thread-123',
      owner: 'user-123',
    };

    const mockThreadRepository = new ThreadRepository();
    mockThreadRepository.isThreadExist = jest.fn()
      .mockImplementation(() => Promise.resolve(false));

    const mockCommentRepository = new CommentRepository();

    const useCase = new DeleteCommentUseCase({
      commentRepository: mockCommentRepository,
      threadRepository: mockThreadRepository,
    });

    const expectedError = new Error('DELETE_COMMENT_USE_CASE.THREAD_NOT_FOUND');

    // Action and Assert
    await expect(useCase.execute(useCasePayload)).rejects.toThrowError(expectedError);
    expect(mockThreadRepository.isThreadExist).toHaveBeenCalledWith(useCasePayload.threadId);
  });

  it('should throw error when comment is not exists', async () => {
    // Arrange
    const useCasePayload = {
      id: 'comment-123',
      threadId: 'thread-123',
      owner: 'user-123',
    };

    const mockThreadRepository = new ThreadRepository();
    mockThreadRepository.isThreadExist = jest.fn()
      .mockImplementation(() => Promise.resolve(true));

    const mockCommentRepository = new CommentRepository();
    mockCommentRepository.isCommentExist = jest.fn()
      .mockImplementation(() => Promise.resolve(false));

    const useCase = new DeleteCommentUseCase({
      commentRepository: mockCommentRepository,
      threadRepository: mockThreadRepository,
    });

    const expectedError = new Error('DELETE_COMMENT_USE_CASE.COMMENT_NOT_FOUND');

    // Action and Assert
    await expect(useCase.execute(useCasePayload)).rejects.toThrowError(expectedError);
    expect(mockThreadRepository.isThreadExist).toHaveBeenCalledWith(useCasePayload.threadId);
    expect(mockCommentRepository.isCommentExist).toHaveBeenCalledWith(useCasePayload.id);
  });

  it('should throw error when user is not comment owner', async () => {
    // Arrange
    const useCasePayload = {
      id: 'comment-123',
      threadId: 'thread-123',
      owner: 'user-123',
    };

    const mockThreadRepository = new ThreadRepository();
    mockThreadRepository.isThreadExist = jest.fn()
      .mockImplementation(() => Promise.resolve(true));

    const mockCommentRepository = new CommentRepository();
    mockCommentRepository.isCommentExist = jest.fn()
      .mockImplementation(() => Promise.resolve(true));
    mockCommentRepository.isCommentOwner = jest.fn()
      .mockImplementation(() => Promise.resolve(false));

    const useCase = new DeleteCommentUseCase({
      commentRepository: mockCommentRepository,
      threadRepository: mockThreadRepository,
    });

    const expectedError = new Error('DELETE_COMMENT_USE_CASE.COMMENT_NOT_OWNED');

    // Action and Assert
    await expect(useCase.execute(useCasePayload)).rejects.toThrowError(expectedError);
  });

  it('should orchestrating the delete comment action correctly', async () => {
    // Arrange
    const useCasePayload = {
      id: 'comment-123',
      threadId: 'thread-123',
      owner: 'user-123',
    };

    const mockThreadRepository = new ThreadRepository();
    mockThreadRepository.isThreadExist = jest.fn()
      .mockImplementation(() => Promise.resolve(true));

    const mockCommentRepository = new CommentRepository();
    mockCommentRepository.isCommentExist = jest.fn()
      .mockImplementation(() => Promise.resolve(true));
    mockCommentRepository.isCommentOwner = jest.fn()
      .mockImplementation(() => Promise.resolve(true));
    mockCommentRepository.deleteComment = jest.fn()
      .mockImplementation(() => Promise.resolve());

    const useCase = new DeleteCommentUseCase({
      commentRepository: mockCommentRepository,
      threadRepository: mockThreadRepository,
    });

    // action
    await useCase.execute(useCasePayload);

    // Assert
    expect(mockThreadRepository.isThreadExist).toHaveBeenCalledWith(useCasePayload.threadId);
    expect(mockCommentRepository.isCommentExist).toHaveBeenCalledWith(useCasePayload.id);
    expect(mockCommentRepository.isCommentOwner).toHaveBeenCalledWith(
      useCasePayload.id,
      useCasePayload.owner,
    );
    expect(mockCommentRepository.deleteComment).toHaveBeenCalledWith(useCasePayload.id);
  });
});
