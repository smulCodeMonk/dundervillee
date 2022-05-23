import React, { Component, createRef } from 'react';
import gsap from 'gsap';

import styles from './CanvasHouse.module.scss';

//import classNames from 'classnames';
import { resizeManager } from '@superherocheesecake/next-resize-manager';

export default class CanvasHouse extends Component {
    canvas = createRef();
    wrapper = createRef();

    componentDidMount() {
        this._setupCanvas();
        this._setupEventListeners();
        this._resize();
    }

    componentWillUnmount() {
        this._removeEventListeners();
    }

    render() {
        return (
            <div className={styles.container}>
                <div ref={this.wrapper} className={styles.wrapper}>
                    <canvas ref={this.canvas} className={styles.canvas} width="600" height="600"></canvas>
                </div>
            </div>
        );
    }

    _setupEventListeners() {
        // just a function that runs 60fps
        // gsap.ticker.add(this._handleTick);

        // listening to our resize events
        resizeManager.addEventListener('resize', this._resizeHandler);
        resizeManager.addEventListener('resize:complete', this._resizeHandler);
    }

    _removeEventListeners() {
        // get rid of the events
        // gsap.ticker.remove(this._handleTick);

        resizeManager.removeEventListener('resize', this._resizeHandler);
        resizeManager.removeEventListener('resize:complete', this._resizeHandler);
    }

    _resize() {
        this._draw();
    }

    _setupCanvas() {
        this._canvas = this.canvas.current;
        this._context = this._canvas.getContext('2d');
    }

    _drawHouse() {
        //bricks

        const width = 20;
        const height = 10;
        const gap = 1.5;
        let x, y;

        // const createBricks = () => {
        for (let i = 0; i < 14; i++) {
            for (let j = 0; j < 22; j++) {
                let x = 150 + (width + gap) * i;
                let y = 150 + (height + gap) * j;

                this._context.fillStyle = 'brown';

                this._context.beginPath();
                this._context.rect(x, y, width, height);
                this._context.fill();

                if (Math.random() > 0.5 && i < 14) {
                    this._context.strokeStyle = '#ccc';

                    this._context.beginPath();
                    this._context.rect(x + 2, y + 5, width - 0.2, height - 7);
                    this._context.stroke();
                }
            }
        }
        // };
        // createBricks();

        const createDoor = () => {
            this._context.strokeStyle = '#ccc';
            //door
            this._context.fillStyle = '#333';
            this._context.fillRect(250, 250, 100, 150);

            for (let i = 0; i < 7; i++) {
                this._context.fillStyle = 'rgba(165, 42, 42, ' + (i + 1) / 10 + ')';
                for (let j = 0; j < 5; j++) {
                    this._context.fillRect(250 + i * 14, 250 + j * 30, 16, 27.5);
                }
            }
            this._context.closePath();
        };
        createDoor();

        //door nob

        this._context.fillStyle = '#ccc';

        this._context.lineWidth = 1;
        this._context.beginPath();
        this._context.arc(265, 320, 5, 0, Math.PI * 2);
        this._context.fill();
        this._context.closePath();

        this._context.lineWidth = 3;
        //walls
        this._context.beginPath();
        this._context.rect(150, 150, 300, 250);
        this._context.stroke();
        this._context.closePath();

        //roof
        const createRoof = () => {
            this._context.fillStyle = '#000';

            this._context.beginPath();
            this._context.moveTo(100, 151);
            this._context.lineTo(300, 10);
            this._context.lineTo(500, 153);
            this._context.lineTo(100, 153);
            this._context.fill();
            this._context.closePath();

            for (let i = 0; i < 20; i++) {
                if (i % 2 === 0) {
                    this._context.strokeStyle = '#7774';

                    this._context.beginPath();
                    this._context.moveTo(300, 10);
                    this._context.lineTo(100 + i * 21, 153);
                    this._context.stroke();
                    this._context.closePath();
                } else {
                    this._context.strokeStyle = '#fff2';

                    this._context.beginPath();
                    this._context.moveTo(300, 10);
                    this._context.lineTo(100 + i * 21, 154);
                    this._context.stroke();
                    this._context.closePath();
                }
            }
        };
        createRoof();

        //house number
        this._context.strokeStyle = '#fff';
        this._context.lineWidth = 3;
        this._context.beginPath();
        this._context.font = '32px serif';
        this._context.strokeText('09', 355, 300);
        this._context.closePath();
    }

    _draw() {
        this._drawHouse();
    }

    _setupTl() {}

    _handleTlUpdate = () => {
        this._draw();
    };

    _resizeHandler = () => {
        this._resize();
    };

    _handleTick = () => {
        this._handleTlUpdate();
    };
}
