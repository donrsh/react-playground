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

const outputDir = 'storybook-readme/generated'
mkdirp.sync(outputDir)

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
genFinalFormInMUIDocs('SimpleExample')
genFinalFormInMUIDocs('ArrayFields')
genFinalFormInMUIDocs('CalculatedFields')
genFinalFormInMUIDocs('CustomValidationEngine')
genFinalFormInMUIDocs('HybridSyncAsyncRecordLevelValidation')
genFinalFormInMUIDocs('ParseAndFormat')
genFinalFormInMUIDocs('SubmissionErrors')
genFinalFormInMUIDocs('SynchronousFieldLevelValidation')
genFinalFormInMUIDocs('SynchronousRecordLevelValidation')
genFinalFormInMUIDocs('WizardForm')

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
genDnDDocs('NativeAPI')
genDnDDocs('DragAround')
genDnDDocs('ReactDnDTutorial')

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
genDownshiftDocs('Basic')
genDownshiftDocs('Multiple')
genDownshiftDocs('MultipleAndEditable')
genDownshiftDocs('MultipleAndEditable2')
genDownshiftDocs('SingleAsync')

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
genHookExampleDocs('Toggler')
genHookExampleDocs('AsyncJob')

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
genMUIReactTableExampleDocs('SimpleTable')
genMUIReactTableExampleDocs('CellRenderers')
genMUIReactTableExampleDocs('DefaultSorting')

