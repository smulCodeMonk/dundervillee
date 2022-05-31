import React, { Component } from 'react';
import classNames from 'classnames';

import styles from './Radio.module.scss';

export default class Radio extends Component {
    render() {
        const { className, type, name, id, ariaLabel, children, ...otherProps } = this.props;

        return (
            <div className={styles.radio}>
                <label htmlFor="multiple-choice-question" className={styles.label}>
                    {children}
                </label>

                <label htmlFor="radioOption1" className={styles.labelRadio} aria-label="male">
                    {children}
                </label>
                <input type="radio" id="radioOption1" value="male" className={styles.radioOptions} />
                <label htmlFor="radioOption2" className={styles.labelRadio} aria-label="female">
                    {children}
                </label>
                <input type="radio" id="radioOption2" value="female" className={styles.radioOptions} />
                <label htmlFor="radioOption3" className={styles.labelRadio} aria-label="I prefer not to say">
                    {children}
                </label>
                <input type="radio" id="radioOption3" value="I prefer not to say" className={styles.radioOptions} />
            </div>
        );
    }

    // _handleChange(e) {
    //     console.log(this.state.value);
    //     console.log(e.target.value);
    //     // this.setState({ value: e.target.value });
    // }
}
