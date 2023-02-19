use std::collections::HashMap;
use std::fs;
use std::io::{BufRead, BufReader, Error};

fn main() -> Result<(), Error> {
    let path = "./src/inputs/02.txt";

    let input = fs::File::open(path)?;
    let buffered = BufReader::new(input);

    let mut score = 0;
    for line in buffered.lines() {
        let ln = line?;
        let choices: Vec<&str> = ln.split(" ").collect();
        let (opponent_choice, my_choice) = match choices[..] {
            [a, b] => (a, b),
            _ => panic!("invalid input"),
        };
        let curr_score = get_round_score(opponent_choice, my_choice);
        score += curr_score;
    }
    println!("{}", score);

    Ok(())
}

fn get_round_score(opponent_choice: &str, my_choice: &str) -> i32 {
    let letter_to_score =
        HashMap::from([("X", 1), ("Y", 2), ("Z", 3), ("A", 1), ("B", 2), ("C", 3)]);

    let score = |key: &str| letter_to_score.get(key).unwrap();

    let shape_selection_score = score(my_choice);

    let round_outcome_score = if score(my_choice) == score(opponent_choice) {
        3
    } else {
        // pattern:
        // rock beats scissors 1 3
        // scissors beats paper 3 2
        // paper beats rock 2 1
        if *score(opponent_choice) == score(my_choice) % 3 + 1 {
            0
        } else {
            6
        }
    };

    return shape_selection_score + round_outcome_score;
}
