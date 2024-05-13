import React from "react";
import { GoogleAnalytics } from '@next/third-parties/google'

const App = ({ Component, pageProps }) => {
  return (
    <>
       <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID} />
      <Component {...pageProps} />
    </>
  );
};

export default App;