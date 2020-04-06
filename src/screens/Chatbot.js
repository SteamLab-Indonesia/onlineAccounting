import React, {Component} from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";

const config = {
    width: "350px",
    height: "400px",
    floating: true
  };

const theme = {
    background: "white",
    fontFamily: "Arial, Helvetica, sans-serif",
    headerBgColor: "#00B2B2",
    headerFontColor: "#fff",
    headerFontSize: "25px",
    botBubbleColor: "#00B2B2",
    botFontColor: "#fff",
    userBubbleColor: "#fff",
    userFontColor: "#4c4c4c"
   };

const steps = [
    {
       id: "Greet",
       message: "Hello, Welcome to our shop",
       trigger: "Ask Name"
    },
    {
       id: "Ask Name",
       message: "Please type your name?",
       trigger: "Waiting user input for name"
    },
    {
       id: "Waiting user input for name",
       user: true,
       trigger: "Asking options for services"
    },
    {
       id: "Asking options for services",
       message: "Hi {previousValue}, please click on what you would like us to do!",
       trigger: "Displaying options for services"
    },
    {
       id: "Displaying options for services",
       options: [
                  {
                    value: "complaint",
                    label: "Complaint",
                    trigger: "Asking complaint"
                  },
                  { 
                    value: "question",
                    label: "Question",
                    trigger: "Raising question"
                  } 
                ]
    },
    {
       id: "Raising question",
       message: "Would you like to check out our FAQs?",
       trigger: "Asking FAQs"
    },
    {
       id: "Asking FAQs",
       options: [
                  {
                    value: true,
                    label: "Yes",
                    trigger: "Done"
                  },
                  { 
                    value: "false",
                    label: "No",
                    trigger: "New question"
                  } 
                ]
    },
    // {
    //     id: "Redirect to FAQ website",
    //     trigger: "Done"
    // },
    {
        id: 'New question',
        message: 'What would you like to ask?',
        trigger: 'Waiting for user to type question'
    },
    {
        id: 'Waiting for user to type question',
        user: true,
        trigger: 'Assistance'
    },
    {
       id: "Asking complaint",
       message: "Would you like to file a complaint?",
       trigger: "Filing complaint"
    },
    {
       id: "Filing complaint",
       options: [
                  {
                    value: true,
                    label: "Yes",
                    trigger: "Type complaint"  
                  },
                  { 
                    value: "false",
                    label: "No",
                    trigger: "Asking something else"
                  } 
                ]
    },
    {
        id: 'Type complaint',
        user: true,
        trigger: "Asking something else"
    },
    {
       id: "Asking something else",
       message: "Do you have further enquiries?",
       trigger: "Something else"
    },
    {
       id: "Something else",
       options: [
                  {
                    value: true,
                    label: "Yes",
                    trigger: "Displaying options for services"
                  },
                  { 
                    value: "false",
                    label: "No",
                    trigger: "Done"
                  } 
                ]
    },
    {
        id: "Done",
        message: "Have a great day !!",
        end: true
    },
    {
        id: 'Assistance',
        message: 'Please wait a moment. \n Someone will assist you in awhile.',
        end: true
    }
];

class Chatbot extends Component {
    render(){
        return(
            <ThemeProvider theme={theme}>
                <ChatBot steps={steps} {...config} />
            </ThemeProvider>
        )
    }
}
export default Chatbot;