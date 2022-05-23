import React, { Component } from 'react';
import Button from './Button';
import styles from './Hamburger.module.scss';
import { isFunction } from 'lodash';

export default class Hamburger extends Component {
    render() {
        return (
            <Button onClick={this._handleClick} className={`${styles.menu__button} ${styles.is_narrow}`}>
                <div className={styles.menu__button_container}>
                    <div className={styles.menu__icon}>
                        <svg className={styles.menu__icon_svg} viewBox="0 0 29 20">
                            <path d="M-0.000,20.000 L-0.000,17.000 L29.000,17.000 L29.000,20.000 L-0.000,20.000 ZM-0.000,-0.000 L29.000,-0.000 L29.000,3.000 L-0.000,3.000 L-0.000,-0.000 Z"></path>
                        </svg>
                    </div>
                </div>
            </Button>
        );
    }

    _handleClick = () => {
        const { buttonHamburgerClicked, overlayNavigationVisible } = this.props;
        if (isFunction(buttonHamburgerClicked)) {
            buttonHamburgerClicked(!overlayNavigationVisible);
        }
    };
}
