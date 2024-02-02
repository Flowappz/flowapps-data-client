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
  FORM_FIELDS_PRO_CDN_SCRIPT: "Form Fields Pro CDN Script",
  SENTRY_LOG_SCRIPT: "Sentry log script",
} as const;

type scriptKeys = keyof typeof CUSTOM_SCRIPTS_NAME;
export type customScriptName = (typeof CUSTOM_SCRIPTS_NAME)[scriptKeys];

export const CUSTOM_SCRIPTS_CONFIG: {
  [key in customScriptName]: ScriptConfig;
} = {
  [CUSTOM_SCRIPTS_NAME.FORM_FIELDS_PRO_CDN_SCRIPT]: {
    displayName: CUSTOM_SCRIPTS_NAME.FORM_FIELDS_PRO_CDN_SCRIPT,
    version: "4.3.5",
    location: "footer",
    hosted: true,
    hostedLocation:
      "https://cdn.jsdelivr.net/gh/rabbykhairul/jsdeliver-cdn-scripts@v4.3.5/form-fields-cdn.js",
    integrityHash:
      "sha384-NtZV5gcj3B5ha0Kz1YMwJcsU/k5wupk6Cck2KB/FciA1C6lJ9VuMLdFWQDzYAExB",
  },
  [CUSTOM_SCRIPTS_NAME.SENTRY_LOG_SCRIPT]: {
    displayName: CUSTOM_SCRIPTS_NAME.SENTRY_LOG_SCRIPT,
    version: "0.0.1",
    location: "header",
    hosted: true,
    hostedLocation:
      "https://js.sentry-cdn.com/ab100a3836c462cc3042246f6be4f061.min.js",
    integrityHash:
      "sha384-r75M0mExW5rPf3Nk1PUzvkCeJiWDLz7TxiYBQg9EhDRR4sKqtnsdNbOgN4uIkTj3",
  },
};
