// import { ApolloError } from "@apollo/client";
// import React, { useContext, useEffect, useState } from "react";
// import { hasMore, maxItems } from "./ContextAgendaBuscarFunciones";
// import { userAuth } from "./userContext";
// import { TAlerta } from "../utils/Alertas";

// interface CitasContextInterface {
//   datosCitas?: GetCitasQuery;
//   errorCitas?: ApolloError;
//   loadingCitas?: boolean;
//   variablesQuery?: GetMailsQueryVariables;
//   rowsCita?: CitaResultado[];
//   availableitas: boolean;
//   section?: string;
//   setMoreCita: React.Dispatch<React.SetStateAction<boolean>>;
//   refrescarCitas?: () => Promise<void>;
//   handleSetOrder?: (value: OrderFront) => void;
//   alerta: TAlerta;
//   setAlerta: (TAlerta) => void;
//   getCitasNoLeidos: () => Promise<void>;
//   getAllCitas: () => Promise<void>;
// }

// export const EmailsContext =
//   React.createContext<CitasContextInterface>(undefined);

// interface CitaProvider {
//   buscar?: string;
//   refetch?: boolean;
//   token?: string;
//   children: React.ReactNode;
//   setRefetch?: (arg: boolean) => void;
//   setCount?: (arg: number) => void;
//   section?: string;
// }

// export type OrderFront = {
//   key: string;
//   order: string;
// };

//  export type CitaType = { id: string; type: Area; prioridad: string };

// export const CitasContextProvider (props: CitaProvider) => {
//   * PROPS
//   const {
//     buscar,
//     refetch,
//     setRefetch,
//     setCount,
//     section,
//   } = props;  
//   HOOKS
//   const [rowsCita, setRowsCita] = useState<CitaResultado[] >([]);
//   const [availableCitas, setAvailableCitas] = useState<boolean>(true);
//   const [moreCita, setMoreCita] = useState<boolean>(false);
//   const [skipScrollCita, setSkipScrollCita] = useState<number>(0);
//   const [busquedaContext, setBusquedaContext] = useState<string>(buscar || "");
//   const [cambiosEnCantidad, setCambiosEnCantidad] = useState<boolean>(true);

//   const [selectedCitas, setSelectedCitas] = useState<CitaType[]>([]);
//   const [eliminar, setEliminar] = useState(false);

//   const [alerta, setAlerta] = useState<TAlerta>(null);

//   const { user } = userAuth()
//   VARIABLES
//   const variablesQuery: GetCitasQueryVariables = {
//     take: maxItems,
//     skip: skipScrollCita,
//     where: { buscar: busquedaContext, dni_origen: user.usuarioDni },
//     seccion: section,
//   };
//   * QUERY
//   const {
//     loading: loadingCitas,
//     error: errorCitas,
//     data: datosCitas,
//     refetch: refetchCitas,
//   } = useGetMailsQuery({ variables: variablesQuery });

//   FUNCTIONS
//   * Limpia estados Citas
//   const clearDataRows = () => {
//     setRowsCita([]);
//     setSkipScrollCita(0);
//     setAvailableCitas(true);
//   };

//   * Refrescar query Citas
//   const refrescarEmails = async () => {
//     setRefetch(false);
//     clearDataRows();
//     try {
//       await refetchCitas({ ...variablesQuery, skip: 0 }).then((data) => {
//         setRowsCita(data.data?.emails.edges.map((item) => item.node));
//         setCount(data?.data.emails.aggregate.count ?? 0);
//       });
//     } catch (error) {
//       console.error(error);
//     }
//   };

  
//   useEffect(() => {
//     if (refetch) {
//       refrescarCitas();
//     }
//   }, [refetch]);
  
//    Efecto para filtros
//    useEffect(() => {
//      if (busquedaContext !== buscar) {
//          setBusquedaContext(buscar)
//          clearDataRows()
//      }
   
//      setCambiosEnCantidad(true)
//    }, [ buscar])



//   }

//   Valor inicial contexto
//   const valorInicial = {
//     errorCitas,
//     loadingCitas,
//     datosCitas,
//     variablesQuery,
//     rowsCita,
//     availableEmails,
//     section,
//     setMoreEmail,
//     refrescarEmails,
//     alerta,
//     setAlerta,
//     getMailsNoLeidos,
//     getAllMails
//     handleSetOrder
    
//   };
//   return <EmailsContext.Provider value={valorInicial} {...props} />;
// };

// export function useEmailsContext() {
//   const context = useContext(EmailsContext);

//   if (context === undefined) {
//     throw new Error("useEmail debe estar entre EmailProvider");
//   }
//   return context;
// }

// * Funcion para sort
// const calcularOrderBy = (order) => {
//   if (order) {
//     // alert('hola');
//     return (order.key +
//       "_" +
//       order.order.toUpperCase()) as OrderBy;
//   }
//   return SolicitudOrderByInput.FechaEntradaDesc;
// };