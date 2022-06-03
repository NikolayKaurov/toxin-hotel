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

function getBemEntities(blocks) {
  const bemEntities = {};

  fs.readdirSync(blocks).forEach((block) => {
    const blockPath = blocks + slash + block;
    if (fs.lstatSync(blockPath).isDirectory()) {
      bemEntities[block] = blockPath;
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

  // получить массив слов, которые могут быть именами миксинов
  const mixins = template.match(/(?<=\+)[a-z-]+/g) || [];

  // убрать повторы из массива миксинов
  const setMixins = new Set(mixins);

  /* eslint-disable-next-line */
  for (const mixin of setMixins) {
    if (wantedBEMEntities[mixin]) {
      useBEMEntities[mixin] = wantedBEMEntities[mixin];
      delete wantedBEMEntities[mixin];
      if ($.isEmptyObject(wantedBEMEntities)) {
        break;
      }
      const templatePath = `${useBEMEntities[mixin]}${slash}${mixin}.pug`;
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
  let scssHeaders = '@use \'assets/fonts/fonts\';\n';

  Object.keys(useBEMEntities).forEach((entity) => {
    if (fs.existsSync(`${useBEMEntities[entity]}${slash}_${entity}.scss`)) {
      scssHeaders += `${useBEMEntities[entity].replace(/^.*blocks/, '@use \'blocks').replace(/\\/g, '/')}/${entity}';${endLine}`;
    }
  });

  return scssHeaders;
}

function createJSHeaders(useBEMEntities) {
  let jsHeaders = '';

  Object.keys(useBEMEntities).forEach((entity) => {
    if (fs.existsSync(`${useBEMEntities[entity]}${slash}${entity}.js`)) {
      jsHeaders += `${useBEMEntities[entity].replace(/^.*blocks/, 'import \'../blocks').replace(/\\/g, '/')}/${entity}';\n`;
    }
  });

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
    jsHeaders += 'import \'../favicons/favicons\';\n';

    sourceTemplates[page] = pugHeaders + sourceTemplates[page];

    fs.writeFileSync(`${pages}${slash}${page}`, sourceTemplates[page]);
    fs.writeFileSync(`${pages}${slash}${page}`.replace(/.pug$/, '.scss'), scssHeaders);
    fs.writeFileSync(`${pages}${slash}${page}`.replace(/.pug$/, '.js'), jsHeaders);
  });
};
