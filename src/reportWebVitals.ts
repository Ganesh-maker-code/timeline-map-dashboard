const reportWebVitals = (onPerfEntry?: (metric: any) => void) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import("web-vitals").then((module) => {
      // @ts-ignore: TypeScript can't infer web-vitals dynamic import structure
      const webVitals = module.default || module;
      (webVitals as any).getCLS(onPerfEntry);
      (webVitals as any).getFID(onPerfEntry);
      (webVitals as any).getFCP(onPerfEntry);
      (webVitals as any).getLCP(onPerfEntry);
      (webVitals as any).getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
