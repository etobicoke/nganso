document.addEventListener("DOMContentLoaded", () => {
	const VIDEO_DIR = "/assets/videos"; // Ensure the leading slash
	const VIDEO_COUNT = 10;
	const VIDEO_ELEMENT_ID = "vid";
	
	const getVidSource = (videoSrc) => `${VIDEO_DIR}/${videoSrc}.mp4`;
	const generateVideoArray = (count) => Array.from({ length: count }, (_, index) => `vid${index}`);
	
	const vidArr = generateVideoArray(VIDEO_COUNT);
	const videoElement = document.getElementById(VIDEO_ELEMENT_ID);
	
	if (!videoElement) {
		console.error(`Error: Video element with ID '${VIDEO_ELEMENT_ID}' not found in the DOM.`);
		return;
	}
	
	const selectedVideo = vidArr[Math.floor(Math.random() * vidArr.length)];
	const srcAttr = getVidSource(selectedVideo);
	
	videoElement.setAttribute("src", srcAttr);
	videoElement.setAttribute("preload", "metadata");
	videoElement.load();
	
	videoElement.addEventListener("error", () => {
		alert("Sorry, the video could not be loaded. Please try again later.");
	});
	
	videoElement.addEventListener("loadedmetadata", () => {
		console.log(`Video successfully loaded: ${srcAttr}`);
	});
});