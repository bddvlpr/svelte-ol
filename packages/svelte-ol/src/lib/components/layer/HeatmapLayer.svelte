<script lang="ts">
  import type FeatureType from 'ol/Feature.js';
  import type { Options } from 'ol/layer/Heatmap.js';
  import type VectorSourceType from 'ol/source/Vector.js';

  import { type OLContext, OLContextKey } from '$lib/context.js';
  import { addLayer } from '$lib/layer.js';
  import Heatmap from 'ol/layer/Heatmap.js';
  import { getContext, setContext, type Snippet } from 'svelte';

  const {
    children,
    ...options
  }: {
    children?: Snippet;
  } & Options<FeatureType, VectorSourceType> = $props();

  const context = getContext<OLContext>(OLContextKey);
  const map = $derived(context.getMap());
  const group = $derived(context.getGroup?.());

  let heatmap: Heatmap;

  let ready = $state(false);

  $effect(() => {
    heatmap = new Heatmap(options);
    addLayer(map, group, heatmap);
    ready = true;

    return () => {
      ready = false;
      heatmap.dispose();
    };
  });

  setContext<OLContext>(OLContextKey, {
    ...context,
    getParent: () => heatmap
  });
</script>

{#if ready}
  {@render children?.()}
{/if}
