import * as pulumi from "@pulumi/pulumi";
import * as resources from "@pulumi/azure-native/resources";
import * as storage from "@pulumi/azure-native/storage";

// interface Lzaas {
//     resourceGroups
// }

let config = new pulumi.Config();
let data = config.requireObject("data") as any;

const resourceGroups: any = {};
for (let [key, value] of Object.entries<any>(data.resourceGroups)) {
    resourceGroups[key] = new resources.ResourceGroup(key, {
        resourceGroupName: value.name
    });
}

const storageAccounts: any = {};
for (let [key, value] of Object.entries<any>(data.storageAccounts)) {
    storageAccounts[key] = new storage.StorageAccount(key, {
        resourceGroupName: resourceGroups[value.resourceGroupKey].name,
        sku: {
            name: storage.SkuName.Standard_LRS,
        },
        kind: storage.Kind.StorageV2,
    });
}

// Export the primary key of the Storage Account
// const storageAccountKeys = pulumi.all([resourceGroup.name, storageAccount.name]).apply(([resourceGroupName, accountName]) =>
//     storage.listStorageAccountKeys({ resourceGroupName, accountName }));
// export const primaryStorageKey = storageAccountKeys.keys[0].value;
