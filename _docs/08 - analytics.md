# Analytics

Analytics is super easy to implement.

Almost always it will be fine to just add this to `_app`

```javascript
<Analytics>
    <GoogleGlobalSiteTag />
    <CookieNotification />
</Analytics>
```

This boilerplate contains three implementations of analytics. It's possible to run them all at once. But you would never need to do this as eventually they would all send the info to Google Analytics.

```javascript
<Analytics>
    <GoogleTagManager />
    <GoogleGlobalSiteTag />
    <GoogleAnalytics />
    <CookieNotification />
</Analytics>
```

#### Strategies

The Analytics component supports to different strategies.

1. Wait for consent given by the user
2. Immediate tracking

Depending on the lay and your client requests you can deside whoch one better suits your project.
More information about the Cookie Law can be found here: More information about the use of cookies: https://gdpr.eu/cookies/

##### 1. Wait for Consent

Waiting for consent is the default strategy.

```javascript
<Analytics>
    <GoogleTagManager />
    <CookieNotification />
</Analytics>
```

When you use the default CookieNotification Component `analytics.consent()` will set a cookie and close the Component.

```javascript
_handleClick = () => {
    const { analytics } = this.props;
    analytics.consent(/* callback */);
};
```

##### 2. Immediate

The immediate strategy doesn't wait for the user to give consent.
Most of the times the cookie notification will say something like:

```
This site uses cookies to provide you with a great user experience. By using XXX, you accept our use of cookies (Link to page)
```

```javascript
<Analytics strategy="immediate">
    <GoogleTagManager />
    <CookieNotification />
</Analytics>
```

When you use the default CookieNotification Component `analytics.consent()` will set a cookie and close the Component.

```javascript
_handleClick = () => {
    const { analytics } = this.props;
    analytics.consent(/* callback */);
};
```

#### Pages

By default all pages will be tracked in the `<Analytics>` Component.

```javascript
<Analytics>
    <GoogleGlobalSiteTag />
    <CookieNotification />
</Analytics>
```

All pages will be marked as virtual pages, which looks a bit like:

```javascript
window.dataLayer.push({
    event: 'VirtualPageView',
    virtualPageURL: `/virtual${path}`
});
```

#### Events

It's also possible to track custom events for in example buttons or form success events.

The first thing you have to do is to wrap your component with the `withAnalytics` Higher Order Component.

```javascript
import { withAnalytics, GRANTED } from 'components/analytics/Analytics';

class MyComponent extends Component {
    // ...
}
export default withAnalytics(MyComponent);
```

After wrapping your component you can use the method `trackEvent(/* trackingObject */)` on the newly obtained prop `analytics`;

```javascript
_handleClick = () => {
    const { analytics } = this.props;
    analytics.trackEvent({ event: 'event', category: 'category', action: 'action', label: 'label' });
};
```

## Extending Analytics

It's easy to integrate with other analytics. Below you'll find the bare minimum used to create your own custom Tracking Integration that will work immediatly with the Cookie Notification setup.

```javascript
import React, { Component } from 'react';
import Script from 'next/script';

import { withAnalytics, GRANTED } from 'components/analytics/Analytics';

class CustomAnalytics extends Component {
    componentDidMount() {
        this._setEventListeners();
    }

    render() {
        const { analytics } = this.props;
        const isConsentGranted = analytics.trackingConsent === GRANTED;
        if (!isConsentGranted) return null;

        // add the right third party scripts here.
        // it's advised to use the nextjs beforeInteractive strategy, since the analytics component will automatically lazy load for you.
        return <Script strategy="beforeInteractive" src="" />;
    }

    _setEventListeners() {
        const { analytics } = this.props;
        analytics.events.addEventListener('trackPage', this._handleTrackPage);
        analytics.events.addEventListener('trackEvent', this._handleTrackEvent);
    }

    _handleTrackPage = (data) => {
        // Add your third party page tracking here
        // default page tracking valeus: { path, title }
    };

    _handleTrackEvent = (data) => {
        // Add your third party custom event tracking here
        // example custom event tracking valeus: { event, category, action, label, ...other }
        console.log(data);
    };
}

export default withAnalytics(CustomAnalytics);
```
