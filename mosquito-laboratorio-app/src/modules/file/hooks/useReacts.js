import React, { useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { updateStepFour } from "../../../redux/fileSlice";

export { React, useCallback, useState, useEffect };

export function Toggles(){
    const [isPregnant, setIsPregnant] = useState(false);
    const [isInsured, setIsInsured] = useState(false);
  
    const handleToggleChange = (value) => {
      setIsPregnant(value);
    };
  
    const handleToggleChange1 = (value) => {
      setIsInsured(value);
    };
  
    return {
      isPregnant,
      setIsPregnant,
      isInsured,
      setIsInsured,
      handleToggleChange,
      handleToggleChange1
    };
}


// MANEJO DE SINTOMAS
export function useDiseaseTabs() {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.file?.stepFour || {});

  // Estado local inicializado desde Redux
  const [selectedTab, setSelectedTab] = useState(formData.selectedDisease || 'Dengue');
  const [dengueCase, setDengueCase] = useState(formData.dengueCase || '');

  // Actualizar Redux cuando cambia el tab seleccionado
  const handleTabSelect = (eventKey) => {
    setSelectedTab(eventKey);
    dispatch(updateStepFour({ selectedDisease: eventKey }));
  };

  // Actualizar Redux cuando cambia el caso de Dengue
  const handleDengueCaseChange = (value) => {
    setDengueCase(value);
    dispatch(updateStepFour({ dengueCase: value }));
  };

  // Sincronizar el estado local con Redux
  useEffect(() => {
    if (formData.selectedDisease) {
      setSelectedTab(formData.selectedDisease);
    }
    if (formData.dengueCase) {
      setDengueCase(formData.dengueCase);
    }
  }, [formData.selectedDisease, formData.dengueCase]);

  return {
    selectedTab,
    setSelectedTab: handleTabSelect,
    dengueCase,
    setDengueCase: handleDengueCaseChange,
  };
}


