import * as React from "react";
import { Autocomplete, TextField } from "@mui/material";
import { useGetPacientesQuery } from "../graphql/types";  // Suponiendo que tienes esta query para obtener los pacientes

const PersonaSelector: React.FC<{ value: string | null, onChange: (value: string | null) => void }> = ({ value, onChange }) => {
  const { data, loading, error } = useGetPacientesQuery();  // Aquí asumo que tienes una query para obtener la lista de pacientes
  
  const handleChange = (_: any, newValue: any) => {
    onChange(newValue ? newValue.dni : null); // Usamos el DNI como identificador único
  };

  return (
    <Autocomplete
      value={value ? { dni: value, nombre_paciente: "" } : null}  // Si no hay valor, lo dejamos en null
      onChange={handleChange}
      options={data?.getPacientes.edges || []}
      getOptionLabel={(option) => `${option.dni} - ${option.nombre_paciente}`} // Mostrar DNI y nombre
      loading={loading}
      renderInput={(params) => (
        <TextField {...params} label="Selecciona un paciente" variant="outlined" fullWidth />
      )}
      isOptionEqualToValue={(option, value) => option.dni === value.dni} // Aseguramos la comparación por DNI
    />
  );
};

export default PersonaSelector;
