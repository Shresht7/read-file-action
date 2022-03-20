//  Library
import * as core from '@actions/core'
import * as path from 'node:path'
import { inputs } from './metadata'

//  ======
//  CONFIG
//  ======


if (!process.env.GITHUB_WORKSPACE) {
    throw new Error('Invalid GITHUB_WORKSPACE. You need to checkout this repository using the actions/checkout@v3 github-action for the GITHUB_WORKSPACE environment variable')
}

/** GitHub Workspace URL */
export const workspace = process.env.GITHUB_WORKSPACE

/** Path to the source file with markdown-slots */
export const src = core.getInput(inputs.path, { required: true })

const parse = core.getInput(inputs.parse)
/** Parse as (`yaml`, `json`, or `raw string`) */
export const type = parse.toString() === 'true'
    ? path.extname(src).slice(1)
    : parse
