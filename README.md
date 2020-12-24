# UBER Car Simulator (for Uber Clone Course)
Simple server to simulate local cars &amp; update their coords to Firebase.

# Installation
1. Run `git clone https://github.com/HaysS/uber-car-simulator.git` to clone the repo.
2. Run `cd uber-car-simulator` & then `npm install`
3. Copy `.env.example` to `.env` & add your Google Directions API & Firebase credentials (DO NOT COMMIT THIS FILE!)
4. Run `DEBUG=myapp:* npm start`
5. Server should now be running & viewable at `http://localhost:3000/`

# Using the Simulator
## To Store Your Simulator Coordinates
Navigate to `http://localhost:3000/simulator/store` to store coordinates for the routes laid out in `utils/DirectionsAPI.js`. This will parse the addresses & store an array of route coordinates for the Simulator to run your cars through.

## To See Your Simulator Coordinates
Making sure your Firebase & Google Directions API credentials are set up correctly, navigate to `http://localhost:3000/simulator/data`. This will display all coordinates the simulator will use when running. (If you haven't added custom addresses in DirectionsAPI.js, it will be empty).
 
## To Start Your Simulator
Making sure you have coordinates stored by viewing `http://localhost:3000/simulator/data`, navigate to `http://localhost:3000/simulator/start` in your browser & you can now see the coordinates being updated, in real-time, within your firebase database.

# Adding Custom Routes with Addresses Near You
- Navigate to `/utils/DirectionsAPI.js` in your text editor
- Replace the JS Objects in the `routesNearHome` array with any number of addresses that you want. 

I just find nearby addresses, then copy & paste from Google. These addresses are used to create coords from the origin to the destination address. This is what the car travels along, back & forth.
