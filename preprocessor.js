const fs = require('fs');

// Подключение jquery для вызова функции $.isEmptyObject()
const { JSDOM } = require('jsdom');

const { window } = new JSDOM('');
const $ = require('jquery')(window);

const slash = '\\';
const endLine = '\n';

function readSourceTemplates(pages) {
  const sourceTemplates = {};

  fs.readdirSync(pages).forEach((page) => {
    if (page.match(/\.pug$/i)) {
      sourceTemplates[page] = fs.readFileSync(pages + slash + page, 'utf-8');
    }
  });

  return sourceTemplates;
}

function cleanHeaders(sourceTemplates) {
  const cleanTemplates = {};

  Object.keys(sourceTemplates).forEach((template) => {
    cleanTemplates[template] = sourceTemplates[template].replace(/include.*\n/g, '');
  });

  return cleanTemplates;
}

// Функция возвращает объект, в который считала модификаторы формата ключ-значение
// (только формата ключ-значение) из указанной папки dir.
// На наличие имён проверяются только названия файлов, содержимое файлов не проверяется,
// вложенные папки не проверяются (их быть и не должно).
// Если в папке нет таких модификаторов, функция возвращает пустой объект.
// В объекте полное имя модификатора — это имя свойства;
// папка, в которой лежат файлы модификатора — значение свойства.
// Для данной функции значение всегда равно dir.
function getModifiersNameValue(dir) {
  const result = {};

  // Если имя папки не соответствует имени папки с модификатором, возвращается пустой объект
  if (dir.match(/[^_]_[^_]+$/) === null) {
    return result;
  }

  const found = [];
  fs.readdirSync(dir).forEach((fileName) => {
    const modifierNameValue = fileName.match(/([^_]+__[^_]+_[^_]+_[^_.]+)|([^_]+_[^_]+_[^_.]+)/);
    if (modifierNameValue) {
      if (found.includes(modifierNameValue[0]) === false) {
        result[modifierNameValue[0]] = dir;
        found.push(modifierNameValue[0]);
      }
    }
  });

  return result;
}

function getBemEntities(blocks) {
  let bemEntities = {};

  fs.readdirSync(blocks).forEach((block) => {
    const blockPath = blocks + slash + block;
    if (fs.lstatSync(blockPath).isDirectory()) {
      bemEntities[block] = blockPath;
      fs.readdirSync(blockPath).forEach((element) => {
        const elementPath = blockPath + slash + element;
        if (fs.lstatSync(elementPath).isDirectory()) {
          const blockModifiersNameValue = getModifiersNameValue(elementPath);
          if ($.isEmptyObject(blockModifiersNameValue)) {
            bemEntities[block + element] = elementPath;
            fs.readdirSync(elementPath).forEach((modifier) => {
              const modifierPath = elementPath + slash + modifier;
              if (fs.lstatSync(modifierPath).isDirectory()) {
                const elementModifiersNameValue = getModifiersNameValue(modifierPath);
                if ($.isEmptyObject(elementModifiersNameValue)) {
                  bemEntities[block + element + modifier] = modifierPath;
                } else {
                  bemEntities = { ...bemEntities, ...elementModifiersNameValue };
                }
              }
            });
          } else {
            bemEntities = { ...bemEntities, ...blockModifiersNameValue };
          }
        }
      });
    }
  });

  return bemEntities;
}

