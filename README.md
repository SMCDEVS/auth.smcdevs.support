# auth.smcdevs.support

## How to use
#### SignUp

``` 
curl -X POST auth.smcdevs.support/signup \
     -H "Content-Type: application/json" \
     -d '{ "Username": "username", "Password": "password", "Email": "example@example.com" }'
```

#### SignIn
```
curl -X POST auth.smcdevs.support/signin \
     -H "Content-Type: application/json" \
     -d '{ "Username": "username", "Password": "password" }'
```