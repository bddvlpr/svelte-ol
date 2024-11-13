import type BaseLayer from 'ol/layer/Base.js';
import type LayerGroup from 'ol/layer/Group.js';
import type Map from 'ol/Map.js';

export const addLayer = (map: Map, group: LayerGroup | undefined, layer: BaseLayer) => {
  if (group) {
    group.getLayers().push(layer);
  } else {
    map.addLayer(layer);
  }
};
