import CreatePermissionInput from '../dtos/create-permission-input'
import Permission from '../models/permission'
import UpdatePermissionInput from '../dtos/update-permission-input'

export default interface IPermissionsRepository {
  create(data: CreatePermissionInput): Promise<Permission>
  index(): Promise<Permission[]>
  one(id: string): Promise<Permission | undefined>
  update(
    id: string,
    data: UpdatePermissionInput
  ): Promise<Permission | undefined>
  remove(id: string): Promise<boolean>
}
