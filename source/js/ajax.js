(function() {
  if (!("FormData" in window)) {
   return;
  }

  var form = document.querySelector(".form");

  form.addEventListener("submit", function(event) {
    event.preventDefault();

    var data = new FormData(form);

    ajaxRequest(data, function(response) {
      // successFunction
      // console.log(response);
      popupShow(document.querySelector(".popup--js-success"));
    }, function() {
      // failureFunction
      // console.log("Error");
      popupShow(document.querySelector(".popup--js-error"));
    });
  });

  function ajaxRequest(data, successFunction, failureFunction) {
    var xhr = new XMLHttpRequest();
    var time = (new Date()).getTime();

    xhr.open("post", "https://echo.htmlacademy.ru/adaptive?" + time);

    xhr.addEventListener("readystatechange", function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        successFunction(xhr.responseText);
      }

      if (xhr.status == 404) {
        failureFunction();
      }
    });

    xhr.send(data);
  }

  function popupShow(popup_result) {
    if (!popup_result) {
      return;
    }

    if (!popup_result.classList.contains("popup--show")) {
        popup_result.classList.add("popup--show");
    }

    popup_result_close = popup_result.querySelector(".button");
    popup_result_close.addEventListener("click", function(event) {
      event.preventDefault();
      if (popup_result.classList.contains("popup--show")) {
        popup_result.classList.remove("popup--show");
      }
    });
  }

})();
