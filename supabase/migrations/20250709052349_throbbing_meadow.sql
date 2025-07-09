-- Insertar obra Los Encinos
INSERT INTO obras (id, nombre, direccion, estado, fecha_inicio, empresa) VALUES 
('los-encinos-id', 'Los Encinos', 'Av. Los Encinos 123, Santiago', 'En progreso', '2024-01-01', 'Larnet Telecomunicaciones');

-- Insertar usuarios iniciales
INSERT INTO usuarios (nombre, apellido, email, rol) VALUES 
('Admin', 'Sistema', 'admin@larnet.cl', 'Admin'),
('Supervisor', 'Campo', 'supervisor@larnet.cl', 'Supervisor'),
('Técnico', 'Uno', 'tecnico1@larnet.cl', 'Tecnico');

-- Insertar estructura completa de Los Encinos
-- Torre A
INSERT INTO espacios_obra (obra_id, torre, piso, sector, tipo_espacio, identificador) VALUES
-- Torre A - Unidades
('los-encinos-id', 'A', 1, 'Oriente', 'Unidad', 'A101'),
('los-encinos-id', 'A', 1, 'Oriente', 'Unidad', 'A102'),
('los-encinos-id', 'A', 1, 'Oriente', 'Unidad', 'A103'),
('los-encinos-id', 'A', 1, 'Oriente', 'Unidad', 'A104'),
('los-encinos-id', 'A', 1, 'Oriente', 'Unidad', 'A105'),
('los-encinos-id', 'A', 1, 'Oriente', 'Unidad', 'A106'),
('los-encinos-id', 'A', 1, 'Oriente', 'Unidad', 'A107'),
('los-encinos-id', 'A', 1, 'Oriente', 'Unidad', 'A108'),
('los-encinos-id', 'A', 1, 'Oriente', 'Unidad', 'A109'),
('los-encinos-id', 'A', 3, 'Oriente', 'Unidad', 'A301'),
('los-encinos-id', 'A', 3, 'Oriente', 'Unidad', 'A302'),
('los-encinos-id', 'A', 3, 'Oriente', 'Unidad', 'A303'),
('los-encinos-id', 'A', 3, 'Oriente', 'Unidad', 'A304'),
('los-encinos-id', 'A', 3, 'Oriente', 'Unidad', 'A305'),
('los-encinos-id', 'A', 3, 'Oriente', 'Unidad', 'A306'),
('los-encinos-id', 'A', 3, 'Oriente', 'Unidad', 'A307'),
('los-encinos-id', 'A', 3, 'Oriente', 'Unidad', 'A308'),
('los-encinos-id', 'A', 3, 'Oriente', 'Unidad', 'A309'),

-- Torre B - Unidades
('los-encinos-id', 'B', 1, 'Poniente', 'Unidad', 'B107'),
('los-encinos-id', 'B', 1, 'Poniente', 'Unidad', 'B108'),
('los-encinos-id', 'B', 1, 'Poniente', 'Unidad', 'B109'),
('los-encinos-id', 'B', 1, 'Poniente', 'Unidad', 'B110'),
('los-encinos-id', 'B', 1, 'Norte', 'Unidad', 'B101'),
('los-encinos-id', 'B', 1, 'Norte', 'Unidad', 'B102'),
('los-encinos-id', 'B', 1, 'Norte', 'Unidad', 'B103'),
('los-encinos-id', 'B', 1, 'Norte', 'Unidad', 'B104'),
('los-encinos-id', 'B', 1, 'Norte', 'Unidad', 'B105'),
('los-encinos-id', 'B', 1, 'Norte', 'Unidad', 'B106'),
('los-encinos-id', 'B', 1, 'Oriente', 'Unidad', 'B111'),
('los-encinos-id', 'B', 1, 'Oriente', 'Unidad', 'B112'),
('los-encinos-id', 'B', 1, 'Oriente', 'Unidad', 'B113'),
('los-encinos-id', 'B', 1, 'Oriente', 'Unidad', 'B114'),
('los-encinos-id', 'B', 1, 'Oriente', 'Unidad', 'B115'),
('los-encinos-id', 'B', 3, 'Poniente', 'Unidad', 'B307'),
('los-encinos-id', 'B', 3, 'Poniente', 'Unidad', 'B308'),
('los-encinos-id', 'B', 3, 'Poniente', 'Unidad', 'B309'),
('los-encinos-id', 'B', 3, 'Poniente', 'Unidad', 'B310'),
('los-encinos-id', 'B', 3, 'Norte', 'Unidad', 'B301'),
('los-encinos-id', 'B', 3, 'Norte', 'Unidad', 'B302'),
('los-encinos-id', 'B', 3, 'Norte', 'Unidad', 'B303'),
('los-encinos-id', 'B', 3, 'Norte', 'Unidad', 'B304'),
('los-encinos-id', 'B', 3, 'Norte', 'Unidad', 'B305'),
('los-encinos-id', 'B', 3, 'Norte', 'Unidad', 'B306'),
('los-encinos-id', 'B', 3, 'Oriente', 'Unidad', 'B311'),
('los-encinos-id', 'B', 3, 'Oriente', 'Unidad', 'B312'),
('los-encinos-id', 'B', 3, 'Oriente', 'Unidad', 'B313'),
('los-encinos-id', 'B', 3, 'Oriente', 'Unidad', 'B314'),
('los-encinos-id', 'B', 3, 'Oriente', 'Unidad', 'B315');

