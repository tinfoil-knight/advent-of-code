#include <fstream>
#include <iostream>
#include <numeric>
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
  string contents = get_file_str("inputs/01.txt");
  vector<string> lines = get_lines_from_str(contents);

  int count = 0, curr_sum = 0;

  for (int i = 0; i < lines.size(); i++) {
    if (i > 2) {
      int prev = curr_sum;
      curr_sum += stoi(lines[i]) - stoi(lines[i - 3]);
      if (curr_sum > prev) count++;
    } else {
      curr_sum += stoi(lines[i]);
    }
  }
  cout << count << endl;
}