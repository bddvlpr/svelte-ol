<script lang="ts">
  import type { Options } from 'ol/layer/BaseTile.js';
  import type TileSourceType from 'ol/source/Tile.js';

  import { type OLContext, OLContextKey } from '$lib/context.js';
  import { addLayer } from '$lib/layer.js';
  import Tile from 'ol/layer/Tile.js';
  import { getContext, type Snippet } from 'svelte';

  const {
    children,
    ...options
  }: {
    children?: Snippet;
  } & Options<TileSourceType> = $props();

  const context = getContext<OLContext>(OLContextKey);
  const map = $derived(context.getMap());
  const group = $derived(context.getGroup?.());

  let tileLayer: Tile;

  let ready = $state(false);

  $effect(() => {
    tileLayer = new Tile(options);
    addLayer(map, group, tileLayer);
    ready = true;

    return () => {
      ready = false;
      tileLayer.dispose();
    };
  });
</script>

{#if ready}
  {@render children?.()}
{/if}
