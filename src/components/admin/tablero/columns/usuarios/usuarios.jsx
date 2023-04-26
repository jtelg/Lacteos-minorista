import CellRolUsuario from './cellRolUsuario';

const UsuarioColumnsConfig = () => {
  const columns_user = [
    {
      field: 'role',
      headerName: 'Role',
      flex: 0.5,
      renderCell: (params) => <CellRolUsuario data={params.row} />
    },
    { field: 'nombre', headerName: 'Nombre', flex: 1 },
    { field: 'telefono', headerName: 'Telefono', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'numdoc', headerName: 'DNI', type: 'number', width: 100 }
  ];

  return { columns_user };
};
export default UsuarioColumnsConfig;
