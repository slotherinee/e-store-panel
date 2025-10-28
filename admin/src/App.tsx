import { Admin, EditGuesser, ListGuesser, Resource } from "react-admin";
import { Layout } from "./Layout";
import { authProvider } from "./authProvider";
import { dataProvider } from "./dataProvider";
import { CustomLoginPage } from "./LoginPage";
import { ProductList } from "./products/ProductList";
import { ProductEdit } from "./products/ProductEdit";
import { ProductCreate } from "./products/ProductCreate";
import { ProductShow } from "./products/ProductShow";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";

export const App = () => (
  <Admin
    dataProvider={dataProvider}
    authProvider={authProvider}
    layout={Layout}
    loginPage={CustomLoginPage}
    requireAuth
  >
    <Resource
      name="products"
      list={ProductList}
      edit={ProductEdit}
      create={ProductCreate}
      show={ProductShow}
      icon={ShoppingCartIcon}
      recordRepresentation="name"
    />
    <Resource
      name="users"
      list={ListGuesser}
      edit={EditGuesser}
      icon={PeopleIcon}
      recordRepresentation="name"
    />
  </Admin>
);
