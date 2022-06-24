import React from 'react'

import style from './Loader.module.scss'

import { ModelsUI } from 'types'

/* START - Loader additional imports and module code. */
import { Icon } from 'components-ui'

const Loader: React.FC<ModelsUI.ILoaderProps> = ({ isLoading }) => {
    return (
        <div className={`${style.container} ${isLoading ? style.container_show : ''}`}>
            <Icon type={'Loader'} height={'120px'} width={'120xp'} />
        </div>
    )
}

export default Loader
