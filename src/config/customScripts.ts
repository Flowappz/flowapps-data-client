export type ScriptConfig = {
  displayName: string;
  version: string;
  path: string;
  location: "header" | "footer";
};

export const CUSTOM_SCRIPTS_BASE_FILE_PATH = "/src/server/webflow/scripts";

export const CUSTOM_SCRIPTS_NAME = {
  TEST: "test script",
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
};
