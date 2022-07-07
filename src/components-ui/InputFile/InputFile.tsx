import React from 'react'

import style from './InputFile.module.scss'

import { ModelsUI } from 'types'

/* START - InputFile additional imports and module code. */
import { Icon } from 'components-ui'

const InputFile: React.FC<ModelsUI.IInputFileProps> = ({ onChange }) => {
    // TODO
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            onChange(event.target.files[0])
        }
    }

    return <input type={'file'} onChange={handleChange} />
}

export default InputFile
