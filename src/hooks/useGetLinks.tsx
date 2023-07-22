import useSWR from "swr";
import { getLinksByUid } from "../db/api";

export const useGetLinks = (uid: string) => {
  const fetcher = () => getLinksByUid({uid}).then((res) => res)
  const res = useSWR(
    "https://api.github.com/repos/vercel/swr",
    fetcher
  );
  return res
}