import React, { Component } from 'react';
import classNames from 'classnames';

import styles from './Input.module.scss';

export default class Input extends Component {
    render() {
        const { classNameInput, classNameLabel, type, name, id, value, ariaLabel, children, ...otherProps } = this.props;

        return (
            <>
                <label htmlFor={id} className={classNames(classNameLabel)}>
                    {children}
                </label>
                <input type={type} name={name} id={id} defaultValue={value || ' '} aria-label={ariaLabel || name} className={classNames(classNameInput)} />
            </>
        );
    }

    // _handleChange(e) {
    //     console.log(this.state.value);
    //     console.log(e.target.value);
    //     // this.setState({ value: e.target.value });
    // }
}
