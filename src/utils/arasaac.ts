/**
 * Utilidad para interactuar con la API de ARASAAC
 */

export interface ArasaacPictogram {
  _id: number;
  keywords: { keyword: string }[];
}

/**
 * Busca un pictograma por palabra clave y devuelve la URL de la imagen.
 * @param word Palabra a buscar
 * @returns URL de la imagen de ARASAAC o null si no se encuentra
 */
export async function getArasaacUrl(word: string): Promise<string | null> {
  try {
    const response = await fetch(`https://api.arasaac.org/api/pictograms/es/bestsearch/${encodeURIComponent(word.toLowerCase())}`);
    
    if (!response.ok) return null;
    
    const data: ArasaacPictogram[] = await response.json();
    
    if (data && data.length > 0) {
      const id = data[0]._id;
      return `https://static.arasaac.org/pictograms/${id}/${id}_300.png`;
    }
    
    return null;
  } catch (error) {
    console.error(`Error buscando pictograma para "${word}":`, error);
    return null;
  }
}
