<script lang="ts">
  import type { Options as LayerGroupOptions } from 'ol/layer/Group.js';

  import { type OLContext, OLContextKey } from '$lib/context.js';
  import { addLayer } from '$lib/layer.svelte.js';
  import Group from 'ol/layer/Group.js';
  import { getContext, setContext, type Snippet } from 'svelte';

  const {
    children,
    ...options
  }: {
    children?: Snippet;
  } & LayerGroupOptions = $props();

  const context = getContext<OLContext>(OLContextKey);

  let layerGroup: Group;

  let ready = $state(false);

  $effect(() => {
    layerGroup = new Group(options);
    addLayer(layerGroup);
    ready = true;

    return () => {
      ready = false;
      layerGroup.dispose();
    };
  });

  setContext<OLContext>(OLContextKey, {
    ...context,
    getGroup: () => layerGroup
  });
</script>

{#if ready}
  {@render children?.()}
{/if}
