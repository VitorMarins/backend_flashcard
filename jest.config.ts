import { createDefaultPreset } from "ts-jest";

const preset = createDefaultPreset({
  useESM: true,
});

/** @type {import("jest").Config} */
export default {
  testEnvironment: "node",
  extensionsToTreatAsEsm: [".ts"],
  setupFilesAfterEnv: ["<rootDir>/test/setup.ts"],
  transform: {
    ...preset.transform,
  },
};
