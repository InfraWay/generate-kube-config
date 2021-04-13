# Generate kubeconfig file
Action generating Kubernetes config file for specific service account. Config file can be used to deploy into the cluster. 
Use-case: Service Account

## Inputs
### `clusterName`
**Required** Full cluster name, e.g. `"do-fra1-k8s-cluster-dev"`.

## Outputs
Generated kubeconfig will be stored in `$HOME/.kube/config`

## Example usage
```
uses: infraway/generate-kube-config@main
with:
  caData: ${{ secrets.KUBE_CA_DATA }}
  host: ${{ secrets.KUBE_HOST }}
  clusterName: ${{ secrets.KUBE_CLUSTER_NAME }}
  namespace: "dev"
  serviceAccountName: "sa-dev-deploy"
  serviceAccountToken: ${{ secrets.SA_TOKEN_DEV }}
```