-- Insertar SOTU, Shafts y Antenas para todas las torres
INSERT INTO espacios_obra (obra_id, torre, piso, tipo_espacio, identificador) VALUES
-- SOTU (2 por torre)
('los-encinos-id', 'A', 1, 'SOTU', 'SOTU-A1'),
('los-encinos-id', 'A', 3, 'SOTU', 'SOTU-A3'),
('los-encinos-id', 'B', 1, 'SOTU', 'SOTU-B1'),
('los-encinos-id', 'B', 3, 'SOTU', 'SOTU-B3'),
('los-encinos-id', 'C', 1, 'SOTU', 'SOTU-C1'),
('los-encinos-id', 'C', 3, 'SOTU', 'SOTU-C3'),
('los-encinos-id', 'D', 1, 'SOTU', 'SOTU-D1'),
('los-encinos-id', 'D', 3, 'SOTU', 'SOTU-D3'),
('los-encinos-id', 'E', 1, 'SOTU', 'SOTU-E1'),
('los-encinos-id', 'E', 3, 'SOTU', 'SOTU-E3'),
('los-encinos-id', 'F', 1, 'SOTU', 'SOTU-F1'),
('los-encinos-id', 'F', 3, 'SOTU', 'SOTU-F3'),
('los-encinos-id', 'G', 1, 'SOTU', 'SOTU-G1'),
('los-encinos-id', 'G', 3, 'SOTU', 'SOTU-G3'),
('los-encinos-id', 'H', 1, 'SOTU', 'SOTU-H1'),
('los-encinos-id', 'H', 3, 'SOTU', 'SOTU-H3'),
('los-encinos-id', 'I', 1, 'SOTU', 'SOTU-I1'),
('los-encinos-id', 'I', 3, 'SOTU', 'SOTU-I3'),
('los-encinos-id', 'J', 1, 'SOTU', 'SOTU-J1'),
('los-encinos-id', 'J', 3, 'SOTU', 'SOTU-J3'),

-- Shafts (1 por torre)
('los-encinos-id', 'A', NULL, 'Shaft', 'SHAFT-A'),
('los-encinos-id', 'B', NULL, 'Shaft', 'SHAFT-B'),
('los-encinos-id', 'C', NULL, 'Shaft', 'SHAFT-C'),
('los-encinos-id', 'D', NULL, 'Shaft', 'SHAFT-D'),
('los-encinos-id', 'E', NULL, 'Shaft', 'SHAFT-E'),
('los-encinos-id', 'F', NULL, 'Shaft', 'SHAFT-F'),
('los-encinos-id', 'G', NULL, 'Shaft', 'SHAFT-G'),
('los-encinos-id', 'H', NULL, 'Shaft', 'SHAFT-H'),
('los-encinos-id', 'I', NULL, 'Shaft', 'SHAFT-I'),
('los-encinos-id', 'J', NULL, 'Shaft', 'SHAFT-J'),

-- Antenas (2 por torre)
('los-encinos-id', 'A', NULL, 'Antena', 'ANT-A1'),
('los-encinos-id', 'A', NULL, 'Antena', 'ANT-A2'),
('los-encinos-id', 'B', NULL, 'Antena', 'ANT-B1'),
('los-encinos-id', 'B', NULL, 'Antena', 'ANT-B2'),
('los-encinos-id', 'C', NULL, 'Antena', 'ANT-C1'),
('los-encinos-id', 'C', NULL, 'Antena', 'ANT-C2'),
('los-encinos-id', 'D', NULL, 'Antena', 'ANT-D1'),
('los-encinos-id', 'D', NULL, 'Antena', 'ANT-D2'),
('los-encinos-id', 'E', NULL, 'Antena', 'ANT-E1'),
('los-encinos-id', 'E', NULL, 'Antena', 'ANT-E2'),
('los-encinos-id', 'F', NULL, 'Antena', 'ANT-F1'),
('los-encinos-id', 'F', NULL, 'Antena', 'ANT-F2'),
('los-encinos-id', 'G', NULL, 'Antena', 'ANT-G1'),
('los-encinos-id', 'G', NULL, 'Antena', 'ANT-G2'),
('los-encinos-id', 'H', NULL, 'Antena', 'ANT-H1'),
('los-encinos-id', 'H', NULL, 'Antena', 'ANT-H2'),
('los-encinos-id', 'I', NULL, 'Antena', 'ANT-I1'),
('los-encinos-id', 'I', NULL, 'Antena', 'ANT-I2'),
('los-encinos-id', 'J', NULL, 'Antena', 'ANT-J1'),
('los-encinos-id', 'J', NULL, 'Antena', 'ANT-J2');

-- Insertar algunos datos de prueba
INSERT INTO avances (fecha, espacio_id, categoria, porcentaje, observaciones, usuario) 
SELECT 
    NOW() - INTERVAL '1 day',
    id,
    'Cableado alámbrico T1',
    100,
    'Instalación completada',
    'admin@larnet.cl'
FROM espacios_obra 
WHERE identificador IN ('A101', 'B107', 'SOTU-A1')
LIMIT 3;

INSERT INTO mediciones (fecha, espacio_id, tipo_medicion, valores, estado, observaciones, usuario)
SELECT 
    NOW(),
    id,
    'alambrico-t1',
    '{"valor": 65.5}',
    'OK',
    'Medición dentro de parámetros',
    'tecnico1@larnet.cl'
FROM espacios_obra 
WHERE identificador = 'A101'
LIMIT 1;