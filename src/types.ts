export interface FileInfo {
  path: string;
  name: string;
  extension: string;
  newName: string;
  size?: number;
  modified?: string;
  isDir: boolean;
}
