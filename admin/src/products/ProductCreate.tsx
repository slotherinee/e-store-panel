import {
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
  required,
  minValue,
} from "react-admin";

export const ProductCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput
        source="name"
        label="Название"
        validate={[required()]}
        fullWidth
      />
      <TextInput
        source="description"
        label="Описание"
        multiline
        rows={4}
        fullWidth
      />
      <NumberInput
        source="price"
        label="Цена (₽)"
        validate={[required(), minValue(0)]}
        defaultValue={0}
      />
      <NumberInput
        source="stock"
        label="Количество на складе"
        validate={[required(), minValue(0)]}
        defaultValue={0}
      />
      <TextInput
        source="imageUrl"
        label="URL изображения"
        type="url"
        fullWidth
      />
    </SimpleForm>
  </Create>
);
