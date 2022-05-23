import React, { Component, createRef } from 'react';
import styles from './Banner.module.scss';
import gsap from 'gsap';
// import GSDevTools from 'gsap/GSDevTools';

export default class Banner extends Component {
    constructor(props) {
        super();

        // Get ui elements
        this.ui = {
            bannerContainer: createRef(),
            bannerWrapper: createRef(),
            underscore: createRef(),
            middleStroke: createRef(),
            // mask: createRef(),
            letterD: createRef(),
            letterU_top: createRef(),
            letterU_bottom: createRef(),
            letterN_top: createRef(),
            letterN_bottom: createRef(),
            letterE: createRef(),
            letterR: createRef(),
            letterV: createRef(),
            letterI_top: createRef(),
            letterI_bottom: createRef(),
            letterL: createRef(),
            letterE2: createRef()
        };

        // gsap.registerPlugin(GSDevTools);
    }

    // lifesycle method react. Called when component is done loading in the DOM
    componentDidMount() {
        //TODO make function
        this._prepareAnimation();

        this.__introAutoAlpha();
        // GSDevTools.create();
    }

    // componentWillUnmount() {
    //     this.killTimelines();
    // }

    render() {
        return (
            <div className={styles.container} ref={this.ui.bannerContainer}>
                <div className={styles.wrapper} ref={this.ui.bannerWrapper}>
                    <svg id="Banner" className="svgBanner" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1441.7 182.99">
                        <defs>
                            {/* U */}
                            <path
                                id="letterU"
                                className={`${styles.letters} ${styles.letter_U}`}
                                ref={this.ui.letterU_bottom}
                                d="M237.67,182.25h-17.86c-36.24,0-53.59-28.32-53.59-57.93V0h26.03V121.8c0,34.86,36.49,34.13,36.49,34.13,0,0,36.49,1.54,36.49-33.32V0h26.03V124.32c0,29.18-16.66,57.93-53.59,57.93Z"
                            />

                            {/* N */}
                            <polygon
                                id="letterN"
                                className={`${styles.letters} ${styles.letter_N}`}
                                ref={this.ui.letterN_bottom}
                                points="337.76 52.47 337.76 182.99 311.52 182.99 311.52 0 327.42 0 434.22 127.45 434.22 0 461.4 0 461.4 182.99 445.71 182.99 337.76 52.47"
                            />

                            {/* I */}
                            <rect
                                id="letterI"
                                className={`${styles.letters} ${`${styles.letters} ${styles.letter_I}`}`}
                                ref={this.ui.letterI_bottom}
                                x="1032.73"
                                y=".46"
                                width="25.61"
                                height="180.34"
                            />

                            {/* _  */}
                            <rect id="strokeBottomE" className={`${styles.letters} ${styles.strokeBottomE}`} x="1330" y="158.16" width="114.4" height="25.37" />

                            {/* - */}
                            <rect id="middleStroke" ref={this.ui.middleStroke} x="611.4" y="57" width="88.6" height="26" />

                            <clipPath id="theClipPath">
                                <rect x="730.4" y=".46" width="142" height="181" />
                            </clipPath>
                        </defs>

                        {/* E */}
                        <polygon
                            className={`${styles.letters} ${styles.letter_E2}`}
                            ref={this.ui.letterE2}
                            points="1441.7 154.5 1441.7 181.79 1329.74 181.79 1329.74 .46 1441.7 .46 1441.7 25.96 1354.33 25.96 1354.33 57.59 1418.88 57.59 1418.88 82.58 1354.33 82.58 1354.33 154.5 1441.7 154.5"
                        />
                        <use href="#strokeBottomE" />

                        {/* L */}
                        <polygon
                            className={`${styles.letters} ${styles.letter_L_2}`}
                            ref={this.ui.letterL}
                            points="1203.69 180.8 1203.69 155.3 1203.69 .46 1229.3 .46 1229.3 155.3 1312.35 155.3 1312.35 180.8 1229.3 180.8 1203.69 180.8"
                        />
                        {/* L */}
                        <polygon
                            className={`${styles.letters} ${styles.letter_L}`}
                            points="1078.42 180.8 1078.42 155.3 1078.42 .46 1104.04 .46 1104.04 155.3 1187.09 155.3 1187.09 180.8 1104.04 180.8 1078.42 180.8"
                        />
                        {/* I */}
                        <rect id="letterI_top" className={`${styles.letters} ${styles.letter_I}`} ref={this.ui.letterI_top} x="1032.73" y=".46" width="25.61" height="180.34" />
                        <use href="#letterI" />

                        {/* V */}
                        <path
                            className={`${styles.letters} ${styles.letter_V}`}
                            id="letterV"
                            ref={this.ui.letterV}
                            d="M924,182.25S841.84,1.52,841.84,0h30.75l57.71,132.13L986.85,0h31.9l-82.15,182.25h-12.6Z"
                        />

                        <g id="clipReveal" clipPath="url(#theClipPath)">
                            {/* R */}
                            <path
                                id="letterR"
                                className={`${styles.letters} ${styles.letter_R}`}
                                ref={this.ui.letterR}
                                d="M802.86,81.5l72.32,99.49h-30.49s-65.29-95.65-69.47-99.67h-10.47v99.67h-24.85V0h56.88s37.92-.64,37.92,40.86c0,32.33-22.07,38.85-31.83,40.64Zm-6.86-58.14h-31.26V57.97h32.29s12.81-.64,12.81-17.31-13.84-17.31-13.84-17.31Z"
                            />
                        </g>

                        {/* custom E */}
                        <g className={`${styles.letters} ${styles.letter_E}`} ref={this.ui.letterE}>
                            <polyline className={`${styles.customLetterE}`} points="721 13, 623 13, 623 168 ,721 168" fill="transparent" strokeWidth="25"></polyline>

                            <use href="#middleStroke" />
                        </g>

                        {/* _  */}
                        <rect className={`${styles.letters} ${styles.underscore}`} ref={this.ui.underscore} x="479.07" y="157.16" width="114.4" height="23.37" />
                        {/* D */}
                        <path
                            id="letterD"
                            className={`${styles.letters} ${styles.letter_D}`}
                            ref={this.ui.letterD}
                            d="M502.13,143.81h-23.05V.93l24.98-.59s89.42-9.56,89.42,71.92-91.35,71.54-91.35,71.54Zm66.42-71.93c0-15.28-4.73-27.17-14.05-35.35-16.45-14.41-42.93-13.73-51.03-13.08V120.75c8.08,.01,34.59,.78,51.04-13.59,9.32-7.95,14.04-20.01,14.04-35.29Z"
                        />
                        {/* N */}
                        <polygon
                            id="letterN"
                            className={`${styles.letters} ${styles.letter_N}`}
                            ref={this.ui.letterN_top}
                            points="337.76 52.47 337.76 182.99 311.52 182.99 311.52 0 327.42 0 434.22 127.45 434.22 0 461.4 0 461.4 182.99 445.71 182.99 337.76 52.47"
                        />
                        <use href="#letterN" />

                        {/* U */}
                        <path
                            id="letterU"
                            className={`${styles.letters} ${styles.letter_U}`}
                            ref={this.ui.letterU_top}
                            d="M237.67,182.25h-17.86c-36.24,0-53.59-28.32-53.59-57.93V0h26.03V121.8c0,34.86,36.49,34.13,36.49,34.13,0,0,36.49,1.54,36.49-33.32V0h26.03V124.32c0,29.18-16.66,57.93-53.59,57.93Z"
                        />
                        <use href="#letterU" ref={this.ui.letterU_bottom} />
                        {/* D */}
                        <path
                            className={`${styles.letters} ${styles.letter_D}`}
                            d="M29.2,182.78H0V1.19L31.64,.44s113.66-12.16,113.66,91.41S29.2,182.78,29.2,182.78ZM26.13,26.57V156.36s92.02,12.95,92.02-65S26.13,26.57,26.13,26.57Z"
                        />
                    </svg>
                </div>
            </div>
        );
    }

