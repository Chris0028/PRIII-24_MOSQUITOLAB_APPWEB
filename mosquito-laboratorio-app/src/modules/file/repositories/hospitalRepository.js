import { useEffect, useState } from '../hooks/useReacts';
import { GetHospitals } from '../services/hospitalService';

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

export function useFetchNetworks() {
  const [networks, setNetworks] = useState([]);

  useEffect(() => {
    async function fetchNetworks() {
      try {
        const data = await GetHospitals();
        if (data) {
          setNetworks(
            data.map((hospital) => ({
              label: hospital.network,
              value: hospital.id,
            }))
          );
        }
      } catch (error) {
        console.error('Error fetching networks:', error);
      }
    }
    fetchNetworks();
  }, []);
  return networks;
};
