class AuthenticationRepository {
  async addRefreshToken(refreshToken) {
    throw new Error('AUTHENTICATION_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async checkAvailabilityRefreshToken(refreshToken) {
    throw new Error('AUTHENTICATION_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async deleteRefreshToken() {
    throw new Error('AUTHENTICATION_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
}

module.exports = AuthenticationRepository;