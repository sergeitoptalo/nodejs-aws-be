CREATE TABLE IF NOT EXISTS products (
	id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
	title TEXT NOT null,
	description TEXT DEFAULT null,
	price DECIMAL(10, 2)
);

create table if not exists stocks(
	product_id uuid,
	product_count int,
	foreign key ("product_id") references "products" ("id")
);

insert into products (title, description, price) values
('Relay', '5PCS/LOT SRD-06VDC-SL-C SRD-06 5 Pins 6V 10A DC Coil PCB', 1.8),
('DC motor', 'Small four-wheel drive motor motor science experimental wholesale', 0.72),
('On/Off button', '20PCS/Lot 7X7mm 7*7mm 6Pin Push Tactile Power Micro Switch Self lock', 1.25),
('LED F5 Light Emitting Diode', 'Multicolor 4pin 5mm RGB Led Diode Light Lamp Tricolor Round Common Anode Red Green Blue', 0.83),
('Alarm Ringer', '5v Active Buzzer Magnetic Long Continous Beep 12mm MINI Active Piezo Buzzers Fit For Computers Printers', 1.16),
('Capacitor', '12 values 0.22UF-470UF Aluminum electrolytic capacitor assortment kit set pack', 1.63),
('Voltage Regulator', 'TZT 10PCS TL074CN DIP14 TL074 DIP 074CN DIP', 0.87),
('Loud Speaker', 'TZT Round 8 Ohm 1W Speaker 8ohm 20mm Mobile Phone Small Loudspeaker Audio', 0.51);

insert into stocks (product_id, product_count) values
('a7f2ea9c-b612-42c5-87e2-ce9c3bf7029d', 4),
('c74fda54-be5f-49a0-ad4c-0cc915998425', 6),
('f2019c37-6d60-49e4-a87d-cca77bc66e12', 7),
('487fcb8c-6649-409b-8563-c5addb29f974', 12),
('2d5a2f91-d5ca-4abe-a3b2-5cb38457b9a6', 7),
('b281a817-a2f1-425e-bbda-16f7ffa66496', 2),
('576b375b-45ff-41fc-b4f2-e94707877231', 8),
('1f395541-c35a-4d02-8d6b-2a83eb827c62', 3);

create extension if not exists "uuid-ossp";