module Day2a where

import Data.Char (digitToInt, isDigit)
import Data.List (find, isPrefixOf)
import Data.Maybe (fromJust, isJust)

main :: IO ()
main = do
  contents <- readFile "inputs/01.txt"
  let values = lines contents
  let calibrationValues = map parseCalibrationValue values
  let answer = sum calibrationValues
  print answer

numWords =
  [ ("one", 1),
    ("two", 2),
    ("three", 3),
    ("four", 4),
    ("five", 5),
    ("six", 6),
    ("seven", 7),
    ("eight", 8),
    ("nine", 9)
  ]

-- Assumption: String has at least 1 number (in digit or word form)
parseCalibrationValue :: String -> Int
parseCalibrationValue s = tens * 10 + ones
  where
    tens = head nums
    ones = last nums
    nums = fromWord s

fromWord :: String -> [Int]
fromWord s
  | null s = []
  | isDigit (head s) = digitToInt (head s) : fromWord (tail s)
  | isJust match = snd (fromJust match) : fromWord (tail s)
  | otherwise = fromWord (tail s)
  where
    match = find (\y -> fst y `isPrefixOf` s) numWords