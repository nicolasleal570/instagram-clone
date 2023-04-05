import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { InputField } from '../InputField/InputField';

export function SearchBar() {
  return (
    <InputField
      type='text'
      name='search'
      leadIcon={<MagnifyingGlassIcon className='h-5 w-5 text-inherit' />}
    />
  );
}
