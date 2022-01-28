import Konva from 'konva';
import { inject, InjectionKey, provide } from 'vue';
import mitt from 'mitt';
import { IFrame, AnimationFn } from 'konva/lib/types';

export type AnimationManagerSymbol = InjectionKey<ReturnType<typeof provideAnimationManager>>;

export const symbol: AnimationManagerSymbol = Symbol('animation manager');

export function provideAnimationManager() {
    const emitter = mitt<{
        frame: IFrame | undefined;
    }>();
    // 动画轴的时间
    let clock = 0;
    const animation = new Konva.Animation(function (frame) {
        clock += frame?.timeDiff || 0;
        emitter.emit('frame', {
            ...frame,
            time: clock,
        } as IFrame);
    });

    const manager = {
        start() {
            clock = 0;
            animation.start();
        },
        pause() {
            animation.stop();
        },
        restart() {
            animation.stop();
            manager.seek(0);
            animation.start();
        },
        seek(time: number) {
            emitter.emit('frame', {
                time: time,
                lastTime: clock,
            } as IFrame);
            clock = time;
        },
        addLayer(node: Konva.Layer) {
            animation.setLayers(animation.getLayers().concat(node));
            return function remove() {
                manager.removeLayer(node);
            };
        },
        removeLayer(node: Konva.Layer) {
            const currentLayers = animation.getLayers();
            const idx = currentLayers.indexOf(node);
            animation.setLayers(currentLayers.splice(idx, 1));
        },
        onAnimateFrame(listener: AnimationFn) {
            emitter.on('frame', listener);
            return function off() {
                emitter.off('frame', listener);
            };
        },
    };
    provide(symbol, manager);
    return manager;
}

export function useAnimationManager() {
    return inject(symbol);
}
