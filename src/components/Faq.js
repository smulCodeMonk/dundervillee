import React, { Component, createRef } from 'react';

import styles from './Faq.module.scss';

import Button from './Button';
const POSTS = 'https://jsonplaceholder.typicode.com/posts';
const POSTS_AMOUNT = 10;

export default class Faq extends Component {
    // constructor() {
    //     super();

    button = createRef();
    list = createRef();
    _items = [];
    _contents = [];

    // _isLoadedItems = false;

    state = {
        isItemLoaded: false
    };
    // }

    componentDidMount() {
        this._startLoading();
        // this._setupEventListeners();
    }

    componentWillUnmount() {
        this._removeEventListeners();
    }

    render() {
        return (
            <div className={styles.container}>
                <ul ref={this.list} className={styles.list}>
                    {this._items.map((item, index) => {
                        // console.log(item, index);
                        if (index > POSTS_AMOUNT) return;
                        return (
                            <li key={index} className={styles.item} ref={(context) => this._items.push(context)}>
                                <div ref={(context) => this._contents.push(context)}>
                                    <h1>{item.title}</h1>
                                    <p>{item.body}</p>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }

    _startLoading() {
        let request = new XMLHttpRequest();
        request.onreadystatechange = () => {
            if (request.readyState == 4 && request.status == 200) {
                this.setState({ items: JSON.parse(request.responseText).map((item) => ({ ...item, isActive: false })) });

                // setTimeout(() => {
                this._setupEventListeners();
                // }, 10);
            }
        };
        request.open('GET', POSTS, true);
        request.send();
    }

    _setupEventListeners() {
        // if (!this._isLoadedItems) return;

        console.log(this._contents);

        this._items.forEach((item, index) => {
            item.addEventListener('click', () => {
                this._handleClick(item, index, { isSmall: !item.isActive || true });
            });
        });
    }

    _removeEventListeners() {
        // if (this._isLoadedItems) return;

        this._items.forEach((item) => {
            item.removeEventListener('click', () => {
                this._handleClick(item);
            });
        });
    }

    _getOneItemHeight(index) {
        return this.contents[index].getBoundingClientRect();
    }

    _handleClick = (item, index, options) => {
        const HEIGHT = 45;
        // console.log(index);

        if (options.isSmall && !this._items[index].isActive) {
            // console.log(this.items[index]);
            this._items[index].isActive = true;

            // this.setState({ items[index].Active : true })

            gsap.to(item, { maxHeight: this._getOneItemHeight(index).height, duration: 0.6, ease: 'power3.inOut' });
        } else {
            this.setState.items[index].isActive = false;
            gsap.to(item, { maxHeight: HEIGHT, duration: 0.6, ease: 'power2.inOut' });
        }
    };
}
