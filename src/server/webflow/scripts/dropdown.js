window.formFieldsDropdown = () => {
  const selectors = {
    DROPDOWN_TOGGLER: "[form-field-dropdown-toggler]",
    DROPDOWN_INPUT: "[form-field-dropdown-input]",
    DROPDOWN_ITEM: "[form-field-dropdown-item]",
    DROPDOWN_LIST: "[form-field-dropdown-item-list]",
  };

  const togglerAttributes = {
    NAME: "dropdown-name",
  };

  const togglerItemAttributes = {
    INPUT_FIELD: "input-field",
    INPUT_DATA: "input-data",
  };

  /**
   * @type {{[k: string]: HTMLElement}}
   */
  const DROPDOWN_TOGGLERS = {};

  /**
   * @type {{[k: string]: HTMLElement}}
   */
  const DROPDOWN_LISTS = {};

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

  function selectDropdownLists() {
    const dropdownLists = document.querySelectorAll(selectors.DROPDOWN_LIST);

    for (let list of dropdownLists) {
      const name = list.getAttribute(togglerAttributes.NAME);
      DROPDOWN_LISTS[name] = list;
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

  function showListItemsOnTogglerClick() {
    for (let key in DROPDOWN_TOGGLERS) {
      const toggler = DROPDOWN_TOGGLERS[key];
      toggler.addEventListener("click", () => {
        const name = toggler.getAttribute(togglerAttributes.NAME);

        if (name) {
          DROPDOWN_LISTS[name].style.display = "initial";
        }
      });
    }
  }

  function setInputValueOnItemClick() {
    const dropdownItems = getDropdownItems();

    for (let item of dropdownItems) {
      item.addEventListener("click", () => {
        const data = item.getAttribute(togglerItemAttributes.INPUT_DATA);
        const inputName = item.getAttribute(togglerItemAttributes.INPUT_FIELD);

        if (inputName) {
          DROPDOWN_INPUTS[inputName].value = data;
          DROPDOWN_TOGGLERS[inputName].innerHTML = data;

          DROPDOWN_LISTS[inputName].style.display = "none";
        }
      });
    }
  }

  function makeTheDropdownsInteractive() {
    showListItemsOnTogglerClick();
    setInputValueOnItemClick();
  }

  selectDropdownTogglers();
  selectDropdownLists();
  selectDropdownInputs();

  makeTheDropdownsInteractive();
};

window.formFieldsDropdown();
