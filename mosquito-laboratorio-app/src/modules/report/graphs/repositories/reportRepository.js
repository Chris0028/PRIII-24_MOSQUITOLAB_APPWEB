import { ReportByGender, ReportByAge } from "../services/reportService";

export async function getGenderReportData() {
    try {
        const data = await ReportByGender();
        if (data) {
            return {
                labels: ["Hombres", "Mujeres"],
                datasets: [
                    {
                        data: [data.Male, data.Female],
                        backgroundColor: ["#36A2EB", "#FF6384"],
                    },
                ],
            };
        } else {
            console.log("No se encontraron datos");
            return null;
        }
    } catch (error) {
        console.error("Error al obtener el reporte de género:", error);
        return null;
    }
}


export async function getAgeDistributionData() {
    try {
        const data = await ReportByAge(); // Llama a la API para obtener el reporte de edad
        
        // Estructura los datos para el gráfico de Chart.js
        return {
            labels: ["Menores de 18", "Mayores de 18"],
            datasets: [
                {
                    data: [data.Menor, data.Mayor],
                    backgroundColor: ["#FF6384", "#36A2EB"],
                    hoverBackgroundColor: ["#FF6384", "#36A2EB"]
                }
            ]
        };
    } catch (error) {
        console.error("Error obteniendo datos de distribución de edad:", error);
        return null;
    }
}