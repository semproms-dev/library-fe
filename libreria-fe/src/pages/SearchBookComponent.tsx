import { Button, Select, Group, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

export function SearchBookComponent() {
  /*const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            title: '',
            author: '',

        }
    })*/

  return (
    <div>
      <Select
        label={'Select filtering criteria'}
        placeholder={'Pick a value'}
        data={['author', 'title', 'genre']}
      ></Select>
    </div>
  );
}
