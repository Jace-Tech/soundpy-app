import { useState } from 'react';
import ReactPlayer from 'react-player'; // You can use your chosen media player library
// Make sure to install and import the library properly

const Test = () => {
  const [mediaURL, setMediaURL] = useState(''); // URL of the media to play
  const [startTimestamp, setStartTimestamp] = useState('00:00:00'); // Start timestamp for cutting
  const [endTimestamp, setEndTimestamp] = useState('00:01:00'); // End timestamp for cutting
  const [cutMediaURL, setCutMediaURL] = useState(''); // URL for the cut media

  const handleCutMedia = () => {
    // Use ffmpeg.js to cut the media
    // Add your ffmpeg.js code here

    // For the sake of this example, setting the cutMediaURL to the mediaURL
    setCutMediaURL(mediaURL);
  };

  return (
    <div>
      <ReactPlayer url={cutMediaURL || mediaURL} controls />
      <div>
        <input
          type="text"
          placeholder="Media URL"
          value={mediaURL}
          onChange={(e) => setMediaURL(e.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Start Timestamp"
          value={startTimestamp}
          onChange={(e) => setStartTimestamp(e.target.value)}
        />
        <input
          type="text"
          placeholder="End Timestamp"
          value={endTimestamp}
          onChange={(e) => setEndTimestamp(e.target.value)}
        />
        <button onClick={handleCutMedia}>Cut Media</button>
      </div>
    </div>
  );
};

export default Test;
