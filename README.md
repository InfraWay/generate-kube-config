# Generate kubeconfig file
Action generating Kubernetes config file for specific service account. Config file can be used to deploy into the cluster. 
Use-case: deployment to a namespace using Service Account with RBAC.

## Inputs
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
Generated kubeconfig will be stored in `$HOME/.kube/config`
`$HOME/.kube/config` will be added to `KUBECONFIG` environment variable.

## Example usage
```
uses: infraway/generate-kube-config@1.0
with:
  caData: ${{ secrets.KUBE_CA_DATA }}
  host: ${{ secrets.KUBE_HOST }}
  clusterName: ${{ secrets.KUBE_CLUSTER_NAME }}
  namespace: "dev"
  serviceAccountName: "sa-dev-deploy"
  serviceAccountToken: ${{ secrets.SA_TOKEN_DEV }}
```
