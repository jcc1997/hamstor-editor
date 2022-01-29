import type Konva from 'konva';

/**
 * 工具函数
 */
/**
 * 显式表示
 */
type explicit<T> = { [x in keyof T]: T[x] };
/**
 * remove index signature
 */
type removeIndex<T> = {
    // as used to create new keys, or filter out keys
    // 'string extends K ? never : number extends K ? never : K' means K not equal string or number
    [K in keyof T as string extends K ? never : number extends K ? never : K]: T[K];
};
/**
 * remove function signature
 */
type removeFunction<T> = {
    [K in keyof T as K extends `${string}Func` ? never : K]: T[K];
};
type PartialRequired<T, K> = explicit<
    T & {
        [x in keyof T as x extends K ? x : never]-?: T[x];
    }
>;

/**
 * 模版类型声明
 */

/**
 * StageMeta
 */
export type StageMeta = {
    config: PartialRequired<
        Omit<removeFunction<removeIndex<explicit<Konva.StageConfig>>>, 'container'>,
        'width' | 'height'
    >;
};

export type LayerMeta = {
    id?: string;
    fast?: boolean;
    config: removeFunction<removeIndex<explicit<Konva.LayerConfig>>>;
    shapes: ShapeMeta[];
};

export type ShapeMeta = {
    id?: string;
    type: 'circle' | 'rect';
    config: removeFunction<removeIndex<explicit<Konva.ShapeConfig>>>;
    animations?: AnimateMeta[];
};

export type RectMeta = {
    type: 'rect';
    config: removeFunction<removeIndex<explicit<Konva.RectConfig>>>;
} & ShapeMeta;

export type CircleMeta = {
    type: 'circle';
    config: removeFunction<removeIndex<explicit<Konva.CircleConfig>>>;
} & ShapeMeta;

export type Template = {
    stage: StageMeta;
    layers: LayerMeta[];
};

export { Konva };

export function isRectMeta(shapeMeta: ShapeMeta): shapeMeta is RectMeta {
    return shapeMeta.type === 'rect';
}

export function isCircleMeta(shapeMeta: ShapeMeta): shapeMeta is CircleMeta {
    return shapeMeta.type === 'circle';
}

export type AnimateMeta = {
    type: 'animate' | 'transfrom' | 'motion';
    [x: string]: number | string;
};

export type AnimateSize = {
    type: 'animate';
    attribute: 'width' | 'height';
    from: number;
    to: number;
    begin: number;
    duration: number;
};

export function isAnimateSize(anim: AnimateMeta): anim is AnimateSize {
    return anim.type === 'animate' && (anim.attribute === 'width' || anim.attribute === 'height');
}
