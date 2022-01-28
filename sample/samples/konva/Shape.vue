<template>
    <template v-if="shape.type === 'rect'">
        <v-rect :config="shape.config" :key="shape.id" ref="shapeRef" />
    </template>
    <template v-else-if="shape.type === 'circle'">
        <v-circle :config="shape.config" :key="shape.id" ref="shapeRef" />
    </template>
</template>
<script setup lang="ts">
import { ShapeMeta } from './types';
import { defineProps, onMounted, ref } from 'vue';
import Konva from 'konva';
import { useAnimationManager } from './animations/hook';

const props = defineProps<{
    shape?: ShapeMeta;
}>();

const shapeRef = ref<{
    getNode: () => Konva.Shape;
}>(null);

const animationManager = useAnimationManager();

onMounted(() => {
    const shape = shapeRef.value.getNode();
    const animationMeta = props.shape.animation;
    if (animationMeta) {
        // const animation = new Konva.Animation((frame) => {}, node.getLayer());
        animationManager.onAnimateFrame((frame) => {
            const originSize = shape.size();
            console.log(frame.time);
            shape.size({
                ...originSize,
                width: Math.min((500 * frame.time) / 3000, 500),
            });
        });
    }
});
</script>
