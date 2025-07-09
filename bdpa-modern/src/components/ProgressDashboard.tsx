import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Download, FileText, Calendar, Building, TrendingUp } from 'lucide-react';
import { avancesService, espaciosService, obrasService } from '../services/api';
import { exportToPDF } from '../utils/exports';
import type { ProgresoResumen, Avance, EspacioObra, Obra, FiltrosProgreso } from '../types';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

interface ProgressDashboardProps {
  obraId: string;
}

export const ProgressDashboard: React.FC<ProgressDashboardProps> = ({ obraId }) => {
  const [progreso, setProgreso] = useState<ProgresoResumen | null>(null);
  const [avances, setAvances] = useState<Avance[]>([]);
  const [espacios, setEspacios] = useState<EspacioObra[]>([]);
  const [obra, setObra] = useState<Obra | null>(null);
  const [loading, setLoading] = useState(true);
  const [filtros, setFiltros] = useState<FiltrosProgreso>({});

  useEffect(() => {
    loadData();
  }, [obraId, filtros]);

  const loadData = async () => {
    try {
      setLoading(true);
      
      const [progresoData, avancesData, espaciosData, obraData] = await Promise.all([
        avancesService.getProgresoResumen(obraId),
        avancesService.getAvances({ ...filtros, obra: obraId }),
        espaciosService.getEspaciosByObra(obraId),
        obrasService.getObraById(obraId)
      ]);

      setProgreso(progresoData);
      setAvances(avancesData);
      setEspacios(espaciosData);
      setObra(obraData);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExportPDF = async () => {
    if (!progreso || !obra) return;
    
    await exportToPDF.progresoReport(progreso, avances, espacios, obra.nombre);
  };

  const handleFilterChange = (key: keyof FiltrosProgreso, value: string) => {
    setFiltros(prev => ({
      ...prev,
      [key]: value || undefined
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!progreso || !obra) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No se pudo cargar la información del progreso</p>
      </div>
    );
  }

  // Preparar datos para gráficos
  const dataTorres = Object.entries(progreso.progresoPorTorre).map(([torre, porcentaje]) => ({
    torre: `Torre ${torre}`,
    porcentaje
  }));

  const dataTipos = Object.entries(progreso.progresoPorTipo).map(([tipo, porcentaje]) => ({
    name: tipo,
    value: porcentaje
  }));

  const torres = [...new Set(espacios.map(e => e.torre))].sort();

  return (
    <div className="space-y-6">
      {/* Header con filtros y acciones */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Building className="h-6 w-6" />
              {obra.nombre}
            </h1>
            <p className="text-gray-600 mt-1">Dashboard de Progreso - Jefatura</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleExportPDF}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <FileText className="h-4 w-4" />
              Exportar PDF
            </button>
          </div>
        </div>

        {/* Filtros */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Torre</label>
            <select
              value={filtros.torre || ''}
              onChange={(e) => handleFilterChange('torre', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todas las torres</option>
              {torres.map(torre => (
                <option key={torre} value={torre}>Torre {torre}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Desde</label>
            <input
              type="date"
              value={filtros.fechaDesde || ''}
              onChange={(e) => handleFilterChange('fechaDesde', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Hasta</label>
            <input
              type="date"
              value={filtros.fechaHasta || ''}
              onChange={(e) => handleFilterChange('fechaHasta', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-end">
            <button
              onClick={() => setFiltros({})}
              className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
            >
              Limpiar Filtros
            </button>
          </div>
        </div>
      </div>

      {/* Métricas principales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600">Total Espacios</p>
              <p className="text-2xl font-bold text-gray-900">{progreso.totalEspacios}</p>
            </div>
            <Building className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600">Completados</p>
              <p className="text-2xl font-bold text-green-600">{progreso.espaciosCompletados}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600">Progreso General</p>
              <p className="text-2xl font-bold text-blue-600">{progreso.porcentajeGeneral}%</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-blue-600 font-bold text-sm">{progreso.porcentajeGeneral}%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600">Última Actualización</p>
              <p className="text-sm text-gray-900">
                {new Date(progreso.ultimaActualizacion).toLocaleDateString('es-CL')}
              </p>
            </div>
            <Calendar className="h-8 w-8 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Progreso por Torre */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Progreso por Torre</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dataTorres}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="torre" />
              <YAxis domain={[0, 100]} />
              <Tooltip formatter={(value) => [`${value}%`, 'Progreso']} />
              <Bar dataKey="porcentaje" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Progreso por Tipo */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Progreso por Tipo de Espacio</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={dataTipos}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {dataTipos.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tabla de avances recientes */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Avances Recientes</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ubicación
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Categoría
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Progreso
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usuario
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {avances.slice(0, 10).map((avance) => {
                const espacio = espacios.find(e => e.id === avance.espacioId);
                return (
                  <tr key={avance.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(avance.fecha).toLocaleDateString('es-CL')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {espacio ? `Torre ${espacio.torre}${espacio.piso ? ` - Piso ${espacio.piso}` : ''} - ${espacio.identificador}` : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {avance.categoria}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${avance.porcentaje}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-900">{avance.porcentaje}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {avance.usuario}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};