# auth.smcdevs.support

## How to use
#### SignUp

``` 
curl -X POST \
     -H "Content-Type: application/json" \
     -d '{ "Username": "username", "Password": "password", "Email": "example@example.com" }' \
     auth.smcdevs.support/signup
```

#### SignIn
```
curl -X POST \
     -H "Content-Type: application/json" \
     -d '{ "Username": "username", "Password": "password" }' \
     auth.smcdevs.support/signin
```
