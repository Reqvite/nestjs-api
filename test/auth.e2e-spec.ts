import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { disconnect } from 'mongoose';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { AuthDto } from 'src/auth/dto/auth.dto';

const loginDto: AuthDto = {
  login: 'test@a.gmail.com',
  password: 'test',
};

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/auth/login (POST) - success', async () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send(loginDto)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body.access_token).toBeDefined();
      });
  });

  it('/auth/login (POST) - fail', async () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        login: 'test@a.gmail.com',
        password: 'test1',
      })
      .expect(401);
  });

  afterAll(() => {
    disconnect();
  });
});
