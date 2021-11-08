const fs = require('fs');

const slash = '\\';
const endLine = require('os').EOL;

// Подключение jquery для вызова функции $.isEmptyObject()
const { JSDOM } = require( "jsdom" );
const { window } = new JSDOM( "" );
const $ = require( "jquery" )( window );

module.exports = function preprocessor(pages, blocks) {

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
      pugHeaders += useBemEntities[entity].replace(/^.*blocks/, 'include ../blocks').replace(/\\/g, '/')
        + '/' + entity + endLine;
    }
  }

  return pugHeaders;
}

function createScssHeaders(useBemEntities) {
  let scssHeaders = "";

  for (let entity in useBemEntities) {
    if (fs.existsSync(useBemEntities[entity] + slash + '_' + entity + '.scss')) {
      scssHeaders += useBemEntities[entity].replace(/^.*blocks/, "@use 'blocks").replace(/\\/g, '/')
        + '/' + entity + "';" + endLine;
    }
  }

  return scssHeaders;
}

function createJsHeaders(useBemEntities) {
  // Блоки и модификаторы блоков ПЕРЕД элементами и модификаторами элементов
  let sortedUseBemEntities = Object.keys(useBemEntities).sort(function(entityA, entityB) {
    if (isElement(entityA) && !isElement(entityB)) return 1;
    if (isElement(entityB) && !isElement(entityA)) return -1;
    return 0;
  })

  let jsHeaders = '';

  sortedUseBemEntities.forEach(entity => {
    if (fs.existsSync(useBemEntities[entity] + slash + entity + '.js')) {
      jsHeaders += useBemEntities[entity].replace(/^.*blocks/, "import '../blocks").replace(/\\/g, '/')
          + '/' + entity + ".js';" + endLine;
    }
  })

  jsHeaders += "import './style.scss';"

  return jsHeaders;
}

// Функция возвращает true, если БЭМ-сущность является элементом ИЛИ МОДИФИКАТОРОМ ЭЛЕМЕНТА,
// иначе false
function isElement(entity) {
  return !!(entity.match(/^[^_]+__[^_]/));
}

function getUseBemEntities(sourceTemplates, bemEntities) {
  let useBemEntities = {};

  for(let template in sourceTemplates) {
    if (searchBemEntities(sourceTemplates[template], bemEntities, useBemEntities)) {
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

  let words = template.match(/[_a-z0-9-]+/g) || [];
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
    sourceTemplates[template] = sourceTemplates[template].replace(/include.*\r\n/g, '');
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
  // Если имя папки не соответствует имени папки с модификатором, возвращается false
  if (dir.match(/[^_]_[^_]+$/) === null) return false;

  let found = [];
  fs.readdirSync(dir).forEach(modifier => {
    modifier = modifier.match(/([^_]+__[^_]+_[^_]+_[^_.]+)|([^_]+_[^_]+_[^_.]+)/);
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