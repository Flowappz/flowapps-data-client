window.formFieldsNumberSlider = async () => {
  const additionalCss = `
  .rs-noscale .rs-scale {
    display: none;
  }
  .rs-scale {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  .rs-scale span {
    display: none;
  }
  .rs-scale span:first-child, .rs-scale span:last-child {
    display: initial;
  }
  `;

  const addNumberSliderCss = async () => {
    const res = await fetch(
      `https://slawomir-zaziablo.github.io/range-slider/css/rSlider.min.css`,
    );

    if (res.ok) {
      const cssString = await res.text();
      const style = document.createElement("style");
      style.innerHTML = `${cssString} ${additionalCss}`;

      document.getElementsByTagName("head")[0].appendChild(style);
    }
  };

  const addNumberSliderPackage = async () => {
    const res = await fetch(
      "https://slawomir-zaziablo.github.io/range-slider/js/rSlider.min.js",
    );
    if (res.ok) {
      const code = await res.text();
      const script = document.createElement("script");
      script.text = code;
      script.type = "text/javascript";

      script.setAttribute("form-fields-number-slider-package", "true");

      document.getElementsByTagName("head")[0].appendChild(script);
    }
  };

  /**
   *
   * @param {Element} sliderInput
   */
  const initializeRegularSlider = (sliderInput) => {
    const min = Number(sliderInput.getAttribute("data-min"));
    const max = Number(sliderInput.getAttribute("data-max"));
    const defaultValue = Number(sliderInput.getAttribute("data-default"));

    new rSlider({
      target: sliderInput,
      values: { min, max },
      set: [defaultValue],
      range: false,
      tooltip: true,
      scale: true,
      label: false,
      step: 1,
    });
  };

  /**
   *
   * @param {Element} sliderInput
   */
  const initializeRangeSlider = (sliderInput) => {
    const min = Number(sliderInput.getAttribute("data-min"));
    const max = Number(sliderInput.getAttribute("data-max"));
    const defaultmin = Number(sliderInput.getAttribute("data-min-default"));
    const defaultmax = Number(sliderInput.getAttribute("data-max-default"));

    new rSlider({
      target: sliderInput,
      values: { min, max },
      set: [defaultmin, defaultmax],
      range: true,
      tooltip: true,
      scale: true,
      label: false,
      step: 1,
    });
  };

  const initializeTheSliders = () => {
    const sliders = document.querySelectorAll(
      `[form-fields-pro-number-slider]`,
    );

    for (let slider of sliders) {
      const rangeSlider = slider.getAttribute("allow-range");
      if (rangeSlider) initializeRangeSlider(slider);
      else initializeRegularSlider(slider);
    }
  };

  await Promise.all([addNumberSliderCss(), addNumberSliderPackage()]);

  initializeTheSliders();
};

window.formFieldsNumberSlider();
