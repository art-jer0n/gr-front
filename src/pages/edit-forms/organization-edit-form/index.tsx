import React, { useContext, useEffect, useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { useNavigate, useParams } from "react-router";
import { DEFAULT_OGRANIZATION } from "app-consts";
import { Organization } from "interfaces/organization";
import { PageContext } from "page-context";
import {
  addOrganization,
  deleteOrganization,
  generateOrganizationId,
  getOrganizations,
  updateOrganization,
} from "services/organization-service";
import OrganizationEditFormToolbar from "./organization-edit-form-toolbar";
import OrganizationEditBlock from "./organization-edit-block";
import * as styles from "styles/organization-edit-form.module.css";

const OrganizationEditForm: React.FC = () => {

  const { setTitle, setBreadcrumbs } = useContext(PageContext);

  const { id } = useParams();

  const navigate = useNavigate();

  const toast = useRef<Toast>(null);

  const [organizations, setOrganizations] = useState<Organization[]>([]);

  const [organization, setOrganization] = useState<Organization>(DEFAULT_OGRANIZATION);

  const [error, setErrors] = useState<Partial<Record<keyof Organization, string>>>({});

  useEffect(() => {
    const _organizations = getOrganizations();

    setOrganizations(_organizations);

    if (id === "new") {
      setOrganization(DEFAULT_OGRANIZATION)
      setTitle("Новая организация, Форма редактирования");
      setBreadcrumbs([
        {
          label: "Международные организации",
          url: `/organization`,
        },
        {
          label: `Форма создания`,
          url: `/organization/edit/new`,
        },
      ]);
    } else {
      const _organization = _organizations.find((_) => _.id === Number(id)) ?? DEFAULT_OGRANIZATION;
      setOrganization(_organization);
      setTitle(`${_organization?.name || "Организация"}, Форма редактирования`);
      setBreadcrumbs([
        {
          label: "Международные организации",
          url: `/organization`,
        },
        {
          label: `${_organization?.name || "Организация"}`,
          url: `/organization/${id}`,
        },
        {
          label: `Форма редактирования`,
          url: `/organization/edit/${id}`,
        },
      ]);
    }
  }, [id]);

  const handleSave = () => {
    const newErrors: Partial<Record<keyof Organization, string>> = {};
    if (!organization.name.trim()) {
      newErrors.name = "Наименование обязательно для заполнения.";
    }
    if (!organization.shortName.trim()) {
      newErrors.shortName = "Сокращенное наименование обязательно для заполнения.";
    }
    if (!organization.logoUrl.trim()) {
      newErrors.logoUrl = "Логотип обязателен для заполнения.";
    }
    if (!organization.pdfUrl.trim()) {
      newErrors.pdfUrl = "PDF описание обязательно для заполнения.";
    }
    if (!organization.pptxUrl.trim()) {
      newErrors.pptxUrl = "PPTX описание обязательно для заполнения.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast.current?.show({
        severity: "error",
        summary: "Ошибка валидации",
        detail: "Проверьте список ошибок",
        life: 3000,
      });
      return;
    }

    let organizationId = organization.id;

    if (id === "new" || organization.id === 0) {
      organizationId = generateOrganizationId();
      const newOrganization: Organization = { ...organization, id: organizationId, };
      addOrganization(newOrganization);
    } else {
      updateOrganization(organization);
    }

    const _organization = getOrganizations().find((_) => _.id === organizationId) ?? DEFAULT_OGRANIZATION;

    setOrganization(_organization);

    toast.current?.show({
      severity: "success",
      summary: "Сохранено",
      detail: "Данные успешно сохранены.",
      life: 3000,
    });

    if (id === "new") {
      navigate(`/organization-edit-form/${organizationId}`);
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
    if (organization.id !== 0) {
      deleteOrganization(organization.id);
    }
    toast.current?.show({
      severity: "success",
      summary: "Удалено",
      detail: "Данные удалены.",
      life: 3000,
    });
    navigate("/organization/new");
  };

  const handleCountryChange = (field: keyof Organization, value: string | File) => {
    setOrganization({ ...organization, [field]: value });
  };

  const handledChangeOrganizationId = (organizationId: number | string) => {
    if (organizationId === "new") {
      navigate("/organization/edit/new");
    }

    navigate(`/organization/edit/${organizationId}`);
  };

  return (
    <div className={styles.container}>
      <Toast ref={toast} />
      <OrganizationEditFormToolbar
        organizationId={id ?? "new"}
        handledChangeOrganizationId={handledChangeOrganizationId}
        organizations={organizations}
        onSave={handleSave}
        onCancel={handleCancel}
        onDelete={handleDelete} />
      <div className={styles.forms}>
        <OrganizationEditBlock
          toast={toast}
          organization={organization}
          onChange={handleCountryChange}
          errors={error}
        />
      </div>
    </div>
  );
};

export default OrganizationEditForm;
