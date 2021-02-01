const crypto = require('crypto-js')

const netstoragePath = '/' + pm.request.url.path.join('/');
const actionHeaders = pm.request.headers.get('X-Akamai-ACS-Action');
const keyName = pm.environment.get('keyName');
const key = pm.environment.get('key');

var acs_auth_data = '';
var acs_auth_sign = '';

try {
acs_auth_data = `5, 0.0.0.0, 0.0.0.0, ${Math.floor(Date.now() / 1000)}, ${Math.floor((Math.random() * 100000))}, ${keyName}`
const sign_string = `${netstoragePath}\nx-akamai-acs-action:${actionHeaders}\n`
const message = acs_auth_data + sign_string
acs_auth_sign = crypto.enc.Base64.stringify(crypto.HmacSHA256(message, key))
} catch (err) {
throw new Error(`[Auth Error] ${err}`)
}

pm.environment.set('acsAuthData', acs_auth_data);
pm.environment.set('acsAuthSign', acs_auth_sign);
