# CSCI3100-GroupA1-Foodification

This is group A1's project for the course CSCI3100 Software Engineering at CUHK

## Background

Because of the tight schedule for students, faculties as well as staff, CUHK canteens are the most popular choice for them to have meals on the campus. Up to now, CUHK has 38 canteens while almost every CUHK canteen offers more than twenty different dishes per day with its menu changing over time. Different dishes, to be more specific, with different flavors as well as different prices, will make diners have a hard time making their decisions for meals. Even after being informed of what dish is prepared for that day, diners may still arrive at the canteen with the desired dish sold out, which may easily bring them a waste of energy and harmful frustration.

However, although nowadays there are platforms for course evaluation, for example RegCourse, as well as for sharing secrets, for example CU Secret, targeted at CUHK students, we cannot find such an integrated platform for dining at CUHK canteens that can combine menu sharing and dish review.

Therefore, we aim to create an information-sharing platform that can share dining information through the network. On this website, managers of each canteen can update the canteens updated menu and status. Meanwhile, diners can share their opinion on different dishes to interest or disinterest other diners. In this way, diners can be informed of what is on the menu remotely and make choices for their meals easier. And we hope that this platform can bring higher efficiency to diners and improve their dining quality.

## Frontend

Developed in HTML, CSS, JavaScript

Framework: Vue.js (Using Vue-cli)

Library and Plug-ins Used: Bootstrap, DataTables, Element UI, Vue-light-gallery, Axios

## Backend

Developed in JavaScript with Node.js

Database: MongoDB

Framework: Express

## How to start

Firstly, run backend server by executing following commands in terminal:

    $ cd server
    $ npm install
    $ nodemon

If you don't have nodemon on your machine, you may use the following command instead:

    $ npm start

Then run frontend in another terminal under 

    $ cd client/my-project
    $ npm install
    $ npm run dev

Finally visit localhost:8080 in browser:)

