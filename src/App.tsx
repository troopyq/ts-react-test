import React, { useEffect, useState } from 'react'
import { List } from './components'
import { startMirage } from './server-mock'
import { IDataObject } from './types/types'


if (process.env.NODE_ENV === 'development') {
  startMirage()
}

function App() {
  const [list, setList] = useState<IDataObject[]>([])

  useEffect(() => {
    // получение данных с сервера при рождении компонента
    getDataList();
  }, [])

  // получаем данные с сервера и заносим в состояние
  async function getDataList(): Promise<void>{
    try{
      const response = await fetch('/api/regions')
      const data: IDataObject[] = await response.json()
      setList(listToTree(data))
      
    } catch(e){
      console.error(e);
    }
  }

  // функция преобразования массива в древовидную структуру
  function listToTree(arr: IDataObject[]): IDataObject[] {
    // сортируем массив от детей до родителей
    const newArr: IDataObject[] = arr.sort((a: IDataObject, b: IDataObject) => (
      b.path.split('.').length - a.path.split('.').length
    ));
  
    const res: IDataObject[] = [];
    for (let el of newArr) {
      // находим родителя текущего элемента
      const parent: IDataObject | undefined =
        newArr.find(
          (par: IDataObject) =>
            el.path !== par.path &&
            el.path.includes(par.path) &&
            el.path.split('.').length - 1 === par.path.split('.').length,
        );
      
      // заносим детей к родителям, и к корневым родителям
      if (parent) {
        if (!Array.isArray(parent.child)) parent.child = [];
        parent.child.push(el);

        // если корневой родитель, то заносим в res
      }else if(el.path.split('.').length === 1){
        res.push(el);
      }
    } /* завершение цикла for */
    
    return res;
  }

  return <div className="App">
    <List items={list} />
  </div>
}

export default App
