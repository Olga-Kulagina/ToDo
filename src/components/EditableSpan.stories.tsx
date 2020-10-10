import React from 'react';
import {action} from '@storybook/addon-actions';
import EditableSpan from './EditableSpan';

export default {
    title: 'EditableSpan Stories',
    component: EditableSpan,
}

export const EditableSpanBase = (props: any) => {
    return (
        <EditableSpan value={'start Value'} changeValue={action('value changed')}/>
    )
}