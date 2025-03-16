import React from "react";
import { GoogleAnalytics } from '@next/third-parties/google'

const App = ({ Component, pageProps }) => {
  useEffect(() => {
    const script1 = document.createElement("script");
    script1.innerHTML = `
      window.project_id = "c617a643c2004572b225b4";
      window.frame_type = "widget";
    `;
    document.body.appendChild(script1);

    const script2 = document.createElement("script");
    script2.src = "https://app.getodin.ai/loader.min.js";
    script2.setAttribute("project_id", "c617a643c2004572b225b4");
    script2.setAttribute("frame_type", "widget");
    script2.defer = true;
    document.body.appendChild(script2);

    return () => {
      document.body.removeChild(script1);
      document.body.removeChild(script2);
    };
  }, []);
  
  return (
    <>
       <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID} />
      <Component {...pageProps} />
    </>
  );
};

export default App;
