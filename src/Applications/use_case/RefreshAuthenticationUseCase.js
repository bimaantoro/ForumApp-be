class RefreshAuthenticationUseCase {
  constructor({
    authenticationRepository,
    authenticationTokenManager,
  }) {
    this._authenticationRepository = authenticationRepository;
    this.authenticationTokenManager = authenticationTokenManager;
  }

  async execute(useCasePayload) {
    this._verifyPayload(useCasePayload);
    const { refreshToken } = useCasePayload;

    await this.authenticationTokenManager.verifyRefreshToken(refreshToken);
    await this._authenticationRepository.checkAvailabilityRefreshToken(refreshToken);

    const { username, id } = await this.authenticationTokenManager.decodePayload(refreshToken);

    return this.authenticationTokenManager.createAccessToken({ username, id });
  }

  _verifyPayload(payload) {
    const { refreshToken } = payload;

    if (!refreshToken) {
      throw new Error('REFRESH_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN');
    }

    if (typeof refreshToken !== 'string') {
      throw new Error('REFRESH_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = RefreshAuthenticationUseCase;
