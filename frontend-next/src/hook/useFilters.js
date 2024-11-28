import { useMemo } from "react"

export const useFilters = ({ webs }) => {
  
  const filterByCity = useMemo(() => [...new Set(webs.map(web => web.city ))], [webs])

  const filterByActivity = useMemo(() => [...new Set(webs.map(web => web.activity))], [webs])

  return { filterByCity, filterByActivity}
}