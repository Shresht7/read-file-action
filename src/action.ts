//  Library
import * as core from '@actions/core'
import { src, type } from './config'
import { outputs } from './metadata'

//  Helpers
import { readFile, parseFile } from './helpers'

//  ======
//  ACTION
//  ======

async function action() {
    let contents = await readFile(src)
    if (type) { contents = parseFile(contents, type) }
    core.setOutput(outputs.contents, contents)
}

//  -----------------
export default action
//  -----------------