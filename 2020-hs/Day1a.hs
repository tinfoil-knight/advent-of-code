module Day1a where

import Data.List (find)
import Data.Maybe (fromJust)
import Data.Set qualified as Set

main :: IO ()
main = do
  contents <- readFile "inputs/01.txt"
  let entries = map (\x -> read x :: Int) (lines contents)
  let s = Set.fromList entries
  -- Assumption:
  -- Input has exactly one matching pair that sums up to 2020
  let match = fromJust (find (\x -> Set.member (2020 - x) s) entries)
  let answer = match * (2020 - match)
  print answer
