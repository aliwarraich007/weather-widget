To run the tests:

ng test --include ./src/app/services/api/weather.api.service.spec.ts
ng test --include ./src/app/services/api/pip.spec.ts



To login:

just press the login button, I've given default username password to the feilds already.

Usage flow:

1. After logging in, the system will ask to use your current location to fetch weather details, however if you do not allow, default location values will be used.
2. You can search for any city with valid name, if it exists, the system will fetch current weather for that city, however if it's invalid, an error message will be displayed.
