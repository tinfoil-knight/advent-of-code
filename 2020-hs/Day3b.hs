module Day3b where

main :: IO ()
main = do
  contents <- readFile "inputs/03.txt"
  let patternMatrix = lines contents
  let (rows, cols) = (length patternMatrix, length . head $ patternMatrix)
  let slopes = [(1, 1), (3, 1), (5, 1), (7, 1), (1, 2)]

  let counter (right, down) = travel 0 0 0
        where
          travel :: Int -> Int -> Int -> Int
          travel row col count =
            if row >= rows
              then count
              else travel (row + down) (mod (col + right) cols) newCount
            where
              newCount =
                if (patternMatrix !! row) !! col == '#'
                  then count + 1
                  else count

  let counts = map counter slopes
  let answer = product counts
  print answer