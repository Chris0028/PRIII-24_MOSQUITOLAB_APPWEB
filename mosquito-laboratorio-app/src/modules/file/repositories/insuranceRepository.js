import { useEffect, useState } from '../hooks/useReacts';
import { GetInsurances } from '../services/insuranceService';

export function useFetchInsurances() {
  const [insurances, setInsurances] = useState([]);

  useEffect(() => {
    async function fetchInsurances() {
      try {
        const data = await GetInsurances();
        if (data) {
          setInsurances(
            data.map((insurance) => ({
              label: insurance.transmitter,
              value: insurance.id,
              name: insurance.name, //
            }))
          );
        }
      } catch (error) {
        console.error('Error fetching insurances:', error);
      }
    }
    fetchInsurances();
  }, []);

  return insurances;
};
