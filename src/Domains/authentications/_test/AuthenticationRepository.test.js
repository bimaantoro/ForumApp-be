const AuthenticationRepository = require('../AuthenticationRepository');

describe('AuthenticationRepository interface', () => {
  it('should throw error when invoke unimplemented method', async () => {
    // Arrange
    const authenticationRepository = new AuthenticationRepository();

    // Action and Assert
    await expect(authenticationRepository.addRefreshToken('')).rejects.toThrowError('AUTHENTICATION_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(authenticationRepository.checkAvailabilityRefreshToken('')).rejects.toThrowError('AUTHENTICATION_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(authenticationRepository.deleteRefreshToken('')).rejects.toThrowError('AUTHENTICATION_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  });
});
