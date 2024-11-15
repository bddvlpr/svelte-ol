<script lang="ts">
  import type { ObjectWithGeometry } from 'ol/Feature.js';
  import type Geometry from 'ol/geom/Geometry.js';

  import { type OLContext, OLContextKey } from '$lib/context.js';
  import Feature from 'ol/Feature.js';
  import { getContext } from 'svelte';

  const options: Geometry | ObjectWithGeometry = $props();

  const context = getContext<OLContext>(OLContextKey);
  const source = context.getVectorSource?.();

  let feature: Feature;

  $effect(() => {
    if (!source) {
      throw new Error('No VectorSource parent found. Feature must be a child of a VectorLayer.');
    }

    feature = new Feature(options);
    source.addFeature(feature);

    return () => {
      source.removeFeature(feature);
    };
  });
</script>
