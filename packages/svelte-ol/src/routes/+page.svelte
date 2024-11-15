<script lang="ts">
  import Feature from '$lib/components/Feature.svelte';
  import { Map, TileLayer, VectorLayer, View } from '$lib/index.js';
  import { fromExtent } from 'ol/geom/Polygon.js';
  import OSM from 'ol/source/OSM.js';
  import VectorSource from 'ol/source/Vector.js';

  let shown = $state(false);
</script>

<button onclick={() => (shown = !shown)}>
  {#if shown}
    Hide
  {:else}
    Show
  {/if}
</button>

<div style="width: 100%; height: 100%;">
  <Map>
    <View center={[0, 0]} zoom={2} />
    <TileLayer source={new OSM()} />
    <VectorLayer source={new VectorSource({ wrapX: true })}>
      {#if shown}
        <Feature geometry={fromExtent([-1000000, 5000000, 3000000, 7000000])} />
      {/if}
    </VectorLayer>
  </Map>
</div>
