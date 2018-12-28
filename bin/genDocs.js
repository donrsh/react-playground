const fs = require('fs')
const R = require('ramda')
const mustache = require('mustache')
const mkdirp = require('mkdirp')

const templates = {
  SingleFile: fs.readFileSync('docTemplates/SingleFile.mustache', { encoding: 'utf-8' }),
  FinalFormInMUI: fs.readFileSync('docTemplates/FinalFormInMUI.mustache', { encoding: 'utf-8' })
}

const getCodeString = R.pipe(
  fs.readFileSync,
  x => x.toString(),
  R.replace(/(\/\*[^*]*\*\/)|(\{\/\*[^*]*\*\/\})|(\/\/.*)/g, ''),
  R.replace(/(\s*\n){3,}/g, '\n')
)

function genDocsByStoryName(lookupPath, taskFn) {
  fs.readdirSync(lookupPath)
    .filter(s => !s.startsWith('_'))
    .map(R.replace(/.js$/, ''))
    .forEach(taskFn)
}

const outputDir = 'storybook-readme/generated'
mkdirp.sync(outputDir)

/* FinalFormByConfig */
const genFinalFormInMUIDocs = formName => {
  let viewData = {
    formConfigCodeString: getCodeString(`src/routeComponents/FinalFormByConfig/examples/${formName}/formConfig.js`),
    formCode: getCodeString(`src/routeComponents/FinalFormByConfig/examples/${formName}/${formName}.js`),
  }

  fs.writeFileSync(
    `${outputDir}/FinalFormInMUI/${formName}.md`,
    mustache.render(templates.FinalFormInMUI, viewData)
  )
}

mkdirp.sync(`${outputDir}/FinalFormInMUI`)
genDocsByStoryName(`src/routeComponents/FinalFormByConfig/examples/`, genFinalFormInMUIDocs)
/* FinalFormByConfig *///


/* DnD Examples */
const genDnDDocs = name => {
  let viewData = {
    codeString: getCodeString(`src/routeComponents/DnDExamples/Examples/${name}/${name}.js`)
  }

  fs.writeFileSync(
    `${outputDir}/DnD/${name}.md`,
    mustache.render(templates.SingleFile, viewData)
  )
}

mkdirp.sync(`${outputDir}/DnD`)
genDocsByStoryName(`src/routeComponents/DnDExamples/Examples/`, genDnDDocs)
/* DnD Examples *///


/* Downshift */
const genDownshiftDocs = name => {
  let viewData = {
    codeString: getCodeString(`src/routeComponents/DownShiftExamples/Examples/${name}.js`)
  }

  fs.writeFileSync(
    `${outputDir}/Downshift/${name}.md`,
    mustache.render(templates.SingleFile, viewData)
  )
}

mkdirp.sync(`${outputDir}/Downshift`)
genDocsByStoryName(`src/routeComponents/DownShiftExamples/Examples`, genDownshiftDocs)
/* Downshift *///


/* React Hooks Examples */
const genHookExampleDocs = name => {
  let viewData = {
    codeString: getCodeString(`src/routeComponents/HookExamples/examples/${name}.js`)
  }

  fs.writeFileSync(
    `${outputDir}/HookExamples/${name}.md`,
    mustache.render(templates.SingleFile, viewData)
  )
}

mkdirp.sync(`${outputDir}/HookExamples`)
genDocsByStoryName(`src/routeComponents/HookExamples/examples/`, genHookExampleDocs)
/* React Hooks Examples *///


/* MUI x react-table */
const genMUIReactTableExampleDocs = name => {
  let viewData = {
    codeString: getCodeString(`src/routeComponents/MUIReactTables/examples/${name}.js`)
  }

  fs.writeFileSync(
    `${outputDir}/MUIReactTables/${name}.md`,
    mustache.render(templates.SingleFile, viewData)
  )
}

mkdirp.sync(`${outputDir}/MUIReactTables`)
genDocsByStoryName(`src/routeComponents/MUIReactTables/examples/`, genMUIReactTableExampleDocs)
/* MUI x react-table *///
