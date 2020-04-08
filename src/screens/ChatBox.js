import React, {Component} from "react";
// import ChatBot from "react-simple-chatbot";
import ChatBot from '../components/ChatBot';
import { ThemeProvider } from "styled-components";
import { Redirect } from "react-router-dom";
import { getChatroom, getChatMessage, onNewChatMessage, sendChatMessage } from '../libs/database';

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

class ChatBox extends Component {
	// state = { redirect: '/transaction' };
	state = { 
		messages: []
	}

	componentDidMount = () => {
		onNewChatMessage('gBU1pg2Gn5Wccc2A0LwD', this.refreshMessage);
		// setInterval(this.autoSendMessage, 10000);
	}

	refreshMessage = ((messages) => {
		this.setState({messages})
	})

    render(){
		let {messages} = this.state;
		console.log(messages);
        return(
            <ThemeProvider theme={theme}>
                <ChatBot messages={messages} user="yvonne.tansu@gmail.com" {...config} />
            </ThemeProvider>
        )
    }
}
export default ChatBox;