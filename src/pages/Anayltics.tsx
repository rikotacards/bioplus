import { Card, CardContent, Chip, Skeleton, Typography } from "@mui/material";
import React from "react";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import "./Analytics.css";
import { useAuthContext } from "../providers/AuthProvider";
import { useGetLinks } from "../hooks/useGetLinks";
import { LinkDetails } from "../db/api";
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
  const data = useGetLinks(uid || "");
  const showSkeleton = isLoggedIn && !data.data?.length;
  const lifetimeClicks = isLoggedIn
    ? !data.data?.length
      ? 0
      : getLifetimeClicks(data?.data || [])
    : "5461";
  const topLinks = isLoggedIn
    ? !data.data?.length
      ? []
      : getTopLinks(data?.data || [])
    : topPerformingLinksData;
  const topReffers = isLoggedIn
    ? !data.data?.length
      ? []
      : getTopReferrers(data?.data || [])
    : topReferrersData;
  const topCountries = isLoggedIn
    ? !data.data?.length
      ? []
      : getTopCountries(data?.data || [])
    : topCountriesData;
  return (
    <div style={{ marginTop: 8 }}>
      <PageSpacing>
      {showSkeleton ? (
        <Skeleton variant="rectangular" height="100px" />
      ) : (
        <Card sx={{ mb: 1, borderRadius: "10px" }}>
          <CardContent sx={{ display: "flex", justifyContent: "space-around" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <div>{lifetimeClicks}</div>
              <div>
                <Typography variant="caption">Lifetime Clicks</Typography>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      <SignUpCard />

      <div style={{ display: "flex", alignItems: "center" }}>
        <h2>Top Performing Links</h2>
        {!isLoggedIn && (
          <Chip
            className="get-premium"
            icon={<RocketLaunchIcon sx={{ pl: 0.5 }} fontSize="small" />}
            sx={{ ml: "auto" }}
            label="Get Premium"
          />
        )}
      </div>
      <Card sx={{ borderRadius: "10px", mb: 1 }}>
        {showSkeleton ? (
          <Skeleton height="100px" variant="rectangular" />
        ) : (
          <CardContent>
            <Table data={topLinks} />
          </CardContent>
          
        )}
        {!isLoggedIn && <div style={{ display: "flex" }}>
            <Typography variant="caption" sx={{ ml: "auto", p: 1 }}>
              * Sample data
            </Typography>
          </div>}
      </Card>

      <div style={{ display: "flex", alignItems: "center" }}>
        <h2>Top Referrers</h2>
        {!isLoggedIn && (
          <Chip
            className="get-premium"
            icon={<RocketLaunchIcon sx={{ pl: 0.5 }} fontSize="small" />}
            sx={{ ml: "auto" }}
            label="Get Premium"
          />
        )}
      </div>
      {showSkeleton ? (
        <Skeleton height="100px" variant="rectangular" />
      ) : (
        <Card sx={{ borderRadius: "10px" }}>
          <CardContent>
            <Table data={topReffers} />
          </CardContent>
          {!isLoggedIn && <div style={{ display: "flex" }}>
            <Typography variant="caption" sx={{ ml: "auto", p: 1 }}>
              * Sample data
            </Typography>
          </div>}
        </Card>
      )}
      <div style={{ display: "flex", alignItems: "center" }}>
        <h2>Top Countries</h2>
        {!isLoggedIn && (
          <Chip
            className="get-premium"
            icon={<RocketLaunchIcon sx={{ pl: 0.5 }} fontSize="small" />}
            sx={{ ml: "auto" }}
            label="Get Premium"
          />
        )}
      </div>
      {showSkeleton ? (
        <Skeleton height="100px" variant="rectangular" />
      ) : (
        <Card sx={{ borderRadius: "10px" }}>
          <CardContent>
            <Table data={topCountries} />
          </CardContent>
          {!isLoggedIn && <div style={{ display: "flex" }}>
            <Typography variant="caption" sx={{ ml: "auto", p: 1 }}>
              * Sample data
            </Typography>
          </div>}
        </Card>
      )}
      </PageSpacing>
    </div>
  );
};
