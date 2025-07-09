-- Insertar obra Los Encinos con UUID generado
INSERT INTO obras (id, nombre, direccion, estado, fecha_inicio, empresa) VALUES 
(gen_random_uuid(), 'Los Encinos', 'Av. Los Encinos 123, Santiago', 'En progreso', '2024-01-01', 'Larnet Telecomunicaciones');

-- Obtener el ID de la obra para usarlo en las siguientes inserciones
DO $$
DECLARE
    obra_uuid UUID;
    espacio_a101_id UUID;
    espacio_b107_id UUID;
    espacio_sotu_a1_id UUID;
BEGIN
    -- Obtener el ID de la obra recién insertada
    SELECT id INTO obra_uuid FROM obras WHERE nombre = 'Los Encinos';
    
    -- Insertar usuarios iniciales
    INSERT INTO usuarios (nombre, apellido, email, rol) VALUES 
    ('Admin', 'Sistema', 'admin@larnet.cl', 'Admin'),
    ('Supervisor', 'Campo', 'supervisor@larnet.cl', 'Supervisor'),
    ('Técnico', 'Uno', 'tecnico1@larnet.cl', 'Tecnico');

    -- Insertar estructura completa de Los Encinos
    -- Torre A - Unidades
    INSERT INTO espacios_obra (obra_id, torre, piso, sector, tipo_espacio, identificador) VALUES
    (obra_uuid, 'A', 1, 'Oriente', 'Unidad', 'A101'),
    (obra_uuid, 'A', 1, 'Oriente', 'Unidad', 'A102'),
    (obra_uuid, 'A', 1, 'Oriente', 'Unidad', 'A103'),
    (obra_uuid, 'A', 1, 'Oriente', 'Unidad', 'A104'),
    (obra_uuid, 'A', 1, 'Oriente', 'Unidad', 'A105'),
    (obra_uuid, 'A', 1, 'Oriente', 'Unidad', 'A106'),
    (obra_uuid, 'A', 1, 'Oriente', 'Unidad', 'A107'),
    (obra_uuid, 'A', 1, 'Oriente', 'Unidad', 'A108'),
    (obra_uuid, 'A', 1, 'Oriente', 'Unidad', 'A109'),
    (obra_uuid, 'A', 3, 'Oriente', 'Unidad', 'A301'),
    (obra_uuid, 'A', 3, 'Oriente', 'Unidad', 'A302'),
    (obra_uuid, 'A', 3, 'Oriente', 'Unidad', 'A303'),
    (obra_uuid, 'A', 3, 'Oriente', 'Unidad', 'A304'),
    (obra_uuid, 'A', 3, 'Oriente', 'Unidad', 'A305'),
    (obra_uuid, 'A', 3, 'Oriente', 'Unidad', 'A306'),
    (obra_uuid, 'A', 3, 'Oriente', 'Unidad', 'A307'),
    (obra_uuid, 'A', 3, 'Oriente', 'Unidad', 'A308'),
    (obra_uuid, 'A', 3, 'Oriente', 'Unidad', 'A309'),

    -- Torre B - Unidades
    (obra_uuid, 'B', 1, 'Poniente', 'Unidad', 'B107'),
    (obra_uuid, 'B', 1, 'Poniente', 'Unidad', 'B108'),
    (obra_uuid, 'B', 1, 'Poniente', 'Unidad', 'B109'),
    (obra_uuid, 'B', 1, 'Poniente', 'Unidad', 'B110'),
    (obra_uuid, 'B', 1, 'Norte', 'Unidad', 'B101'),
    (obra_uuid, 'B', 1, 'Norte', 'Unidad', 'B102'),
    (obra_uuid, 'B', 1, 'Norte', 'Unidad', 'B103'),
    (obra_uuid, 'B', 1, 'Norte', 'Unidad', 'B104'),
    (obra_uuid, 'B', 1, 'Norte', 'Unidad', 'B105'),
    (obra_uuid, 'B', 1, 'Norte', 'Unidad', 'B106'),
    (obra_uuid, 'B', 1, 'Oriente', 'Unidad', 'B111'),
    (obra_uuid, 'B', 1, 'Oriente', 'Unidad', 'B112'),
    (obra_uuid, 'B', 1, 'Oriente', 'Unidad', 'B113'),
    (obra_uuid, 'B', 1, 'Oriente', 'Unidad', 'B114'),
    (obra_uuid, 'B', 1, 'Oriente', 'Unidad', 'B115'),
    (obra_uuid, 'B', 3, 'Poniente', 'Unidad', 'B307'),
    (obra_uuid, 'B', 3, 'Poniente', 'Unidad', 'B308'),
    (obra_uuid, 'B', 3, 'Poniente', 'Unidad', 'B309'),
    (obra_uuid, 'B', 3, 'Poniente', 'Unidad', 'B310'),
    (obra_uuid, 'B', 3, 'Norte', 'Unidad', 'B301'),
    (obra_uuid, 'B', 3, 'Norte', 'Unidad', 'B302'),
    (obra_uuid, 'B', 3, 'Norte', 'Unidad', 'B303'),
    (obra_uuid, 'B', 3, 'Norte', 'Unidad', 'B304'),
    (obra_uuid, 'B', 3, 'Norte', 'Unidad', 'B305'),
    (obra_uuid, 'B', 3, 'Norte', 'Unidad', 'B306'),
    (obra_uuid, 'B', 3, 'Oriente', 'Unidad', 'B311'),
    (obra_uuid, 'B', 3, 'Oriente', 'Unidad', 'B312'),
    (obra_uuid, 'B', 3, 'Oriente', 'Unidad', 'B313'),
    (obra_uuid, 'B', 3, 'Oriente', 'Unidad', 'B314'),
    (obra_uuid, 'B', 3, 'Oriente', 'Unidad', 'B315'),

    -- Torre C - Unidades (sin sector Norte)
    (obra_uuid, 'C', 1, 'Poniente', 'Unidad', 'C101'),
    (obra_uuid, 'C', 1, 'Poniente', 'Unidad', 'C102'),
    (obra_uuid, 'C', 1, 'Poniente', 'Unidad', 'C103'),
    (obra_uuid, 'C', 1, 'Poniente', 'Unidad', 'C104'),
    (obra_uuid, 'C', 1, 'Poniente', 'Unidad', 'C105'),
    (obra_uuid, 'C', 1, 'Poniente', 'Unidad', 'C106'),
    (obra_uuid, 'C', 1, 'Poniente', 'Unidad', 'C107'),
    (obra_uuid, 'C', 1, 'Oriente', 'Unidad', 'C108'),
    (obra_uuid, 'C', 1, 'Oriente', 'Unidad', 'C109'),
    (obra_uuid, 'C', 1, 'Oriente', 'Unidad', 'C110'),
    (obra_uuid, 'C', 1, 'Oriente', 'Unidad', 'C111'),
    (obra_uuid, 'C', 1, 'Oriente', 'Unidad', 'C112'),
    (obra_uuid, 'C', 1, 'Oriente', 'Unidad', 'C113'),
    (obra_uuid, 'C', 1, 'Oriente', 'Unidad', 'C114'),
    (obra_uuid, 'C', 3, 'Poniente', 'Unidad', 'C301'),
    (obra_uuid, 'C', 3, 'Poniente', 'Unidad', 'C302'),
    (obra_uuid, 'C', 3, 'Poniente', 'Unidad', 'C303'),
    (obra_uuid, 'C', 3, 'Poniente', 'Unidad', 'C304'),
    (obra_uuid, 'C', 3, 'Poniente', 'Unidad', 'C305'),
    (obra_uuid, 'C', 3, 'Poniente', 'Unidad', 'C306'),
    (obra_uuid, 'C', 3, 'Poniente', 'Unidad', 'C307'),
    (obra_uuid, 'C', 3, 'Oriente', 'Unidad', 'C308'),
    (obra_uuid, 'C', 3, 'Oriente', 'Unidad', 'C309'),
    (obra_uuid, 'C', 3, 'Oriente', 'Unidad', 'C310'),
    (obra_uuid, 'C', 3, 'Oriente', 'Unidad', 'C311'),
    (obra_uuid, 'C', 3, 'Oriente', 'Unidad', 'C312'),
    (obra_uuid, 'C', 3, 'Oriente', 'Unidad', 'C313'),
    (obra_uuid, 'C', 3, 'Oriente', 'Unidad', 'C314');

    -- Insertar SOTU, Shafts y Antenas para todas las torres
    INSERT INTO espacios_obra (obra_id, torre, piso, tipo_espacio, identificador) VALUES
    -- SOTU (2 por torre)
    (obra_uuid, 'A', 1, 'SOTU', 'SOTU-A1'),
    (obra_uuid, 'A', 3, 'SOTU', 'SOTU-A3'),
    (obra_uuid, 'B', 1, 'SOTU', 'SOTU-B1'),
    (obra_uuid, 'B', 3, 'SOTU', 'SOTU-B3'),
    (obra_uuid, 'C', 1, 'SOTU', 'SOTU-C1'),
    (obra_uuid, 'C', 3, 'SOTU', 'SOTU-C3'),
    (obra_uuid, 'D', 1, 'SOTU', 'SOTU-D1'),
    (obra_uuid, 'D', 3, 'SOTU', 'SOTU-D3'),
    (obra_uuid, 'E', 1, 'SOTU', 'SOTU-E1'),
    (obra_uuid, 'E', 3, 'SOTU', 'SOTU-E3'),
    (obra_uuid, 'F', 1, 'SOTU', 'SOTU-F1'),
    (obra_uuid, 'F', 3, 'SOTU', 'SOTU-F3'),
    (obra_uuid, 'G', 1, 'SOTU', 'SOTU-G1'),
    (obra_uuid, 'G', 3, 'SOTU', 'SOTU-G3'),
    (obra_uuid, 'H', 1, 'SOTU', 'SOTU-H1'),
    (obra_uuid, 'H', 3, 'SOTU', 'SOTU-H3'),
    (obra_uuid, 'I', 1, 'SOTU', 'SOTU-I1'),
    (obra_uuid, 'I', 3, 'SOTU', 'SOTU-I3'),
    (obra_uuid, 'J', 1, 'SOTU', 'SOTU-J1'),
    (obra_uuid, 'J', 3, 'SOTU', 'SOTU-J3'),

    -- Shafts (1 por torre)
    (obra_uuid, 'A', NULL, 'Shaft', 'SHAFT-A'),
    (obra_uuid, 'B', NULL, 'Shaft', 'SHAFT-B'),
    (obra_uuid, 'C', NULL, 'Shaft', 'SHAFT-C'),
    (obra_uuid, 'D', NULL, 'Shaft', 'SHAFT-D'),
    (obra_uuid, 'E', NULL, 'Shaft', 'SHAFT-E'),
    (obra_uuid, 'F', NULL, 'Shaft', 'SHAFT-F'),
    (obra_uuid, 'G', NULL, 'Shaft', 'SHAFT-G'),
    (obra_uuid, 'H', NULL, 'Shaft', 'SHAFT-H'),
    (obra_uuid, 'I', NULL, 'Shaft', 'SHAFT-I'),
    (obra_uuid, 'J', NULL, 'Shaft', 'SHAFT-J'),

    -- Laterales (3 por torre)
    (obra_uuid, 'A', NULL, 'Lateral', 'LAT-A-1'),
    (obra_uuid, 'A', NULL, 'Lateral', 'LAT-A-2'),
    (obra_uuid, 'A', NULL, 'Lateral', 'LAT-A-3'),
    (obra_uuid, 'B', NULL, 'Lateral', 'LAT-B-1'),
    (obra_uuid, 'B', NULL, 'Lateral', 'LAT-B-2'),
    (obra_uuid, 'B', NULL, 'Lateral', 'LAT-B-3'),
    (obra_uuid, 'C', NULL, 'Lateral', 'LAT-C-1'),
    (obra_uuid, 'C', NULL, 'Lateral', 'LAT-C-2'),
    (obra_uuid, 'C', NULL, 'Lateral', 'LAT-C-3'),
    (obra_uuid, 'D', NULL, 'Lateral', 'LAT-D-1'),
    (obra_uuid, 'D', NULL, 'Lateral', 'LAT-D-2'),
    (obra_uuid, 'D', NULL, 'Lateral', 'LAT-D-3'),
    (obra_uuid, 'E', NULL, 'Lateral', 'LAT-E-1'),
    (obra_uuid, 'E', NULL, 'Lateral', 'LAT-E-2'),
    (obra_uuid, 'E', NULL, 'Lateral', 'LAT-E-3'),
    (obra_uuid, 'F', NULL, 'Lateral', 'LAT-F-1'),
    (obra_uuid, 'F', NULL, 'Lateral', 'LAT-F-2'),
    (obra_uuid, 'F', NULL, 'Lateral', 'LAT-F-3'),
    (obra_uuid, 'G', NULL, 'Lateral', 'LAT-G-1'),
    (obra_uuid, 'G', NULL, 'Lateral', 'LAT-G-2'),
    (obra_uuid, 'G', NULL, 'Lateral', 'LAT-G-3'),
    (obra_uuid, 'H', NULL, 'Lateral', 'LAT-H-1'),
    (obra_uuid, 'H', NULL, 'Lateral', 'LAT-H-2'),
    (obra_uuid, 'H', NULL, 'Lateral', 'LAT-H-3'),
    (obra_uuid, 'I', NULL, 'Lateral', 'LAT-I-1'),
    (obra_uuid, 'I', NULL, 'Lateral', 'LAT-I-2'),
    (obra_uuid, 'I', NULL, 'Lateral', 'LAT-I-3'),
    (obra_uuid, 'J', NULL, 'Lateral', 'LAT-J-1'),
    (obra_uuid, 'J', NULL, 'Lateral', 'LAT-J-2'),
    (obra_uuid, 'J', NULL, 'Lateral', 'LAT-J-3'),

    -- Antenas (2 por torre)
    (obra_uuid, 'A', NULL, 'Antena', 'ANT-A1'),
    (obra_uuid, 'A', NULL, 'Antena', 'ANT-A2'),
    (obra_uuid, 'B', NULL, 'Antena', 'ANT-B1'),
    (obra_uuid, 'B', NULL, 'Antena', 'ANT-B2'),
    (obra_uuid, 'C', NULL, 'Antena', 'ANT-C1'),
    (obra_uuid, 'C', NULL, 'Antena', 'ANT-C2'),
    (obra_uuid, 'D', NULL, 'Antena', 'ANT-D1'),
    (obra_uuid, 'D', NULL, 'Antena', 'ANT-D2'),
    (obra_uuid, 'E', NULL, 'Antena', 'ANT-E1'),
    (obra_uuid, 'E', NULL, 'Antena', 'ANT-E2'),
    (obra_uuid, 'F', NULL, 'Antena', 'ANT-F1'),
    (obra_uuid, 'F', NULL, 'Antena', 'ANT-F2'),
    (obra_uuid, 'G', NULL, 'Antena', 'ANT-G1'),
    (obra_uuid, 'G', NULL, 'Antena', 'ANT-G2'),
    (obra_uuid, 'H', NULL, 'Antena', 'ANT-H1'),
    (obra_uuid, 'H', NULL, 'Antena', 'ANT-H2'),
    (obra_uuid, 'I', NULL, 'Antena', 'ANT-I1'),
    (obra_uuid, 'I', NULL, 'Antena', 'ANT-I2'),
    (obra_uuid, 'J', NULL, 'Antena', 'ANT-J1'),
    (obra_uuid, 'J', NULL, 'Antena', 'ANT-J2');

    -- Obtener IDs de espacios específicos para datos de prueba
    SELECT id INTO espacio_a101_id FROM espacios_obra WHERE identificador = 'A101' AND obra_id = obra_uuid;
    SELECT id INTO espacio_b107_id FROM espacios_obra WHERE identificador = 'B107' AND obra_id = obra_uuid;
    SELECT id INTO espacio_sotu_a1_id FROM espacios_obra WHERE identificador = 'SOTU-A1' AND obra_id = obra_uuid;

    -- Insertar algunos datos de prueba de avances
    INSERT INTO avances (fecha, espacio_id, categoria, porcentaje, observaciones, usuario) VALUES
    (NOW() - INTERVAL '1 day', espacio_a101_id, 'Cableado alámbrico T1', 100, 'Instalación completada', 'admin@larnet.cl'),
    (NOW() - INTERVAL '2 days', espacio_b107_id, 'Instalación PAU', 75, 'PAU instalado, falta configuración', 'tecnico1@larnet.cl'),
    (NOW() - INTERVAL '3 days', espacio_sotu_a1_id, 'Instalación de dispositivos', 50, 'Dispositivos principales instalados', 'supervisor@larnet.cl');

    -- Insertar algunos datos de prueba de mediciones
    INSERT INTO mediciones (fecha, espacio_id, tipo_medicion, valores, estado, observaciones, usuario) VALUES
    (NOW(), espacio_a101_id, 'alambrico-t1', '{"valor": 65.5}', 'OK', 'Medición dentro de parámetros', 'tecnico1@larnet.cl'),
    (NOW() - INTERVAL '1 hour', espacio_b107_id, 'coaxial', '{"valor": 58.2}', 'OK', 'Señal estable', 'tecnico1@larnet.cl'),
    (NOW() - INTERVAL '2 hours', espacio_a101_id, 'fibra', '{"potenciaTx": -20.1, "potenciaRx": -21.0, "atenuacion": 0.9}', 'ADVERTENCIA', 'Atenuación ligeramente alta', 'supervisor@larnet.cl');

END $$;