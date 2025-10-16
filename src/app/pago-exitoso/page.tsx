'use client';

import Link from 'next/link';

export default function PagoExitosoPage() {
  return (
    <div className="text-center py-16">
      <h1 className="text-4xl font-bold text-green-600 mb-4">Pago Exitoso!</h1>
      <p className="text-lg text-gray-700 mb-8">Gracias por tu compra. Tu orden está siendo procesada.</p>
      <Link href="/" className="bg-blue-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-600">
        Continuar Comprando
      </Link>
    </div>
  );
}
