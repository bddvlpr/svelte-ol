import type BaseLayer from 'ol/layer/Base.js';
import { getContext } from 'svelte';
import { type OLContext, OLContextKey } from './context.js';

export const addLayer = (layer: BaseLayer) => {
  const context = getContext<OLContext>(OLContextKey);
  const map = $derived(context.getMap());
  const group = $derived(context.getGroup?.());

  if (group) {
    group.getLayers().push(layer);
  } else {
    map.addLayer(layer);
  }
};
