import {
  Show,
  SimpleShowLayout,
  TextField,
  NumberField,
  DateField,
  ImageField,
} from "react-admin";
import { Box } from "@mui/material";

export const ProductShow = () => (
  <Show>
    <SimpleShowLayout>
      <Box sx={{ mb: 2 }}>
        <ImageField source="imageUrl" label="Изображение" />
      </Box>
      <TextField source="id" label="ID" />
      <TextField source="name" label="Название" />
      <TextField source="description" label="Описание" />
      <NumberField
        source="price"
        label="Цена"
        options={{ style: "currency", currency: "RUB" }}
      />
      <NumberField source="stock" label="Остаток на складе" />
      <DateField source="createdAt" label="Создано" showTime />
      <DateField source="updatedAt" label="Обновлено" showTime />
    </SimpleShowLayout>
  </Show>
);
