module Day1 where

import Data.Array (Array, listArray, (!))
import Data.List (sort)

target = 2020

main :: IO ()
main = do
  contents <- readFile "inputs/01.txt"
  let entries = sort $ map (\x -> read x :: Int) (lines contents)
  let arr = listArray (0, length entries - 1) entries

  let match = threeSumA arr 0
  let answer = foldr ((*) . (arr !)) 1 match
  print answer

threeSumA :: Array Int Int -> Int -> [Int]
threeSumA lst pos
  | pos < n - 2 && (lst ! pos) < target =
      if pos > 0 && (lst ! pos) == (lst ! (pos - 1))
        then threeSumA lst (pos + 1)
        else threeSumB lst pos (pos + 1) (n - 1)
  | otherwise = [0]
  where
    n = length lst

threeSumB :: Array Int Int -> Int -> Int -> Int -> [Int]
threeSumB lst pos lo hi
  | lo >= hi = threeSumA lst (pos + 1)
  | sum > target = threeSumB lst pos lo (hi - 1)
  | sum < target = threeSumB lst pos (lo + 1) hi
  | sum == target = [pos, lo, hi]
  where
    sum = lst ! pos + lst ! lo + lst ! hi
    n = length lst