    __introAutoAlpha() {
        const autoAlphaTimeline = gsap.timeline();

        autoAlphaTimeline.fromTo(this.ui.bannerContainer.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.633, ease: 'sine.inOut' }).then(this.__animation());
    }

    __animation() {
        //TODO add timing add end
        const masterTimeline = gsap.timeline();

        masterTimeline
            .fromTo(this.ui.bannerContainer.current, { y: 10 }, { y: 0, duration: 0.4, ease: 'power3.inOut' })

            .to(this.ui.middleStroke.current, { y: 58, duration: 0.4583, ease: 'power3.inOut' })

            .to([this.ui.letterI_top.current, this.ui.letterU_top.current], { y: '-100%', duration: 0.625, ease: 'power3.in' }, '<')

            .to([this.ui.letterI_bottom.current, this.ui.letterU_bottom.current, this.ui.letterD.current], { y: 0, duration: 0.625, ease: 'power3.in' }, '<')

            .to(this.ui.letterD.current, { y: 0, duration: 0.625, ease: 'elastic.out(1, 1)' }, '<5%')

            .to(this.ui.letterR.current, { x: 0, duration: 0.625, ease: 'power3.inOut' }, '<')

            .to(this.ui.letterL.current, { x: 0, duration: 0.625, ease: 'power3.inOut' }, '<')

            .to(this.ui.middleStroke.current, { y: -10, duration: 0.4583, ease: 'power3.inOut' }, '<25%')

            .fromTo(this.ui.letterV.current, { x: 17, y: -2, rotate: 20, transformOrigin: 'top left' }, { x: 0, y: 0, duration: 0.16666, rotate: 0, ease: 'power3.inOut' }, '<0.30')

            .to(this.ui.letterE2.current, { y: 0, duration: 0.4583, ease: 'power3.inOut' }, '<')

            .to(this.ui.letterN_bottom.current, { y: '100%', duration: 0.16666, ease: 'power3.in' })

            .to(this.ui.letterN_top.current, { y: 0, duration: 0.16666, ease: 'power3.inOut' }, '<0.1');
    }

    //     __killTimelines() {
    //         if (this._masterTimeline) {
    //             this._masterTimeline.kill();
    //             this._masterTimeline = null;
    //         }

    //         // if (this._autoAlphaTimeline) {
    //         //     this._autoAlphaTimeline.kill();
    //         //     this._autoAlphaTimeline = null;
    //         // }
    //     }
    // }

    _prepareAnimation() {
        this.ui.letterU_top.current.style.transform = 'translateY(-22%)';
        this.ui.letterU_bottom.current.style.transform = 'translateY(83%)';

        this.ui.letterN_top.current.style.transform = 'translateY(-17%)';
        this.ui.letterN_bottom.current.style.transform = 'translateY(89%)';

        this.ui.letterD.current.style.transform = 'translateY(100%)';

        this.ui.letterR.current.style.transform = 'translateX(-10%)';

        this.ui.letterI_top.current.style.transform = 'translateY(-22%)';
        this.ui.letterI_bottom.current.style.transform = 'translateY(86%)';

        this.ui.letterL.current.style.transform = 'translateX(-6.3%)';

        this.ui.letterE2.current.style.transform = 'translateY(35%)';

        this.ui.middleStroke.current.style.transform = 'translateY(-8.5%)';
    }
}
