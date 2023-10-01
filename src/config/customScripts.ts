export type ScriptConfig = {
  displayName: string;
  version: string;
  path: string;
};

export const CUSTOM_SCRIPTS_BASE_FILE_PATH = "/src/server/webflow/scripts";

export const CUSTOM_SCRIPTS_NAME = {
  TEST: "test script",
} as const;

type scriptKeys = keyof typeof CUSTOM_SCRIPTS_NAME;
type scriptValues = (typeof CUSTOM_SCRIPTS_NAME)[scriptKeys];

export const CUSTOM_SCRIPTS_CONFIG: {
  [key in scriptValues]: ScriptConfig;
} = {
  [CUSTOM_SCRIPTS_NAME.TEST]: {
    version: "0.0.1",
    path: `${CUSTOM_SCRIPTS_BASE_FILE_PATH}/test.js`,
    displayName: CUSTOM_SCRIPTS_NAME.TEST,
  },
};
