//  Library
import * as core from '@actions/core'
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
export const src = core.getInput(inputs.src, { required: true })

/** Parse as (`yaml` | `json`) */
export const type = core.getInput(inputs.type)
