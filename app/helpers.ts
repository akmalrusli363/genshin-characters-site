
// Helper to get unique values for dropdowns
export function getUnique<T>(arr: T[], key: keyof T) {
  return Array.from(new Set(arr.map(item => item[key]).filter(Boolean)));
}

export function pivot<T>(
  data: T[],
  rowKey: keyof T,
  colKey: keyof T
) {
  const result: Record<string, Record<string, T[]>> = {};

  data.forEach(item => {
    const row = String(item[rowKey]);
    const col = String(item[colKey]);

    if (!result[row]) result[row] = {};
    if (!result[row][col]) result[row][col] = [];
    result[row][col].push(item);
  });

  return result;
}

export interface ImagePair {
  name: string;
  imgSrc: string;
}

// interface FieldMapper<T> {
//   field: keyof T;       // the property name from your object
//   label: string;        // user-friendly label
//   values: string[];     // filtered list of distinct values
// }

// interface PairFieldMapper<T> {
//   field: keyof T;       // the property name from your object
//   label: string;        // user-friendly label
//   values: ImagePair[];     // filtered list of distinct values
// }

// export function createFieldMapper<T extends Record<string, any>>(
//   data: T[],
//   field: keyof T,
//   label: string,
//   exclude: string[] = ["none"]
// ): FieldMapper<T> {
//   const values = Array.from(
//     new Set(
//       data
//         .map(item => item[field]?.toString().toLowerCase())
//         .filter(v => v && !exclude.includes(v))
//     )
//   );

//   return { field, label, values };
// }

export function buildFieldMappers<T extends Record<string, T>>(
  data: T[],
  config: { [key: string]: { field: keyof T; label: string } },
  exclude: string[] = ["none"]
) {
  const result: Record<string, { label: string; values: string[] }> = {};

  for (const key in config) {
    const { field, label } = config[key];

    const values = Array.from(
      new Set(
        data
          .map(item => item[field]?.toString())
          .filter(v => v && !exclude.includes(v))
      )
    );

    result[key] = { label, values };
  }

  return result;
}

export function buildPairFieldMappers<T extends object>(
  data: T[],
  config: {
     [key: string]: {
       field: keyof T; 
       label: string;
       mapping: (item: T) => ImagePair;
      };
    },
  exclude: string[] = ["none"]
): Record<string, { label: string; values: ImagePair[] }> {
  const result: Record<string, { label: string; values: ImagePair[] }> = {};

  for (const key in config) {
    const { field, label, mapping } = config[key];

    const valueMap = new Map<string, ImagePair>();
    data
      .filter(item => {
        const v = item[field]?.toString().toLowerCase();
        return v && !exclude.includes(v);
      })
      .forEach(item => {
        const imagePair = mapping(item);
        if (imagePair.name && !valueMap.has(imagePair.name)) {
          valueMap.set(imagePair.name, imagePair);
        }
      });

    const values = Array.from(valueMap.values());

    result[key] = { label, values };
  }

  return result;
}
