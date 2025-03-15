import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

export default function MermaidChart({ chart }) {
  const ref = useRef(null);

  useEffect(() => {
    // Initialize mermaid when the component mounts
    mermaid.initialize({
      startOnLoad: true,
      theme: 'neutral',
      securityLevel: 'loose',
      gantt: {
        titleTopMargin: 25,
        barHeight: 20,
        barGap: 4,
        topPadding: 30,
        sidePadding: 50,
        fontSize: 14,
        numberSectionStyles: 3,
        axisFormat: '%Y',
      }
    });

    // Render the chart
    if (ref.current) {
      try {
        mermaid.render('mermaid-svg', chart).then((result) => {
          ref.current.innerHTML = result.svg;
        });
      } catch (error) {
        console.error('Error rendering mermaid chart:', error);
        ref.current.innerHTML = `<pre>${chart}</pre>`;
      }
    }
  }, [chart]);

  return <div className="mermaid-chart" ref={ref} />;
} 