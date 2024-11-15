<script lang="ts">
  import type { Options } from 'ol/layer/BaseImage.js';
  import type ImageSourceType from 'ol/source/Image.js';

  import { type OLContext, OLContextKey } from '$lib/context.js';
  import { addLayer } from '$lib/layer.js';
  import Image from 'ol/layer/Image.js';
  import { getContext, setContext, type Snippet } from 'svelte';

  const {
    children,
    ...options
  }: {
    children?: Snippet;
  } & Options<ImageSourceType> = $props();

  const context = getContext<OLContext>(OLContextKey);
  const map = $derived(context.getMap());
  const group = $derived(context.getGroup?.());

  let image: Image<ImageSourceType>;

  let ready = $state(false);

  $effect(() => {
    image = new Image(options);
    addLayer(map, group, image);
    ready = true;

    return () => {
      ready = false;
      image.dispose();
    };
  });

  setContext<OLContext>(OLContextKey, {
    ...context,
    getParent: () => image
  });
</script>

{#if ready}
  {@render children?.()}
{/if}
