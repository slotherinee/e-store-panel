import {
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  required,
  minValue,
  Toolbar,
  SaveButton,
  DeleteButton,
} from "react-admin";
import { Box } from "@mui/material";

const ProductEditToolbar = () => (
  <Toolbar>
    <SaveButton />
    <Box sx={{ flex: 1 }} />
    <DeleteButton />
  </Toolbar>
);

export const ProductEdit = () => (
  <Edit>
    <SimpleForm toolbar={<ProductEditToolbar />}>
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
      />
      <NumberInput
        source="stock"
        label="Количество на складе"
        validate={[required(), minValue(0)]}
      />
      <TextInput
        source="imageUrl"
        label="URL изображения"
        type="url"
        fullWidth
      />
    </SimpleForm>
  </Edit>
);
