import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  CircularProgress,
} from "@mui/material";
import { useDarAltaInternacionMutation, useInternacionesActivasQuery } from "../../graphql/types";


export const ListaInternaciones = () => {
  const { data, loading, error, refetch } = useInternacionesActivasQuery();

  const [darAltaInternacion] = useDarAltaInternacionMutation({
    onCompleted: () => refetch(),
  });

  if (loading) return <CircularProgress />;
  if (error) return <p>Error al cargar internaciones</p>;

  const handleAlta = (id_internacion: string) => {
    darAltaInternacion({
      variables: {
        data: { id_internacion },
      },
    });
  };

  return (
    <Stack spacing={2} sx={{ mt: 3 }}>
      {data?.internacionesActivas?.map((i) => (
        <Card key={i.id_internacion}>
          <CardContent>
            <Typography variant="h6">
              {i.paciente.nombre_paciente} {i.paciente.apellido_paciente}
            </Typography>

            <Typography>Diagnóstico: {i.diagnostico}</Typography>
            <Typography>Cama: {i.cama.numero}</Typography>

            <Typography>
              Fecha ingreso: {new Date(i.fecha_ingreso).toLocaleString()}
            </Typography>

            <Button
              variant="contained"
              color="success"
              sx={{ mt: 2 }}
              onClick={() => handleAlta(i.id_internacion)}
            >
              Dar Alta
            </Button>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
};
