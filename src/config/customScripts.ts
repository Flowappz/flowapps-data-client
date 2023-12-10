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
  SENTRY_LOG_SCRIPT: "Sentry log script",
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
    version: "3.0.0",
    location: "footer",
    hosted: true,
    hostedLocation:
      "https://cdn.jsdelivr.net/gh/rabbykhairul/jsdeliver-cdn-scripts@v3.0.0/form-fields-cdn.js",
    integrityHash:
      "sha384-Wb44ivIFPrmPL4QCPlyhU2gssYyJH2Ly6q/DbU6LVRWbaGFjGt66SzyDsMT/BY1v",
  },
  [CUSTOM_SCRIPTS_NAME.SENTRY_LOG_SCRIPT]: {
    displayName: CUSTOM_SCRIPTS_NAME.SENTRY_LOG_SCRIPT,
    version: "0.0.1",
    location: "header",
    hosted: true,
    hostedLocation:
      "https://js.sentry-cdn.com/ab100a3836c462cc3042246f6be4f061.min.js",
    integrityHash:
      "sha384-yek0tAD12Z/46f68rKnaWU9okMlIg2MPq/nTLGJ/VwSxYlP1+hw04QmbfBkknyO6",
  },
};
