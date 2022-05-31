import React, { Component, createRef } from 'react';
import gsap from 'gsap';

import styles from './Form.module.scss';

//import classNames from 'classnames';
import { resizeManager } from '@superherocheesecake/next-resize-manager';
import classNames from 'classnames';

import Input from './Input';
import Button from '../Button';

export default class Form extends Component {
    state = {
        firstName: null,
        lastName: null,
        email: null,
        phone: null,
        textarea: null
    };

    ui = {
        firstName: createRef(),
        lastName: createRef(),
        email: createRef(),
        phone: createRef(),
        textarea: createRef()
    };

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
            // TODO wrap input in label

            //TODO smaller components in a map form

            <div className={styles.container}>
                <h1 className={styles.heading}>
                    <span className={styles.titleNumber}>{t('contact-form:form__titleNumber')}</span>
                    <span className={styles.title}>{t('contact-form:form__titleGreeting')}</span>
                </h1>
                <form onSubmit={this._handleSubmit} className={styles.form}>
                    <div className={styles.group}>
                        <Input type={'text'} classNameInput={styles.input} classNameLabel={styles.label} name={'first-name'} id={'first-name'}>
                            {t('contact-form:form__firstName')}
                        </Input>
                    </div>

                    <div className={styles.group}>
                        <Input type={'text'} classNameInput={styles.input} classNameLabel={styles.label} name={'last-name'} id={'last-name'}>
                            {t('contact-form:form__lastName')}
                        </Input>
                    </div>
                    <div className={styles.group}>
                        <Input type={'email'} classNameInput={styles.input} classNameLabel={styles.label} name={'email'} id={'email'}>
                            {t('contact-form:form__email')}
                        </Input>
                    </div>
                    <div className={styles.group}>
                        <Input type={'tel'} classNameInput={styles.input} classNameLabel={styles.label} name={'phone'} id={'phone'}>
                            {t('contact-form:form__phone')}
                        </Input>
                    </div>

                    <div className={styles.group}>
                        <label htmlFor="textarea" className={styles.label}>
                            {t('contact-form:form__titleTextarea')}
                        </label>
                        <textarea name="textarea" id="textarea" aria-label="textarea" className={styles.textarea}></textarea>
                    </div>
                    <div className={styles.group}>
                        <div className={styles.radio}>
                            <label htmlFor="multiple-choice-question" className={styles.label}>
                                {t('contact-form:form__multipleChoiceQuestion')}
                            </label>

                            <Input type={'radio'} classNameLabel={styles.labelRadio} classNameInput={styles.radioOptions} name={'radio-button-option-1'} id={'radioOption1'} value={'male'}>
                                {t('contact-form:form__radioOption1')}
                            </Input>

                            <Input type={'radio'} classNameLabel={styles.labelRadio} classNameInput={styles.radioOptions} name={'radio-button-option-2'} id={'radioOption2'} value={'female'}>
                                {t('contact-form:form__radioOption2')}
                            </Input>
                            <Input
                                type={'radio'}
                                classNameLabel={styles.labelRadio}
                                classNameInput={styles.radioOptions}
                                name={'radio-button-option-3'}
                                id={'radioOption3'}
                                value={'I prefer not to say'}
                            >
                                {t('contact-form:form__radioOption3')}
                            </Input>
                        </div>
                    </div>

                    <div className={styles.group}>
                        <Input
                            type={'checkbox'}
                            classNameLabel={`${styles.label} ${styles.labelCheckbox}`}
                            classNameInput={styles.checkbox}
                            name={'terms-and-conditions"'}
                            id={'terms-and-conditions"'}
                            // value={''}
                        >
                            {t('contact-form:form__termsAndConditions')}
                        </Input>
                    </div>
                    <div className={styles.group}>
                        <Input
                            type={'checkbox'}
                            classNameLabel={`${styles.label} ${styles.labelCheckbox}`}
                            classNameInput={styles.checkbox}
                            name={'newsletter'}
                            id={'newsletter"'}
                            // value={''}
                        >
                            {t('contact-form:form__newsletter')}
                        </Input>
                    </div>
                    <Button type="submit" aria-label="submit-button" className={classNames(styles.button)}>
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

    _handleSubmit(e) {
        e.preventDefault();
    }
}
