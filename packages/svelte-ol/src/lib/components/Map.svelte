<script lang="ts">
  import { type OLContext, OLContextKey } from '$lib/context.js';
  import Map, { type MapOptions } from 'ol/Map.js';
  import { onMount, setContext, type Snippet } from 'svelte';

  const {
    children,
    ...options
  }: {
    children?: Snippet;
  } & MapOptions = $props();

  let target: HTMLDivElement;
  let map: Map;

  let ready = $state(false);

  onMount(() => {
    map = new Map({
      target,
      ...options
    });
    ready = true;
  });

  export const getMap = () => map;

  setContext<OLContext>(OLContextKey, {
    getMap: () => map
  });
</script>

<div bind:this={target} class="ol-map-container">
  {#if ready}
    {@render children?.()}
  {/if}
</div>

<style>
  .ol-map-container {
    width: 100%;
    height: 100%;
  }
</style>
