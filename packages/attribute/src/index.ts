import { HTMLAttributePlugin } from './types';

class HTMLAttribute {
  private __setAttribute = Element.prototype.setAttribute;

  private pluginMap: Record<string, HTMLAttributePlugin<any>> = {};

  constructor() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this;

    Element.prototype.setAttribute = function (qualifiedName: string, value: string) {
      that.pluginMap[qualifiedName]?.beforeSetAttribute?.(this as HTMLElement, value);
      that.__setAttribute.call(this, qualifiedName, value);
      that.pluginMap[qualifiedName]?.afterSetAttribute?.(this as HTMLElement, value);
    };
  }

  plugin(plugin: HTMLAttributePlugin) {
    this.pluginMap[plugin.name] = plugin;
    return this;
  }
}

const _htmlAttribute = (window as any).htmlAttribute || new HTMLAttribute();
if (!(window as any).htmlAttribute) (window as any).htmlAttribute = _htmlAttribute;

export const htmlAttribute = _htmlAttribute;

export * from './types';
