import * as request from 'supertest';
import { app } from './setup/e2e';

describe('WishController (e2e)', () => {
  it('/wish (POST)', () => {
    return request(app.getHttpServer()).post('/wish').expect(400)
      .expect(`<html lang='en'>
  <head>
    <title>Santa Data</title>
    <link
      id='favicon'
      rel='icon'
      href='https://glitch.com/edit/favicon-app.ico'
      type='image/x-icon'
    />
    <meta charset='utf-8' />
    <meta name='viewport' content='width=device-width, initial-scale=1' />
    <link rel='stylesheet' href='/style.css' />
    <script src='/client.js' defer></script>
  </head>

  <body>
    <header>
      <h1>A letter to Santa</h1>
    </header>

    <main>
      <p class='bold'>
        There was an error submitting your wish to santa:
      </p>
      <p>
        You&#x27;re are not registered, so we could not deliver you wish.
      </p>
    </main>
  </body>
</html>`);
  });
});
