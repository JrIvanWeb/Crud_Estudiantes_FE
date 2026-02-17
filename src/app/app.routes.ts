import { Routes } from '@angular/router';
import { Lista } from './component/lista/lista';
import { Editar } from './component/editar/editar';
import { Detalles } from './component/detalles/detalles';
import { Header } from './component/header/header';
import { Agregar } from './component/agregar/agregar';
import { Footer } from './component/footer/footer';
import { Login } from './component/login/login';


export const routes: Routes = [
  { path: 'agregar', component: Agregar },
  { path: 'lista', component: Lista },
  { path: 'editar/:id', component: Editar },
  { path: 'detalles/:id', component: Detalles },
  { path: 'header', component: Header },
  { path: 'footer', component: Footer },
  { path: 'login', component: Login },
];

