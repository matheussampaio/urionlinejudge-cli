const fs = require('fs')
const inquirer = require('inquirer')
const path = require('path')
const { PathPrompt } = require('inquirer-path')

const { LANGUAGES } = require('./utils/constants')

inquirer.registerPrompt('path', PathPrompt)

const CONFIG_FILENAME = `.urionlinejudge.json`

function getConfigurationPath () {
  return path.join(process.env.HOME || process.env.USERPROFILE, CONFIG_FILENAME)
}

async function loadConfiguration () {
  if (fs.existsSync(getConfigurationPath())) {
    return JSON.parse(fs.readFileSync(getConfigurationPath()))
  }

  return {}
}

async function load ({ force = false } = {}) {
  const config = await loadConfiguration()

  const questions = [
    {
      name: 'email',
      message: 'What is your URI Online Judge email?',
      when: config.email == null || force
    },
    {
      name: 'password',
      type: 'password',
      message: 'What is your URI Online Judge password?',
      when: config.password == null || force
    },
    {
      name: 'language',
      type: 'list',
      choices: Object.entries(LANGUAGES).map(([value, name]) => ({ name, value })),
      message: 'What is the default language?',
      when: config.language == null || force
    },
    {
      name: 'template',
      type: 'path',
      message: 'What is the full path for the default template file?',
      when: config.template == null || force,
      cwd: process.cwd()
    }
  ]

  const answers = await inquirer.prompt(questions)

  const configurationWithAnswers = Object.assign(config, answers)

  fs.writeFileSync(getConfigurationPath(), JSON.stringify(configurationWithAnswers, null, 2))

  return configurationWithAnswers
}

module.exports = { load }
