import { useFetch } from "../../Hooks/useFetch";
import { Table } from "../../components/Table/Table";
import Swal from "sweetalert2";


export const ProductosList = () => {
    // const {data, error, setBodyRequest, setMethodState} = useFetch({ url: 'https://coff-v-art-api.onrender.com/api/user'});
    const {data, error, setBodyRequest, setMethodState, setUrlState} = useFetch({ url: 'https://coff-v-art-api.onrender.com/api/product'});
    function handleDelete(id: string) {
        Swal.fire({
          title: "Esta seguro de eliminar el producto?",
          showDenyButton: true,
          confirmButtonText: "Eliminar",
          denyButtonText: `Cancelar`,
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            setUrlState(`https://coff-v-art-api.onrender.com/api/product/${id}`);
            setMethodState("DELETE");
            setBodyRequest({ _id: id });
            setTimeout(() => {
              setUrlState("https://coff-v-art-api.onrender.com/api/product");
              setMethodState("GET");
            }, 500);
    
            Swal.fire("Producto eliminado con éxito!", "", "success");
          }
          if (result.isDenied) {
            Swal.fire("Cancelado", "", "info");
          }
        });
      }

    const dbcolumns = ['id', 'name', 'valorU', 'insumo', 'stockMin', 'stockMax', 'descripcion'];
    const columns = ['id', 'Nombre', 'Valor Unitario', 'Insumo', 'Stock minimo', 'Stock Máximo', 'Descripción'];
    const products = data.products || data;
    return (
        <>
            {error && <p>Hubo un error</p>}
            <Table data={products} columns={columns} dbColumns={dbcolumns} title='Productos' createLink='create' createText='Crear Producto' label='Buscar Producto'
             deleteFunction={handleDelete} tituloDocumento={'Productos'} nombreArchivo={'Productos'}/>
        </>
    )
}
