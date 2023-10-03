window.formFieldsDropdown = () => {
  const selectors = {
    DROPDOWN_TOGGLER: "[form-field-dropdown-toggler]",
    DROPDOWN_INPUT: "[form-field-dropdown-input]",
    DROPDOWN_ITEM: "[form-field-dropdown-item]",
  };

  const togglerAttributes = {
    NAME: "dropdown-name",
  };

  const togglerItemAttributes = {
    INPUT_FIELD: "input-field",
    INPUT_DATA: "input-data",
  };

  /**
   * @type {{[k: string]: Element}}
   */
  const DROPDOWN_TOGGLERS = {};

  /**
   * @type {{[k: string]: HTMLInputElement}}
   */
  const DROPDOWN_INPUTS = {};

  function selectDropdownTogglers() {
    const togglers = document.querySelectorAll(selectors.DROPDOWN_TOGGLER);

    for (let toggler of togglers) {
      const name = toggler.getAttribute(togglerAttributes.NAME);
      DROPDOWN_TOGGLERS[name] = toggler;
    }
  }

  function selectDropdownInputs() {
    const inputs = document.querySelectorAll(selectors.DROPDOWN_INPUT);

    for (let input of inputs) {
      const name = input.getAttribute("name");
      DROPDOWN_INPUTS[name] = input;
    }
  }

  function getDropdownItems() {
    return document.querySelectorAll(selectors.DROPDOWN_ITEM);
  }

  /**
   *
   * @param {Element[]} dropdownItems
   */
  function makeTheDropdownsInteractive(dropdownItems) {
    for (let item of dropdownItems) {
      item.addEventListener("click", () => {
        const data = item.getAttribute(togglerItemAttributes.INPUT_DATA);
        const inputName = item.getAttribute(togglerItemAttributes.INPUT_FIELD);

        if (inputName) {
          DROPDOWN_INPUTS[inputName].value = data;
          DROPDOWN_TOGGLERS[inputName].innerHTML = data;
        }
      });
    }
  }

  selectDropdownTogglers();
  selectDropdownInputs();

  const dropdownItems = getDropdownItems();
  makeTheDropdownsInteractive(dropdownItems);
};

window.formFieldsDropdown();
