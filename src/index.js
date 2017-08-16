'use strict';
var Alexa = require('alexa-sdk');

//=========================================================================================================================================
//TODO: The items below this comment need your attention.
//=========================================================================================================================================

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.
//Make sure to enclose your value in quotes, like this: var APP_ID = "amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1";
var APP_ID = "amzn1.ask.skill.2d45f59b-12be-491f-b939-9225171c00f5";

const SKILL_NAME = "Hell's Kitchen";
const HELP_MESSAGE = "Ask me for motivation or to rate your dish";
const HELP_REPROMPT = "What can I help you with?";
const STOP_MESSAGE = "Goodbye!";
const MEAN_LINK = "https://s3.amazonaws.com/hells-kitchen-skill/mean/";
const NICE_LINK = "https://s3.amazonaws.com/hells-kitchen-skill/nice/";
var mean_files = ["bisons1.mp3","donkey1.mp3","hell1.mp3","hotdog1.mp3",
"inedible1.mp3","leave1.mp3","omg1.mp3","pig1.mp3","pissoff1.mp3","score1.mp3"];
var nice_files = ["goodburger1.mp3","gooddelicious1.mp3","goodfavorite1.mp3",
"goodgirl1.mp3","goodjesus1.mp3","goodnicedelicate1.mp3","goodribs1.mp3","goodseason1.mp3","goodspoton1.mp3"];
var files = [mean_files, nice_files];
var links = [MEAN_LINK, NICE_LINK];

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('GetMeanQuote');
    },
    'MeanQuotesIntent': function () {
        var factArr = mean_files;
        var factIndex = Math.floor(Math.random() * factArr.length);
        var randomFact = factArr[factIndex];
        var speechOutput = MEAN_LINK + randomFact;
        var output = '<audio src=' + "\"" + speechOutput + "\"" + '/>';
        this.emit(':tell', output);
    },
    'NiceQuotesIntent': function () {
        var factArr = nice_files;
        var factIndex = Math.floor(Math.random() * factArr.length);
        var randomFact = factArr[factIndex];
        var speechOutput = NICE_LINK + randomFact;
        var output = '<audio src=' + "\"" + speechOutput + "\"" + '/>';
        this.emit(':tell', output);
    },
    'RandQuotesIntent': function () {
        var filesIndex = Math.floor(Math.random() * 2);
        var factArr = files[filesIndex];
        var factIndex = Math.floor(Math.random() * factArr.length);
        var randomFact = factArr[factIndex];
        var speechOutput = links[filesIndex] + randomFact;
        var output = '<audio src=' + "\"" + speechOutput + "\"" + '/>';
        this.emit(':tell', output);
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = HELP_MESSAGE;
        var reprompt = HELP_REPROMPT;
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', STOP_MESSAGE);
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', STOP_MESSAGE);
    }
};
