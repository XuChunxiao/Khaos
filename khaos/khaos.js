const fs = require('fs');
const copydir = require('copy-dir');
const rimraf = require('rimraf');

copydir.sync('./template', './temp');

const ModuleName = process.argv[2];
const PageName = process.argv[3];
const stateName = process.argv[4];


function geFileList(path) {
  const filesList = [];
  readFile(path, filesList);
  return filesList;
}

function readFile(path, filesList) {
  const files = fs.readdirSync(path);
  files.forEach(walk);
  function walk(file) {
    states = fs.statSync(`${path}/${file}`);
    if (states.isDirectory()) {
      const newpath = `${path}/${file.replace('ModuleName', ModuleName).replace('PageName', PageName)}`;
      fs.renameSync(`${path}/${file}`, newpath, (err) => {
        if (err) console.log(`ERROR: ${err}`);
      });
      readFile(newpath, filesList);
    } else {
      const obj = new Object();
      obj.size = states.size;
      obj.name = file;
      const newPath = `${path}/${file.replace('ModuleName', ModuleName).replace('PageName', PageName)}`;
      obj.path = newPath;

      fs.renameSync(`${path}/${file}`, newPath, (err) => {
        if (err) console.log(`ERROR: ${err}`);
      });
      fs.readFile(newPath, 'utf8', (err, data) => {
        if (err) {
          return console.log(err);
        }
        const result = data.replace(/ModuleName/g, ModuleName).replace(/PageName/g, PageName).replace(/stateName/g, stateName);

        fs.writeFile(newPath, result, 'utf8', (err1) => {
          if (err1) return console.log(err);
        });
      });
      filesList.push(obj);
    }
  }
}

geFileList('./temp');

setTimeout(() => {
  copydir.sync(`./temp/${ModuleName}`, `../src/pages/${ModuleName}`);
  rimraf('./temp', () => {});
  console.log(`Khaos create module ${ModuleName} successfully`);
}, 3000);
