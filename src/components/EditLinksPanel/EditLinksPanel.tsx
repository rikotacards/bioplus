import React from "react";
import "./EdlintLinksPanel.css";
import RGL, { WidthProvider } from "react-grid-layout";
import { EditLinkWidget } from "../EditLinkWidget/EditLinkWidget";
import { useLinksContext } from "../../providers/LinksProvider";
import { AuthContext, useAuthContext } from "../../providers/AuthProvider";
const ReactGridLayout = WidthProvider(RGL);

interface Link {
  title?: string;
  link?: string;
  linkId: string;
  isDisplayed?: boolean;
}
interface EditLinksPanelProps {
  links: Link[];
}
export const EditLinksPanel: React.FC<EditLinksPanelProps> = (props) => {
  const linksContext = useLinksContext();
  const auth = useAuthContext();
  const displayedLinks = linksContext.links.map((link, i) => (
    <div key={i + link?.title} style={{ display: "flex", left: "-10px" }}>
      <EditLinkWidget
        link={link.link}
        linkId={link.linkId}
        title={link.title}
        key={link.linkId}
        isDisplayed={link.isDisplayed}
        index={i}
      />
    </div>
  ));
  return (
    <ReactGridLayout
      onLayoutChange={(newLayout) => {
        const newOrder = [] as any;
        newLayout.forEach((row, index) => {
          newOrder[Number(index)] = linksContext.links[row.y];
        });
        if (JSON.stringify(newOrder) !== JSON.stringify(newLayout)) {
          console.log("NOT SAME", newOrder, newLayout)
          if(!auth?.username){
            return;
          }
          linksContext.onReorder(newOrder);
        }
      }}
      useCSSTransforms={true}
      isDraggable
      cols={1}
      draggableHandle=".drag"
    >
      {displayedLinks}
    </ReactGridLayout>
  );
};
