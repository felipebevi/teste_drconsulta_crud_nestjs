import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let userId: number;  

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });
  
  it('/ (GET) - carregar a pagina index.html', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Content-Type', /html/); 
  });

  it('/users (POST) - criar um novo usuario', () => {
    const newUser = {
      nome: 'teste user',
      email: 'teste@example.com',
    };

    return request(app.getHttpServer())
      .post('/users')
      .send(newUser)
      .expect(201)
      .then((response) => {
        expect(response.body.id).toBeDefined(); 
        expect(response.body.nome).toEqual(newUser.nome);
        expect(response.body.email).toEqual(newUser.email);
        
        userId = response.body.id;
      });
  });
  
  it('/users/:id (PATCH) - atualizar um usuario', () => {
    const updatedUser = {
      nome: 'updated user',
      email: 'updated@example.com',
    };

    return request(app.getHttpServer())
      .patch(`/users/${userId}`) 
      .send(updatedUser)
      .expect(200)
      .then((response) => {
        expect(response.body.nome).toEqual(updatedUser.nome);
        expect(response.body.email).toEqual(updatedUser.email);
      });
  });

  it('/users/:id (DELETE) - deletar um usuario', () => {
    return request(app.getHttpServer())
      .get(`/users/${userId}`)
      .then((response) => {
        return request(app.getHttpServer())
          .delete(`/users/${userId}`) 
          .expect(200)
          .then((deleteResponse) => {

            return request(app.getHttpServer())
              .get(`/users/${userId}`)
              .then((responseAfterDelete) => {
                return request(app.getHttpServer())
                  .get(`/users/${userId}`)
                  .expect(404); 
              });
          });
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
