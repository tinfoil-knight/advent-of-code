use std::fs;
use std::io::{BufRead, BufReader, Error};

fn main() -> Result<(), Error> {
    let path = "./src/inputs/01.txt";

    let input = fs::File::open(path)?;
    let buffered = BufReader::new(input);

    let mut calories_vec: Vec<i32> = Vec::new();
    let mut calorie_count = 0;
    for line in buffered.lines() {
        let calorie = line?;
        if calorie == "" {
            calories_vec.push(calorie_count);
            calorie_count = 0;
        } else {
            calorie_count += calorie.parse::<i32>().unwrap()
        }
    }
    calories_vec.sort_by(|a, b| b.cmp(a));
    let calorie_sum : i32 = calories_vec[..3].iter().sum();
    
    println!("{}", calorie_sum);

    Ok(())
}
