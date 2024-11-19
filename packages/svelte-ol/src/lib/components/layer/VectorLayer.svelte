<script lang="ts">
  import type { Options } from 'ol/layer/Vector.js';
  import type VectorSourceType from 'ol/source/Vector.js';

  import { type OLContext, OLContextKey } from '$lib/context.js';
  import { addLayer } from '$lib/layer.svelte.js';
  import Vector from 'ol/layer/Vector.js';
  import { getContext, setContext, type Snippet } from 'svelte';

  const {
    children,
    ...options
  }: {
    children?: Snippet;
  } & Options<VectorSourceType> = $props();

  const context = getContext<OLContext>(OLContextKey);

  let vector: Vector;

  let ready = $state(false);

  $effect(() => {
    vector = new Vector(options);
    addLayer(vector);
    ready = true;

    return () => {
      ready = false;
      vector.dispose();
    };
  });

  setContext<OLContext>(OLContextKey, {
    ...context,
    getParent: () => vector
  });
</script>

{#if ready}
  {@render children?.()}
{/if}
