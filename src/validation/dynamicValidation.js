import { every, isEmpty } from "lodash";

export const dynamicEmailValidation = (values, errors) => {
  errors.settings = [];

  let emailObject = {};
  values?.settings &&
    values?.settings?.length > 0 &&
    values?.settings.forEach((element, index) => {
      if (
        index < 1 &&
        element?.email &&
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(element.email)
      ) {
        emailObject["email"] = "Invalid email address";
      }
       else if (
        element?.email &&
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(element.email)
      ) {
        emailObject["email"] = "Invalid email address";
      }
      else {
        emailObject["email"] = "";
      }

      if (element?.email && !element?.hours) {
        emailObject["hours"] = "Hour is required";
      } else {
        emailObject["hours"] = "";
      }

      errors.settings.push(emailObject);
      emailObject = {};
    });

  if (errors?.settings?.length) {
    let isAllProductEmpty = every(errors?.settings, (item, index) => {
      return isEmpty(item?.email) && isEmpty(item?.hours);
    });
    if (isAllProductEmpty) {
      errors = delete errors.settings;
    }
  }

  return errors;
};
