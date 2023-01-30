const disabledTimezones = [
  'Europe/Moscow', 'Asia/Yekaterinburg', 'Asia/Omsk', 'Asia/Krasnoyarsk', 'Asia/Irkutsk', 'Asia/Yakutsk', 'Asia/Tehran',
  'Asia/Vladivostok', 'Asia/Sakhalin', 'Asia/Magadan', 'Asia/Kamchatka', 'Asia/Anadyr', 'Asia/Tehran', 'Europe/Minsk'
];

export default class BlockCountries {
  timezone: string = "";

  constructor() {
    try {
      this.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    } catch (e) {
      console.log(`Timezone error: ${e}`);
    }
  }

  checkTimezone() {
    if (disabledTimezones.includes(this.timezone) && location.pathname !== '/terms') {
      alert(`Sorry, you can't use this app based on our Terms & Conditions.`);
      window.location.href = '/terms';
    }
  }
}



