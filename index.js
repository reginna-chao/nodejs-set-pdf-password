const Recipe = require('muhammara').Recipe;
const fs = require('fs').promises;
const path = require('path');
const readline = require('readline');

const inputFolderPath = './input';
const outputFolderPath = './output';

async function addPasswordToPDF (inputPdfPath, outputPdfPath, password) {
    // Read & Load the existing PDF file
    const pdfDoc = new Recipe(inputPdfPath, outputPdfPath);

    pdfDoc
        // Set password protection
        .encrypt({
            userPassword: password,
            ownerPassword: password,
            // userProtectionFlag: 4
        })
        // Write the modified PDF to a new file
        .endPDF();

    console.log(`Password protection added to ${outputPdfPath}`);
}

async function getPasswordFromUser () {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise((resolve, reject) => {
        rl.question('Please enter the password: ', password => {
            rl.close();
            if (password.trim() !== '') {
                resolve(password.trim());
            } else {
                console.log('\x1b[31m', 'Error: No password entered.', '\x1b[0m');
                reject();
            }
        });
    });
}

async function fileExists(filePath) {
    try {
        await fs.access(filePath, fs.constants.F_OK);
        return true; // File exists
    } catch (error) {
        return false; // File does not exist
    }
}

async function removeFile(filePath) {
    if (await fileExists(filePath)) {
        try {
            await fs.unlink(filePath);
            console.log(`File removed: ${filePath}`);
        } catch (error) {
            console.error(`Error removing file ${filePath}:`, error);
        }
    } else {
        console.log(`File does not exist: ${filePath}`);
    }
}

async function processFolder () {
    try {
        // Read all files in the input folder
        const files = await fs.readdir(inputFolderPath);

        // Process each PDF file in the folder
        for (const file of files) {
            const inputFilePath = path.join(inputFolderPath, file);
            const outputFilePath = path.join(outputFolderPath, file);

            // Check if the file is a PDF
            if (path.extname(file).toLowerCase() === '.pdf') {
                // Get the password from the user input
                const password = await getPasswordFromUser();

                // Remove old file
                await removeFile(outputFilePath);

                await addPasswordToPDF(inputFilePath, outputFilePath, password);
            }
        }
    } catch (error) {
        console.error('Error processing folder:', error);
    }
}

// Call the function to process the folder
processFolder();
