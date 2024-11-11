export const environment = {
  production: true,
  apiBaseUrl: 'https://toitsu-staging.open1.eu/toitsuapi',
  keycloak: {
    issuer: 'https://keycloak-staging.open1.eu',
    realm: 'staging',
    clientId: 'toitsu-view',
    roleClientId: 'toitsu-api'
  },
  kcmUrl: 'https://kcm-staging.open1.eu'
};
