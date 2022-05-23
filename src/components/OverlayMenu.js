import React, { Component } from 'react';
import styles from './OverlayMenu.module.scss';
import Navigation from './Navigation';
import Banner from './Banner';
import gsap from 'gsap';
import { createRef } from 'react/cjs/react.production.min';

export default class OverlayMenu extends Component {
    constructor(props) {
        super();

        this.ui = {
            overlayMenu: createRef()
        };
    }
    componentDidMount() {
        // console.log('mount');
    }

    componentDidUpdate() {
        const { overlayNavigationVisible } = this.props;
        if (overlayNavigationVisible) {
            // console.log('intro');
            this.__overlayOpenAnimation();
        }
        if (!overlayNavigationVisible) {
            // console.log('outro');
            this.__overlayCloseAnimation();
        }
    }

    render() {
        const { t } = this.props;

        return (
            <div className={styles.overlay} ref={this.ui.overlayMenu}>
                <Navigation t={t} />

                <div className={styles.test}>test</div>
            </div>
        );
    }

    __overlayOpenAnimation = () => {
        const overlayOpenTimeline = gsap.timeline();

        overlayOpenTimeline
            .fromTo(this.ui.overlayMenu.current, { autoAlpha: 0 }, { autoAlpha: 1, ease: 'sine.inOut' })
            .fromTo(this.ui.overlayMenu.current, { y: '-100%' }, { y: 0, duration: 0.645, ease: 'power3.out' }, '<');
    };
    __overlayCloseAnimation = () => {
        const overlayCloseTimeline = gsap.timeline();

        overlayCloseTimeline.fromTo(this.ui.overlayMenu.current, { y: 0 }, { y: '-100%', duration: 0.645, ease: 'power3.in' });
    };
}
