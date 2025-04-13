import React, { useContext, useEffect, useState } from "react";
import { PageContext } from "page-context";
import { useNavigate, useParams } from "react-router";
import PdfViewer from "../../components/pdf-viewer";
import { getOrganizations } from "../../services/organization-service";
import * as styles from "styles/embassy-list.module.css";
import { PdfToolbarItem } from "components/pdf-viewer/pdf-viewer-toolbar/pdf-toolbar-item";

const Organization: React.FC = () => {
  // const navigate = useNavigate();

  const { setTitle, setBreadcrumbs } = useContext(PageContext);

  const { id } = useParams();

  const [organization, setOrganization] = useState(getOrganizations().find((o) => Number(id) === o.id));

  useEffect(() => {
    const _organizations = getOrganizations();
    const _organization = _organizations.find((_) => Number(id) === _.id);

    setOrganization(_organization);
    setTitle(`${_organization?.name}`);
    setBreadcrumbs([
      { label: "Международные организации", url: `/organization`, },
      { label: `${_organization?.name}`, url: `/organization/${_organization?.name}`, },
    ]);
  }, [setTitle]);

  const handleDownloadPDF = () => {
    if (organization?.pdfUrl) {
      const url = organization.pdfUrl;
      const link = document.createElement("a");
      link.href = url;
      link.download = `${organization.name}.pdf`;
      link.click();
    }
  };

  const toolbarItems: PdfToolbarItem[] = [
    {
      label: "Скачать PDF",
      icon: "pi pi-download",
      style: { margin: "0px 10px 0px 0px" },
      command: handleDownloadPDF,
    },
    // {
    //   label: "Редактировать",
    //   icon: "pi pi-pencil",
    //   style: { margin: "0px 10px 0px 0px" },
    //   command: () => navigate(`/organization/edit/${organization?.id}`)
    // },
  ];

  return (
    <div className={styles.container}>
      <PdfViewer
        fileUrl={organization?.pdfUrl || ""}
        toolbarItems={toolbarItems}
      />
    </div>
  );
};

export default Organization;
