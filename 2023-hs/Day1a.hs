module Day1a where

import Data.Char (digitToInt, isDigit)

main :: IO ()
main = do
  contents <- readFile "inputs/01.txt"
  let values = lines contents
  let calibrationValues = map parseCalibrationValue values
  let answer = sum calibrationValues
  print answer

-- Assumption: String has at least 2 digits.
parseCalibrationValue :: String -> Int
parseCalibrationValue s = tens * 10 + ones
  where
    tens = digitToInt (head nums)
    ones = digitToInt (last nums)
    nums = filter isDigit s