import React from 'react';
import AddItemForm from './AddItemForm';
import {action} from '@storybook/addon-actions';

export default {
    title: 'AddItemForm Stories',
    component: AddItemForm,
}

export const AddItemFormBase = (props: any) => {
    return (
        <AddItemForm addItem={action('AddItemForm was clicked')} />
    )
}