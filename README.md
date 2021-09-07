# Generate kubeconfig file
Action generating Kubernetes config file for specific service account. Config file can be used to deploy into the cluster.    
Use-case: deployment to a namespace using Service Account with RBAC.

## Inputs
### `workdir`
**Optional** Path for kube config file. defaults to `~/.kube`. Set to ` ${{ github.workspace }}` when using config file in the subsequent Docketr actions.
### `kubeconfig`
**Required** kubeconfig value.

## Outputs
Generated kubeconfig will be stored in `workdir/config`.  
`workdir/config` will be added to `KUBECONFIG` environment variable.

## Example usage
```
uses: infraway/generate-kube-config@v1.2
with:
  workdir: ${{ github.workspace }}
  kubeconfig: ${{ secrets.KUBECONFIG_DEV }}
```
