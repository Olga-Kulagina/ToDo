import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddItemFormPropsType = {
    addItem: (title: string) => void

}


function AddItemForm(props: AddItemFormPropsType) {

    let [title, setTitle] = useState('');
    let [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    }

    const AddTask = () => {
        if (title.trim() !== '') {
            props.addItem(title);
            setTitle('');
        } else {
            setError('Field is required')
        }
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            AddTask();
        }
    }

    return (
        <div>
            <input value={title} onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? 'error' : ''}/>
            <button onClick={AddTask}>add</button>
            {error && <div className='error-message'>{error}</div>}
        </div>
    )
}

export default AddItemForm;