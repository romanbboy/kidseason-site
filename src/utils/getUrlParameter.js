export const getUrlParam = (parameter, link = null) => {
  let p = link || window.location.search;
  p = p.match(new RegExp(parameter + '=([^&=]+)'));
  return p ? p[1] : false;
};