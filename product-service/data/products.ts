import { Product } from '../models/product.model';

export const getProductsData = (): Array<Product> => {
  return [
    {
      count: 4,
      description: '5PCS/LOT SRD-06VDC-SL-C SRD-06 5 Pins 6V 10A DC Coil PCB',
      id: '1',
      price: 1.8,
      title: 'Relay',
    },
    {
      count: 6,
      description:
        'Small four-wheel drive motor motor science experimental wholesale',
      id: '2',
      price: 0.72,
      title: 'DC motor',
    },
    {
      count: 7,
      description:
        '20PCS/Lot 7X7mm 7*7mm 6Pin Push Tactile Power Micro Switch Self lock',
      id: '3',
      price: 1.25,
      title: 'On/Off button',
    },
    {
      count: 12,
      description:
        'Multicolor 4pin 5mm RGB Led Diode Light Lamp Tricolor Round Common Anode Red Green Blue',
      id: '4',
      price: 0.83,
      title: 'LED F5 Light Emitting Diode',
    },
    {
      count: 7,
      description:
        '5v Active Buzzer Magnetic Long Continous Beep 12mm MINI Active Piezo Buzzers Fit For Computers Printers',
      id: '5',
      price: 1.16,
      title: 'Alarm Ringer',
    },
    {
      count: 2,
      description:
        '12 values 0.22UF-470UF Aluminum electrolytic capacitor assortment kit set pack',
      id: '6',
      price: 1.63,
      title: 'Capacitor',
    },
    {
      count: 8,
      description: 'TZT 10PCS TL074CN DIP14 TL074 DIP 074CN DIP',
      id: '7',
      price: 0.87,
      title: 'Voltage Regulator',
    },
    {
      count: 3,
      description:
        'TZT Round 8 Ohm 1W Speaker 8ohm 20mm Mobile Phone Small Loudspeaker Audio',
      id: '8',
      price: 0.51,
      title: 'Loud Speaker',
    },
  ];
};
