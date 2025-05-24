import React, { useContext, useEffect, useRef, useState } from "react";
import { DEFAULT_COUNTRY, DEFAULT_EMBASSY } from "app-consts";
import { Country } from "interfaces/country";
import { Embassy } from "interfaces/embassy";
import { PageContext } from "page-context";
import { Toast } from "primereact/toast";
import { useNavigate, useParams } from "react-router";
import {
  addCountry,
  deleteCountry,
  generateCountryId,
  getCountries,
  updateCountry,
} from "services/country-service";
import {
  addEmbassy,
  deleteEmbassy,
  generateEmbassyId,
  getEmbassies,
  updateEmbassy,
} from "services/embassy-service";
import CountryEditBlock from "./country-edit-block";
import CountryEditFormToolbar from "./country-edit-form-toolbar";
import EmbassyEditBlock from "./embassy-edit-block";
import * as styles from "styles/country-edit-form.module.css";
import TradeMissionEditBlock from "./trade-mission-edit-block";
import { TradeMission } from "interfaces/trade-mission";
import { deleteDocument, deleteTradeMission, generateDocumentId, generateTradeMissionId, getTradeMissionDocuments, getTradeMissions, saveTradeMissionDocuments, saveTradeMissions, updateDocument, updateTradeMission } from "services/trade-mission-service";
import { TradeMissionDocument } from "interfaces/trade-mission-document";

