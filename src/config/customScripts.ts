export const CUSTOM_SCRIPTS_BASE_FILE_PATH = "/src/server/webflow/scripts";

export const CUSTOM_SCRIPTS_NAME = {
  TEST: "test script",
};

export const CUSTOM_SCRIPTS_CONFIG = {
  [CUSTOM_SCRIPTS_NAME.TEST]: {
    version: "0.0.1",
    path: `${CUSTOM_SCRIPTS_BASE_FILE_PATH}/test.js`,
  },
};
