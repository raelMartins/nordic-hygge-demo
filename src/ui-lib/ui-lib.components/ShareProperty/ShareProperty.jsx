

import React from 'react';
import {FacebookShareButton, TwitterShareButton, WhatsappShareButton, PinterestShareButton, FacebookIcon, TwitterIcon, WhatsappIcon, PinterestIcon} from 'react-share';

const Title = ({title, children}) => <h5>{children || title}</h5>;

const Description = ({description, children}) => <p>{children || description}</p>;

const Icons = ({iconSize = 32, summary, title, url, imgUrl, tags}) => {
	const iconStyles = {
		display: 'flex',
		justifyContent: 'center',
		columnGap: '2em',
		alignItems: 'center',
		maxWidth: '500px',
		width: '100%',
	};
	return (
		<div style={iconStyles}>
			<FacebookShareButton url={url} quote={summary} hashtag={tags?.map((tag) => `#${tag}`).join(' ')}>
				<FacebookIcon size={iconSize} round />
			</FacebookShareButton>
			<PinterestShareButton url={url} media={imgUrl} description={summary}>
				<PinterestIcon size={iconSize} round />
			</PinterestShareButton>
			<TwitterShareButton url={url} title={title} hashtags={tags} via={'waistedbynora'}>
				<TwitterIcon size={iconSize} round />
			</TwitterShareButton>

			<WhatsappShareButton url={url} title={title}>
				<WhatsappIcon size={iconSize} round />
			</WhatsappShareButton>
		</div>
	);
};

export const ShareProperty = ({children}) => {
	return <div>{children}</div>;
};

ShareProperty.Icons = Icons;
ShareProperty.Title = Title;
ShareProperty.Description = Description;

export default ShareProperty;