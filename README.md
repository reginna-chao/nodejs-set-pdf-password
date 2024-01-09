# PDF Encryption Script

This script is designed to add password protection to PDF files in a specified input folder using the [muhammara](https://github.com/julianhille/Muhammarajs) library for PDF manipulation. It prompts the user to enter a password for each PDF file and saves the encrypted versions in an output folder.

## Prerequisites

- Node.js: Make sure you have Node.js installed on your machine. You can download it from [https://nodejs.org/](https://nodejs.org/).

## Installation

``` bash
npm install
```

## Usage

1. Put the PDF file in `input` folder.

2. Run the script using the following command:

``` bash
npm run start
```

or

``` bash
node index.js
```

3. The script will prompt you to enter a password for each PDF file in the input folder. Enter the password when prompted.

4. The encrypted PDF files will be saved in the output folder with the same filenames.

## Important Note

1. Ensure that you handle passwords securely and do not share them in an insecure manner.
2. The script uses the [muhammara](https://www.npmjs.com/package/muhammara) library for PDF manipulation. Check the library documentation for any updates or changes.

## Known Issues

1. If you open the encrypted PDF file and then rerun the script, the file cannot be deleted, and an error occurs.

## License
This script is licensed under the MIT License - see the LICENSE.md file for details.

Feel free to customize this README according to your specific requirements and provide additional information as needed. If your script evolves or has more complex features, you may need to update the README accordingly.
