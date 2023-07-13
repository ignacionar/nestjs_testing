import { NestMiddleware } from "@nestjs/common";
import { Injectable } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import * as firebase from 'firebase-admin';
import * as serviceAccount from './nest-firebase-d90cb-firebase-adminsdk-759xw-153269fb39.json';

const firebase_params = {
  type: serviceAccount.type,
  projectId: serviceAccount.project_id,
  privateKeyId: serviceAccount.private_key_id,
  privateKey: serviceAccount.private_key,
  clientEmail: serviceAccount.client_email,
  clientId: serviceAccount.client_id,
  authUri: serviceAccount.auth_uri,
  tokenUri: serviceAccount.token_uri,
  authProviderCertUrl: serviceAccount.auth_provider_x509_cert_url,
  certUrl: serviceAccount.client_x509_cert_url,
  universe_domain: serviceAccount.universe_domain
}

interface CustomRequest extends Request {
  user?: { email: string }
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private defaultApp: any;

  constructor() {
    this.defaultApp = firebase.initializeApp({
      credential: firebase.credential.cert(firebase_params),
      databaseURL: "https://nest-firebase-d90cb-default-rtdb.firebaseio.com/"
    })
  }

  use(req: CustomRequest, res: Response, next: NextFunction) {
    const token = req.query.idToken;

    if (token) {

      this.defaultApp.auth().verifyIdToken(token)
      .then(async (decodedToken: any) => {
        const user = {
          email: decodedToken.email
        }

        req['user'] = user;

        next();
      })
      .catch((error: any) => {
      console.error(error);
        this.accessDenied(req.url, res)
      })
    } else {
      this.accessDenied(req.url, res)
    }
  }


  private accessDenied(url: string, res: Response) {
    res.status(403).json({
      statusCode: 403,
      timeStamp: new Date().toISOString(),
      path: url,
      message: 'Access Denied'
    })
  }
}