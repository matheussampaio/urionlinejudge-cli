#! /usr/bin/env node

const fs = require('fs')
const path = require('path')
const updateNotifier = require('update-notifier')

const CLI = require('./cli')
const Config = require('./config')
const Log = require('./utils/log')
const pkg = require('../package.json')
const URIOnlineJudge = require('./uri/uri-online-judge')
const URIOnlineJudgeURL = require('./uri/uri-online-judge-urls')

main()

async function main () {
  // Check for CLI updates (on npm) and print some warning on the command line.
  updateNotifier({ pkg }).notify()

  runCommand()
}

async function runCommand () {
  const commands = {
    reset,
    submit,
    init
  }

  const command = commands[CLI.command]

  if (command == null) {
    Log.error(`Command '${CLI.command}' not found.`)

    return process.exit(1)
  }

  try {
    await command()
  } catch (error) {
    Log.error(error)

    return process.exit(1)
  }

  return process.exit(0)
}

/**
 * Reset user informations
 */
async function reset () {
  try {
    const config = await Config.load(true)
    Log.success(`Email: ${config.email}`, `Template: ${config.template}`)
  } catch (error) {
    Log.error(error)
  }
}

/**
 * Load user and submit a problem to URI Online Judge Website
 */
async function submit () {
  const problemFile = fs.readFileSync(CLI.filepath, `utf-8`)
  const ext = path.extname(CLI.filepath)
  const number = CLI.number ? CLI.number : path.basename(CLI.filepath, ext)

  const config = await Config.load()

  // submit problem to the uri online judge website
  await URIOnlineJudge.submit({
    email: config.email,
    password: config.password,
    problem: parseInt(number, 10),
    file: problemFile,
    language: CLI.language
  })
}

/**
 * Init a question from the URI Online Judge Website
 */
async function init () {
  const force = CLI.force
  const problemNumber = CLI.number
  const injectValue = `urionlinejudge::description`

  const config = await Config.load()

  const template = CLI.template ? CLI.template : config.template

  const extname = path.extname(template)
  const outputFilepath = path.join(CLI.output, `${problemNumber}${extname}`)
  const templateFile = fs.readFileSync(template, `utf-8`)

  const options = {
    force,
    injectValue,
    templateFile,
    problemNumber,
    outputFilepath
  }

  await checkTemplate(options)

  const desc = URIOnlineJudgeURL.problemView + problemNumber
  const outputFile = templateFile.replace(injectValue, desc)

  fs.writeFileSync(outputFilepath, outputFile)

  Log.success(`Problem init: ${outputFilepath}`)
}

/**
 * Check if template already exists and if it contains `INJECT_VALUE`.
 */
function checkTemplate ({
  injectValue,
  templateFile,
  templateFilepath,
  outputFilepath,
  problemNumber,
  force
}) {
  let exists = true

  try {
    fs.accessSync(outputFilepath)
  } catch (e) {
    exists = false
  }

  // Verify if template contains INJECT_VALUE
  if (templateFile.indexOf(injectValue) === -1) {
    const message = [
      `Can't find the inject string.`,
      `Make sure that your template contains '${injectValue}'.`
    ].join()

    throw new Error(message)
    // reject if force is false and file already exists
  }

  if (!force && exists) {
    const message = [
      `This file ${outputFilepath} already exists. Use -f or --force if you want to overwrite:`,
      `urionlinejudge fetch -f -n ${problemNumber} -t ${templateFilepath} -o ${outputFilepath}`
    ].join()

    throw new Error(message)
  }
}
