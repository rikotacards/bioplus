import {
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import "./Analytics.css";
import { useAuthContext } from "../providers/AuthProvider";
import { useGetLinks } from "../hooks/useGetLinks";
import { LinkDetails, getLinksByUid } from "../db/api";
import { Table } from "../components/Table/Table";
import { getSortedFieldByClicks } from "../util/getTopReferrers";
import { getTopCountries } from "../util/getTopCountries";
import {
  topCountriesData,
  topPerformingLinksData,
  topReferrersData,
} from "../mocks/mockAnalytics.data";
import { SignUpCard } from "../components/SignUpBanner/SignUpBanner";
import { PageSpacing } from "../PageSpacing/PageSpacing";
import { getLifetimeClicks } from "../util/getLifetimeClicks";
import { getTopLinks } from "../util/getTopLinks";
const Loading = (
  <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
    <CircularProgress />{" "}
  </div>
);

export const Analytics: React.FC = () => {
  const auth = useAuthContext();
  const isLoggedIn = auth.isLoggedIn;
  const uid = auth?.user?.uid;
  const [data, setData] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
  const showSample: boolean =
    !auth.isLoggedIn && !auth.isLoggingIn && !isLoading;

  console.log(data);

  React.useEffect(() => {
    if (!uid) {
      setLoading(false);
      return;
    }
    getLinksByUid({ uid })
      .then((res) => {
        if (res) {
          console.log("linksbyuid", res);
          setData(res);
          setLoading(false);
        }
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  }, [uid]);
  const showLoading = auth.isLoggingIn;
  const lifetimeClicks = showSample ? "1000" : getLifetimeClicks(data);
  const topLinks = showSample
    ? topPerformingLinksData
    : getTopLinks(data || []);
  const topRefs = showSample
    ? topReferrersData
    : getSortedFieldByClicks(data, "referrer");
  const topRegions = showSample
    ? topCountriesData
    : getSortedFieldByClicks(data, "geo");

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
          <h3>Top Performing Links</h3>
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
        >
          {" "}
          <h3>Top Referrers</h3>
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
            {showLoading ? Loading : <Table data={topRefs} />}
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
        >
          {" "}
          <h3>Top Countries</h3>
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
            {showLoading ? Loading : <Table data={topRegions} />}
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
      <Toolbar />
      <Toolbar />
    </div>
  );
};
