const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const AddThreadUseCase = require('../AddThreadUseCase');

describe('AddThreadUseCase', () => {
  it('should orchestrating the add thread action correctly', async () => {
    // Arrange
    const mockThreadRepository = new ThreadRepository();
    const mockReturnAddedThread = {
      id: 'thread-123',
      title: 'title of thread',
      owner: 'user-123',
    };

    mockThreadRepository.addThread = jest.fn()
      .mockImplementation(() => Promise.resolve(mockReturnAddedThread));

    const useCase = new AddThreadUseCase({
      threadRepository: mockThreadRepository,
    });

    const useCasePayload = {
      title: 'title of thread',
      body: 'body of thread',
      owner: 'user-123',
    };

    const expectedAddedThread = {
      id: 'thread-123',
      title: 'title of thread',
      owner: 'user-123',
    };
  });
});
