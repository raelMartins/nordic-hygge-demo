import React, {Children, cloneElement, isValidElement, useEffect, useRef, useState} from 'react';
import {Box} from '@chakra-ui/react';
import {createCustomEqual} from 'fast-equals';
import {Wrapper} from '@googlemaps/react-wrapper';
import isMobile from '@/utils/extras';

const render = status => {
  return <h1>{status}</h1>;
};
const deepCompareEqualsForMaps = createCustomEqual(deepEqual => (a, b) => {
  if (
    isLatLngLiteral(a) ||
    a instanceof google.maps.LatLng ||
    isLatLngLiteral(b) ||
    b instanceof google.maps.LatLng
  ) {
    return new google.maps.LatLng(a).equals(new google.maps.LatLng(b));
  }
  // TODO extend to other types
  // use fast-equals for other objects
  return deepEqual(a, b);
});

function useDeepCompareMemoize(value) {
  const ref = useRef();

  if (!deepCompareEqualsForMaps(value, ref.current)) {
    ref.current = value;
  }
  return ref.current;
}

function useDeepCompareEffectForMaps(callback, dependencies) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(callback, dependencies.map(useDeepCompareMemoize));
}
const Map = ({onClick, onIdle, children, style, ...options}) => {
  // [START maps_react_map_component_add_map_hooks]
  const ref = useRef(null);
  const [map, setMap] = useState();

  useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {}));
    }
  }, [ref, map]);
  // [END maps_react_map_component_add_map_hooks]
  // [START maps_react_map_component_options_hook]
  // because React does not do deep comparisons, a custom hook is used
  // see discussion in https://github.com/googlemaps/js-samples/issues/946
  useDeepCompareEffectForMaps(() => {
    if (map) {
      map.setOptions(options);
    }
  }, [map, options]);
  // [END maps_react_map_component_options_hook]
  // [START maps_react_map_component_event_hooks]
  useEffect(() => {
    if (map) {
      ['click', 'idle'].forEach(eventName => google.maps.event.clearListeners(map, eventName));
      if (onClick) {
        map.addListener('click', onClick);
      }

      if (onIdle) {
        map.addListener('idle', () => onIdle(map));
      }
    }
  }, [map, onClick, onIdle]);
  // [END maps_react_map_component_event_hooks]
  // [START maps_react_map_component_return]
  return (
    <>
      <div ref={ref} style={style} />
      {Children.map(children, child => {
        if (isValidElement(child)) {
          // set the map prop on the child component
          // @ts-ignore
          return cloneElement(child, {map});
        }
      })}
    </>
  );
  // [END maps_react_map_component_return]
};

const Marker = options => {
  const [marker, setMarker] = useState();

  useEffect(() => {
    if (!marker) {
      setMarker(new google.maps.Marker());
    }

    // remove marker from map on unmount
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);
  useEffect(() => {
    if (marker) {
      marker.setOptions(options);
    }
  }, [marker, options]);
  return null;
};

const MapViewBox = ({lng, lat, width, height}) => {
  const [clicks, setClicks] = useState([]);
  const [zoom, setZoom] = useState(17); // initial zoom
  const [center, setCenter] = useState({
    lat: Number(lat),
    lng: Number(lng),
  });

  const onClick = e => {
    // avoid directly mutating state
    setClicks([...clicks, e.latLng]);
  };

  const onIdle = m => {
    setZoom(m?.getZoom());
    setCenter(m?.getCenter()?.toJSON());
  };

  return (
    <Box w={'100%'}>
      <Wrapper apiKey={'AIzaSyA-5_wkcvc0s0bX1iyez3mBC0g7X0Gzef8'} render={render}>
        <Map
          center={center}
          onClick={onClick}
          onIdle={onIdle}
          zoom={zoom}
          style={{
            flexGrow: '1',
            height: isMobile ? `218px` : height || '500px',
            width: width || `100%`,
            borderRadius: `10px`,
            overflow: `hidden`,
          }}
        >
          {/* {clicks.map((latLng, i) => ( */}
          <Marker position={center} />
          {/* ))} */}
        </Map>
      </Wrapper>
    </Box>
  );
};

export default MapViewBox;
