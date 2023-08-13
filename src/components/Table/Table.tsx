import { Divider } from "@mui/material";
import React from "react";
interface TableProps {
  data: { clicks: number; url?: string; referrer?: string }[];
}
export const Table: React.FC<TableProps> = ({ data }) => {
  if(data.length === 0){
    return 'Not enough data'
  }
  console.log('data', data)
  return (
    <>
      {data.map((row) => {
        if(row.clicks === 0){
          return;
        }
        return (
          <div key={row.clicks + row?.referrer + row?.url}>
          <div
            key={row.clicks + row?.referrer + row?.url}
            style={{ display: "flex", alignItems: "row" }}
          >
            <div>
              {row?.url}
              {row?.referrer}
            </div>
            <div style={{ marginLeft: "auto" }}>{row.clicks}</div>
          </div>
          <Divider sx={{ width: "100%", mt: 0.5, mb: 0.5 }} />
        </div>
        )
      }
        
      )}
    </>
  );
};
