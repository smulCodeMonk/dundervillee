import React, { Component, createRef } from 'react';
import gsap from 'gsap';

import styles from './Form.module.scss';

//import classNames from 'classnames';
import { resizeManager } from '@superherocheesecake/next-resize-manager';

export default class Form extends Component {
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
        return <div>Form</div>;
    }

    _setupEventListeners() {
        // listening to our resize events
        resizeManager.addEventListener('resize', this._resizeHandler);
        resizeManager.addEventListener('resize:complete', this._resizeHandler);
    }

    _removeEventListeners() {
        resizeManager.removeEventListener('resize', this._resizeHandler);
        resizeManager.removeEventListener('resize:complete', this._resizeHandler);
    }

    _resize() {
        this._setSize();
    }

    _setSize() {}

    _killTimelines() {
        // if (this._tlCircle) {
        //     this._tlCircle.kill();
        //     this._tlCircle === null;
        // }
    }

    _resizeHandler = () => {
        this._resize();
    };
}
