import React, { Component, createRef } from 'react';
import gsap from 'gsap';
import { loader } from '@superherocheesecake/loader';

import styles from './Spritesheet.module.scss';

import { isFunction } from 'lodash';

const FRAMES_ORDER = [
    4,
    5,
    7,
    6,
    3,
    18,
    56,
    55,
    17,
    15,
    14,
    11,
    10,
    12,
    9,
    8,
    19,
    22,
    13,
    54,
    53,
    26,
    20,
    21,
    2,
    0,
    1,
    27,
    28,
    29,
    30,
    31,
    32,
    33,
    34,
    35,
    16,
    36,
    37,
    38,
    23,
    24,
    25,
    39,
    40,
    41,
    42,
    43,
    44,
    45,
    46,
    47,
    48,
    49,
    50,
    51,
    52
];
const FRAMES_DATA = [
    [1, 1, 498, 638, 0, -711, -218],
    [1, 641, 498, 638, 0, -711, -218],
    [1, 1281, 498, 637, 0, -711, -218],
    [1, 1920, 196, 96, 0, -955, -219],
    [1, 2018, 3, 3, 0, 0, 0],
    [1, 2018, 3, 3, 0, 0, 0],
    [199, 1920, 76, 16, 0, -957, -221],
    [199, 1938, 20, 7, 0, -957, -221],
    [501, 1, 504, 603, 0, -708, -221],
    [1007, 1, 503, 604, 0, -709, -220],
    [1512, 1, 502, 504, 0, -710, -218],
    [1512, 507, 502, 503, 0, -710, -218],
    [501, 606, 503, 504, 0, -709, -218],
    [1006, 607, 501, 611, 0, -708, -221],
    [501, 1112, 500, 503, 0, -711, -218],
    [1509, 1012, 500, 502, 0, -711, -218],
    [1003, 1220, 499, 635, 0, -711, -221],
    [1504, 1516, 492, 502, 0, -718, -218],
    [501, 1617, 254, 358, 0, -955, -219],
    [1, 1, 499, 603, 1, -708, -221],
    [502, 1, 498, 636, 1, -711, -219],
    [1, 606, 498, 636, 1, -711, -219],
    [501, 639, 499, 603, 1, -708, -221],
    [1002, 1, 498, 636, 1, -711, -220],
    [1002, 639, 498, 636, 1, -711, -220],
    [1, 1244, 498, 636, 1, -711, -220],
    [501, 1244, 498, 635, 1, -711, -220],
    [1001, 1277, 498, 635, 1, -711, -221],
    [1501, 1277, 498, 635, 1, -711, -221],
    [1502, 1, 498, 635, 1, -711, -221],
    [1502, 638, 498, 635, 1, -711, -221],
    [1, 1, 498, 635, 2, -711, -221],
    [1, 638, 498, 635, 2, -711, -221],
    [1, 1275, 498, 635, 2, -711, -221],
    [501, 1, 498, 635, 2, -711, -221],
    [1001, 1, 498, 635, 2, -711, -221],
    [1501, 1, 498, 635, 2, -711, -221],
    [501, 638, 498, 635, 2, -711, -221],
    [501, 1275, 498, 635, 2, -711, -221],
    [1001, 638, 498, 635, 2, -711, -221],
    [1501, 638, 498, 635, 2, -711, -221],
    [1001, 1275, 498, 635, 2, -711, -221],
    [1501, 1275, 498, 635, 2, -711, -221],
    [1, 1, 498, 635, 3, -711, -221],
    [1, 638, 498, 635, 3, -711, -221],
    [1, 1275, 498, 635, 3, -711, -221],
    [501, 1, 498, 635, 3, -711, -221],
    [501, 638, 498, 635, 3, -711, -221],
    [501, 1275, 498, 635, 3, -711, -221],
    [1001, 1, 498, 635, 3, -711, -221],
    [1001, 638, 498, 635, 3, -711, -221],
    [1001, 1275, 498, 635, 3, -711, -221],
    [1001, 1275, 498, 635, 3, -711, -221],
    [1501, 1, 487, 631, 3, -722, -220],
    [1501, 634, 485, 620, 3, -724, -221],
    [1501, 1256, 426, 499, 3, -784, -219],
    [1, 1, 255, 499, 4, -954, -219]
];

const FPS_INTERVAL = 1000 / 30;

export default class Spritesheet extends Component {
    el = createRef();

    state = {
        index: 0
    };
    _now = Date.now();
    _then = Date.now();
    _elapsed = null;

    _images = [loader.get('image-5').result, loader.get('image-6').result, loader.get('image-7').result, loader.get('image-8').result, loader.get('image-9').result];

    componentDidMount() {
        this._setupCanvas();
        this._setupEventListeners();
    }

    componentWillUnmount() {
        this._removeEventListeners();
    }

    render() {
        return (
            <div className={styles.container}>
                <canvas ref={this.el} className={styles.canvas} width="1920" height="1080"></canvas>
            </div>
        );
    }

    _setupCanvas() {
        this._canvas = this.el.current;
        this._context = this._canvas.getContext('2d');
    }

    _setupEventListeners() {
        // just a function that runs 60fps
        gsap.ticker.add(this._handleTick);
    }

    _removeEventListeners() {
        gsap.ticker.remove(this._handleTick);
    }

    _tick() {
        this._now = Date.now();
        this._elapsed = this._now - this._then;

        if (this._elapsed > FPS_INTERVAL) {
            this._draw();
            this._then = this._now - (this._elapsed % FPS_INTERVAL);
        }
    }

    _draw() {
        if (this.state.index > FRAMES_ORDER.length - 1) {
            this.setState({ index: 0 });
            return;
        }

        const frameData = this._getFrameData();
        const image = this._getImage(frameData);

        this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
        this._context.drawImage(image, frameData[0], frameData[1], frameData[2], frameData[3], -frameData[5], -frameData[6], frameData[2], frameData[3]);
        let index = this.state.index;
        index += 1;
        this.setState({ index });

        //removes spritesheet when done
        this._CompletedMotion(index);
    }

    _getFrameData() {
        const index = FRAMES_ORDER[this.state.index];
        if (!FRAMES_DATA[index]) return;

        return FRAMES_DATA[index];
    }

    _getImage(frameData) {
        const imageIndex = frameData[4];
        if (!this._images[imageIndex]) return;

        return this._images[imageIndex];
    }

    _handleTick = () => {
        this._tick();
    };

    _CompletedMotion = (index) => {
        const { handleSpritesheetMotionCompleted } = this.props;

        if (isFunction(handleSpritesheetMotionCompleted) && index === 57) {
            handleSpritesheetMotionCompleted(index);
        }
    };
}
