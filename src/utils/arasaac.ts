/**
 * Cliente de API para ARASAAC basado en la especificación OpenAPI v1.0.0
 */

export interface ArasaacPictogram {
  _id: number;
  keywords: { keyword: string }[];
  description?: string;
}

const API_BASE_URL = 'https://api.arasaac.org/api';
const STATIC_BASE_URL = 'https://static.arasaac.org/pictograms';

/**
 * Busca el mejor pictograma para una palabra dada.
 * Utiliza el endpoint /bestsearch para mayor precisión.
 */
export async function getArasaacUrl(searchTerm: string): Promise<string | null> {
  if (!searchTerm) return null;

  try {
    // Limpiamos la palabra de espacios y la pasamos a minúsculas
    const cleanTerm = searchTerm.trim().toLowerCase();
    
    // Consultamos el endpoint de mejor búsqueda en español
    const url = `${API_BASE_URL}/pictograms/es/bestsearch/${encodeURIComponent(cleanTerm)}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      mode: 'cors' // Forzamos el modo CORS
    });

    if (!response.ok) {
      console.warn(`ARASAAC API respondió con error: ${response.status} para "${cleanTerm}"`);
      return null;
    }

    const data = await response.json();

    // La API devuelve un array de pictogramas. Tomamos el primero (_id).
    if (Array.isArray(data) && data.length > 0) {
      const id = data[0]._id;
      // Construimos la URL de la imagen estática (300px por defecto)
      return `${STATIC_BASE_URL}/${id}/${id}_300.png`;
    }

    return null;
  } catch (error) {
    console.error('Error de red al conectar con ARASAAC:', error);
    return null;
  }
}
