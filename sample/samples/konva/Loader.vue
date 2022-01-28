<template>
    <v-stage :config="template.stage.config">
        <Layer v-for="(layer, i) in template.layers" :layer="layer" :key="layer.id || i">
            <Shape v-for="(shape, i) in layer.shapes" :shape="shape" :key="shape.id || i" />
        </Layer>
    </v-stage>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
import { provideAnimationManager } from './animations/hook';
import { template } from './templates/progress';
import Layer from './Layer.vue';
import Shape from './Shape.vue';

const animationManager = provideAnimationManager();
onMounted(() => {
    animationManager.start();
    setTimeout(() => {
        animationManager.pause();
    }, 3010);
});
</script>
