#include <fstream>
#include <iostream>
#include <sstream>
#include <vector>

using namespace std;

string get_file_str(string path) {
  ifstream f(path);
  if (!f.is_open()) {
    cout << "unable to open file" << endl;
    exit(1);
  }
  return string((istreambuf_iterator<char>(f)), (istreambuf_iterator<char>()));
}

vector<string> get_lines_from_str(string s) {
  vector<string> tokens;
  stringstream iss(s);
  string token;
  while (getline(iss, token, '\n')) {
    tokens.push_back(token);
  }
  return tokens;
}

int main() {
  string contents = get_file_str("inputs/02.txt");
  vector<string> lines = get_lines_from_str(contents);

  int position = 0, depth = 0, aim = 0;
  for (string line : lines) {
    string direction;
    int value;
    istringstream iss(line);

    iss >> direction >> value;

    if (direction == "forward") {
      position += value;
      depth += aim * value;
    } else if (direction == "up") {
      aim -= value;
    } else if (direction == "down") {
      aim += value;
    } else {
      cout << "invalid direction" << endl;
      exit(1);
    }
  }

  cout << position * depth << endl;
}