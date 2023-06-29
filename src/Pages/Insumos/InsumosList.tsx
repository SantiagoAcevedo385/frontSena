import { useFetch } from "../../Hooks/useFetch";
import { Table } from "../../components/Table/Table";
import Swal from "sweetalert2";

export const InsumosList = () => {
  const { data, error, setBodyRequest, setMethodState, setUrlState } = useFetch({ url: 'https://coff-v-art-api.onrender.com/api/insumo' });

  function handleDelete(id: string) {
    Swal.fire({
      title: "Esta seguro de eliminar el insumo?",
      showDenyButton: true,
      confirmButtonText: "Eliminar",
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        setUrlState(`https://coff-v-art-api.onrender.com/api/insumo/${id}`);
        setMethodState("DELETE");
        setBodyRequest({ _id: id });
        setTimeout(() => {
          setUrlState("https://coff-v-art-api.onrender.com/api/insumo");
          setMethodState("GET");
        }, 500);

        Swal.fire("Insumo eliminado con éxito!", "", "success");
      }
      if (result.isDenied) {
        Swal.fire("Cancelado", "", "info");
      }
    });
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
