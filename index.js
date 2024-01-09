const { PDFDocument } = require('pdf-lib');
const fs = require('fs').promises;
const path = require('path');
const readline = require('readline');

const inputFolderPath = './input';
const outputFolderPath = './output';

async function addPasswordToPDF (inputPdfPath, outputPdfPath, password) {
    // Read the existing PDF file
    const existingPdfBytes = await fs.readFile(inputPdfPath);

    // Load the existing PDF
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    // Add password protection
    pdfDoc.setPassword(password);

    // Save the modified PDF with password protection
    const modifiedPdfBytes = await pdfDoc.save();

    // Write the modified PDF to a new file
    await fs.writeFile(outputPdfPath, modifiedPdfBytes);

    console.log(`Password protection added to ${outputPdfPath}`);
}

async function getPasswordFromUser () {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise(resolve => {
        rl.question('Please enter the password: ', password => {
            rl.close();
            resolve(password);
        });
    });
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

                await addPasswordToPDF(inputFilePath, outputFilePath, password);
            }
        }
    } catch (error) {
        console.error('Error processing folder:', error);
    }
}

// Call the function to process the folder
processFolder();
