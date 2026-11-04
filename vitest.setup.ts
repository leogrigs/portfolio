import "@testing-library/jest-dom";

class MockIntersectionObserver {
  callback: IntersectionObserverCallback;
  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
  }
  observe = (target: Element) => {
    this.callback(
      [
        {
          isIntersecting: true,
          intersectionRatio: 1,
          target,
          boundingClientRect: {} as DOMRectReadOnly,
          intersectionRect: {} as DOMRectReadOnly,
          rootBounds: null,
          time: 0,
        },
      ],
      this as unknown as IntersectionObserver
    );
  };
  unobserve = () => {};
  disconnect = () => {};
  takeRecords = () => [];
  root = null;
  rootMargin = "";
  thresholds = [];
}

class MockResizeObserver {
  observe = () => {};
  unobserve = () => {};
  disconnect = () => {};
}

const globals = globalThis as unknown as Record<string, unknown>;

if (typeof window !== "undefined") {
  if (!window.matchMedia) {
    window.matchMedia = (query: string) =>
      ({
        matches: false,
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false,
      }) as MediaQueryList;
  }

  if (!("IntersectionObserver" in window)) {
    globals.IntersectionObserver = MockIntersectionObserver;
    (window as unknown as Record<string, unknown>).IntersectionObserver =
      MockIntersectionObserver;
  }

  if (!("ResizeObserver" in window)) {
    globals.ResizeObserver = MockResizeObserver;
  }

  // jsdom has no canvas; returning null exercises the text fallback
  HTMLCanvasElement.prototype.getContext = (() =>
    null) as unknown as HTMLCanvasElement["getContext"];

  window.scrollTo = (() => {}) as typeof window.scrollTo;
}
