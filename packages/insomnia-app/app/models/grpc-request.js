// @flow
import * as db from '../common/database';
import type { BaseModel } from './index';

export const name = 'gRPC Request';
export const type = 'GrpcRequest';
export const prefix = 'greq';
export const canDuplicate = true;
export const canSync = true;

type RequestBody = {
  text?: string,
};

type BaseGrpcRequest = {
  name: string,
  url: string,
  description: string,
  protoFileId?: string,
  protoServiceName?: string,
  protoMethodName?: string,
  body: RequestBody,
  metaSortKey: number,
  isPrivate: boolean,
};

export type GrpcRequest = BaseModel & BaseGrpcRequest;

export function init(): BaseGrpcRequest {
  return {
    url: '',
    name: 'New gRPC Request',
    description: '',
    protoFileId: '',
    protoServiceName: '',
    protoMethodName: '',
    body: {},
    metaSortKey: -1 * Date.now(),
    idPrivate: false,
  };
}

export function migrate(doc: GrpcRequest): GrpcRequest {
  return doc;
}

export function create(patch: $Shape<GrpcRequest> = {}): Promise<GrpcRequest> {
  if (!patch.parentId) {
    throw new Error('New GrpcRequest missing `parentId`');
  }

  return db.docCreate(type, patch);
}

export function remove(obj: GrpcRequest): Promise<void> {
  return db.remove(obj);
}

export function update(obj: GrpcRequest, patch: $Shape<GrpcRequest> = {}): Promise<GrpcRequest> {
  return db.docUpdate(obj, patch);
}

export function getById(_id: string): Promise<GrpcRequest | null> {
  return db.getWhere(type, { _id });
}

export function findByParentId(parentId: string): Promise<Array<GrpcRequest>> {
  return db.find(type, { parentId });
}

export function all(): Promise<Array<GrpcRequest>> {
  return db.all(type);
}
