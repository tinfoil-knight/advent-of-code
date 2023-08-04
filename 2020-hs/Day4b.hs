module Day4b where

import Data.Char (isDigit, ord)
import Data.List (groupBy)
import Data.Map (Map, member, (!))
import Data.Map qualified as Map

checks =
  Map.fromList
    [ ("byr", inRange 1920 2002),
      ("iyr", inRange 2010 2020),
      ("eyr", inRange 2020 2030),
      ("hgt", isValidHeight),
      ("hcl", isHex),
      ("ecl", (`elem` ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"])),
      ("pid", \s -> length s == 9 && isNum s)
    ]

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
isValid passport = length checks == actual
  where
    actual = length (filter isValidField passport)

isValidField :: String -> Bool
isValidField s = member key checks && (checks ! key) val
  where
    key = takeWhile (/= ':') s
    val = tail . dropWhile (/= ':') $ s

isNum :: String -> Bool
isNum s = not (null s) && all isDigit s

inRange :: Int -> Int -> String -> Bool
inRange low high actualS =
  isNum actualS
    && actual >= low
    && actual <= high
  where
    actual = read actualS :: Int

isValidHeight :: String -> Bool
isValidHeight s =
  isNum measure
    && ( case unit of
           "cm" -> inRange 150 193 measure
           "in" -> inRange 59 76 measure
           _ -> False
       )
  where
    (measure, unit) = span isDigit s

isHex :: String -> Bool
isHex s =
  length s == 7
    && head s == '#'
    && all (\x -> isDigit x || (ord x >= ord 'a' && ord x <= ord 'f')) (tail s)