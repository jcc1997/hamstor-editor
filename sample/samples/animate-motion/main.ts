import { renderVideo } from '@hamstor-editor/core/index';

const svg = document.querySelector('#hamstorSVG') as SVGSVGElement;

// setTimeout(() => {
//     console.log(svg.getCurrentTime());
//     svg.pauseAnimations();
//     svg.setCurrentTime(2);
//     console.log(svg.getCurrentTime());
// }, 2000);

const svgStr = `<svg id="hamstorSVG" width="500" height="150">
<path d="M10,50 q50,50 100,0 q50,-50 100,0" style="stroke: #000000; fill: none"></path>
<rect x="210" y="50" width="30" height="15" style="stroke: #ff0000; fill: none">
    <animateMotion
        path="M-200,0 q50,50 100,0 q50,-50 100,0"
        begin="0s"
        dur="3s"
    ></animateMotion>
</rect>
<circle cx="210" cy="50" r="1" fill="red" />
</svg>`;

const canvas = document.querySelector('#hamstorCanvas')! as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;

svg.pauseAnimations();
svg.setCurrentTime(2);

console.log((new XMLSerializer).serializeToString(svg));
let blob = new Blob([(new XMLSerializer).serializeToString(svg)], {type: 'image/svg+xml'}); // 没有animation

const img = new Image();
document.body.append(img);
console.log(img);
img.src = URL.createObjectURL(blob);
img.onload = function(){
   const startTime = Date.now();
   function render() {
      console.log('drawImage');
      ctx.clearRect(0, 0, img.width, img.height);
      ctx.drawImage(img, 0, 0);
      if (Date.now() - startTime <= 3000) {
         requestAnimationFrame(render);
      } else {
         ctx.clearRect(0, 0, img.width, img.height);
         ctx.drawImage(img, 0, 0);
      }
   }
   render();
}
