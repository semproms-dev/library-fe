import { Button, Select, Group, TextInput, Text, Stack, Box, Container } from '@mantine/core';
import { useForm } from '@mantine/form';
import { modals } from '@mantine/modals';

type Props = {
  component: string;
};

export function GenericBookComponent(props: Props) {
  const isSearch = props.component === 'search';
  /*const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            title: '',
            author: '',

        }
    })*/

  return (
    <Container size="md" style={{ display: 'flex', justifyContent: 'center' }}>
      <Stack gap="md" style={{ width: '100%', maxWidth: '800px' }}>
      <Group grow>
        <TextInput label={'Title'} placeholder={'Title...'}></TextInput>
        <Select
          label={'Select Genre'}
          placeholder={'Pick a value'}
          searchable
          data={['Fantasy', 'Science Fiction', 'Biology']}
        ></Select>
      </Group>
      <Group grow>
        <TextInput label={'Author'} placeholder={'Author'}></TextInput>
        <Select
          label={'Owner'}
          placeholder={'Select an owner'}
          data={['Cristina', 'Luis']}
        ></Select>
      </Group>
      <Group grow>
        <TextInput label={'Language'} placeholder={'Language'}></TextInput>
        <Select
          label={'Status'}
          placeholder={'Select a status'}
          data={['TBR', 'R', 'WIP', 'HB']}
        ></Select>
      </Group>
      <Group grow>
        <TextInput label={'Year'} placeholder={'Year'}></TextInput>
        <Select
          label={'Location'}
          placeholder={'Location'}
          searchable
          data={['Office1', 'Office2', 'Office3']}
        ></Select>
      </Group>
      <Box mt="lg" style={{ display: 'flex', justifyContent: 'center' }}>
        {isSearch ? (
          <Button
            onClick={() => {
              // TODO
            }}
            color={'#408EE0'}
          >
            Search
          </Button>
        ) : (
          <Button
            onClick={() => {
              console.log('Hola');
              modals.openConfirmModal({
                title: 'Are you sure you want to insert this book?',
                centered: true,
                children: (
                  <Text size="sm" c="dimmed">
                    This action is so important that you are required to confirm it with a modal.
                    Please click one of these buttons to proceed.
                  </Text>
                ),
                labels: { confirm: 'Confirm', cancel: 'Cancel' },
                confirmProps: { color: 'blue' },
                onConfirm: () => {
                  console.log('Confirmed');
                },
                onCancel: () => {
                  console.log('Cancelled');
                },
              });
            }}
            color={'#408EE0'}
          >
            Insert book
          </Button>
        )}
      </Box>
      </Stack>
    </Container>
  );
}
