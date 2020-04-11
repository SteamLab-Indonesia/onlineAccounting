import React, {Component} from "react";
// import ChatBot from "react-simple-chatbot";
import ChatBot from '../components/ChatBot';
import { ThemeProvider } from "styled-components";
import { Redirect } from "react-router-dom";
import { getCurrentUser, getChatroom, getChatMessage, onNewChatMessage, sendChatMessage } from '../libs/database';

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
        messages: [],
        chatroom: {},
        recipient: 'yvonne.tansu@gmail.com'
	}

	componentDidMount = () => {
        console.log(getCurrentUser());
        getChatroom(getCurrentUser(), this.state.recipient).then((data) => {
            console.log(data);
            
            if (data)
            {
                this.setState({chatroom: data})
                onNewChatMessage(data.id, this.refreshMessage);
            }
        })
	}

    onSendMessage = (message) => {
        if (this.state.chatroom.id)
            sendChatMessage(this.state.chatroom.id, getCurrentUser(), message);
    }

	refreshMessage = ((messages) => {
		this.setState({messages})
	})

    render(){
		let {messages} = this.state;
		console.log(messages);
        return(
            <ThemeProvider theme={theme}>
                <ChatBot messages={messages} user={getCurrentUser()} enableSmoothScroll={true} 
                    onSendMessage={this.onSendMessage} {...config} />
            </ThemeProvider>
        )
    }
}
export default ChatBox;