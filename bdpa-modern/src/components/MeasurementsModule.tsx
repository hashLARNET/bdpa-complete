import React, { useState, useEffect } from 'react';
import { Download, FileSpreadsheet, Search, Filter } from 'lucide-react';
import { medicionesService, espaciosService, obrasService } from '../services/api';
import { exportToExcel } from '../utils/exports';
import type { Medicion, EspacioObra, Obra } from '../types';

interface MeasurementsModuleProps {
  obraId: string;
}

export const MeasurementsModule: React.FC<MeasurementsModuleProps> = ({ obraId }) => {
  const [mediciones, setMediciones] = useState<Medicion[]>([]);
  const [espacios, setEspacios] = useState<EspacioObra[]>([]);
  const [obra, setObra] = useState<Obra | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedEspacio, setSelectedEspacio] = useState<string>('');
  const [selectedTorre, setSelectedTorre] = useState<string>('');
  const [selectedPiso, setSelectedPiso] = useState<string>('');
  const [tipoMedicion, setTipoMedicion] = useState<string>('');
  const [showForm, setShowForm] = useState(false);

  // Estados del formulario
  const [formData, setFormData] = useState({
    espacioId: '',
    tipoMedicion: '',
    valores: {} as Record<string, number | string>,
    estado: 'OK' as 'OK' | 'ADVERTENCIA' | 'FALLA',
    observaciones: ''
  });

  useEffect(() => {
    loadData();
  }, [obraId]);

  const loadData = async () => {
    try {
      setLoading(true);
      
      const [medicionesData, espaciosData, obraData] = await Promise.all([
        medicionesService.getMediciones({ obra: obraId }),
        espaciosService.getEspaciosByObra(obraId),
        obrasService.getObraById(obraId)
      ]);

      setMediciones(medicionesData);
      setEspacios(espaciosData);
      setObra(obraData);
    } catch (error) {
      console.error('Error loading measurements data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExportExcel = () => {
    if (!obra) return;
    exportToExcel.medicionesByUnidad(mediciones, espacios, obra.nombre);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await medicionesService.createMedicion({
        ...formData,
        fecha: new Date().toISOString(),
        usuario: 'Usuario Actual' // TODO: Obtener del contexto de auth
      });
      
      setShowForm(false);
      setFormData({
        espacioId: '',
        tipoMedicion: '',
        valores: {},
        estado: 'OK',
        observaciones: ''
      });
      
      await loadData();
    } catch (error) {
      console.error('Error saving measurement:', error);
    }
  };

  const renderMeasurementFields = () => {
    switch (formData.tipoMedicion) {
      case 'alambrico-t1':
      case 'alambrico-t2':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Valor (dBμV)
            </label>
            <input
              type="number"
              step="0.1"
              value={formData.valores.valor || ''}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                valores: { valor: parseFloat(e.target.value) }
              }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ej: 65.5"
            />
            <p className="text-xs text-gray-500 mt-1">Rango recomendado: 45-75 dBμV</p>
          </div>
        );

      case 'coaxial':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Valor Coaxial (dBμV)
            </label>
            <input
              type="number"
              step="0.1"
              value={formData.valores.coaxial || ''}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                valores: { coaxial: parseFloat(e.target.value) }
              }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ej: 65.5"
            />
            <p className="text-xs text-gray-500 mt-1">Rango recomendado: 45-75 dBμV</p>
          </div>
        );

      case 'fibra':
        return (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Potencia TX (dBm)
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.valores.potenciaTx || ''}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  valores: { 
                    ...prev.valores, 
                    potenciaTx: parseFloat(e.target.value) 
                  }
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ej: -20.5"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Potencia RX (dBm)
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.valores.potenciaRx || ''}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  valores: { 
                    ...prev.valores, 
                    potenciaRx: parseFloat(e.target.value) 
                  }
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ej: -21.0"
              />
            </div>
          </div>
        );

      case 'wifi':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Potencia WiFi (dBm)
            </label>
            <input
              type="number"
              step="0.1"
              value={formData.valores.wifi || ''}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                valores: { wifi: parseFloat(e.target.value) }
              }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ej: -45.0"
            />
            <p className="text-xs text-gray-500 mt-1">Rango típico: -80 a -30 dBm</p>
          </div>
        );

      case 'certificacion':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Resultado
            </label>
            <select
              value={formData.valores.resultado || ''}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                valores: { resultado: e.target.value }
              }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Seleccionar...</option>
              <option value="APROBADO">Aprobado</option>
              <option value="APROBADO_CON_OBSERVACIONES">Aprobado con observaciones</option>
              <option value="RECHAZADO">Rechazado</option>
            </select>
          </div>
        );

      default:
        return null;
    }
  };

  const torres = [...new Set(espacios.map(e => e.torre))].sort();
  const pisos = selectedTorre 
    ? [...new Set(espacios.filter(e => e.torre === selectedTorre).map(e => e.piso).filter(Boolean))].sort()
    : [];
  const unidades = selectedTorre && selectedPiso
    ? espacios.filter(e => e.torre === selectedTorre && e.piso === parseInt(selectedPiso))
    : [];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Mediciones por Unidad</h1>
            <p className="text-gray-600 mt-1">{obra?.nombre}</p>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={() => setShowForm(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Nueva Medición
            </button>
            <button
              onClick={handleExportExcel}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <FileSpreadsheet className="h-4 w-4" />
              Exportar Excel
            </button>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Torre</label>
            <select
              value={selectedTorre}
              onChange={(e) => {
                setSelectedTorre(e.target.value);
                setSelectedPiso('');
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todas las torres</option>
              {torres.map(torre => (
                <option key={torre} value={torre}>Torre {torre}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Piso</label>
            <select
              value={selectedPiso}
              onChange={(e) => setSelectedPiso(e.target.value)}
              disabled={!selectedTorre}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            >
              <option value="">Todos los pisos</option>
              {pisos.map(piso => (
                <option key={piso} value={piso}>Piso {piso}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
            <select
              value={tipoMedicion}
              onChange={(e) => setTipoMedicion(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todos los tipos</option>
              <option value="alambrico-t1">Alámbrico T1</option>
              <option value="alambrico-t2">Alámbrico T2</option>
              <option value="coaxial">Coaxial</option>
              <option value="fibra">Fibra Óptica</option>
              <option value="wifi">WiFi</option>
              <option value="certificacion">Certificación</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tabla de mediciones */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Unidad
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Valores
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usuario
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mediciones
                .filter(m => {
                  const espacio = espacios.find(e => e.id === m.espacioId);
                  if (!espacio) return false;
                  
                  if (selectedTorre && espacio.torre !== selectedTorre) return false;
                  if (selectedPiso && espacio.piso !== parseInt(selectedPiso)) return false;
                  if (tipoMedicion && m.tipoMedicion !== tipoMedicion) return false;
                  
                  return true;
                })
                .map((medicion) => {
                  const espacio = espacios.find(e => e.id === medicion.espacioId);
                  return (
                    <tr key={medicion.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(medicion.fecha).toLocaleDateString('es-CL')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {espacio ? `Torre ${espacio.torre} - Piso ${espacio.piso} - ${espacio.identificador}` : 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {medicion.tipoMedicion}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {JSON.stringify(medicion.valores)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          medicion.estado === 'OK' ? 'bg-green-100 text-green-800' :
                          medicion.estado === 'ADVERTENCIA' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {medicion.estado}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {medicion.usuario}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de formulario */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Nueva Medición</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Selección de ubicación */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Torre</label>
                    <select
                      value={selectedTorre}
                      onChange={(e) => {
                        setSelectedTorre(e.target.value);
                        setSelectedPiso('');
                        setFormData(prev => ({ ...prev, espacioId: '' }));
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Seleccionar...</option>
                      {torres.map(torre => (
                        <option key={torre} value={torre}>Torre {torre}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Piso</label>
                    <select
                      value={selectedPiso}
                      onChange={(e) => {
                        setSelectedPiso(e.target.value);
                        setFormData(prev => ({ ...prev, espacioId: '' }));
                      }}
                      disabled={!selectedTorre}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                      required
                    >
                      <option value="">Seleccionar...</option>
                      {pisos.map(piso => (
                        <option key={piso} value={piso}>Piso {piso}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Unidad</label>
                    <select
                      value={formData.espacioId}
                      onChange={(e) => setFormData(prev => ({ ...prev, espacioId: e.target.value }))}
                      disabled={!selectedPiso}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                      required
                    >
                      <option value="">Seleccionar...</option>
                      {unidades.map(unidad => (
                        <option key={unidad.id} value={unidad.id}>{unidad.identificador}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Tipo de medición */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Medición</label>
                  <select
                    value={formData.tipoMedicion}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      tipoMedicion: e.target.value,
                      valores: {} 
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Seleccionar...</option>
                    <option value="alambrico-t1">Alámbrico T1 (dBμV)</option>
                    <option value="alambrico-t2">Alámbrico T2 (dBμV)</option>
                    <option value="coaxial">Coaxial (dBμV)</option>
                    <option value="fibra">Fibra Óptica (dBm)</option>
                    <option value="wifi">WiFi (dBm)</option>
                    <option value="certificacion">Certificación Final</option>
                  </select>
                </div>

                {/* Campos específicos por tipo */}
                {formData.tipoMedicion && renderMeasurementFields()}

                {/* Estado */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                  <select
                    value={formData.estado}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      estado: e.target.value as 'OK' | 'ADVERTENCIA' | 'FALLA'
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="OK">OK - Dentro de parámetros</option>
                    <option value="ADVERTENCIA">Advertencia - Revisar</option>
                    <option value="FALLA">Falla - Requiere corrección</option>
                  </select>
                </div>

                {/* Observaciones */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Observaciones</label>
                  <textarea
                    value={formData.observaciones}
                    onChange={(e) => setFormData(prev => ({ ...prev, observaciones: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Detalles de la medición..."
                  />
                </div>

                {/* Botones */}
                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Guardar Medición
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};