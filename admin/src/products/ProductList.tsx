import {
  List,
  Datagrid,
  TextField,
  NumberField,
  DateField,
  EditButton,
  DeleteButton,
  ImageField,
  SearchInput,
  FilterButton,
  CreateButton,
  TopToolbar,
} from "react-admin";

const ProductListActions = () => (
  <TopToolbar>
    <FilterButton />
    <CreateButton />
  </TopToolbar>
);

const productFilters = [
  <SearchInput key="q" source="q" alwaysOn placeholder="Поиск товаров" />,
];

export const ProductList = () => (
  <List
    filters={productFilters}
    actions={<ProductListActions />}
    sort={{ field: "createdAt", order: "DESC" }}
  >
    <Datagrid>
      <ImageField source="imageUrl" label="Изображение" />
      <TextField source="name" label="Название" />
      <TextField source="description" label="Описание" />
      <NumberField
        source="price"
        label="Цена"
        options={{ style: "currency", currency: "RUB" }}
      />
      <NumberField source="stock" label="Остаток" />
      <DateField source="createdAt" label="Создано" showTime />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);
