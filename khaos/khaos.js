const fs = require('fs');

let basepath = 'src/components/';
const moment = require('moment');

const cptName = process.argv.splice(2)[0];
const path = cptName.split('/');
const name = path[path.length - 1];
const writes = [`${name}.js`, `${name}.html`, `${name}.less`, 'index.js'];
const reads = [`${basepath}cptTemp/index.js`, `${basepath}cptTemp/cptTemp.js`];
const file = [];
const author = require('os').homedir().split('\\').pop();


// 检测是否存在文件夹
const exists = function () {
  return new Promise((res, rej) => {
    (async function () {
      for (const a of path) {
        fs.existsSync(basepath + a) ? basepath = `${basepath}${a}/` : await mkdir(a);
      }
      res(basepath);
    }());
  });
};
// 建立文件夹
let mkdir = function (a) {
  return new Promise((res, rej) => {
    fs.mkdir(basepath + a, (err) => {
      if (err) rej(err);
      basepath = `${basepath}${a}/`;
      res(basepath);
    });
  });
};
// 读取模板文件内容，并替换为目标组件
const readFile = function () {
  return new Promise((res) => {
    for (const a of reads) {
      let text = fs.readFileSync(a).toString();
      text = text.replace(/time/g, moment().format('YYYY/MM/DD'))
        .replace(/temp/g, name)
        .replace(/author/g, author);
      file.push(text);
    }
    res(file);
  });
};
// 生成文件，并填入之前读取的文件内容
const writeFile = function (file) {
  return new Promise((res, rej) => {
    (async function () {
      for (const a of writes) {
        await fs.writeFile(`${basepath}${a}`,
          a == writes[3] ? file[0] : a == writes[0] ? file[1] : '', (err) => {
            if (err) rej(err);
          });
      }
      res('succ');
    }());
  });
};
async function creatCpt() {
  try {
    await exists();
    await readFile();
    await writeFile(await readFile());
    return console.log(`Successfully created ${name} component`);
  } catch (err) {
    console.error(err);
  }
}
creatCpt();
