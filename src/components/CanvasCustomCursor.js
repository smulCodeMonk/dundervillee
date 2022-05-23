import React, { Component, createRef } from 'react';
import styles from './CanvasCustomCursor.module.scss';
import gsap from 'gsap';
import { resizeManager } from '@superherocheesecake/next-resize-manager';

// create a custom cursor inside the canvas
export default class CanvasCustomCursor extends Component {
    canvas = createRef();
    wrapper = createRef();

    // the mouse position is relative to the canvas and starts at the top left corner
    _mouseXPosition = 0;
    _mouseYPosition = 0;

    componentDidMount() {
        this._setupCanvas();
        this._setupEventListeners();

        this._resize();
        // console.log(this.canvas.current, this.wrapper.current);
    }

    componentWillUnmount() {
        this._removeEventListeners();
        console.log('cc');
    }

    render() {
        return (
            <div className={styles.wrapper} ref={this.wrapper}>
                <canvas ref={this.canvas} className={styles.canvas}></canvas>
            </div>
        );
    }

    _setupEventListeners() {
        gsap.ticker.add(this._handleTick);

        resizeManager.addEventListener('resize', this._resizeHandler);
        resizeManager.addEventListener('resize:complete', this._resizeHandler);

        window.addEventListener('mousemove', this._handleMouseMove);
    }

    _removeEventListeners() {
        resizeManager.removeEventListener('resize', this._resizeHandler);
        resizeManager.removeEventListener('resize:complete', this._resizeHandler);

        window.removeEventListener('mousemove', this._handleMouseMove);
        gsap.ticker.remove(this._handleTick);
    }

    _resize() {
        this._setSize();
        this._draw();
    }

    _setupCanvas() {
        this.canvas = this.canvas.current;
        this.context = this.canvas.getContext('2d');

        gsap.ticker.add(this._handleTick);

        console.log(this.canvas, 'canvas');
    }

    // the size of the canvas is set to the size of the wrapper
    _setSize() {
        this._width = window.innerWidth;
        this._height = window.innerHeight;

        this.canvas.width = this._width;
        this.canvas.height = this._height;
        // console.log(this._width);
    }

    // the client x and y position of the mouse is calculated and set to the private variables
    _setMousePosition = (e) => {
        this._mouseXPosition = e.clientX;
        this._mouseYPosition = e.clientY;
        // console.log('some', e.clientX, e.clientY);

        // the ticker is added to the gsap library to call the _tick function every frame
    };

    // the cursor is drawn using the mouse position
    _drawCursor() {
        this.context.beginPath();
        this.context.arc(this._mouseXPosition, this._mouseYPosition, 5, 0, 2 * Math.PI);
        this.context.fillStyle = 'red';
        this.context.fill();
        this.context.lineWidth = 5;
        this.context.strokeStyle = '#fff';
        this.context.stroke();
        this.context.closePath();
        console.log('cursor rendered');
    }

    // the ticker calls the _draw function every frame
    // _tick() {
    //     this._draw();
    // }

    _draw() {
        // console.log(this.context);

        // console.log(this._width, this._height);
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this._drawCursor();
    }

    _handleMouseMove = (e) => {
        this._setMousePosition(e);
    };

    _resizeHandler = () => {
        this._resize();
    };

    _handleTick = () => {
        this._draw();
    };
}
