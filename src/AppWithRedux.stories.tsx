import React from 'react';
import AppWithRedux from './AppWithRedux';
import {action} from '@storybook/addon-actions';
import {ReduxStoreProviderDecorator} from './stories/decorators/ReduxStoreProviderDecorator';

export default {
    title: 'AppWithRedux Stories',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator]
}

export const AppWithReduxBase = (props: any) => {
    return (
        <AppWithRedux />
    )
}