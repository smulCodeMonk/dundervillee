import React, { Component, createRef } from 'react';
import gsap from 'gsap';

import styles from './CustomCursor.module.scss';

//import classNames from 'classnames';
import { resizeManager } from '@superherocheesecake/next-resize-manager';

export default class CustomCursor extends Component {
    canvas = createRef();
    wrapper = createRef();
    cursorSmall = createRef();

    mouseX = 0;
    mouseY = 0;

    outerCircle = {
        radius: 25,
        lastX: this.mouseX,
        lastY: this.mouseY,
        startAngle: 0,
        endAngle: Math.PI * 2,
        fillStyle: `rgba(248, 190, 190,05)`
    };
    innerCircle = {
        radius: 5,
        lastX: this.mouseX,
        lastY: this.mouseY,
        startAngle: 0,
        endAngle: Math.PI * 2,
        fillStyle: `#fff`
    };

    outerRing = {
        radiusWidth: 0.005,
        numberLines: 6
    };

    componentDidMount() {
        this._setupCanvas();
        this._setupTl();
        this._setupEventListeners();
        this._resize();
    }

    componentWillUnmount() {
        this._removeEventListeners();
        this._killTimelines();
    }

    render() {
        return (
            <div className={styles.container}>
                <div ref={this.wrapper} className={styles.wrapper}>
                    {/* <div ref={this.cursorSmall} className={`${styles.cursor} ${styles.cursorSmall}`}></div> */}
                    <canvas ref={this.canvas} className={styles.canvas}></canvas>
                </div>
            </div>
        );
    }

    _setupEventListeners() {
        // just a function that runs 60fps
        gsap.ticker.add(this._handleTick);

        // listening to mouse events
        window.addEventListener('mousemove', this._handleMousemove);
        // window.addEventListener('mouseup', this._handleMouseup);

        // listening to our resize events
        resizeManager.addEventListener('resize', this._resizeHandler);
        resizeManager.addEventListener('resize:complete', this._resizeHandler);
    }

    _removeEventListeners() {
        // get rid of the events
        gsap.ticker.remove(this._handleTick);
        window.removeEventListener('mousemove', this._handleMousemove);
        // window.removeEventListener('mouseup', this._handleMouseup);
        resizeManager.removeEventListener('resize', this._resizeHandler);
        resizeManager.removeEventListener('resize:complete', this._resizeHandler);
    }

    _resize() {
        this._setSize();
        this._draw();
    }

    _setSize() {
        this._width = window.innerWidth;
        this._height = window.innerHeight;
        this._canvas.width = this._width;
        this._canvas.height = this._height;
    }

    _killTimelines() {
        if (this._tlCircle) {
            this._tlCircle.kill();
            this._tlCircle === null;
        }
        if (this._tlRevealCursor) {
            this._tlRevealCursor.kill();
            this._tlRevealCursor === null;
        }
    }

    _setupCanvas() {
        this._canvas = this.canvas.current;
        this._context = this._canvas.getContext('2d');
    }

    _drawOuterCircle() {
        const { radius, lastX, lastY, fillStyle, startAngle, endAngle } = this.outerCircle;

        this.outerCircle.lastX = this._lerp(this.outerCircle.lastX, this.mouseX, 0.1);
        this.outerCircle.lastY = this._lerp(this.outerCircle.lastY, this.mouseY, 0.1);

        this._context.beginPath();

        for (let i = 0; i < 10; i++) {
            this._context.arc(
                this._lerp(lastX, this.mouseX, `0.${i}`),

                this._lerp(lastY, this.mouseY, `0.${i}`),
                radius - i,
                0,
                endAngle
            );

            if (i % 2 === 0) {
                this._context.fillStyle = fillStyle;

                // this._context.arc(
                //     this._lerp(lastX, this.mouseX, `0.${i}`),

                //     this._lerp(lastY, this.mouseY, `0.${i}`),
                //     radius + i,
                //     0,
                //     endAngle
                // );
                // this._context.fillStyle = fillStyle;
                // this._context.fill();
                // this._context.closePath();
            } else {
                // this._context.arc(
                //     this._lerp(lastX, this.mouseX, `0.${i}`),

                //     this._lerp(lastY, this.mouseY, `0.${i}`),
                //     radius + i,
                //     0,
                //     endAngle
                // );
                this._context.fillStyle = 'black';
                // this._context.fill();
                // this._context.closePath();
            }
            this._context.fill();
            this._context.closePath();
        }
        // this._context.closePath();
    }

