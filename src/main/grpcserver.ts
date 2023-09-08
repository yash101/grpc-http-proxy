import path, { join, dirname } from 'path';

let projectPath: string = dirname(dirname(__dirname));
let grpcPath: string = path.join(projectPath, 'extern/proto/http-proxy.proto');

class GrpcServer {
  constructor() {}
}

export {
  grpcPath,
};
