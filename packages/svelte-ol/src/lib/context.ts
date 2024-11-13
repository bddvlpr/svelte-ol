import type LayerGroup from 'ol/layer/Group.js';
import type Map from 'ol/Map.js';

export const OLContextKey = 'ol';
export type OLContext = {
  getMap: () => Map;
  getGroup?: () => LayerGroup;
};
