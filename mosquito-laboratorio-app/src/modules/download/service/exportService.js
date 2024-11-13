import * as XLSX from 'xlsx';
import Papa from 'papaparse';

// Helper function to remove 'fileId' from data
function removeFileId(data) {
    return data.map(({ fileId, ...rest }) => rest);
  }

  export function exportToExcel(data, fileName) {
    const cleanedData = removeFileId(data); // Remove 'fileId'
    const worksheet = XLSX.utils.json_to_sheet(cleanedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  }
  
  export function exportToCSV(data, fileName) {
    const cleanedData = removeFileId(data); // Remove 'fileId'
    const csv = Papa.unparse(cleanedData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${fileName}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }