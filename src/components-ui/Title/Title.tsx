import React from 'react'

import style from './Title.module.scss'

import { ModelsUI } from 'types'

/* START - Title additional imports and module code. */

const Title: React.FC<ModelsUI.ITitleProps> = ({ level, children }) => {
    switch (level) {
        case 1:
            return <h1 className={style.title}>{children}</h1>
        case 2:
            return <h2 className={style.title}>{children}</h2>
        case 3:
            return <h3 className={style.title}>{children}</h3>
        case 4:
            return <h4 className={style.title}>{children}</h4>
        case 5:
        default:
            return <h5 className={style.title}>{children}</h5>
    }
}

export default Title
