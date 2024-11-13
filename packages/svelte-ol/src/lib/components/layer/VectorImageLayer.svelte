<script lang="ts">
  import type FeatureType from 'ol/Feature.js';
  import type { Options } from 'ol/layer/VectorImage.js';
  import type VectorSourceType from 'ol/source/Vector.js';
  import type { Snippet } from 'svelte';

  import { type OLContext, OLContextKey } from '$lib/context.js';
  import { addLayer } from '$lib/layer.js';
  import VectorImage from 'ol/layer/VectorImage.js';
  import { getContext } from 'svelte';

  const {
    children,
    ...options
  }: {
    children?: Snippet;
  } & Options<FeatureType, VectorSourceType> = $props();

  const context = getContext<OLContext>(OLContextKey);
  const map = $derived(context.getMap());
  const group = $derived(context.getGroup?.());

  let vectorImage: VectorImage;

  let ready = $state(false);

  $effect(() => {
    vectorImage = new VectorImage(options);
    addLayer(map, group, vectorImage);
    ready = true;

    return () => {
      ready = true;
      vectorImage.dispose();
    };
  });
</script>

{#if ready}
  {@render children?.()}
{/if}
