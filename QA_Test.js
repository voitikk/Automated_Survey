var URL = 'https://hudl.wufoo.com/forms/qa-project/';
var x = require('casper').selectXPath;

casper.test.begin('Hudl Survey is up and running', 1, function(test) {
    casper.start(URL, function() {
        test.assertHttpStatus(200);
    }).run(function() {
        test.done();
    });
});

casper.test.begin('All elements are present on the page', 4, function(test) {
    casper.start(URL, function() {
        this.test.assertExists('#Field1', 'First name field exists');
        this.test.assertExists('#Field2', 'Last name field exists');
        this.test.assertExists('#Field3', 'Email field exists');
        this.test.assertExists('#nextPageButton', 'Next button exists');
    }).run(function() {
        test.done();
    });
});


casper.test.begin('Input tests on three fields', 4, function(test) {
    casper.start(URL, function() {
        this.echo('\n**Inputs are as follows:\nFirst Name: Alex\nLast Name: Voitik\nEmail: ajvoit17@g.holycross.edu\n');
        this.sendKeys('#Field1', 'Alex');
        this.sendKeys('#Field2', 'Voitik');
        this.sendKeys('#Field3', 'ajvoit17@g.holycross.edu');
        test.assertField('Field1', 'Alex', 'First name field value matched');
        test.assertField('Field2', 'Voitik', 'Last name field value matched');
        test.assertField('Field3', 'ajvoit17@g.holycross.edu', 'Email field value matched');
        casper.thenClick(x('//*[@id="nextPageButton"]'), function() {
            this.capture('image.png');
        });
        casper.then(function(){
            casper.test.info('# Making Sure everything is present on the second page');
            this.test.assertExists('#Field109', 'Dropdown menu exists');
        });
    }).run(function() {
        test.done();
    });
});


