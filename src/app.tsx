import React, { Suspense, lazy, useContext, useEffect } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { PageContext, PageProvider } from "./page-context";
import { ToastContainer } from "react-toastify";
import { addLocale } from "primereact/api";
import { COUNTRIES, ORGANIZATIONS, EMBASSIES, LOCALE_RU } from "./app-consts";
import { getCountries, saveCountries } from "./services/country-service";
import { getEmbassies, saveEmbassies } from "./services/embassy-service";
import { getOrganizations, saveOrganizations } from "./services/organization-service";

const PageFooter = lazy(() => import("./components/page-footer"));
const PageHeader = lazy(() => import("./components/page-header"));
const Home = lazy(() => import("./pages/home"));
const OrganizationList = lazy(() => import("./pages/organization-list"));
const CountryList = lazy(() => import("./pages/country-list"));
const EmbassyList = lazy(() => import("./pages/embassy-list"));
const CountryEditForm = lazy(() => import("./pages/edit-forms/country-edit-form"));
const Organization = lazy(() => import("./pages/organization"));
const OrganizationEditForm = lazy(() => import("./pages/edit-forms/organization-edit-form"));

import "react-toastify/dist/ReactToastify.css";
import "primereact/resources/themes/saga-orange/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "./App.css";


const DevPage: React.FC = () => {
  // const { setTitle } = useContext(PageContext);

  // useEffect(() => {
  //   setTitle("...")
  // }, []);

  return (
    <div className="dev_container">
      Страница находится в разработке...
    </div>
  );
};

const LoadingPage: React.FC = () => {
  // const { setTitle } = useContext(PageContext);

  // useEffect(() => {
  //   setTitle("...")
  // }, []);

  return (
    <div className="loading_container">
      Загрузка...
    </div>
  );
}


const Layout: React.FC = () => (
  <>
    <PageHeader />
    <Outlet />
    <PageFooter />
  </>
);

const App: React.FC = () => {
  useEffect(() => {
    if (!getCountries().length) {
      saveCountries(COUNTRIES);
    }
    if (!getEmbassies().length) {
      saveEmbassies(EMBASSIES);
    }

    if (!getOrganizations().length) {
      saveOrganizations(ORGANIZATIONS);
    }

    addLocale("ru", LOCALE_RU);
  }, []);


  return (
    <Suspense fallback={<LoadingPage />}>
      <PageProvider>
        <ToastContainer />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="country" element={<Outlet />}>
                <Route index element={<CountryList />} />
                <Route path=":id" element={<EmbassyList />} />
                <Route path="edit/:id" element={<CountryEditForm />} />
              </Route>
              <Route path="organization" element={<Outlet />}>
                <Route index element={<OrganizationList />} />
                <Route path=":id" element={<Organization />} />
                <Route path="edit/:id" element={<OrganizationEditForm />} />
              </Route>
              <Route path="*" element={<DevPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </PageProvider>
    </Suspense>
  );
};

export default App;
