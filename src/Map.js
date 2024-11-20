import React from 'react';
import './App.css';
import Header from "./Header";
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import sightsData from './sightsData';
import 'reactjs-popup/dist/index.css';
import L from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import 'react-leaflet-markercluster/dist/styles.min.css';
import Kvillage from './images/Kvillage.jpg';
import Kvillage2 from './images/Kvillage2.jpg';
import Waterfall from './images/waterfall.jpg';
import NorthernLights from './images/northernLight.jpg';
import Snowfall from 'react-snowfall';


const Map = () => {
  const NordicPosition = [63.0, 14.];
  const NordicZoom = 5;


  const pathCoordinates = [
    [68.3346, 27.3358], 
    [67.0739, 26.9148], 
    [61.4981, 23.7608], 
    [60.1674, 24.9513],
    [60.4525, 22.2666],
    [60.4354, 22.2202],
    [59.3250, 18.0706],
    [59.2741, 15.2134],
    [59.3797, 13.5040],
    [57.6988, 11.9554],
    [59.9127, 10.7372],
    [61.1153, 10.4681],
    [60.3966, 5.3243],
    [57.6988, 11.9554],
    [55.6735, 12.5702],
    [56.1490, 10.2070],
  ];

  const icon = new L.Icon({
    iconUrl: require('./images/pin.png'),
    iconSize: new L.Point(50, 50), 
    iconAnchor: new L.Point(12, 30), 
    popupAnchor: new L.Point(0, -30), 
    className: '' 
  });

  const start = new L.Icon({
    iconUrl: require('./images/start.png'),
    iconSize: new L.Point(50, 50), 
    iconAnchor: new L.Point(12, 30), 
    popupAnchor: new L.Point(0, -30), 
    className: '' 
  });

  const finish= new L.Icon({
    iconUrl: require('./images/finish.png'),
    iconSize: new L.Point(50, 50), 
    iconAnchor: new L.Point(12, 30), 
    popupAnchor: new L.Point(0, -30), 
    className: '' 
  });


  const train = new L.Icon({
    iconUrl: require('./images/trainIcon.png'),
    iconSize: new L.Point(50, 50), 
    iconAnchor: new L.Point(12, 30), 
    popupAnchor: new L.Point(0, -30), 
    className: '' 
  });
  const ship = new L.Icon({
    iconUrl: require('./images/shipIcon.png'),
    iconSize: new L.Point(70, 70), 
    iconAnchor: new L.Point(12, 30), 
    popupAnchor: new L.Point(0, -30), 
    className: '' 
  });
  const bus = new L.Icon({
    iconUrl: require('./images/busIcon.png'),
    iconSize: new L.Point(30, 25), 
    iconAnchor: new L.Point(12, 30), 
    popupAnchor: new L.Point(0, -30), 
    className: '' 
  });

  const createClusterCustomIcon = (cluster) => {
    const count = cluster.getChildCount();
    let size = 'Large';
  
    if (count < 3) {
      size = 'Small';
    } else if (count >= 3 && count < 4) {
      size = 'Medium';
    } else if (count >= 4 && count < 10) {
      size = 'Large';
    }
  
    const options = {
      cluster: `markerCluster${size}`,
      count: count,
    };
  
    return L.divIcon({
      html: `
        <div class="markerCluster ${options.cluster}">
          <span class="markerClusterLabel">${count}</span>
        </div>
      `,
      className: 'custom-cluster-icon',
    });
  };

  const sightsByCity = sightsData.reduce((groups, sight) => {
    const { city } = sight;
    if (!groups[city]) {
      groups[city] = [];
    }
    groups[city].push(sight);
    return groups;
  }, {});

  const NordicButton = () => {
    const map = useMap();

    const resetMap = () => {
      map.setView(NordicPosition, NordicZoom);
    };

    return (
      <button className="Nordic" onClick={resetMap}>
        Back to map
      </button>
    );
  };



return (
  <div className='Map' style={{ position: 'relative', zIndex: '1' }}>
    <MapContainer center={NordicPosition} zoom={NordicZoom}    dragging={false} 
    scrollWheelZoom={false} 
    doubleClickZoom={false}  style={{ height: '100vh', width: '100%' }}>
        <div>
        <Snowfall
        zIndex="9999" 
        color="white" 
        style={{
        position: 'fixed', 
        top: 0,
        left: 0,
        zIndex: 9999, 
  }}
  snowflakeCount={200}/>
<Header />
  </div>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
            <Polyline 
        positions={pathCoordinates} 
        pathOptions={{ color: '#d46179', weight: 3 }}
      />
      <Marker position={[68.3347, 27.3358]} icon={start}>
      <Popup>
        <div className="popup-container">
          <div className="popup-image-container">
          <img
              src={Kvillage} 
              alt="Kvillage"
              className="popup-image left"
            />
            <img
              src={Kvillage2}
              alt="Kvillage2"
              className="popup-image right"
            />
          </div>
          <div className="popup-text-overlay">
            <h2>Start your Nordic trip with the Natural Wonder</h2>
            <h2>Kakslauttanen Igloo Village: Sleep Under the Northern Lights</h2>
            <p>
            Kakslauttanen Igloo Village is a world-renowned spot in Lapland where you can experience the magic of 
            sleeping under the Northern Lights. The glass igloos are designed to give you a panoramic view of the Arctic sky 
            from the comfort of your bed. There’s also a snow igloo for the brave!
              <br />
              Fun fact: The park is home to Finland’s only amethyst mine, where visitors can dig for their very own 
              gemstone treasures. Legend has it, amethysts bring clarity and peace to those who carry them.
              <br />
              Whether you’re looking for adventure or tranquility, Pyhä-Luosto delivers unforgettable memories in every season.
            </p>
          </div>
        </div>
      </Popup>
      </Marker>
      <Marker position={[56.6021, 8.9024]} icon={finish}>
      <Popup>
        <div className="popup-container">
          <div className="popup-image-container">
          <img
              src={NorthernLights} 
              alt="Odense"
              className="popup-image left"
            />
             <img
              src={Waterfall}
              alt="Kvillage2"
              className="popup-image right"
            />
          </div>
          <div className="popup-text-overlay">
            <h2>Finish your trip in a magical place where stories get alive</h2>
            <p>
            Denmark is the perfect finale to your Nordic adventure by land, with its rich history, vibrant culture, and stunning sights. 
            But if you're still hungry for more, Iceland is just a flight away! Known for its dramatic landscapes, waterfalls, and 
            the Northern Lights, it’s the ideal next stop for those wanting to continue their exploration of the Nordic wonders.
            </p>
          </div>
        </div>
      </Popup>
      </Marker>
      <Marker position={[64.3347, 25.3358]} icon={train}>
        <Popup>
        <div className="popup-container">
        <div className="popup-text-overlay">
          <p>The train journey from Rovaniemi to Tampere offers a scenic and comfortable
            ride through Finland’s captivating landscapes. As you depart from Rovaniemi,
            you'll travel southward through vast forests and open fields, with the occasional
            glimpse of tranquil lakes. The train is equipped with modern amenities, providing a
            smooth and relaxing experience. <br></br><br></br>The route, spanning approximately 800 kilometers,
            takes you from the Arctic Circle to the heart of southern Finland, offering a peaceful and scenic
            escape as you head towards the vibrant city of Tampere. The entire trip typically lasts about 8 to
             9 hours, depending on the service.</p>
        </div>
        </div>
        </Popup>
      </Marker>
      <Marker position={[60.1347, 19.9799]} icon={ship}>
      <Popup>
        <div className="popup-container">
        <div className="popup-text-overlay">
          <p>
          The ferry from Turku to Stockholm offers a relaxing ride across the Baltic Sea,
          passing through Finland's stunning archipelago. With comfortable amenities
          on board, you can rest and enjoy panoramic views of the islands. <br></br><br></br>
          The journey takes about 5 to 6 hours, ending in the vibrant city of Stockholm.</p>
        </div>
        </div>
        </Popup>
      </Marker>
      <Marker position={[58.1347, 11.1799]} icon={bus}>
      <Popup>
        <div className="popup-container">
        <div className="popup-text-overlay">
          <p>
          The bus ride from Gothenburg to Oslo takes you through beautiful Scandinavian landscapes,
          with rolling hills and serene countryside views. The journey, lasting around 3.5 to 4 hours,
          offers a comfortable and scenic route between Sweden and Norway,
          arriving in the vibrant Norwegian capital, Oslo.
          </p>
        </div>
        </div>
        </Popup>
      </Marker>
      <Marker position={[59.1347, 8.3799]} icon={train}>
      <Popup>
        <div className="popup-container">
        <div className="popup-text-overlay">
          <p>
          The train journey from Bergen to Gothenburg takes you through stunning Norwegian landscapes,
          including mountains, fjords, and lush forests. The trip, lasting around 7 to 8 hours, offers a comfortable and scenic ride
          as you travel from Norway's
          western coast to Sweden, arriving back in the bustling city of Gothenburg.
          </p>
        </div>
        </div>
        </Popup>
      </Marker>
      <Marker position={[55.9397, 11.9799]} icon={bus}>
      <Popup>
        <div className="popup-container">
        <div className="popup-text-overlay">
          <p>
          The bus journey from Gothenburg to Copenhagen offers a smooth ride through southern Sweden
          and across the Øresund Bridge into Denmark. Taking about 3.5 to 4 hours, it provides scenic views of
          the Swedish countryside and the 
          coastal landscape before arriving in the vibrant Danish capital.
          </p>
        </div>
        </div>
        </Popup>
      </Marker>
      {Object.entries(sightsByCity).map(([city, sights]) => (
          <MarkerClusterGroup
            key={city}
            iconCreateFunction={createClusterCustomIcon}>
            
              {sights.map((sight) => (
          <Marker key={sight.id} position={sight.position} icon={icon}>
            
            <Popup>
              <div className="popup-container">
                <div className="popup-image-container">
                  <img src={sight.images.left} alt={`${sight.title} Left`} className="popup-image left" />
                  <img src={sight.images.right} alt={`${sight.title} Right`} className="popup-image right" />
                </div>
                <div className="popup-text-overlay">
                  <h2>{sight.title}</h2>
                  <p>{sight.description}</p>
                  <p>{sight.fact}</p>
                </div>
              </div>
            </Popup>
          </Marker>
         ))}
           
         </MarkerClusterGroup>
       ))}
     <NordicButton/>
    </MapContainer>
  </div>
);
};

export default Map;