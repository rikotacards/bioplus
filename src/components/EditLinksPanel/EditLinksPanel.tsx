import React from "react";
import "./EdlintLinksPanel.css";
import RGL, { WidthProvider } from "react-grid-layout";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { EditLinkWidget } from "../EditLinkWidget/EditLinkWidget";
import { IconButton } from "@mui/material";
const ReactGridLayout = WidthProvider(RGL);

export const EditLinksPanel: React.FC = () => {
  const links = [1, 2, 3, 4, 5];
  const displayedLinks = links.map((link, i) => (
    <div
      key={i}
      style={{left: "-10px"}}
    >
      <EditLinkWidget key={link} />
    </div>
  ));
  return (
    <ReactGridLayout
      onLayoutChange={(d) => {
        console.log(d);
      }}
      useCSSTransforms={true}
      isResizable={false}
      isDraggable
      cols={1}
      draggableHandle=".drag"
    >
      {displayedLinks}
    </ReactGridLayout>
  );
};
