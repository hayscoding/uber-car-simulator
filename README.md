# UBER Car Simulator (for Uber Clone Course)
Simple server to simulate local cars &amp; update their coords to Firebase.

# Installation
1. Run `git clone https://github.com/HaysS/uber-car-simulator.git` to clone the repo.
2. Run `cd uber-car-simulator` & then `npm install`
3. Copy `.env.example` to `.env` & add your Google Directions API & Firebase credentials (DO NOT COMMIT THIS FILE!)
4. Run `DEBUG=myapp:* npm start`
5. Server should now be running & viewable at `http://localhost:3000/`

# Using the Simulator
 
## Adding Custom Routes with Addresses Near You
- Navigate to `/utils/DirectionsAPI.js` in your text editor
- Replace the JS Objects in the `routesNearHome` array with any number of addresses that you want. 

I just find nearby addresses, then copy & paste from Google. These addresses are used to create coords from the origin to the destination address. This is what the car travels along, back & forth.
