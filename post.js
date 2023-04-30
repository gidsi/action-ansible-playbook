const core = require('@actions/core')
const fs = require('fs')
const exec = require("@actions/exec");

function rm(file) {
    if (fs.existsSync(file)) {
        core.info(`Deleting "${file}" file`)
        fs.unlinkSync(file)
    }
}

async function main() {
    try {
        const directory = core.getState("directory")
        const keyFile = core.getState("keyFile")
        const inventoryFile = core.getState("inventoryFile")
        const vaultPasswordFile = core.getState("vaultPasswordFile")
        const knownHostsFile = core.getState("knownHostsFile")

        if (directory)
            process.chdir(directory)

        if (keyFile)
            rm(keyFile)

        if (inventoryFile)
            rm(inventoryFile)

        if (vaultPasswordFile)
            rm(vaultPasswordFile)

        if (knownHostsFile)
            rm(knownHostsFile)

    } catch (error) {
        core.setFailed(error.message)
    }

    let output = ""
    await exec.exec("ls -laR .ansible_key", null, {
        listeners: {
            stdout: function(data) {
                output += data.toString()
            },
            stderr: function(data) {
                output += data.toString()
            }
        }
    })
    core.info(output)
}

main()
