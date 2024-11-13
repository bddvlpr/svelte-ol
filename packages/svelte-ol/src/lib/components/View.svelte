<script lang="ts">
  import type { ViewOptions } from 'ol/View.js';

  import { type OLContext, OLContextKey } from '$lib/context.js';
  import View from 'ol/View.js';
  import { getContext } from 'svelte';

  const options: ViewOptions = $props();

  const context = getContext<OLContext>(OLContextKey);
  const map = $derived(context.getMap());

  let view: View;

  $effect(() => {
    view = new View(options);
    map.setView(view);
  });
</script>
