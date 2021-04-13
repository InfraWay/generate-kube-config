const fs = require('fs');
const core = require('@actions/core');
const github = require('@actions/github');
const io = require('@actions/io');

async function run() {
  try {
    // Set working constants.
    const DOBaseUrl = "https://api.digitalocean.com";
    const workdir = `${process.env.HOME}/.kube`;
    await io.mkdirP(workdir);

    // Grab user input.
    const caData = core.getInput("caData");
    const host = core.getInput("host");
    const clusterName = core.getInput("clusterName");
    const namespace = core.getInput("namespace");
    const serviceAccountName = core.getInput("serviceAccountName");
    const serviceAccountToken = core.getInput("serviceAccountToken");

    // Construct a kubeconfig object.
    const serviceAccountFullName = 'system:serviceaccount:${namespace}:${serviceAccountName}'
    const kubeconfig = {
      apiVersion: "v1",
      clusters: [
        {
          cluster: {
            "certificate-authority-data": caData,
            server: host,
          },
          name: clusterName
        }
      ],
      contexts: [
        {
          context: {
            cluster: clusterName,
            namespace: namespace,
            user: serviceAccountFullName
          },
          name: clusterName
        }
      ],
      "current-context": clusterName,
      kind: "Config",
      preferences: {},
      users: [
        {
          name: serviceAccountFullName,
          user: {
            token: serviceAccountToken
          }
        }
      ]
    };

    // Save the kubeconfig object.
    const formattedConfig = JSON.stringify(kubeconfig, null, 4);
    fs.writeFileSync(`${workdir}/config`, formattedConfig);

    // Set KUBECONFIG environment variable.
    core.exportVariable("KUBECONFIG", `${workdir}/config`);
  }
  catch (error) {
    core.setFailed(error.message);
  }
}

run();
