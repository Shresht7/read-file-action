//  Library
import * as core from '@actions/core'
import * as fs from 'node:fs'
import * as path from 'node:path'
import { src, workspace } from './config'
import { outputs } from './metadata'

//  ======
//  ACTION
//  ======

async function action() {
    const filePath = path.join(workspace, src)
    const contents = await fs.promises.readFile(filePath, { encoding: 'utf-8' })
    console.log(contents)
    core.setOutput(outputs.contents, contents)
}

//  -----------------
export default action
//  -----------------