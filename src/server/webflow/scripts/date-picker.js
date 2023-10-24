window.formFieldsDateInput = () => {

  const selectors = {
    DATE_PICKER: "[form-fields-pro-date-picker]",
    DATE_RANGE_PICKER: "[form-fields-pro-date-range-picker]",
  };

  const initializeDatePickers = () => {
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

  const initializeDateRangePickers = () => {
    const datePickers = document.querySelectorAll(selectors.DATE_RANGE_PICKER);

    for (let datePicker of datePickers) {
      new easepick.create({
        element: datePicker,
        css: [
          "https://cdn.jsdelivr.net/npm/@easepick/bundle@1.2.1/dist/index.css",
        ],
        zIndex: 10,
        plugins: ["RangePlugin"],
      });
    }
  };

  initializeDatePickers();
  initializeDateRangePickers();

};

window.formFieldsDateInput();
