const util = require('util');
const exec = util.promisify(require('child_process').exec);

const fs = require('fs');
const path = require('path');

const generateCertificate = async () => {
    const folder = path.resolve(__dirname, '../certificate');

    try {
        await fs.promises.mkdir(folder);
        await exec(`sudo openssl genrsa -out ${folder}/localhost.key 2048`);
        await exec(`sudo openssl req -new -x509 -key ${folder}/localhost.key -out ${folder}/localhost.crt -days 3650 -subj /CN=localhost`);
        await exec(`sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain ${folder}/localhost.crt`);
        console.log('Yeey, certificate generated!');
    } catch (error) {
        if (error.code === 'EEXIST' || error.code === 'ENOTEMPTY') {
            console.log(`Folder already exists, please manually remove ${folder}`);
        }
        console.log(`Error: ${error.code}`);
    }
};

generateCertificate();
