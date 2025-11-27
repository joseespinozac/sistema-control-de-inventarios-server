// src/config/oauthServer.ts
import OAuth2Server, {
  Request as OAuthRequest,
  Response as OAuthResponse,
} from "oauth2-server";
import { User, AccessToken, RefreshToken, Client } from "../data/models"; // Adjust the path as necessary

const oauth = new OAuth2Server({
  model: {
    getAccessToken: async (token: string) => {
      const accessToken = await AccessToken.findOne({ where: { token } });
      if (!accessToken) return null;
      return {
        accessToken: accessToken.token,
        accessTokenExpiresAt: accessToken.expiresAt,
        client: { id: accessToken.clientId },
        user: { id: accessToken.userId },
      };
    },
    getClient: async (clientId: string, clientSecret: string) => {
      const client = await Client.findOne({
        where: { clientId, clientSecret },
      });
      if (!client) return null;
      return {
        id: client.clientId,
        grants: ["password", "refresh_token"],
        redirectUris: client.redirectUris,
      };
    },
    getRefreshToken: async (token: string) => {
      const refreshToken = await RefreshToken.findOne({ where: { token } });
      if (!refreshToken) return null;
      return {
        refreshToken: refreshToken.token,
        refreshTokenExpiresAt: refreshToken.expiresAt,
        client: { id: refreshToken.clientId },
        user: { id: refreshToken.userId },
      };
    },
    saveToken: async (token: any, client: any, user: any) => {
      const accessTokenExpiresIn = 60 * 60 * 2; // 2 hours in seconds
      const refreshTokenExpiresIn = 60 * 60 * 24 * 30; // 30 days in seconds

      const accessToken = await AccessToken.create({
        token: token.accessToken,
        expiresAt: new Date(Date.now() + accessTokenExpiresIn * 1000), // Add 2 hours
        clientId: client.id,
        userId: user.id,
      });

      const refreshToken = await RefreshToken.create({
        token: token.refreshToken,
        expiresAt: new Date(Date.now() + refreshTokenExpiresIn * 1000), // Add 30 days
        clientId: client.id,
        userId: user.id,
      });

      return {
        accessToken: accessToken.token,
        accessTokenExpiresAt: accessToken.expiresAt,
        refreshToken: refreshToken.token,
        refreshTokenExpiresAt: refreshToken.expiresAt,
        client: { id: client.id },
        user: { id: user.id },
      };
    },
    getUser: async (username: string, password: string) => {
      const user = await User.scope("withPassword").findOne({
        where: { email: username },
      });
      if (!user || !(await user.verifyPassword(password))) return null;
      return user;
    },
  },
});

export default oauth;
