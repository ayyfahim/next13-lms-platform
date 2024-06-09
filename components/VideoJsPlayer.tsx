"use client";

import React, { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "videojs-youtube";

const VideoJsPlayer: React.FC<{ options: any }> = ({ options }) => {
	const initialOptions = {
		controls: true,
		fluid: true,
		controlBar: {
			volumePanel: {
				inline: false,
			},
		},
	};

	const videoRef = useRef<HTMLVideoElement>(null);
	const playerRef = useRef<any | null>(null);

	useEffect(() => {
		const initializePlayer = () => {
			if (videoRef.current) {
				playerRef.current = videojs(videoRef.current, {
					...initialOptions,
					...options,
				});
			}
		};

		initializePlayer();

		return () => {
			if (playerRef.current) {
				playerRef.current.dispose();
			}
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [options]);

	return (
		<div data-vjs-player>
			<video ref={videoRef} className='video-js' />
		</div>
	);
};

export default VideoJsPlayer;
