export interface HTMLAttributePlugin<T extends string = 'true'> {
  name: string;
  beforeSetAttribute?: (element: HTMLElement, data: T) => void;
  afterSetAttribute?: (element: HTMLElement, data: T) => void;
}
