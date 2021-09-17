const fs = require('fs');

const slash = '\\';
const endLine = require('os').EOL;

const $ = require('jquery');

function preprocessor(pages, blocks) {

  let sourceTemplates = readSourceTemplates(pages);
  cleanHeaders(sourceTemplates);

  let bemEntities = getBemEntities(blocks);

  let useBemEntities = getUseBemEntities(sourceTemplates, bemEntities);

  let pugHeaders = createPugHeaders(useBemEntities);
  let scssHeaders = createScssHeaders(useBemEntities);
  let jsHeaders = createJsHeaders(useBemEntities);

  prependPugHeaders(sourceTemplates, pugHeaders);
  writeSourceTemplates(pages, sourceTemplates);

  rewriteScss(pages, scssHeaders);
  rewriteJs(pages, jsHeaders);

}

function rewriteScss(pages, scssHeaders) {
  fs.writeFileSync(pages + slash + 'style.scss', scssHeaders);
}

function rewriteJs(pages, jsHeaders) {
  fs.writeFileSync(pages + slash + 'script.js', jsHeaders);
}

function writeSourceTemplates(pages, sourceTemplates) {
  for (let template in sourceTemplates) {
    fs.writeFileSync(pages + slash + template, sourceTemplates[template]);
  }
}

function prependPugHeaders(sourceTemplates, pugHeaders) {
  for (let template in sourceTemplates) {
    sourceTemplates[template] = pugHeaders + sourceTemplates[template];
  }
}

function createPugHeaders(useBemEntities) {
  let pugHeaders = '';

  for (let entity in useBemEntities) {
    if (fs.existsSync(useBemEntities[entity] + slash + entity + '.pug')) {
      pugHeaders += useBemEntities[entity].replace(/^.*blocks/i, 'include ../blocks').replace(/\\/g, '/')
        + '/' + entity + endLine;
    }
  }

  return pugHeaders;
}

function createScssHeaders(useBemEntities) {
  let scssHeaders = '';

  for (let entity in useBemEntities) {
    if (fs.existsSync(useBemEntities[entity] + slash + '_' + entity + '.scss')) {
      scssHeaders += useBemEntities[entity].replace(/^.*blocks/i, "@use 'blocks").replace(/\\/g, '/')
        + '/' + entity + "';" + endLine;
    }
  }

  return scssHeaders;
}

function createJsHeaders(useBemEntities) {
  let jsHeaders = '';

  for (let entity in useBemEntities) {
    if (fs.existsSync(useBemEntities[entity] + slash + entity + '.js')) {
      jsHeaders += useBemEntities[entity].replace(/^.*blocks/i, "import '../blocks").replace(/\\/g, '/')
        + '/' + entity + ".js';" + endLine;
    }
  }

  return jsHeaders;
}

function getUseBemEntities(sourceTemplates, bemEntities) {
  let useBemEntities = {};

  for(let template in sourceTemplates) {
    if (searchBemEntities(template, bemEntities, useBemEntities)) {
      return useBemEntities;
    }
  }

  return useBemEntities;
}

// Функция ищет в тексте шаблона template имена БЭМ-сущностей из объекта bemEntities.
// Найденные БЭМ-сущности сохраняются в объекте useBemEntities, из bemEntities удаляются.
// Если bemEntities пуст, поиск закончен, функция возвращает true, иначе false.
// Если у БЭМ-сущности есть шаблон .pug, для него вызывается эта же функция.
function searchBemEntities(template, bemEntities, useBemEntities) {

  let words = template.match(/[a-z]([a-z0-9-_]*[a-z0-9])?/gi) || [];
  // получить массив слов, которые могут быть именами БЭМ-сущностей

  let setWords = new Set(words); // убрать повторы из массива слов

  setWords.forEach((entity) => { // для каждого слова в массиве
    if (bemEntities[entity]) { // если слово является именем БЭМ-сущности

      useBemEntities[entity] = bemEntities[entity]; // вставить в объект "используемые БЭМ-сущности"
      delete bemEntities[entity];                   // вырезать БЭМ-сущность из объекта "все БЭМ-сущности"

      if ($.isEmptyObject(bemEntities)) {
        return true;
      } else {
        let entityFilePath = useBemEntities[entity] + slash + entity + '.pug'; // получить путь к файлу шаблона
        if (fs.existsSync(entityFilePath)) { //если файл шаблона существует
          if (searchBemEntities(fs.readFileSync(entityFilePath,'utf-8'), bemEntities, useBemEntities)) {
            return true;
          }
        }
      }
    }
  });

  return false;
}

function readSourceTemplates(pages) {
  let sourceTemplates = {};

  fs.readdirSync(pages).forEach(page => {
    if (page.match(/\.pug$/i)) {
      sourceTemplates[page] = fs.readFileSync(pages + slash + page,'utf-8');
    }
  });

  return sourceTemplates;
}

function cleanHeaders(sourceTemplates) {
  for (let template in sourceTemplates) {
    sourceTemplates[template] = sourceTemplates[template].replace(/include.*\r\n/gi, '');
  }
}


function getBemEntities(blocks) {
  let bemEntities = {};

  fs.readdirSync(blocks).forEach(block => {
    let blockPath = blocks + slash + block;
    if (fs.lstatSync(blockPath).isDirectory()) {
      bemEntities[block] = blockPath;
      fs.readdirSync(blockPath).forEach(element => {
        let elementPath = blockPath + slash + element;
        if (fs.lstatSync(elementPath).isDirectory()) {
          if (readModifiersNameValue(elementPath, bemEntities) === false) {
            bemEntities[block + element] = elementPath;
            fs.readdirSync(elementPath).forEach(modifier => {
              let modifierPath = elementPath + slash + modifier;
              if (fs.lstatSync(modifierPath).isDirectory()) {
                if (readModifiersNameValue(modifierPath, bemEntities) === false) {
                  bemEntities[block + element + modifier] = modifierPath;
                }
              }
            })
          }
        }
      })
    }
  });

  return bemEntities;
}

// Функция считывает в указанный объект bemEntities из указанной папки dir полные имена модификаторов,
// которые соответствуют формату ключ-значение. ТОЛЬКО формату ключ-значение.
// На наличие имён проверяются только названия файлов, содержимое файлов не проверяется,
// вложенные папки не проверяются (их быть и не должно).
// Если в папке нет таких модификаторов, функция возвращает false; если есть — true.
// В bemEntities полное имя модификатора — это имя свойства;
// папка, в которой лежат файлы модификатора — значение свойства.
// Для данной функции значение всегда равно dir.
function readModifiersNameValue(dir, bemEntities) {
  if (dir.match(/[^_]_[a-z0-9-]+$/) === null) return false;
  let found = [];
  fs.readdirSync(dir).forEach(modifier => {
    modifier = modifier.match(/([a-z0-9-]+__[a-z0-9-]+_[a-z0-9-]+_[a-z0-9-]+)|([a-z0-9-]+_[a-z0-9-]+_[a-z0-9-]+)/);
    if (modifier) {
      modifier = modifier[0];
      if (found.includes(modifier) === false) {
        bemEntities[modifier] = dir;
        found.push(modifier);
      }
    }
  });
  return !!(found.length);
}


export { preprocessor };
