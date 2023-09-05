import {
  elementGetRectByView,
  elementWhetherAllInView,
  elementWhetherPartInView,
  elementCalcOffsetToBody,
  elementCalcMouseBaseCoord
} from '..';

describe('DOM Utilities', () => {
  let testElement: HTMLElement;

  beforeAll(() => {
    // 在文档中添加一个测试元素
    testElement = document.createElement('div');
    document.body.appendChild(testElement);
  });

  afterAll(() => {
    // 测试结束后删除测试元素
    document.body.removeChild(testElement);
  });

  describe('elementGetRectByView', () => {
    it('should return correct coordinates based on viewport', () => {
      const coords = elementGetRectByView(testElement);
      expect(coords).toHaveProperty('top');
      expect(coords).toHaveProperty('bottom');
      expect(coords).toHaveProperty('left');
      expect(coords).toHaveProperty('right');
    });
  });

  describe('elementWhetherAllInView', () => {
    it('should return true when the element is fully in view', () => {
      expect(elementWhetherAllInView(testElement)).toBe(true);
    });
  });

  describe('elementWhetherPartInView', () => {
    it('should return true if element is partially in view with skew', () => {
      expect(elementWhetherPartInView(testElement, 10)).toBe(true);
    });
  });

  describe('elementCalcOffsetToBody', () => {
    it('should correctly compute offset to body', () => {
      const offsetLeft = elementCalcOffsetToBody(testElement, 'offsetLeft');
      const offsetTop = elementCalcOffsetToBody(testElement, 'offsetTop');

      expect(offsetLeft).toBeDefined();
      expect(offsetTop).toBeDefined();
    });
  });

  describe('elementCalcMouseBaseCoord', () => {
    it('should correctly calculate mouse coordinates relative to element', () => {
      const mockMouseEvent = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true,
        clientX: 100,
        clientY: 100
      });

      const { x, y } = elementCalcMouseBaseCoord(mockMouseEvent, testElement);

      expect(x).toBeDefined();
      expect(y).toBeDefined();
    });
  });
});
