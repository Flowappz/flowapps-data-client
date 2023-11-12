export type ScriptConfig = {
  displayName: string;
  version: string;
  location: "header" | "footer";
  path?: string;
  hosted?: boolean;
  hostedLocation?: string;
  integrityHash?: string;
};

export const CUSTOM_SCRIPTS_BASE_FILE_PATH = "/src/server/webflow/scripts";

export const CUSTOM_SCRIPTS_NAME = {
  // DROPDOWN: "dropdown",
  // DROPDOWN_SHOW_HIDE: "dropdown show hide",
  // DATE_PICKER_SCRIPT: "date picker script",
  // USER_IP_SCRIPT: "user ip script",
  // NUMBER_SLIDER_SCRIPT: "number slider script",
  FORM_FIELDS_PRO_CDN_SCRIPT: "Form Fields Pro CDN Script",
} as const;

type scriptKeys = keyof typeof CUSTOM_SCRIPTS_NAME;
export type customScriptName = (typeof CUSTOM_SCRIPTS_NAME)[scriptKeys];

export const CUSTOM_SCRIPTS_CONFIG: {
  [key in customScriptName]: ScriptConfig;
} = {
  // [CUSTOM_SCRIPTS_NAME.DROPDOWN]: {
  //   displayName: CUSTOM_SCRIPTS_NAME.DROPDOWN,
  //   version: "0.0.58",
  //   location: "footer",
  //   path: `${CUSTOM_SCRIPTS_BASE_FILE_PATH}/minified/dropdown.min.js`,
  // },

  // [CUSTOM_SCRIPTS_NAME.DROPDOWN_SHOW_HIDE]: {
  //   displayName: CUSTOM_SCRIPTS_NAME.DROPDOWN_SHOW_HIDE,
  //   version: "0.0.15",
  //   location: "footer",
  //   path: `${CUSTOM_SCRIPTS_BASE_FILE_PATH}/minified/dropdown-show-hide.min.js`,
  // },

  // [CUSTOM_SCRIPTS_NAME.DATE_PICKER_SCRIPT]: {
  //   displayName: CUSTOM_SCRIPTS_NAME.DATE_PICKER_SCRIPT,
  //   version: "0.0.7",
  //   location: "footer",
  //   path: `${CUSTOM_SCRIPTS_BASE_FILE_PATH}/minified/date-picker.min.js`,
  // },

  // [CUSTOM_SCRIPTS_NAME.USER_IP_SCRIPT]: {
  //   displayName: CUSTOM_SCRIPTS_NAME.USER_IP_SCRIPT,
  //   version: "0.0.0",
  //   location: "footer",
  //   path: `${CUSTOM_SCRIPTS_BASE_FILE_PATH}/minified/user-ip.min.js`,
  // },

  // [CUSTOM_SCRIPTS_NAME.NUMBER_SLIDER_SCRIPT]: {
  //   displayName: CUSTOM_SCRIPTS_NAME.NUMBER_SLIDER_SCRIPT,
  //   version: "0.0.2",
  //   location: "footer",
  //   path: `${CUSTOM_SCRIPTS_BASE_FILE_PATH}/minified/range-slider.min.js`,
  // },
  [CUSTOM_SCRIPTS_NAME.FORM_FIELDS_PRO_CDN_SCRIPT]: {
    displayName: CUSTOM_SCRIPTS_NAME.FORM_FIELDS_PRO_CDN_SCRIPT,
    version: "0.0.23",
    location: "footer",
    hosted: true,
    hostedLocation:
      "https://cdn.jsdelivr.net/gh/rabbykhairul/jsdeliver-cdn-scripts@594dd6e802cae645ebeb8b23a88634b854d872b1/form-fields-pro.js",
    integrityHash:
      "sha384-EvqBdriFrfGvzgvyaGMMGidYisFV0YOV8LoGQfeanOsrZiC2AqUOUGBZs99WdHUx",
  },
};
