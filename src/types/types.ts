export interface IDataObject{
  id: number,
  path: string,
  name: string,
  child?: IDataObject[]
}
