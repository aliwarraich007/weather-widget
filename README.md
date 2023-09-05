<h2>To run the tests:</h2>
<hr>

<ol>
  <li>
    ng test --include ./src/app/services/api/weather.api.service.spec.ts
  </li>
  <li>
  ng test --include ./src/app/services/api/pipe.spec.ts
</li> 
</ol>


<h2>To login:</h2>
just press the login button, I've given default username password to the feilds already.
<hr>
<h2>Usage flow:</h2>
<ol>
<li> 
After logging in, the system will ask to use your current location to fetch weather details, however if you do not allow, default location values will be used.
</li>
<li>
You can search for any city with valid name, if it exists, the system will fetch current weather for that city, however if it's invalid, an error message will be displayed.
</li>
<li>
Deployment link is in the repositery about section.
</li>
</ol>
