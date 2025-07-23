import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_API_KEY;

let ai: GoogleGenAI | null = null;

if (apiKey) {
    ai = new GoogleGenAI({ apiKey });
} else {
    console.warn("VITE_API_KEY for Gemini not found. AI features will be disabled.");
}

const DOCUMENTATION = `
# Shufflr Help & Documentation

Welcome to Shufflr, an advanced file management and batch renaming tool for your desktop.

## 1. Getting Started: Importing Files

### Importing a Folder
- Click the **"Import Folder"** button in the header. This opens the Import Options modal.
- **Include Subdirectories**: Choose whether to scan folders inside the main folder you select.
- **Import Behavior**: If you already have files loaded, you can either **Append** the new files to your current list or **Replace** the list entirely.
- After choosing your options, click **"Proceed & Import"** and select a folder from your computer.

### Importing a Mapping File
- A mapping file helps you perform complex, one-to-one renames automatically. It must be a \`.csv\` or \`.txt\` file.
- Click **"Import Mapping"** in the header and select your file.
- The file should have two columns: the first column is the text to **find** in the original filename, and the second is the text to **replace** it with.
- A header row is expected and will be ignored (e.g., "Original Name,New Name").

## 2. The File Table
- **Selecting Files**: Click the checkbox next to a file to select it. You can select all files by clicking the checkbox in the table header.
- **Invert Selection**: Click the "Invert Selection" button to deselect all currently selected files and select all unselected files.
- **Sorting**: Click on any column header with arrows (like "File Name", "Size", etc.) to sort the table by that column. Click again to reverse the sort order.

## 3. Main Actions Toolbar
This toolbar appears once you've loaded files. Most actions require you to select one or more files first.

- **Search & Collect**: Find files by name. You can paste a list of keywords or import them from a file. This tool searches filenames *without* their extensions.
- **Copy / Cut**: These are dropdown menus.
    - **Save as .zip**: Bundles the selected files into a \`.zip\` archive and saves it. "Cut" also removes the files from the list.
    - **Copy/Move Files...**: Directly copies or moves files to another folder on your computer. Can also generate a script as a fallback.
- **Remove from List**: Removes the selected files from the table. This does **not** delete the files from your computer.
- **Delete Permanently**: **Permanently deletes** the selected files from your computer's disk. This action is irreversible.
- **Rename Selected**: Activates the Renaming Panel for all currently selected files.

## 4. The Renaming Panel
This panel appears when you click "Rename Selected". All operations here apply only to the selected files and modify the "New Filename" column. The original filenames are not changed until you click "Commit".

- **Remove Text**: Deletes every occurrence of the specified text from the filenames.
- **Batch Find & Replace**: Opens a powerful modal where you can define multiple find-and-replace pairs.
- **Split by Delimiter**: Temporarily splits filenames by a character (e.g., \`_\` or \`-\`) and shows the parts in new columns. This is for viewing and analysis only.
- **Extract Substring**: Extracts a piece of text from the **original filename**. After clicking "Apply Extract", you can either **Apply to "New Filename"** or **Create New Column**.
- **Restore Original Extension**: Re-applies the file's original extension to the new filename.
- **Automated Mapping**: Applies the renames defined in the mapping file you imported.
- **Undo/Redo**: Step backward or forward through your recent renaming operations.
- **Cancel**: Exits renaming mode and reverts all changes.
- **Commit All Renames**: **Saves the changes** from the "New Filename" column to your actual files on disk.

## 5. Exporting
- **Export Mapping Template**: Saves a sample \`.csv\` file.
- **Export All / Selected Files**: Saves a \`.csv\` file containing the details of the files in the table.
`;

export const getDocumentation = () => DOCUMENTATION;

export const searchDocumentation = async (query: string): Promise<string> => {
    if (!ai) {
        return "Gemini AI client is not initialized. Please ensure your VITE_API_KEY is set correctly in a `.env` file.";
    }
    if (!query.trim()) {
        return "";
    }

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Based on the following documentation for the "Shufflr" app, answer the user's question: "${query}". Respond in clear, concise markdown format.\n\nDocumentation:\n${DOCUMENTATION}`,
        });
        return response.text;
    } catch (error) {
        console.error("Error searching documentation with Gemini:", error);
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
        return `Sorry, there was an error processing your request. Please try again. \n\n**Details:** ${errorMessage}`;
    }
};
