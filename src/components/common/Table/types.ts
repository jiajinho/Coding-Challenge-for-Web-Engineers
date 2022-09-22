export type Object = { [k: string]: any }

export type Value = string | number | boolean | JSX.Element;

type CellRender<T> = ((row: T) => Value);

export type Column<T extends Object> = {
  title: string | JSX.Element,
  width?: string,
  render: CellRender<T>
}