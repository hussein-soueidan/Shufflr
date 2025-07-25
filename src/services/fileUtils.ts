import { DirEntry, readDir } from '@tauri-apps/api/fs';
import { FileInfo } from '../types';

/**
 * Scan a directory and return an array of FileInfo objects.
 * Note: Tauri's readDir API does not expose file size or modification
 * time for entries, so those fields will be undefined.
 */
export async function scanDirectory(path: string, recursive = false): Promise<FileInfo[]> {
  const entries = await readDir(path, { recursive });
  const results: FileInfo[] = [];

  const mapEntry = (entry: DirEntry, isDir: boolean): FileInfo => ({
    path: entry.path,
    name: entry.name ?? '',
    extension: isDir ? '' : (entry.name?.split('.').pop() || ''),
    newName: entry.name ?? '',
    size: entry.metadata?.size, // often undefined
    modified: entry.metadata?.modified?.toString(),
    isDir,
  });

  const visit = (list: DirEntry[]) => {
    for (const entry of list) {
      if (entry.children) {
        if (recursive) visit(entry.children);
        results.push(mapEntry(entry, true));
      } else {
        results.push(mapEntry(entry, false));
      }
    }
  };

  visit(entries);
  return results;
}
