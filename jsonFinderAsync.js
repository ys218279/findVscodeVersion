const fs = require('fs').promises;
const path = require('path');

async function findDirectories(dir) {
    try {
        const files = await fs.readdir(dir);
        const directories = [];

        for (const file of files) {
            const filePath = path.join(dir, file);
            const fileStat = await fs.stat(filePath);

            if (fileStat.isDirectory()) {
                directories.push(filePath);
            }
        }

        console.log(directories);
        return directories;
    } catch (error) {
        console.error('Error finding directories:', error);
        return [];
    }
}

async function findJSON(dirs, fileName) {
    try {
        const jsonFiles = [];

        for (const dir of dirs) {
            const files = await fs.readdir(dir);

            for (const file of files) {
                const filePath = path.join(dir, file);
                if (filePath.endsWith(fileName)) {
                    jsonFiles.push(filePath);
                }
            }
        }
        return jsonFiles;
    } catch (error) {
        console.error('Error finding package.json files:', error);
        return [];
    }
}

async function findVscodeVersion(files) {
    try {
        const vscodeVersions = [];

        for (const file of files) {
            const content = await fs.readFile(file);
            const json = JSON.parse(content);

            if (json && json.engines && json.engines.vscode) {
                vscodeVersions.push(file + "  :  " + "vscode version = " + json.engines.vscode);
            }
        }
        return vscodeVersions; 
    } catch (error) {
        console.error('Error finding vscode versions', error);
        return []
    }
}

(async() =>{
    try {
        const directories = await findDirectories('/Users/yousen01/ksc-ide/plugins');
        const jsonFiles = await findJSON(directories, 'package.json');
        const vscodeVersions = await findVscodeVersion(jsonFiles)

        console.log(vscodeVersions);
    } catch (error){
        console.log("failed to run script", error);
    }
})();