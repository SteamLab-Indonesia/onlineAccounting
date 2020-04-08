import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Bubble from './Bubble';
import Image from './Image';
import ImageContainer from './ImageContainer';
import TextStepContainer from './TextStepContainer';

class TextStep extends Component {

	componentDidMount() {

	}


  render() {
    const {
      message,
	  user,
	  botAvatar,
	  userAvatar,
      avatarStyle,
      bubbleStyle,
      hideBotAvatar,
	  hideUserAvatar,
	  isFirst,
	  isLast
    } = this.props;
    const showAvatar = user ? !hideUserAvatar : !hideBotAvatar;

    return (
		<TextStepContainer className={`rsc-ts ${user ? 'rsc-ts-user' : 'rsc-ts-bot'}`} user={user}>
			<ImageContainer className="rsc-ts-image-container" user={user}>
				{isFirst && (
					<Image
						className="rsc-ts-image"
						style={avatarStyle}
						showAvatar={showAvatar}
						user={user}
						src={user ? userAvatar : botAvatar}
						alt="avatar"
					/>
				)}
			</ImageContainer>
			<Bubble
				className="rsc-ts-bubble"
				style={bubbleStyle}
				user={user}
				showAvatar={showAvatar}
				isFirst={isFirst}
				isLast={isLast}
			>
				{message}
			</Bubble>
		</TextStepContainer>
    );
  }
}

export default TextStep;
