export interface ConfigFile {
  formName: string;
  name: string;
  targetFolder: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars -- used only as a type
const answers = ['files', 'location', 'overwrite', 'packages'] as const;

export type AnswersType = (typeof answers)[number];

export interface ConfigPackage {
  formName: string;
  packages: string[];
}

// TODO: Link answers and expected result
export interface ExpectedResult {
  files: ConfigFile[];
  location: string;
  overwrite: boolean;
  packages: ConfigPackage[];
}
