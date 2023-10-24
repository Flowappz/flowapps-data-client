window.formFieldsDateInput = async () => {
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

  const addDatePickerPackage = async () => {
    const res = await fetch(
      "https://cdn.jsdelivr.net/npm/@easepick/bundle@1.2.1/dist/index.umd.min.js",
    );
    if (res.ok) {
      const code = await res.text();
      const script = document.createElement("script");
      script.text = code;
      script.type = "text/javascript";

      script.setAttribute("form-fields-date-picker-package", "true");

      document.getElementsByTagName("head")[0].appendChild(script);
    }
  };

  await addDatePickerPackage();
  initializeDatePickers();
  initializeDateRangePickers();
};

window.formFieldsDateInput();
