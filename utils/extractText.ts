/* eslint-disable @typescript-eslint/no-explicit-any */
export const extractText = (html?: string | any) => {
  if (!html) return '';
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.innerText;
};
