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
        let (opponent_choice, result) = match choices[..] {
            [a, b] => (a, b),
            _ => panic!("invalid input"),
        };
        let curr_score = get_round_score(opponent_choice, result);
        score += curr_score;
    }
    println!("{}", score);

    Ok(())
}

fn get_round_score(opponent_choice: &str, result: &str) -> i32 {
    let letter_to_score = HashMap::from([("A", 1), ("B", 2), ("C", 3)]);
    // rock (A) beats scissors (C)
    // scissors (C) beats paper (B)
    // paper (B) beats rock (A)
    let win_lose_tuples = vec![("A", "C"), ("B", "A"), ("C", "B")];

    let score = |key: &str| letter_to_score.get(key).unwrap();

    let selected_shape = match result {
        "X" => {
            let (_, lose) = win_lose_tuples
                .iter()
                .find(|(win, _)| *win == opponent_choice)
                .unwrap();
            lose
        },
        "Y" => opponent_choice,
        "Z" => {
            let (win, _) = win_lose_tuples
                .iter()
                .find(|(_, lose)| *lose == opponent_choice)
                .unwrap();
            win
        }
        _ => panic!("invalid result"),
    };
    let shape_selection_score = score(selected_shape);

    let round_outcome_score = match result {
        "X" => 0,
        "Y" => 3,
        "Z" => 6,
        _ => panic!("invalid result"),
    };

    return shape_selection_score + round_outcome_score;
}
