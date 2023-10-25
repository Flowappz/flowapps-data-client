window.formFieldsDropdown = () => {
  const selectors = {
    DROPDOWN_TOGGLER: "[form-field-dropdown-toggler]",
    SEARCHABLE_DROPDOWN_TOGGLER: "[form-field-searchable-dropdown-toggler]",
    DROPDOWN_INPUT: "[form-field-dropdown-input]",
    DROPDOWN_ITEM: "[form-field-dropdown-item]",
    DROPDOWN_LIST: "[form-field-dropdown-item-list]",
    DROPDOWN_TOGGLERS_SELECTED_VALUE:
      "[form-field-dropdown-toggler-selected-value]",
  };

  const togglerAttributes = {
    NAME: "dropdown-name",
  };

  const togglerItemAttributes = {
    INPUT_FIELD: "input-field",
    INPUT_DATA: "input-data",
  };

  function closest(e, t) {
    return !e ? false : e === t ? true : closest(e.parentNode, t);
  }

  /**
   * @type {{[k: string]: HTMLElement}}
   */
  const DROPDOWN_TOGGLERS = {};

  /**
   * @type {{[k: string]: HTMLElement}}
   */
  const SEARCHABLE_DROPDOWN_TOGGLERS = {};

  /**
   * @type {{[k: string]: HTMLElement[]}}
   */
  const SEARCHABLE_DROPDOWN_LIST_ITEMS = {};

  /**
   * @type {{[k: string]: HTMLElement}}
   */
  const DROPDOWN_TOGGLERS_SELECTED_VALUE = {};

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

    const selectedValueLabelForRegularDropdown = document.querySelectorAll(
      selectors.DROPDOWN_TOGGLERS_SELECTED_VALUE,
    );

    for (let selectedValueLabel of selectedValueLabelForRegularDropdown) {
      const name = selectedValueLabel.getAttribute(togglerAttributes.NAME);
      DROPDOWN_TOGGLERS_SELECTED_VALUE[name] = selectedValueLabel;
    }

    const searchableTogglers = document.querySelectorAll(
      selectors.SEARCHABLE_DROPDOWN_TOGGLER,
    );

    for (let searchableToggler of searchableTogglers) {
      const name = searchableToggler.getAttribute(togglerAttributes.NAME);
      SEARCHABLE_DROPDOWN_TOGGLERS[name] = searchableToggler;
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

  function showHideListItemsOnTogglerClick() {
    for (let key in DROPDOWN_TOGGLERS) {
      const toggler = DROPDOWN_TOGGLERS[key];
      toggler.addEventListener("click", (e) => {
        e.stopPropagation();

        const name = toggler.getAttribute(togglerAttributes.NAME);

        if (name && DROPDOWN_LISTS[name].style.display !== "block") {
          DROPDOWN_LISTS[name].style.display = "block";
        } else if (name && DROPDOWN_LISTS[name].style.display === "block") {
          DROPDOWN_LISTS[name].style.display = "none";
        }
      });
    }
  }

  const hideDropdownOnOutsideClick = () => {
    const lists = document.querySelectorAll("[form-field-dropdown-item-list]");
    for (let list of lists) {
      list.addEventListener("click", (e) => e.stopPropagation());
      document.body.addEventListener("click", function (e) {
        if (!closest(e.target, list)) {
          list.style.display = "none";
        }
      });
    }
  };

  function setInputValueOnItemClick() {
    const dropdownItems = getDropdownItems();

    for (let item of dropdownItems) {
      item.addEventListener("click", () => {
        const data = item.getAttribute(togglerItemAttributes.INPUT_DATA);
        const inputName = item.getAttribute(togglerItemAttributes.INPUT_FIELD);

        if (inputName) {
          DROPDOWN_INPUTS[inputName].value = data;

          if (!SEARCHABLE_DROPDOWN_TOGGLERS[inputName])
            DROPDOWN_TOGGLERS_SELECTED_VALUE[inputName].innerHTML = data;

          DROPDOWN_LISTS[inputName].style.display = "none";
        }
      });
    }
  }

  function selectSearchableItems() {
    const items = getDropdownItems();

    for (let item of items) {
      const inputName = item.getAttribute(togglerItemAttributes.INPUT_FIELD);

      if (!SEARCHABLE_DROPDOWN_TOGGLERS[inputName]) continue;

      if (inputName && SEARCHABLE_DROPDOWN_LIST_ITEMS[inputName]) {
        SEARCHABLE_DROPDOWN_LIST_ITEMS[inputName].push(item);
      } else if (inputName) SEARCHABLE_DROPDOWN_LIST_ITEMS[inputName] = [item];
    }
  }

  function filterItemsOnInputChange() {
    const inputKeys = Object.keys(SEARCHABLE_DROPDOWN_TOGGLERS);

    for (let key of inputKeys) {
      DROPDOWN_INPUTS[key].addEventListener("input", (e) => {
        const val = e.target.value;

        if (val.trim()) {
          for (let item of SEARCHABLE_DROPDOWN_LIST_ITEMS[key]) {
            if (item.innerText.toLowerCase().includes(val.toLowerCase())) {
              item.style.display = "block";
            } else item.style.display = "none";
          }
        } else {
          for (let item of SEARCHABLE_DROPDOWN_LIST_ITEMS[key]) {
            item.style.display = "block";
          }
        }
      });
    }
  }

  function makeTheDropdownsInteractive() {
    showHideListItemsOnTogglerClick();
    setInputValueOnItemClick();
    filterItemsOnInputChange();
    hideDropdownOnOutsideClick();
  }

  selectDropdownTogglers();
  selectDropdownLists();
  selectDropdownInputs();
  selectSearchableItems();

  makeTheDropdownsInteractive();
};

window.formFieldsDropdown();
