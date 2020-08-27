import React, {ChangeEvent, useState} from 'react';

export type EditableSpanPropsType = {
    value: string
    changeValue?: (value: string) => void
}

function EditableSpan(props: EditableSpanPropsType) {

    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState(props.value)

    const activatedEditMode = () => {
        setEditMode(true)
    }

    const deActivatedEditMode = () => {
        setEditMode(false);
        if(props.changeValue){props.changeValue(title)}
    }

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return (
        editMode
            ? <input value={title} onBlur={deActivatedEditMode} autoFocus onChange={onChangeTitle}/>
            : <span onDoubleClick={activatedEditMode}>{props.value}</span>
    )
}

export default EditableSpan;