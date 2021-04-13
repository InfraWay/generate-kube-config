# Generate kubeconfig file
Action generating Kubernetes config file for service account

## Inputs
### `clusterName`
**Required** Full cluster name, e.g. `"do-fra1-k8s-cluster-fra1-prod"`.

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
  serviceAccountName: "system:serviceaccount:dev:dev-deploy-sa"
  serviceAccountToken: ${{ secrets.SA_TOKEN_DEV }}
```
