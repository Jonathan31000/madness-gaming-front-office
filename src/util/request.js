export default request = (obj) => {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    if (obj.withCredentials) xhr.withCredentials = true;
    xhr.open(obj.method || "GET", obj.url);
    if (obj.headers) {
      Object.keys(obj.headers).forEach((key) => {
        xhr.setRequestHeader(key, obj.headers[key]);
      });
    } else if (!obj.file) {
      xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    }
    if (obj.file) {
      let formdata = new FormData();
      formdata.append("file", obj.file);
      xhr.onreadystatechange = (e) => {
        if (xhr.readyState == 4 && xhr.status == 200) {
          return resolve(xhr.responseText);
        }
        if (xhr.readyState == 4 && xhr.status >= 300) {
          return reject(xhr.responseText);
        }
      };
      xhr.send(formdata);
    } else {
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          if (obj.parse) {
            try {
              let json = JSON.parse(xhr.response);
              resolve(json);
            } catch (e) {
              resolve(xhr.response);
            }
          } else {
            resolve(xhr.response);
          }
        } else {
          if (obj.parse) {
            try {
              let json = JSON.parse(xhr.response);
              reject(json);
            } catch (e) {
              reject(xhr.response);
            }
          } else {
            reject(xhr.response);
          }
        }
      };
      if (!obj.rawData) {
        xhr.send(JSON.stringify(obj.body));
      } else {
        console.log(obj.body);
        xhr.send(obj.body);
      }
    }
    xhr.onerror = () => {
      let err = {error: xhr.statusText};
      if (err.error == "") err = {error: "Error occurred on request!"};
      return reject(err);
    };
  });
};