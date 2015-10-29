'use strict';

(function() {
  var max_value = 999;
  var min_value = 1;

  var numerators = document.querySelectorAll(".form__count-block");
  if (numerators) {
    for (var i = 0; i < numerators.length; i++) {
      numeratorInitialize(numerators[i]);
    }
  }

  function numeratorInitialize(numerator) {
    var numerator_plus = numerator.querySelector(".form__input-numerator--plus");
    var numerator_minus = numerator.querySelector(".form__input-numerator--minus");
    var numerator_text = numerator.querySelector(".form__input-text");

    if (!numerator_plus || !numerator_minus || !numerator_text) {
      return;
    }

    numerator_text.addEventListener("change", function() {
      numeratorValueCheck(numerator_text);
    });

    numerator_plus.addEventListener("click", function() {
      if (numeratorValueCheck(numerator_text) && (parseInt(numerator_text.value, 10) != max_value)) {
        numerator_text.value = parseInt(numerator_text.value, 10) + 1;
      }
    });

    numerator_minus.addEventListener("click", function() {
      if (numeratorValueCheck(numerator_text) && (parseInt(numerator_text.value, 10) != min_value)) {
        numerator_text.value = parseInt(numerator_text.value, 10) - 1;
      }
    });
  }

  function numeratorValueCheck(numerator_text) {
    if (!numerator_text.value) {
      return false;
    }

    numerator_text.value = parseInt(numerator_text.value, 10);

    if (isNaN(numerator_text.value)) {
      numerator_text.value = min_value;
      return false;
    }

    if (numerator_text.value > max_value) {
      numerator_text.value = max_value;
      return false;
    }

    if (numerator_text.value < 1) {
      numerator_text.value = min_value;
      return false;
    }

    return true;
  }
})();