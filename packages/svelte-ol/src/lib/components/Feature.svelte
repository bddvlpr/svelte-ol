<script lang="ts">
  import type { ObjectWithGeometry } from 'ol/Feature.js';
  import type Geometry from 'ol/geom/Geometry.js';

  import { type OLContext, OLContextKey } from '$lib/context.js';
  import Feature from 'ol/Feature.js';
  import VectorSource from 'ol/source/Vector.js';
  import { getContext } from 'svelte';

  const options: Geometry | ObjectWithGeometry = $props();

  const context = getContext<OLContext>(OLContextKey);
  const parent = $derived(context.getParent?.());

  let feature: Feature;

  $effect(() => {
    const source = parent?.getSource();
    if (!(source instanceof VectorSource)) {
      throw new Error(
        'No VectorSource found. Feature must have a parent Layer with a VectorSource.'
      );
    }

    feature = new Feature(options);
    source.addFeature(feature);

    return () => {
      source.removeFeature(feature);
    };
  });
</script>
