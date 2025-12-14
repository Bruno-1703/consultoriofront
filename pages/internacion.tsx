import { CrearInternacionForm } from "../components/internacion/CrearInternacionForm";
import { ListaInternaciones } from "../components/internacion/ListaInternaciones ";
import { useGetPacientesQuery } from "../graphql/types";

export default function Page() {
  const { data: pacientesData, loading: pacientesLoading } = useGetPacientesQuery({
    variables: {
      limit: 9999,   // 🔥 Traer todos los pacientes
      skip: 0,
      where: {},     // 🔥 sin filtros
    },
  });
  return (
    <>
      <title>Internaciones</title>

      {/* Form para crear internación */}
      <CrearInternacionForm pacientes={pacientesData?.getPacientes.edges || []} />

      {/* Lista de internaciones activas */}
      <ListaInternaciones />
    </>
  );
}
