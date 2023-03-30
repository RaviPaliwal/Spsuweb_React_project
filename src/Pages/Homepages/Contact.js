import React, { useState, useEffect } from "react";

const Contact = () => {
  const [map, setMap] = useState(null);
  const lat = 37.7749;
  const lng = -122.4194;

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://1map.com/js/script-for-user.js?embed_id=902811`;
    script.async = true;
    document.body.appendChild(script);
    
    script.onload = () => {
      setMap(window.OneMapSDK.maps[0]);
    };

    return () => {
      document.body.removeChild(script);
      setMap(null);
    };
  }, [lat, lng]);

  return (
    <>
      {map && <div id="map" style={{ height: "400px", width: "100%" }}></div>}
    </>
  );
};

export default Contact;
