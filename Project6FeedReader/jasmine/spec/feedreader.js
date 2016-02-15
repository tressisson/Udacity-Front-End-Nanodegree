/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('is defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
            expect(allFeeds instanceof Array).toBeTruthy();
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('allFeeds URL defined and not empty', function() {
            allFeeds.forEach(function(item) {
                expect(item.url).toBeDefined();
                expect(item.url).toMatch(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6}).*\/?$/)
            });
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('Feed has name and is not empty', function() {
            allFeeds.forEach(function(item) {
                expect(item.name).toBeDefined();
                expect(typeof item.name).toBe('string');
                expect(item.name.length).toBeGreaterThan(0);
            });
        });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {

        var $body = $('body'),
            $menu = $('.menu-icon-link');

         /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('menu element is hidden', function() {
            expect($body.attr('class')).toContain('menu-hidden');
        });

        /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('menu hides/shows when menu item clicked', function() {
            $menu.trigger('click');
            expect($body.attr('class')).not.toContain('menu-hidden');

            $menu.click();
            expect($body.attr('class')).toContain('menu-hidden');
        });
    });

       

         

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {

        beforeEach(function(done) {
            loadFeed(0, done);
        });

       /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        it('there is a single entry element within the feed', function(done) {
            expect($('.feed').find('.entry').length).toBeGreaterThan(0);
            done();
        });

    }); 

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {

        var firstFeedItem,
            secondFeedItem;

        // using done because it is asynchronous
        beforeEach(function(done) {

            loadFeed(0, function() {
                firstFeedItem = $('.feed').find('.entry');

                loadFeed(1, function() {
                    secondFeedItem = $('.feed').find('.entry');
                    done();
                });
            });
        });

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        it('content of feed changes when the menu item changes', function(done) {
            expect(firstFeedItem.html()).not.toBe(secondFeedItem.html());
            done();
        });
    });
    
}());
