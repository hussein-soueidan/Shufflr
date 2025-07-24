declare module '@tauri-apps/api/dialog' {
  export function open(options?: any): Promise<string | string[] | null>;
  export function confirm(message: string, options?: any): Promise<boolean>;
}

declare module '@tauri-apps/api/fs' {
  export interface ReadDirOptions {
    recursive?: boolean;
  }
  export interface FileEntry {
    name: string | null;
    path: string;
    children?: FileEntry[];
  }
  export function readDir(path: string, options?: ReadDirOptions): Promise<FileEntry[]>;
  export function readTextFile(path: string): Promise<string>;
}
