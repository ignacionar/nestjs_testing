import { Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(private readonly service: LoginService) {}

  @Post()
  async login(@Req() req: Request, @Res() res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
      res.send('Please provide a valid email and password').status(400)
    }

    const idToken = await this.service.firebaseLogin(email, password)

    if (idToken) {
      res.redirect(`/authorized?idToken=${idToken}`);
    } else {
      res.send('User does not exist. Incorrect email/password').status(401)
    }
  }
}
