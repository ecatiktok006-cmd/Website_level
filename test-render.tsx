import { renderToString } from 'react-dom/server';
import React from 'react';
import PageFlipBook from 'react-pageflip';

console.log("PageFlipBook default:", PageFlipBook);

try {
  let Comp = (PageFlipBook as any).default || PageFlipBook;
  const html = renderToString(React.createElement(Comp, { width: 300, height: 400 }, React.createElement('div', null, 'hello')));
  console.log("Rendered correctly");
} catch(e: any) {
  console.log("Error rendering:", e.message);
}
