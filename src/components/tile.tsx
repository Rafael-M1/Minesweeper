import { JSX } from "react";
import bombSvg from "../assets/bomb.svg";
import flagSvg from "../assets/flag.svg";

const Tile = (
    { width, height, backgroundColor, icon, onLeftClick, onRightClick, tileNumber }:
    {   
        width: number; 
        height: number; 
        backgroundColor: string, 
        icon: string, 
        onLeftClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
        onRightClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void, 
        tileNumber?: number 
    }): JSX.Element => {

    const onClickTile = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
        event.preventDefault();
        if (onLeftClick) {
            onLeftClick(event);
        }
    }

    const onRightClickTile = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
        event.preventDefault();
        if (onRightClick) {
            onRightClick(event);
        }
    }

    return (
        <div style={{ 
                width: width, 
                height: height,
                backgroundColor: backgroundColor,
                margin: "1px",
                borderRadius: "5px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
            onClick={onClickTile}
            onContextMenuCapture={onRightClickTile}
        >
            {getIconImage(icon, tileNumber)}
        </div>
    );
};

const getIconImage = (icon: string, tileNumber?: number):JSX.Element => {
    switch (icon) {
        case "blank":
            return <></>;
        case "bomb":
            return <img src={bombSvg} alt="Bomb image" height={64} />
        case "flag":
            return <img src={flagSvg} alt="Flag image" height={64} />
        case "number":
            return <div style={{color: "black", fontSize: "64px"}}>{tileNumber}</div>
        default:
            throw new Error("Icon type not known.");
    }
}

export default Tile;
