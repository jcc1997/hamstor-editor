<template>
    <v-stage
        ref="stage"
        :config="stageSize"
        @mousedown="handleStageMouseDown"
        @touchstart="handleStageMouseDown"
    >
        <v-layer ref="layer">
            <v-rect
                v-for="item in rectangles"
                :key="item.id"
                :config="item"
                @transformend="handleTransformEnd"
            />
            <v-transformer ref="transformer" />
        </v-layer>
    </v-stage>
</template>

<script setup lang="ts">
import Konva from 'konva';
import { ref } from 'vue';
const width = window.innerWidth;
const height = window.innerHeight;

const stageSize = {
    width: width,
    height: height,
};

const rectangles = ref([
    {
        id: '1',
        rotation: 0,
        x: 10,
        y: 10,
        width: 100,
        height: 100,
        scaleX: 1,
        scaleY: 1,
        fill: 'red',
        name: 'rect1',
        draggable: true,
    },
    {
        id: '2',
        rotation: 0,
        x: 150,
        y: 150,
        width: 100,
        height: 100,
        scaleX: 1,
        scaleY: 1,
        fill: 'green',
        name: 'rect2',
        draggable: true,
    },
]);
const selectedShapeName = ref('');

function handleTransformEnd(e) {
    // shape is transformed, let us save new attrs back to the node
    // find element in our state
    const rect = rectangles.value.find((r) => r.name === selectedShapeName.value);
    // update the state
    rect.x = e.target.x();
    rect.y = e.target.y();
    rect.rotation = e.target.rotation();
    rect.scaleX = e.target.scaleX();
    rect.scaleY = e.target.scaleY();

    // change fill
    rect.fill = Konva.Util.getRandomColor();
}

function handleStageMouseDown(e) {
    if (!e.evt) return;
    // clicked on stage - clear selection
    if (e.target === e.target.getStage()) {
        selectedShapeName.value = '';
        updateTransformer();
        return;
    }

    // clicked on transformer - do nothing
    const clickedOnTransformer = e.target.getParent().className === 'Transformer';
    if (clickedOnTransformer) {
        return;
    }

    // find clicked rect by its name
    const name = e.target.name();
    const rect = rectangles.value.find((r) => r.name === name);
    if (rect) {
        selectedShapeName.value = name;
    } else {
        selectedShapeName.value = '';
    }
    updateTransformer();
}

const transformer = ref(null);
function updateTransformer() {
    // here we need to manually attach or detach Transformer node
    const transformerNode = transformer.value.getNode();
    const stage = transformerNode.getStage();

    const selectedNode = stage.findOne('.' + selectedShapeName.value);
    // do nothing if selected node is already attached
    if (selectedNode === transformerNode.node()) {
        return;
    }

    if (selectedNode) {
        // attach to another node
        transformerNode.nodes([selectedNode]);
    } else {
        // remove transformer
        transformerNode.nodes([]);
    }
}
</script>
