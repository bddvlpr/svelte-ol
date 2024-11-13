<script lang="ts">
  import type { Options } from 'ol/layer/BaseTile.js';
  import type VectorTileSourceType from 'ol/source/VectorTile.js';

  import { type OLContext, OLContextKey } from '$lib/context.js';
  import { addLayer } from '$lib/layer.js';
  import VectorTile from 'ol/layer/VectorTile.js';
  import { getContext, type Snippet } from 'svelte';

  const {
    children,
    ...options
  }: {
    children?: Snippet;
  } & Options<VectorTileSourceType> = $props();

  const context = getContext<OLContext>(OLContextKey);
  const map = $derived(context.getMap());
  const group = $derived(context.getGroup?.());

  let vectorTile: VectorTile;

  let ready = $state(false);

  $effect(() => {
    vectorTile = new VectorTile(options);
    addLayer(map, group, vectorTile);
    ready = true;

    return () => {
      ready = false;
      vectorTile.dispose();
    };
  });
</script>

{#if ready}
  {@render children?.()}
{/if}
