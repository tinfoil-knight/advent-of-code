use std::collections::HashMap;
use std::fs;
use std::io::Error;

fn main() -> Result<(), Error> {
    let path = "./src/inputs/06.txt";

    let input = fs::read_to_string(path)?;

    assert!(input.is_ascii());

    let start_of_packet_marker = marker_detector(&input, 4);
    println!("{}", start_of_packet_marker);

    let start_of_message_marker = marker_detector(&input, 14);
    println!("{}", start_of_message_marker);

    Ok(())
}

fn marker_detector(input: &String, num_distinct_char: usize) -> u32 {
    let mut char_set: HashMap<char, u32> = HashMap::new();
    let mut curr = 0;
    for ch in input.chars() {
        if char_set.contains_key(&ch) {
            let mut old_pos = char_set.get(&ch).unwrap().clone();
            char_set.retain(|_k, v| v > &mut old_pos);
        }
        char_set.insert(ch, curr);

        if char_set.len() == num_distinct_char {
            break;
        }
        curr += 1;
    }

    curr + 1
}
