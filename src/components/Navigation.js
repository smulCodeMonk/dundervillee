import styles from './Navigation.module.scss';
import React, { Component, createRef } from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import Button from './Button';
import { toRoman } from 'utils/toRoman';
import { isFunction } from 'lodash';

export default class Navigation extends Component {
    // _routeItems = createRef();

    _routeItems = [];

    componentDidMount() {
        this._setupEventListeners();
    }

    componentWillUnmount() {
        this._removeEventListeners();
    }

    render() {
        const { t, pathName, handleMouseenter, handleMouseleave, handleMouseDown } = this.props;
        const homePage = pathName === '/';
        return (
            <>
                {/* {!homePage && ( */}
                <ol className={`${styles.list} ${styles.is_wide} ${styles.at_home}`} ref={this.linkItem}>
                    {t('header:navigation', { returnObjects: true }).map((item, index) => {
                        return (
                            <li
                                key={item.button.copy}
                                className={styles.item}
                                ref={(ref) => {
                                    this._routeItems[index] = ref;
                                }}
                                onMouseEnter={handleMouseenter}
                                onMouseLeave={handleMouseleave}
                                onMouseDown={handleMouseDown}
                            >
                                <Button className={classNames(styles.button, pathName === item.button.href ? styles.active : '')} href={item.button.href}>
                                    <span className="buttonOrder">{toRoman(index + 1)}.</span>
                                    <span>{item.button.copy}</span>
                                </Button>
                            </li>
                        );
                    })}
                </ol>
                {/* )} */}
            </>
        );
    }

    _setupEventListeners() {
        // listening to mouse events
        // this._routeItems[0].addEventListener('mouseenter', this._handleMouseenter);
        // this._routeItems[0].addEventListener('mouseleave', this._handleMouseleave);
    }

    _removeEventListeners() {
        // get rid of the events
        // this._routeItems[0].removeEventListener('mouseenter', this._handleMouseenter);
        // this._routeItems[0].removeEventListener('mouseleave', this._handleMouseleave);
    }

    // _handleMouseenter = (e) => {
    //     console.log('mousenter');
    //     const { handleOnHover } = this.props;
    //     if (isFunction(handleOnHover)) {
    //         handleOnHover(true);
    //     }
    // };
    // _handleMouseleave = (e) => {
    //     console.log('leave');
    //     const { handleOnHover } = this.props;
    //     if (isFunction(handleOnHover)) {
    //         handleOnHover(false);
    //     }
    // };
}
