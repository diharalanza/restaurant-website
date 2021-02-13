Name: Dihara Lanza
Student ID: 101101894

1. Install version 10.x or 12.x of Node.js from http://nodejs.org/en/

2. I used pug to render all pages except the order.html page. Therefore you will need to install pug by opening console/terminal within my submission folder and running the command:
npm install pug

3. Next, within this submission folder, run the command:
node server.js
Once the server stores data from the restaurants directory the server should start

4. Within a browser, go to the address:
localhost:3000

4. Server should print to console restaurant data of each restaurant, name of each restaurant, summary of any new order submitted, and the stats of each restaurant with the new order included.

5. I made use of the fact that the food ID's in each restaurant are integers, which will correspond to array indices in any order that is submitted and the stats of total orders for each restaurants food item. So any extra restaurants added to the restaurants directory should work given the food ID's are integers that start from 0 and do not skip any numbers. I did Assignment1 also in this manner and had no issues.
