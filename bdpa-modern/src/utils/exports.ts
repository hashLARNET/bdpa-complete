import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import type { Avance, Medicion, ProgresoResumen, EspacioObra } from '../types';

// ==================== EXPORTACIÓN PDF ====================
export const exportToPDF = {
  async progresoReport(
    progreso: ProgresoResumen,
    avances: Avance[],
    espacios: EspacioObra[],
    obraNombre: string
  ) {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    let yPosition = 20;

    // Título
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('REPORTE DE PROGRESO', pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 15;

    // Información de la obra
    doc.setFontSize(16);
    doc.text(obraNombre, pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 10;

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Fecha: ${new Date().toLocaleDateString('es-CL')}`, pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 20;

    // Resumen general
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('RESUMEN GENERAL', 20, yPosition);
    yPosition += 10;

    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text(`Total de espacios: ${progreso.totalEspacios}`, 20, yPosition);
    yPosition += 6;
    doc.text(`Espacios completados: ${progreso.espaciosCompletados}`, 20, yPosition);
    yPosition += 6;
    doc.text(`Progreso general: ${progreso.porcentajeGeneral}%`, 20, yPosition);
    yPosition += 15;

    // Progreso por torre
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('PROGRESO POR TORRE', 20, yPosition);
    yPosition += 10;

    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    Object.entries(progreso.progresoPorTorre).forEach(([torre, porcentaje]) => {
      doc.text(`Torre ${torre}: ${porcentaje}%`, 20, yPosition);
      yPosition += 6;
    });
    yPosition += 10;

    // Progreso por tipo
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('PROGRESO POR TIPO DE ESPACIO', 20, yPosition);
    yPosition += 10;

    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    Object.entries(progreso.progresoPorTipo).forEach(([tipo, porcentaje]) => {
      doc.text(`${tipo}: ${porcentaje}%`, 20, yPosition);
      yPosition += 6;
    });
    yPosition += 15;

    // Avances recientes
    if (avances.length > 0) {
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('AVANCES RECIENTES', 20, yPosition);
      yPosition += 10;

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      
      // Headers de tabla
      doc.setFont('helvetica', 'bold');
      doc.text('Fecha', 20, yPosition);
      doc.text('Ubicación', 60, yPosition);
      doc.text('Categoría', 120, yPosition);
      doc.text('Progreso', 170, yPosition);
      yPosition += 8;

      doc.setFont('helvetica', 'normal');
      avances.slice(0, 20).forEach(avance => {
        if (yPosition > 270) {
          doc.addPage();
          yPosition = 20;
        }

        const espacio = espacios.find(e => e.id === avance.espacioId);
        const ubicacion = espacio ? `${espacio.torre}${espacio.piso ? `-${espacio.piso}` : ''} ${espacio.identificador}` : 'N/A';
        
        doc.text(new Date(avance.fecha).toLocaleDateString('es-CL'), 20, yPosition);
        doc.text(ubicacion, 60, yPosition);
        doc.text(avance.categoria.substring(0, 25), 120, yPosition);
        doc.text(`${avance.porcentaje}%`, 170, yPosition);
        yPosition += 6;
      });
    }

    // Guardar PDF
    const fileName = `progreso_${obraNombre.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(fileName);
  }
};

// ==================== EXPORTACIÓN EXCEL ====================
export const exportToExcel = {
  medicionesByUnidad(mediciones: Medicion[], espacios: EspacioObra[], obraNombre: string) {
    // Crear workbook
    const wb = XLSX.utils.book_new();

    // Agrupar mediciones por unidad
    const medicionesPorUnidad = mediciones.reduce((acc, medicion) => {
      const espacio = espacios.find(e => e.id === medicion.espacioId);
      if (!espacio) return acc;

      const key = `${espacio.torre}-${espacio.piso}-${espacio.identificador}`;
      if (!acc[key]) {
        acc[key] = {
          torre: espacio.torre,
          piso: espacio.piso,
          identificador: espacio.identificador,
          mediciones: []
        };
      }
      acc[key].mediciones.push(medicion);
      return acc;
    }, {} as Record<string, any>);

    // Crear hoja resumen
    const resumenData = Object.values(medicionesPorUnidad).map((unidad: any) => ({
      'Torre': unidad.torre,
      'Piso': unidad.piso,
      'Unidad': unidad.identificador,
      'Total Mediciones': unidad.mediciones.length,
      'Mediciones OK': unidad.mediciones.filter((m: Medicion) => m.estado === 'OK').length,
      'Mediciones con Falla': unidad.mediciones.filter((m: Medicion) => m.estado === 'FALLA').length,
      'Última Medición': unidad.mediciones.length > 0 
        ? new Date(Math.max(...unidad.mediciones.map((m: Medicion) => new Date(m.fecha).getTime()))).toLocaleDateString('es-CL')
        : 'N/A'
    }));

    const wsResumen = XLSX.utils.json_to_sheet(resumenData);
    XLSX.utils.book_append_sheet(wb, wsResumen, 'Resumen por Unidad');

    // Crear hoja detallada
    const detalleData = mediciones.map(medicion => {
      const espacio = espacios.find(e => e.id === medicion.espacioId);
      return {
        'Fecha': new Date(medicion.fecha).toLocaleDateString('es-CL'),
        'Torre': espacio?.torre || 'N/A',
        'Piso': espacio?.piso || 'N/A',
        'Unidad': espacio?.identificador || 'N/A',
        'Tipo Medición': medicion.tipoMedicion,
        'Valores': JSON.stringify(medicion.valores),
        'Estado': medicion.estado,
        'Usuario': medicion.usuario,
        'Observaciones': medicion.observaciones || ''
      };
    });

    const wsDetalle = XLSX.utils.json_to_sheet(detalleData);
    XLSX.utils.book_append_sheet(wb, wsDetalle, 'Detalle Mediciones');

    // Crear hojas por tipo de medición
    const tiposMedicion = [...new Set(mediciones.map(m => m.tipoMedicion))];
    
    tiposMedicion.forEach(tipo => {
      const medicionesTipo = mediciones.filter(m => m.tipoMedicion === tipo);
      const dataTipo = medicionesTipo.map(medicion => {
        const espacio = espacios.find(e => e.id === medicion.espacioId);
        const valores = medicion.valores;
        
        return {
          'Fecha': new Date(medicion.fecha).toLocaleDateString('es-CL'),
          'Torre': espacio?.torre || 'N/A',
          'Piso': espacio?.piso || 'N/A',
          'Unidad': espacio?.identificador || 'N/A',
          'Estado': medicion.estado,
          'Usuario': medicion.usuario,
          'Observaciones': medicion.observaciones || '',
          ...valores // Expandir valores específicos del tipo
        };
      });

      const wsTipo = XLSX.utils.json_to_sheet(dataTipo);
      XLSX.utils.book_append_sheet(wb, wsTipo, tipo.toUpperCase());
    });

    // Guardar archivo
    const fileName = `mediciones_${obraNombre.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(wb, fileName);
  },

  avancesReport(avances: Avance[], espacios: EspacioObra[], obraNombre: string) {
    const data = avances.map(avance => {
      const espacio = espacios.find(e => e.id === avance.espacioId);
      return {
        'Fecha': new Date(avance.fecha).toLocaleDateString('es-CL'),
        'Torre': espacio?.torre || 'N/A',
        'Piso': espacio?.piso || 'N/A',
        'Tipo Espacio': espacio?.tipoEspacio || 'N/A',
        'Identificador': espacio?.identificador || 'N/A',
        'Categoría': avance.categoria,
        'Porcentaje': `${avance.porcentaje}%`,
        'Usuario': avance.usuario,
        'Observaciones': avance.observaciones || ''
      };
    });

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Avances');

    const fileName = `avances_${obraNombre.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(wb, fileName);
  }
};