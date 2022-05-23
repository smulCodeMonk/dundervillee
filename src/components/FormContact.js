/*
    Example form with (onChange) validation build in. 
*/

import React, { Component, createRef } from 'react';
import { validationGroup, isValidEmail, isValidPhone, isNotEmpty } from 'utils/validation';

const STATUS = {
    init: 'INIT',
    success: 'SUCCESS',
    error: 'ERROR',
    sent: 'SENT'
};

export default class FormContact extends Component {
    constructor() {
        super();

        this.state = {
            status: STATUS.init,
            autoValidate: false,
            name: null,
            email: null,
            phone: null,
            textarea: null
        };

        this.ui = {
            name: createRef(),
            email: createRef(),
            phone: createRef(),
            textarea: createRef()
        };
    }

    render() {
        const { t } = this.props;
        const { status, autoValidate } = this.state;

        return (
            <form onSubmit={this._sumbitHandler}>
                <p style={this._getStyle('name')}>
                    {t('form:form__name')}
                    <input ref={this.ui.name} type="text" onChange={this._changeHandler} />
                </p>
                <p style={this._getStyle('email')}>
                    {t('form:form__email')}
                    <input ref={this.ui.email} type="email" onChange={this._changeHandler} />
                </p>
                <p style={this._getStyle('phone')}>
                    {t('form:form__phone')}
                    <input ref={this.ui.phone} type="phone" onChange={this._changeHandler} />
                </p>
                <p style={this._getStyle('textarea')}>
                    {t('form:form__message')}
                    <textarea ref={this.ui.textarea} onChange={this._changeHandler}></textarea>
                </p>

                <button type="subit">Submit</button>

                {autoValidate && status === STATUS.error && <p style={{ color: 'red' }}>Errors!</p>}
                {autoValidate && status === STATUS.success && <p style={{ color: 'green' }}>All valid!</p>}
            </form>
        );
    }

    _validate() {
        const validation = validationGroup({
            name: isNotEmpty({ domElement: this.ui.name.current }),
            email: isValidEmail({ domElement: this.ui.email.current }),
            phone: isValidPhone({ domElement: this.ui.phone.current }),
            textarea: isNotEmpty({ domElement: this.ui.textarea.current })
        });

        this.setState({
            status: validation.errors.length > 0 ? STATUS.error : STATUS.success,
            ...validation.items
        });

        return validation;
    }

    _getStyle = (key) => {
        const { autoValidate } = this.state;
        const validation = this.state[key];

        const hasErrors = validation?.errors?.length > 0;

        const styleError = {
            color: 'red'
        };
        const styleDefault = null;

        return autoValidate && hasErrors ? styleError : styleDefault;
    };

    _changeHandler = () => {
        this._validate();
    };

    _sumbitHandler = (e) => {
        e.preventDefault();

        this.setState({ autoValidate: true });
        const validation = this._validate();

        if (validation.errors.length <= 0) {
            // Send
        }
    };
}
