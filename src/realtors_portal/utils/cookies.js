export function setCookie(name, value, exp_days) {
  let d = new Date();
  d.setTime(d.getTime() + exp_days * 24 * 60 * 60 * 1000);
  let expires = 'expires=' + d.toGMTString();

  let sameSiteFlag = '; SameSite=Lax';

  let secureFlag = '; Secure';
  let httpOnlyFlag = '; HttpOnly';

  document.cookie = name + '=' + value + ';' + expires + ';path=/';

  if (window.location.protocol === 'https:') {
    document.cookie =
      name + '=' + value + ';' + expires + ';path=/' + sameSiteFlag + secureFlag + httpOnlyFlag;
  } else {
    document.cookie = name + '=' + value + ';' + expires + ';path=/' + sameSiteFlag + httpOnlyFlag;
  }
}

export function getCookie(name) {
  let cname = name + '=';
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(cname) == 0) {
      return c.substring(cname.length, c.length);
    }
  }
  return '';
}
// export const getCookieOnTheServer = (name, cookies) => {
//   const cname = `${name}=`;
//   let ca = cookies.split(';');
//   for (let i = 0; i < ca.length; i++) {
//     let c = ca[i];
//     while (c.charAt(0) == ' ') {
//       c = c.substring(1);
//     }
//     if (c.indexOf(cname) == 0) {
//       return c.substring(cname.length, c.length);
//     }
//   }
//   return '';
// };
export const getCookieOnTheServer = (name, cookiesHeader) => {
  const cookies = cookiesHeader.split(';');
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(name + '=') === 0) {
      return cookie.substring(name.length + 1, cookie.length);
    }
  }
  return '';
};
export function deleteCookie(name) {
  let d = new Date();
  d.setTime(d.getTime() - 60 * 60 * 1000);
  let expires = 'expires=' + d.toGMTString();
  document.cookie = name + '=;' + expires + ';path=/';
}
