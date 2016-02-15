'use strict';

// Global variables (recomended by Google API developer documentation)
var map;
var infoWindow;

// Create Google Map
var Map = function () {
    
    // Map settings for centering on Dallas TX
    var mapsOption = {
        center: { lat: 32.7767, lng: -96.7970 },
        disableDefaultUI: true,
        zoom: 12
    };

    // Instantiate global map variable
    map = new google.maps.Map(document.getElementById('map-canvas'), mapsOption);

    // Instantiate global info window
    infoWindow = new google.maps.InfoWindow({
        maxWidth: 240
    });
    return true;
};

/* View Model */
var ViewModel = function () {

    // Reference to ViewModel
    var self = this;

    // Information about a single map location
    this.Location = function (title, lat, lng, keyWord, street, city) {

        // Location Information
        this.title = ko.observable(title);
        this.lat = ko.observable(lat);
        this.lng = ko.observable(lng);
        this.keyWord = ko.observableArray(keyWord);
        this.street = ko.observable(street);
        this.city = ko.observable(city);

        // Create map marker (code example from Google API documentation)
        this.marker = new google.maps.Marker({
            position: new google.maps.LatLng(lat, lng),
            animation: google.maps.Animation.DROP,
            title: title
        });

        // Google Street View (code example from Google API documentation)
        this.streetViewImg = ko.observable('<img class="bgimg" src="http://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + street + ', ' + city + '">');

        // NYTimes info
        this.nytInfo = ko.observable('');

        // Current location for use in event handlers
        var temp = this;

        // Infowindow information 
        this.info = ko.computed(function () {
            return '<div class="infoWindow"><h3>' + temp.title() + '</h3><div>' +
                temp.keyWord().join(', ') + '<br><br>' +
                temp.nytInfo() + '<br>' +
                '<div class="hidden-xs hidden-sm col-md-12">' + temp.streetViewImg() + '</div></div></div>';
        });

        // Add click event to show info window (code example from Google API documentation)
        google.maps.event.addListener(this.marker, 'click', function () {
            temp.showMe();
        });

        this.showMe = function () {
            infoWindow.setContent(temp.info());
            infoWindow.open(map, temp.marker);
            toggleBounce();
        };

        //adding animation to marker
        function toggleBounce() {
            if (temp.marker.getAnimation() !== null) {
                temp.marker.setAnimation(null);
            } else {
                temp.marker.setAnimation(google.maps.Animation.BOUNCE);
                setTimeout(function(){ temp.marker.setAnimation(null); }, 750);
            }
        }

        // Set marker map
        this.marker.setMap(map);
    };

    // A list of all location objects
    this.generateLocationList = function () {

        // Declare variables
        var locations = [];
        var keyWord;

        // Instantiate all locations (code example from Google API documentation)
        keyWord = ['history', 'landmark'];
        locations.push(ko.observable(new self.Location('Dealy Plaza', 32.7786, -96.8083, keyWord, 'Dealy Plaza', 'Dallas, TX')));

        keyWord = ['sports', 'basketball'];
        locations.push(ko.observable(new self.Location('American Airlines Center', 32.7906, -96.8103, keyWord, '2500 Victory Ave', 'Dallas TX')));

        keyWord = ['sports', 'football'];
        locations.push(ko.observable(new self.Location('Cowboys AT&T Stadium', 32.7478, -97.0928, keyWord, '1 ATT Way', 'Arlington, TX')));

        keyWord = ['sports', 'baseball'];
        locations.push(ko.observable(new self.Location('Ballpark at Arlington', 32.7516, -97.0824, keyWord, '1000 Ballpark Way', 'Arlington, TX')));

        keyWord = ['sports', 'football', ];
        locations.push(ko.observable(new self.Location('Cotton Bowl Stadium', 32.775949, -96.764128, keyWord, '3750 The Midway', 'Dallas, TX')));

        return locations;
    };
    this.allLocations = ko.observable(this.generateLocationList());

    // Initial value for search field
    var defaultString = '';

    // Search
    this.searchString = ko.observable(defaultString);

    // Computed observable
    this.locations = ko.computed(function () {

        var filteredLocations = ko.observableArray();
        var filter = self.searchString().toLowerCase();

        self.allLocations().forEach(function (location) {

            location().marker.setVisible(false);
            infoWindow.close();

            // See if filter has has text to filter with
            if (location().title().toLowerCase().indexOf(filter) != -1 || self.searchString() === defaultString) {
                filteredLocations.push(location());
                location().marker.setVisible(true);
            }
            else {
                var words = location().keyWord();
                var len = words.length;
                // Go over all of the words
                for (var i = 0; i < len; i++) {
					
                    // Push if search is a match
                    if (words[i].toLowerCase().indexOf(filter) != -1) {
                        filteredLocations.push(location());
                        location().marker.setVisible(true);
                        location().info;
                        break;
                    }
                }
            }
        });
        return filteredLocations();
    });

    // NY Times API  (code from samples provided by NY Times developer site)
    this.nytimes = function () {

        // NYTimes AJAX request (code from samples provided by NY Times developer site)
        var nytimesRequest = function (index) {
            var nytimesUrl = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + self.locations()[index].title() + '&sort=newest&api-key=3c8a352dd66780e5679dd0b422a574c6:5:74334338';
            $.getJSON(nytimesUrl, function (data) {

                var newNytimesInfo = self.locations()[index].nytInfo();
                newNytimesInfo = newNytimesInfo.concat('New York Times Articles:');
                newNytimesInfo = newNytimesInfo.concat('<ul>');

                var articles = data.response.docs;
                for (var j = 0; j < articles.length; j++) {
                    
                    // display 2 articles from newspaper API
                    if (j > 1) {
                        break;
                    }
                    var article = articles[j];
                    newNytimesInfo = newNytimesInfo.concat('<li class="article"> <a href="' + article.web_url + '">' + article.headline.main + '</a></li>');
                }

                self.locations()[index].nytInfo(newNytimesInfo);

            }).error(function (e) {
                self.locations()[index].nytInfo('No NY Times info<br>');
            });
        };

        // Iterate through all locations (code from samples provided by NY Times developer site)
        for (var i = 0; i < self.locations().length; i++) {
            nytimesRequest(i);
        }
    };
    this.nytimes();
};

// Per assignment - handle a google maps error.
    // This will diplay the error message and hide the search bar
    function errorHandling() {
        if (typeof google != 'object' || typeof google.maps != 'object') {

            // error message
            alert("ERROR: could not load Google Maps API. Do you have an Internet connection?");

            return false;
        }
    }


// Create map and bindings called from Google API loading uri
function initMap() {
    if (Map()) {
        ko.applyBindings(new ViewModel());
    }
}