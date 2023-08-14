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
  string contents = get_file_str("inputs/03.txt");
  vector<string> lines = get_lines_from_str(contents);

  vector<int> zero_counts(lines[0].size(), 0);
  for (string line : lines) {
    for (int i = 0; i < line.size(); i++) {
      if (line[i] == '0') zero_counts[i]++;
    }
  }

  int total_bits = lines.size();

  string gamma_s, epsilon_s;

  for (int zero_count : zero_counts) {
    int one_count = total_bits - zero_count;
    char max_bit = zero_count > one_count ? '0' : '1';
    char min_bit = zero_count > one_count ? '1' : '0';
    gamma_s.push_back(max_bit);
    epsilon_s.push_back(min_bit);
  }

  int gamma_rate = stoi(gamma_s, nullptr, 2);
  int epsilon_rate = stoi(epsilon_s, nullptr, 2);

  int power_consumption = gamma_rate * epsilon_rate;
  cout << power_consumption << endl;
}