export interface Rol {
  id: number
  nombre: string
  createdAt: string
  updatedAt: string
  deletedAt: string
  rolesPermisos: RolesPermiso[]
}

export interface RolesPermiso {
  rolId?: number
  permisoId?: number
  createdAt: string
  updatedAt: string
  deletedAt: string
  permiso: Permiso
}

export interface Permiso {
  id: number
  nombre: string
  createdAt: string
  updatedAt: string
  deletedAt: string
}
