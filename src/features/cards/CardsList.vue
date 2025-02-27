<script setup lang="ts">
import WordCard from './WordCard.vue'
</script>

<template>
  <main class="w-full px-12 flex flex-wrap gap-4 py-6">
    <WordCard body="It is very long body" title="The Title" :is-add-button="true" />
    <WordCard body="It is very long body" title="The Title" :is-add-button="false" />
    <WordCard body="It is very long body" title="The Title" :is-add-button="false" />
    <WordCard body="It is very long body" title="The Title" :is-add-button="false" />
    <WordCard body="It is very long body" title="The Title" :is-add-button="false" />
  </main>
</template>
