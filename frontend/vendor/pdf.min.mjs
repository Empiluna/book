// Local lightweight PDF.js-compatible wrapper for offline classroom delivery.
// It uses the browser PDF renderer through an <object> element and exposes the subset of PDF.js API used by reader.html.
export const GlobalWorkerOptions = { workerSrc: '' };
export function getDocument(url){
  return { promise: Promise.resolve({
    numPages: 999,
    async getPage(n){
      return {
        getViewport({scale=1}){ return { width: Math.round(820*scale), height: Math.round(1120*scale) }; },
        render({canvasContext, viewport}){
          const canvas = canvasContext.canvas;
          const container = canvas.parentElement || document.body;
          canvas.style.display='none';
          container.innerHTML = `<object data="${url}#page=${n}" type="application/pdf" style="width:100%;height:76vh;border:0;border-radius:16px;background:#fff"><iframe src="${url}#page=${n}" style="width:100%;height:76vh;border:0;border-radius:16px;background:#fff"></iframe><p>当前浏览器不支持内嵌PDF预览，<a href="${url}" target="_blank">点击打开PDF</a></p></object>`;
          return { promise: Promise.resolve() };
        }
      };
    }
  }) };
}
