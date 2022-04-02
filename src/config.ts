//  Library
import * as core from '@actions/core'
import * as path from 'node:path'
import { inputs } from './metadata'

//  ======
//  CONFIG
//  ======

/** Path to the source file with markdown-slots */
export const src = core.getInput(inputs.path, { required: true })

const parse = core.getInput(inputs.parse)
/** Parse as (`yaml`, `json`, or `raw string`) */
export const type = parse.toString() === 'true'
    ? path.extname(src).slice(1)
    : parse
