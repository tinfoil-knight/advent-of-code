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
  string contents = get_file_str("inputs/01.txt");
  vector<string> lines = get_lines_from_str(contents);

  int prev = -1, count = 0;
  for (string line : lines) {
    int depth = stoi(line);
    if (prev != -1 && depth > prev) count++;
    prev = depth;
  }
  cout << count << endl;
}