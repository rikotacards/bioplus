import { LinkDetails } from "../db/api";

export const getTopLinks = (links: LinkDetails[]) => {
  const res: { url: string; clicks: number }[] = [];
  links.forEach((link) => res.push({ url: link.link, clicks: link.clicks }));
  return res.sort((a, b) => b.clicks - a.clicks);
};