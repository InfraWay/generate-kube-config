import { writeFileSync } from 'fs';

import { getInput, exportVariable, setFailed } from '@actions/core';
import github from '@actions/github';
import { mkdirP } from '@actions/io';

async function run() {
  try {
    // Set working constants.
    const DOBaseUrl = "https://api.digitalocean.com";
    const workdir = `${process.env.HOME}/kube`;
    await mkdirP(workdir);

    // Grab user input.
    const caData = getInput("caData");
    const host = getInput("host");
    const clusterName = getInput("clusterName");
    const namespace = getInput("namespace");
    const serviceAccountName = getInput("serviceAccountName");
    const serviceAccountToken = getInput("serviceAccountToken");

    // Construct a kubeconfig object.
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
            user: serviceAccountName
          },
          name: clusterName
        }
      ],
      "current-context": clusterName,
      kind: "Config",
      preferences: {},
      users: [
        {
          name: serviceAccountName,
          user: {
            token: serviceAccountToken
          }
        }
      ]
    };

    // Save the kubeconfig object.
    const formattedConfig = JSON.stringify(kubeconfig, null, 4);
    writeFileSync(`${workdir}/config`, formattedConfig);

    // Set KUBECONFIG environment variable.
    exportVariable("KUBECONFIG", `${workdir}/config`);
  }
  catch (error) {
    setFailed(error.message);
  }
}

run();
