// Components/Tracking/index.js (Main tracking provider)
import GoogleAnalytics from './GoogleAnalytics';
import GoogleTagManager from './GoogleTagManager';
import MicrosoftClarity from './MicrosoftClarity';
import MetaPixel from './MetaPixel';

const TrackingProvider = () => {
  return (
    <>
      <GoogleAnalytics />
      <GoogleTagManager />
      <MicrosoftClarity />
      <MetaPixel />
    </>
  );
};

export default TrackingProvider;