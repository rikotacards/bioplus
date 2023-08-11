import { countries } from "./countries.data";
import { timezones } from "./timezones.data";

export const getCountry = () => {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

	if (timezone === "" || !timezone) {
		return null;
	}

	const _country = timezones[timezone].c[0];
	const country = countries[_country];
	return country;
}

export const getState=()=>{
		const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

	if (timezone === "" || !timezone) {
		return null;
	}
	
	const state = timezone.split("/")[1].replace("_", " ")
	
	return state

}