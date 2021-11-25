import React, { FC } from 'react'
import { ListItem } from '..'
import {  IDataObject} from '../../types/types'

import './style.css'

interface ListProps{
  items: IDataObject[],
  className?: string,
}

const List: FC<ListProps> = ({items, className = ''}) => {
  return (
    <div  className={className}>
      {items.map((data: any) => {
        // если есть дочерние элементы, то рекурсией отображаем их
        if('child' in data){
          return (<div key={data.path}>
            <ListItem obj={data} />
            <List className='List' items={data.child} />
            </div>)
        }
        return <ListItem key={data.path} obj={data} />
      })}
    </div>
  )
}

export default List
