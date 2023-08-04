module Day5a where

import Data.Char (digitToInt)
import Data.List (foldl')

main :: IO ()
main = do
  contents <- readFile "inputs/05.txt"
  let passes = lines contents
  let seatIds = map (seatId . passToPos) passes
  print (maximum seatIds)

passToPos :: String -> (Int, Int)
passToPos s = (row, col)
  where
    row = binToDec $ foldl' (\acc c -> acc ++ (if c == 'F' then "0" else "1")) "" rowSpec
    col = binToDec $ foldl' (\acc c -> acc ++ (if c == 'L' then "0" else "1")) "" colSpec
    (rowSpec, colSpec) = splitAt 7 s

seatId :: (Int, Int) -> Int
seatId (row, col) = row * 8 + col

binToDec :: String -> Int
binToDec = foldl' (\acc c -> 2 * acc + digitToInt c) 0