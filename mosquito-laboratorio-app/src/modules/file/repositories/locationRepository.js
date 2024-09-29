import { useEffect, useState } from '../hooks/useReacts';
import { GetMunicipalities, GetStates } from '../services/locationService';

export function useFetchMunicipalities() {
  const [municipalities, setMunicipalities] = useState([]);

  useEffect(() => {
    async function fetchMunicipalities() {
      try {
        const data = await GetMunicipalities();
        if (data) {
          setMunicipalities(
            data.map((municipality) => ({
              label: municipality.name,
              value: municipality.id,
            }))
          );
        }
      } catch (error) {
        console.error('Error fetching municipalities:', error);
      }
    }

    fetchMunicipalities();
  }, []);

  return municipalities;
}

export function useFetchStates() {
  const [states, setStates] = useState([]);

  useEffect(() => {
    async function fetchStates() {
      try {
        const data = await GetStates();
        if (data) {
          setStates(
            data.map((state) => ({
              label: state.name,
              value: state.id,
            }))
          );
        }
      } catch (error) {
        console.error('Error fetching states:', error);
      }
    }

    fetchStates();
  }, []);

  return states;
}
