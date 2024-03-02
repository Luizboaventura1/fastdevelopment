export default function deleteAllCookies () {
  let cookies = document.cookie.split(";");

  for (var i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    let equalPosition = cookie.indexOf("=");
    let name = equalPosition > -1 ? cookie.substring(0, equalPosition) : cookie;
    // Delete cookie
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
  }
}
