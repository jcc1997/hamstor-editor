<template>
    <template v-if="layer.fast">
        <v-fast-layer :config="layer.config" :key="layer.id" ref="layerRef">
            <slot></slot>
        </v-fast-layer>
    </template>
    <template v-else>
        <v-layer :config="layer.config" :key="layer.id" ref="layerRef">
            <slot></slot>
        </v-layer>
    </template>
</template>
<script setup lang="ts">
import { LayerMeta } from './types';
import { defineProps, onBeforeUnmount, onMounted, ref } from 'vue';
import Konva from 'konva';
import { useAnimationManager } from './animations/hook';

const props = defineProps<{
    layer?: LayerMeta;
}>();

const layerRef = ref<{
    getNode: () => Konva.Layer;
}>(null);

const animationManager = useAnimationManager();

let removeLayer: () => void | undefined;
onMounted(() => {
    const node = layerRef.value.getNode();
    removeLayer = animationManager.addLayer(node);
});
onBeforeUnmount(() => {
    removeLayer && removeLayer();
});
</script>
