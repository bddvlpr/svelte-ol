<script lang="ts">
  import type { Options } from 'ol/layer/Graticule.js';

  import { type OLContext, OLContextKey } from '$lib/context.js';
  import { addLayer } from '$lib/layer.js';
  import Graticule from 'ol/layer/Graticule.js';
  import { getContext, setContext, type Snippet } from 'svelte';

  const {
    children,
    ...options
  }: {
    children?: Snippet;
  } & Options = $props();

  const context = getContext<OLContext>(OLContextKey);
  const map = $derived(context.getMap());
  const group = $derived(context.getGroup?.());

  let graticule: Graticule;

  let ready = $state(false);

  $effect(() => {
    graticule = new Graticule(options);
    addLayer(map, group, graticule);
    ready = true;

    return () => {
      ready = false;
      graticule.dispose();
    };
  });

  setContext<OLContext>(OLContextKey, {
    ...context,
    getParent: () => graticule
  });
</script>

{#if ready}
  {@render children?.()}
{/if}
