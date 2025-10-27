import { createApp, createIdentityProvider } from '@kottster/server';
import schema from '../../kottster-app.json';

/* 
 * For security, consider moving the secret data to environment variables.
 * See https://kottster.app/docs/deploying#before-you-deploy
 */
export const app = createApp({
  schema,
  secretKey: 'rsueanDpH2u7BIT3I2mc47fYJbRFisbe',
  kottsterApiToken: 'd2nweHSBvl64xv7FvLh2oynmBkQQBmJc',

  /*
   * The identity provider configuration.
   * See https://kottster.app/docs/app-configuration/identity-provider
   */
  identityProvider: createIdentityProvider('sqlite', {
    fileName: 'app.db',

    passwordHashAlgorithm: 'bcrypt',
    jwtSecretSalt: 'vSgTvfFUFeq0e1xp',
    
    /* The root admin user credentials */
    rootUsername: 'adminadmin',
    rootPassword: 'adminadmin',
  }),
});