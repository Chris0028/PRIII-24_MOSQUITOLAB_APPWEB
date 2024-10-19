import { useEffect, useState } from '../hooks/useReacts';
import { GetHospitals } from '../services/laboratoryService';

export function useFetchHospitals() {
    const [hospitals, setHospitals] = useState([]);
  
    useEffect(() => {
      async function fetchHospitals() {
        try {
          const data = await GetHospitals();
          if (data) {
            setHospitals(
              data.map((hospital) => ({
                label: hospital.name,
                value: hospital.id,
              }))
            );
          }
        } catch (error) {
          console.error('Error fetching hospitals:', error);
        }
      }
      fetchHospitals();
    }, []);
    return hospitals;
};