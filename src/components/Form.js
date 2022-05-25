import React, { Component, createRef } from 'react';
import gsap from 'gsap';

import styles from './Form.module.scss';

//import classNames from 'classnames';
import { resizeManager } from '@superherocheesecake/next-resize-manager';
import Button from './Button';

export default class Form extends Component {
    componentDidMount() {
        // this._setupTl();
        this._setupEventListeners();
        this._resize();
    }

    componentWillUnmount() {
        this._removeEventListeners();
        this._killTimelines();
    }

    render() {
        const { t } = this.props;

        return (
            <div className={styles.container}>
                <h1 className={styles.title}>{t('contact:title')}</h1>

                <form action="" className={styles.form}>
                    <div className={styles.group}>
                        <label htmlFor="name" className={styles.label}>
                            {t('contact:label')}
                        </label>
                        <input type="text" name="name" aria-label="name" className={styles.input} />
                    </div>
                    <div className={styles.group}>
                        <label htmlFor="email" className={styles.label}>
                            {t('contact:label2')}
                        </label>
                        <input type="email" name="email" aria-label="email" className={styles.input} />
                    </div>

                    <div className={styles.group}>
                        <label htmlFor="textarea" className={styles.label}>
                            {t('contact:label3')}
                        </label>

                        <textarea name="textarea" aria-label="textarea" id="" cols="30" rows="10" className={styles.textarea}></textarea>
                    </div>
                    <Button type="submit" aria-label="submit-button">
                        submit
                    </Button>
                </form>
            </div>
        );
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

    _handleSubmit(event) {
        event.preventDefault();
    }
}
