use regex::Regex;
use std::collections::HashMap;
use std::fs;
use std::io::{BufRead, BufReader, Error};

fn main() -> Result<(), Error> {
    let path = "./src/inputs/05.txt";

    let input = fs::File::open(path)?;
    let mut buffered = BufReader::new(input).lines();

    let mut levels: Vec<Vec<(usize, char)>> = Vec::new();
    let mut stack_map: HashMap<usize, Vec<char>> = HashMap::new();

    for line in buffered.by_ref() {
        let p = line?;
        if p == "" {
            // break at empty line & removes the row with nums
            levels.pop();
            break;
        } else {
            levels.push(parse_line(p));
        }
    }

    // build initial crate arrangement
    for positions in levels.iter().rev() {
        for (pos, case) in positions {
            if stack_map.contains_key(&pos) {
                stack_map.get_mut(&pos).unwrap().push(*case);
            } else {
                stack_map.insert(*pos, vec![*case]);
            }
        }
    }

    let re = Regex::new(r"move (\d+) from (\d+) to (\d+)").unwrap();

    // move crates
    for line in buffered.by_ref() {
        let s = line?;
        let cap = re.captures_iter(s.as_str()).next().unwrap();
        let (&to_move, from, to) = (
            &cap[1].parse::<usize>().unwrap(),
            &cap[2].parse::<usize>().unwrap(),
            &cap[3].parse::<usize>().unwrap(),
        );
        let crates = stack_map.get_mut(from).unwrap();
        let take_from = crates.len() - to_move as usize;
        let moved = crates.drain(take_from..).collect::<Vec<char>>();
        stack_map.get_mut(to).unwrap().extend(moved);
    }

    // get top crate at each position
    let mut result = vec![' '; stack_map.len()];
    for (pos, cases) in stack_map.iter() {
        result[pos - 1] = *cases.last().unwrap();
    }

    println!("{:?}", result.iter().collect::<String>());

    Ok(())
}

fn parse_line(s: String) -> Vec<(usize, char)> {
    let mut v = Vec::new();
    let ln = s.chars().collect::<Vec<char>>();

    for (i, el) in ln.chunks(4).enumerate() {
        if el.into_iter().collect::<String>().trim() != "" {
            v.push((i + 1, el[1]));
        }
    }

    v
}
