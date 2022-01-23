const svg = document.querySelector('#hamstorSVG') as SVGSVGElement;

setTimeout(() => {
    console.log(svg.getCurrentTime());
    svg.pauseAnimations();
    svg.setCurrentTime(2);
    console.log(svg.getCurrentTime());
}, 2000);
