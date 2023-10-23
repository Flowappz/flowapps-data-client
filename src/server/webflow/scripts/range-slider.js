window.formFieldsNumberSlider = async () => {
  const addNumberSliderCss = async () => {
    const res = await fetch(
      `https://slawomir-zaziablo.github.io/range-slider/css/rSlider.min.css`,
    );

    if (res.ok) {
      const cssString = await res.text();
      const style = document.createElement("style");
      style.innerHTML = cssString;

      document.getElementsByTagName("head")[0].appendChild(style);
    }
  };

  await addNumberSliderCss();
};

window.formFieldsNumberSlider();
