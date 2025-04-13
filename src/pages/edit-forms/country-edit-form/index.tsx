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

const CountryEditForm: React.FC = () => {

  const { setTitle, setBreadcrumbs } = useContext(PageContext);

  const { id } = useParams();

  const navigate = useNavigate();

  const toast = useRef<Toast>(null);

  const [countries, setCountries] = useState<Country[]>([]);

  const [country, setCountry] = useState<Country>(DEFAULT_COUNTRY);
  const [homeEmbassy, setHomeEmbassy] = useState<Embassy>(DEFAULT_EMBASSY);
  const [foreignEmbassy, setForeignEmbassy] = useState<Embassy>(DEFAULT_EMBASSY);

  const [countryErrors, setCountryErrors] = useState<Partial<Record<keyof Country, string>>>({});
  const [homeEmbassyErrors, setHomeEmbassyErrors] = useState<Partial<Record<keyof Embassy, string>>>({});
  const [foreignEmbassyErrors, setForeignEmbassyErrors] = useState<Partial<Record<keyof Embassy, string>>>({});

  useEffect(() => {
    const _countries = getCountries();
    const _embassies = getEmbassies();

    setCountries(_countries)
    if (id === "new") {
      setCountry(DEFAULT_COUNTRY);
      setHomeEmbassy(DEFAULT_EMBASSY);
      setForeignEmbassy(DEFAULT_EMBASSY);
      setTitle("Новая страна, Форма редактирования");
      setBreadcrumbs([
        { label: "Страны", url: `/country` },
        { label: `Форма создания`, url: `/country/edit/new` },
      ]);
    } else {
      const _country = _countries.find((_) => _.id === Number(id)) ?? DEFAULT_COUNTRY;
      const _countryEmbassies = _embassies.filter((_) => _.countryId === _country.id);

      setCountry(_country);
      setHomeEmbassy(_countryEmbassies[0] || DEFAULT_EMBASSY);
      setForeignEmbassy(_countryEmbassies[1] || DEFAULT_EMBASSY);

      setTitle(`${_country?.name || "Страна"}, Форма редактирования`);
      setBreadcrumbs([
        { label: "Страны", url: `/country` },
        { label: `${_country?.name || "Посольства"}`, url: `/country/${id}` },
        { label: `Форма редактирования`, url: `/country/edit/${id}` },
      ]);
    }
  }, [id]);

  const handleSave = () => {
    const newCountryErrors: Partial<Record<keyof Country, string>> = {};

    if (!country.name.trim()) {
      newCountryErrors.name = "Наименование страны обязательно для заполнения.";
    }
    if (!country.flagUrl.trim()) {
      newCountryErrors.flagUrl = "URL флага обязателен для заполнения.";
    }

    const newHomeEmbassyErrors: Partial<Record<keyof Embassy, string>> = {};

    if (!homeEmbassy.embassyName.trim()) {
      newHomeEmbassyErrors.embassyName = "Наименование обязательно.";
    }
    if (!homeEmbassy.embassyAddress.trim()) {
      newHomeEmbassyErrors.embassyAddress = "Адрес обязателен.";
    }
    if (!homeEmbassy.embassyPhotoUrl.trim()) {
      newHomeEmbassyErrors.embassyPhotoUrl = "URL фото обязателен.";
    }
    if (!homeEmbassy.embassyPhone.trim()) {
      newHomeEmbassyErrors.embassyPhone = "Телефон обязателен.";
    }
    if (!homeEmbassy.embassyWorkHours.trim()) {
      newHomeEmbassyErrors.embassyWorkHours = "Часы работы обязательны.";
    }
    if (!homeEmbassy.embassyFax.trim()) {
      newHomeEmbassyErrors.embassyFax = "Факс обязателен.";
    }
    if (!homeEmbassy.embassyWebsite.trim()) {
      newHomeEmbassyErrors.embassyWebsite = "Веб-сайт обязателен.";
    }
    if (!homeEmbassy.embassyEmail.trim()) {
      newHomeEmbassyErrors.embassyEmail = "Email обязателен.";
    }
    // else {
    //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //   if (!emailRegex.test(homeEmbassy.embassyEmail.trim())) {
    //     newHomeEmbassyErrors.embassyEmail = "Неверный формат email.";
    //   }
    // }
    if (!homeEmbassy.ambassadorName.trim()) {
      newHomeEmbassyErrors.ambassadorName = "ФИО посла обязательно.";
    }
    if (!homeEmbassy.ambassadorJobTitle.trim()) {
      newHomeEmbassyErrors.ambassadorJobTitle = "Должность посла обязательна.";
    }
    if (!homeEmbassy.ambassadorPhotoUrl.trim()) {
      newHomeEmbassyErrors.ambassadorPhotoUrl = "URL фото посла обязателен.";
    }

    const newForeignEmbassyErrors: Partial<Record<keyof Embassy, string>> = {};

    if (!foreignEmbassy.embassyName.trim()) {
      newForeignEmbassyErrors.embassyName = "Наименование обязательно.";
    }
    if (!foreignEmbassy.embassyAddress.trim()) {
      newForeignEmbassyErrors.embassyAddress = "Адрес обязателен.";
    }
    if (!foreignEmbassy.embassyPhotoUrl.trim()) {
      newForeignEmbassyErrors.embassyPhotoUrl = "URL фото обязателен.";
    }
    if (!foreignEmbassy.embassyPhone.trim()) {
      newForeignEmbassyErrors.embassyPhone = "Телефон обязателен.";
    }
    if (!foreignEmbassy.embassyWorkHours.trim()) {
      newForeignEmbassyErrors.embassyWorkHours = "Часы работы обязательны.";
    }
    if (!foreignEmbassy.embassyFax.trim()) {
      newForeignEmbassyErrors.embassyFax = "Факс обязателен.";
    }
    if (!foreignEmbassy.embassyWebsite.trim()) {
      newForeignEmbassyErrors.embassyWebsite = "Веб-сайт обязателен.";
    }
    if (!foreignEmbassy.embassyEmail.trim()) {
      newForeignEmbassyErrors.embassyEmail = "Email обязателен.";
    }
    // else {
    //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //   if (!emailRegex.test(foreignEmbassy.embassyEmail.trim())) {
    //     newForeignEmbassyErrors.embassyEmail = "Неверный формат email.";
    //   }
    // }
    if (!foreignEmbassy.ambassadorName.trim()) {
      newForeignEmbassyErrors.ambassadorName = "ФИО посла обязательно.";
    }
    if (!foreignEmbassy.ambassadorJobTitle.trim()) {
      newForeignEmbassyErrors.ambassadorJobTitle = "Должность посла обязательна.";
    }
    if (!foreignEmbassy.ambassadorPhotoUrl.trim()) {
      newForeignEmbassyErrors.ambassadorPhotoUrl = "URL фото посла обязателен.";
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

    if (id === "new" || country.id === 0) {
      countryId = generateCountryId();
      const newCountry: Country = { ...country, id: countryId };
      addCountry(newCountry);
    } else {
      updateCountry(country);
    }

    if (homeEmbassy.embassyId === 0) {
      const newHomeEmbassy: Embassy = {
        ...homeEmbassy,
        embassyId: generateEmbassyId(),
        countryId,
      };
      addEmbassy(newHomeEmbassy);
    } else {
      const updatedHomeEmbassy: Embassy = { ...homeEmbassy, countryId };
      updateEmbassy(updatedHomeEmbassy);
    }

    if (foreignEmbassy.embassyId === 0) {
      const newForeignEmbassy: Embassy = {
        ...foreignEmbassy,
        embassyId: generateEmbassyId(),
        countryId,
      };
      addEmbassy(newForeignEmbassy);
    } else {
      const updatedForeignEmbassy: Embassy = { ...foreignEmbassy, countryId };
      updateEmbassy(updatedForeignEmbassy);
    }

    const _country = getCountries().find((_) => _.id === countryId);
    const _embassies = getEmbassies().filter((_) => _.countryId === countryId);

    setCountry(_country || DEFAULT_COUNTRY);
    setHomeEmbassy(_embassies[0] || DEFAULT_EMBASSY);
    setForeignEmbassy(_embassies[1] || DEFAULT_EMBASSY);

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
    toast.current?.show({
      severity: 'success',
      summary: 'Отмена',
      detail: 'Изменения отменены.',
      life: 3000,
    });

    window.location.reload();
  };

  const handleDelete = () => {
    if (country.id !== 0) {
      deleteCountry(country.id);
    }
    if (homeEmbassy.embassyId !== 0) {
      deleteEmbassy(homeEmbassy.embassyId);
    }
    if (foreignEmbassy.embassyId !== 0) {
      deleteEmbassy(foreignEmbassy.embassyId);
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

  const handleEmbassyChange =
    (setEmbassy: React.Dispatch<React.SetStateAction<Embassy>>) =>
      (field: keyof Embassy, value: string) => {
        setEmbassy((prev) => ({ ...prev, [field]: value }));
      };

  const handleChangeCountryId = (countryId: number | string) => {
    if (countryId === "new") {
      navigate("/country/edit/new");
    }

    navigate(`/country/edit/${countryId}`);
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
        onDelete={handleDelete}
      />
      <div className={styles.forms}>
        <CountryEditBlock
          country={country}
          onChange={handleCountryChange}
          errors={countryErrors}
        />
        <EmbassyEditBlock
          formTitle="Посольство Российской Федерации"
          embassy={homeEmbassy}
          onChange={handleEmbassyChange(setHomeEmbassy)}
          errors={homeEmbassyErrors}
        />
        <EmbassyEditBlock
          formTitle="Посольство иностранного государства"
          embassy={foreignEmbassy}
          onChange={handleEmbassyChange(setForeignEmbassy)}
          errors={foreignEmbassyErrors}
        />
      </div>
    </div>
  );
};

export default CountryEditForm;
