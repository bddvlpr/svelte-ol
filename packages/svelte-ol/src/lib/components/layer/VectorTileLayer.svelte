<script lang="ts">
  import type { Options } from 'ol/layer/VectorTile.js';
  import type VectorTileSourceType from 'ol/source/VectorTile.js';

  import { type OLContext, OLContextKey } from '$lib/context.js';
  import { addLayer } from '$lib/layer.svelte.js';
  import VectorTile from 'ol/layer/VectorTile.js';
  import { getContext, setContext, type Snippet } from 'svelte';

  const {
    children,
    ...options
  }: {
    children?: Snippet;
  } & Options<VectorTileSourceType> = $props();

  const context = getContext<OLContext>(OLContextKey);

  let vectorTile: VectorTile;

  let ready = $state(false);

  $effect(() => {
    vectorTile = new VectorTile(options);
    addLayer(vectorTile);
    ready = true;

    return () => {
      ready = false;
      vectorTile.dispose();
    };
  });

  setContext<OLContext>(OLContextKey, {
    ...context,
    getParent: () => vectorTile
  });
</script>

{#if ready}
  {@render children?.()}
{/if}
