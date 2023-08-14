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

int get_zero_count(vector<string>& vec, int i) {
  int zero_count = 0;
  for (string line : vec) {
    if (line[i] == '0') zero_count++;
  }
  return zero_count;
}

void processUntilOne(vector<string>& vec,
                     function<char(int, int)> bit_criteria) {
  int i = 0;
  while (vec.size() > 1) {
    auto sz = vec.size();
    int zero_count = get_zero_count(vec, i);
    int one_count = sz - zero_count;
    char bit = bit_criteria(zero_count, one_count);
    vec.erase(remove_if(vec.begin(), vec.end(),
                        [&](string s) { return s[i] != bit; }),
              vec.end());
    i++;
  }
}

int main() {
  string contents = get_file_str("inputs/03.txt");
  vector<string> lines = get_lines_from_str(contents);

  vector<string> oxy_ratings = lines, co_ratings = lines;
  processUntilOne(oxy_ratings, [](int z, int o) { return o >= z ? '1' : '0'; });
  processUntilOne(co_ratings, [](int z, int o) { return z <= o ? '0' : '1'; });

  int oxy_gen_rating = stoi(oxy_ratings[0], nullptr, 2);
  int co_scrub_rating = stoi(co_ratings[0], nullptr, 2);

  int life_support_rating = oxy_gen_rating * co_scrub_rating;
  cout << life_support_rating << endl;
}