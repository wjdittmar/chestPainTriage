// src/lib/grpcNodeRpc.ts
import { loadPackageDefinition, credentials } from "@grpc/grpc-js";
import { loadSync } from "@grpc/proto-loader";

export interface Rpc {
  request(
    service: string,
    method: string,
    data: Uint8Array,
  ): Promise<Uint8Array>;
}

/**
 * A loose type that allows dynamic string indexing for packages
 * and services. This is necessary for dynamic lookups like
 * grpcObj["chestpain"]["TriageService"].
 */
type DynamicGrpcObject = {
  [pkgName: string]: {
    [serviceName: string]: any;
  };
};

export function createNodeRpc(address: string, protoPath: string): Rpc {
  const packageDefinition = loadSync(protoPath, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  });

  // Cast the loaded package definition to a more permissive type
  // so we can do grpcObj[pkgName][svcName].
  const grpcObj = loadPackageDefinition(
    packageDefinition,
  ) as unknown as DynamicGrpcObject;

  return {
    request(service, method, data) {
      return new Promise<Uint8Array>((resolve, reject) => {
        const [pkgName, svcName] = service.split(".");
        const servicePkg = grpcObj[pkgName];
        if (!servicePkg) {
          return reject(new Error(`Package not found: ${pkgName}`));
        }

        const ServiceConstructor = servicePkg[svcName];
        if (!ServiceConstructor) {
          return reject(new Error(`Service not found: ${pkgName}.${svcName}`));
        }

        // Create the client
        const client = new ServiceConstructor(
          address,
          credentials.createInsecure(),
        );

        // Make the unary request
        client[method](data, (err: Error, response: Uint8Array) => {
          if (err) {
            return reject(err);
          }
          resolve(response);
        });
      });
    },
  };
}
