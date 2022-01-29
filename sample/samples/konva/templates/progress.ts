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
                        width: 0,
                        height: 20,
                        fill: 'green',
                    },
                    animations: [
                        {
                            type: 'animate',
                            attribute: 'width',
                            from: 0,
                            to: 100,
                            begin: 0,
                            duration: 1000,
                        },
                    ],
                },
                {
                    type: 'rect',
                    config: {
                        x: 120,
                        y: 20,
                        width: 0,
                        height: 20,
                        fill: 'red',
                    },
                    animations: [
                        {
                            type: 'animate',
                            attribute: 'width',
                            from: 0,
                            to: 100,
                            begin: 1000,
                            duration: 2000,
                        },
                    ],
                },
            ],
        },
    ],
};
