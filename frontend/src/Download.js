import React, { useState } from 'react';
import axios from 'axios';

function Download() {
    const [url, setUrl] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const [error, setError] = useState('');

    const handleDownload = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:5000/download?url=${encodeURIComponent(url)}`);
            setVideoUrl(response.data.video_url);
            setError('');
        } catch (err) {
            setError('Invalid Instagram video URL or error fetching the video.');
            setVideoUrl('');
        }
    };

    return (
        <div>
            <h2>Instagram Video Downloader</h2>
            <input
                type="text"
                placeholder="Enter Instagram Video URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
            />
            <button onClick={handleDownload}>Download</button>
            {videoUrl && (
                <div>
                    <a href={videoUrl} target="_blank" rel="noopener noreferrer" download>
                        Download Video
                    </a>
                </div>
            )}
            {error && <p>{error}</p>}
        </div>
    );
}

export default Download;
