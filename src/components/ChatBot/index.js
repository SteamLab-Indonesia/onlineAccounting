import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    ChatBotContainer,
    Content,
    Header,
    HeaderTitle,
    HeaderIcon,
    FloatButton,
    FloatingIcon,
    Footer,
    Input,
    SubmitButton
} from './components';
import TextStep from './components/text/TextStep';
import { ChatIcon, CloseIcon, SubmitIcon } from './icons';

class ChatBot extends Component {

    state = {
        disabled: true,
        opened: this.props.opened || !this.props.floating,
        inputValue: '',
        inputInvalid: false,
        speaking: false,
        recognitionEnable: false,
        defaultUserSettings: {}
    };

    constructor(props) {
      super(props);
      
      this.content = null;
      // this.input = null;
  
      this.supportsScrollBehavior = false;
  
      this.setContentRef = element => {
        this.content = element;
      };      
    }
    onNodeInserted = event => {
      console.log('Node Inserted')
      const { currentTarget: target } = event;
      const { enableSmoothScroll } = this.props;
  
      if (enableSmoothScroll && this.supportsScrollBehavior) {
        target.scroll({
          top: target.scrollHeight,
          left: 0,
          behavior: 'smooth'
        });
      } else {
        target.scrollTop = target.scrollHeight;
      }
    };
  
    onResize = () => {
      this.content.scrollTop = this.content.scrollHeight;
    };

    componentDidMount() {

        this.supportsScrollBehavior = 'scrollBehavior' in document.documentElement.style;
    
        if (this.content) {
          this.content.addEventListener('DOMNodeInserted', this.onNodeInserted);
          window.addEventListener('resize', this.onResize);
        }
    }

    toggleChatBot = opened => {
        const { toggleFloating } = this.props;
    
        if (toggleFloating) {
          toggleFloating({ opened });
        } else {
          this.setState({ opened });
        }
    };

    onValueChange = (e) => {
      this.setState({inputValue: e.target.value});
    }

    submitMessage = () => {
      if (this.props.onSendMessage) {
        this.props.onSendMessage(this.state.inputValue);
        this.setState({inputValue: ''});
      }
    }
    handleSubmitButton = () => {
      this.submitMessage();
    }

    handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        this.submitMessage();
      }   
    }

    renderMessage = () => {
      if (this.props.messages)
      {
        // this.props.messages.reverse();
        return this.props.messages.map((item, index, allItems) => {
          return (
            <TextStep
              key={index}
              botAvatar={this.props.botAvatar}
              userAvatar={this.props.userAvatar}
              avatarStyle={{}}
              user={item.from == this.props.user}
              message={item.message}
              isFirst={index == 0 || (item.from != allItems[index-1].from)}
            />
          );
        })
      }
      else
      {
        return null;
      }
	  }
	
    render() {
      const {
        inputInvalid,
        inputValue,
        opened,
      } = this.state;

      const {
        className,
        contentStyle,
        controlStyle,
        floating,
        floatingIcon,
        floatingStyle,
        footerStyle,
        headerComponent,
        headerTitle,
        hideHeader,
        hideSubmitButton,
        inputStyle,
        placeholder,
        inputAttributes,
        style,
        submitButtonStyle,
        width,
        height
      } = this.props;

      const header = headerComponent || (
      <Header className="rsc-header">
        <HeaderTitle className="rsc-header-title">{headerTitle}</HeaderTitle>
        {floating && (
          <HeaderIcon className="rsc-header-close-button" onClick={() => this.toggleChatBot(false)}>
            <CloseIcon />
          </HeaderIcon>
        )}
      </Header>
    );

    const icon = <SubmitIcon />;

    const inputPlaceholder = placeholder;

    const inputAttributesOverride = inputAttributes;

        return (
            <div className={`rsc ${className}`}>
              {floating && (
                <FloatButton
                  className="rsc-float-button"
                  style={floatingStyle}
                  opened={opened}
                  onClick={() => this.toggleChatBot(true)}
                >
                  {typeof floatingIcon === 'string' ? <FloatingIcon src={floatingIcon} /> : floatingIcon}
                </FloatButton>
              )}
              <ChatBotContainer
                className="rsc-container"
                floating={floating}
                floatingStyle={floatingStyle}
                opened={opened}
                style={style}
                width={width}
                height={height}
              >
                {!hideHeader && header}
                <Content
                  className="rsc-content"
                  ref={this.setContentRef}
                  floating={floating}
                  style={contentStyle}
                  height={height}
                  hideInput={false}
                >
					        {this.renderMessage()}
                </Content>
                <Footer className="rsc-footer" style={footerStyle}>
                    <Input
                      type="textarea"
                      style={inputStyle}
                      ref={this.setInputRef}
                      className="rsc-input"
                      placeholder={inputInvalid ? '' : inputPlaceholder}
                      onKeyPress={this.handleKeyPress}
                      onChange={this.onValueChange}
                      value={inputValue}
                      floating={floating}
                      invalid={inputInvalid}
                      hasButton={!hideSubmitButton}
                      {...inputAttributesOverride}
                    />
                  <div style={controlStyle} className="rsc-controls">
                      <SubmitButton
                        className="rsc-submit-button"
                        style={submitButtonStyle}
                        onClick={this.handleSubmitButton}
                        invalid={inputInvalid}
                      >
                        {icon}
                      </SubmitButton>
                  </div>
                </Footer>
              </ChatBotContainer>
            </div>
          );
    }
}

