import { every, isEmpty } from "lodash";

export const dynamicEmailValidation = (values, errors) => {
  errors.settings = [];

  let emailObject = {};
  values?.settings &&
    values?.settings?.length > 0 &&
    values?.settings.forEach((element, index) => {
      if (index >= 1) {
        return "";
      }
      if (!element?.email) {
        emailObject["email"] = "Email is required";
      }
      else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(element.email)
      ){
        emailObject["email"] ="Invalid email address";
      }
       else {
        emailObject["email"] = "";
      }
      errors.settings.push(emailObject);
    });

  if (errors?.settings?.length) {
    let isAllProductEmpty = every(errors?.settings, (item) => {
      return isEmpty(item?.email);
    });
    if (isAllProductEmpty) {
      errors = delete errors.settings;
    }
  }

  return errors;
};
