export default interface Constellations {
  id: number;
  name: string;
  c1: ConstellationDetail;
  c2: ConstellationDetail;
  c3: ConstellationDetail;
  c4: ConstellationDetail;
  c5: ConstellationDetail;
  c6: ConstellationDetail;
  imagePath: string;
  version: string;
}

export interface RawConstellationData {
  id: number;
  name: string;
  c1: RawConstellationDetail;
  c2: RawConstellationDetail;
  c3: RawConstellationDetail;
  c4: RawConstellationDetail;
  c5: RawConstellationDetail;
  c6: RawConstellationDetail;
  images: ConstellationImageData;
  version: string;
}

export function mapToConstellationData(data: RawConstellationData): Constellations {
  return {
    id: data.id,
    name: data.name,
    c1: mapToConstellationDetail(data.c1, 1, data.images.filename_c1),
    c2: mapToConstellationDetail(data.c2, 2, data.images.filename_c2),
    c3: mapToConstellationDetail(data.c3, 3, data.images.filename_c3),
    c4: mapToConstellationDetail(data.c4, 4, data.images.filename_c4),
    c5: mapToConstellationDetail(data.c5, 5, data.images.filename_c5),
    c6: mapToConstellationDetail(data.c6, 6, data.images.filename_c6),
    imagePath: data.images.filename_constellation,
    version: data.version,
  }
}

function mapToConstellationDetail(data: RawConstellationDetail, constellationLevel: number, imagePath: string): ConstellationDetail {
  return {
    level: constellationLevel,
    name: data.name,
    descriptionRaw: data.descriptionRaw,
    description: data.description,
    imagePath: imagePath,
  }
}


export interface ConstellationDetail {
  level: number;
  name: string;
  descriptionRaw: string;
  description: string;
  imagePath: string;
}

interface RawConstellationDetail {
  name: string;
  descriptionRaw: string;
  description: string;
}

interface ConstellationImageData {
  filename_c1: string;
  filename_c2: string;
  filename_c3: string;
  filename_c4: string;
  filename_c5: string;
  filename_c6: string;
  filename_constellation: string;
}