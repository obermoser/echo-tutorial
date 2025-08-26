import React from "react";
import { OrganizationList } from "@clerk/nextjs";
export const OrganizationSelectView = () => {
  return (
    <OrganizationList
      afterCreateOrganizationUrl="/"
      hidePersonal
      skipInvitationScreen
    />
  );
};
