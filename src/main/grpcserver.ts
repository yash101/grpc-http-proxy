import path, { join, dirname } from 'path';

const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

let projectPath: string = dirname(dirname(__dirname));
let grpcPath: string = path.join(projectPath, 'extern/tb.protoc/protos/http-proxy.proto');

const packageDefinition = protoLoader.loadSync(
  grpcPath, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  }
);

const ghpProto = grpc.loadPackageDefinition(packageDefinition).HttpProxyProto;

class GrpcServer {
  server: any;

  doSimpleHttpRequest(call: any, callback: any): void {
    console.log('Recieved request');
    const request = call.request;
    console.log(request);

    callback(null, null);
  }

  doStreamingHttpRequest(request: any, callback: any): any {
    request.on('data', (data: any) => {
      console.log('Received streaming http request data: ', data);
    });
  }

  doWebSocket(request: any, callback: any): any {
    request.on('data', (data: any) => {
      console.log('Received data from doWebSocket: ', data);
    });

    request.on('end', () => {
      console.log('Closing web socket request');
    });
  }

  constructor(port: Number, hostname?: String) {
    this.server = new grpc.Server();
    this.server.addService(ghpProto.HttpProxy.service, {
      DoSimpleHttpRequest: this.doSimpleHttpRequest,
      DoStreamingHttpRequest: this.doStreamingHttpRequest,
      DoWebSocket: this.doWebSocket,
    });
    this.server.bindAsync(`${hostname || '0.0.0.0'}:${port}`, grpc.ServerCredentials.createInsecure(), () => {
      this.server.start();
      console.log('gRPC Server has started');
    });
  }
}

export {
  grpcPath,
  GrpcServer,
};
