import Canvg from 'canvg';

export async function renderVideo(svgStr: string, ctx: CanvasRenderingContext2D) {
    const canvg = Canvg.fromString(ctx, svgStr);
    await canvg.render();
}