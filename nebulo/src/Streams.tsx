import { useEffect } from 'react';

declare global {
  interface Window {
    Twitch: any;
  }
}

const Streams = () => {
  useEffect(() => {
    const initializeTwitchEmbed = () => {
      const embedContainer = document.getElementById('twitch-embed');
      if (!embedContainer) {
        console.error('Twitch embed container not found');
        return;
      }

      if (embedContainer.childNodes.length > 0) {
        return;
      }

      new window.Twitch.Embed('twitch-embed', {
        width: 854,
        height: 480,
        channel: 'forsen',
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
  }, []);

  return (
    <div className="streams">
      <div id="twitch-embed"></div>
    </div>
  );
};

export default Streams;