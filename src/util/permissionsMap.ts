interface IPermissionsMap {
  [role: string]: {
    [resource: string]: Array<string>;
  };
}

export const PermissionsMap: IPermissionsMap = {
  admin: {
    users: ['create', 'update', 'read', 'delete']
  },
  user: {
    users: ['read']
  }
};
