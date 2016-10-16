/* *
 * Alex Voitik
 * Last Edit: 10/16/2016
 * QA_Test.js
 *
 * Automated test for a Hudl online survey
 *
 * run with command $casperjs test QA_Test.js
 * */





var URL = 'https://hudl.wufoo.com/forms/qa-project/';
var x = require('casper').selectXPath;

function FillFields() {
    casper.sendKeys('#Field1', 'Alex');
    casper.sendKeys('#Field2', 'Voitik');
    casper.sendKeys('#Field3', 'ajvoit17@g.holycross.edu');
}

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


casper.test.begin('Input tests on three fields', 3, function(test) {
    casper.start(URL, function() {
        casper.test.comment("\n**Inputs are as follows:\nFirst Name: Alex\nLast Name: Voitik\nEmail: ajvoit17@g.holycross.edu\n");
        FillFields();
        test.assertField('Field1', 'Alex', 'First name field value matched');
        test.assertField('Field2', 'Voitik', 'Last name field value matched');
        test.assertField('Field3', 'ajvoit17@g.holycross.edu', 'Email field value matched');
    }).run(function() {
        test.done();
    });
});

casper.test.begin('All elements are present on the second page',19,function(test) {
    casper.start(URL, function() {
        FillFields();
        casper.thenClick(x('//*[@id="nextPageButton"]'), function() {
            this.test.assertExists('#Field109', 'Dropdown menu exists');
            this.test.assertExists('option[value="Nebraska"]', 'Nebraska menu option present');
            this.test.assertExists('option[value="California"]', 'California menu option present');
            this.test.assertExists('option[value="Texas"]', 'Texas menu option present');
            this.test.assertExists('option[value="New York"]', 'New York menu option present');
            this.test.assertExists('option[value="Washington"]', 'Washington menu option present');
            this.test.assertExists('option[value="Massachusetts"]', 'Massachusetts menu option present');
            this.test.assertExists('#Field7', 'First checkbox present');
            this.test.assertExists('#Field8', 'Second checkbox present');
            this.test.assertExists('#Field9', 'Third checkbox present');
            this.test.assertExists('#Field10', 'Fourth checkbox present');
            this.test.assertExists('#Field11', 'Fifth checkbox present');
            this.test.assertExists('#Field12', 'Sixth checkbox present');
            this.test.assertExists('#Field13', 'Seventh checkbox present');
            this.test.assertExists('#Field14', 'Eighth checkbox present');
            this.test.assertExists('#Field15', 'Ninth checkbox present');
            this.test.assertExists('#Field16', 'Tenth checkbox present');
            this.test.assertExists('#saveForm', 'Submit button present');
            this.test.assertExists('#previousPageButton', 'Previous button present');
            
        });
    }).run(function() {
        test.done();
    });
});

casper.test.begin('Input Tests on the second page',3 ,function(test) {
    casper.start(URL, function() {
        FillFields();
        casper.thenClick(x('//*[@id="nextPageButton"]'), function() {
            casper.test.comment("\n**Inputs are as follows:\nMassachusetts\nFootball\nBaseball\nRugby\nOther\n");
            this.fillSelectors('div.ltr', { 
            'select[id="Field109"]': 'Massachusetts'                     
            }, false); 
            this.click('#Field7'); 
            this.click('#Field11'); 
            this.click('#Field13'); 
            this.click('#Field16');
            this.test.assertField('Field109', 'Massachusetts', 'Massachusetts is selected');
            this.test.assertTrue(this.evaluate(function () { 
                return (document.getElementById("Field7").checked && document.getElementById("Field11").checked
                        && document.getElementById("Field13").checked && document.getElementById("Field16").checked);
            }), 'Checkboxes are checked');
            casper.thenClick(x("//*[@id=\"saveForm\"]"), function() {
                test.assertTextExists('Great! Thanks for filling out my form!', 'Form Submitted Successfully');
            });
            });
        }).run(function() {
            test.done();
        });
});

