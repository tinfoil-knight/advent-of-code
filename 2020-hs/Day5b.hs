module Day5b where

import Data.Char (digitToInt)
import Data.List (find, foldl')
import Data.Maybe (fromJust)
import Data.Set (Set, fromList, member)
import Data.Set qualified as Set

main :: IO ()
main = do
  contents <- readFile "inputs/05.txt"
  let passes = lines contents
  let seatPositions = map passToPos passes
  let seatPositionsSet = fromList seatPositions
  let seatIds = fromList $ map seatId seatPositions

  let allPossibleSeats = [(row, col) | row <- [0 .. 127], col <- [0 .. 7]]
  let missingSeats = filter (\s -> not $ member s seatPositionsSet) allPossibleSeats
  let mySeat = find f missingSeats
        where
          f (row, col) =
            (row /= 0 && row /= 127)
              && member (id + 1) seatIds
              && member (id - 1) seatIds
            where
              id = seatId (row, col)
  print (seatId $ fromJust mySeat)

passToPos :: String -> (Int, Int)
passToPos s = (row, col)
  where
    row = binToDec $ foldl' (\acc c -> acc ++ (if c == 'F' then "0" else "1")) "" rowSpec
    col = binToDec $ foldl' (\acc c -> acc ++ (if c == 'L' then "0" else "1")) "" colSpec
    (rowSpec, colSpec) = splitAt 7 s

seatId :: (Int, Int) -> Int
seatId (row, col) = row * 8 + col

binToDec :: String -> Int
binToDec = foldl (\acc x -> 2 * acc + digitToInt x) 0