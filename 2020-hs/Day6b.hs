module Day6b where

import Data.List (groupBy, intercalate, intersect, nub)

main :: IO ()
main = do
  contents <- readFile "inputs/06.txt"
  let groups =
        filter (/= [""]) $
          groupBy (\a b -> a /= "" && b /= "") (lines contents)

  let commonAnswers = map (\l -> foldr intersect (head l) l) groups
  print (sum $ map length commonAnswers)