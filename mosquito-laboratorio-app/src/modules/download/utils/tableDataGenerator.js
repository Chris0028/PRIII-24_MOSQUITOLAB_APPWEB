// tableDataGenerator.js
export function generateTableData(rawData = [], role) {
    // Contadores iniciales para cada rol
    let laboratoryCounter = 1;
    let hospitalCounter = 1;
    let reportAdminCounter = 1;
    if (!Array.isArray(rawData)) {
        console.error('rawData no es un array:', rawData);
        return [];
    }
    const tableData = rawData.map((item) => {
      // Determinar el código de archivo y el nivel basado en el rol
      let fileCode;
      let level;
  
      if (role === 'Employee') {
        fileCode = `fichas-LABORATORIO-${String(laboratoryCounter).padStart(2, '0')}`;
        level = 'LABORATORIO';
        laboratoryCounter++;
      } else if (role === 'Doctor') {
        fileCode = `fichas-HOSPITAL-${String(hospitalCounter).padStart(2, '0')}`;
        level = 'HOSPITAL';
        hospitalCounter++;
      }else{
        fileCode = `fichas-${String(reportAdminCounter).padStart(2, '0')}`;
        level = 'ADMINISTRADOR';
        reportAdminCounter++;
      }
  
      // Estructura de cada fila de la tabla
      return {
        fileName: fileCode,
        reportType: 'excel-consolidado',
        filters: '-',  // Puedes ajustar este valor si quieres usar filtros específicos
        level: level,
        creationDate: new Date().toLocaleString('es-ES'), // Fecha de creación actual
      };
    });
  
    return tableData;
  }