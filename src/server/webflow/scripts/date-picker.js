window.formFieldsDateInput = () => {
  const selectors = {
    DATE_PICKER: "[form-fields-pro-date-picker]",
  };

  const datePickers = document.querySelectorAll(selectors.DATE_PICKER);

  for (let datePicker of datePickers) {
    new easepick.create({
      element: datePicker,
      css: [
        "https://cdn.jsdelivr.net/npm/@easepick/bundle@1.2.1/dist/index.css",
      ],
      zIndex: 10,
    });
  }
};

window.formFieldsDateInput();
