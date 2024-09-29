import { useState, useEffect } from "react";


export { useState, useEffect }

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
  const [selectedTab, setSelectedTab] = useState('Dengue');
  const [dengueCase, setDengueCase] = useState('');

  const handleTabSelect = (eventKey) => {
    setSelectedTab(eventKey);
  };

  const handleDengueCaseChange = (value) => {
    setDengueCase(value);
  };

  return {
    selectedTab,
    setSelectedTab: handleTabSelect,
    dengueCase,
    setDengueCase: handleDengueCaseChange,
  };

}

