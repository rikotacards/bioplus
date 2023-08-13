import {
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Typography,
} from "@mui/material";
import React from "react";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import "./Analytics.css";
import { useAuthContext } from "../providers/AuthProvider";
import { useGetLinks } from "../hooks/useGetLinks";
import { LinkDetails, getLinksByUid } from "../db/api";
import { Table } from "../components/Table/Table";
import { getTopReferrers } from "../util/getTopReferrers";
import { getTopCountries } from "../util/getTopCountries";
import {
  topCountriesData,
  topPerformingLinksData,
  topReferrersData,
} from "../mocks/mockAnalytics.data";
import { SignUpCard } from "../components/SignUpBanner/SignUpBanner";
import { PageSpacing } from "../PageSpacing/PageSpacing";
const Loading = (
  <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
    <CircularProgress />{" "}
  </div>
);
const getLifetimeClicks = (links: LinkDetails[]) => {
  let total = 0;

  links.forEach((link) => (total = total + link.clicks));
  return total;
};

const getTopLinks = (links: LinkDetails[]) => {
  const res: { url: string; clicks: number }[] = [];
  links.forEach((link) => res.push({ url: link.link, clicks: link.clicks }));
  return res.sort((a, b) => b.clicks - a.clicks);
};

export const Analytics: React.FC = () => {
  const auth = useAuthContext();
  const isLoggedIn = auth.isLoggedIn;
  const uid = auth?.user?.uid;
  const [data, setData] = React.useState([])
  const [isLoading, setLoading] = React.useState(true)
  console.log(data)
  React.useEffect(() => {
    if(!uid){return}
    getLinksByUid({uid}).then((res) => {
      setData(res)
    })
  },[uid])
  const showLoading = auth.isLoggingIn 
  const lifetimeClicks = isLoggedIn
    ? !isLoading && !data?.length
      ? 0
      : getLifetimeClicks(data || [])
    : "5461";
  const topLinks = isLoggedIn
    ? !isLoading && !data?.length
      ? []
      : getTopLinks(data || [])
    : topPerformingLinksData;
  const topReffers = isLoggedIn
    ? !isLoading &&  !data?.length
      ? []
      : getTopReferrers(data || [])
    : topReferrersData;
  const topCountries = isLoggedIn
    ? !isLoading &&  !data?.length
      ? []
      : getTopCountries(data || [])
    : topCountriesData;
  return (
    <div style={{ marginTop: 8 }}>
      <PageSpacing>
        <Card sx={{ mb: 1, borderRadius: "10px" }}>
          <CardContent sx={{ display: "flex", justifyContent: "space-around" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              {showLoading ? (
                <CircularProgress />
              ) : (
                <div style={{ fontWeight: "bold" }}>{lifetimeClicks}</div>
              )}
              <div>
                <Typography variant="caption">Lifetime Clicks</Typography>
              </div>
            </div>
          </CardContent>
        </Card>

        <SignUpCard />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "4px",
            marginTop: "4",
          }}
        >
          <h3  >
            Top Performing Links
          </h3>
          {!isLoggedIn && (
            <Chip
              className="get-premium"
              icon={<RocketLaunchIcon sx={{ pl: 0.5 }} fontSize="small" />}
              sx={{ ml: "auto" }}
              label="Get Premium"
            />
          )}
        </div>
        <Card sx={{ borderRadius: "10px", mb: 2 }}>
          <CardContent>
            {showLoading ? Loading : <Table data={topLinks} />}
          </CardContent>

          {!isLoggedIn && (
            <div style={{ display: "flex" }}>
              <Typography variant="caption" sx={{ ml: "auto", p: 1 }}>
                * Sample data
              </Typography>
            </div>
          )}
        </Card>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "4px",
            marginTop: "4",
          }}
        >        <h3>
            Top Referrers
          </h3>
          {!isLoggedIn && (
            <Chip
              className="get-premium"
              icon={<RocketLaunchIcon sx={{ pl: 0.5 }} fontSize="small" />}
              sx={{ ml: "auto" }}
              label="Get Premium"
            />
          )}
        </div>
        <Card sx={{ mb: 2, borderRadius: "10px" }}>
          <CardContent>
            {showLoading ? Loading : <Table data={topReffers} />}
          </CardContent>
          {!isLoggedIn && (
            <div style={{ display: "flex" }}>
              <Typography variant="caption" sx={{ ml: "auto", p: 1 }}>
                * Sample data
              </Typography>
            </div>
          )}
        </Card>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "4px",
            marginTop: "4",
          }}
        >        <h3>
            Top Countries
          </h3>
          {!isLoggedIn && (
            <Chip
              className="get-premium"
              icon={<RocketLaunchIcon sx={{ pl: 0.5 }} fontSize="small" />}
              sx={{ ml: "auto" }}
              label="Get Premium"
            />
          )}
        </div>
        <Card sx={{ borderRadius: "10px" }}>
          <CardContent>
            {showLoading ? Loading : <Table data={topCountries} />}
          </CardContent>
          {!isLoggedIn && (
            <div style={{ display: "flex" }}>
              <Typography variant="caption" sx={{ ml: "auto", p: 1 }}>
                * Sample data
              </Typography>
            </div>
          )}
        </Card>
      </PageSpacing>
    </div>
  );
};
