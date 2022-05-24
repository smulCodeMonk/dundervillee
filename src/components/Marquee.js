import React, { Component, createRef } from 'react';
import styles from './Marquee.module.scss';
import classNames from 'classnames';
import { resizeManager } from '@superherocheesecake/next-resize-manager';
import gsap from 'gsap';

export default class Marquee extends Component {
    ui = {
        marquee: createRef(),
        line: createRef(),
        label: createRef()
    };

    _multiplier = 1;

    componentDidMount() {
        this._setupEventListeners();
        this._resize();
    }

    componentWillUnmount() {
        this._removeEventListeners();
        this._killTimelines();
    }

    render() {
        return (
            <div ref={this.ui.marquee} className={styles.marquee}>
                <div ref={this.ui.line} className={classNames(styles.line)}>
                    <span ref={this.ui.label} className={classNames(styles.label)}>
                        Hello!&nbsp;
                    </span>
                </div>
            </div>
        );
    }

    _resize() {
        const labelWidth = this.ui.label.current.offsetWidth;
        const multiplier = Math.ceil(resizeManager.viewportWidth / labelWidth);
        // console.log(multiplier);

        if (multiplier > this._multiplier) {
            const diff = multiplier - this._multiplier;
            this._multiplier = multiplier;
            this._cloneLabel(diff);
        }
        this._cloneContainer();

        const lineWidth = labelWidth * this._labels.length;
        // this.ui.marquee.current.style.width = `${resizeManager.viewportWidth}px`;
        // this.ui.marquee.current.style.height = `${this.ui.label.current.offsetHeight}px`;
        this.ui.line.current.style.width = `${lineWidth}px`;
        this._clone.style.width = `${lineWidth}px`;

        this._startInfinite(lineWidth);
    }

    _cloneLabel(amount) {
        const fragment = document.createDocumentFragment();
        let clone;
        for (let i = 0; i < amount; i++) {
            clone = this.ui.label.current.cloneNode(true);
            fragment.appendChild(clone);
        }
        this.ui.line.current.appendChild(fragment);
        // console.log(this.ui.line.current);
    }

    _cloneContainer() {
        if (this.clone) {
            this.ui.marquee.current.removeChild(this.clone);
        }

        this._clone = this.ui.line.current.cloneNode(true);
        this._labels = this.ui.line.current.getElementsByTagName('span');
        this._clone.style.backgroundColor = '#f8bebe';

        this._clone.classList.add('clone');
        this.ui.marquee.current.appendChild(this._clone);
    }

    _startInfinite(width) {
        if (this._infiniteTl) {
            this._infiniteTl.kill();
            this._infiniteTl = null;
        }
        //rate // speed

        const r = 25;
        const time = width / r;
        const timeClone = (width + resizeManager.viewportWidth) / r;
        const timeViewport = resizeManager.viewportWidth / r;
        const origin = this.ui.line.current;

        this._infiniteTl = gsap.timeline({ repeat: -1 });
        this._infiniteTl.set(this._clone, { x: width }, 0);
        this._infiniteTl.fromTo(origin, { x: 0 }, { duration: time, x: -width, ease: 'none' }, 0);
        this._infiniteTl.to(this._clone, { duration: time * 2, x: -width, ease: 'none' }, 0);
        this._infiniteTl.set(origin, { x: width }, timeViewport);
        this._infiniteTl.to(origin, { duration: time, x: 0, ease: 'none' }, '<');

        // this._infiniteTl.set(this._clone, { x: -width }, 0);
        // this._infiniteTl.fromTo(origin, { x: 0 }, { duration: timeViewport, x: resizeManager.viewportWidth, ease: 'none' }, 0);
        // this._infiniteTl.to(this._clone, { duration: timeClone, x: resizeManager.viewportWidth, ease: 'none' }, 0);
        // this._infiniteTl.set(origin, { x: -width }, timeViewport);
        // this._infiniteTl.to(origin, { duration: time, x: 0, ease: 'none' }, `-=${timeViewport}`);
    }

    _setupEventListeners() {
        console.log(this.ui.marquee);
        if (this.ui.marquee) {
            resizeManager.addEventListener('resize', this._resizeHandler);
            resizeManager.addEventListener('resize:complete', this._resizeHandler);
        }
    }

    _removeEventListeners() {
        if (this.ui.marquee) {
            resizeManager.removeEventListener('resize', this._resizeHandler);
            resizeManager.removeEventListener('resize:complete', this._resizeHandler);
        }
    }

    _killTimelines() {
        if (this._infinite) {
            this._infinite.kill();
            this._infinite === null;
        }
    }
}
