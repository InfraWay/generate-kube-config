# Generate kubeconfig file
Action generating Kubernetes config file for specific service account. Config file can be used to deploy into the cluster.    
Use-case: deployment to a namespace using Service Account with RBAC.

## Inputs
### `workdir`
**Optional** Path for kube config file. defaults to `~/.kube`. Set to ` ${{ github.workspace }}` when using config file in the subsequent Docketr actions.
### `caData`
**Required** CA Data.
### `host`
**Required** Kubernetes API server URL.
### `clusterName`
**Required** Full cluster name, e.g. `"do-fra1-k8s-cluster-dev"`.
### `namespace`
**Required** The Kubernetes namespace to operate under.
### `serviceAccountName`
**Required** Kubernetes service account name.
### `serviceAccountToken`
**Required** Kubernetes service account secret.

## Outputs
Generated kubeconfig will be stored in `workdir/config`.  
`workdir/config` will be added to `KUBECONFIG` environment variable.

## Example usage
```
uses: infraway/generate-kube-config@v1.1
with:
  workdir: ${{ github.workspace }}
  caData: ${{ secrets.KUBE_CA_DATA }}
  host: ${{ secrets.KUBE_HOST }}
  clusterName: ${{ secrets.KUBE_CLUSTER_NAME }}
  namespace: "dev"
  serviceAccountName: "sa-dev-deploy"
  serviceAccountToken: ${{ secrets.SA_TOKEN_DEV }}
```
