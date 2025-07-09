-- Crear extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabla de usuarios
CREATE TABLE usuarios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    rol VARCHAR(20) NOT NULL CHECK (rol IN ('Admin', 'Supervisor', 'Tecnico')),
    activo BOOLEAN DEFAULT true,
    ultimo_acceso TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de obras
CREATE TABLE obras (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre VARCHAR(200) NOT NULL,
    direccion TEXT,
    estado VARCHAR(20) NOT NULL CHECK (estado IN ('En progreso', 'Completada', 'Pausada')),
    fecha_inicio DATE NOT NULL,
    fecha_termino DATE,
    empresa VARCHAR(200),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de espacios de obra
CREATE TABLE espacios_obra (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    obra_id UUID NOT NULL REFERENCES obras(id) ON DELETE CASCADE,
    torre VARCHAR(10) NOT NULL,
    piso INTEGER,
    sector VARCHAR(20),
    tipo_espacio VARCHAR(20) NOT NULL CHECK (tipo_espacio IN ('Unidad', 'SOTU', 'Shaft', 'Lateral', 'Antena')),
    identificador VARCHAR(50) NOT NULL,
    activo BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(obra_id, identificador)
);

-- Tabla de avances
CREATE TABLE avances (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    fecha TIMESTAMP WITH TIME ZONE NOT NULL,
    espacio_id UUID NOT NULL REFERENCES espacios_obra(id) ON DELETE CASCADE,
    categoria VARCHAR(100) NOT NULL,
    porcentaje INTEGER NOT NULL CHECK (porcentaje >= 0 AND porcentaje <= 100),
    observaciones TEXT,
    fotos TEXT[], -- Array de URLs de fotos
    usuario VARCHAR(100) NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de mediciones
CREATE TABLE mediciones (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    fecha TIMESTAMP WITH TIME ZONE NOT NULL,
    espacio_id UUID NOT NULL REFERENCES espacios_obra(id) ON DELETE CASCADE,
    tipo_medicion VARCHAR(20) NOT NULL CHECK (tipo_medicion IN ('alambrico-t1', 'alambrico-t2', 'coaxial', 'fibra', 'wifi', 'certificacion')),
    valores JSONB NOT NULL,
    estado VARCHAR(20) NOT NULL CHECK (estado IN ('OK', 'ADVERTENCIA', 'FALLA')),
    observaciones TEXT,
    usuario VARCHAR(100) NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para mejorar rendimiento
CREATE INDEX idx_espacios_obra_obra_id ON espacios_obra(obra_id);
CREATE INDEX idx_espacios_obra_torre ON espacios_obra(torre);
CREATE INDEX idx_avances_espacio_id ON avances(espacio_id);
CREATE INDEX idx_avances_fecha ON avances(fecha);
CREATE INDEX idx_mediciones_espacio_id ON mediciones(espacio_id);
CREATE INDEX idx_mediciones_tipo ON mediciones(tipo_medicion);
CREATE INDEX idx_mediciones_fecha ON mediciones(fecha);

-- Habilitar RLS (Row Level Security)
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE obras ENABLE ROW LEVEL SECURITY;
ALTER TABLE espacios_obra ENABLE ROW LEVEL SECURITY;
ALTER TABLE avances ENABLE ROW LEVEL SECURITY;
ALTER TABLE mediciones ENABLE ROW LEVEL SECURITY;

-- Políticas RLS básicas (permitir todo por ahora, refinar después)
CREATE POLICY "Allow all for authenticated users" ON usuarios FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow all for authenticated users" ON obras FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow all for authenticated users" ON espacios_obra FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow all for authenticated users" ON avances FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow all for authenticated users" ON mediciones FOR ALL TO authenticated USING (true);