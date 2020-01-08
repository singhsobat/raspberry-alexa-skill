// This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
// Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
// session persistence, api calls, and more.
const Alexa = require('ask-sdk-core');

var checksleep=0,checkfever=0,end=0; //variables to check which intent had been already triggered and how many questions have been asked

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'आपको क्या स्वास्थ्य समस्या हो रही है?'; //triggered when the skill is launched
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};


const sleepIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'sleepIntent';
    },
    handle(handlerInput) {
        checksleep=1;
        const speakOutput = 'क्या आपकी नींद पूरी है?'; //first question in sleep intent
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

 const feverIntentHandler = {
     canHandle(handlerInput) {
         return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
             && Alexa.getIntentName(handlerInput.requestEnvelope) === 'feverIntent';
     },
     handle(handlerInput) {
         checkfever=1;
         const speakOutput = 'क्या आपको शरीर में दर्द हो रहा है?'; //first question in fever intent
         return handlerInput.responseBuilder
             .speak(speakOutput)
             .reprompt(speakOutput)
             .getResponse();
     }
 };

const yesnoIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.YesIntent' || 
                Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.NoIntent');
    },
    handle(handlerInput) {
        if(checksleep===1)
        {
            if(Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.YesIntent')
            {   
                checksleep++;
                const speakOutput = 'क्या आपको ध्यान केंद्रित करने में कठिनाई हो रही है या आप बार-बार झपकी लेते हैं या आपकी आँखें भारी हो रही हैं?';//second question in sleep intent
                
                return handlerInput.responseBuilder
                .speak(speakOutput)
                .reprompt(speakOutput)
                .getResponse();
            }
            
            else
            {
                const speakOutput = 'मैं आपसे अपनी नींद पूरी करने का अनुरोध करती हूं, क्योंकि इस हालत में गाड़ी चलाना खतरनाक है!';
                
                
                checksleep=0;
                
                return handlerInput.responseBuilder
                .speak(speakOutput)
                //.reprompt(speakOutput)
                .getResponse();
            }
        }
        
        if(checksleep===2)
        {
            if(Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.NoIntent')
            {   
                checksleep++;
                const speakOutput = 'क्या आप बेचैन और चिड़चिड़े महसूस कर रहे हैं?';//third question in sleep intent
                
                return handlerInput.responseBuilder
                .speak(speakOutput)
                .reprompt(speakOutput)
                .getResponse();
            }
            
            else
            {
                const speakOutput = 'मेरा सुझाव है कि आप गाड़ी चलाना बंद करें और थोड़ा आराम करें';
                
                checksleep=0;
                
                return handlerInput.responseBuilder
                .speak(speakOutput)
                //.reprompt(speakOutput)
                .getResponse();
            }
        }
        
        if(checksleep===3)
        {
            if(Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.YesIntent')
            {   
                checksleep++;
                const speakOutput = 'मेरा सुझाव है कि आप गाड़ी चलाना बंद करें और थोड़ा आराम करें, क्योंकि इस हालत में गाड़ी चलाना खतरनाक है!';
                
                checksleep=0;
                
                return handlerInput.responseBuilder
                .speak(speakOutput)
                //.reprompt(speakOutput)
                .getResponse();
            }
            else
            {
                const speakOutput = 'मुझे नहीं लगता कि आप नींद में हैं, लेकिन अगर आपको कुछ आराम करने का मन है, तो कृपया थोड़ा आराम करें';
                
                checksleep=0;
                
                return handlerInput.responseBuilder
                .speak(speakOutput)
                //.reprompt(speakOutput)
                .getResponse();
            }
        }
        
         if(checkfever===1)
         {
            if(Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.YesIntent' || 
                Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.NoIntent')
            {   
                checkfever++;
                const speakOutput = 'क्या आप थकान महसूस कर रहे हैं?';//second question in fever intent
                
                return handlerInput.responseBuilder
                .speak(speakOutput)
                .reprompt(speakOutput)
                .getResponse();
            }
            
            
         }
         
         if(checkfever===2)
         {
             if(Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.NoIntent')
            {   
                checkfever++;
                const speakOutput = 'क्या आपको चक्कर आ रहा है?';//third question in fever intent
                
                return handlerInput.responseBuilder
                .speak(speakOutput)
                .reprompt(speakOutput)
                .getResponse();
            }
            
            else
            {
                const speakOutput = 'मैं आपसे अनुरोध करती हूं कि आप गाड़ी चलाना बंद करें और थोड़ा आराम करें और एक डॉक्टर से मिलें.';
                checkfever=0;
                
                return handlerInput.responseBuilder
                .speak(speakOutput)
                //.reprompt(speakOutput)
                .getResponse();
            }
         }
         
         if(checkfever===3)
        {
             if(Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.YesIntent')
            {   
                
                const speakOutput = 'जैसा कि आप चक्कर महसूस कर रहे हैं मुझे लगता है कि आपको थोड़ा ब्रेक लेना चाहिए और कुछ पानी पीना चाहिए';
                checkfever=0;
                
                return handlerInput.responseBuilder
                .speak(speakOutput)
                //.reprompt(speakOutput)
                .getResponse();
            }
            else
            {   
                
                const speakOutput = 'आप में बुखार के कोई लक्षण नहीं हैं लेकिन अगर आपको अभी भी लगता है कि आपको बुखार है, तो आपको डॉक्टर से मिलना चाहिए.';
                
                
                checkfever=0;
                
                return handlerInput.responseBuilder
                .speak(speakOutput)
                //.reprompt(speakOutput)
                .getResponse();
            }
        }
        
       
        
    }
};    
 

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'You can say hello to me! How can I help?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'अलविदा! मदद के लिए मेरे पास पहुंचने के लिए धन्यवाद.';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        // Any cleanup logic goes here.
        checksleep=0;
        checkfever=0;
        end=0;
        
        const speakOutput = 'मदद के लिए मेरे पास पहुंचने के लिए धन्यवाद.';
        return handlerInput.responseBuilder
        .speak(speakOutput)
        .getResponse();
    }
};

// The intent reflector is used for interaction model testing and debugging.
// It will simply repeat the intent the user said. You can create custom handlers
// for your intents by defining them above, then also adding them to the request
// handler chain below.
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

// Generic error handling to capture any syntax or routing errors. If you receive an error
// stating the request handler chain is not found, you have not implemented a handler for
// the intent being invoked or included it in the skill builder below.
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.stack}`);
        const speakOutput = `Sorry, I had trouble doing what you asked. Please try again.`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

// The SkillBuilder acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        sleepIntentHandler,
        feverIntentHandler,
        yesnoIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler, // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    )
    .addErrorHandlers(
        ErrorHandler,
    )
    .lambda();
