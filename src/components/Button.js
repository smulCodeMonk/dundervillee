import React, { Component } from 'react';
import Link from 'next/link';
import styles from 'components/Button.module.scss';
import classNames from 'classnames';

import { isFunction } from '../utils/helpers';

export default class Button extends Component {
    render() {
        const { className, href, target, children, ...otherProps } = this.props;

        if (href && target === '_blank') {
            return (
                <a className={classNames(styles.button, className)} href={href} target={target} onClick={this._handleClick} {...otherProps}>
                    {children}
                </a>
            );
        }

        if (href && target !== '_blank') {
            return (
                <Link href={href}>
                    <a className={classNames(styles.button, className)} onClick={this._handleClick}>
                        {children}
                    </a>
                </Link>
            );
        }

        return (
            <button className={classNames(styles.button, className)} onClick={this._handleClick}>
                {children}
            </button>
        );
    }

    _handleClick = (e) => {
        const { onClick } = this.props;
        // console.log(typeof onClick);
        if (isFunction(onClick)) {
            onClick(e);
        }
    };
}
