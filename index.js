const Recipe = require('muhammara').Recipe;
const fs = require('fs').promises;
const path = require('path');
const readline = require('readline');
require('dotenv').config();

const inputFolderPath = './input';
const outputFolderPath = './output';

// Read .env setting
const commonPassword = process.env.COMMON_PASSWORD;
const fileNameTemplate = process.env.FILE_NAME_TEMPLATE;

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

    consoleMessage('highlight', `Password protection added to ${outputPdfPath}`);
}

async function getPasswordFromUser () {
    return new Promise((resolve, reject) => {
        if (commonPassword && commonPassword.trim() !== '') {
            console.log('Using common password from .env file.');
            resolve(commonPassword.trim());
        } else {
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout,
            });
            rl.question('Please enter the password: ', password => {
                rl.close();
                if (password.trim() !== '') {
                    resolve(password.trim());
                } else {
                    console.log('\x1b[31m', 'Error: No password entered.', '\x1b[0m');
                    reject();
                }
            });
        }
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

function getFileName(tmpText) {
    const d = new Date();
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDate();

    // Calculate previous year, month, and day
    const previousYear = month === 1 ? year - 1 : year;
    const previousMonth = month === 1 ? 12 : month - 1;
    const previousDay = new Date(year, month - 1, 0).getDate(); // Last day of the previous month

    // Calculate previous year and month in YYYYMM format
    const previousYearMonth = `${previousYear}${previousMonth < 10 ? '0' + previousMonth : previousMonth}`;

    // Replace placeholders with calculated values
    const result = tmpText
        .replace(/\{\{yyyy\}\}/g, year)
        .replace(/\{\{yyyymm\}\}/g, `${year}${month < 10 ? '0' + month : month}`)
        .replace(/\{\{yyyymmdd\}\}/g, `${year}${month < 10 ? '0' + month : month}${day < 10 ? '0' + day : day}`)
        .replace(/\{\{yyyy-1\}\}/g, previousYear)
        .replace(/\{\{yyyymm-1\}\}/g, previousYearMonth);

    return result;
}

async function processFolder () {
    try {
        // Read all files in the input folder
        const files = await fs.readdir(inputFolderPath);

        // Process each PDF file in the folder
        for (const file of files) {
            const inputFilePath = path.join(inputFolderPath, file);

            const outputFileName = (fileNameTemplate && fileNameTemplate.trim() !== '') ? getFileName(fileNameTemplate) : file;
            const outputFilePath = path.join(outputFolderPath, outputFileName);

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

// show console message with color
function consoleMessage(type, message) {
    switch (type) {
      case 'error':
        console.error('\x1b[31m', message, '\x1b[0m');
        break;
      case 'warn':
        console.warn('\x1b[33m', message, '\x1b[0m');
        break;
      case 'highlight':
        console.log('\x1b[36m', message, '\x1b[0m');
        break;
      default:
        console.log(message);
    }
  }

// Call the function to process the folder
processFolder();
