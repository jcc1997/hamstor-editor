import { Template } from '../types';

export const template: Template = {
    stage: {
        config: {
            width: 1000,
            height: 200,
        },
    },
    layers: [
        {
            id: '1',
            fast: true,
            config: {},
            shapes: [
                {
                    type: 'rect',
                    config: {
                        x: 20,
                        y: 20,
                        width: 500,
                        height: 20,
                        fill: 'green',
                        stroke: 'black',
                        strokeWidth: 2,
                    },
                    animation: {
                        attribute: 'width',
                        values: [{ from: 0, to: 500, begin: 1000, duration: 3000 }],
                    },
                },
            ],
        },
    ],
};
