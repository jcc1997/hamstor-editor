<template>
    <template v-if="shape.type === 'rect'">
        <v-rect :config="shape.config" :key="shape.id" ref="shapeRef" />
    </template>
    <template v-else-if="shape.type === 'circle'">
        <v-circle :config="shape.config" :key="shape.id" ref="shapeRef" />
    </template>
</template>
<script setup lang="ts">
import { AnimateSize, isAnimateSize, ShapeMeta } from './types';
import { defineProps, onMounted, ref } from 'vue';
import type Konva from 'konva';
import { useAnimationManager } from './animations/hook';
import { IFrame } from 'konva/lib/types';

const props = defineProps<{
    shape?: ShapeMeta;
}>();

const shapeRef = ref<{
    getNode: () => Konva.Shape;
}>(null);

const animationManager = useAnimationManager();

onMounted(() => {
    const shape = shapeRef.value.getNode();
    const animations = props.shape.animations;
    if (animations && animations.length > 0) {
        function animateAttributeWidth({ from, to, begin, duration }: AnimateSize) {
            return function (frame: IFrame) {
                const by = to - from;
                return frame.time >= begin && frame.time <= begin + duration
                    ? { width: Math.min((by * (frame.time - begin)) / duration + from, to) }
                    : {};
            };
        }
        const animationFuncs = animations.filter(isAnimateSize).map(animateAttributeWidth);
        animationManager.onAnimateFrame((frame) => {
            const size = animationFuncs
                .map((v) => v(frame))
                .reduce((prev, curr) => Object.assign(prev, curr));
            const originSize = shape.size();
            shape.size(Object.assign(originSize, size));
        });
    }
});
</script>
