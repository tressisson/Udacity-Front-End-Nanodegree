// Running the application

1. CD to the path where the application resides
2. Start a web server to host the site.  Example: python -m SimpleHTTPServer
3. Navigate to the index.html page located in the root.  If using the python server, it would be 0.0.0.0:8000 on mac or localhost:8000 on windows.

Optimizations
Index.html
Changed location of script includes and placed google analytics at the bottom of the page.
Changed script files to load asynchronously with the async tag.
Optimized the image sizes for the page.
Changed the images to be local files instead of remote.
Minified the style.css file into an inline include with a script tag.

Pizza files
Optimized image sizes.
Minified files where possible.
Changed the pizza size rendering function and removed several of the parameters from the 'for' loop to increase speed.
Added the transition: transformZ property to the style.css
Changed changeSliderLabel function to use document.getElementByID method instead of query selector for performance improvements.
Changed function determineDX to use document.getElementByID method as above.
Changed variable pizzaContainer in changePizzaSize function to use document.getElementsByClassName method.
Moved the variable pizzasDiv outside of the 'for' loop for performance.
Changed selector to getElementsByClassName on the updatePositions function for performance.
Created new movingPizzas variable outside of the for loop in the event listener, and change method to getElementsById.
Declared the phase variable outsite of the 'for' loop on the updatePositions function.
Created a len variable for the items.length in the updatePosition to increase performance.
Declared the elem variable outside of the 'for' loop on the event listener for performance.
Created rows variable which gets the height of the current window in the event listener.
Reduced the number of pizzas by creating the pizzas variable which is a calculation of rows * cols.
