window.formFieldsUserIp = async () => {
  const hideAdminAlert = () => {
    /**
     * @type {HTMLElement[]}
     */
    const alertElements = document.querySelectorAll(
      "[form-fields-pro-user-ip-admin-alert]",
    );

    for (let element of alertElements) element.style.display = "none";
  };

  const getUserIp = async () => {
    const BASE_URL = "https://9d87-103-51-53-92.ngrok-free.app";
    const res = await fetch(`${BASE_URL}/api/user-ip`);

    if (res.ok) {
      const { ip } = await res.json();
      return ip;
    } else return "";
  };

  const collectUserIp = async () => {
    const ip = await getUserIp();

    /**
     * @type {HTMLInputElement[]}
     */
    const inputElements = document.querySelectorAll(
      "[form-fields-pro-user-ip-input]",
    );

    for (let input of inputElements) {
      input.value = ip;
    }
  };

  hideAdminAlert();
  collectUserIp();
};

window.formFieldsUserIp();
