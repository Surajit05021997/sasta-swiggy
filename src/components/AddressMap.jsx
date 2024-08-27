import { useEffect } from 'react';
import './AddressMap.css';
import useLocation from '../utilities/useLocation';
import axios from 'axios';
import PropTypes from 'prop-types';

const AddressMap = ({setMarkerAddress}) => {
  const { location } = useLocation();

  async function initMap() {
    let position;
    // Request needed libraries.
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
    const map = new Map(document.getElementById("map"), {
      center: { lat: location.lat, lng: location.lng },
      zoom: 14,
      mapId: "4504f8b37365c3d0",
    });

    const draggableMarker = new AdvancedMarkerElement({
      map,
      position: { lat: location.lat, lng: location.lng },
      gmpDraggable: true,
      title: "This marker is draggable.",
    });
    
    addressDescriptorReverseGeocoding(location);
  
    draggableMarker.addListener("dragend", () => {
      position = draggableMarker.position;
      addressDescriptorReverseGeocoding(position);
    });
  }

  async function addressDescriptorReverseGeocoding(position) {
    const reverseGeocodingData = await axios.get(`https://geocode.maps.co/reverse?lat=${position.lat}&lon=${position.lng}&api_key=${import.meta.env.VITE_GEOCODING_API_KEY}`);
    setMarkerAddress(reverseGeocodingData.data.display_name);
  }
  
  useEffect(() => {
    if(location.lat && location.lng) {
      initMap();
    }
  }, [location]);

  return (
    <div className="map-container">
      <div id="map"></div>
    </div>
  );
}

AddressMap.propTypes = {
  setMarkerAddress: PropTypes.func.isRequired,
}


export default AddressMap;
