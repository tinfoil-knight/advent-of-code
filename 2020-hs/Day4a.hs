module Day4a where

import Data.List (groupBy)

required = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"]

main :: IO ()
main = do
  contents <- readFile "inputs/04.txt"
  let passports =
        map words
          . filter (/= "")
          . map unwords
          $ groupBy (\a b -> a /= "" && b /= "") (lines contents)
  let validPassports = filter isValid passports
  print (length validPassports)

isValid :: [String] -> Bool
isValid passport = length required == actual
  where
    actual = foldr (\c acc -> if c `elem` required then acc + 1 else acc) 0 fields
    fields = map (takeWhile (/= ':')) passport