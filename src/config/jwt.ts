export const jwt = {
  accessToken: {
    // lifeTime: "15min",
    /**
     * In seconds.
    */
    lifeTime: 30 * 60,
    secret: "access-token-secret",
  },
  refreshToken: {
    // lifeTime: "7d",
    /**
     * In seconds.
    */
    lifeTime: 7 * 24 * 60 * 60,
    // lifeTime: 30 * 60,
    secret: "refresh-token-secret",
    cookieName: "refresh_token",
  },
};

export type JwtConfig = typeof jwt;
