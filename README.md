# Lab 5: Platform API

*Sets up a server for blog ost frontend.*

[deployed url](https://platform-api-lab-5.herokuapp.com/)

## What Worked Well
I thought the models, routes and controllers were easy to follow. I liked that we used a different syntax for async await from SA 7. Deployment was not too difficult and now we have a persistent backend and our own server!

## What Didn't
I initially had an issue with my calls just stalling and never returning promises. This was a frusterating issue to debug, but I just restarted the instructions and I forgot to `npm install mongoose`. I did this in SA 7 too!

## Extra Credit
I set up tags as a string aray and split on space. I also updated the frontend to display accordingly. I also added a comments section on each post. They are separated by commas and appear as a list at the bottom of a post on single post view. I initally stored both of these fields as a string aray in my model but this required some interesting work on update function so I decided to store as a string and split accoridngly on the frontend. Then, I mapped each string array to create the appropriate html.

## Screenshots
Same as lab 4! No frontend updates.