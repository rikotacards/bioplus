import { LinkDetails } from "../db/api";

export const getLifetimeClicks = (links: LinkDetails[]) => {
  let total = 0;

  links.forEach((link) => (total = total + link.clicks));
  return total;
};