module Day6a where

import Data.List (groupBy, intercalate, nub)

main :: IO ()
main = do
  contents <- readFile "inputs/06.txt"
  let groups =
        filter (/= [""]) $
          groupBy (\a b -> a /= "" && b /= "") (lines contents)

  let answers = map (nub . intercalate "") groups
  print (sum $ map length answers)