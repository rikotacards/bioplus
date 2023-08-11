import React from "react";
import { Landing } from "../../pages/Landing";
import { EmailPasswordSignUp } from "../../pages/EmailPasswordSignUp";
interface MultiPageStepsProps {
  children: React.ReactNode;
}
export const MultiPageSteps: React.FC = () => {
  const [page, setPage] = React.useState(0);
  const [username, setUsername] = React.useState("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let trimmed = e.target.value.trimEnd().trimStart()
    setUsername(trimmed);
  };
  const onNext = () => {
    if (!!username.length) {
      setPage(page + 1);
    }
  };
  const onPrev = () => {
    setPage(page - 1);
  };
  const pages = [
    <Landing onNext={onNext} onChange={onChange} />,
    <EmailPasswordSignUp userNameFromLanding={username} onPrev={onPrev} />,
  ];
  const active = pages[page];

  return <div>{active}</div>;
};
