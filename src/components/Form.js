import React, { Component, createRef } from 'react';
import gsap from 'gsap';

import styles from './Form.module.scss';

//import classNames from 'classnames';
import { resizeManager } from '@superherocheesecake/next-resize-manager';
import Button from './Button';
import classNames from 'classnames';

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
                <h1 className={styles.title}>{t('contact-form:title')}</h1>
                <form action="" className={styles.form}>
                    <div className={styles.group}>
                        <label htmlFor={t('contact-form:form__label1')} className={styles.label}>
                            {t('contact-form:form__label1')}
                        </label>
                        <input type="text" name={t('contact-form:form__label1')} aria-label={t('contact-form:form__label1')} className={styles.input} required />
                    </div>
                    <div className={styles.group}>
                        <label htmlFor={t('contact-form:form__label2')} className={styles.label}>
                            {t('contact-form:form__label2')}
                        </label>
                        <input type="text" name={t('contact-form:form__label2')} aria-label={t('contact-form:form__label2')} className={styles.input} required />
                    </div>
                    <div className={styles.group}>
                        <label htmlFor={t('contact-form:form__email')} className={styles.label}>
                            {t('contact-form:form__email')}
                        </label>
                        <input type="email" name={t('contact-form:form__email')} aria-label={t('contact-form:form__email')} className={styles.input} required />
                    </div>
                    <div className={styles.group}>
                        <label htmlFor={t('contact-form:form__phone')} className={styles.label}>
                            {t('contact-form:form__phone')}
                        </label>
                        <input type="tel" name={t('contact-form:form__phone')} aria-label={t('contact-form:form__phone')} className={styles.input} required />
                    </div>

                    <div className={styles.group}>
                        <label htmlFor="textarea" className={styles.label}>
                            {t('contact-form:form__textarea')}
                        </label>

                        <textarea name="textarea" aria-label="textarea" className={styles.textarea}></textarea>
                    </div>
                    <div className={styles.group}>
                        <label htmlFor={t('contact-form:form__multipleChoice')} className={styles.label}>
                            {t('contact-form:form__question')}
                        </label>

                        <select name={t('contact-form:form__multipleChoice')} aria-label={t('contact-form:form__multipleChoice')} className={styles.select}>
                            {/* TODO ASK ASSIGN VALUE ? */}
                            <option className={styles.option} value={t('contact-form:form__option1')} aria-label={t('contact-form:form__option1')}>
                                {t('contact-form:form__option1')}
                            </option>
                            <option className={styles.option} value={t('contact-form:form__option2')} aria-label={t('contact-form:form__option2')}>
                                {t('contact-form:form__option2')}
                            </option>
                            <option className={styles.option} value={t('contact-form:form__option3')} aria-label={t('contact-form:form__option3')}>
                                {t('contact-form:form__option3')}
                            </option>
                        </select>
                    </div>

                    <div className={styles.group}>
                        <label htmlFor={t('contact-form:form__checkboxLabel1')} className={`${styles.label} ${styles.labelCheckbox}`}>
                            {t('contact-form:form__checkboxLabel1')}
                        </label>

                        <input type="checkbox" name={t('contact-form:form__checkboxLabel1')} aria-label={t('contact-form:form__checkboxLabel1')} className={styles.checkbox} required></input>
                    </div>
                    <div className={styles.group}>
                        <label htmlFor={t('contact-form:form__checkboxLabel2')} className={`${styles.label} ${styles.labelCheckbox}`}>
                            {t('contact-form:form__checkboxLabel2')}
                        </label>

                        <input type="checkbox" name={t('contact-form:form__checkboxLabel2')} aria-label={t('contact-form:form__checkboxLabel2')} className={styles.checkbox}></input>
                    </div>
                    <Button aria-label="submit-button" className={classNames(styles.button)}>
                        <span className={styles.buttonText}>{t('contact-form:form__button')}</span>
                        <span className={styles.buttonIcon}></span>
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
