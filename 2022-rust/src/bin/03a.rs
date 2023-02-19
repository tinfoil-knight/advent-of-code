use std::collections::HashSet;
use std::fs;
use std::io::{BufRead, BufReader, Error};

fn main() -> Result<(), Error> {
    let path = "./src/inputs/03.txt";

    let input = fs::File::open(path)?;
    let buffered = BufReader::new(input);

    let mut priority_sum = 0;
    for line in buffered.lines() {
        let rucksack = line?;
        let (first, second) = rucksack.split_at(rucksack.len() / 2);
        let a: HashSet<char> = first.chars().collect();
        let found = second.chars().find(|x| a.contains(x)).unwrap();
        priority_sum += get_char_value(found);
    }
    println!("{}", priority_sum);

    Ok(())
}

fn get_char_value(ch: char) -> u32 {
    let ascii = ch as u32;
    // https://www.cs.cmu.edu/~pattis/15-1XX/common/handouts/ascii.html
    if ascii >= 97 && ascii <= 122 {
        ascii - 96
    } else if ascii >= 65 && ascii <= 90 {
        ascii - 38
    } else {
        panic!("unexpected character");
    }
}
