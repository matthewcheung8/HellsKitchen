'use strict';
var ssml = require('ssml');
var ssmlDoc = new ssml();

const Alexa = require('alexa-sdk');

const APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).
const SKILL_NAME = "Hell's Kitchen";
var HELP_MESSAGE = "Ask me for motivation or to rate your dish";
var HELP_REPROMPT = "What can I help you with?";
var STOP_MESSAGE = "Goodbye!";

var mean_quotes = [] // TODO: add calls to s3 for mp3 files
var nice_quotes = []

var handlers = {
    'LaunchRequest': function () {
        this.emit('GetNewQuoteIntent');
    },
    'GetNewQuoteIntent': function () {
        var quoteArr = quotes;
        var quoteIndex = Math.floor(Math.random() * quoteArr.length);
        var randomQuote= quoteArr[quoteIndex];
        var speechOutput = randomQuote;
        this.emit(':tellWithCard', speechOutput, SKILL_NAME, randomQuote)
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

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
