import React from 'react';
import { FileIcon, FolderIcon } from './icons';
import type { FileInfo } from '../types';

interface FileTableProps {
  files: FileInfo[];
  selected: Set<string>;
  onToggle: (id: string) => void;
  onToggleAll: () => void;
}

const FileTable: React.FC<FileTableProps> = ({ files, selected, onToggle, onToggleAll }) => {
  const allSelected = files.length > 0 && selected.size === files.length;

  const formatSize = (size: number | null) => {
    if (!size) return '-';
    const kb = size / 1024;
    if (kb < 1024) return `${kb.toFixed(1)} KB`;
    return `${(kb / 1024).toFixed(1)} MB`;
  };

  return (
    <table className="min-w-full text-sm">
      <thead className="sticky top-0 bg-slate-900/80 backdrop-blur-sm text-slate-300">
        <tr>
          <th className="px-3 py-2"><input type="checkbox" checked={allSelected} onChange={onToggleAll} /></th>
          <th className="px-3 py-2 text-left">File Name</th>
          <th className="px-3 py-2 text-left">New Filename</th>
          <th className="px-3 py-2 text-right">Size</th>
          <th className="px-3 py-2 text-right">Date Modified</th>
        </tr>
      </thead>
      <tbody>
        {files.map((f) => (
          <tr key={f.id} className={selected.has(f.id) ? 'bg-cyan-900/20' : ''}>
            <td className="px-3 py-2 text-center">
              <input type="checkbox" checked={selected.has(f.id)} onChange={() => onToggle(f.id)} />
            </td>
            <td className="px-3 py-2 flex items-center gap-2">
              {f.isDir ? <FolderIcon className="w-4 h-4" /> : <FileIcon className="w-4 h-4" />}
              <span className="truncate" title={f.name}>{f.name}</span>
            </td>
            <td className="px-3 py-2">
              <span className="truncate" title={f.newName}>{f.newName}</span>
            </td>
            <td className="px-3 py-2 text-right">{formatSize(f.size)}</td>
            <td className="px-3 py-2 text-right">{f.dateModified ?? '-'}</td>
          </tr>
        ))}
        {files.length === 0 && (
          <tr>
            <td colSpan={5} className="p-6 text-center text-slate-500">
              <div className="flex flex-col items-center gap-3">
                <FolderIcon className="w-6 h-6 text-slate-500" />
                <p>No files loaded. Use the import button above.</p>
              </div>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default FileTable;
