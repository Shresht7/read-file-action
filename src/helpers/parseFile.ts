//  Library
import * as yaml from 'js-yaml'

/** Parse file contents */
export function parseFile<T>(contents: string, as?: string): T {

    let result: T   //  Variable to hold the parsed results

    switch (as) {

        //  Parse string as JSON
        case 'json':
            result = JSON.parse(contents) as T
            break

        //  Parse string as YAML
        case 'yml':
        case 'yaml':
            result = yaml.load(contents) as T
            break

        //  Parse string as string
        default:
            result = contents as unknown as T
            break

    }

    return result

}