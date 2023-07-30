module Day2b where

main :: IO ()
main = do
  contents <- readFile "inputs/02.txt"
  let entries = map parseLn (lines contents)
  let answer = length $ filter isValidPsw entries
  print answer

data Policy = Policy
  { ch :: Char,
    pos1 :: Int,
    pos2 :: Int,
    psw :: String
  }

isValidPsw :: Policy -> Bool
isValidPsw Policy {ch, pos1, pos2, psw} = atPos pos1 /= atPos pos2
  where
    atPos pos = (pos - 1) < length psw && psw !! (pos - 1) == ch

parseLn :: String -> Policy
parseLn ln =
  Policy
    { ch = head $ parts !! 1,
      pos1 = read pos1 :: Int,
      pos2 = read (tail pos2) :: Int,
      psw = last parts
    }
  where
    parts = words ln
    (pos1, pos2) = break (== '-') (head parts)
