export type ScriptConfig = {
  displayName: string;
  version: string;
  path: string;
  location: "header" | "footer";
  hosted?: boolean;
  hostedLocation?: string;
  integrityHash?: string;
};

export const CUSTOM_SCRIPTS_BASE_FILE_PATH = "/src/server/webflow/scripts";

export const CUSTOM_SCRIPTS_NAME = {
  TEST: "test script",
  DROPDOWN: "dropdown",
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
};