    _drawInnerCircle() {
        const { radius, lastX, lastY, fillStyle, startAngle, endAngle } = this.innerCircle;

        this.innerCircle.lastX = this.mouseX;
        this.innerCircle.lastY = this.mouseY;

        // this._context.clearRect(0, 0, this._width, this._height);
        this._context.beginPath();
        this._context.arc(lastX, lastY, radius, startAngle, endAngle);
        this._context.fillStyle = fillStyle;
        this._context.fill();
        this._context.closePath();
    }

    _degToRad = (degrees) => {
        return (degrees / 180) * Math.PI;
    };

    _drawOuterRing = () => {
        const { radiusWidth, numberLines } = this.outerRing;

        const cx = this.mouseX;
        const cy = this.mouseY;

        const w = this._width * 0.001;
        const h = this._height * 0.01;
        let x, y;

        const radius = this._width * radiusWidth;

        for (let i = 0; i < numberLines; i++) {
            const slice = this._degToRad(360 / numberLines);
            const angle = slice * i;

            x = cx + radius * Math.sin(angle);
            y = cy + radius * Math.cos(angle);

            this._context.save();

            this._context.translate(x, y);
            this._context.rotate(-angle);
            // this._context.scale(Math.random() * 2 + 0.1, Math.random() * 0.5 + 0.2);

            this._context.beginPath();
            this._context.rect(-w * 0.05, -h * 0.05, w, h);

            this._context.fill();
            this._context.restore();

            this._context.save();

            this._context.translate(cx, cy);
            this._context.rotate(-angle);

            this._context.lineWidth = 2;

            this._context.beginPath();
            this._context.arc(0, 0, radius, slice * -0.09, slice * 0.09);
            this._context.strokeStyle = 'white';

            this._context.stroke();

            this._context.restore();
        }
    };

    _draw() {
        this._context.clearRect(0, 0, this._width, this._height);
        this._drawOuterCircle();
        this._drawInnerCircle();
        this._drawOuterRing();
    }

    _setupTl() {
        this._tlRevealCursor = gsap.timeline({ paused: true });

        this._tlRevealCursor.fromTo(this.wrapper.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2, ease: 'power3.inOut' }, 0);

        const { radius, lastX, lastY, fillStyle, startAngle, endAngle } = this.outerCircle;
        const { radiusWidth } = this.outerRing;

        this._tlCircle = gsap.timeline({ paused: true });
        this._tlCircle
            .to(
                this.outerCircle,
                {
                    radius: radius * 1.5,
                    fillStyle: '#fff5',

                    ease: 'Power3.InOut',
                    duration: 0.45
                },
                0
            )
            .to(
                this.innerCircle,
                {
                    fillStyle: `rgba(248, 190, 190,05)`,
                    radius: radius * 1.5,
                    ease: 'Power3.InOut',
                    duration: 0.35
                },
                0
            )
            // .fromTo(this.outerRing, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.35, ease: 'sine.inOut' }, 0)
            .to(this.outerRing, { radiusWidth: 0.02, duration: 0.35, ease: 'power3.inOut' }, 0);
    }

    _handleMousemove = (e) => {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
        // this._draw();
        this._onHoverTimeline();
        this._cursorRevealTl();
    };

    _handleTlUpdate = () => {
        this._draw();

        // this._setupCursor();
    };

    _resizeHandler = () => {
        this._resize();
    };

    _handleTick = () => {
        this._handleTlUpdate();
    };

    _lerp(current, target, multiplier) {
        return (1 - multiplier) * current + multiplier * target;
    }

    _onHoverTimeline = () => {
        const { onHover } = this.props;
        if (onHover === true) {
            this._tlCircle.play();
        }
        if (onHover === false) {
            this._tlCircle.reverse();
        }
    };
    _cursorRevealTl = () => {
        this._tlRevealCursor.play();
    };
}
