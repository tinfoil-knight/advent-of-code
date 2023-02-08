use std::fs;
use std::io::{BufRead, BufReader, Error};

fn main() -> Result<(), Error> {
    let path = "./src/inputs/04.txt";

    let input = fs::File::open(path)?;
    let buffered = BufReader::new(input);

    let mut count = 0;
    buffered.lines().for_each(|line| {
        let pairs: Vec<&str> = line.as_ref().unwrap().split(",").collect();
        if let [first, second] = pairs[..2] {
            if overlaps(get_range(first), get_range(second)) {
                count += 1;
            }
        } else {
            panic!("invalid pair");
        }
    });
    println!("{}", count);

    Ok(())
}

fn overlaps((a, b): (u32, u32), (c, d): (u32, u32)) -> bool {
    a <= d && b >= c
}

fn get_range(s: &str) -> (u32, u32) {
    let v = s
        .split("-")
        .map(|n| n.parse::<u32>().unwrap())
        .collect::<Vec<u32>>();

    let (low, high) = match v[..] {
        [first, second] => (first, second),
        _ => panic!("invalid range"),
    };

    (low, high)
}
