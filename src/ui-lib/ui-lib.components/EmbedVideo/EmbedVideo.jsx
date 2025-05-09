import React from 'react';
import PropTypes from 'prop-types';

export const EmbedVideo = ({ style, url, videoId }) => (
	<div
		style={{
			overflow: 'hidden',
			paddingBottom: '56.25%',
			position: 'relative',
			height: '0',
			...style
		}}>
		<iframe
			style={{
				position: 'absolute',
				top: 0,
				left: 0,
				// borderRadius: '16px',
				width: '100%',
				height: '100%',
			}}
			// width='853'
			height='480'
			src={`https://www.youtube.com/embed/${videoId}`}
			// src={url}
			frameBorder='0'
			allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
			allowFullScreen
			title='Embedded youtube'

		/>
	</div>
);

export default EmbedVideo;
