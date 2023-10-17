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
  TEST: "test script",
  DROPDOWN: "dropdown",
  DATE_PICKER_LIBRARY: "date picker library",
  DATE_PICKER_SCRIPT: "date picker script",
} as const;

type scriptKeys = keyof typeof CUSTOM_SCRIPTS_NAME;
export type customScriptName = (typeof CUSTOM_SCRIPTS_NAME)[scriptKeys];

export const CUSTOM_SCRIPTS_CONFIG: {
  [key in customScriptName]: ScriptConfig;
} = {
  [CUSTOM_SCRIPTS_NAME.TEST]: {
    version: "0.0.1",
    path: `${CUSTOM_SCRIPTS_BASE_FILE_PATH}/test.js`,
    displayName: CUSTOM_SCRIPTS_NAME.TEST,
    location: "footer",
  },

  [CUSTOM_SCRIPTS_NAME.DROPDOWN]: {
    displayName: CUSTOM_SCRIPTS_NAME.DROPDOWN,
    version: "0.0.54",
    location: "footer",
    path: `${CUSTOM_SCRIPTS_BASE_FILE_PATH}/minified/dropdown.min.js`,
  },

  [CUSTOM_SCRIPTS_NAME.DATE_PICKER_LIBRARY]: {
    displayName: CUSTOM_SCRIPTS_NAME.DATE_PICKER_LIBRARY,
    version: "0.0.2",
    location: "footer",
    hosted: true,
    hostedLocation:
      "https://cdn.jsdelivr.net/npm/@easepick/bundle@1.2.1/dist/index.umd.min.js",
    integrityHash:
      "sha384-oKYezrjoEX7xfz/eWS+gHGOP2nKLIhFfYGP9FSeKwNIdHv/zQ+slB1d3YbDYoLvu",
  },

  [CUSTOM_SCRIPTS_NAME.DATE_PICKER_SCRIPT]: {
    displayName: CUSTOM_SCRIPTS_NAME.DATE_PICKER_SCRIPT,
    version: "0.0.1",
    location: "footer",
    path: `${CUSTOM_SCRIPTS_BASE_FILE_PATH}/minified/date-picker.min.js`,
  },
};
