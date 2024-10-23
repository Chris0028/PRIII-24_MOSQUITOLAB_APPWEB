import { useEffect, useState } from '../hooks/useReacts';
import { GetLaboratories } from '../services/laboratoryService';

export function useFetchLaboratories() {
    const [laboratories, setLaboratories] = useState([]);
  
    useEffect(() => {
      async function fetchLaboratories() {
        try {
          const data = await GetLaboratories();
          if (data) {
            setLaboratories(
              data.map((laboratory) => ({
                label: laboratory.name,
                value: laboratory.id,
              }))
            );
          }
        } catch (error) {
          console.error('Error fetching laboratories:', error);
        }
      }
      fetchLaboratories();
    }, []);
  
    return laboratories;
};