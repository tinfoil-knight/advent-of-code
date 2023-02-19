use std::collections::HashSet;
use std::fs;
use std::io::{BufRead, BufReader, Error};

fn main() -> Result<(), Error> {
    let path = "./src/inputs/03.txt";

    let input = fs::File::open(path)?;
    let lines: Vec<String> = BufReader::new(input)
        .lines()
        .map(|ln| ln.unwrap())
        .collect();

    let mut priority_sum = 0;
    lines.chunks(3).for_each(|chunk| {
        let sets: Vec<HashSet<char>> = chunk
            .into_iter()
            .map(|ln| -> HashSet<char> { ln.chars().collect() })
            .collect();
        if let [a, b, c] = &sets[..3] {
            let intersection = &(a & b) & c;
            let common = intersection.iter().next().unwrap();
            priority_sum += get_char_value(*common) as u32;
        } else {
            panic!("unexpected number of lines");
        }
    });
    println!("{}", priority_sum);

    Ok(())
}

fn get_char_value(ch: char) -> u8 {
    let ascii = ch as u8;
    // https://www.cs.cmu.edu/~pattis/15-1XX/common/handouts/ascii.html
    if ascii >= 'a' as u8 && ascii <= 'z' as u8 {
        ascii - 96
    } else if 'A' as u8 >= 65 && ascii <= 'Z' as u8 {
        ascii - 38
    } else {
        panic!("unexpected character");
    }
}
