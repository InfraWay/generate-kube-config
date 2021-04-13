/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 105:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 82:
/***/ ((module) => {

module.exports = eval("require")("@actions/github");


/***/ }),

/***/ 220:
/***/ ((module) => {

module.exports = eval("require")("@actions/io");


/***/ }),

/***/ 747:
/***/ ((module) => {

"use strict";
module.exports = require("fs");;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
const fs = __nccwpck_require__(747);
const core = __nccwpck_require__(105);
const github = __nccwpck_require__(82);
const io = __nccwpck_require__(220);

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

})();

module.exports = __webpack_exports__;
/******/ })()
;