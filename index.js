const fs = require('fs');
const core = require('@actions/core');
const github = require('@actions/github');
const io = require('@actions/io');

async function run() {
  try {
    // Init working directiry.
    const workdir = core.getInput("workdir");
    await io.mkdirP(workdir);

    // Grab user input.
    const kubeconfig = core.getInput("kubeconfig");

    // Save the kubeconfig object.
    // const formattedConfig = JSON.stringify(kubeconfig, null, 4);
    fs.writeFileSync(`${workdir}/config`, kubeconfig);

    // Set KUBECONFIG environment variable.
    core.exportVariable("KUBECONFIG", `${workdir}/config`);
  }
  catch (error) {
    core.setFailed(error.message);
  }
}

run();
