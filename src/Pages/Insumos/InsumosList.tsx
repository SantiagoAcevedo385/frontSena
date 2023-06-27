import { useFetch } from "../../Hooks/useFetch";
import { Table } from "../../components/Table/Table";


export const InsumosList = () => {
  const { data, error, setBodyRequest, setMethodState, setUrlState } = useFetch({ url: 'https://coff-v-art-api.onrender.com/api/insumo' });

  function handleDelete(id: string) {
    setUrlState(`https://coff-v-art-api.onrender.com/api/insumo/${id}`);
    setMethodState('DELETE');
    setBodyRequest({ _id: id })
    setTimeout(() => {
      setUrlState('https://coff-v-art-api.onrender.com/api/insumo');
      setMethodState('GET');
    }, 500)
  }

  const dbcolumns = ['id', 'nombre', 'costoSaco', 'cantidad', 'categoria', 'descripcion'];
  const columns = ['id', 'Nombre', 'costo Saco', 'Cantidad', 'Categoría', 'Descripción'];
  const insumos = data.insumos || data;

  return (
    <>
      {error && <p>Hubo un error</p>}
      <Table data={insumos} columns={columns} dbColumns={dbcolumns} title='Insumos' createLink='create' createText='Crear Insumo' label='Buscar Insumo' 
      deleteFunction={handleDelete} tituloDocumento={'Insumos'} nombreArchivo={'Insumos'} />
    </>
  )
}
