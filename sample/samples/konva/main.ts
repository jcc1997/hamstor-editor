import { createApp } from 'vue';
import VueKonva from 'vue-konva';
import App from './App.vue';
import Stats from 'stats.js';

const app = createApp(App);
app.use(VueKonva);
app.mount('#app');

const stats = new Stats();
stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom);
requestAnimationFrame(function animate() {
    stats.begin();
    stats.end();
    requestAnimationFrame(animate);
});
