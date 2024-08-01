# Reward Calculator

This is built using React + Vite.
- Uses simple CSS to style the app.
- Mocks an api call to fetch customer data.
- shows a loader when data is being fetched.
- does the necessary reward calculation.

## Steps to run
 - `npm i` in the root directory.
 - `npm run dev` to start the development server.

## Overview

- the `data.json` file inside the `/public` directory holds the mock data for two customers - customer1 and customer2.
- When the app is loaded, data for customer1 is fetched. The app has two buttons two switch cutomers.
- At the bottom, the total rewards is shown.
- `data.json` can be manipulated to play around with the data.
- fetch API is used to fetch the data from the JSON file. A setTimeout is used to mock a delay.
- fetch error is handled in the catch block.


