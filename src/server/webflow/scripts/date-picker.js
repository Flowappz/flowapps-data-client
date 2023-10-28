window.formFieldsDateInput = async () => {
  const selectors = {
    DATE_PICKER: "[form-fields-pro-date-picker]",
    DATE_RANGE_PICKER: "[form-fields-pro-date-range-picker]",
  };

  /**
   *
   * @param {Element} element
   */
  const getCommonConfig = (element) => {
    const grid = Number(element.getAttribute("data-columns"));
    const calendars = Number(element.getAttribute("data-months"));
    const firstDay = Number(element.getAttribute("data-firstDay"));
    const format = element.getAttribute("data-format");
    const lang = element.getAttribute("data-language");
    const zIndex = element.getAttribute("data-zIndex");

    return {
      element,
      css: [
        "https://cdn.jsdelivr.net/npm/@easepick/bundle@1.2.1/dist/index.css",
      ],
      grid,
      calendars,
      firstDay,
      format,
      lang,
      zIndex,
    };
  };

  const initializeDatePickers = () => {
    const datePickers = document.querySelectorAll(selectors.DATE_PICKER);

    for (let datePicker of datePickers) {
      const config = getCommonConfig(datePicker);
      console.log("config: ", config);
      new easepick.create({
        ...config,
        date: new Date(),
      });
    }
  };

  const initializeDateRangePickers = () => {
    const datePickers = document.querySelectorAll(selectors.DATE_RANGE_PICKER);

    for (let datePicker of datePickers) {
      const config = getCommonConfig(datePicker);
      console.log("config: ", config);
      new easepick.create({
        ...config,
        plugins: ["RangePlugin"],
        RangePlugin: {
          startDate: new Date(),
          endDate: new Date(),
        },
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
