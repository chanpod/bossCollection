// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

//https://us.battle.net/oauth/authorize

export const environment = {
  production: false,
  Issuer: '',
  redirectUri: 'https://www.bosscollection.net/login',
  clientId: 'fqvadba9c8auw7brtdr72vv7hfntbx7d',
  loginUrl: 'https://us.battle.net/oauth/authorize',
  logoutUrl: '',

};
