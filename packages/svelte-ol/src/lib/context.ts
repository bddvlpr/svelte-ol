import type LayerGroup from 'ol/layer/Group.js';
import type Layer from 'ol/layer/Layer.js';
import type Map from 'ol/Map.js';
import type VectorSource from 'ol/source/Vector.js';

export const OLContextKey = 'ol';
export type OLContext = {
  /**
   * Returns the map instance.
   * @returns {Map} The map instance.
   */
  getMap: () => Map;

  /**
   * Returns the layer group of the current child.
   * @returns {LayerGroup} The layer group of the current child or `undefined` if the child has no group.
   */
  getGroup?: () => LayerGroup;

  /**
   * Returns the most direct parent layer of the current child.
   * @returns {Layer} The parent layer or `undefined` if the layer has no parent.
   */
  getParent?: () => Layer;

  /**
   * Returns the vector source of the current child.
   * @returns {VectorSource} The vector source of the current child or `undefined` if the child has no source.
   */
  getVectorSource?: () => VectorSource | null;
};
