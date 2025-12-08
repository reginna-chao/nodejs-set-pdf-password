# PDF Encryption Script

This script is designed to add password protection to PDF files in a specified input folder using the [muhammara](https://github.com/julianhille/Muhammarajs) library for PDF manipulation. It prompts the user to enter a password for each PDF file and saves the encrypted versions in an output folder.

## Prerequisites

- Node.js: Make sure you have Node.js and Yarn installed on your machine. You can download it from [https://nodejs.org/](https://nodejs.org/) and [https://yarnpkg.com/](https://yarnpkg.com/).

## Installation

``` bash
yarn install
```

## Usage

1. Put the PDF file in `input` folder.

2. (Optionally) Create the `.env` file and modify the settings for "COMMON_PASSWORD" and "FILE_NAME_TEMPLATE". If not needed, please comment out or remove the line.

3. To start the script:

  - For Windows, double-click on `start.bat`.
  - For Linux and MacOS, run `start.sh`.

  Alternatively, you can run the script using one of the following commands in your terminal:

``` bash
yarn start
```

or

``` bash
node index.js
```

4. The script will prompt you to enter a password for each PDF file in the input folder. Enter the password when prompted.

5. The encrypted PDF files will be saved in the output folder with the same filenames.

---

## Docker Usage

You can also run this application using Docker, which eliminates the need to install Node.js and dependencies on your local machine.

### Building the Docker Image

Build the Docker image with the following command:

``` bash
docker build -t nodejs-set-pdf-password .
```

### Running with Docker

**Basic usage (interactive mode):**

``` bash
docker run -it --rm \
  -v $(pwd)/input:/app/input \
  -v $(pwd)/output:/app/output \
  nodejs-set-pdf-password
```

**With environment file (non-interactive mode):**

If you have a `.env` file with `COMMON_PASSWORD` set, you can run the container without manual password input:

``` bash
docker run -it --rm \
  -v $(pwd)/input:/app/input \
  -v $(pwd)/output:/app/output \
  -v $(pwd)/.env:/app/.env \
  nodejs-set-pdf-password
```

**For Windows PowerShell:**

``` powershell
docker run -it --rm `
  -v ${PWD}/input:/app/input `
  -v ${PWD}/output:/app/output `
  -v ${PWD}/.env:/app/.env `
  nodejs-set-pdf-password
```

**For Windows CMD:**

``` cmd
docker run -it --rm ^
  -v %cd%/input:/app/input ^
  -v %cd%/output:/app/output ^
  -v %cd%/.env:/app/.env ^
  nodejs-set-pdf-password
```

### Docker Command Explanation

- `-it`: Enables interactive mode (required for password input)
- `--rm`: Automatically removes the container after it exits
- `-v $(pwd)/input:/app/input`: Mounts your local `input` folder to the container
- `-v $(pwd)/output:/app/output`: Mounts your local `output` folder to the container
- `-v $(pwd)/.env:/app/.env`: Mounts your `.env` file for configuration

---

## Important Note

1. Ensure that you handle passwords securely and do not share them in an insecure manner.
2. The script uses the [muhammara](https://www.npmjs.com/package/muhammara) library for PDF manipulation. Check the library documentation for any updates or changes.

## Known Issues

1. If you open the encrypted PDF file and then rerun the script, the file cannot be deleted, and an error occurs.

## License
This script is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Feel free to customize this README according to your specific requirements and provide additional information as needed. If your script evolves or has more complex features, you may need to update the README accordingly.
