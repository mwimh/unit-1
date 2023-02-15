// Creates the function 'cities', which creates the HTML table containing the city names, populations, and headers
function cities() {
    // Creates an array of cities and corresponding populations called 'cityPop'
    var cityPop = [
        // The four cities and their populations
        {
            city: 'Madison',
            population: 233209
        },
        {
            city: 'Milwaukee',
            population: 594833
        },
        {
            city: 'Green Bay',
            population: 104057
        },
        {
            city: 'Superior',
            population: 27244
        }
    ];

    // Create the table element (from example 2.3)
    var table = document.createElement("table");

    // Create a header row (from example 2.3)
    var headerRow = document.createElement("tr");

    // Add the "City" and "Population" columns to the header row (from example 2.3)
    headerRow.insertAdjacentHTML("beforeend", "<th>City</th><th>Population</th>")

    // Add the row to the table (from example 2.3)
    table.appendChild(headerRow);

    // Loop to add a new row for each city (from example 2.3)
    for (var i = 0; i < cityPop.length; i++) {
        // Assign longer html strings to a variable (from example 2.3)
        var rowHtml = "<tr><td>" + cityPop[i].city + "</td><td>" + cityPop[i].population + "</td></tr>";
        // Add the row's html string to the table (from example 2.3)
        table.insertAdjacentHTML('beforeend', rowHtml);
    };
    // Append 'mydiv' with the newly created table (from example 2.3)
    document.querySelector("#mydiv").appendChild(table);

    // Run the 'addColumns' and 'addEvents' function defined later
    addColumns(cityPop);
    addEvents();
    debugAjax();


};

// Create the function 'addColumns' with 'cityPop' as a variable
function addColumns(cityPop) {
    // Find the rows in the table created earlier and for each row, run a new function with the variables 'row' and 'i' defined in the following lines
    document.querySelectorAll("tr").forEach(function (row, i) {
        // Beginning of an IF statement for when i = 0
        if (i == 0) {
            // If i = 0, creates a header in the table with then name 'City Size'
            row.insertAdjacentHTML('beforeend', '<th>City Size</th>');
        } else {
            // If i =/= 0, creates a variable called 'citySize' with null value
            var citySize;
            // Checks if the i-1 city has a population of < 100,000 and if it does, the citySize variable becomes 'Small'
            if (cityPop[i - 1].population < 100000) {
                citySize = 'Small';
                // If the citySize variable was not < 100,000, checks if the i-1 city has a population of < 500,000 and if it does, the citySize variable becomes 'Medium'
            } else if (cityPop[i - 1].population < 500000) {
                citySize = 'Medium';
                // If the citySize variable is not < 100,000 and < 500,000, it becomes 'Large'
            } else {
                citySize = 'Large';
            };
            // Inserts the citySize variable into the table between table data tags
            row.insertAdjacentHTML('beforeend', '<td>' + citySize + '</td>');
        };
    });
};


// Creates a function called addEvents to be defined in the following lines
function addEvents() {
    // Searches the HTML document for an element called 'table' and labels that element 'tableEvent' to be used instead of the longer querySelector syntax later in the code
    tableEvent = document.querySelector("table");
    // Adds an event listener to the table that is waiting for a mouse-over and when it happens, it runs the function defined in the following lines
    tableEvent.addEventListener("mouseover", function () {
        // Createss a varaiable called 'tableColor' with a value of 'rgb(' that is the beginning of an RGB color
        var tableColor = "rgb(";
        // Start a FOR loop with variable 'i' starting at 0, the loop ends when i reaches 3, and i is increased by 1 each time it loops
        for (var i = 0; i < 3; i++) {
            // Create a variable called 'random' that generates a random number between 0 and 255
            var random = Math.round(Math.random() * 255);
            // Add the randomly genereated number to the tableColor variable
            tableColor += random;
            // When i is less than 2, add a comma to the tableColor variable to separate the randomly generated numbers
            if (i < 2) {
                tableColor += ",";
                //  When i equals 2 (the end of the loop), add a ')' to finish the RGB color
            } else {
                tableColor += ")";
            };
        };
        // Apply the randomly generated color to the table
        tableEvent.style.color = tableColor;

    });
    // Create a function called 'clickMe'
    function clickMe() {
        // Create an alert message when the clickMe function is run
        alert('Hey, you clicked me!');
    };
    // Add an event listener to the table that is waiting for a click, when it happens, run the clickMe function
    tableEvent.addEventListener("click", clickMe)

};


// create function to be used later that displays the .json file on the webpage
function debugCallback(response) {
    // finds 'mydiv' in the html document and adds text and the .json file converted to a string
    document.querySelector("#mydiv").insertAdjacentHTML('beforeend', '<br>GeoJSON data: <br>' + JSON.stringify(response))
};

// Creates a function that fetches and converts the MegaCities file to a usuable .json file
function debugAjax() {
    // fetches the data specified, the MegaCities.geojson file stored in the 'data' folder
    fetch("data/MegaCities.geojson")
        // after the data is retrieved, a function is run to convert the data into a .json file and the converted data is returned as the variable 'response'
        .then(function (response) {
            return response.json()
        })
        // After the conversion is run, the callback function is run to insert the data into the HTML code
        .then(debugCallback);
};

// When the DOM content is fully loaded, run the cities function defined earlier
document.addEventListener('DOMContentLoaded', cities)