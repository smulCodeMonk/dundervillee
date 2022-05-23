import React, { Component } from 'react';
import styles from './PageReveal.module.scss';
import gsap from 'gsap';
import { createRef } from 'react/cjs/react.production.min';

export default class PageReveal extends Component {
    constructor(props) {
        super();

        this.ui = {
            PageReveal: createRef()
        };
    }
    componentDidMount() {
        // console.log('mount');
    }

    componentDidUpdate() {
        this.__pageRevealAnimation();
    }

    render() {
        const { t } = this.props;

        return (
            <div className={styles.pageReveal} ref={this.ui.PageReveal}>
                <div className={styles.test}>koekoek</div>
            </div>
        );
    }

    __pageRevealAnimation = () => {
        const pageRevealTimeline = gsap.timeline();

        pageRevealTimeline
            .fromTo(this.ui.PageReveal.current, { autoAlpha: 0 }, { autoAlpha: 1, ease: 'sine.inOut', duration: 0.21 })
            .fromTo(this.ui.PageReveal.current, { y: '-100%' }, { y: 0, duration: 0.645, ease: 'power3.out' }, '<')
            .fromTo(this.ui.PageReveal.current, { y: 0 }, { y: '-100%', duration: 0.645, ease: 'power4.inOut' });
    };
}
