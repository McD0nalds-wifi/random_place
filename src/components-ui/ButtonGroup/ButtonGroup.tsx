import React from 'react'

import style from './ButtonGroup.module.scss'

import { ModelsUI } from 'types'

/* START - ButtonGroup additional imports and module code. */
import { Button } from 'components-ui'

const ButtonGroup: React.FC<ModelsUI.IButtonGroupProps> = ({ itemsList, onChange }) => {
    const [buttonItemsList, setButtonItemsList] = React.useState<ModelsUI.IButtonGroupItem[]>(itemsList)

    const handleButtonClick = (buttonId: string) => {
        const newButtonItemsList: ModelsUI.IButtonGroupItem[] = [...buttonItemsList].map(
            (buttonItem): ModelsUI.IButtonGroupItem => {
                if (buttonItem.id === buttonId) {
                    onChange(buttonItem)

                    return {
                        ...buttonItem,
                        isActive: !buttonItem.isActive,
                    }
                }

                return buttonItem
            },
        )

        setButtonItemsList(newButtonItemsList)
    }

    return (
        <div className={style.container}>
            {buttonItemsList.map(
                (buttonItem): JSX.Element => (
                    <Button
                        key={`ButtonItem-${buttonItem.id}`}
                        type={buttonItem.isActive ? 'Primary' : 'Secondary'}
                        size={'Small'}
                        icon={buttonItem.icon}
                        onClick={() => handleButtonClick(buttonItem.id)}
                    >
                        {buttonItem.title}
                    </Button>
                ),
            )}
        </div>
    )
}

export default ButtonGroup
