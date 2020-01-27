import React, { PropTypes } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';

import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';

import MapMarker from './MapMarker';

import decorateMapComponent, {
  SUPPORTED,
  USES_DEFAULT_IMPLEMENTATION,
} from './decorateMapComponent';

const viewConfig = {
  uiViewClassName: 'AIR<provider>MapMarker',
  validAttributes: {
    coordinate: true,
  },
};

class MapViewNextOverlay extends React.Component {
  static propTypes = {
    bounds: React.PropTypes.arrayOf(React.PropTypes.arrayOf(React.PropTypes.number)).isRequired,
    image: Image.propTypes.source,
    region: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
    }),
  };

  render() {
    const { region, bounds, image } = this.props;
    
    const width = Math.abs(bounds[0][0] - bounds[1][0]) * 5600;
    const height = Math.abs(bounds[1][0] - bounds[1][1]);

    return (
      <MapMarker coordinate={region}>
        <Image
          source={image}
          style={{ width, height }}
        />
      </MapMarker>
    );
  }
}

module.exports = decorateMapComponent(MapViewNextOverlay, {
  componentType: 'Marker',
  providers: {
    google: {
      ios: SUPPORTED,
      android: USES_DEFAULT_IMPLEMENTATION,
    },
  },
});
