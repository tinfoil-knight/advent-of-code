use std::cmp;
use std::fs;
use std::io::{BufRead, BufReader, Error};

fn main() -> Result<(), Error> {
    let path = "./src/inputs/01.txt";

    let input = fs::File::open(path)?;
    let buffered = BufReader::new(input);

    let (mut max_calories, mut calories) = (0, 0);
    for line in buffered.lines() {
        let calorie = line?;
        if calorie == "" {
            max_calories = cmp::max(max_calories, calories);
            calories = 0;
        } else {
            calories += calorie.parse::<i32>().unwrap()
        }
    }
    println!("{}", max_calories);

    Ok(())
}
