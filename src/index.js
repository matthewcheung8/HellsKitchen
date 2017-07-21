'use strict';
var ssml = require('ssml');
var ssmlDoc = new ssml();

const Alexa = require('alexa-sdk');

const APP_ID = "amzn1.ask.skill.63f6503c-2034-4c96-879d-9888cebe06e0";
const SKILL_NAME = "Hell's Kitchen";
const HELP_MESSAGE = "Ask me for motivation or to rate your dish";
const HELP_REPROMPT = "What can I help you with?";
const STOP_MESSAGE = "Goodbye!";

const mean_link = "https://s3.amazonaws.com/hells-kitchen-skill/mean/";
const nice_link = "https://s3.amazonaws.com/hells-kitchen-skill/nice/";
var mean_files = ["bisons1.mp3","donkey1.mp3","hell1.mp3","hotdog1.mp3",
"inedible1.mp3","leave1.mp3","omg1.mp3","pig1.mp3","pissoff1.mp3","score1.mp3"];
var nice_files = ["goodburger1.mp3","gooddelicious1.mp3","goodfavorite1.mp3",
"goodgirl1.mp3","goodjesus1.mp3","goodnicedelicate1.mp3","goodribs1.mp3","goodseason1.mp3","goodspoton1.mp3"];
var links = [mean_link, nice_link];
var files = [mean_files, nice_files];

var handlers = {
    'LaunchRequest': function () {
        this.emit('GetNewQuoteIntent');
    },
    'NiceQuotesIntent': function () {
        var quoteArr = nice_files;
        var quoteIndex = Math.floor(Math.random() * quoteArr.length);
        var randomQuote = quoteArr[quoteIndex];
        var speechOutput = nice_link.concat(randomQuote);
        ssmlDoc.audio({src: speechOutput}).toString();
    },
    'MeanQuotesIntent': function () {
        var quoteArr = mean_files;
        var quoteIndex = Math.floor(Math.random() * quoteArr.length);
        var randomQuote = quoteArr[quoteIndex];
        var speechOutput = mean_link.concat(randomQuote);
        ssmlDoc.audio({src: speechOutput}).toString();
    },
    'RandQuotesIntent': function () {
        var typeIndex = Math.floor(Math.random() * 2);
        var quoteArr = files[typeIndex]
        var quoteLink = links[typeIndex]
        var quoteIndex = Math.floor(Math.random() * quoteArr.length);
        var randomQuote = quoteArr[quoteIndex];
        var speechOutput = quoteLink.concat(randomQuote);
        ssmlDoc.audio({src: speechOutput}).toString();
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
