module Day2a where

main :: IO ()
main = do
  contents <- readFile "inputs/02.txt"
  let entries = map parseLn (lines contents)
  let answer = length $ filter isValidPsw entries
  print answer

data Policy = Policy
  { ch :: Char,
    lo :: Int,
    hi :: Int,
    psw :: String
  }

isValidPsw :: Policy -> Bool
isValidPsw Policy {ch, lo, hi, psw} = len >= lo && len <= hi
  where
    len = length $ filter (== ch) psw

parseLn :: String -> Policy
parseLn ln =
  Policy
    { ch = head $ parts !! 1,
      lo = read lo :: Int,
      hi = read (tail hi) :: Int,
      psw = last parts
    }
  where
    parts = words ln
    (lo, hi) = break (== '-') (head parts)
