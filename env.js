if (window.location.hostname.indexOf('prod') != -1 && window.location.hostname.indexOf('local') == -1) {
  console.log('PROD ENV');
  window.env = "prod";
  window.BACKEND_URL = window.location.protocol + '//' + window.location.hostname + "/api";
  window.FRONTEND_URL = window.location.protocol + '//' + window.location.hostname;
} else {
  console.log('LOCAL ENV');
  window.env = "dev";
  window.BACKEND_URL = window.location.protocol + '//' + window.location.hostname + "/api";
  window.FRONTEND_URL = window.location.protocol + '//' + window.location.hostname;
}