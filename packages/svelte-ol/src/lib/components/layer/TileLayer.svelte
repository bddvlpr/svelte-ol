<script lang="ts">
  import type { Options } from 'ol/layer/BaseTile.js';
  import type TileSourceType from 'ol/source/Tile.js';

  import { type OLContext, OLContextKey } from '$lib/context.js';
  import { addLayer } from '$lib/layer.svelte.js';
  import Tile from 'ol/layer/Tile.js';
  import { getContext, setContext, type Snippet } from 'svelte';

  const {
    children,
    ...options
  }: {
    children?: Snippet;
  } & Options<TileSourceType> = $props();

  const context = getContext<OLContext>(OLContextKey);

  let tileLayer: Tile;

  let ready = $state(false);

  $effect(() => {
    tileLayer = new Tile(options);
    addLayer(tileLayer);
    ready = true;

    return () => {
      ready = false;
      tileLayer.dispose();
    };
  });

  setContext<OLContext>(OLContextKey, {
    ...context,
    getParent: () => tileLayer
  });
</script>

{#if ready}
  {@render children?.()}
{/if}
