import { ChangeEvent } from 'react';
import { getBase64 } from './utils';

export async function validateAndGetImageFile(
  event: ChangeEvent<HTMLInputElement>
) {
  if (event.target.files?.[0]) {
    const file = event.target.files[0];

    if (!file.type.includes('image')) {
      throw new Error(
        'El tipo de archivo no es válido. Debes utilizar una imágen'
      );
      return;
    }

    const base64 = (await getBase64(file)) as string;

    return base64;
  }
}
