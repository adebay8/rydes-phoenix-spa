import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import { getActivePosition } from "../../../../utils/helper";
import { Spinner } from "../../../components";
import "./map.scss";

const AnyReactComponent = ({ text }: any) => (
   <div>
      <img src="/static/icons/map-marker.svg" height={30} width={30} alt="current location" />
   </div>
);

const Maps = () => {
   const [position, setPosition] = useState<{ lat: number; lng: number }>({
      lat: 51.503399,
      lng: -0.119519,
   });
   const [loading, setLoading] = useState<boolean>(true);

   useEffect(() => {
      getActivePosition(setPosition);
      setLoading(false);
   }, []);

   return loading ? (
      <Spinner size={40} />
   ) : (
      <div className="map">
         <GoogleMapReact
            bootstrapURLKeys={{
               key: "AIzaSyDTpDMmyWINZhlX-zFNEXltuDmQ9WLhBuQ",
            }}
            defaultCenter={{
               lat: position.lat,
               lng: position.lng,
            }}
            defaultZoom={17}
         >
            <AnyReactComponent lat={position.lat} lng={position.lng} text="My Marker" />
         </GoogleMapReact>
      </div>
   );
};

export default Maps;
