window.showHideDropdown = () => {
  const selectors = {
    DROPDOWN_TOGGLER: "[form-field-dropdown-toggler]",
    SEARCHABLE_DROPDOWN_TOGGLER: "[form-field-searchable-dropdown-toggler]",
    DROPDOWN_INPUT: "[form-field-dropdown-input]",
    DROPDOWN_ITEM: "[form-field-dropdown-item]",
    DROPDOWN_LIST: "[form-field-dropdown-item-list]",
    DROPDOWN_TOGGLERS_SELECTED_VALUE:
      "[form-field-dropdown-toggler-selected-value]",
    NO_DATA_FOUND: "[form-field-searchable-dropdown-no-item-found]",
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

  /**
   * @type {{[k: string]: HTMLInputElement}}
   */
  const NO_DATA_FOUND = {};

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

  function selectNoDataFound() {
    const noDataMessages = document.querySelectorAll(selectors.NO_DATA_FOUND);
    for (let noData of noDataMessages) {
      const name = noData.getAttribute(togglerAttributes.NAME);
      NO_DATA_FOUND[name] = noData;
    }
  }

  function getDropdownItems() {
    return document.querySelectorAll(selectors.DROPDOWN_ITEM);
  }

  function selectDropdownInputs() {
    const inputs = document.querySelectorAll(selectors.DROPDOWN_INPUT);

    for (let input of inputs) {
      const name = input.getAttribute("name");
      DROPDOWN_INPUTS[name] = input;
    }
  }

  function selectDropdownLists() {
    const dropdownLists = document.querySelectorAll(selectors.DROPDOWN_LIST);

    for (let list of dropdownLists) {
      const name = list.getAttribute(togglerAttributes.NAME);
      DROPDOWN_LISTS[name] = list;
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
      DROPDOWN_INPUTS[key].addEventListener("click", (e) => {
        if (DROPDOWN_LISTS[key].style.display === "block") {
          e.stopPropagation();
        }
      });

      DROPDOWN_INPUTS[key].addEventListener("input", (e) => {
        const val = e.target.value;

        if (val.trim()) {
          let count = 0;
          for (let item of SEARCHABLE_DROPDOWN_LIST_ITEMS[key]) {
            if (item.innerText.toLowerCase().includes(val.toLowerCase())) {
              item.style.display = "block";
              count++;
            } else item.style.display = "none";
          }
          if (count === 0) {
            NO_DATA_FOUND[key].style.display = "block";
          } else NO_DATA_FOUND[key].style.display = "none";
        } else {
          for (let item of SEARCHABLE_DROPDOWN_LIST_ITEMS[key]) {
            item.style.display = "block";
          }
        }
      });
    }
  }

  function closest(e, t) {
    return !e ? false : e === t ? true : closest(e.parentNode, t);
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

  selectDropdownTogglers();
  selectDropdownLists();
  selectDropdownInputs();
  selectNoDataFound();
  selectSearchableItems();
  filterItemsOnInputChange();
  hideDropdownOnOutsideClick();
};

window.showHideDropdown();