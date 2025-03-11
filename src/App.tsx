import { useEffect, useState } from 'react'
import './App.css'
import Tile from './components/tile';
import {generateRandomCoordinates, generateNearbyBombMatrix, initializeMatrix} from './utils/numberUtils';

function App() {
  const [clickedTileMatrix, setClickedTileMatrix] = useState(initializeMatrix(6));
  const [bombMatrix, setBombMatrix] = useState<number[][]>([]);
  const [nearbyBombMatrix, setNearbyBombMatrix] = useState<number[][]>([]);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [gameWin, setGameWin] = useState<boolean>(false);
  const tileSize = 64;

  //Change Game Properties:
  const bombNumber = 6;
  const matrixSize = 6;
  /////////////////////////
  
  const onClickBlankTile = (
    event: React.MouseEvent<HTMLDivElement,
    MouseEvent>,
    i: number,
    j: number,
    clickType: string
  ): void => {
    event.preventDefault();
    if (!gameOver) {
      const newClickedTileMatrix = [...clickedTileMatrix.map(row => [...row])];
      if (clickType == "leftClick") {
        newClickedTileMatrix[i][j] = 1;
        if (bombMatrix[i][j] == 1) {
          alert("You've found a mine! Game over!");
          setGameOver(true);
        }
      } else if (clickType == "flagClick") {
        newClickedTileMatrix[i][j] = 0;
      } else {
        newClickedTileMatrix[i][j] = 2;
      }
      setClickedTileMatrix(newClickedTileMatrix);
      checkGameWin(newClickedTileMatrix);
    }
  }
  
  const checkGameWin = (clickedTileMatrix: number[][]): void => {
    let bombCounter = 0;
    let clickedTileCounter = 0;
    clickedTileMatrix.forEach((rowElement, i) => {
      rowElement.forEach((_, j) => {
        if (clickedTileMatrix[i][j] == 2) {
          bombCounter++;
        } else if (clickedTileMatrix[i][j] == 1) {
          clickedTileCounter++;
        }
      });
    });
    if (bombCounter == bombNumber && clickedTileCounter == (matrixSize * matrixSize - bombNumber)) {
      setGameWin(true);
      alert("Congratulations!!");
    }
  }
  
  const onClickRestart = (): void => {
    const bombMatrixValue = generateRandomCoordinates(matrixSize, bombNumber);
    setBombMatrix(bombMatrixValue);
    setNearbyBombMatrix(generateNearbyBombMatrix(bombMatrixValue));
    setClickedTileMatrix(initializeMatrix(6));
    setGameOver(false);
  }

  useEffect(() => {
    const bombMatrixValue = generateRandomCoordinates(matrixSize, bombNumber);
    setBombMatrix(bombMatrixValue);
    setNearbyBombMatrix(generateNearbyBombMatrix(bombMatrixValue));
  }, []);

  return (
    <>
      Minesweeper
      {gameOver || gameWin ? <h4 onClick={onClickRestart} style={{cursor:"pointer"}}>Reiniciar</h4> : <></>}
      <div style={{
        display: "grid",
        gridTemplateColumns: `repeat(${matrixSize}, 1fr)`,
      }}>
        {
          clickedTileMatrix.map((row, i) => {
            return row.map((_, j) => {
              if (clickedTileMatrix[i][j] == 1) {
                if (bombMatrix[i][j] == 1) {
                  return <Tile 
                    key={`${i}-${j}`}
                    width={tileSize} 
                    height={tileSize} 
                    backgroundColor={'white'} 
                    icon={"bomb"} 
                  />;
                }
                return <Tile 
                  key={`${i}-${j}`}
                    width={tileSize} 
                    height={tileSize} 
                    backgroundColor={'white'} 
                    icon={"number"} 
                    tileNumber={nearbyBombMatrix[i][j]}
                />;
              } else if (clickedTileMatrix[i][j] == 2) {
                return <Tile 
                  key={`${i}-${j}`}
                  width={tileSize} 
                  height={tileSize} 
                  backgroundColor={'white'} 
                  icon={"flag"}
                  onRightClick={(event) => onClickBlankTile(event, i, j, "flagClick")}
                />;
              }
              return <Tile 
                key={`${i}-${j}`}
                width={tileSize} 
                height={tileSize} 
                backgroundColor={'grey'} 
                icon={"blank"}
                onRightClick={(event) => onClickBlankTile(event, i, j, "rightClick")}
                onLeftClick={(event) => onClickBlankTile(event, i, j, "leftClick")}
              />;
            })
          })
        }
      </div>
      Developed by Rafael
    </>
  );
}

export default App