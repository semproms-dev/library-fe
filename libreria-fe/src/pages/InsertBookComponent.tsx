import { Button, Select, Group, TextInput, Text, Stack, Box } from '@mantine/core';
import { useForm } from '@mantine/form';

export function InsertBookComponent() {
  /*const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            title: '',
            author: '',

        }
    })*/

  return (
    <Stack gap="md">
      <Group>
        <TextInput label={'Title'} placeholder={'Title...'}></TextInput>
        <Select
          label={'Select Genre'}
          placeholder={'Pick a value'}
          searchable
          data={['Fantasy', 'Science Fiction', 'Biology']}
        ></Select>
      </Group>
      <Group>
        <TextInput label={'Author'} placeholder={'Author'}></TextInput>
        <Select
          label={'Owner'}
          placeholder={'Select an owner'}
          data={['Cristina', 'Luis']}
        ></Select>
      </Group>
      <Group>
        <TextInput label={'Language'} placeholder={'Language'}></TextInput>
        <Select
          label={'Status'}
          placeholder={'Select a status'}
          data={['TBR', 'R', 'WIP', 'HB']}
        ></Select>
      </Group>
      <Group>
        <TextInput label={'Year'} placeholder={'Year'}></TextInput>
        <Select
          label={'Location'}
          placeholder={'Location'}
          searchable
          data={['Office1', 'Office2', 'Office3']}
        ></Select>
      </Group>
      <Box mt="lg" style={{ display: 'flex', justifyContent: 'center' }}>
        <Button color={'#408EE0'}>Search</Button>
      </Box>
    </Stack>
  );
}
