import { htmlAttribute, HTMLAttributePlugin } from '..';

describe('HTMLAttribute class', () => {
  let div: HTMLElement;
  beforeEach(() => {
    div = document.createElement('div');
  });

  it('should add plugins correctly', () => {
    const testPlugin: HTMLAttributePlugin = {
      name: 'test',
      beforeSetAttribute: jest.fn(),
      afterSetAttribute: jest.fn()
    };

    htmlAttribute.plugin(testPlugin);

    const pluginMap = (htmlAttribute as any).pluginMap;

    expect(pluginMap['test']).toEqual(testPlugin);
  });

  it('should call beforeSetAttribute and afterSetAttribute when setting an attribute', () => {
    const beforeSetAttribute = jest.fn();
    const afterSetAttribute = jest.fn();

    const testPlugin: HTMLAttributePlugin = {
      name: 'data-test',
      beforeSetAttribute,
      afterSetAttribute
    };

    htmlAttribute.plugin(testPlugin);

    div.setAttribute('data-test', 'value');

    expect(beforeSetAttribute).toHaveBeenCalledWith(div, 'value');
    expect(afterSetAttribute).toHaveBeenCalledWith(div, 'value');
  });

  it('should not call hooks for non-matching attributes', () => {
    const beforeSetAttribute = jest.fn();
    const afterSetAttribute = jest.fn();

    const testPlugin: HTMLAttributePlugin = {
      name: 'data-test',
      beforeSetAttribute,
      afterSetAttribute
    };

    htmlAttribute.plugin(testPlugin);

    div.setAttribute('data-something-else', 'value');

    expect(beforeSetAttribute).not.toHaveBeenCalled();
    expect(afterSetAttribute).not.toHaveBeenCalled();
  });
});
