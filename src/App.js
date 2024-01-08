import './App.css';
import Category from './component/Category';
import AddCategory from './component/AddCategory';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from './component/RootLayout';
import Detail from './component/Detail';
import Edit from './component/Edit';
import Login from './component/Login';
import Signup from './component/Signup';
import {isLogin} from '../src/util/CheckAuth';

const router = createBrowserRouter([
  {path:'signup',element:<Signup/>},
  {path:'login', element:<Login/>},
  {path:'',loader:isLogin, element:<RootLayout/>},
 {path:'dashboard',loader:isLogin, element:<RootLayout/>,children:[
  {path:'',element:<Category/>},
  {path:'add-category',element:<AddCategory/>},
  {path:'detail/:id', element:<Detail/>},
  {path:'update/:id',element:<Edit/>}
 ]}
    ])

function App() {
  return (
    <>
            <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
