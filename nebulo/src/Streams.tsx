import { useEffect, useState } from 'react';
import './css/Streams.css';

declare global {
  interface Window {
    Twitch: any;
  }
}

const Streams = () => {
  const [channel, setChannel] = useState('forsen');

  useEffect(() => {
    const initializeTwitchEmbed = () => {
      const embedContainer = document.getElementById('twitch-embed');
      if (!embedContainer) {
        console.error('Twitch embed container not found');
        return;
      }

      embedContainer.innerHTML = '';

      new window.Twitch.Embed('twitch-embed', {
        width: 854,
        height: 480,
        channel: channel,
        layout: 'video',
      });
    };

    if (!document.getElementById('twitch-embed-script')) {
      const script = document.createElement('script');
      script.setAttribute('id', 'twitch-embed-script');
      script.setAttribute('src', 'https://embed.twitch.tv/embed/v1.js');
      script.addEventListener('load', initializeTwitchEmbed);
      document.body.appendChild(script);
    } else {
      initializeTwitchEmbed();
    }
  }, [channel]);

  return (
    <div className="streams">
      <div className="stream-controls">
        <button onClick={() => setChannel('forsen')}>Forsen</button>
        <button onClick={() => setChannel('xqc')}>xQc</button>
      </div>
      <div id="twitch-embed"></div>
    </div>
  );
};

export default Streams;