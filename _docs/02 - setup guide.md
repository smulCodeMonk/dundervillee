# Setup Guide

TBD

## (FIXME) Secure local development

FIXME: Make https the default.

Start secure development server with `npm run dev:https`.

Certificate was generated via openssl

```fish
openssl req -x509 -out localhost.crt -keyout localhost.key \
    -newkey rsa:2048 -nodes -sha256 \
    -subj '/CN=localhost' -extensions EXT -config (
    printf "[dn]\nCN=localhost\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth"| psub)
```

_Imporant_

Click on the crt file, on macOS the keychain app will open, add the key to it.

Now double click on it and under the trust section you will see “When using this certificate” select “Always Trust”.
