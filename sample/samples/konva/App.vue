<template>
    <h1>Konva Loder</h1>
    <Loader />
</template>
<script setup lang="ts">
import type { Template } from './types';
import Loader from './Loader.vue';

const template: Template = {
    stage: {
        config: {
            width: 200,
            height: 200,
        },
    },
    layers: [],
};
</script>
