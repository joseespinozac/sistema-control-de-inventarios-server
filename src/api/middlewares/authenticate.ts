import { Request, Response, NextFunction } from 'express';
import { Request as OAuthRequest, Response as OAuthResponse } from 'oauth2-server';
import oauth from '../../config/oauthServer';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const request = new OAuthRequest(req);
  const response = new OAuthResponse(res);

  oauth.authenticate(request, response)
    .then((token) => {
      // Token is valid, proceed to the next middleware or route handler
      next();
    })
    .catch((err) => {
      // Token is invalid, send an unauthorized response
      res.status(err.code || 500).json(err);
    });
};