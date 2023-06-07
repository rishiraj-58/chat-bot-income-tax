import { config } from "dotenv";
config();

import { Configuration, OpenAIApi } from "openai";
import readline from "readline";

const openAi = new OpenAIApi(
  new Configuration({
    apiKey: process.env.API_KEY,
  })
);

const userInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const personalizedResponses = [
    {
      intents: [
        "What is your name?",
        "What's your name",
        "What are you called?",
        "Who are you?",
        "Tell me your name",
        "May I know your name?",
        "What should I call you?",
        "Your name, please?",
        "Who is speaking?",
        "Please introduce yourself",
        "What do you go by?",
        "Who am I talking to?",
        "What's the name of this AI?",
        "Can you tell me your name?",
        "What is the AI's name?",
        "What name do you respond to?",
        "What should I address you as?",
        "Name, please?",
        "How should I refer to you?",
        "What are you referred to as?"
      ],
      response: "I am iTaxAi",
    },
    {
      intents: [
        "Tell me about itaxeasy",
        "What is itaxeasy",
        "What can you tell me about itaxeasy?",
        "Can you provide information about itaxeasy?",
        "Please explain itaxeasy",
        "I want to know about itaxeasy",
        "Give me details about itaxeasy",
        "Describe itaxeasy",
        "Tell me something about itaxeasy",
        "What's the story behind itaxeasy?",
        "How does itaxeasy work?",
        "Can you give me an overview of itaxeasy?",
        "What is the purpose of itaxeasy?",
        "Why was itaxeasy created?",
        "What makes itaxeasy unique?",
        "What are the benefits of using itaxeasy?",
        "Who developed itaxeasy?",
        "Is itaxeasy a reliable platform?",
        "How can itaxeasy help me with my taxes?",
        "What services does itaxeasy offer for tax filing?"
      ],
      response: "Itaxeasy is an AI-driven platform for easing the process of doing taxes.",
    },
    {
      intents: [
        "How to file ITR",
        "File IT Return",
        "File ITR",
        "Steps to file ITR",
        "Guide to filing ITR",
        "Process of filing ITR",
        "Can you help me with filing ITR?",
        "What is the procedure for filing ITR?",
        "How can I submit my ITR?",
        "What are the documents required for filing ITR?",
        "Tell me how to file ITR online",
        "Explain the online ITR filing process",
        "Walk me through the steps of filing ITR",
        "What should I do to file ITR?",
        "How do I submit my income tax return?",
        "Please provide instructions for filing ITR",
        "I need assistance with ITR filing",
        "What is the online process for ITR filing?",
        "What are the options for filing ITR?",
        "Where can I find the ITR filing form?"
      ],
      response: "1. Click on \"File ITR\" Button\n2. Upload your Form 16\n3. Download JSON File and upload it to Income Tax Website",
    },
    {
      intents: [
        "How to file GSTR",
        "How to gst return",
        "How can file GSTR",
        "Guide to filing GSTR",
        "Process of filing GSTR",
        "Can you help me with filing GSTR?",
        "What is the procedure for filing GSTR?",
        "How can I submit my GSTR?",
        "What are the documents required for filing GSTR?",
        "Tell me how to file GSTR online",
        "Explain the online GSTR filing process",
        "Walk me through the steps of filing GSTR",
        "What should I do to file GSTR?",
        "How do I submit my GST return?",
        "Please provide instructions for filing GSTR",
        "I need assistance with GSTR filing",
        "What is the online process for GSTR filing?",
        "What are the options for filing GSTR?",
        "Where can I find the GSTR filing form?",
        "How to report GST transactions"
        ],
        response: "You can file GSTR by going to GST Return section of Billshill By Itaxeasy",
        },
        {
        intents: [
        "What is Due date for filing IT Return",
        "What is last day for of filing itr",
        "Deadline for filing ITR",
        "When is the last date to file ITR?",
        "What is the timeline for filing ITR?",
        "By when should I submit my ITR?",
        "When does the ITR filing period end?",
        "Tell me the due date for ITR filing",
        "What is the cutoff date for ITR filing?",
        "When should I file my income tax return?",
        "When is the deadline to file ITR for the current year?",
        "Is there a specific date for filing ITR?",
        "Can you provide the last day for ITR filing?",
        "What is the final date for submitting ITR?",
        "When does the ITR filing season close?",
        "When does the financial year-end affect ITR filing?",
        "What happens if I miss the ITR filing deadline?",
        "What are the consequences of late ITR filing?",
        "What is the penalty for late submission of ITR?",
        "Do I have to file ITR after the due date?"
        ],
        response: "You must file your income tax returns (ITR) for the financial year ending 31st March by 31st July of the same year.",
        },
        ];
  

userInterface.prompt();
userInterface.on("line", async (input) => {
    let responseText = "";
    let isPersonalizedResponse = false;
    
    for (const item of personalizedResponses) {
    if (item.intents.some(intent => {
        const normalizedInput = input.toLowerCase();
        const normalizedIntent = intent.toLowerCase();
        return normalizedInput.includes(normalizedIntent) || normalizedIntent.includes(normalizedInput);
    })) {
        responseText = item.response;
        isPersonalizedResponse = true;
        break;
    }
    }
    
    if (!isPersonalizedResponse) {
    // Generate a response using GPT-3.5 Turbo
    const messages = [
        { role: "user", content: input },
        { role: "assistant", content: "I am iTaxAi, an AI-driven platform for answering your tax-related queries." },
    ];
    
    const response = await openAi.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages,
    });
    
    responseText = response.data.choices[0].message.content;
    }
    
    console.log(responseText);
    userInterface.prompt();
});