// Функция ищет в тексте шаблона template имена БЭМ-сущностей из объекта bemEntities.
// и возвращает объект с ними. Ключ - имя БЭМ-сущности, значение - папка, в которой лежат её файлы.
// Если у БЭМ-сущности есть шаблон .pug, для него вызывается эта же функция.
function searchBEMEntities(template, bemEntities) {
  const wantedBEMEntities = {};
  Object.keys(bemEntities).forEach((key) => { wantedBEMEntities[key] = bemEntities[key]; });

  let useBEMEntities = {};

  // получить массив слов, которые могут быть именами БЭМ-сущностей
  const words = template.match(/[_a-z0-9-]+/g) || [];

  // убрать повторы из массива слов
  const setWords = new Set(words);

  /* eslint-disable-next-line */
  for (const word of setWords) {
    if (wantedBEMEntities[word]) {
      useBEMEntities[word] = wantedBEMEntities[word];
      delete wantedBEMEntities[word];
      if ($.isEmptyObject(wantedBEMEntities)) {
        break;
      }
      const templatePath = `${useBEMEntities[word]}${slash}${word}.pug`;
      if (fs.existsSync(templatePath)) {
        const recursiveUseBEMEntities = searchBEMEntities(
          fs.readFileSync(templatePath, 'utf-8'),
          wantedBEMEntities,
        );
        useBEMEntities = { ...useBEMEntities, ...recursiveUseBEMEntities };
        Object.keys(recursiveUseBEMEntities).forEach((key) => delete wantedBEMEntities[key]);
        if ($.isEmptyObject(wantedBEMEntities)) {
          break;
        }
      }
      const jsPath = `${useBEMEntities[word]}${slash}${word}.js`;
      if (fs.existsSync(jsPath)) {
        const recursiveUseBEMEntities = searchBEMEntities(
          fs.readFileSync(jsPath, 'utf-8'),
          wantedBEMEntities,
        );
        useBEMEntities = { ...useBEMEntities, ...recursiveUseBEMEntities };
        Object.keys(recursiveUseBEMEntities).forEach((key) => delete wantedBEMEntities[key]);
        if ($.isEmptyObject(wantedBEMEntities)) {
          break;
        }
      }
    }
  }

  return useBEMEntities;
}

function createPUGHeaders(useBEMEntities) {
  let pugHeaders = '';

  Object.keys(useBEMEntities).forEach((entity) => {
    if (fs.existsSync(`${useBEMEntities[entity]}${slash}${entity}.pug`)) {
      pugHeaders += `${useBEMEntities[entity].replace(/^.*blocks/, 'include ../blocks').replace(/\\/g, '/')}/${entity}${endLine}`;
    }
  });

  return pugHeaders;
}

function createSCSSHeaders(useBEMEntities) {
  let scssHeaders = '@use \'fonts/fonts\';\n';

  Object.keys(useBEMEntities).forEach((entity) => {
    if (fs.existsSync(`${useBEMEntities[entity]}${slash}_${entity}.scss`)) {
      scssHeaders += `${useBEMEntities[entity].replace(/^.*blocks/, '@use \'blocks').replace(/\\/g, '/')}/${entity}';${endLine}`;
    }
  });

  return scssHeaders;
}

// Функция возвращает true, если БЭМ-сущность является элементом ИЛИ МОДИФИКАТОРОМ ЭЛЕМЕНТА,
// иначе false
function isElement(entity) {
  return !!(entity.match(/^[^_]+__[^_]/));
}

function createJSHeaders(useBEMEntities) {
  // Блоки и модификаторы блоков ПЕРЕД элементами и модификаторами элементов
  const sortedUseBEMEntities = Object.keys(useBEMEntities).sort((entityA, entityB) => {
    if (isElement(entityA) && !isElement(entityB)) return 1;
    if (isElement(entityB) && !isElement(entityA)) return -1;
    return 0;
  });

  let jsHeaders = '';

  sortedUseBEMEntities.forEach((entity) => {
    if (fs.existsSync(`${useBEMEntities[entity]}${slash}${entity}.js`)) {
      jsHeaders += `${useBEMEntities[entity].replace(/^.*blocks/, 'import \'../blocks').replace(/\\/g, '/')}/${entity}';\n`;
    }
  });

  jsHeaders += 'import \'../favicons/favicons\';\n';

  return jsHeaders;
}

module.exports = function preprocessor(pages, blocks) {
  let sourceTemplates = readSourceTemplates(pages);
  sourceTemplates = cleanHeaders(sourceTemplates);

  const bemEntities = getBemEntities(blocks);

  Object.keys(sourceTemplates).forEach((page) => {
    const useBEMEntities = searchBEMEntities(sourceTemplates[page], bemEntities);

    const pugHeaders = createPUGHeaders(useBEMEntities);
    const scssHeaders = createSCSSHeaders(useBEMEntities);
    let jsHeaders = createJSHeaders(useBEMEntities);

    jsHeaders += `import './${page.replace(/.pug$/, '')}.scss';\n`;

    sourceTemplates[page] = pugHeaders + sourceTemplates[page];

    fs.writeFileSync(`${pages}${slash}${page}`, sourceTemplates[page]);
    fs.writeFileSync(`${pages}${slash}${page}`.replace(/.pug$/, '.scss'), scssHeaders);
    fs.writeFileSync(`${pages}${slash}${page}`.replace(/.pug$/, '.js'), jsHeaders);
  });
};
