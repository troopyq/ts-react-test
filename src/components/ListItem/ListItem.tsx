import React, { FC, useState } from 'react'
import { IDataObject } from '../../types/types'

import './style.css'

interface ListItemProps{
  obj: IDataObject,
}

const ListItem: FC<ListItemProps> = ({obj}) => {
  const [isOpen, setIsOpen] = useState(false)
  
  // функция открытия и закрытия католога
  function handleClick() {
    setIsOpen(prev => !prev)
  }

  return (
    <div onClick={handleClick}  className={`ListItem ${isOpen ? 'open' :''}`}> 
      {obj.name}
    </div>
  )
}

export default ListItem
