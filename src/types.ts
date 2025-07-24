export interface FileInfo {
  id: string;
  name: string;
  newName: string;
  path: string;
  isDir: boolean;
  extension: string;
  size: number | null;
  dateModified: string | null;
}

export type ActiveModal =
  | null
  | 'import'
  | 'help'
  | 'searchCollect'
  | 'multiReplace';
