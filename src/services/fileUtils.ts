import { readDir } from '@tauri-apps/api/fs';
import type { FileInfo } from '../types';

/**
 * Recursively scans a directory using Tauri's fs.readDir API.
 * Note: Tauri's JavaScript API does not currently return file
 * metadata like size or modified dates, so placeholder values
 * are used for those fields.
 */
export async function scanDirectory(path: string, recursive = true): Promise<FileInfo[]> {
  const entries = await readDir(path, { recursive });

  const flatten = (items: any[]): FileInfo[] => {
    return items.flatMap((item) => {
      const file: FileInfo = {
        id: item.path,
        name: item.name || '',
        path: item.path,
        isDir: item.children !== undefined,
        extension: item.name ? item.name.split('.').pop() ?? '' : '',
        size: null, // Placeholder until Tauri exposes metadata
        dateModified: null, // Placeholder for same reason
        newName: item.name || '',
      };
      return item.children ? [file, ...flatten(item.children)] : [file];
    });
  };

  return flatten(entries);
}
