import { useMemo } from "react"

// Hook para obtener los filtros de búsqueda de webs
export const useFilters = ({ webs }) => {
  
  const filterByCity = useMemo(() => [...new Set(webs.map(web => web.city ))], [webs]) // Obtener las ciudades únicas de la lista de webs

  const filterByActivity = useMemo(() => [...new Set(webs.map(web => web.activity))], [webs]) // Obtener las actividades únicas de la lista de webs

  return { filterByCity, filterByActivity}
}