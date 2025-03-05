document.addEventListener("DOMContentLoaded", () => {
	
	const VIDEO_DIR = "assets/videos"; // Directory where videos are stored
	const VIDEO_COUNT = 10;          // Total number of videos available
	const VIDEO_ELEMENT_ID = "video";  // ID of the <video> element
	
	/**
	 * Helper function to construct the video file path.
	 * @param {string} videoSrc - Video file name (without extension).
	 * @returns {string} Full path to the video file.
	 */
	const getVidSource = (videoSrc) => `${VIDEO_DIR}/${videoSrc}.mp4`;
	
	/**
	 * Generates an array of video file names (e.g., vid0, vid1, ...).
	 * @param {number} count - Number of videos to generate.
	 * @returns {string[]} Array of video file names.
	 */
	const generateVideoArray = (count) => Array.from({ length: count }, (_, index) => `vid${index}`);
	
	// Generate the array of video file names
	const vidArr = generateVideoArray(VIDEO_COUNT);
	
	// Find the <video> element
	const videoElement = document.getElementsByTagName(VIDEO_ELEMENT_ID)[0];
	
	if (!videoElement) {
		console.error(`Error: Video element with ID '${VIDEO_ELEMENT_ID}' not found in the DOM.`);
		return;
	}
	
	// Randomly select a video from the array
	const selectedVideo = vidArr[Math.floor(Math.random() * vidArr.length)];
	const srcAttr = getVidSource(selectedVideo);
	
	// Set the video source and preload metadata
	videoElement.setAttribute("src", srcAttr);
	videoElement.setAttribute("preload", "metadata");
	videoElement.load();
	
	// Handle video loading errors
	// TODO: review below logic
	videoElement.addEventListener("error", () => {
		alert("Sorry, the video could not be loaded. Please try again later.");
	});
	
	// Optional: Add an event listener for when the video is ready
	// TODO: Is below code necessary
	videoElement.addEventListener("loadedmetadata", () => {
		// TODO: review below logic
		console.log(`Video successfully loaded: ${srcAttr}`);
	});
});