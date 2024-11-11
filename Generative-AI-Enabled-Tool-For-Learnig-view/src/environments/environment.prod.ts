export const environment = {
  production: true,
  apiBaseUrl: 'https://toitsu.open1.eu/toitsuapi',
  keycloak: {
    issuer: 'https://keycloak.open1.eu',
    realm: 'prod',
    clientId: 'toitsu-view',
    roleClientId: 'toitsu-api'
  },
  kcmUrl: 'https://kcm.open1.eu'
};
