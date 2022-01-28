<template>
    <div>
        <v-stage ref="stage" :config="stageConfig">
            <v-layer ref="layer">
                <v-group ref="groupRef">
                    <v-star
                        v-for="item in list"
                        :key="item.id"
                        :config="{
                            x: item.x,
                            y: item.y,
                            rotation: item.rotation,
                            id: item.id,
                            numPoints: 5,
                            innerRadius: 30,
                            outerRadius: 50,
                            fill: '#89b717',
                            opacity: 0.8,
                            shadowColor: 'black',
                            shadowBlur: 10,
                            shadowOpacity: 0.6,
                            scaleX: item.scale,
                            scaleY: item.scale,
                        }"
                    />
                </v-group>
            </v-layer>
        </v-stage>
        <div class="cache">
            <input type="checkbox" @change="handleCacheChange" checked /> cache shapes
        </div>
    </div>
</template>

<script setup lang="ts">
import { onBeforeMount, onMounted, ref } from 'vue';
import Konva from 'konva';

const { Animation } = Konva;

const width = window.innerWidth;
const height = window.innerHeight;
const list = ref([]);
const dragItemIdRef = ref(null);
const stageConfig = {
    width: width,
    height: height,
    draggable: true,
};
const groupRef = ref(null);
function handleCacheChange(e) {
    const shouldCache = e.target.checked;
    if (shouldCache) {
        groupRef.value.getNode().cache();
    } else {
        groupRef.value.getNode().clearCache();
    }
}
onBeforeMount(() => {
    for (let n = 0; n < 300; n++) {
        list.value.push({
            id: Math.round(Math.random() * 10000).toString(),
            x: Math.random() * width,
            y: Math.random() * height,
            rotation: Math.random() * 180,
            scale: Math.random(),
        });
    }
});
onMounted(() => {
    handleCacheChange({ target: { checked: true } });
});
</script>

<style>
body {
    margin: 0;
    padding: 0;
}

.cache {
    position: absolute;
    top: 0;
    left: 0;
}
</style>
