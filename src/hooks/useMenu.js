import React from "react";
import { useRouter } from "next/router";
import navConfig from "@/layouts/dashboard/nav/config-navigation";
import { useAuthContext } from "@/auth/useAuthContext";
import { flattenThreeDimensionalArray } from "@/utils/flattenArray";

const useMenu = () => {
  const { user } = useAuthContext();
  const { pathname } = useRouter();
  const [navConfigMenu, setNavConfigMenu] = React.useState([]);
  const [permission, setPermission] = React.useState([]);

  const setMenu = async () => {
    let menus = [];
    navConfig.forEach((subHeader, subHeaderIndex) => {
      menus.push({
        subheader: subHeader?.subheader,
        items: [],
      });
      if (subHeader?.items && subHeader?.items?.length > 0) {
        subHeader?.items.forEach((Items, ItemIndex) => {
          if (!Items?.isSuperAdmin) {
            if (Items?.children && Items?.children?.length > 0) {
              menus[subHeaderIndex]?.items.push({
                title: Items?.title,
                path: Items?.path,
                icon: Items?.icon,
                children: Items?.children.filter((children) => {
                  if (!children?.isSuperAdmin) {
                    return {
                      title: children?.title,
                      path: children?.path,
                      icon: children?.icon,
                    };
                  }
                }),
              });
            } else {
              menus[subHeaderIndex]?.items.push({
                title: Items?.title,
                path: Items?.path,
                icon: Items?.icon,
                children: null,
              });
            }
          }
        });
      }
    });

    await setNavConfigMenu(menus);
  };

  const setPermissions = async () => {
    let permissions = [];

    let PermissionArray = await flattenThreeDimensionalArray(
      navConfig,
      "items",
      "children"
    );

    PermissionArray && PermissionArray?.length > 0;
    PermissionArray.forEach((element) => {
      if (element?.isSuperAdmin) {
        permissions.push(element?.path);
      }
    });

    await setPermission(permissions);
  };

  React.useEffect(() => {
    if (user && user?.user_type && user?.user_type !== "super_admin") {
      setMenu();
      setPermissions();
    } else {
      setNavConfigMenu(navConfig);
      setPermission([]);
    }
  }, [navConfig, user, pathname]);

  return {
    navConfigMenu,
    permission,
  };
};

export default useMenu;
