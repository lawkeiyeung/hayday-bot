#include string

std::string TestFunction()
{
    std::string result;
    char c1 = 'a' + 125 % 50 - 1;
    char c2 = 'a' + 0b0101 - 1; // 0b == binary literal
    char c3 = 't' - 1;
    result.push_back(c1);
    result.push_back(c2);
    result.push_back(c3);
    result.insert(0, 1, toupper(c2));
    return result;
}