ChatBot.propTypes = {
  avatarStyle: PropTypes.objectOf(PropTypes.any),
  botAvatar: PropTypes.string,
  botDelay: PropTypes.number,
  bubbleOptionStyle: PropTypes.objectOf(PropTypes.any),
  bubbleStyle: PropTypes.objectOf(PropTypes.any),
  cache: PropTypes.bool,
  cacheName: PropTypes.string,
  className: PropTypes.string,
  contentStyle: PropTypes.objectOf(PropTypes.any),
  customDelay: PropTypes.number,
  customStyle: PropTypes.objectOf(PropTypes.any),
  controlStyle: PropTypes.objectOf(PropTypes.any),
  enableMobileAutoFocus: PropTypes.bool,
  enableSmoothScroll: PropTypes.bool,
  extraControl: PropTypes.objectOf(PropTypes.element),
  floating: PropTypes.bool,
  floatingIcon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  floatingStyle: PropTypes.objectOf(PropTypes.any),
  footerStyle: PropTypes.objectOf(PropTypes.any),
  handleEnd: PropTypes.func,
  headerComponent: PropTypes.element,
  headerTitle: PropTypes.string,
  height: PropTypes.string,
  hideBotAvatar: PropTypes.bool,
  hideHeader: PropTypes.bool,
  hideSubmitButton: PropTypes.bool,
  hideUserAvatar: PropTypes.bool,
  inputAttributes: PropTypes.objectOf(PropTypes.any),
  inputStyle: PropTypes.objectOf(PropTypes.any),
  opened: PropTypes.bool,
  toggleFloating: PropTypes.func,
  placeholder: PropTypes.string,
  style: PropTypes.objectOf(PropTypes.any),
  submitButtonStyle: PropTypes.objectOf(PropTypes.any),
  userAvatar: PropTypes.string,
  userDelay: PropTypes.number,
  width: PropTypes.string
};

