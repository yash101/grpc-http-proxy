import { dirname } from "path";
import { GrpcServer, grpcPath } from "./grpcserver";

const server = new GrpcServer(34245, '0.0.0.0');
