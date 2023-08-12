import React from "react";
import reactCSS from "reactcss";
import { ChromePicker } from "react-color";
import { useUserThemeContext } from "../../providers/UserThemeProvider";
interface ColorPickerProps {
  property: string;
}
export const ColorPicker: React.FC<ColorPickerProps> = ({ property }) => {
  const userTheme = useUserThemeContext();
  const settingMap: {[key: string]: any} = {
    backgroundColor: userTheme.setBackgroundColor,
    linkBackgroundColor: userTheme.setLinkBackgroundColor,
  };
  const [state, setState] = React.useState({
    displayColorPicker: false,
    color: {
      r: "241",
      g: "112",
      b: "19",
      a: "1",
    },
  });
  const handleClick = () => {
    setState((prev) => ({
      ...prev,
      displayColorPicker: !prev.displayColorPicker,
    }));
  };
  const handleClose = () => {
    setState((prev) => ({ ...prev, displayColorPicker: false }));
  };

  const handleChange = (arg: {
    color: { r: string; g: string; b: string; a: string };
  }) => {
    if (!property) {
      return;
    }
    settingMap[property](
      `rgba(${arg.rgb?.r}, ${arg.rgb?.g}, ${arg.rgb?.b}, ${arg.rgb?.a})`
    );
    setState((prev) => ({ ...prev, color: arg.rgb }));
  };
  const styles = reactCSS({
    default: {
      color: {
        width: "36px",
        height: "36px",
        background: userTheme[property],
      },
      swatch: {
        padding: "0px",
        background: "#fff",
        borderRadius: "1px",
        boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
        display: "inline-block",
        cursor: "pointer",
        border: '1px solid white'
      },
      popover: {
        position: "absolute",
        zIndex: "2",
      },
      cover: {
        position: "fixed",
        top: "0px",
        right: "0px",
        bottom: "0px",
        left: "0px",
      },
    },
  });
  return (
    <div>
      <div style={styles.swatch} onClick={handleClick}>
        <div style={styles.color} />
      </div>
      {state.displayColorPicker ? (
        <div style={styles.popover}>
          <div style={styles.cover} onClick={handleClose} />
          <ChromePicker color={state.color} onChange={handleChange} />
        </div>
      ) : null}
    </div>
  );
};
