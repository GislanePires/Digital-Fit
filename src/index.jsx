import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./Global.css";
import Login from "./pages/Login/index";
import { ThemeContextProvider } from "./context/ThemeContext";
import Home from "./pages/Home";
import UserPage from "./pages/UserPage/index";
import Register from "./pages/Register";
import Carousel from "./pages/Carousel/index";
import { ObjetivosProvider } from "./context/ObjetivosContext";
import TreinosFiltrados from "./pages/TreinosFiltrados";
import AvaliacaoSimplificada from "./pages/AvaliacaoSimplificada";
import Imc from "./pages/IMC/index";
import Auditoria from "./pages/Auditoria";
import TermoResponsabilidade from "./pages/TermoResposabilidade/index";
import Medidas from "./pages/Medidas/index";
import ParQ from "./pages/ParQ";
import { TreinoProvider } from "./context/TreinoContext";
import TreinoEspecifico from "./pages/TreinoEspecifico";
import MinhasInfos from "./pages/MinhasInfos";
import MeusTreinos from "./pages/MeusTreinos";
import MeuTreino from "./pages/MeuTreino";
import ValidacaoParQ from "./pages/ValidacaoParQ";
import ListarUsuarios from "./pages/ListarUsuarios";
import CrudObjetivo from "./pages/CrudObjetivo";
import CrudExercicio from "./pages/CrudExercicio";
import Receitas from "./pages/Receitas";
import CadastroDePerfil from "./pages/CadastroDePerfil";
import PageNotFound from "./pages/PageNotFound";
import ListarObjetivos from "./pages/ListarObjetivos";
import ListarExercicios from "./pages/ListarExercicios";
import CrudTipoDeficiencia from "./pages/CrudTipoDeficiencia";
import ListarDeficiencias from "./pages/ListarDeficiencias";
const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/user-page",
    element: <UserPage />,
  },
  {
    path: "/registro",
    element: <Register />,
  },
  {
    path: "/registro/:id",
    element: <Register />,
  },
  {
    path: "/carousel",
    element: <Carousel />,
  },
  {
    path: "/imc",
    element: <Imc />,
  },
  {
    path: "/treinos",
    element: <TreinosFiltrados />,
  },
  {
    path: "/medidas",
    element: <Medidas />,
  },
  {
    path: "/avaliacao",
    element: <AvaliacaoSimplificada />,
  },
  {

    path: "/auditoria",
    element: <Auditoria />,
  },

    {
    path: "/termo",
    element: <TermoResponsabilidade />,
  },
  {
    path: "/parq",
    element: <ParQ />,
  },
  {
    path: "/treino-escolhido",
    element: <TreinoEspecifico />,
  },
  {
    path: "/minhas-infos",
    element: <MinhasInfos />,
  },
  {
    path: "/meus-treinos",
    element: <MeusTreinos />,
  },
  {
    path: "/treino",
    element: <MeuTreino />,
  },
  {
    path: "/validacao/parq",
    element: <ValidacaoParQ />,
  },
  {
    path: "/listar/usuarios",
    element: <ListarUsuarios />,
  },
  {
    path: "/crud-objetivo",
    element: <CrudObjetivo />,
  },
  {
    path: "/crud-objetivo/:id",
    element: <CrudObjetivo />,
  },
  {
    path: "/crud-exercicio",
    element: <CrudExercicio />,
  },
  {
    path: "/crud-exercicio/:id",
    element: <CrudExercicio />,
  },
  {
    path: "/receitas",
    element: <Receitas />,
  },
  {
    path: "/cadastrodeperfil",
    element: <CadastroDePerfil />,
  },
  {
    path: "/*",
    element: <PageNotFound />,
  },
  {
    path: "/listar/Objetivos",
    element: <ListarObjetivos />,
  },
  {
    path: "/listar/Exercicios",
    element: <ListarExercicios />,
  },
  {
    path: "/crud-tipoDeficiencia",
    element: <CrudTipoDeficiencia />,
  },
  {
    path: "/crud-tipoDeficiencia/:id",
    element: <CrudTipoDeficiencia />,
  },
  {
    path: "/listar/Deficiencias",
    element: <ListarDeficiencias />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeContextProvider>
      <ObjetivosProvider>
        <TreinoProvider>
          <RouterProvider router={router} />
        </TreinoProvider>
      </ObjetivosProvider>
    </ThemeContextProvider>
  </React.StrictMode>
);
