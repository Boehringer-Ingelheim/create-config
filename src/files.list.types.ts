export interface ConfigFile {
  formName: string;
  name: string;
  targetFolder: string;
}

const answers = ["files", "location", "overwrite", "packages"];

export type AnswersType = (typeof answers)[number];

// TODO: Link answers and expected result
export interface ExpectedResult {
  overwrite: boolean;
  files: ConfigFile[];
  location: string;
  packages: ConfigPackage[];
}

export interface ConfigPackage {
  formName: string;
  packages: string[];
}
