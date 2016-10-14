/* *
 * Alex Voitik
 * Last Edit: 10/12/2016
 * QA_Project.js
 *
 * This program fills out and completes a survey
 * 
 * */

var casper = require('casper').create();

var x = require('casper').selectXPath;

casper.userAgent('Mozilla/4.1 (compatible; MSIE 6.0; Windows NT 5.1)');

casper.start('https://hudl.wufoo.com/forms/qa-project/');

//Page 1
casper.then(function(){
    this.sendKeys('#Field1', 'Alex'); //First Name Field
    this.sendKeys('#Field2', 'Voitik'); //Last Name Field
    this.sendKeys('#Field3', 'ajvoit17@g.holycross.edu'); //Email Address Field
    //Page 2
    casper.thenClick(x('//*[@id="nextPageButton"]'), function() {
        this.fillSelectors('div.ltr', { 
            'select[id="Field109"]': 'Massachusetts'                     
        }, false); //Selects Massachusetts from the dropdown menu
        this.click('#Field7'); //Selects Football
        this.click('#Field11'); //Selects Baseball
        this.click('#Field13'); //Selects Rugby
        this.click('#Field16'); //Selects Other
    });
    casper.thenClick(x("//*[@id=\"saveForm\"]")); //Submits
});

casper.run();