ChatBot.defaultProps = {
  avatarStyle: {},
  botDelay: 1000,
  bubbleOptionStyle: {},
  bubbleStyle: {},
  cache: false,
  cacheName: 'rsc_cache',
  className: '',
  contentStyle: {},
  customStyle: {},
  controlStyle: { position: 'absolute', right: '0', top: '0' },
  customDelay: 1000,
  enableMobileAutoFocus: false,
  enableSmoothScroll: false,
  floating: false,
  floatingIcon: <ChatIcon />,
  floatingStyle: {},
  footerStyle: {},
  handleEnd: undefined,
  headerComponent: undefined,
  headerTitle: 'Chat',
  height: '520px',
  hideBotAvatar: false,
  hideHeader: false,
  hideSubmitButton: false,
  hideUserAvatar: false,
  inputStyle: {},
  opened: undefined,
  placeholder: 'Type the message ...',
  inputAttributes: {},
  style: {},
  submitButtonStyle: {},
  toggleFloating: undefined,
  userDelay: 1000,
  width: '350px',
  botAvatar:
    "data:image/svg+xml,%3csvg version='1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3e%3cpath d='M303 70a47 47 0 1 0-70 40v84h46v-84c14-8 24-23 24-40z' fill='%2393c7ef'/%3e%3cpath d='M256 23v171h23v-84a47 47 0 0 0-23-87z' fill='%235a8bb0'/%3e%3cpath fill='%2393c7ef' d='M0 240h248v124H0z'/%3e%3cpath fill='%235a8bb0' d='M264 240h248v124H264z'/%3e%3cpath fill='%2393c7ef' d='M186 365h140v124H186z'/%3e%3cpath fill='%235a8bb0' d='M256 365h70v124h-70z'/%3e%3cpath fill='%23cce9f9' d='M47 163h419v279H47z'/%3e%3cpath fill='%2393c7ef' d='M256 163h209v279H256z'/%3e%3cpath d='M194 272a31 31 0 0 1-62 0c0-18 14-32 31-32s31 14 31 32z' fill='%233c5d76'/%3e%3cpath d='M380 272a31 31 0 0 1-62 0c0-18 14-32 31-32s31 14 31 32z' fill='%231e2e3b'/%3e%3cpath d='M186 349a70 70 0 1 0 140 0H186z' fill='%233c5d76'/%3e%3cpath d='M256 349v70c39 0 70-31 70-70h-70z' fill='%231e2e3b'/%3e%3c/svg%3e",
  userAvatar:
    "data:image/svg+xml,%3csvg viewBox='-208.5 21 100 100' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3e%3ccircle cx='-158.5' cy='71' fill='%23F5EEE5' r='50'/%3e%3cdefs%3e%3ccircle cx='-158.5' cy='71' id='a' r='50'/%3e%3c/defs%3e%3cclipPath id='b'%3e%3cuse overflow='visible' xlink:href='%23a'/%3e%3c/clipPath%3e%3cpath clip-path='url(%23b)' d='M-108.5 121v-14s-21.2-4.9-28-6.7c-2.5-.7-7-3.3-7-12V82h-30v6.3c0 8.7-4.5 11.3-7 12-6.8 1.9-28.1 7.3-28.1 6.7v14h100.1z' fill='%23E6C19C'/%3e%3cg clip-path='url(%23b)'%3e%3cdefs%3e%3cpath d='M-108.5 121v-14s-21.2-4.9-28-6.7c-2.5-.7-7-3.3-7-12V82h-30v6.3c0 8.7-4.5 11.3-7 12-6.8 1.9-28.1 7.3-28.1 6.7v14h100.1z' id='c'/%3e%3c/defs%3e%3cclipPath id='d'%3e%3cuse overflow='visible' xlink:href='%23c'/%3e%3c/clipPath%3e%3cpath clip-path='url(%23d)' d='M-158.5 100.1c12.7 0 23-18.6 23-34.4 0-16.2-10.3-24.7-23-24.7s-23 8.5-23 24.7c0 15.8 10.3 34.4 23 34.4z' fill='%23D4B08C'/%3e%3c/g%3e%3cpath d='M-158.5 96c12.7 0 23-16.3 23-31 0-15.1-10.3-23-23-23s-23 7.9-23 23c0 14.7 10.3 31 23 31z' fill='%23F2CEA5'/%3e%3c/svg%3e"
};
export default ChatBot;