const CountryEditForm: React.FC = () => {

  const { setTitle, setBreadcrumbs } = useContext(PageContext);

  const { id } = useParams();

  const navigate = useNavigate();

  const toast = useRef<Toast>(null);

  const [countries, setCountries] = useState<Country[]>([]);

  const [country, setCountry] = useState<Country>(DEFAULT_COUNTRY);
  const [homeEmbassy, setHomeEmbassy] = useState<Embassy>(DEFAULT_EMBASSY);
  const [foreignEmbassy, setForeignEmbassy] = useState<Embassy>(DEFAULT_EMBASSY);

  const [tradeMissions, setTradeMissions] = useState<TradeMission[]>([]);
  const [tradeMissionDocuments, setTradeMissionDocuments] = useState<TradeMissionDocument[]>([]);

  const [tradeMissionLoading, setTradeMissionLoading] = useState<boolean>(true);
  const [tradeMissionDocumentLoading, setTradeMissionDocumentLoading] = useState<boolean>(true);

  const [countryErrors, setCountryErrors] = useState<Partial<Record<keyof Country, string>>>({});
  const [homeEmbassyErrors, setHomeEmbassyErrors] = useState<Partial<Record<keyof Embassy, string>>>({});
  const [foreignEmbassyErrors, setForeignEmbassyErrors] = useState<Partial<Record<keyof Embassy, string>>>({});

  useEffect(() => {
    setTradeMissionLoading(true);
    setTradeMissionDocumentLoading(true);

    const _countries = getCountries();
    const _embassies = getEmbassies();
    const _tradeMissions = getTradeMissions();
    const _tradeMissionDocuments = getTradeMissionDocuments();

    setCountries(_countries)

    if (id === "new") {
      setCountry(DEFAULT_COUNTRY);
      setHomeEmbassy(DEFAULT_EMBASSY);
      setForeignEmbassy(DEFAULT_EMBASSY);
      setTradeMissions([])
      setTradeMissionDocuments([])
      setTitle("Новая страна, Форма редактирования");
      setBreadcrumbs([{ label: "Новая страна, Форма редактирования", url: `country/edit/new` }]);
    } else {
      const _country = _countries.find((_) => _.id === Number(id)) ?? DEFAULT_COUNTRY;
      const _countryEmbassies = _embassies.filter((_) => _.countryId === _country.id);
      const _countryTradeMissions = _tradeMissions.filter((_) => _.countryId === _country.id);
      const _countryTradeMissionDocuments = _tradeMissionDocuments.filter((_) => _.countryId === _country.id);

      setCountry(_country);
      setHomeEmbassy(_countryEmbassies[0] || DEFAULT_EMBASSY);
      setForeignEmbassy(_countryEmbassies[1] || DEFAULT_EMBASSY);
      setTradeMissions(_countryTradeMissions || [])
      setTradeMissionDocuments(_countryTradeMissionDocuments || [])
      setTitle(`${_country?.name || "Страна"}, Форма редактирования`);
      setBreadcrumbs([{ label: `${_country?.name || "Страна"}, Форма редактирования`, url: `country/edit/${id}` }]);
    }

    setTradeMissionLoading(false);
    setTradeMissionDocumentLoading(false);
  }, [id]);

  const handleSave = () => {
    const newCountryErrors: Partial<Record<keyof Country, string>> = {};

    if (!country?.name) {
      newCountryErrors.name = "Наименование страны обязательно к заполнению.";
    }
    if (!country?.flagUrl) {
      newCountryErrors.flagUrl = "Фото флага обязателено.";
    }

    const newHomeEmbassyErrors: Partial<Record<keyof Embassy, string>> = {};

    if (!homeEmbassy?.embassyName) {
      newHomeEmbassyErrors.embassyName = "Наименование обязательно к заполнению.";
    }
    if (!homeEmbassy?.embassyAddress) {
      newHomeEmbassyErrors.embassyAddress = "Адрес обязателен к заполнению.";
    }
    if (!homeEmbassy?.embassyPhotoUrl) {
      newHomeEmbassyErrors.embassyPhotoUrl = "Фото посольства обязателено.";
    }
    if (!homeEmbassy?.embassyPhone) {
      newHomeEmbassyErrors.embassyPhone = "Телефон обязателен к заполнению.";
    }
    if (!homeEmbassy?.embassyWorkHours) {
      newHomeEmbassyErrors.embassyWorkHours = "Часы работы обязательны к заполнению.";
    }
    if (!homeEmbassy?.embassyFax) {
      newHomeEmbassyErrors.embassyFax = "Факс обязателен к заполнению.";
    }
    if (!homeEmbassy?.embassyWebsite) {
      newHomeEmbassyErrors.embassyWebsite = "Веб-сайт обязателен к заполнению.";
    }
    if (!homeEmbassy?.embassyEmail) {
      newHomeEmbassyErrors.embassyEmail = "Почта обязателена к заполнению.";
    }

    if (!homeEmbassy?.ambassadorName) {
      newHomeEmbassyErrors.ambassadorName = "ФИО посла обязательно к заполнению.";
    }
    if (!homeEmbassy?.ambassadorJobTitle) {
      newHomeEmbassyErrors.ambassadorJobTitle = "Должность посла обязательна к заполнению.";
    }
    if (!homeEmbassy?.ambassadorPhotoUrl) {
      newHomeEmbassyErrors.ambassadorPhotoUrl = "Фото посла обязателено.";
    }

    const newForeignEmbassyErrors: Partial<Record<keyof Embassy, string>> = {};

    if (!foreignEmbassy?.embassyName) {
      newForeignEmbassyErrors.embassyName = "Наименование обязательно к заполнению.";
    }
    if (!foreignEmbassy?.embassyAddress) {
      newForeignEmbassyErrors.embassyAddress = "Адрес обязателен к заполнению.";
    }
    if (!foreignEmbassy?.embassyPhotoUrl) {
      newForeignEmbassyErrors.embassyPhotoUrl = "Фото посольства обязателено.";
    }
    if (!foreignEmbassy?.embassyPhone) {
      newForeignEmbassyErrors.embassyPhone = "Телефон обязателен к заполнению.";
    }
    if (!foreignEmbassy?.embassyWorkHours) {
      newForeignEmbassyErrors.embassyWorkHours = "Часы работы обязательны к заполнению.";
    }
    if (!foreignEmbassy?.embassyFax) {
      newForeignEmbassyErrors.embassyFax = "Факс обязателен к заполнению.";
    }
    if (!foreignEmbassy?.embassyWebsite) {
      newForeignEmbassyErrors.embassyWebsite = "Веб-сайт обязателен к заполнению.";
    }
    if (!foreignEmbassy?.embassyEmail) {
      newForeignEmbassyErrors.embassyEmail = "Почта обязателена к заполнению.";
    }

    if (!foreignEmbassy?.ambassadorName) {
      newForeignEmbassyErrors.ambassadorName = "ФИО посла обязательно к заполнению.";
    }
    if (!foreignEmbassy?.ambassadorJobTitle) {
      newForeignEmbassyErrors.ambassadorJobTitle = "Должность посла обязательна к заполнению.";
    }
    if (!foreignEmbassy?.ambassadorPhotoUrl) {
      newForeignEmbassyErrors.ambassadorPhotoUrl = "Фото посла обязательно.";
    }

    setCountryErrors(newCountryErrors);
    setHomeEmbassyErrors(newHomeEmbassyErrors);
    setForeignEmbassyErrors(newForeignEmbassyErrors);

    if (
      Object.keys(newCountryErrors).length > 0 ||
      Object.keys(newHomeEmbassyErrors).length > 0 ||
      Object.keys(newForeignEmbassyErrors).length > 0
    ) {
      toast.current?.show({
        severity: "error",
        summary: "Ошибка валидации",
        detail: "Проверьте список ошибок",
        life: 3000,
      });
      return;
    }

    let countryId = country.id;

    if (country.id === 0) {
      countryId = generateCountryId();
      const newCountry: Country = { ...country, id: countryId };
      addCountry(newCountry);
    } else {
      updateCountry(country);
    }

    if (homeEmbassy.id === 0) {
      const newHomeEmbassy: Embassy = {
        ...homeEmbassy,
        id: generateEmbassyId(),
        countryId,
      };
      addEmbassy(newHomeEmbassy);
    } else {
      const updatedHomeEmbassy: Embassy = { ...homeEmbassy, countryId };
      updateEmbassy(updatedHomeEmbassy);
    }

    if (foreignEmbassy.id === 0) {
      const newForeignEmbassy: Embassy = {
        ...foreignEmbassy,
        id: generateEmbassyId(),
        countryId,
      };
      addEmbassy(newForeignEmbassy);
    } else {
      const updatedForeignEmbassy: Embassy = { ...foreignEmbassy, countryId };
      updateEmbassy(updatedForeignEmbassy);
    }

    const otherMissions = getTradeMissions().filter(_ => _.countryId !== country.id)
    const saveMissions = tradeMissions.map(mission => {
      const tradeMissionId = mission.id === 0 ? generateTradeMissionId() : mission.id;

      return {
        ...mission,
        id: tradeMissionId,
        countryId: country.id,
      }
    });

    saveTradeMissions([...otherMissions, ...saveMissions])

    const otherDocuments = getTradeMissionDocuments().filter(_ => _.countryId !== country.id)
    const saveDocuments = tradeMissionDocuments.map(document => {
      return { ...document, id: document.id === 0 ? generateDocumentId() : document.id }
    });

    saveTradeMissionDocuments([...otherDocuments, ...saveDocuments])

    const _country = getCountries().find((_) => _.id === countryId);
    const _embassies = getEmbassies().filter((_) => _.countryId === countryId);
    const _tradeMissions = getTradeMissions().filter((_) => _.countryId === countryId);
    const _tradeMissionDocuments = getTradeMissionDocuments().filter((_) => _.countryId === countryId);

    setCountry(_country || DEFAULT_COUNTRY);
    setHomeEmbassy(_embassies[0] || DEFAULT_EMBASSY);
    setForeignEmbassy(_embassies[1] || DEFAULT_EMBASSY);
    setTradeMissions(_tradeMissions || [])
    setTradeMissionDocuments(_tradeMissionDocuments || [])

    toast.current?.show({
      severity: "success",
      summary: "Сохранено",
      detail: "Данные успешно сохранены.",
      life: 3000,
    });

    if (id === "new") {
      navigate(`/country/edit/${countryId}`);
    }
  };

  const handleCancel = () => {
    // toast.current?.show({
    //   severity: 'success',
    //   summary: 'Отмена',
    //   detail: 'Изменения отменены.',
    //   life: 3000,
    // });

    window.location.reload();
  };

  const handleDelete = () => {
    if (country.id !== 0) {
      deleteCountry(country.id);
    }
    if (homeEmbassy.id !== 0) {
      deleteEmbassy(homeEmbassy.id);
    }
    if (foreignEmbassy.id !== 0) {
      deleteEmbassy(foreignEmbassy.id);
    }

    if (tradeMissions.length) {
      tradeMissions.forEach(mission => {
        deleteTradeMission(mission.id);
      });
    }

    if (tradeMissionDocuments.length) {
      tradeMissionDocuments.forEach(document => {
        deleteDocument(document.id);
      });
    }

    toast.current?.show({
      severity: "success",
      summary: "Удалено",
      detail: "Данные удалены.",
      life: 3000,
    });

    navigate("/country/edit/new");
  };

  const handleCountryChange = (field: keyof Country, value: string | File) => {
    setCountry({ ...country, [field]: value });
  };

  const handleEmbassyChange = (setEmbassy: React.Dispatch<React.SetStateAction<Embassy>>) =>
    (field: keyof Embassy, value: string) => {
      setEmbassy((prev) => ({ ...prev, [field]: value }));
    };

  const handleChangeCountryId = (countryId: number | string) => {
    if (countryId === "new") {
      navigate("/country/edit/new");
    }

    navigate(`/country/edit/${countryId}`);
  };

  const handleChangeTradeMissions = (missions: TradeMission[]) => {
    setTradeMissions(missions);
  };

  const handleChangeTradeMissionDocuments = (documents: TradeMissionDocument[]) => {
    setTradeMissionDocuments(documents);
  };

  return (
    <div className={styles.container}>
      <Toast ref={toast} />
      <CountryEditFormToolbar
        countries={countries}
        handleCountryId={handleChangeCountryId}
        countryId={id ?? "new"}
        onSave={handleSave}
        onCancel={handleCancel}
        onDelete={handleDelete} />
      <CountryEditBlock
        country={country}
        onChange={handleCountryChange}
        errors={countryErrors} />
      <EmbassyEditBlock
        formTitle="Посольство Российской Федерации"
        embassy={homeEmbassy}
        onChange={handleEmbassyChange(setHomeEmbassy)}
        errors={homeEmbassyErrors} />
      <EmbassyEditBlock
        formTitle="Посольство иностранного государства"
        embassy={foreignEmbassy}
        onChange={handleEmbassyChange(setForeignEmbassy)}
        errors={foreignEmbassyErrors} />
      <TradeMissionEditBlock
        tradeMissions={tradeMissions}
        tradeMissionDocuments={[]}
        tradeMissionLoading={tradeMissionLoading}
        tradeMissionDocumentLoading={tradeMissionDocumentLoading}
        onChangeTradeMissions={handleChangeTradeMissions}
        onChangeTradeMissionDocuments={handleChangeTradeMissionDocuments} />
    </div>
  );
};

export default CountryEditForm;